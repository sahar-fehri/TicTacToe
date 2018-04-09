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


    it("should test the create game ", async function() {
        let myGame = await inst.createGame(accounts[3],accounts[4],{from : accounts[0]})
        let pushedG = await inst.games.call(1)
        console.log('The game you just pushed', pushedG)
        assert.equal(pushedG[0], accounts[3],' first player address')
        assert.equal(pushedG[1], accounts[4], 'second player address')
        assert.equal(pushedG[2], 0)
        assert.equal(pushedG[3], false)
        assert.equal(pushedG[4], accounts[3],'first turn')

    })

    it("should make a move", async function(){
        let mygame3 = await inst.games.call(2)
        let myMove = await inst.makeMove(2,1, {from: accounts[0]})
        console.log('the move',myMove)
         numberOfEvents = myMove.logs.length
        console.log('number of events', numberOfEvents)
        ShowTurn = (myMove.logs[0].args.d)
        assert.equal(ShowTurn,(accounts[1]))
        TieGameStill = myMove.logs[1].args.random
        assert.equal(TieGameStill,'No winners yet')
        let myBoard = await inst.getBoard.call(2)

        assert.equal(myBoard[1],accounts[0])

    })

    it("should test  if the winner is set ",async function(){
        let myGame3 = await inst.games.call(3)
        console.log('this is the game',myGame3)
        let makeMove1= await inst.makeMove(3,0, {from: accounts[0]})

        let makeMove2= await inst.makeMove(3,6, {from: accounts[1]})

        let makeMove11= await inst.makeMove(3,1, {from: accounts[0]})

        let makeMove22 = await inst.makeMove(3,4, {from: accounts[1]})

        let makeMove12= await inst.makeMove(3,2, {from: accounts[0]})

        numberOfEvents = makeMove12.logs.length
        assert.equal(numberOfEvents, 2)
        ShowTurn = (makeMove12.logs[0].args.d)
        FoundWinner = makeMove12.logs[1].args.c
        assert.equal(ShowTurn,accounts[1])
        assert.equal(FoundWinner,accounts[0])
        console.log('*****************************************************************************************************')
        let myBoard = await inst.getBoard(3)

        console.log(myBoard[0], '||', myBoard[1],'||', myBoard[2])
        console.log(myBoard[3], '||', myBoard[4],'||', myBoard[5])
        console.log(myBoard[6], '||', myBoard[7],'||', myBoard[8])
        console.log('*****************************************************************************************************')

    })




    it('should fire an event telling that the game is tied', function () {
            return inst.games.call(4)
            .then(function (val) {
                console.log('----',val)
            }).then(function (g) {
                    return inst.makeMove.sendTransaction(4,0, {from: accounts[0]})
                })

                .then(function () {
                    return inst.makeMove.sendTransaction(4,4, {from: accounts[1]})
                }).then(function () {
                    return inst.makeMove.sendTransaction(4,1, {from: accounts[0]})
                }).then(function () {
                    return inst.makeMove.sendTransaction(4,2, {from: accounts[1]})
                }).then(function () {
                    return inst.makeMove.sendTransaction(4,6, {from: accounts[0]})
                })
                 .then(function () {
                    return inst.makeMove.sendTransaction(4,3, {from: accounts[1]})
                 })
                     .then(function () {
                     return inst.makeMove.sendTransaction(4,5, {from: accounts[0]})
                 })
                          .then(function () {
                     return inst.makeMove.sendTransaction(4,8, {from: accounts[1]})
                 })
                    .then(function () {
                     return inst.makeMove(4,7, {from: accounts[0]})
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
                    return inst.games.call(4)
                }).then(function (g) {
                    console.log('this game is even', g)
                })

    })

})
