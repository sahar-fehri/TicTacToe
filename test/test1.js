var tictactoe = artifacts.require("./TicTacToe.sol");


var inst;
contract('tictactoe', function (accounts) {
    it("should make one of the players win ", function () {
        return tictactoe
            .deployed()
            .then(function (instance) {
                 this.inst = instance;
                console.log('this is contract address', this.inst.address)
                return this.inst
                
            }).then(function (val) {
                //console.log(accounts[0], accounts[1])
                return val.createGame(accounts[0],accounts[1],{from : accounts[0]});


            }).then(function () {
                return this.inst.games.call(0)

            }).then(function (g) {
                console.log('this is the game u pushed after calling create game',g)
                return this.inst.makeMove.sendTransaction(0,0, {from: accounts[0]})
            })
        
    })
    
})