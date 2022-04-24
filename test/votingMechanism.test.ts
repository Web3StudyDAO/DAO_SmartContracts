import { Web3DAOToken, GovernorContract, Web3DAOGovernanceToken, TimeLock } from "../typechain-types";
import { assert, expect } from "chai";
import { deployments, ethers, getNamedAccounts } from "hardhat";
import { MIN_DELAY, VOTING_DELAY, VOTING_PERIOD } from "../helper-hardhat-config"
import { moveBlocks } from "../utils/move-blocks"
import { moveTime } from "../utils/move-time"

describe("Governor Flow", async () => {
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

        ({ deployer, receiver } = await getNamedAccounts())

    });

    it("can only be changed through governance", async () => {
        await expect(
            token.mint(1)
        ).to.be.revertedWith("Ownable: caller is not the owner")
    });

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

        // queue & execute
        const descriptionHash = ethers.utils.id(PROPOSAL_DESCRIPTION)
        const queueTx = await governor.queue(
            [token.address],
            [0],
            [encodedFunctionCall],
            descriptionHash
        )
        await queueTx.wait(1)
        await moveTime(MIN_DELAY + 1)
        await moveBlocks(1)

        proposalState = await governor.state(proposalId)
        console.log(`Current Proposal State: ${proposalState}`)

        console.log("Executing...")
        console.log()
        const exTx = await governor.execute(
            [token.address],
            [0],
            [encodedFunctionCall],
            descriptionHash
        )
        await exTx.wait(1)
        expect(
            (await token.balanceOf(receiver))
        ).to.be.equal( ethers.utils.parseEther("1"))
        expect(
            (await token.balanceOf(timeLock.address))
        ).to.be.equal( ethers.utils.parseEther("999999"))
    });
});
