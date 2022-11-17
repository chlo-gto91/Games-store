// controllers/mainpage.route.js

const express = require('express');
const router = express.Router();
const gameRepo = require('../Repository/game.repository');


// http://localhost:8000/mainpage

router.get('/', (req, res) => {
    res.render('mainpage_view', { favourites: []});
});


async function AddRows(){
    tr = document.createElement("tr");
    td1 = document.createElement("td");
    td2 = document.createElement("td");
    td3 = document.createElement("td");
    td4 = document.createElement("td");

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
};

async function SortByParameter(category){

};



module.exports = router;