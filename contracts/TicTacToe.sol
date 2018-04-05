pragma solidity ^0.4.17;
contract TicTacToe{

    struct Game {
        address player1;
        address player2;
        address[9] board;
        address winner;
        bool hasWon;
        address turn;
    }

    mapping(uint => Game) myGame;

    uint id =0;
    uint availS = 9;

    Game[] public games;

    event WhoMadeTheMove(address);
    event EnterWinnerCheck(address);
    event FoundWinner(address);
    event ShowTurn(address);
    event ShowMEWhatIJustPushed(address,address,address[9],address,bool,address);





    function createGame(address _p1, address _player2) public {
        address[9] memory board;
        games.push(Game(_p1, _player2, board, 0, false, _p1));


    }




    function makeMove( address _player, uint8 _xy) public returns (bool) { // will return true if one player won and game is over
        WhoMadeTheMove(_player);
        require(availS!=0);
        Game memory g = games[id];
        require(msg.sender == _player);
        require(g.turn == _player);
        require(g.board[_xy] == 0);
        require(g.hasWon != true);
        games[id].board[_xy] = _player;
        //games[id].turn = _player == g.player1 ? g.player2 : g.player1;// wth is this doing


        if(checkWin(g, _player) == true){
            FoundWinner(_player);
            g.winner = _player;
            g.hasWon = true;

            return true;
        }


        if(g.hasWon == false){
            address myTurn;
            if(games[id].turn == g.player1 ){

                myTurn= g.player2;
                ShowTurn(myTurn);
            }else{
                myTurn=g.player1;
                ShowTurn(myTurn);
            }

            games.push(Game(g.player1,g.player2, games[id].board,0,false,myTurn));
            ShowMEWhatIJustPushed(g.player1,g.player2, games[id].board,0,false,myTurn);
            id++;

            return false;

        }


    }

    function setWinner(Game _g, address _winner) private pure returns (bool) {
        _g.winner = _winner;
        _g.hasWon = true;
        return true;
    }


    function availableSPots(Game _game) private returns (uint) {
        for(uint i=0; i<=9; i++){
            if(_game.board[i]== 0){
                availS --;
            }
        }

        return availS;
    }

    function checkWin(Game _game, address _player) private  returns (bool) {

        if (
            (_game.board[0] == _player && _game.board[1] == _player && _game.board[2] == _player) ||
            (_game.board[3] == _player && _game.board[4] == _player && _game.board[5] == _player) ||
            (_game.board[6] == _player && _game.board[7] == _player && _game.board[8] == _player) ||
            (_game.board[0] == _player && _game.board[3] == _player && _game.board[6] == _player) ||
            (_game.board[1] == _player && _game.board[4] == _player && _game.board[7] == _player) ||
            (_game.board[2] == _player && _game.board[5] == _player && _game.board[8] == _player) ||
            (_game.board[0] == _player && _game.board[4] == _player && _game.board[8] == _player) ||
            (_game.board[2] == _player && _game.board[4] == _player && _game.board[6] == _player)
        ) {
            EnterWinnerCheck(_player);
            setWinner(_game,_player);
            return true;
        } else {
            return false;
        }

    }
}