// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Web3DAOToken is ERC20, Ownable {
    constructor(uint initialSupply) ERC20("Web3DAO", "W3DAO") {
        _mint(msg.sender, initialSupply);
    }

    function mint(uint256 amount) public onlyOwner {
        _mint(msg.sender, amount);
    }
}

// TODO: Make it ownable
// TODO: create mint function allowing only to the owner
// TODO: transfer ownership in the deploy script
// TODO: create unit tests for mint function