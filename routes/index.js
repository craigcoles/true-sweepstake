var express     = require('express'),
    fs          = require('fs'),
    dateFormat  = require('dateformat');
    router      = express.Router(),
    matchData   = './data/matches.json',
    personData  = './data/people.json';

fs.readFile(matchData, 'utf8', function (err, data) {

    if (err) {
        console.log('Error: ' + err);
        return;
    }

    data = JSON.parse(data);

    // for (var i = 0; i < data.matches.length; i++) {
    for (var i = 0; i < 1; i++) {

        var matchDate = new Date(data.matches[i].time.millis);

        console.dir( dateFormat(matchDate, "dddd dS mmmm") );
        console.dir( dateFormat(matchDate, "h:MM TT") );
        console.dir( data.matches[i].venue.name + ', ' + data.matches[i].venue.city + ', ' + data.matches[i].venue.country );
        console.dir( data.matches[i].teams[0].name + ' vs ' + data.matches[i].teams[1].name );

    }

});

/* GET Home page. */
router.get('/', function(req, res) {
    console.dir(matchJson);
    res.render('pages/home');
});

module.exports = router;