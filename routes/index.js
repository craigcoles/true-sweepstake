var express     = require('express'),
    fs          = require('fs'),
    dateFormat  = require('dateformat');
    router      = express.Router(),
    matchData   = './data/matches.json',
    personData  = './data/people.json',
    mData = '',
    pData = '';

    fs.readFile(matchData, 'utf8', function (err, data) {

        if (err) {
            console.log('Error: ' + err);
            return;
        }

        mData = JSON.parse(data);

    });

    fs.readFile(personData, 'utf8', function (err, data) {

        if (err) {
            console.log('Error: ' + err);
            return;
        }

        pData = JSON.parse(data);

    });

    /* GET Home page. */
    router.get('/', function(req, res) {

        res.render('pages/home', {
            mData: mData.matches,
            pData: pData,
            dateFormat: dateFormat
        });

    });

    module.exports = router;