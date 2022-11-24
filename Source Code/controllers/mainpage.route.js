// controllers/mainpage.route.js

const { request, response } = require('express');
const express = require('express');
const router = express.Router();
const gameRepo = require('../Repository/game.repository');



// http://localhost:8000/mainpage


router.get('/', (req, res) => {
    res.render('mainpage_view', { favourites: []});
});


module.exports = router;