<?php 

/* 

   This script creates a timeline cloud, i.e., an Infomous cloud that
   has a time slider below it. Moving the time slider changes the date
   range for the cloud.

*/

// Set some global variables and parameters
$debug=0;
$title="Infomous Time Machine";
$client_name="The Hill";
$description="Explore Last Week's News with Infomous";
$nid=53343;
$infoserver='www';
$cloud_width=800;
$cloud_height=500;
//$slider_width=500;

require '/home/infomous/web/site/TimeMachine/timeline.php';

?>