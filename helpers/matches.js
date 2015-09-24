(function() {
	var helper = {};

    // ===========================
	// Private methods
    // ===========================
	function getMinutes (minutes) {
		return minutes * 1000 * 60;
	};

	function matchByDateAsc(a, b) {
		return a.time.millis - b.time.millis;
	}

    // ===========================
	// Public variables
    // ===========================
	helper.MATCH_LENGTH = getMinutes(80);

    // ===========================
	// Public methods
    // ===========================
	helper.matchIsUnderway = function (match) {
		var startTime = match.time.millis,
			endTime = startTime + helper.MATCH_LENGTH;

		return endTime > Date.now() && startTime < Date.now();
	};

	helper.matchIsInFuture = function (match) {
		return match.time.millis > Date.now();
	};

	helper.getCurrentOrNextMatch = function (matches) {
		var currentOrFutureMatches = matches.filter(function(e) {
			return helper.matchIsUnderway(e) || helper.matchIsInFuture(e);
		});

		return currentOrFutureMatches.sort(matchByDateAsc)[0];
	};

	module.exports = helper;
})();