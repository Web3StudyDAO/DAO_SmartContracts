import "@typechain/hardhat";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-ethers";
import "hardhat-deploy";
import { HardhatUserConfig } from "hardhat/types";
import { PRIVATE_KEY, APIKEY } from "./env";
import { ethers } from "hardhat";

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  solidity: "0.8.9",
  networks: {
    hardhat: {
      chainId: 31337,
    },
    localhost: {
      chainId: 31337,
    },
    matic: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: [PRIVATE_KEY],
      gasPrice: 8e10,
      // gas: 4e17
      verify: {
        etherscan: {
          apiUrl: 'https://api-testnet.polygonscan.com/',
          apiKey: APIKEY
        }
      }
    }
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
    receiver: {
      default: 1,
    }
  }
}

export default config;