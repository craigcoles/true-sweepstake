var express = require('express'),
    router = express.Router();

/* GET Home page. */
router.get('/', function(req, res) {
    res.render('pages/home');
});

module.exports = router;