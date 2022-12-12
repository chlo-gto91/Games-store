// controllers/CreateAccountpage.route.js 

const express = require('express');
const router = express.Router();
const clientRepo = require('../Repository/client.repository');

// http://localhost:8000/CreateAccount

router.get('/', (req, res) => {
    res.render('CreateAccountpage_view', { favourites: []});
});

router.get('/edit/:client_ID', clientEditAction);
router.post('/updateClient/:client_ID', updateClient);

/*async function EditTableClient(request, response){
    let EditOneClient = await clientRepo.getOneClient(request.params.client_ID);
    console.log(EditOneClient);
    response.render("edit_user", {"EditOneClient": EditOneClient});
}*/

async function clientEditAction(request, response) {
    // response.send("EDIT ACTION");
    var OneClient = await clientRepo.getOneClient(request.params.ID_client);
    var clientId = request.params.ID_client;
    if (clientId!=="0")
        var client = await clientRepo.getOneClient(clientId);
    else
        var client = clientRepo.getBlankClient();
    response.render("auth", { "OneClient": client, "client": OneClient });
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
