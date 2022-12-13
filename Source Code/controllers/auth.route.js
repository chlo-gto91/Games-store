// controllers/auth.route.js
const express = require('express');
const router = express.Router();
const auth = require("../Repository/users.auth");
const userRepo = require("../Repository/users.repository");
const clientRepo = require('../Repository/client.repository');
const gameRepo = require('../Repository/game.repository');
const consoleRepo = require('../Repository/console.repository');


// http://localhost:9000/auth
router.get('/', (req, res) => res.render('auth_view', { extraContent: "" }) );
router.get("/user", auth.checkAuthentication("USER"), userAction);
router.get("/admin", auth.checkAuthentication("ADMIN"), userAction);
router.get("/protected", protectedGetAction);
router.post("/login", loginPostAction);
router.get("/logout", logoutAction);
router.get('/edit', EditTableClient);
router.post('/updateClient/:client_ID', updateClient);
router.get('/profil',GetProfil); //redirection
router.get('/AccessCart', AccessCart);

async function userAction(request, response) {
  let userData = await userRepo.getOneClient(request.user.lastname);
  let userJson = JSON.stringify(userData); // if  userData.user_role ...
  response.render("auth_view", { "extraContent": userData });
}

async function protectedGetAction(request, response) { //redirect link
  if (request.isAuthenticated()) {
    if (request.user.client_role === "ADMIN") {
      response.redirect("/auth/admin"); //admin page
    } else {
      response.redirect("/auth/user"); //user page
    }
  } else {
      response.redirect("/auth"); //log in page
  }
}
async function loginPostAction(request, response) {
  areValid = await userRepo.areValidCredentials(request.body.username, request.body.userpass);

  if (areValid) {
    user = await userRepo.getOneClient(request.body.username);
    request.login(user, function (err) { 
        if (err) { console.log("ERROR"); console.log(err); return next(err); }

        if (request.user.client_role === "ADMIN") { 
            return response.redirect("/auth/admin");
        } else {
            return response.redirect("/auth/user");
        }
    });
  } else {
    response.send("Invalid credentials provided");
    // TODO redirect/normal error message
  }
}

function logoutAction(request, response) {
    request.logout(function(err) { //it destroyes all and remove the session
        if (err) { 
          return next(err); 
        }
        response.redirect('/auth');
    });
}

async function EditTableClient(request, response){
  let EditOneClient = await clientRepo.getOneClient(request.user.ID_client); 
  console.log(EditOneClient);
  response.render("edit_user", {"EditOneClient": EditOneClient});
}


async function updateClient(request, response) {
  // response.send("UPDATE ACTION");
  var clientID = request.params.client_ID;
  if (clientID==="0") clientID = await clientRepo.addOneClient(request.params.client_ID);
  var numRows = await clientRepo.editOneClient(clientID,
      request.body.clientAge, 
      request.body.clientName, 
      request.body.clientLastname, 
      request.body.clientPhone,
      request.body.clientMail_addresse,
      request.body.clientPassword,
      request.body.clientID
      );

  request.session.flashMessage = "ROWS UPDATED: "+numRows;
  response.redirect("/auth");
}

// Button that redirect the user to a different page if he is (USER/ADMIN/NOT LOGGED IN)
async function GetProfil(request,response){
  if(request.isAuthenticated()){
    if(request.user.client_role === "USER"){
      let EditOneClient = await clientRepo.getOneClient(request.user.ID_client); 
      response.render("edit_user", {"EditOneClient": EditOneClient});
    }
    else{ 
      let adminview = await gameRepo.getAllGame();
      let adminviewConsole = await consoleRepo.getAllConsole();
      response.render("admin_view", {"adminview": adminview, "adminviewConsole":adminviewConsole});
    }
  }else{
    response.render("auth_view");
  }
}

async function AccessCart(request, response){
  if(request.isAuthenticated()){
    response.render("cart");
  }else{
    response.render("auth_view");
  }
}


module.exports = router;