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
var myCloud = {
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

// infomous_ready() is the main API call.
function infomous_ready(myCloud) {

    var cloud = myCloud.clouds.get();

    // We set the feeds here using cloud.set_var() because it handles URL encoding better
    cloud.set_var('feeds',myFeedURL);
    cloud.make_request(); // Need to call cloud.make_request() for the variables to take effect

}

// Now we generate the embed code.
document.write('<script type="text/javascript" async data-infomous-id="myCloud" src="http://analyst2.infomous.com/client2/?width=',width,'&height=',height,'"></script>');


