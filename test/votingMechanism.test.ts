import { Web3DAOToken, GovernorContract, Web3DAOGovernanceToken, TimeLock } from "../typechain-types";
import { assert, expect } from "chai";
import { deployments, ethers, getNamedAccounts } from "hardhat";
import { VOTING_DELAY, VOTING_PERIOD } from "../helper-hardhat-config"
import { moveBlocks } from "../utils/move-blocks"


describe.only("Governor Flow", async () => {
    // let governor: GovernorContract
    let governor: GovernorContract
    let governanceToken: Web3DAOGovernanceToken
    let timeLock: TimeLock
    let token: Web3DAOToken

    let deployer: string
    let receiver: string
    
    beforeEach(async () => {
        await deployments.fixture(["all"])
        governanceToken = await ethers.getContract("Web3DAOGovernanceToken")
        timeLock = await ethers.getContract("TimeLock")
        governor = await ethers.getContract("GovernorContract")
        token = await ethers.getContract("Web3DAOToken");

        ({deployer, receiver} = await getNamedAccounts())

    });

    it("can only be changed through governance", async () => {
        await expect(
            token.mint(1)
        ).to.be.revertedWith("Ownable: caller is not the owner")
    });

    //TODO: Verify tokens were transferd
    it("proposes, votes, waits, queues, and then executes", async () => {
        const PROPOSAL_DESCRIPTION = "Reward John Doe with 1 Token for his talk about Web3"

        //propose
        const encodedFunctionCall = token.interface.encodeFunctionData("transfer", [receiver, ethers.utils.parseEther("1")])
        const proposeTx = await governor.propose(
            [token.address],
            [0],
            [encodedFunctionCall],
            PROPOSAL_DESCRIPTION,
        )
        const proposeReceipt = await proposeTx.wait(1)
        const proposalId = proposeReceipt.events![0].args!.proposalId
        let proposalState = await governor.state(proposalId)
        console.log(`Current Proposal State: ${proposalState}`)

        await moveBlocks(VOTING_DELAY + 1)

        //vote
        // 1 = for (spanish: a favor)
        const voteTx = await governor.castVoteWithReason(proposalId, 1, "Great talk!")
        await voteTx.wait(1)
        proposalState = await governor.state(proposalId)
        assert.equal(proposalState.toString(), "1")
        console.log(`Current Proposal State: ${proposalState}`)

        await moveBlocks(VOTING_PERIOD + 1)

    });
});
