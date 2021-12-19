// contract test code will go here
const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const { abi, evm } = require('../compile');

let accounts;
let stringArray;

beforeEach(async() => {
    // Get a list of all accounts
    accounts = await web3.eth.getAccounts();
    stringArray = await new web3.eth.Contract(abi)
      .deploy({ data: evm.bytecode.object, })
      .send({ from: accounts[0], gas: '1000000' });
});

describe('Inbox', () => {
    it('deploys a contract', () => {
        assert.ok(stringArray.options.address);
    });

    it('can push a new hi', async() => {
        await stringArray.methods.push().send({ from: accounts[0] });
        const message = await stringArray.methods.getArray().call();
        assert.equal(message[0], 'Hi!');
    });

    it('can push multiple his', async() => {
        for (let i = 0; i < 3; i++)
            await stringArray.methods.push().send({ from: accounts[0] });
        const message = await stringArray.methods.getArray().call();

        assert.equal(message.length, 3);
        assert.equal(message[2], "Hi!");
    });
});
