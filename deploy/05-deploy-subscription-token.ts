import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import { ethers } from 'hardhat';
import { time } from 'console';

const deploySubscriptionToken: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { getNamedAccounts, deployments} = hre;
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    log("Deploying Subscription Token Contract...");

    const initialSupply = await ethers.utils.parseEther("1000000");
    const token = await deploy("Web3DAOToken", {
        from: deployer,
        args: [initialSupply],
        log: true,
    });

    const timeLock = await ethers.getContract("TimeLock");
    const tokenContract = await ethers.getContractAt("Web3DAOToken", token.address);
    const transferOwnershipTx = await tokenContract.transferOwnership(timeLock.address);
    await transferOwnershipTx.wait(1);
    const transferTokensToOwnerTx = await tokenContract.transfer(timeLock.address, initialSupply);
    await transferTokensToOwnerTx.wait(1);

    log(`Deployed Web3DAOToken Contract to address ${token.address}`)


    // transfer everything to the timelock
};

export default deploySubscriptionToken;
deploySubscriptionToken.tags = ["all", "token"]
