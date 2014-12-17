<?php 

/* 

   This script creates a timeline cloud, i.e., an Infomous cloud that
   has a time slider below it. Moving the time slider changes the date
   range for the cloud.

*/

// Set some global variables and parameters
$debug=0;
$title="Infomous Time Machine";
$client_name="FT.com home page";
$nid=43458;
$infoserver='www';
$cloud_width=740;
$cloud_height=450;
//$slider_width=500;
$footer_info = 'The cloud above shows our non-animated, JavaScript client'; 
$nidvars = '
"platform" : "js",
"zoom" : "3",
';

require '/home/infomous/web/site/TimeMachine/timeline.php';

?>