var Migrations = artifacts.require("./Migrations.sol");
var TicTacToe = artifacts.require("./TicTacToe.sol")

module.exports = function(deployer) {
  //deployer.deploy(Migrations);
  deployer.deploy(TicTacToe);
};
