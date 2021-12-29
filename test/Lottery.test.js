const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const { abi, evm } = require('../utils/getContract')('Lottery.json')

let accounts;
let lottery;

beforeEach(async() => {
    // Get a list of all accounts
    accounts = await web3.eth.getAccounts();
    lottery = await new web3.eth.Contract(abi)
      .deploy({ data: evm.bytecode.object })
      .send({ from: accounts[0], gas: '1000000' });
});

describe('Lottery Contract', () => {
    it('deploys a contract', () => {
        assert.ok(lottery.options.address);
    });

    it('allows one account to enter', async() => {
        await lottery.methods.enter().send({ from: accounts[0], value: web3.utils.toWei('0.2', 'ether')});
        const players = await lottery.methods.getPlayers().call({ from: accounts[0] });
        //assert.equal(players[0], accounts[0]);
        assert.equal(players.length, 1);
    });

    it('allows multiple accounts to enter', async() => {
        for (let i = 0; i < 3; i++)
            await lottery.methods.enter().send({ from: accounts[i], value: web3.utils.toWei('0.2', 'ether')});
        
        const players = await lottery.methods.getPlayers().call({ from: accounts[0] });
        
        for (let i = 0; i < 3; i++)
            assert.equal(players[i], accounts[i]);
    });

    it('require minimum amount of ether to enter', async() => {
        try {
            await lottery.methods.enter().send({ from: accounts[0], value: 200});
            assert(false);
        }
        catch (err) {
            assert(err);
        }
    });

    it('only manager can call pickWinner', async() => {
        await lottery.methods.enter().send({ from: accounts[0], value: web3.utils.toWei('0.3', 'ether')});
        try {
            await lottery.methods.pickWinner().send({ from: accounts[1] });
            throw(false);
        }
        catch (err) {
            assert(err);
        }
    });

    it('sends money to the winner and resets the players array', async() => {
        await lottery.methods.enter().send({ from: accounts[0], value: web3.utils.toWei('2', 'ether')});
        let players = await lottery.methods.getPlayers().call({ from: accounts[0]});
        assert(players.length == 1);
        const initialBalance = await web3.eth.getBalance(accounts[0]);
        await lottery.methods.pickWinner().send({ from: accounts[0] });
        const finalBalance = await web3.eth.getBalance(accounts[0]);
        assert(finalBalance - initialBalance > web3.utils.toWei('1.8', 'ether'));
        players = await lottery.methods.getPlayers().call({ from: accounts[0]});
        assert(players.length == 0);
    });
});
