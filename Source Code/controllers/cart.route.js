
const { request, response } = require('express');
const express = require('express');
const router = express.Router();
const gameRepo = require('../Repository/game.repository');
const consoleRepo = require('../Repository/console.repository');

router.get("/Cart/:game_ID", AddGameToCart);
router.get("/Cart/:console_ID", AddConsoleToCart)



// le cart est toujours vide pour new client
// if (request.session.cart === undefined) request.session.cart = [];
// request.session.cart.push("xxx");

async function AddGameToCart(request, response){
    if (request.session.cart === undefined) request.session.cart = [];
    request.session.cart.push(request.params.game_ID);

    response.render("cart", {"cart": cart});
}


async function AddConsoleToCart(request, response){
    if (request.session.cart === undefined) request.session.cart = [];
    request.session.cart.push(request.params.console_ID);

    response.render("cart", {"cart": cart});
}



module.exports = router;