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
router.get('/adminview', AdminView);
router.get('/EditTable/:game_ID', EditTable);
router.get('/UpdateGame', UpdateGame);


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
    let onegame = await gameRepo.getOneGameAndEditor(request.params.game_ID);
    let flashMessage = request.session.flashMessage;
    request.session.flashMessage = "";
    console.log(onegame);
    response.render("game_view", {"onegame": onegame, "flashMessage": flashMessage});
}

async function AdminView(request, response){
    let adminview = await gameRepo.getAllGame();
    let flashMessage = request.session.flashMessage;
    request.session.flashMessage = "";
    //console.log(onegame);
    response.render("admin_view", {"adminview": adminview, "flashMessage": flashMessage});
}

async function EditTable(request, response){
    let EditOneGame = await gameRepo.getOneGameAndEditor(request.params.game_ID);
    let game_category = await gameRepo.getAllGame();
    // let flashMessage = request.session.flashMessage;
    // request.session.flashMessage = "";
    console.log(EditOneGame);
    response.render("editgame_view", {"EditOneGame": EditOneGame, "game_category":game_category});
}

async function UpdateGame(request, response){
    var gameID = request.params.game_ID;
    var numRows = await gameRepo.editOneGame(1,
        request.body.Game_Name,
        request.body.Game_Description,
        request.body.Game_Category,
        request.body.Game_Price,
        request.body.Game_Stock,
        );

    request.session.flashMessage = "ROWS UPDATED: "+ numRows;
    response.redirect("/main_page/adminview");
}
// http://localhost:8000/mainpage

module.exports = router;