// SPDX-License-Identifier: GPL-3.0-or-later
// solhint-disable func-name-mixedcase, contract-name-camelcase, function-max-lines, var-name-mixedcase
pragma solidity ^0.5.13;
pragma experimental ABIEncoderV2;

import { Chain } from "script/utils/Chain.sol";
import { Config } from "script/utils/Config.sol";
import { Contracts } from "script/utils/Contracts.sol";
import { Arrays } from "script/utils/Arrays.sol";
import { FixidityLib } from "script/utils/FixidityLib.sol";

library eXOFConfig {
  using FixidityLib for FixidityLib.Fraction;
  using Contracts for Contracts.Cache;

  struct eXOF {
    Config.Pool eXOFCelo;
    Config.Pool eXOFEUROC;
    Config.Pool[] pools;
    Config.RateFeed CELOXOF;
    Config.RateFeed EUROCXOF;
    Config.RateFeed[] rateFeeds;
    Config.StableToken stableTokenXOF;
  }

  function get(Contracts.Cache storage contracts) internal returns (eXOF memory config) {
    config.pools = new Config.Pool[](2);
    config.pools[0] = config.eXOFCelo = eXOFCelo_PoolConfig(contracts);
    config.pools[1] = config.eXOFEUROC = eXOFEUROC_PoolConfig(contracts);

    config.rateFeeds = new Config.RateFeed[](3);
    config.rateFeeds[0] = config.CELOXOF = CELOXOF_RateFeedConfig(contracts);
    config.rateFeeds[1] = config.EUROCXOF = EUROCXOF_RateFeedConfig(contracts);

    config.stableTokenXOF = stableTokenXOFConfig();
  }

  function stableTokenXOFConfig() internal pure returns (Config.StableToken memory config) {
    config = Config.StableToken({
      name: "ECO CFA",
      symbol: "eXOF",
      decimals: 18,
      registryAddress: address(0x000000000000000000000000000000000000ce10),
      inflationRate: 1000000000000000000000000,
      inflationFactorUpdatePeriod: 47304000,
      initialBalanceAddresses: new address[](0),
      initialBalanceValues: new uint256[](0),
      exchangeIdentifier: "Broker"
    });
  }

  function eXOFCelo_PoolConfig(Contracts.Cache storage contracts) internal view returns (Config.Pool memory config) {
    config = Config.Pool({
      asset0: contracts.celoRegistry("StableTokenXOF"),
      asset1: contracts.celoRegistry("GoldToken"),
      isConstantSum: false,
      spread: FixidityLib.newFixedFraction(50, 10_000), // 0.0050
      referenceRateResetFrequency: 5 minutes,
      minimumReports: 5,
      stablePoolResetSize: 656 * 250_000 * 1e18, // 164 million
      referenceRateFeedID: contracts.celoRegistry("StableTokenXOF"),
      asset0limits: Config.TradingLimit({
        enabled0: true,
        timeStep0: 5 minutes,
        limit0: 656 * 10_000,
        enabled1: true,
        timeStep1: 1 days,
        limit1: 656 * 50_000,
        enabledGlobal: true,
        limitGlobal: 656 * 300_000
      }),
      asset1limits: Config.TradingLimit({
        enabled0: true,
        timeStep0: 5 minutes,
        limit0: 20_000, // assuming Celo/EUR = 0.5
        enabled1: true,
        timeStep1: 1 days,
        limit1: 100_000, // assuming Celo/EUR = 0.5
        enabledGlobal: true,
        limitGlobal: 600_000 // assuming Celo/EUR = 0.5
      })
    });

    if (Chain.isBaklava() || Chain.isAlfajores()) {
      config.minimumReports = 2;
    }
  }

  function CELOXOF_RateFeedConfig(
    Contracts.Cache storage contracts
  ) internal view returns (Config.RateFeed memory config) {
    config.rateFeedID = contracts.celoRegistry("StableTokenXOF");
    config.medianDeltaBreaker0 = Config.MedianDeltaBreaker({
      enabled: true,
      threshold: FixidityLib.newFixedFraction(3, 100), // 0.03
      cooldown: 30 minutes,
      smoothingFactor: 0
    });
  }

  function eXOFEUROC_PoolConfig(Contracts.Cache storage contracts) internal returns (Config.Pool memory config) {
    config = Config.Pool({
      asset0: contracts.celoRegistry("StableTokenXOF"),
      asset1: contracts.dependency("BridgedEUROC"),
      isConstantSum: true,
      spread: FixidityLib.newFixedFraction(25, 10000), // 0.0025
      minimumReports: 5,
      referenceRateResetFrequency: 5 minutes,
      stablePoolResetSize: 656 * 1_000_000 * 1e18, // 656 * 1.0 million
      referenceRateFeedID: contracts.dependency("EURXOFRateFeedAddr"),
      asset0limits: Config.TradingLimit({
        enabled0: true,
        timeStep0: 5 minutes,
        limit0: 656 * 10_000,
        enabled1: true,
        timeStep1: 1 days,
        limit1: 656 * 50_000,
        enabledGlobal: true,
        limitGlobal: 656 * 1_000_000
      }),
      asset1limits: Config.TradingLimit({
        enabled0: true,
        timeStep0: 5 minutes,
        limit0: 10_000,
        enabled1: true,
        timeStep1: 1 days,
        limit1: 50_000,
        enabledGlobal: true,
        limitGlobal: 1_000_000
      })
    });
    if (Chain.isBaklava() || Chain.isAlfajores()) {
      config.minimumReports = 2;
    }
  }

  function EUROCXOF_RateFeedConfig(Contracts.Cache storage contracts) internal returns (Config.RateFeed memory config) {
    config.rateFeedID = contracts.dependency("EUROCXOFRateFeedAddr");
    config.valueDeltaBreaker0 = Config.ValueDeltaBreaker({
      enabled: true,
      threshold: FixidityLib.newFixedFraction(5, 1000), // 0.005
      referenceValue: 656.55 * 10 ** 24, // TODO: verify
      cooldown: 15 minutes
    });
    config.valueDeltaBreaker1 = Config.ValueDeltaBreaker({
      enabled: true,
      threshold: FixidityLib.newFixedFraction(10, 100), // 0.10
      referenceValue: 656.55 * 10 ** 24, // TODO: verify
      cooldown: 0 seconds
    });
    config.dependentRateFeeds = Arrays.addresses(contracts.dependency("EUROCEURRateFeedAddr"));
  }
}
