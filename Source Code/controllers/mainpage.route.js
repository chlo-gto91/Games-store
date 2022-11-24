// controllers/mainpage.route.js

const { request, response } = require('express');
const express = require('express');
const router = express.Router();
const gameRepo = require('../Repository/game.repository');


router.get('/', gameStockShowAction);


async function gameStockShowAction(request, response){
    let game_stock = await gameRepo.getAllGameStock();
    let flashMessage = request.session.flashMessage;
    request.session.flashMessage = "";
    //console.log(game_stock);
    response.render("mainpage_view", {"game_stock": game_stock, "flashMessage": flashMessage});
}



// http://localhost:8000/mainpage

/*
router.get('/', (req, res) => {
    res.render('mainpage_view', { favourites: []});
});
*/

module.exports = router;