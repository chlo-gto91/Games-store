
const { request, response } = require('express');
const express = require('express');
const router = express.Router();
const gameRepo = require('../Repository/game.repository');
const consoleRepo = require('../Repository/console.repository');
const { render } = require('ejs');


router.get("/", CartShowAction);
router.get("/add/:name", AddCart);
router.get("/Remove/:name", RemoveFromCart);
router.get("/payment", Payment);

router.get('/', (req, res) => {
    res.render('', { favourites: []});
});


// le cart est toujours vide pour new client
// if (request.session.cart === undefined) request.session.cart = [];
// request.session.cart.push("xxx");

var TotalPrice = 0;

async function CartShowAction(request, response){
    if(request.isAuthenticated()){    
        if (request.session.cart === undefined){
            request.session.cart = [];
            console.log("Empty Cart");
            let allGame = [];
            let allConsole = [];
            response.render("cart", {"allGame": allGame, "allConsole": allConsole});
        }    
        console.log("Cart is full");
        let allGame = [];
        let allConsole = [];
        for (let i=0; i<request.session.cart.length; i++){
            let game = await gameRepo.getGameByName(request.session.cart[i]);
            let console = await consoleRepo.getConsoleByName(request.session.cart[i]);
            if (game.length===0){
                allConsole.push(console);
            }else{
                allGame.push(game);
            }
            // allProducts.push(await gameRepo.getGameByName(request.session.cart[i]));
            
        }
        console.log(allGame);
        console.log(allConsole);
        response.render("cart", {"allGame": allGame, "allConsole": allConsole});
      }else{
        response.render("auth_view");
      }
}

async function AddCart(request, response){ 
    if (request.session.cart === undefined) {
        request.session.cart = [];
    }
    request.session.cart.push(request.params.name);
    request.session.save();
    console.log("Après");
    console.log(request.session);
    response.redirect("/home");
}

async function RemoveFromCart(request, response){
    for (let i=0; request.session.cart.length; i++){
        if (request.session.cart[i] === request.params.name){
            request.session.cart.splice(i, 1);
        }
    }
}

async function Payment(request, response){
    request.session.cart.destroy();
    response.redirect("/home");
}



module.exports = router;