// deploy code will go here
const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
require('dotenv').config({path: __dirname + '/.env'});
const { abi, evm } = require('./utils/getContract')(process.env.CONTRACT)

let provider = new HDWalletProvider({
    mnemonic: process.env.MNEMONIC,
    providerOrUrl: process.env.INFURA_API
  });

console.log("API " + process.env.INFURA_API);

const web3 = new Web3(provider);

const deploy = async() => {
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy from account', accounts[0]);
    const result = await new web3.eth.Contract(abi)
        .deploy({ data: evm.bytecode.object })
        .send({ gas: '1000000', from: accounts[0] });
    console.log('Contract deployed to', result.options.address)
    provider.engine.stop();
};
deploy();
