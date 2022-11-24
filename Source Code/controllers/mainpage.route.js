// controllers/mainpage.route.js

const { request, response } = require('express');
const express = require('express');
const router = express.Router();
const gameRepo = require('../Repository/game.repository');


router.get('/main_page', gameStockShowAction);


async function gameStockShowAction(request, response){
    var game_stock = await gameRepo.getAllGameStock();
    var flashMessage = request.session.flashMessage;
    request.session.flashMessage = "";

    response.render("mainpage", {"game_stock": game_stock, "flashMessage": flashMessage});
}



// http://localhost:8000/mainpage


router.get('/', (req, res) => {
    res.render('mainpage_view', { favourites: []});
});


module.exports = router;