import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction, DeployResult } from "hardhat-deploy/types";

// Usage: `yarn deploy:<NETWORK> --tags Proxies`
//          e.g. `yarn deploy:localhost --tags SortedOraclesProxy`
//          e.g. `yarn deploy:localhost --tags Proxies`
const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  console.log("=================================================");

  const result: DeployResult = await deploy("SortedOraclesProxy", {
    from: deployer,
    args: [],
    log: true,
    autoMine: true,
  });

  if (result.newlyDeployed) {
    console.log("SortedOraclesProxy deployed to:", result.address);
  } else {
    console.log("SortedOraclesProxy already deployed at:", result.address);
  }

  console.log("=================================================");
};

export default func;
func.tags = ["SortedOraclesProxy", "Proxies"];
