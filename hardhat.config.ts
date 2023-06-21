import "dotenv/config";
import "@nomicfoundation/hardhat-foundry";
import "hardhat-deploy";

import { HardhatUserConfig } from "hardhat/config";

const accounts = [process.env.MENTO_DEPLOYER_PK || "0x00"];

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
  networks: {
    localhost: {
      live: false,
      saveDeployments: true, // Best set to false but keeping true to illustrate features.
      tags: ["local"],
    },
    hardhat: {
      forking: {
        enabled: true,
        url: `https://forno.celo.org`,
      },
      allowUnlimitedContractSize: true,
      live: false,
      saveDeployments: true,
      tags: ["fork", "local"],
      hardfork: "berlin",
    },
    celo: {
      url: "https://forno.celo.org",
      chainId: 42220,
      live: true,
      accounts,
      saveDeployments: true,
    },
    alfajores: {
      url: "https://alfajores-forno.celo-testnet.org",
      chainId: 44787,
      accounts,
      live: true,
      saveDeployments: true,
    },
    baklava: {
      url: "https://alfajores-forno.celo-testnet.org",
      chainId: 62320,
      accounts,
      live: true,
      saveDeployments: true,
    },
  },
  solidity: {
    compilers: [
      {
        version: "0.5.0",
        settings: {
          optimizer: {
            enabled: true,
            runs: 999999,
          },
        },
      },
      {
        version: "0.5.13",
        settings: {
          optimizer: {
            enabled: true,
            runs: 999999,
          },
        },
      },
    ],
  },
  paths: {
    // This value cannot be an array, so we can only compile one folder.
    // This means that contracts, such as the PartialReserveProxy, must be moved to mento-core
    // if we want to include them in the deployment.
    sources: "./lib/mento-core/contracts",
  },
};

export default config;
