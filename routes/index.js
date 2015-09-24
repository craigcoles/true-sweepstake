var express     = require('express'),
    fs          = require('fs'),
    dateFormat  = require('dateformat'),
    request     = require('request'),
    matchHelper = require('../helpers/matches'),
    router      = express.Router(),
    matchData   = './data/matches.json',
    personData  = './data/people.json',
    mData = '',
    pData = '';

    // ===========================
    // Functions
    // ===========================
    function readMatchesFromFile() {
        var data = fs.readFileSync(matchData, 'utf8');
        mData = JSON.parse(data);

        if (!mData.length) {
            fetchMatches();
        }
    }

    function writeMatchesToFile(data) {
        fs.writeFile(matchData, JSON.stringify(data), 'utf8', function(err) {
            if (err !== null) {
                console.log(err);
            }
        });
    }

    function fetchMatches() {
        request('http://cmsapi.pulselive.com/rugby/event/1238/schedule?language=en&client=pulse', function(error, response, body) {
            if (error !== null) {
                console.log('use file, api fail');
            } else {
                console.log('fetch from api');
                mData = JSON.parse(body);
                writeMatchesToFile(mData);
            }
        });
    }

    function getLiveResults(callback, force) {
        readMatchesFromFile();

        var oneHour = 1000 * 60 * 60,
            oneMinute = 1000 * 60,
            matchDataCacheFileStats = fs.statSync(matchData),
            currentMatch = matchHelper.getCurrentOrNextMatch(mData.matches),
            dataLifespan = matchHelper.matchIsUnderway(currentMatch) ? oneMinute : oneHour,
            dataIsExpired = new Date().getTime() - matchDataCacheFileStats.mtime.getTime() > dataLifespan,
            requestFromApi = force || dataIsExpired;

        if (requestFromApi) {
            fetchMatches();
        } else {
            console.log('use file, cached');
        }

        callback(currentMatch);
    }

    // ===========================
    // Initialisation
    // ===========================
    fs.readFile(personData, 'utf8', function (err, data) {
        if (err) {
            console.log('Error: ' + err);
            return;
        }
        pData = JSON.parse(data);
    });

    // ===========================
    // Actions
    // ===========================
    router.get('/', function(req, res) {
        getLiveResults(function(currentMatch) {
            res.render('pages/home', {
                mData: mData.matches,
                pData: pData,
                dateFormat: dateFormat,
                nextMatchId: currentMatch.matchId
            });
        });
    });

    module.exports = router;