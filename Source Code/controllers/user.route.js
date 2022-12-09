const { request, response } = require('express');
const express = require('express');
const router = express.Router();
const clientRepo = require('../Repository/client.repository');

router.get('/edit/:client_ID', EditTableClient);
router.post('/updateClient/:client_ID', updateClient);

async function EditTableClient(request, response){
    let EditOneClient = await clientRepo.getOneClient(request.params.client_ID);
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
        request.body.clientPassword
        );

    request.session.flashMessage = "ROWS UPDATED: "+numRows;
    response.redirect("/auth");
}


// http://localhost:8000/edit_user

module.exports = router;