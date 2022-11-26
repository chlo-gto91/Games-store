// controllers/mainpage.route.js

const { request, response } = require('express');
const express = require('express');
const router = express.Router();
const gameRepo = require('../Repository/game.repository');


router.get('/', gameStockShowAction);
router.get('/SortParameter/:Parameter', SortByParameter);
router.get('/SortEditor/:Editor', SortByEditor);


async function SortByParameter(request, response){
    var game_Parameter = await gameRepo.getAllGameByCategory(request.params.Parameter);
    var flashMessage = request.session.flashMessage;
    request.session.flashMessage = "";
    //console.log(game_Parameter);

    response.render("gameParameter_view", {"game_Parameter": game_Parameter, "flashMessage": flashMessage});
}


async function SortByEditor(request, response){
    alert("Trier par : " + editor);
}


async function gameStockShowAction(request, response){
    let game_stock = await gameRepo.getAllGameStock();
    let flashMessage = request.session.flashMessage;
    request.session.flashMessage = "";
    //console.log(game_stock);
    response.render("mainpage_view", {"game_stock": game_stock, "flashMessage": flashMessage});
}





// http://localhost:8000/mainpage

module.exports = router;