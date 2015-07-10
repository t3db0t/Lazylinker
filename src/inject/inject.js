console.log("Lazylinker v0.1");

var re = new RegExp("{(.+)}");
var googleAPIKey = "AIzaSyDiVPvHjm4GAR_mwgumfjJ7N5Kj9BJHXlI";
var searchEngineID = "007060078685401029577:_x7ctz8mxko";
var testEngineID = "017576662512468239146:omuauf_lfve";
var googleSearchURLBase = "https://www.googleapis.com/customsearch/v1";
var googleAuthParams = "?key=" + googleAPIKey + "?cx=" + testEngineID; //searchEngineID;
var googleSearchURL = googleSearchURLBase + googleAuthParams;

var doSearch = function(q, targetElement, position){
	var xhr = new XMLHttpRequest();
	var qEncoded = encodeURIComponent(q);
	var url = googleSearchURL + "?q=" + qEncoded;

	$.get("https://www.googleapis.com/customsearch/v1", {
			key: googleAPIKey,
			cx: searchEngineID,
			q: qEncoded
		}, function(data){
			// SUCCESS, update text entry
			var resultURL = data.items[0].formattedUrl;

			var newText = $(targetElement).val().replace(re, resultURL);
			$(targetElement).val(newText);
			// ensure that cursor is at the end of the new replacement string
			// TODO: compensate for length of user-specified search enclosure characters
			targetElement.selectionStart = position - 2 - q.length + resultURL.length;
			targetElement.selectionEnd = targetElement.selectionStart;
		}
	);
}

/*

Need to think about how to do this.  Facebook and Twitter have text entry mechanisms
that don't use <input> or <textarea> elements, so we have to:

a) watch for general keyboard input from the document. Problems:
	- we need the whole 'body' of text in the input area
	- how do we replace the text?
b) hardcode support for Facebook and Twitter??

*/


$('input[type=text], textarea').on('input', function(){
	var element = $(this);
	var text = element.val();
	
	// console.log(this);
	var match = text.match(re);
	var searchText = match && match[1];
	
	if(searchText){
		var pos = element[0].selectionStart;

		// TODO: immediately replace with "{Searching...}" message,
		// then replace that when search is done. Could also put errors there.
		doSearch(searchText, this, pos);
	}
});