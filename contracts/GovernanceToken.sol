// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";

contract Web3DAOGovernanceToken is ERC20Votes {
    uint256 public s_maxSupply = 1_000_000 * 1e18;

    constructor() ERC20("Web3DAOGovernanceToken", "W3DAOG") ERC20Permit("Web3DAOGovernanceToken") {
        _mint(msg.sender, s_maxSupply);
    }

    //overrides required by solidity
    function _afterTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override(ERC20Votes) {
        super._afterTokenTransfer(from, to, amount);
    }
    function _mint(address to, uint256 amount) internal override(ERC20Votes) {
        super._mint(to, amount);
    }
    function _burn(address account, uint256 amount) internal override(ERC20Votes) {
        super._burn(account, amount);
    }
}

// TODO: Only owner can transfer Gov Tokens or swap them for subscription types. Override transfer function
// TODO: swaping (in this context) means that gov tokens are given back to the owner
