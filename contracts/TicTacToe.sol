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



    Game[] public games;

    event WhoMadeTheMove(address a);
    event EnterWinnerCheck(address b);
    event FoundWinner(address c);
    event ShowTurn(address d);
    event ShowMEWhatIJustPushed(address e,address f,address[9] g,address h ,bool i ,address j);
    event TieGameStill(string random);





    function createGame(address _p1, address _player2) public {
        address[9] memory board;
        games.push(Game(_p1, _player2, board, 0, false, _p1));


    }




    function makeMove( uint8 _xy, uint id) public { // will return true if one player won and game is over
        // WhoMadeTheMove(msg.sender);     // id is for which game you are playing
        //ShowTurn(msg.sender);

        Game memory g = games[id];

        require(g.turn == msg.sender);
        require(g.board[_xy] == 0);
        require(g.hasWon != true);
        games[id].board[_xy] = msg.sender;
        games[id].turn = msg.sender == g.player1 ? g.player2 : g.player1;

        ShowTurn(games[id].turn);
        g = games[id];

        if(checkWin(g, msg.sender) == true){
            FoundWinner(msg.sender);
            games[id].winner = msg.sender;
            games[id].hasWon = true;


        }else{
            TieGameStill('No winners yet');
        }




    }

    function setWinner(Game _g, address _winner) private returns (bool) {
        _g.winner = _winner;
        _g.hasWon = true;
        return true;
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

            setWinner(_game,_player);
            return true;
        } else {
            return false;
        }

    }

    function getBoard (uint id) public view returns (address[9]) {


        address[9] memory board = games[id].board;


        return board;
    }
}
