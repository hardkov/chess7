const express = require("express");
const user = require('./user.js');
const bodyParser = require('body-parser');
const chess = require('chess');

const { vaildateJWT } = require("./user.js");
const router = express.Router();
const jsonParser = bodyParser.json()
// DATABASE
let gameClient = chess.create({PGN: true});
let games = [{
    gameId: 0,
    gameClient,
    playerToMove: 'iza',
    nextPlayer:'krzys'
}];
//

// start game
router.post('/game/start', vaildateJWT, jsonParser, (req, res) => {
    
});

// make move
router.post('/game/move', vaildateJWT, jsonParser, (req, res) => {
    let currentGame;
    let player = req.jwt.username;

    for(game of games){
        if(game.gameId === req.body.gameId) currentGame = game;
    }

    if(currentGame && currentGame.playerToMove === player){
        try{
            currentGame.gameClient.move(req.body.move);
            currentGame.nextPlayer = player;
            currentGame.playerToMove = currentGame.nextPlayer;
            
            let gameStatus = currentGame.gameClient.getStatus();

            res.json({
                isCheckmate: gameStatus.isCheckmate,
                isRepetition: gameStatus.isRepetition,
                isStalemate: gameStatus.isStalemate
            });
        }
        catch (err){
            console.log(err);
            res.status(400).send();
        }    
    } else{
        res.status(404).send();
    }
});
// response can be success or failure

// ask for available moves? or handle it on the server

// api for games currently beeing played

// get a game


module.exports = router;