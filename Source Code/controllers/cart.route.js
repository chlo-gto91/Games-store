
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
        console.log("Panier Vide");
        var gameCart =  await gameRepo.getOneGame(request.params.name);
        response.render("cart", {"GameCart": gameCart});
    }else{
        console.log("Jai des choses dans le panier ! ");
        for (let i=0 ; i<request.session.cart.length ; i++){
            console.log(request.session.cart[i]);
            game
        }
    }
}

async function AddCart(request, response){ 
    console.log(request.session.cart);
    if (request.session.cart === undefined) {
        request.session.cart = { contents: [] };
    }
    request.session.cart.contents.push(request.params.name);
    request.session.save()
    console.log("Après");
    console.log(request.session.cart);
    console.log(request.session.cart.contents[0]);
}

async function RemoveFromCart(request, response){
    for (let i=0; request.session.cart.length; i++){
        if (request.session.cart[i] === request.params.name){
            request.session.cart.splice(i, 1);
        }
    }
}



module.exports = router;