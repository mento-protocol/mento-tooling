// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.18;

import { console } from "forge-std-next/console.sol";
import { Script } from "script/utils/mento/Script.sol";
import { Chain as ChainLib } from "script/utils/mento/Chain.sol";
import { Locking } from "mento-core-2.6.0/governance/locking/Locking.sol";
import "openzeppelin-contracts-upgradeable/contracts/token/ERC20/IERC20Upgradeable.sol";

interface ITransparentUpgradeableProxy {
  function owner() external view returns (address);
}

/*
 * How to run:
 * forge script script/dev/dev-InitLockingContract.sol:InitLockingContract --rpc-url $CELO_RPC_URL
 * yarn script:dev -n celo -s InitLockingContract
 */
contract InitLockingContract is Script {
  address MAINNET_LOCKING_PROXY_ADDR = 0x001Bb66636dCd149A1A2bA8C50E408BdDd80279C;
  address MAINNET_LOCKING_IMPL_ADDR = 0x34C5BB4113Cd6FF681A82A8E8CffB3b587485D73;
  address MAINNET_MENTO_TOKEN_ADDR = 0x7FF62f59e3e89EA34163EA1458EEBCc81177Cfb6;

  function run() public {
    vm.startBroadcast(ChainLib.deployerPrivateKey());
    {
      Locking lockingProxy = Locking(MAINNET_LOCKING_PROXY_ADDR);
      Locking lockingImpl = Locking(MAINNET_LOCKING_IMPL_ADDR);

      console.log("==== Addresses ====");
      console.log("Proxy: ", MAINNET_LOCKING_PROXY_ADDR);
      console.log("Impl: ", MAINNET_LOCKING_IMPL_ADDR);
      console.log("Token: ", MAINNET_MENTO_TOKEN_ADDR);
      console.log("");
      console.log("");

      console.log("==== PRE-INITIALIZATION STATE ====");
      printLockingParameters("Proxy", lockingProxy);
      printLockingParameters("Impl", lockingImpl);

      lockingImpl.__Locking_init(
        lockingProxy.token(),
        uint32(lockingProxy.startingPointWeek()),
        uint32(lockingProxy.minCliffPeriod()),
        uint32(lockingProxy.minSlopePeriod())
      );

      console.log("==== POST-INITIALIZATION STATE ====");
      printLockingParameters("Impl", lockingImpl);
    }
    vm.stopBroadcast();
  }

  function printLockingParameters(string memory label, Locking lockingToPrint) internal {
    console.log("( ", label, " )");
    console.log("minCliffPeriod: ", lockingToPrint.minCliffPeriod());
    console.log("minSlopePeriod: ", lockingToPrint.minSlopePeriod());
    console.log("startingPointWeek: ", lockingToPrint.startingPointWeek());
    console.log("token: ", address(lockingToPrint.token()));

    if (keccak256(abi.encodePacked(label)) == keccak256(abi.encodePacked("Impl"))) {
      console.log("owner: ", ITransparentUpgradeableProxy(MAINNET_LOCKING_IMPL_ADDR).owner());
    }

    console.log("");
  }
}
