// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.5.13;
pragma experimental ABIEncoderV2;

import { console2 as console } from "forge-std/Script.sol";

import { PrecompileHandler } from "celo-foundry/PrecompileHandler.sol";

import { Contracts } from "script/utils/Contracts.sol";

import { IERC20 } from "openzeppelin-solidity/contracts/token/ERC20/IERC20.sol";
import { IStableTokenV2 } from "mento-core-2.4.0/interfaces/IStableTokenV2.sol";

import { FixidityLib } from "mento-core-2.4.0/common/FixidityLib.sol";

import { Broker } from "mento-core-2.4.0/swap/Broker.sol";
import { IBiPoolManager } from "mento-core-2.4.0/interfaces/IBiPoolManager.sol";
import { BiPoolManager } from "mento-core-2.4.0/swap/BiPoolManager.sol";
import { SortedOracles } from "mento-core-2.4.0/common/SortedOracles.sol";
import { BreakerBox } from "mento-core-2.4.0/oracles/BreakerBox.sol";

import { cPHPChecksBase } from "./cPHPChecks.base.sol";
import { cPHPConfig, Config } from "./Config.sol";

contract cPHPChecksSwap is cPHPChecksBase {
  using FixidityLib for FixidityLib.Fraction;
  using Contracts for Contracts.Cache;

  constructor() public {
    new PrecompileHandler();
    setUp();
  }

  function run() public {
    cPHPConfig.cPHP memory config = cPHPConfig.get(contracts);

    console.log("\n== Starting cPHP test swaps: ==");

    console.log(
      "PHPUSD tradingMode: ",
      BreakerBox(breakerBox).getRateFeedTradingMode(config.rateFeedConfig.rateFeedID)
    );

    swapCPHPtoCUSD(config);
    swapCUSDToCPHP(config);
  }

  // *** Swap Checks *** //

  function swapCPHPtoCUSD(cPHPConfig.cPHP memory config) internal {
    bytes32 exchangeID = getExchangeId(
      config.poolConfig.asset0,
      config.poolConfig.asset1,
      config.poolConfig.isConstantSum
    );
    address trader = vm.addr(5);
    address tokenIn = cPHP;
    address tokenOut = cUSD;
    uint256 amountIn = 100e18;

    vm.startPrank(broker);
    IStableTokenV2(tokenIn).mint(trader, amountIn);
    vm.stopPrank();

    console.log("======================== cPHP -> cUSD ====================================\r\n");

    console.log("=========================== BEFORE SWAP ====================================");
    console.log("============================================================================");
    console.log("cPHP balance: ", IERC20(cPHP).balanceOf(trader));
    console.log("cUSD balance: ", IERC20(cUSD).balanceOf(trader));
    console.log("============================================================================\r\n");

    testAndPerformConstantSumSwap(
      exchangeID,
      trader,
      tokenIn,
      tokenOut,
      amountIn,
      config.poolConfig.referenceRateFeedID
    );

    console.log("============================ AFTER SWAP ====================================");
    console.log("============================================================================");
    console.log("cPHP balance: ", IERC20(cPHP).balanceOf(trader));
    console.log("cUSD balance: ", IERC20(cUSD).balanceOf(trader));
    console.log("============================================================================\r\n");
    console.log("🟢 cPHP -> cUSD swap successful 🚀");
  }

  function swapCUSDToCPHP(cPHPConfig.cPHP memory config) internal {
    bytes32 exchangeID = getExchangeId(
      config.poolConfig.asset0,
      config.poolConfig.asset1,
      config.poolConfig.isConstantSum
    );
    address trader = vm.addr(5);
    address tokenIn = cUSD;
    address tokenOut = cPHP;
    uint256 amountIn = 100e18;

    deal(tokenIn, trader, amountIn);

    console.log("\r======================== cUSD -> cPHP ====================================\r\n");

    console.log("=========================== BEFORE SWAP ====================================");
    console.log("============================================================================");
    console.log("cUSD balance: ", IERC20(cUSD).balanceOf(trader));
    console.log("cPHP balance: ", IERC20(cPHP).balanceOf(trader));
    console.log("============================================================================\r\n");

    testAndPerformConstantSumSwap(
      exchangeID,
      trader,
      tokenIn,
      tokenOut,
      amountIn,
      config.poolConfig.referenceRateFeedID
    );

    console.log("============================ AFTER SWAP ====================================");
    console.log("============================================================================");
    console.log("cUSD balance: ", IERC20(cUSD).balanceOf(trader));
    console.log("cPHP balance: ", IERC20(cPHP).balanceOf(trader));
    console.log("============================================================================\r\n");

    console.log("🟢 cUSD -> cPHP swap successful 🚀");
  }

  // *** Helper Functions *** //

  function testAndPerformConstantSumSwap(
    bytes32 exchangeID,
    address trader,
    address tokenIn,
    address tokenOut,
    uint256 amountIn,
    address rateFeedID
  ) internal {
    uint256 amountOut = Broker(broker).getAmountOut(biPoolManagerProxy, exchangeID, tokenIn, tokenOut, amountIn);

    // This is the PHP to USD rate
    (uint256 numerator, uint256 denominator) = SortedOracles(sortedOraclesProxy).medianRate(rateFeedID);
    uint256 estimatedAmountOut;

    // If asset 0 is cUSD flip the rate]
    if (tokenIn == cUSD) {
      (numerator, denominator) = (denominator, numerator);
    }

    estimatedAmountOut = FixidityLib
      .newFixed(amountIn)
      .multiply(FixidityLib.wrap(numerator).divide(FixidityLib.wrap(denominator)))
      .fromFixed();

    console.log("\r=========================== AMOUNTS ====================================");
    console.log("============================================================================");
    console.log("Amount In: ", amountIn);
    console.log("Broker amount out(Broker.getAmountOut)", amountOut);
    console.log("Estimated amount out(amountIn * num/dennom): ", estimatedAmountOut);

    uint256 scaledAmountIn = BiPoolManager(biPoolManagerProxy).tokenPrecisionMultipliers(tokenIn);

    FixidityLib.Fraction memory maxTolerance = FixidityLib.newFixedFraction(25, 1000);
    uint256 threshold = FixidityLib.newFixed(estimatedAmountOut).multiply(maxTolerance).fromFixed();
    assertApproxEq(amountOut, estimatedAmountOut, threshold);
    doSwapIn(exchangeID, trader, tokenIn, tokenOut, amountIn, amountOut);
  }

  function doSwapIn(
    bytes32 exchangeID,
    address trader,
    address tokenIn,
    address tokenOut,
    uint256 amountIn,
    uint256 amountOut
  ) internal {
    uint256 beforeBuyingTokenOut = IERC20(tokenOut).balanceOf(trader);
    uint256 beforeSellingTokenIn = IERC20(tokenIn).balanceOf(trader);

    vm.startPrank(trader);
    IERC20(tokenIn).approve(address(broker), amountIn);
    uint256 actualAmountOut = Broker(broker).swapIn(
      biPoolManagerProxy,
      exchangeID,
      tokenIn,
      tokenOut,
      amountIn,
      amountOut
    );
    console.log("Actual amount out: ", actualAmountOut);
    console.log("============================================================================\r\n");
    assertEq(IERC20(tokenOut).balanceOf(trader), beforeBuyingTokenOut + amountOut);
    assertEq(IERC20(tokenIn).balanceOf(trader), beforeSellingTokenIn - amountIn);
    vm.stopPrank();
  }

  function assertApproxEq(uint256 a, uint256 b, uint256 maxDelta) internal view {
    uint256 delta = a > b ? a - b : b - a;

    if (delta > maxDelta) {
      console.log("Diff(%s) between amounts is greater than %s", delta, maxDelta);
    }

    require(delta <= maxDelta, "Values are not approximately equal. See logs for more information.");
  }
}
