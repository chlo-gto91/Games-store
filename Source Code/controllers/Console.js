const { request, response } = require('express');
const express = require('express');
const router = express.Router();
const consoleRepo = require('../Repository/console.repository');


router.get('/', ConsoleShowAction);
router.get('/ConsoleByPrice/:PriceConsole', SortConsoleByPrice);
router.get('/ConsoleByStockage/:StockageConsole', SortConsoleByStockage);
//router.get('/:ConsoleID', ConsoleAddToCart);

async function ConsoleShowAction(request, response){
    let console = await consoleRepo.getAllConsole();
    let flashMessage = request.session.flashMessage;
    request.session.flashMessage = "";

    
    response.render("console_view", {"console":console, "flashMessage":flashMessage});
}

async function SortConsoleByPrice(request, response){
    var console_price = await consoleRepo.getConsoleByPrice(request.params.PriceConsole);
    var flashMessage = request.session.flashMessage;
    request.session.flashMessage = "";

    response.render("ConsoleByPrice_view", {"console_price":console_price, "flashMessage":flashMessage});
}

async function SortConsoleByStockage(request, response){
    var stockage_console = await consoleRepo.getConsoleByStockage(request.params.StockageConsole);
    var flashMessage = request.session.flashMessage;
    request.session.flashMessage ="";
    //console.log(stockage_console);

    response.render("ConsoleByStockage_view", {"stockage_console":stockage_console, "flashMessage":flashMessage });
}

/*
async function ConsoleAddToCart(request, response){
    var ConsoleToCart = await consoleRepo.getOneConsole(response.params.ConsoleID);
    var flashMessage = request.session.flashMessage;
    request.session.flashMessage = "";

    response.render("cart", {"ConsoleToCart":ConsoleToCart, "flashMessage":flashMessage});
}
*/
module.exports = router;