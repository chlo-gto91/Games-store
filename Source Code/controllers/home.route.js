const { request, response } = require('express');
const express = require('express');
const router = express.Router();
const gameRepo = require('../Repository/game.repository');
const consoleRepo = require('../Repository/console.repository');

router.get('/', (req, res) => {
    res.render('home_view', { favourites: []});
});

// http://localhost:8000/home

module.exports = router;