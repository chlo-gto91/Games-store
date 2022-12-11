
const { request, response } = require('express');
const express = require('express');
const router = express.Router();
const gameRepo = require('../Repository/game.repository');
const consoleRepo = require('../Repository/console.repository');


router.get("/", CartShowAction);
router.get("/:game_name", AddGameToCart);
router.get("/Cart/:console_name", AddConsoleToCart)
router.post("/add/:game_name", AddToCart);



// le cart est toujours vide pour new client
// if (request.session.cart === undefined) request.session.cart = [];
// request.session.cart.push("xxx");


async function CartShowAction(request, response){
    if (request.session.cart === undefined){
        console.log("Panier vide");
        response.render("cart");
    }else{
        let TotalCart = request.session.cart;
        console.log("Voici les élements du panier");
        for (var i=0; i <TotalCart.length; i++){
            console.log(TotalCart[i]);
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