// controllers/CreateAccountpage.route.js 

const express = require('express');
const router = express.Router();


// http://localhost:8000/CreateAccount

router.get('/', (req, res) => {
    res.render('CreateAccountpage_view', { favourites: []});
});


module.exports = router;