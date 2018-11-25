var Token = artifacts.require("./MetaTxToken.sol");

module.exports = function(deployer) {
  const _name = 'Meta Tx FTW';
  const _symbol = 'MTT';
  const _decimals = 18;

  deployer.deploy(Token, _name, _symbol, _decimals);
};
