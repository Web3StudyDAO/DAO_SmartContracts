// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/governance/TimelockController.sol";

contract TimeLock is TimelockController {
    constructor(
        uint256 minDelay, // How long you have to wait before executing
        address[] memory proposers, // list of addresses that can propose
        address[] memory executors // who can execute when a a proposal passes
    ) TimelockController(minDelay, proposers, executors) {}
}
