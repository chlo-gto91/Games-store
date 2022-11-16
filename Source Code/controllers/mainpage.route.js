// controllers/mainpage.route.js

const express = require('express');
const router = express.Router();


// http://localhost:8000/mainpage

router.get('/', (req, res) => {
    res.render('mainpage_view', { favourites: []});
});


module.exports = router;