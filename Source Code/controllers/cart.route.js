
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


async function CartShowAction(request, response){ //display view cart
    if(request.isAuthenticated()){    
        if (request.session.cart === undefined){
            request.session.cart = [];
            let allGame = [];
            let allConsole = [];
            let sum = 0;
            response.render("cart", {"allGame": allGame, "allConsole": allConsole, "sum": sum});
        }else{
            let allGame = [];
            let allConsole = [];
            let sum = 0;
            for (let i=0; i<request.session.cart.length; i++){
                let game = await gameRepo.getGameByName(request.session.cart[i]);
                let console = await consoleRepo.getConsoleByName(request.session.cart[i]);
                if (game.length===0){
                    allConsole.push(console[0]);
                    sum+= console[0].console_price;
                }else{
                    allGame.push(game[0]); // Add to the array
                    sum+=game[0].price;
                }
            }
            response.render("cart", {"allGame": allGame, "allConsole": allConsole, "sum": sum});
        }    

      }else{
        response.redirect("/auth");
      }
}

async function AddCart(request, response){ 
        if (request.session.cart === undefined) {
            request.session.cart = [];
        }
        request.session.cart.push(request.params.name);
        request.session.save();
        console.log(request.session);
        response.redirect("/home");      
}
// A tester
async function RemoveFromCart(request, response){
    for (let i=0; i<request.session.cart.length; i++){
        if (request.session.cart[i] === request.params.name){
            request.session.cart.splice(i, 1);
        }
    }
    response.redirect("/cart");
}

async function Payment(request, response){
    if(request.isAuthenticated()){
        if(request.user.client_role === "USER"){
            request.session.cart.splice(0, request.session.cart.length);
            request.session.save();
            console.log("Valid command");
            response.redirect("/home");
        }else if(request.user.client_role === "ADMIN"){
            console.log("Admin cannot buy any games");
            response.redirect("/home");
        }
    }
}



module.exports = router;