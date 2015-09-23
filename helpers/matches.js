modules.export = function() {
	var helper = {};

	helper.MATCH_LENGTH = getMinutes(80);	

	helper.matchIsUnderway = function (startDate) {
		return (startDate.getTime() > (Date.now() - helper.MATCH_LENGTH)) 
			&& ((startDate.getTime() + helper.MATCH_LENGTH) > Date.now());
	}

	helper.matchIsInFuture = function (startDate) {
		return startDate.getTime() > Date.now();
	}

	helper.getCurrentOrNextMatch = function (matches) {
		var currentOrFutureMatches = matches.filter(function(e) {    
			return helper.matchIsUnderway(e) || helper.matchIsInFuture(e);
		});  

		return currentOrFutureMatches.sort()[0];
	}

	// Helpers
	helper.getMinutes = function(minutes) {
		return minutes * 1000 * 60;
	}

return helper;
};