// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.5.13;
pragma experimental ABIEncoderV2;

import { console2 } from "forge-std/Script.sol";
import { Script } from "script/utils/Script.sol";
import { Chain } from "script/utils/Chain.sol";

import { IBroker } from "mento-core/contracts/interfaces/IBroker.sol";
import { IStableToken } from "mento-core/contracts/interfaces/IStableToken.sol";
import { IExchangeProvider } from "mento-core/contracts/interfaces/IExchangeProvider.sol";
import { Reserve } from "mento-core/contracts/Reserve.sol";
import { IERC20Metadata } from "mento-core/contracts/common/interfaces/IERC20Metadata.sol";
import { BiPoolManager } from "mento-core/contracts/BiPoolManager.sol";
import { IBiPoolManager } from "mento-core/contracts/interfaces/IBiPoolManager.sol";
import { MockERC20 } from "../../contracts/MockERC20.sol";
import { IBreakerBox } from "mento-core/contracts/interfaces/IBreakerBox.sol";

import { Broker } from "mento-core/contracts/Broker.sol";
import { BreakerBox } from "mento-core/contracts/BreakerBox.sol";

import { TradingLimits } from "mento-core/contracts/common/TradingLimits.sol";

/**
 * @title IBrokerWithCasts
 * @notice Interface for Broker with tuple -> struct casting
 * @dev This is used to access the internal trading limits state and
 * config as structs as opposed to tuples.
 */
interface IBrokerWithCasts {
  function tradingLimitsState(bytes32 id) external view returns (TradingLimits.State memory);

  function tradingLimitsConfig(bytes32 id) external view returns (TradingLimits.Config memory);
}

