// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.5.13;

import { Script } from "script/utils/Script.sol";
import { Chain } from "script/utils/Chain.sol";
import { console2 as console } from "forge-std/Script.sol";
import { Reserve } from "mento-core-3.0.0/swap/Reserve.sol";
import { FixidityLib } from "../../../utils/FixidityLib.sol";
import { IStableTokenV2 } from "mento-core-3.0.0/interfaces/IStableTokenV2.sol";
import { IGoodDollarExchangeProvider } from "mento-core-3.0.0/goodDollar/interfaces/IGoodDollarExchangeProvider.sol";
// solhint-disable-next-line max-line-length
import { IGoodDollarExpansionController } from "mento-core-3.0.0/goodDollar/interfaces/IGoodDollarExpansionController.sol";
import { IBroker } from "mento-core-3.0.0/interfaces/IBroker.sol";

contract GoodDollar_CreateTestingEnviorment is Script {
  function run() public {
    address mentoDeployer = 0x56fD3F2bEE130e9867942D0F463a16fBE49B8d81;
    vm.startBroadcast(vm.envUint("MENTO_DEPLOYER_PK"));

    address mockGoodDollarExchangeProvider = deployContract(
      "out/GoodDollarExchangeProvider.sol/GoodDollarExchangeProvider.json",
      false
    );
    address mockGoodDollarExpansionController = deployContract(
      "out/GoodDollarExpansionController.sol/GoodDollarExpansionController.json",
      false
    );
    address mockCUSD = deployContract("out/tokens/StableTokenV2.sol/StableTokenV2.json", false);
    address mockBrokerV2 = deployContract("out/mento-core-3.0.0/contracts/swap/Broker.sol/Broker.json", true);

    address payable mockReserve = address(new Reserve(true));
    configureReserve(address(uint160(mockReserve)), mockBrokerV2, mockCUSD);
    initializeCUSD(mockCUSD, mockBrokerV2);
    configureBrokerV2(mockBrokerV2, mockGoodDollarExchangeProvider, mockReserve);
    configureExchangeProvider(
      mockGoodDollarExchangeProvider,
      mockBrokerV2,
      mockReserve,
      mockGoodDollarExpansionController,
      mentoDeployer
    );
    configureExpansionController(
      mockGoodDollarExpansionController,
      mockGoodDollarExchangeProvider,
      mentoDeployer,
      mockReserve,
      mentoDeployer
    );

    vm.stopBroadcast();

    console.log("----------");
    console.log("----------");
  }

  function deployContract(string memory path, bool constructorArgument) private returns (address) {
    bytes memory bytecode = abi.encodePacked(vm.getCode(path), abi.encode(constructorArgument));
    address deployedAddress;
    assembly {
      deployedAddress := create(0, add(bytecode, 0x20), mload(bytecode))
    }
    return deployedAddress;
  }

  function configureReserve(address payable reserve, address broker, address collateralAsset) internal {
    bytes32[] memory initialAssetAllocationSymbols = new bytes32[](2);
    initialAssetAllocationSymbols[0] = bytes32("cGLD");
    initialAssetAllocationSymbols[1] = bytes32("mockCUSD");
    uint256[] memory initialAssetAllocationWeights = new uint256[](2);
    initialAssetAllocationWeights[0] = FixidityLib.newFixedFraction(1, 2).unwrap();
    initialAssetAllocationWeights[1] = FixidityLib.newFixedFraction(1, 2).unwrap();
    uint256 tobinTax = FixidityLib.newFixedFraction(5, 1000).unwrap();
    uint256 tobinTaxReserveRatio = FixidityLib.newFixedFraction(2, 1).unwrap();
    address[] memory collateralAssets = new address[](1);
    collateralAssets[0] = collateralAsset;

    uint256[] memory collateralAssetDailySpendingRatios = new uint256[](1);
    collateralAssetDailySpendingRatios[0] = 1e24;
    Reserve(reserve).initialize(
      0x000000000000000000000000000000000000ce10,
      600, // deprecated
      1000000000000000000000000,
      0,
      0,
      initialAssetAllocationSymbols,
      initialAssetAllocationWeights,
      tobinTax,
      tobinTaxReserveRatio,
      collateralAssets,
      collateralAssetDailySpendingRatios
    );
    Reserve(reserve).addToken(0x62B8B11039FcfE5aB0C56E502b1C372A3d2a9c7A);
    Reserve(reserve).addExchangeSpender(broker);
  }

  function initializeCUSD(address mockCUSD, address mockBrokerV2) private {
    address[] memory initialBalanceAddresses = new address[](0);
    uint256[] memory initialBalances = new uint256[](0);
    IStableTokenV2(mockCUSD).initialize(
      "mockCUSD",
      "mockCUSD",
      0,
      address(0),
      0,
      0,
      initialBalanceAddresses,
      initialBalances,
      ""
    );
    IStableTokenV2(mockCUSD).initializeV2(address(mockBrokerV2), address(0), address(0));
  }

  function configureBrokerV2(address brokerV2, address exchangeProvider, address reserve) internal {
    address[] memory exchangeProviders = new address[](1);
    address[] memory reserves = new address[](1);
    exchangeProviders[0] = exchangeProvider;
    reserves[0] = reserve;
    IBroker(brokerV2).initialize(exchangeProviders, reserves);
  }

  function configureExchangeProvider(
    address exchangeProvider,
    address broker,
    address reserve,
    address expansionController,
    address avatar
  ) internal {
    IGoodDollarExchangeProvider(exchangeProvider).initialize(broker, reserve, expansionController, avatar);
  }

  function configureExpansionController(
    address expansionController,
    address exchangeProvider,
    address distributionhelper,
    address reserve,
    address avatar
  ) internal {
    IGoodDollarExpansionController(expansionController).initialize(
      exchangeProvider,
      distributionhelper,
      reserve,
      avatar
    );
  }
}
