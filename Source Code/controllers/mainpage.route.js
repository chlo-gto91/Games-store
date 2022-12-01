// controllers/mainpage.route.js

const { request, response } = require('express');
const express = require('express');
const router = express.Router();
const gameRepo = require('../Repository/game.repository');


router.get('/', gameStockShowAction);
router.get('/SortPrice/:Price', SortGameByPrice);
router.get('/SortParameter/:Parameter', SortGameByParameter);
router.get('/SortEditor/:Editor', SortGameByEditor);
router.get('/cart/:game_ID', AddToCart);
router.get('/oneGame/:game_ID', ShowOneGame);



async function gameStockShowAction(request, response){
    let game_stock = await gameRepo.getAllGame();
    // let game_stock1 = await gameRepo.getGameIDover10();
    let flashMessage = request.session.flashMessage;
    request.session.flashMessage = "";
    
    //console.log(game_stock);
    response.render("mainpage_view", {"game_stock": game_stock, "flashMessage": flashMessage});
}


async function SortGameByPrice(request, response){
    var game_price = await gameRepo.getGameByPrice(request.params.Price);
    var flashMessage = request.session.flashMessage;
    request.session.flashMessage ="";

    //console.log(game_price);
    response.render("gamePrice_view", {"game_price": game_price, "flashMessage": flashMessage});
}


async function SortGameByParameter(request, response){
    var game_Parameter = await gameRepo.getAllGameByCategory(request.params.Parameter);
    var flashMessage = request.session.flashMessage;
    request.session.flashMessage = "";
    
    //console.log(game_Parameter);
    response.render("gameParameter_view", {"game_Parameter": game_Parameter, "flashMessage": flashMessage});
}


async function SortGameByEditor(request, response){
    var game_Editor = await gameRepo.getAllGameByEditor(request.params.Editor);
    var flashMessage = request.session.flashMessage;
    request.session.flashMessage = "";
    
    //console.log(game_Editor);
    response.render("gameParameter_view", {"game_Parameter": game_Editor, "flashMessage": flashMessage});
}


async function AddToCart(request, response){
    let game_cart = await gameRepo.getOneGame(request.params.game_ID);
    let flashMessage = request.session.flashMessage;
    request.session.flashMessage = "";

    //console.log(game_to_cart);
    response.render("cart", {"game_cart": game_cart, "flashMessage": flashMessage});
}

async function ShowOneGame(request, response){
    let onegame = await gameRepo.getOneGame(request.params.game_ID);
    let flashMessage = request.session.flashMessage;
    request.session.flashMessage = "";

    response.render("game_view", {"onegame": onegame, "flashMessage": flashMessage});
}

// http://localhost:8000/mainpage

module.exports = router;