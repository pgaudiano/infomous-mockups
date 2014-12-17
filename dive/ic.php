<?php 

/* 

   This script creates a "dive" cloud with a slider underneath that allows you
   to dive down into less frequent topics.

*/

// Set some global variables and parameters
$debug=0;
$title="Infomous News Digger";
$client_name="infomous.com";
$description="Explore News with Infomous";
$nid=49436;
$infoserver='www';
$cloud_width=740;
$cloud_height=450;
$start_depth=0;
$dive_step=5;
$num_steps=10;
$max_words=40;


require '/home/infomous/web/site/mockups/dive/index.php';

?>