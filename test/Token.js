const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Token contract", () => {
    it("Deployment should assign the total supply of tokens to the owner", async () => {
        const [owner] = await ethers.getSigners();
        const Token = await ethers.getContractFactory("Web3DAOToken");
        const hardhatToken = await Token.deploy(1000000);
        const ownerBalance = await hardhatToken.balanceOf(owner.address);
        expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
    });
});