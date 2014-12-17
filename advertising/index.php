<?php 

/* 

   This script creates a timeline cloud, i.e., an Infomous cloud that
   has a time slider below it. Moving the time slider changes the date
   range for the cloud.

*/

// Set some global variables and parameters
$debug=0;
$title="Infomous Time Machine";
$client_name="";
//$nid=1000; // This one has only the main feed.
//$nid=1472; // This one has multiple section feeds with labels
//$nid=1487; // This has multiple section feeds without labels
$nid=1488; // This has multiple section feeds without labels and sponsorship materials
$infoserver='analyst2';
$cloud_width=740;
$cloud_height=450;
$start_date='2014-09-27';
$end_date='2014-09-28';
//$slider_width=500;
//$footer_info = 'The cloud above shows our Flash client'; 
$nidvars = '
';

require '/home/infomous/web/site/mockups/advertising/weekend.php';

?>