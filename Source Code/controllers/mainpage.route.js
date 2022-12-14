// controllers/mainpage.route.js

const { request, response } = require('express');
const express = require('express');
const router = express.Router();
const gameRepo = require('../Repository/game.repository');
const consoleRepo = require('../Repository/console.repository');
const editRepo = require("../Repository/editor.repository");


router.get('/', gameStockShowAction); //get to access a page
router.get('/SortPrice/:Price', SortGameByPrice);
router.get('/SortParameter/:Parameter', SortGameByParameter);
router.get('/SortEditor/:Editor', SortGameByEditor);
router.get('/oneGame/:game_ID', ShowOneGame);
router.get('/adminview', AdminView);
router.get('/EditTable/:game_ID', EditTableGame);
router.get('/EditConsole/:console_ID', EditTableConsole);
router.get('/delGame/:game_ID', DelGame);
router.get('/delConsole/:console_ID', DelConsole);
router.post('/update/:game_ID', UpdateGame);
router.post('/updateConsole/:console_ID', updateConsole);
router.post('/search', SearchAction);
router.get('/oneConsole/:console_ID', ShowOneConsole);



async function gameStockShowAction(request, response){
    let game_stock = await gameRepo.getAllGame();
    // let game_stock1 = await gameRepo.getGameIDover10();
    
    //console.log(game_stock);
    response.render("mainpage_view", {"game_stock": game_stock});
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
    
    console.log(game_Editor);
    response.render("gameEditor_view", {"game_Editor": game_Editor, "flashMessage": flashMessage});
}


async function ShowOneGame(request, response){
    let onegame = await gameRepo.getOneGameAndEditor(request.params.game_ID);
    let flashMessage = request.session.flashMessage;
    request.session.flashMessage = "";
    //console.log(onegame);
    response.render("game_view", {"onegame": onegame, "flashMessage": flashMessage});
}


async function ShowOneConsole(request, response){
    let oneconsole = await gameRepo.getOneConsole(request.params.console_ID);
    let flashMessage = request.session.flashMessage;
    request.session.flashMessage = "";
    response.render("game_view", {"oneconsole": oneconsole, "flashMessage": flashMessage});
}


async function AdminView(request, response){
    let adminview = await gameRepo.getAllGame();
    let adminviewConsole = await consoleRepo.getAllConsole();
    let flashMessage = request.session.flashMessage;
    request.session.flashMessage = "";
    //console.log(onegame);
    response.render("admin_view", {"adminview": adminview, "adminviewConsole":adminviewConsole, "flashMessage": flashMessage});
}

async function EditTableGame(request, response){
    game_ID = request.params.game_ID;
    if(game_ID!=="0"){
        var EditOneGame = await gameRepo.getOneGame(game_ID);
        var game_category = await gameRepo.getAllCategory();
        var allEditors = await gameRepo.getAllEditor();
    }else {
        var EditOneGame = gameRepo.getBlankGame();
        var game_category = await gameRepo.getAllCategory();
        var allEditors = await gameRepo.getAllEditor();
    }
    console.log(EditOneGame);
    response.render("editgame_view", {"EditOneGame": EditOneGame, "game_category": game_category, "Editors": allEditors});
}

async function EditTableConsole(request, response){
    console_ID = request.params.console_ID;
    if(console_ID!=="0"){
        var allConsole = await consoleRepo.getOneConsole(console_ID);
        var consoleColor = await consoleRepo.getAllColor();
    }else {
        var allConsole = await consoleRepo.getBlankConsole();
        var consoleColor = await consoleRepo.getAllColor();
    }
    console.log(allConsole);
    response.render("console_editview", {"allConsole": allConsole, "consoleColor":consoleColor});
}

async function DelGame(request, response) {
    // response.send("DEL ACTION");
    let numRows = await gameRepo.delOneGame(request.params.game_ID);
    request.session.flashMessage = "ROWS DELETED: "+numRows;
    response.redirect("/main_page/adminview");
}

async function DelConsole(request, response) {
    // response.send("DEL ACTION");
    let numRows = await consoleRepo.delOneConsole(request.params.console_ID);
    request.session.flashMessage = "ROWS DELETED: "+numRows;
    response.redirect("/main_page/adminview");
}


async function UpdateGame(request, response) {
    // response.send("UPDATE ACTION");
    var gameID = request.params.game_ID;
    if (gameID==="0"){
        gameID = await gameRepo.addOneGame();
    } 
    var numRows = await gameRepo.editOneGame(gameID,
        request.body.Game_Price, 
        request.body.Game_Description, 
        request.body.Game_Name, 
        request.body.Game_Category,
        request.body.Game_Stock,
        request.body.Game_Editor
        );
    request.session.flashMessage = "ROWS UPDATED: "+numRows;
    response.redirect("/main_page/adminview");
}

async function updateConsole(request, response) {
    // response.send("UPDATE ACTION");
    var consoleID = request.params.console_ID;
    if (consoleID==="0") consoleID = await consoleRepo.addOneConsole();
    var numRows = await consoleRepo.editOneConsole(consoleID,
        request.body.Console_Stockage, 
        request.body.Console_Name, 
        request.body.Console_Color, 
        request.body.Console_Price,
        request.body.Console_Stock
        );

    request.session.flashMessage = "ROWS UPDATED: "+numRows;
    response.redirect("/main_page/adminview");
}

async function SearchAction(request, response){
    let onegame = await gameRepo.getGameByName(request.body.game_search);
    let oneconsole = await consoleRepo.getConsoleByName(request.body.game_search);
    //console.log(onegame);
    if(onegame.length===0 && oneconsole.length===0){
        response.redirect("/home");
    }else if(onegame.length!=0){
        response.redirect(`/main_page/oneGame/${onegame[0].ID_game}`);
    }
    else if (oneconsole.length!=0){
        response.redirect(`/console/OneConsole/${oneconsole[0].ID_console}`);
    }
}


// http://localhost:8000/mainpage

module.exports = router;