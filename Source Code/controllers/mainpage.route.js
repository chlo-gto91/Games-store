// controllers/mainpage.route.js

const { request, response } = require('express');
const express = require('express');
const router = express.Router();
const gameRepo = require('../Repository/game.repository');


// http://localhost:8000/mainpage

router.get('/', (req, res) => {
    res.render('mainpage_view', { favourites: []});
});


function AddRows(){
    var table = document.getElementById('table');
    var ligne = table.insertRow(-1);
    var td1 = ligne.insertCell(0);
    var td2 = ligne.insertCell(1);
    var td3 = ligne.insertCell(2);
    var td4 = ligne.insertCell(3); 
    var td5 = ligne.insertCell(4);

};


async function SortByParameter(category){
    var games = await gameRepo.getAllGameByCategory(category);

    var flashMessage = request.session.flashMessage;
    request.session.flashMessage = "";

    alert("J'ai trié en fonction de " + category);

    response.render("mainpage_view",{"games ": games, "flashMessage": flashMessage});
}


module.exports = router;