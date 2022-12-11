const { request, response } = require('express');
const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.render('home_view', { favourites: []});
});

// http://localhost:8000/home

module.exports = router;