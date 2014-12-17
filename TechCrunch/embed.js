// Get the script name and params, strip out unnecessary characters

var debug = 1; // Used for controlling debugging printouts

var scripts = document.getElementsByTagName('script');
var index = scripts.length - 1;
var myScript = scripts[index];
var queryString = myScript.src.replace(/^[^\?]+\??/,'');

// Parse key/val pairs
function getQueryVariable(query,variable) {
  var vars = query.split('&');
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=');
    if (decodeURIComponent(pair[0]) == variable) {
      return decodeURIComponent(pair[1]);
    }
  }
}

// Get all relevant parameters
var myWidth;
var myHeight = getQueryVariable(queryString,"height");
var myFeed = getQueryVariable(queryString,"url");
var myMaxWords = getQueryVariable(queryString,"max_words");
var myColFrame = getQueryVariable(queryString,"col_frame");
var myColFrameTitle = getQueryVariable(queryString,"col_frame_title");
var myAuthorPage = getQueryVariable(queryString,"author_page");

// Use JS to retrieve width. Notice that this overrides width param passed through GET
if (myAuthorPage) {
    myWidth = $(".profile").width();
} else {
    myWidth = $(".article-entry").width(); 
}

// If width is passed and dynamic width fails, set it here.
if (!myWidth) myWidth = getQueryVariable(queryString,"width");

var myCloud = {
    "setConfigURL" : "config.txt",
    "nid" : "TechCrunchDemo",
    "api" : "true",
    "maxWords": "40",
    "dict": "NOUN|1,VERB|0,ADJECTIVE|1,ADVERB|0,NUMBER|0,OTHER|1",
    "zoom": '3',
    "setControlBar": "false",
    "setControls": "fontSlider, zoomSlider, wordsSlider, groups, dict, fullscreen",
    "hiddenSource": "http://www.infomous.com/site/blocked/english.txt",
    "campaign": "PoweredByInfomous",
    "colWord": '0x000000',
    "colWordHover": '0xffffff',
    "colWordFade": '0xB2B4BA',
    "colWordHighlighted": '0xCA0002',
    "colWordHoverLinked": '0x0c8f03',
    "colFocusBorder": '0x0083B8',
    "colBlobBorder": '0x099e01',
    "colBlobHover": '0xDEE1E3',
    "colLink": '0xEDEDED',
    "colHoverBox": '0x099e01',
    "colBlob": '0xf5f5f5',
    "colBackground": "0xAAACA9",
    "skinMaxFontSize": "44",
    "skinMinFontSize": "12",
    "skinLine1Size": "16",
    "skinLine2Size": "14",
    "skinSourcesWidth": "450",
    "setFrame": "false",
    "colFrame": "0xf9f9f9",
    "colFrameTitle": "0xf9f9f9",
}

// infomous_ready() is the main API call.
function infomous_ready(myCloud) {

	// "cloud" is the cloud object
  var cloud = myCloud.clouds.get();

    cloud.set_var('feeds',myFeed);

  cloud.make_request(); // Need to call cloud.make_request() for the variables to take effect

}

// Now we generate the embed code.
document.write('<script type="text/javascript" async data-infomous-id="myCloud" src="http://www.infomous.com/client2/?width=',myWidth,'&height=',myHeight,'"></script>');