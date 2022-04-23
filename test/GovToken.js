const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Web3DAOTokenGovernance Contract", () => {

    let Token;
    let owner;
    let GovToken;

    beforeEach(async () => {
        Token = await ethers.getContractFactory("Web3DAOGovernanceToken");
        [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
        GovToken = await Token.deploy();
    });

    describe("Deployment", () => {
        it("Deployment should assign the total supply of tokens to the owner", async () => {
            const ownerBalance = await GovToken.balanceOf(owner.address);
            expect(await GovToken.totalSupply()).to.equal(ownerBalance);
        });
    });

    describe ("Transactions", () => {
        it("Should transfer tokens between accounts", async () => {
            //TODO This should after implementing restrictions
            parseEther = ethers.utils.parseEther
            await GovToken.transfer(addr1.address, parseEther("1"));
            expect(await GovToken.balanceOf(addr1.address)).to.equal(parseEther("1"));
            expect(await GovToken.balanceOf(owner.address)).to.equal(parseEther("999999"));

            await GovToken.connect(addr1).transfer(addr2.address, parseEther("0.1"));
            expect(await GovToken.balanceOf(addr1.address)).to.equal(parseEther("0.9"));
            expect(await GovToken.balanceOf(addr2.address)).to.equal(parseEther("0.1"));

        });

        it("Should fail if sender doesn't have enough tokens", async () => {
            const initialOwnerBalance = await GovToken.balanceOf(owner.address);

            await expect(
                GovToken.connect(addr1).transfer(addr2.address, 50)
            ).to.be.revertedWith("ERC20: transfer amount exceeds balance");

            expect(await GovToken.balanceOf(owner.address)).to.equal(initialOwnerBalance);

        });

        it("Only owner can transfer Gov Tokens at will");
        it("An address can swap subscription Tokens for Gov Tokens");
        it("Create a snapshot");
        it("delegates and check delegated account");
    });
}

)