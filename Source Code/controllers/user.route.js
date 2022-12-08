const { request, response } = require('express');
const express = require('express');
const router = express.Router();
const clientRepo = require('../Repository/client.repository');

router.post('/updateClient/:client_ID', updateClient);

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
    response.redirect("/main_page/adminview");
}


// http://localhost:8000/edit_user

module.exports = router;