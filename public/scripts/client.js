/*! atomic v1.0.0 | (c) 2014 @toddmotto | github.com/toddmotto/atomic */
!function(a,b){"function"==typeof define&&define.amd?define(b):"object"==typeof exports?module.exports=b:a.atomic=b(a)}(this,function(a){"use strict";var b={},c=function(a){var b;try{b=JSON.parse(a.responseText)}catch(c){b=a.responseText}return[b,a]},d=function(b,d,e){var f={success:function(){},error:function(){}},g=a.XMLHttpRequest||ActiveXObject,h=new g("MSXML2.XMLHTTP.3.0");return h.open(b,d,!0),h.setRequestHeader("Content-type","application/x-www-form-urlencoded"),h.onreadystatechange=function(){4===h.readyState&&(200===h.status?f.success.apply(f,c(h)):f.error.apply(f,c(h)))},h.send(e),{success:function(a){return f.success=a,f},error:function(a){return f.error=a,f}}};return b.get=function(a){return d("GET",a)},b.put=function(a,b){return d("PUT",a,b)},b.post=function(a,b){return d("POST",a,b)},b["delete"]=function(a){return d("DELETE",a)},b});

// ===========================
// Focus next match
// ===========================
(function() {
	location.hash = "nextMatch";
})();

// ===========================
// Live update scores
// ===========================
(function() {
	var LIVE_DATA_URL = '/livedata.json',
		nextMatch = document.querySelector('#nextMatch'),
		oneMinute = 1000 * 60,
		matchElements = {
			scores: nextMatch.querySelectorAll('[data-component="fixture__score"]')
		};

	setInterval(updateData, oneMinute);

	function matchIsUnderway(nextMatch) {
		var matchTime = nextMatch.querySelector('[data-date]').getAttribute('data-date'),
			startTime = matchTime,
			endTime = startTime + 80;

		return endTime > Date.now() && startTime < Date.now();
	}

	function updateData() {
		if (!matchIsUnderway(nextMatch)) {
			return;
		}

		atomic.get(LIVE_DATA_URL)
			.success(function(data) {
				updateInterface(data);
			})
			.error(function(data) {
				console.log('Failed to live update score', data);
			});
	}

	function updateInterface(matchData) {
		matchElements.scores[0].innerText = matchData.scores[0];
		matchElements.scores[1].innerText = matchData.scores[1];
	}
})();