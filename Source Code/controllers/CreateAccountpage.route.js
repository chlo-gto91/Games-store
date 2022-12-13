// controllers/CreateAccountpage.route.js 

const express = require('express');
const router = express.Router();
const clientRepo = require('../Repository/client.repository');

// http://localhost:8000/CreateAccount

router.get('/', clientEditAction);
router.get('/edit/:client_ID', clientEditAction);
router.post('/updateclient/:client_ID', updateClient);

async function clientEditAction(request, response) {
    // response.send("EDIT ACTION");
    let OneClient = await clientRepo.getBlankClient();
    console.log(OneClient);
    response.render("CreateAccountpage_view", {"OneClient":OneClient});
}

async function updateClient(request, response) {
    // response.send("UPDATE ACTION");
    var clientID = request.params.client_ID;
    if (clientID==="0") clientID = await clientRepo.addOneClient();
    var numRows = await clientRepo.editOneClient(clientID,
        request.body.clientAge, 
        request.body.clientName, 
        request.body.clientLastname, 
        request.body.clientPhone,
        request.body.clientMail_addresse,
        request.body.clientPassword
        );

    request.session.flashMessage = "ROWS UPDATED: "+numRows;
    response.redirect("/main_page");
}


// http://localhost:8000/edit_user

module.exports = router;
