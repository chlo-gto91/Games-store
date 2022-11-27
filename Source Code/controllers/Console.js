const { request, response } = require('express');
const express = require('express');
const router = express.Router();
const consoleRepo = require('../Repository/console.repository');


router.get('/', ConsoleShowAction);

async function ConsoleShowAction(){
    let console = await consoleRepo.getAllConsole();
    let flashMessage = request.session.flashMessage;
    request.session.flashMessage = "";

    console.log(console);
    response.render("console_view", {"console":console, "flashMessage":flashMessage});
}


module.exports = router;