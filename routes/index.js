var express     = require('express'),
    fs          = require('fs'),
    dateFormat  = require('dateformat'),
    request     = require('request'),
    router      = express.Router(),
    matchData   = './data/matches.json',
    personData  = './data/people.json',
    mData = '',
    pData = '';


    fs.readFile(personData, 'utf8', function (err, data) {

        if (err) {
            console.log('Error: ' + err);
            return;
        }

        pData = JSON.parse(data);

    });

    function readMatchesFromFile() {
        var data = fs.readFileSync(matchData, 'utf8');
        mData = JSON.parse(data);
    }

    function writeMatchesToFile(data) {
        fs.writeFileSync(matchData, JSON.stringify(data), 'utf8');
    }

    function fetchLiveResults(callback, force) {
        var olderThanHour = true,
            oneHour = 1000 * 60 * 60;
            matchDataCacheFileStats = fs.statSync(matchData),
            olderThanHour = new Date().getTime() - matchDataCacheFileStats.mtime.getTime() > oneHour,
            requestFromApi = force || olderThanHour;

        if (requestFromApi) {
            request('http://cmsapi.pulselive.com/rugby/event/1238/schedule?language=en&client=pulse', function(error, response, body) {
                if (error !== null) {
                    console.log('read from file, api fail');
                    readMatchesFromFile();
                } else {
                    console.log('read from api');
                    mData = JSON.parse(body);
                    writeMatchesToFile(mData);
                }

                callback();
            });
        } else {
            console.log('read from file, cached');
            readMatchesFromFile();

            callback();
        }
    }

    /* GET Home page. */
    router.get('/', function(req, res) {
        fetchLiveResults(function() {
            res.render('pages/home', {
                mData: mData.matches,
                pData: pData,
                dateFormat: dateFormat
            });
        });
    });

    module.exports = router;