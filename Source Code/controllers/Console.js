const { request, response } = require('express');
const express = require('express');
const router = express.Router();
const consoleRepo = require('../Repository/console.repository');


router.get('/', ConsoleShowAction);
router.get('/ConsoleByPrice/:PriceConsole', SortConsoleByPrice);
router.get('/ConsoleByStockage/:StockageConsole', SortConsoleByStockage);
router.get('/OneConsole/:ID_console', ShowOneConsole);
router.get('/', consoleStockShowAction);

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


async function ShowOneConsole(request, response){
    let oneconsole = await consoleRepo.getOneConsole(request.params.ID_console);
    let flashMessage = request.session.flashMessage;
    request.session.flashMessage = "";
    //console.log(onegame);
    response.render("console_view", {"oneconsole": oneconsole, "flashMessage": flashMessage});
}

async function consoleStockShowAction(request, response){
    let console_stock = await consoleRepo.getAllConsole();
    
    let flashMessage = request.session.flashMessage;
    request.session.flashMessage = "";
    
    //console.log(game_stock);
    response.render("console_view", {"console_stock": console_stock, "flashMessage": flashMessage});
}

// http://localhost:8000/home

module.exports = router;

