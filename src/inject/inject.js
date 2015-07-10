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
			cx: testEngineID,
			q: qEncoded
		}, function(data){
			// SUCCESS, update text entry
			// TODO: check for 0 results
			var resultURL = data.items[0].formattedUrl;

			// search for the temporary '{Searching...}' string
			var newText = $(targetElement).val().replace(new RegExp("{Searching\.\.\.}"), resultURL);
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

a) watch for general keyboard input from the document and get the containing element,
	then maybe supply user-specified exceptions?
b) hardcode support for Facebook and Twitter??

A Facebook comment field has the text here: <span data-reactid=".2.1:5.0.$right.0.0.0.0.1.0.0.$editor0.0.0.$8gn9r.0:$8gn9r-0-0.0">{test}</span>

The Twitter tweet field has:
<div aria-labelledby="tweet-box-home-timeline-label" id="tweet-box-home-timeline" class="tweet-box rich-editor notie" contenteditable="true" spellcheck="true" role="textbox" aria-multiline="true" dir="ltr" aria-autocomplete="list" aria-expanded="false" aria-owns="typeahead-dropdown-10">
	<div>againfff</div></div>

and the reply tweet field:
<div aria-labelledby="tweet-box-template-label" id="tweet-box-template" class="tweet-box rich-editor notie" contenteditable="true" spellcheck="true" role="textbox" aria-multiline="true" dir="ltr" aria-autocomplete="list" aria-expanded="false" aria-owns="typeahead-dropdown-12">
	<div><a class="twitter-atreply pretty-link" href="/TheAtlantic" role="presentation"><s>@</s>TheAtlantic</a> {test}</div></div>
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
		var newText = element.val().replace(re, "{Searching...}");
		element.val(newText);

		
		doSearch(searchText, this, pos);
	}
});