var url = theQuotes[whichImage];
var res = url.substring(0, 98) + "...";



function tweetQuote(){
	document.write('<a class="twitter-share-button"  href="https://twitter.com/share" data-url="'+theUrls[whichImage]+'" data-text="' +res+ ' #HackTheClimate" data-related="sKYLEsthelimit: Mirada Developer"data-count="vertical">Tweet</a></td>');


}

tweetQuote();


window.twttr = (function (d, s, id) {
  var t, js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src= "/widgets.js";
  fjs.parentNode.insertBefore(js, fjs);
  return window.twttr || (t = { _e: [], ready: function (f) { t._e.push(f) } });
}(document, "script", "twitter-wjs"));