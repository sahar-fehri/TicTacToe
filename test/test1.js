var tictactoe = artifacts.require("./TicTacToe.sol");


var inst;
contract('tictactoe', function (accounts) {


    beforeEach(function() {
      return tictactoe
          .deployed()
          .then(function (instance) {
              inst = instance
          }).then(function () {
              return inst.createGame(accounts[0],accounts[1],{from : accounts[0]})
          })
    });


    it("should make one of the players win ", function () {
        // return tictactoe
        //         .deployed()
        //         .then(function (instance) {
        //             inst = instance;
                    console.log('this is contract address', inst.address)
                    //return inst.createGame(accounts[0],accounts[1],{from : accounts[0]})

               // })
                //.then(function () {
                    return inst.games.call(0)

               // })
                .then(function (g) {
                    console.log('this is the game u pushed after calling create game',g)
                    return inst.makeMove.sendTransaction(0,0, {from: accounts[0]})
                }).then(()=>{
                return inst.games.call(0)
            }).then(function (g) {
            console.log('this is the game u pushed after calling create game  ',g)
            return inst.makeMove.sendTransaction(5,0, {from: accounts[1]})
        }).then(function (g) {
            console.log('this is the game u pushed after calling create game tx',g)
            return inst.makeMove.sendTransaction(1,0, {from: accounts[0]})
        }).then(function (g) {
            console.log('this is the game u pushed after calling create game tx',g)
            return inst.makeMove.sendTransaction(3,0, {from: accounts[1]})
        }).then(function (g) {
            console.log('this is the game u pushed after calling create game tx',g)
            return inst.makeMove.sendTransaction(2,0, {from: accounts[0]})
        }).then(function (g) {
            return inst.games.call(0)
        }).then(function (g) {
            console.log('fffffffffffffffffff',g)
            assert.equal(accounts[0], g[2], ' two addresses should be equal to winner')

        })

    })

    it("should test the create game ", async function() {
        let myGame = await inst.createGame(accounts[3],accounts[4],{from : accounts[0]})
        let pushedG = await inst.games.call(2)
        console.log('awwwwwwwwwwwwwwwwww', pushedG)
        assert.equal(pushedG[0], accounts[3],' first player address')
        assert.equal(pushedG[1], accounts[4], 'second player address')
        assert.equal(pushedG[2], 0)
        assert.equal(pushedG[3], false)
        assert.equal(pushedG[4], accounts[3],'first turn')

    })

    it("should make a move", async function(){
        let mygame3 = await inst.games.call(3)
        let myMove = await inst.makeMove(1,3, {from: accounts[0]})
        console.log('moooooooooooove',myMove)
         numberOfEvents = myMove.logs.length
        console.log('number of events', numberOfEvents)
        ShowTurn = (myMove.logs[0].args.d)
        console.log('11111111111111111',typeof ShowTurn)
        assert.equal(ShowTurn,(accounts[1]))
        TieGameStill = myMove.logs[1].args.random
        assert.equal(TieGameStill,'No winners yet')
        let myBoard = await inst.getBoard.call(3)

        assert.equal(myBoard[1],accounts[0])

    })

    it("should test  if the winner is set ",async function(){
        let myGame4 = await inst.games.call(4)
        console.log('gggggggggggggggggggggggg',myGame4)
        let makeMove1= await inst.makeMove(0,4, {from: accounts[0]})

        let makeMove2= await inst.makeMove(6,4, {from: accounts[1]})

        let makeMove11= await inst.makeMove(1,4, {from: accounts[0]})

        let makeMove22 = await inst.makeMove(4,4, {from: accounts[1]})

        let makeMove12= await inst.makeMove(2,4, {from: accounts[0]})

        numberOfEvents = makeMove12.logs.length
        assert.equal(numberOfEvents, 2)
        ShowTurn = (makeMove12.logs[0].args.d)
        FoundWinner = makeMove12.logs[1].args.c
        assert.equal(ShowTurn,accounts[1])
        assert.equal(FoundWinner,accounts[0])

    })




    it('should fire an event telling that the game is tied', function () {
        console.log('addddddddddddddddd', inst.address)
        console.log('acccc', accounts[0])
        //return inst.makeMove.sendTransaction(0,0, {from:accounts[0], gas:5600000})
            return inst.games.call(1)
            .then(function (val) {
                console.log('----',val)
            }).then(function (g) {
                    return inst.makeMove.sendTransaction(0,1, {from: accounts[0]})
                })

                .then(function () {
                    return inst.makeMove.sendTransaction(4,1, {from: accounts[1]})
                }).then(function () {
                    return inst.makeMove.sendTransaction(1,1, {from: accounts[0]})
                }).then(function () {
                    return inst.makeMove.sendTransaction(2,1, {from: accounts[1]})
                }).then(function () {
                    return inst.makeMove.sendTransaction(6,1, {from: accounts[0]})
                })
                 .then(function () {
                    return inst.makeMove.sendTransaction(3,1, {from: accounts[1]})
                 })
                     .then(function () {
                     return inst.makeMove.sendTransaction(5,1, {from: accounts[0]})
                 })
                          .then(function () {
                     return inst.makeMove.sendTransaction(8,1, {from: accounts[1]})
                 })
                    .then(function () {
                     return inst.makeMove(7,1, {from: accounts[0]})
                 })
                .then(function (result) {

                    for (var i = 0; i < result.logs.length; i++) {
                        var log = result.logs[i];

                        if (log.event == "TieGameStill") {
                            console.log('event',log.args)
                            break;
                        }
                    }
                })
                
                .then(function () {
                    return inst.games.call(1)
                }).then(function (g) {
                    console.log('looooooooooosst gameee', g)
                })

    })

})
