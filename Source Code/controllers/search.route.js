const { request, response } = require('express');
const express = require('express');
const router = express.Router();
const gameRepo = require('../Repository/game.repository');
const consoleRepo = require('../Repository/console.repository');

router.post('/search', SearchAction);




async function SearchAction(request, response){
    let a = (request.body.game_search).toUpperCase();
    let i=1;
    let oneGame;
    while(i<=20){
        oneGame = await gameRepo.getOneGame(i);
        if (a === oneGame.game_name.toUpperCase()){
            response.redirect("game_view", {"oneGame":oneGame});
        }
        else{
            i++;
        }
    }
    window.alert("Game not found");
    response.redirect('/main_page');
}

// http://localhost:8000/mainpage

module.exports = router;