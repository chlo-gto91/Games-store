const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('payment_view', { favourites: []});
});

module.exports = router;