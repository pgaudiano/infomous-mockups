/* Embed.js

   This script is used to create a cloud on-the-fly using a single feed

   In order for this to work with both Flash and JS clients, we had to set
   the feeds parameter using cloud.set_var().

   Also to facilitate tracking we set a NID that contains a unique string composed
   of the client ID plus some basic info, including width and height

*/

// Get the script name and params, strip out unnecessary characters
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

// Get width, height and other parameters
var width = getQueryVariable(queryString,"width");
var height = getQueryVariable(queryString,"height");
var myFeedURL = getQueryVariable(queryString,"feedurl");
var myTitle = getQueryVariable(queryString,"title");
var maxWords = (width > 375)?40:25; // This could be passed in

// The var below is used to set all the desired cloud vars. Notice that we
// set a custom NID for tracking.  In order to prevent the call from
// looking for this NID through drupal, we tell the cloud to use a
// local copy of config.txt (which can be blank or non-existent)
// Notice that not all of these variables are strictly necessary.
var Cloud1 = {
    "nid" : "APITEST" + '-W' + width + '-H' + height,
    "title" : myTitle,
    "maxWords" : maxWords,
    "skinMinFontSize" : 12,
    "skinMaxFontSize" : 42,
    "setConfigURL" : 'config.txt',
    "colFrame" : '0x003399',
    "colFrameTitle" : '0xffffff',
    "colBlobBorder" : '0x1f4fb6',
    "frameByURL" : 'http://www.infomous.com/what_is_infomous',
    "frameHelpURL" : 'http://www.infomous.com/how_it_works',
    "hiddenSource" : 'http://www.infomous.com/site/blocked/english.txt',
}

var Cloud2 = {
    "nid" : "APITEST2" + '-W' + width + '-H' + height,
    "title" : 'Cloud 2',
    "maxWords" : maxWords,
    "skinMinFontSize" : 12,
    "skinMaxFontSize" : 42,
    "setConfigURL" : 'config.txt',
    "colFrameTitle" : '0xffffff',
    "colBlobBorder" : '0x222222',
    "frameByURL" : 'http://www.infomous.com/what_is_infomous',
    "frameHelpURL" : 'http://www.infomous.com/how_it_works',
    "hiddenSource" : 'http://www.infomous.com/site/blocked/english.txt',
    "feeds" : 'http://www.icosystem.com/feed',
}

// infomous_ready() is the main API call.
function infomous_ready(myCloud) {

    var cloud1 = myCloud.clouds.get(Cloud1);
    var cloud2 = myCloud.clouds.get(Cloud2);

    // We set the feeds here using cloud.set_var() because it handles URL encoding better
    cloud1.set_var('feeds',myFeedURL);
    cloud1.make_request(); // Need to call cloud.make_request() for the variables to take effect

    // We set the feeds here using cloud.set_var() because it handles URL encoding better
    cloud2.set_var('colFrame','0x00ff00');
    cloud2.make_request(); // Need to call cloud.make_request() for the variables to take effect

}

// Now we generate the embed code.
document.write('<script type="text/javascript" async data-infomous-id="Cloud1" src="http://analyst2.infomous.com/client2/?width=',width,'&height=',height,'"></script>');

document.write('<p><script type="text/javascript" async data-infomous-id="Cloud2" src="http://analyst2.infomous.com/client2/?width=',width,'&height=',height,'"></script>');


