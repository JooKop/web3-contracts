# web3-contracts
## Introduction

This repository contains assorted Smart Contracts written in the https://docs.soliditylang.org/ programming language. The compiled contracts may be deployed to the Ethereum blockchain and interacted with via e.g. a Web3 website.

The technology used to compile, test and deploy the Smart Contracts is JavaScript running on [Node.js](https://nodejs.org/en/). You can see all the runnable scripts in the [Scripts](#Scripts) section.

## List of contracts
| Contract | Description | Example
| ------ | ------ | ----- |
| [Lottery](contracts/Lottery.sol) | A simple lottery contract. Users may send money to the contract and the manager who deployed the contract may choose the winner by random. The winner will then receive the sum of money stored in the contract. | [web3-lottery](https://github.com/JooKop/web3-lottery)
| [Inbox](contracts/Inbox.sol) | A very simple inbox contract. When deployed, the creator may choose an initial message stored in the contract. That message may be read or altered by later calls and transactions to the contract by anyone. |
| [StringArray](contracts/StringArray.sol) | When deployed, anyone can add messages to the contract and read the list of existing messages. |

## Scripts
You may test, compile and deploy the Solidity Smart Contracts by running the following scripts:

### Installation
Before starting, you must install all the project dependencies by running:
```npm install```

### Compiling
The first step is always compiling our Smart Contracts. Run the following command to compile all the contracts residing in the [contracts](contracts) folder:
```npm run compile```
The resulting `json` files will be created into a new folder named `build`.

### Testing
We are using [Mocha](https://mochajs.org/) combined with [Ganache-CLI](https://www.npmjs.com/package/ganache-cli) to test our Smart Contracts. 
```npm run test```
If you're constantly updating your contracts, you may combine compiling and testing together by running:
```npm run testc```

### Deploying
The contracts in this repository have so far only been deployed to the [Rinkeby](https://www.rinkeby.io/) test network. This is achieved via utilizing the [Infura Ethereum API](https://infura.io/product/ethereum). To deploy any of the Smart Contracts residing in the repository, you must first create a `.env` file into the root of the repository. The file shall define the following variables:
```
MNEMONIC=<Insert here >
INFURA_API=<API url here>
CONTRACT=<Name of the contract json in build folder, e.g. Lottery.json>
```
To get your own Infura mnemonic and API url, please visit [their website](https://infura.io/) and create an account.

After creating the `.env` file, you may proceed to deploy your chosen Smart Contract by running:
```npm run deploy```

*Note: if your Smart Contract constructor requires arguments, you must define those by hand in the `deploy.js` file. It is currently creating all contracts with no arguments.* 
