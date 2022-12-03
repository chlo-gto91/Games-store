const passport = require("passport");
const usersRepo = require("../Repository/users.repository.js");

module.exports = {
  initialization(app) {
    app.use(passport.initialize());
    app.use(passport.session());
    passport.serializeUser(function (client, done) { //successfull log in
      done(null, client.client_name);
    });
    passport.deserializeUser(async function (clientname, done) {
      let user = await usersRepo.getOneClient(clientname);
      done(null, user);
    });
  },

  checkAuthentication(role) {
    return function (request, response, next) {
      if (request.isAuthenticated()) {
        if (role) {
          if (role === request.client.client_role) { 
            return next();
          } else {
            return response.end("401 Unautorized (bad user level)"); // TODO: Hierarchy
          }
        } else { // No special role needed for page -> next middleware
          return next();
        }
      } else {
        return response.end("401 Unautorized (not authenticated)");
        // response.redirect("/auth"); // not authenticated at all
      }
    }
  }

};