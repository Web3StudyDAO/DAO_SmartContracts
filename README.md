# Basic Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```
# Live Network Deploy commmands
execute them one at a time

```shell
npx hardhat --network matic deploy --tags "governance_token"
npx hardhat --network matic deploy --tags "timelock"
npx hardhat --network matic deploy --tags "governor"
npx hardhat --network matic deploy --tags "setup"
npx hardhat --network matic deploy --tags "token"
```

# Polygon Mumbai contracts
* GovernorContract: 0xC95D8F3cE6cb9844C793f5938AAe0E12a320D8F1
* TimeLock 0xb8Da396c0d76B484f65B77a852501a2728f6853E
* Web3DAOGovernanceToken 0x41b374824C258c70964644D260C555a9334C566B
* Web3DAOToken 0x4f1C4d6710072F31f0E0EC54d85065e237BE957c

## Deployed Test Tally interface
* Testnet - Web3 Study DAO: https://www.tally.xyz/governance/eip155:80001:0xC95D8F3cE6cb9844C793f5938AAe0E12a320D8F1

# Verify contracts on mumbai etherscan
* get the APIKEY in https://polygonscan.com/myapikey
* config the `ApiKey` on hardhat config