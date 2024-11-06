// SPDX-License-Identifier: GPL-3.0-or-later
// solhint-disable func-name-mixedcase, contract-name-camelcase, function-max-lines, var-name-mixedcase
pragma solidity ^0.5.13;
pragma experimental ABIEncoderV2;

import { Chain } from "script/utils/Chain.sol";
import { Config } from "script/utils/Config.sol";
import { Contracts } from "script/utils/Contracts.sol";
import { FixidityLib } from "script/utils/FixidityLib.sol";

/**
 * @dev This library contains the configuration required for the cKES governance proposal.
 *      The following configuration is used:
 *     - 1 pool: cKES<->cUSD
 *     - 1 rate feed: KESUSD
 *     - Configuration params needed to initialize the cKES stable token
 */
library cKESConfig {
  using FixidityLib for FixidityLib.Fraction;
  using Contracts for Contracts.Cache;

  struct cKES {
    Config.Pool poolConfig;
    Config.RateFeed rateFeedConfig;
    Config.StableTokenV2 stableTokenConfig;
  }

  /**
   * @dev Returns the populated configuration object for the cKES governance proposal.
   */
  function get(Contracts.Cache storage contracts) internal view returns (cKES memory config) {
    config.poolConfig = cKEScUSD_PoolConfig(contracts);
    config.rateFeedConfig = KESUSD_RateFeedConfig();
    config.stableTokenConfig = stableTokenKESConfig();
  }

  /* ==================== Rate Feed Configuration ==================== */

  /**
   * @dev Returns the configuration for the KESUSD rate feed.
   */
  function KESUSD_RateFeedConfig() internal pure returns (Config.RateFeed memory rateFeedConfig) {
    rateFeedConfig.rateFeedID = Config.rateFeedID("KESUSD");
    rateFeedConfig.medianDeltaBreaker0 = Config.MedianDeltaBreaker({
      enabled: true,
      threshold: FixidityLib.newFixedFraction(4, 100), // 4%
      cooldown: 15 minutes,
      smoothingFactor: FixidityLib.newFixedFraction(5, 1000).unwrap() // 0.005
    });
  }

  /* ==================== Pool Configuration ==================== */

  /**
   * @dev Returns the configuration for the cKEScUSD pool.
   */
  function cKEScUSD_PoolConfig(
    Contracts.Cache storage contracts
  ) internal view returns (Config.Pool memory poolConfig) {
    poolConfig = Config.Pool({
      asset0: contracts.celoRegistry("StableToken"),
      asset1: contracts.deployed("StableTokenKESProxy"),
      isConstantSum: true,
      spread: FixidityLib.newFixedFraction(1, 100), // 1%
      referenceRateResetFrequency: 5 minutes,
      minimumReports: 3,
      stablePoolResetSize: 10_000_000 * 1e18,
      referenceRateFeedID: Config.rateFeedID("KESUSD"),
      asset0limits: Config.TradingLimit({
        enabled0: true,
        timeStep0: 5 minutes,
        limit0: 100_000,
        enabled1: true,
        timeStep1: 1 days,
        limit1: 500_000,
        enabledGlobal: true,
        limitGlobal: 2_500_000
      }),
      asset1limits: Config.TradingLimit({
        enabled0: true,
        timeStep0: 5 minutes,
        limit0: 133 * 100_000,
        enabled1: true,
        timeStep1: 1 days,
        limit1: 133 * 500_000,
        enabledGlobal: true,
        limitGlobal: 133 * 2_500_000
      })
    });

    if (Chain.isAlfajores()) {
      poolConfig.minimumReports = 2;
    }
  }

  /* ==================== Stable Token Configuration ==================== */

  /**
   * @dev Returns the configuration for the cKES stable token.
   */
  function stableTokenKESConfig() internal pure returns (Config.StableTokenV2 memory config) {
    config = Config.StableTokenV2({ name: "Celo Kenyan Shilling", symbol: "cKES" });
  }
}
