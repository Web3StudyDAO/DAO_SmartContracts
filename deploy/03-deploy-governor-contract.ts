import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { VOTING_DELAY, VOTING_PERIOD, QUORUM_PERCENTAGE } from "../helper-hardhat-config";

const deployGovernorContract: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const { getNamedAccounts, deployments } = hre;
    const { deploy, log, get } = deployments;
    const { deployer } = await getNamedAccounts();
    const governanceToken = await get("Web3DAOGovernanceToken");
    const timeLock = await get("TimeLock");

    log("Deploying Governor Contract...")
    const governorContract = await deploy("GovernorContract", {
        from: deployer,
        args: [
            governanceToken.address,
            timeLock.address,
            VOTING_DELAY,
            VOTING_PERIOD,
            QUORUM_PERCENTAGE,
        ],
        log: true,
    });
    log(`Deployed Governor contract at: ${governorContract.address}`);
};

export default deployGovernorContract;
deployGovernorContract.tags = ["all", "governor"]