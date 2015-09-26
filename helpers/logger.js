var dateFormat  = require('dateformat');

module.exports = (function() {
	var logger = {};

	logger.log = function(message) {
        console.log('[' + dateFormat(Date.now(), "dd-mm-yyyy hh:MM:ss") + '] ' + message);
	}

	return logger;
})();