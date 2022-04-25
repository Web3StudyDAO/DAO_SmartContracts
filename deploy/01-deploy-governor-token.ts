import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { ethers } from "hardhat";

const deployGovernanceToken: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { getNamedAccounts, deployments } = hre;
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    log("Deploying Governance Token...");
    const governanceToken = await deploy("Web3DAOGovernanceToken", {
        from: deployer,
        args: [],
        log: true,
        // TODO waitConfirmation: 1

    });
    //TODO Verify
    log(`Deployed governance token to address ${governanceToken.address}`);

    await delegate(governanceToken.address, deployer);
    log("Delegated");
};

const delegate = async (governanceTokenAddress: string, delegatedAccount: string) => {
    const governanceToken = await ethers.getContractAt("Web3DAOGovernanceToken", governanceTokenAddress);
    const tx = await governanceToken.delegate(delegatedAccount);
    tx.wait(1);
    console.log(`Checkpoints ${await governanceToken.numCheckpoints(delegatedAccount)}`);
};

export default deployGovernanceToken;
deployGovernanceToken.tags = ["all", "governance_token"]