contract SwapTest is Script {
  using TradingLimits for TradingLimits.Config;

  IBroker private broker;
  BiPoolManager private bpm;
  BreakerBox private breakerBox;
  Reserve public reserve;

  address public celoToken;
  address public cUSD;
  address public cEUR;
  address public usdCet;

  function setUp() public {
    // Load addresses from deployments
    contracts.load("MU01-00-Create-Proxies", "1676642018");
    contracts.load("MU01-01-Create-Nonupgradeable-Contracts", "1676642105");
    contracts.load("MU01-02-Create-Implementations", "1676642404");

    // Get proxy addresses of the deployed tokens
    cUSD = contracts.celoRegistry("StableToken");
    cEUR = contracts.celoRegistry("StableTokenEUR");
    usdCet = contracts.dependency("USDCet");
    celoToken = contracts.celoRegistry("GoldToken");
    broker = IBroker(contracts.celoRegistry("Broker"));
    breakerBox = BreakerBox(contracts.deployed("BreakerBox"));
    reserve = Reserve(contracts.deployed("PartialReserveProxy"));

    address[] memory exchangeProviders = broker.getExchangeProviders();
    verifyExchangeProviders(exchangeProviders);

    bpm = BiPoolManager(exchangeProviders[0]);
    verifyBiPoolManager(address(bpm));
  }

  function run() public {
    vm.startBroadcast(Chain.deployerPrivateKey());
    {
      executeSwap();
    }
    vm.stopBroadcast();
  }

  function runInFork() public {
    setUp();
    vm.deal(address(this), 1e20);
    checkReserve();
    executeSwap();
    swapUSDcetForcUSD();
    swapcUSDForUSDcet();
  }

  function checkReserve() public {
    console2.log("doing reserve checks");
    require(reserve.checkIsCollateralAsset(celoToken), "CELO is not collateral asset");
    require(reserve.checkIsCollateralAsset(usdCet), "USDCet is not collateral asset");
    console2.log("reserve ✅");
  }

  function executeSwap() public {
    bytes32 exchangeID = bpm.exchangeIds(0);
    verifyExchange(exchangeID);

    address tokenIn = celoToken;
    address tokenOut = cUSD;

    uint256 amountOut = broker.getAmountOut(address(bpm), exchangeID, tokenIn, tokenOut, 1e18);

    console2.log("CELO -> cUSD swap Expected amount out:", amountOut);

    IERC20Metadata(contracts.celoRegistry("GoldToken")).approve(address(broker), 1e18);
    broker.swapIn(address(bpm), exchangeID, tokenIn, tokenOut, 1e18, amountOut - 1e17);

    verifyTradingLimits();
  }

  function verifyTradingLimits() public view {
   IBrokerWithCasts _broker = IBrokerWithCasts(address(broker));

    bytes32 exchangeId = getExchangeId(cUSD, celoToken, false);
    bytes32 limitId = exchangeId ^ bytes32(uint256(uint160(cUSD)));

    TradingLimits.Config memory cUSDTradingLimits = _broker.tradingLimitsConfig(limitId);

    if (
      cUSDTradingLimits.timestep0 == 0 ||
      cUSDTradingLimits.timestep1 == 0 ||
      cUSDTradingLimits.limit0 == 0 ||
      cUSDTradingLimits.limit1 == 0
    ) {
      console2.log("The trading limit for cUSD/CELO was not set.");
      revert("Trading limit for cUSD/CELO was not set.");
    }
  }

  function verifyCircuitBreaker() public view {
    // Check circuit breaker is configured for cUSD/CELO
    (, uint64 lastUpdatedTime, ) = breakerBox.rateFeedTradingModes(cUSD);

    // Check if cUSD TradingModeInfo.lastUpdatedTime is greater than zero
    if (lastUpdatedTime == 0) {
      revert("cUSD circuit breaker was not set.");
    }
  }

  function swapUSDcetForcUSD() public {
    address trader = vm.addr(1);
    bytes32 exchangeID = bpm.exchangeIds(3);

    address tokenIn = usdCet;
    address tokenOut = cUSD;
    uint256 amountIn = 100e18;
    uint256 amountOut = broker.getAmountOut(address(bpm), exchangeID, tokenIn, tokenOut, amountIn);

    MockERC20 mockUSDcetContract = MockERC20(usdCet);

    assert(mockUSDcetContract.balanceOf(trader) == 0);
    vm.prank(mockUSDcetContract.owner());
    assert(mockUSDcetContract.mint(trader, amountIn));
    assert(mockUSDcetContract.balanceOf(trader) == amountIn);

    vm.startPrank(trader);
    uint256 beforecUSD = MockERC20(cUSD).balanceOf(trader);
    mockUSDcetContract.approve(address(broker), amountIn);

    broker.swapIn(address(bpm), exchangeID, tokenIn, tokenOut, amountIn, amountOut);

    assert(mockUSDcetContract.balanceOf(trader) == 0);
    assert(MockERC20(cUSD).balanceOf(trader) == beforecUSD + amountOut);
    vm.stopPrank();

    console2.log("USDCet -> cUSD swap successful 🚀");
  }

  function swapcUSDForUSDcet() public {
    address trader = vm.addr(1);
    bytes32 exchangeID = bpm.exchangeIds(3);

    address tokenIn = cUSD;
    address tokenOut = usdCet;
    uint256 amountIn = 10e18;
    uint256 amountOut = broker.getAmountOut(address(bpm), exchangeID, tokenIn, tokenOut, amountIn);

    console2.log("---------------------------------");
    console2.log("Swap cUSD for USDCet");
    console2.log("cUSD balance", MockERC20(cUSD).balanceOf(trader));
    console2.log("USDC balance", MockERC20(usdCet).balanceOf(trader));

    // fund reserve with usdc
    MockERC20 mockUSDcetContract = MockERC20(usdCet);
    vm.prank(mockUSDcetContract.owner());
    assert(mockUSDcetContract.mint(address(reserve), 1000e18));

    vm.startPrank(trader);
    MockERC20(cUSD).approve(address(broker), amountIn);
    broker.swapIn(address(bpm), exchangeID, tokenIn, tokenOut, amountIn, amountOut);
    vm.stopPrank();
    console2.log("---- after balance ----");
    console2.log("cUSD balance", MockERC20(cUSD).balanceOf(trader));
    console2.log("USDC balance", MockERC20(usdCet).balanceOf(trader));
    // MockERC20 mockUSDcetContract = MockERC20(usdCet);

    // assert(mockUSDcetContract.balanceOf(trader) == 0);
    // vm.prank(mockUSDcetContract.owner());
    // assert(mockUSDcetContract.mint(trader, amountIn));
    // assert(mockUSDcetContract.balanceOf(trader) == amountIn);

    // vm.startPrank(trader);
    // uint256 beforecUSD = MockERC20(cUSD).balanceOf(trader);
    // mockUSDcetContract.approve(address(broker), amountIn);

    // broker.swapIn(address(bpm), exchangeID, tokenIn, tokenOut, amountIn, amountOut);

    // assert(mockUSDcetContract.balanceOf(trader) == 0);
    // assert(MockERC20(cUSD).balanceOf(trader) == beforecUSD + amountOut);
    // vm.stopPrank();

    console2.log("cUSD -> USDCet swap successful 🚀");
  }

  function verifyBiPoolManager(address biPoolManager) public view {
    // Get the address of the deployed BiPoolManagerProxy from the deployment json.
    address expectedBiPoolManager = contracts.deployed("BiPoolManagerProxy");

    if (biPoolManager != expectedBiPoolManager) {
      console2.log(
        "The address of the BiPool manager retrieved from the Broker was not the address found in the deployment json."
      );
      console2.log("Expected address:", expectedBiPoolManager);
      console2.log("Actual address:", biPoolManager);

      revert("BiPoolManager address found was not expected. See logs.");
    }
  }

  function verifyExchangeProviders(address[] memory exchangeProviders) public view {
    if (exchangeProviders.length != 1) {
      console2.log("Exchange provider count was %s but should have been 1", exchangeProviders.length);
      revert("Exchange provider count was not 1");
    }
  }

  function verifyExchange(bytes32 exchangeID) public view {
    // Get the exchane struct from the BiPoolManager
    IBiPoolManager.PoolExchange memory pool = bpm.getPoolExchange(exchangeID);

    // Verify asset0 is a stable asset, cEUR or cUSD.
    // This may not always be the case but pools were configured this way in the proposal.
    if (pool.asset0 != cEUR && pool.asset0 != cUSD) {
      console2.log("The asset0 of the exchange was not a stable asset.");
      console2.log("Expected asset0: cUSD(%s) OR cEUR(%s)", cUSD, cEUR);
      console2.log("Actual asset0:", pool.asset0);
      revert("Exchange was not configured as expected.");
    }
  }

  /**
   * @notice Helper function to get the exchange ID for a pool.
   */
  function getExchangeId(
    address asset0,
    address asset1,
    bool isConstantSum
  ) internal view returns (bytes32) {
    return
      keccak256(
        abi.encodePacked(
          IERC20Metadata(asset0).symbol(),
          IERC20Metadata(asset1).symbol(),
          isConstantSum ? "ConstantSum" : "ConstantProduct"
        )
      );
  }
}
