/* Infomous.js

   This script is used to create a cloud either from a NID on infomous.com or 
   dynamically using a single feed

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

// Get all relevant parameters
var cloudType = getQueryVariable(queryString,"cloudType");
var myNid = getQueryVariable(queryString,"nid");
var myWidth = getQueryVariable(queryString,"width");
var myHeight = getQueryVariable(queryString,"height");
var myBlogURL = getQueryVariable(queryString,"url");
var useComments = getQueryVariable(queryString,"use_comments");
var myTitle = getQueryVariable(queryString,"title");
var myMaxWords = getQueryVariable(queryString,"max_words");
var myColFrame = getQueryVariable(queryString,"col_frame");
var myColFrameTitle = getQueryVariable(queryString,"col_frame_title");
//var myMaxWords = (width > 375)?40:25; // This could be passed in

if (cloudType == "dynamic" ) {

    var customID = "WP-W"+ myWidth + '-H' + myHeight + '-URL' + myBlogURL;

    // Use the default /feed and, if requested, also add the comments feed.
//    var myFeedURL = myBlogURL + '/feed' + (useComments) ? ',' + myBlogURL + '/comments/feed' : '';
    var myFeedURL = myBlogURL + '/feed';

    // Set reasonable defaults for any variables not passed in
    if (!myTitle) { myTitle = "Explore this blog"; }

// The var below is used to set all the desired cloud vars. Notice that we
// set a custom NID for tracking.  In order to prevent the call from
// looking for this NID through drupal, we tell the cloud to use a
// local copy of config.txt (which can be blank or non-existent)
// Notice that not all of these variables are strictly necessary.
var blogCloud = {
    "nid" : customID,
    "title" : myTitle,
    "setConfigURL" : 'config.txt',
    "frameHelpURL" : 'http://www.infomous.com/how_it_works',
    "hiddenSource" : 'http://www.infomous.com/site/blocked/english.txt',
}

// infomous_ready() is the main API call.
function infomous_ready(myCloud) {

    var cloud = myCloud.clouds.get(blogCloud);

    // Now let's set some remaining parameters
    cloud.set_var('feeds',myFeedURL);
    if (myColFrame) { cloud.set_var('colFrame',myColFrame); }
    if (myColFrameTitle) { cloud.set_var('colFrameTitle',myColFrameTitle); }
    if (myMaxWords) { cloud.set_var('maxWords',myMaxWords); }
    cloud.make_request(); // Need to call cloud.make_request() for the variables to take effect

}

// Now we generate the embed code.
document.write('<script type="text/javascript" async data-infomous-id="blogCloud" src="http://analyst2.infomous.com/client2/?width=',myWidth,'&height=',myHeight,'"></script>');

} else {
// Here we are dealing with a static cloud

var embedParams = '
}


