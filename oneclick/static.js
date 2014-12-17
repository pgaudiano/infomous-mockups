/* static.js

   This script is used to create a cloud from a NID on infomous.com

   The script accepts the following parameters
   nid=NUMBER (from an existing infomous.com cloud)
   width=SIZE (in pixels)
   height=SIZE (in pixels)
   title=STRING  (the title that will appear on the cloud's frame)
   max_words=NUMBER (number of words to display in the cloud)
   col_frame=6-digit hex RGB color, e.g., 0xFFFFFF (color of the cloud frame top)
   col_frame_title=6-digit hex RGB color, e.g., 0xFFFFFF (color of the cloud frame title text)

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
var myNid = getQueryVariable(queryString,"nid");
var delta = getQueryVariable(queryString,"delta");
var myWidth = getQueryVariable(queryString,"width");
var myHeight = getQueryVariable(queryString,"height");
var myTitle = getQueryVariable(queryString,"title");
var myMaxWords = getQueryVariable(queryString,"max_words");
var myColFrame = getQueryVariable(queryString,"col_frame");
var myColFrameTitle = getQueryVariable(queryString,"col_frame_title");

// Create the correct parameters for the embed
var embedParams = 'width='+myWidth+'&height='+myHeight+'&setDelta='+delta+
    ((myTitle)?'&title='+myTitle:'')+
    ((myColFrame)?'&colFrame='+myColFrame:'')+
    ((myMaxWords)?'&maxWords='+myMaxWords:'')+
    ((myColFrameTitle)?'&colFrameTitle='+myColFrameTitle:'')+
'';

document.write('<script type="text/javascript" async data-infomous-id="nid'+myNid+'" src="http://www.infomous.com/client2/?'+embedParams+'"></script>');
