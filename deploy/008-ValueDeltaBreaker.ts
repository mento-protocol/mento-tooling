import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction, DeployResult } from "hardhat-deploy/types";

// Usage: `yarn deploy:<NETWORK> --tags ValueDeltaBreaker`
//          e.g. `yarn deploy:localhost --tags ValueDeltaBreaker`
//          e.g. `yarn deploy:localhost --tags Breakers`
//          e.g. `yarn deploy:localhost --tags CircuitBreaker`
const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  // Constructor arguments for ValueDeltaBreaker
  const defaultCooldownTime: number = 0;
  const defaultRateChangeThreshold: number = 0;
  //TODO: Add function to fetch addresses from registry
  const sortedOraclesAddress: string = "0x0000000000000000000000000000000000000001";
  const rateFeedIds: string[] = [];
  const rateChangeThresholds: number[] = [];
  const cooldowns: number[] = [];

  console.log("=================================================");

  const result: DeployResult = await deploy("ValueDeltaBreaker", {
    from: deployer,
    args: [
      defaultCooldownTime,
      defaultRateChangeThreshold,
      sortedOraclesAddress,
      rateFeedIds,
      rateChangeThresholds,
      cooldowns,
    ],
    log: true,
    autoMine: true,
  });

  if (result.newlyDeployed) {
    console.log("ValueDeltaBreaker deployed to:", result.address);
  } else {
    console.log("ValueDeltaBreaker already deployed at:", result.address);
  }

  console.log("=================================================");
};

export default func;
func.tags = ["ValueDeltaBreaker", "CircuitBreaker", "Breakers"];
