var re = new RegExp("{(.+)}");
var googleAPIKey = "AIzaSyDiVPvHjm4GAR_mwgumfjJ7N5Kj9BJHXlI";
var searchEngineID = "007060078685401029577:_x7ctz8mxko";
var googleSearchURLBase = "https://www.googleapis.com/customsearch/v1?";
var googleSearchURL = googleSearchURLBase + "key=" + googleAPIKey + "?cx=" + searchEngineID;

var doSearch = function(q){
	var xhr = new XMLHttpRequest();
	var url = googleSearchURL + "?q=" + q;
	xhr.open("GET", url, true);
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
    		// WARNING! Might be injecting a malicious script!
    		console.log(xhr.responseText);
		}
	}
	xhr.send();
}

$('input[type=text], textarea').on('input', function(){
	var element = $(this);
	var text = element.val();
	
	// console.log(this);
	var match = text.match(re);
	var searchText = match && match[1];
	console.log(match);
	if(searchText){
		var pos = element[0].selectionStart;

		doSearch(searchText);

		// var newText = text.replace(re, "BLOOP");
		// $(this).val(newText);
		// $(this)[0].selectionStart = pos - 1;
		// $(this)[0].selectionEnd = pos - 1;
	}
	
});

// chrome.extension.sendMessage({}, function(response) {
// 	var readyStateCheckInterval = setInterval(function() {
// 	if (document.readyState === "complete") {
// 		clearInterval(readyStateCheckInterval);

// 		// ----------------------------------------------------------
// 		// This part of the script triggers when page is done loading
// 		console.log("Hello. This message was sent from scripts/inject.js");
// 		// ----------------------------------------------------------

// 	}
// 	}, 10);
// });