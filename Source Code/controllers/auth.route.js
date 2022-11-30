// controllers/auth.route.js
const express = require('express');
const router = express.Router();
const auth = require("../Repository/users.auth");
const userRepo = require("../Repository/users.repository");

// http://localhost:9000/auth
router.get('/', (req, res) => res.render('auth_view', { extraContent: "" }) );
router.get("/user", auth.checkAuthentication("USER"), userAction);
router.get("/admin", auth.checkAuthentication("ADMIN"), userAction);
router.get("/protected", protectedGetAction);
router.post("/login", loginPostAction);
router.get("/logout", logoutAction);

async function userAction(request, response) {
  let userData = await userRepo.getOneUser(request.client.client_name);
  let userJson = JSON.stringify(userData); // if  userData.user_role ...
  response.render("auth_view", { "extraContent": userJson });
}

async function protectedGetAction(request, response) { //redirect link
  if (request.isAuthenticated()) {
    if (request.client.mail_address === "ADMIN") {
      response.redirect("/auth/admin"); //admin page
    } else {
      response.redirect("/auth/user"); //user page
    }
  } else {
      response.redirect("/auth"); //log in page
  }
}

async function loginPostAction(request, response) {
  areValid = await userRepo.areValidCredentials(request.body.clientname, request.body.userpass);

  if (areValid) {
    user = await userRepo.getOneClient(request.body.clientname);
    request.login(client, function (err) { 
        if (err) { console.log("ERROR"); console.log(err); return next(err); }

        if (request.client.user_role === "ADMIN") { //??????????
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
        if (err) { return next(err); }
        response.redirect('/auth');
    });
}

module.exports = router;