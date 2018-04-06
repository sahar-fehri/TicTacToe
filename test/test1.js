var tictactoe = artifacts.require("./TicTacToe.sol");


var inst;
contract('tictactoe', function (accounts) {
    it("should make one of the players win ", function () {
        return tictactoe
                .deployed()
                .then(function (instance) {
                    inst = instance;
                    console.log('this is contract address', inst.address)
                    return inst.createGame(accounts[0],accounts[1],{from : accounts[0]})

                }).then(function () {
                    return inst.games.call(0)

                }).then(function (g) {
                    console.log('this is the game u pushed after calling create game',g)
                    return inst.makeMove.sendTransaction(0,0, {from: accounts[0]})
                }).then(()=>{
                return inst.games.call(0)
            }).then(function (g) {
            console.log('this is the game u pushed after calling create game',g)
            return inst.makeMove.sendTransaction(5,0, {from: accounts[1]})
        }).then(function (g) {
            console.log('this is the game u pushed after calling create game',g)
            return inst.makeMove.sendTransaction(1,0, {from: accounts[0]})
        }).then(function (g) {
            console.log('this is the game u pushed after calling create game',g)
            return inst.makeMove.sendTransaction(3,0, {from: accounts[1]})
        }).then(function (g) {
            console.log('this is the game u pushed after calling create game',g)
            return inst.makeMove.sendTransaction(2,0, {from: accounts[0]})
        }).then(function (g) {
            return inst.games.call(0)
        }).then(function (g) {
            console.log(g)
        })

    })

})
