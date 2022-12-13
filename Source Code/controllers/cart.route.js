
const { request, response } = require('express');
const express = require('express');
const router = express.Router();
const gameRepo = require('../Repository/game.repository');
const consoleRepo = require('../Repository/console.repository');
const { render } = require('ejs');


router.get("/", CartShowAction);
router.get("/add/:name", AddCart);
router.get("/Remove/:name", RemoveFromCart);

router.get('/', (req, res) => {
    res.render('', { favourites: []});
});


// le cart est toujours vide pour new client
// if (request.session.cart === undefined) request.session.cart = [];
// request.session.cart.push("xxx");

async function CartShowAction(request, response){
    if (request.session.cart === undefined){
        request.session.cart = [];
        console.log("Panier vide");
        response.render("cart");
    }
    console.log("Voici les élements du panier");
    for (var i=0; i <request.session.cart.length; i++){
        console.log(request.session.cart[i]);
    }
    response.render("cart");
}


async function AddCart(request, response){ 
    if (request.session.cart === undefined) {
        request.session.cart = [];
    }
    request.session.cart.push(request.params.name);
    for(i=0; i<request.session.cart.length; i++){
        console.log(request.session.cart[i]);
    }
}

async function RemoveFromCart(request, response){
    for (i=0; request.session.cart.length; i++){
        if (request.session.cart[i] === request.params.name){
            request.session.cart.splice(i, 1);
        }
    }
}

async function AddToCart(request, response){
    if (request.session.cart === undefined){
        request.session.cart = [];
        console.log("Le panier n'existe pas");
        response.redirect("/home");
    }
    request.session.cart.push(request.params.game_name);
    console.log(request.params.game_name + "a été ajouté a la session");
    response.redirect("/home");
}


async function AddGameToCart(request, response){
    if (request.session.cart === undefined) request.session.cart = [];
    request.session.cart.push(request.params.game_name);

    response.render("cart", {"cart": cart});
}


async function AddConsoleToCart(request, response){
    if (request.session.cart === undefined) request.session.cart = [];
    request.session.cart.push(request.params.console_name);

    response.render("cart", {"cart": cart});

}



module.exports = router;