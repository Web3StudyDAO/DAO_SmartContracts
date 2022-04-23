// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Web3DAOToken is ERC20 {
    constructor(uint initialSupply) ERC20("Web3DAO", "W3DAO") {
        _mint(msg.sender, initialSupply);
    }
}