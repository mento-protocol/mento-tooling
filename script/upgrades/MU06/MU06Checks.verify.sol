// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.5.13;
pragma experimental ABIEncoderV2;

import { console2 as console } from "forge-std/Script.sol";
import { FixidityLib } from "mento-core-2.2.0/common/FixidityLib.sol";

import { Reserve } from "mento-core-2.2.0/swap/Reserve.sol";
import { TradingLimits } from "mento-core-2.2.0/libraries/TradingLimits.sol";
import { IBiPoolManager } from "mento-core-2.2.0/interfaces/IBiPoolManager.sol";

import { MU06ChecksBase } from "./MU06Checks.base.sol";
import { MU06Config, Config } from "./Config.sol";

/**
 * @title IBrokerWithCasts
 * @notice Interface for Broker with tuple -> struct casting
 * @dev This is used to access the internal trading limits
 * config as a struct as opposed to a tuple.
 */
interface IBrokerWithCasts {
  function tradingLimitsConfig(bytes32 id) external view returns (TradingLimits.Config memory);
}

contract MU06ChecksVerify is MU06ChecksBase {
  using TradingLimits for TradingLimits.Config;
  using FixidityLib for FixidityLib.Fraction;

  constructor() public {
    setUp();
  }

  function run() public {
    console.log("\nStarting MU06 checks:");
    MU06Config.MU06 memory config = MU06Config.get(contracts);

    verifyReserveCollateralAssets();
    verifyPoolExchanges(config);
    verifyTradingLimits(config);
  }

  function verifyReserveCollateralAssets() internal {
    console.log("\n== Verifying Reserve Collateral Assets ==");

    require(Reserve(reserveProxy).isCollateralAsset(nativeUSDT), "❗️❌ Reserve collateral asset not set correctly");

    // mint some native USDC to the main reserve in order to verify spending ratios
    deal(nativeUSDT, reserveProxy, 100_000e6);
    verifyCollateralSpendingRatio(nativeUSDT, 1e24);
    console.log("🟢 Asset: %s successfully added to collateral asset list", nativeUSDT);
  }

  function verifyTradingLimits(MU06Config.MU06 memory config) internal view {
    console.log("\n== Verifying TradingLimits changes in Broker ==");
    IBrokerWithCasts _broker = IBrokerWithCasts(brokerProxy);

    for (uint256 i = 0; i < config.pools.length; i++) {
      bytes32 exchangeId = getExchangeId(config.pools[i].asset0, config.pools[i].asset1, config.pools[i].isConstantSum);
      Config.Pool memory poolConfig = config.pools[i];

      bytes32 asset0LimitId = exchangeId ^ bytes32(uint256(uint160(config.pools[i].asset0)));
      TradingLimits.Config memory asset0ActualLimit = _broker.tradingLimitsConfig(asset0LimitId);

      bytes32 asset1LimitId = exchangeId ^ bytes32(uint256(uint160(config.pools[i].asset1)));
      TradingLimits.Config memory asset1ActualLimit = _broker.tradingLimitsConfig(asset1LimitId);

      checkTradingLimit(poolConfig.asset0limits, asset0ActualLimit);
      checkTradingLimit(poolConfig.asset1limits, asset1ActualLimit);
    }

    console.log("🟢 Trading limits correctly updated for all exchanges 🔒");
  }

  function verifyPoolExchanges(MU06Config.MU06 memory config) internal {
    console.log("\n== Verifying Pool Exchanges ==");
    for (uint256 i = 0; i < config.pools.length; i++) {
      Config.Pool memory poolConfig = config.pools[i];
      console.log("\nVerifying pool exchange for %s/%s", poolConfig.asset0, poolConfig.asset1);

      bytes32 exchangeId = getExchangeId(poolConfig.asset0, poolConfig.asset1, poolConfig.isConstantSum);

      IBiPoolManager.PoolExchange memory pool = IBiPoolManager(biPoolManagerProxy).getPoolExchange(exchangeId);

      if (pool.config.spread.unwrap() != poolConfig.spread.unwrap()) {
        console.log(
          "The spread of deployed pool: %s does not match the expected spread: %s.",
          pool.config.spread.unwrap(),
          poolConfig.spread.unwrap()
        );
        revert("spread of pool does not match the expected spread. See logs.");
      }

      if (pool.config.referenceRateFeedID != poolConfig.referenceRateFeedID) {
        console.log(
          "The referenceRateFeedID of deployed pool: %s does not match the expected referenceRateFeedID: %s.",
          pool.config.referenceRateFeedID,
          poolConfig.referenceRateFeedID
        );
        revert("referenceRateFeedID of pool does not match the expected referenceRateFeedID. See logs.");
      }

      if (pool.config.minimumReports != poolConfig.minimumReports) {
        console.log(
          "The minimumReports of deployed pool: %s does not match the expected minimumReports: %s.",
          pool.config.minimumReports,
          poolConfig.minimumReports
        );
        revert("minimumReports of pool does not match the expected minimumReports. See logs.");
      }

      if (pool.config.referenceRateResetFrequency != poolConfig.referenceRateResetFrequency) {
        console.log(
          "The referenceRateResetFrequency of deployed pool: %s does not match the expected: %s.",
          pool.config.referenceRateResetFrequency,
          poolConfig.referenceRateResetFrequency
        );
        revert(
          "referenceRateResetFrequency of pool does not match the expected referenceRateResetFrequency. See logs."
        );
      }

      if (pool.config.stablePoolResetSize != poolConfig.stablePoolResetSize) {
        console.log(
          "The stablePoolResetSize of deployed pool: %s does not match the expected stablePoolResetSize: %s.",
          pool.config.stablePoolResetSize,
          poolConfig.stablePoolResetSize
        );
        revert("stablePoolResetSize of pool does not match the expected stablePoolResetSize. See logs.");
      }
    }
    console.log("\tPool config is correctly configured 🤘🏼");
  }

  function verifyCollateralSpendingRatio(address collateralAsset, uint256 expectedRatio) internal {
    console.log("\n== Verifying Collateral Spending Ratio for %s ==", collateralAsset);
    // @notice verifying spending ratios by trying to move the allowed, and more than the allowed amount
    // the variable holding the ratios is private

    address[] memory otherReserveAddresses = Reserve(reserveProxy).getOtherReserveAddresses();
    address payable otherReserve = address(uint160(otherReserveAddresses[0]));
    uint256 reserveBalance = Reserve(reserveProxy).getReserveAddressesCollateralAssetBalance(collateralAsset);

    uint256 spendingLimit = FixidityLib.wrap(expectedRatio).multiply(FixidityLib.newFixed(reserveBalance)).fromFixed();
    uint256 exceedingAmount = spendingLimit + 1;

    vm.prank(reserveSpender);
    vm.expectRevert("Exceeding spending limit");
    Reserve(reserveProxy).transferCollateralAsset(collateralAsset, otherReserve, exceedingAmount);
    console.log("🟢 Couldn't transfer more than the allowed amount");

    vm.prank(reserveSpender);
    Reserve(reserveProxy).transferCollateralAsset(collateralAsset, otherReserve, spendingLimit);
    console.log("🟢 Successfully transferred the max allowed amount");

    console.log("🟢 Spending ratio for Asset: %s successfully set to ", collateralAsset, expectedRatio);
  }

  function checkTradingLimit(
    Config.TradingLimit memory expectedTradingLimit,
    TradingLimits.Config memory actualTradingLimit
  ) internal view {
    if (expectedTradingLimit.limit0 != actualTradingLimit.limit0) {
      console.log("limit0 was not set as expected ❌");
      revert("Not all trading limits were configured correctly.");
    }
    if (expectedTradingLimit.limit1 != actualTradingLimit.limit1) {
      console.log("limit1 was not set as expected ❌");
      revert("Not all trading limits were configured correctly.");
    }
    if (expectedTradingLimit.limitGlobal != actualTradingLimit.limitGlobal) {
      console.log("limitGlobal was not set as expected ❌");
      revert("Not all trading limits were configured correctly.");
    }
    if (expectedTradingLimit.timeStep0 != actualTradingLimit.timestep0) {
      console.log("timestep0 was not set as expected ❌");
      revert("Not all trading limits were configured correctly.");
    }
    if (expectedTradingLimit.timeStep1 != actualTradingLimit.timestep1) {
      console.log("timestep1 was not set as expected ❌");
      revert("Not all trading limits were configured correctly.");
    }

    uint8 tradingLimitFlags = Config.tradingLimitConfigToFlag(expectedTradingLimit);
    if (tradingLimitFlags != actualTradingLimit.flags) {
      console.log("flags were not set as expected ❌");
      revert("Not all trading limits were configured correctly.");
    }
  }
}
