/* Embed.js

   This script is used to create a cloud on-the-fly using feeds from answers.com based
   on a set of topic IDs (TIDs).

   In order for this to work with both Flash and JS clients, we had to set
   the feeds parameter using cloud.set_var().

   Also to facilitate tracking we set a NID that contains a unique string composed
   of the client ID plus some basic info, in this case the TIDs, width and height

*/

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

// Get the script name and params, strip out unnecessary characters
var script = document.getElementById('infomous-embed-js');
var queryString = script.src.replace(/^[^\?]+\??/,'');

// get full, tid, width and height
var isFull=getQueryVariable(queryString,"full");
var tidsString=getQueryVariable(queryString,"tid");;
var width = getQueryVariable(queryString,"width");
var height = getQueryVariable(queryString,"height");
var myTitle = (width >375)?'Explore more content from Answers.com':'Explore more content';

var testString='';
if (isFull) testString += '-FULL';

var tidsArray = tidsString.split(",");

// Temp fix to make the cloud the right width for answers.com
if (width == 600) width = 724;

// Occasionally we seem to get an undefined width/height, in which case set a default
if (!width || !height) {
    width=724;
    height=400;
}

// Set the number of words based on cloud size. Use static or dynamic number
var maxWords = (width > 375)?30:20;

// The following is specific to answers.com and the way they generate RSS feeds
for (var i=0;i<tidsArray.length;i++) {
    if (tidsArray[i] == 4423) tidsArray[i]=2630;
    tidsArray[i] = 'http://analyst2.infomous.com/answersdotcom/getfeed.php?tid='+tidsArray[i]; 
}
// Reformat the feed names for Infomous consumption
var feeds=tidsArray.join('|');

// This is used later to set the URL of the "enlarge" button in the frame
var enlargeURL = 'http://analyst2.infomous.com/answersdotcom/index.php?&full=1&tid='+tidsString;

// get feed from answersdotcom
var urls = tidsString.split(",");
// The following is specific to answers.com and the way they generate RSS feeds
for (var i=0;i<urls.length;i++) {
    if (urls[i] == 4423) urls[i]=2630;
    urls[i] = 'http://wiki.answers.com/Q/Special:RSS&tid='+urls[i]+'&answered=true'; 
    $.get(urls[i], function(data){
        $(data).find('item').each(function() {
            var el = $(this);
            console.log("------------------------");
            console.log("title      : " + el.find("title").text());             
        });
    });
}

// Set all the desired vars. Notice that we set a custom NID for tracking.
// In order to prevent the call from looking for this NID through drupal,
// we tell the cloud to use a local copy of config.txt (which can be blank)
var myCloud = {
    "nid" : 'ANSWRS-TIDS' + tidsString + '-W' + width + '-H' + height + testString,
    "maxWords" : maxWords,
    "setConfigURL" : 'config.txt',
    "title" : myTitle,
    "dict" : 'NOUN|1, VERB|0, ADJECTIVE|1, ADVERB|0, NUMBER|0, OTHER|1',
    "skinMinFontSize" : 14,
    "skinMaxFontSize" : 48,
    "skinSourcesWidth" : 400,
    "skinLine1Size" : 16,
    "skinLine2Size" : 13,
    "colBlobBorder" : '0x1f4fb6',
    "colFrame" : '0x003399',
    "colFrameTitle" : '0xffffff',
    "frameByURL" : 'https://get.infomous.com',
    "frameHelpURL" : 'https://get.infomous.com/how-it-works/',
    "frameEnlargeURL" : enlargeURL,
    "hiddenSource" : 'http://www.infomous.com/site/blocked/english.txt,http://analyst2.infomous.com/answersdotcom/answers.ngrams',
    "ngrams" : 'blogging|blogs|blog,websites|website|web sites|web site|web sites,search|searching|search engine|search engines,account|accounts,super bowl|superbowl',
    "setLinksTarget" : '_parent',
    "trackHovers" : 0,
}


// Create an array of possible values for maxWords, then randomly select one value.
//var numWords = new Array (10,20,30,40);
//myCloud.maxWords = numWords[Math.floor(Math.random()*numWords.length)];


myCloud.nid = 'ANSWRS-TIDS' + tidsString + '-W' + width + '-H' + height + testString;

// Found that we had to use cloud.set_var() to set the feeds so we could bypass
// some problematic URI encoding
function infomous_ready(myCloud) {

    //var cloud = myCloud.clouds.get();

    //cloud.set_var('feeds',feeds);



    //cloud.make_request();

}

//document.write('<div style="height:',height+4,'px;"><script type="text/javascript" async data-infomous-id="myCloud" src="http://analyst2.infomous.com/client2/?width=',width,'&height=',height,'"></script></div>');

//document.write('<script type="text/javascript" async data-infomous-id="myCloud" src="http://analyst2.infomous.com/client2/?width=',width,'&height=',height,'"></script>');
// document.write('<p>This cloud uses Hot Topics set ',topicSet,': ',tidsString);


