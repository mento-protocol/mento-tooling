import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction, DeployResult } from "hardhat-deploy/types";

// Usage: `yarn deploy:<NETWORK> --tags ConstantSumPricingModule` e.g. `yarn deploy:localhost --tags ConstantSumPricingModule`
const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  console.log("=================================================");

  const result: DeployResult = await deploy("ConstantSumPricingModule", {
    from: deployer,
    args: [],
    log: true,
    autoMine: true,
  });

  if (result.newlyDeployed) {
    console.log("ConstantSumPricingModule deployed to:", result.address);
  } else {
    console.log("ConstantSumPricingModule already deployed at:", result.address);
  }

  console.log("=================================================");
};

export default func;
func.tags = ["ConstantSumPricingModule", "PricingModules"];
