// const shouldFail = require('../../helpers/shouldFail');
// const expectEvent = require('../../helpers/expectEvent');
// const { ZERO_ADDRESS } = require('../../helpers/constants');
const ethers = require('ethers');
const { signMessage, toEthSignedMessageHash } = require('./helpers/sign');

const MetaTxToken = artifacts.require('MetaTxToken');

const BigNumber = web3.BigNumber;

require('chai')
  .use(require('chai-bignumber')(BigNumber))
  .should();

contract('MetaTxToken', function ([_, owner, recipient, anotherAccount]) {

    const _name = 'Meta Tx FTW';
    const _symbol = 'MTT';
    const _decimals = 18;

    const testAmount = 5e10;

    beforeEach(async function () {
        this.token = await MetaTxToken.new(_name, _symbol, _decimals, { from: owner });
        this.token.mint(recipient, testAmount, { from: owner });
    });

    describe('total supply', function () {
        it('returns the total amount of tokens', async function () {
            (await this.token.totalSupply()).should.be.bignumber.equal(testAmount);
        });
    });

    describe('metapprove', function () {
        it('approves transfer based on signature and increments nonce', async function () {
            const approveAmount = 100000;
            const nonce = await this.token.getNonce.call(recipient);
            const toSign = await this.token.payloadToSign.call(recipient, approveAmount, owner, nonce);
            
            // Note (ganache auto-applies "Ethereum Signed Message" prefix).
            const signature = await web3.eth.sign(recipient, toSign);
            
            await this.token.metapprove(recipient, approveAmount, owner, nonce, signature, { from: _ });

            const newAllowance = await this.token.allowance.call(recipient, owner);
            newAllowance.toNumber().should.be.equal(approveAmount);

            const newNonce = await this.token.getNonce.call(recipient);
            newNonce.toNumber().should.be.equal(nonce.toNumber() + 1);
        });
    });
});