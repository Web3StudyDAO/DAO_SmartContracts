import { Web3DAOToken, GovernorContract, Web3DAOGovernanceToken, TimeLock } from "../typechain-types";
import { assert, expect } from "chai";
import { deployments, ethers } from "hardhat";
import { Deployment } from "hardhat-deploy/types";


describe.only("Governor Flow", async () => {
    // let governor: GovernorContract
    let governor: Deployment
    let governanceToken: Deployment
    let timeLock: Deployment
    let token: Web3DAOToken;

    beforeEach(async () => {
        await deployments.fixture(["all"]);
        governanceToken = await deployments.get("Web3DAOGovernanceToken")
        timeLock = await deployments.get("TimeLock")
        governor = await deployments.get("GovernorContract")
        token = await ethers.getContract("Web3DAOToken")
        // governanceToken = await ethers.getContract("GovernanceToken")
    })

    it("can only be changed through governance", async () => {
        // await token.mint(1);
        await expect(
            token.mint(1)
            ).to.be.revertedWith("Ownable: caller is not the owner")
    });
    
    //TODO: Verify tokens were transferd
    it("proposes, votes, waits, queues, and then executes");



});