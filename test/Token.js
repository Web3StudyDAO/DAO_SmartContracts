const { expect } = require("chai");
const { ethers } = require("hardhat");



describe("Web3DAOToken Contract", () => {

    let totalSupply = 1000000;
    let Token;
    let owner;
    let hardhatToken;

    beforeEach(async () => {
        Token = await ethers.getContractFactory("Web3DAOToken");
        [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
        hardhatToken = await Token.deploy(totalSupply);
    });

    describe("Deployment", () => {
        it("Deployment should assign the total supply of tokens to the owner", async () => {
            const ownerBalance = await hardhatToken.balanceOf(owner.address);
            expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
        });
    });

    describe ("Transactions", () => {
        it("Should transfer tokens between accounts", async () => {
            await hardhatToken.transfer(addr1.address, 50);
            expect(await hardhatToken.balanceOf(addr1.address)).to.equal(50);
            expect(await hardhatToken.balanceOf(owner.address)).to.equal(999950);

            await hardhatToken.connect(addr1).transfer(addr2.address, 49);
            expect(await hardhatToken.balanceOf(addr1.address)).to.equal(1);
            expect(await hardhatToken.balanceOf(addr2.address)).to.equal(49);

        });

        it("Should fail if sender doesn't have enough tokens", async () => {
            const initialOwnerBalance = await hardhatToken.balanceOf(owner.address);

            await expect(
                hardhatToken.connect(addr1).transfer(addr2.address, 50)
            ).to.be.revertedWith("ERC20: transfer amount exceeds balance");

            expect(await hardhatToken.balanceOf(owner.address)).to.equal(initialOwnerBalance);

        });
    });
}

)