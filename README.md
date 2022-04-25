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
# Live Network Deploy commmands used

```
 npx hardhat --network matic deploy --tags "governance_token"
 npx hardhat --network matic deploy --tags "timelock"
 npx hardhat --network matic deploy --tags "governor"
 npx hardhat --network matic deploy --tags "setup"
 npx hardhat --network matic deploy --tags "token"
```

# Polygon Mumbai contracts
* Governance token at 0x61689cc7777D3bE8dEE5e3d4d7633b7721714648
* TimeLock at 0xa53ba6016c8D6d02Ee8a4417093F25Ce3C89cD59
* Governor contract at: 0x5C5608860aCF0A2A7A082CD8c764Ad972220Ba90
* Web3DAOToken Contract at 0xf7a060590ac2Df0719a62F5CeC19105FAC2a8517