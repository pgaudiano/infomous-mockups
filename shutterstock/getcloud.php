<!-- passing the RSS feed link ($f) to this file and show the cloud. -->

<script type="text/javascript" src="lib/shadowbox.js"></script>
<link type="text/css" rel="stylesheet" href="lib/shadowbox.css"/>

<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
require_once("simple_html_dom.php");

if (isset($_GET['input'])) {
  $f = $_GET['input'];
  $title = $_GET['title'];
} 

/* Note: added sleep(), because sometimes the cloud was launched before the RSS file had been saved, resulting in a blank cloud */
//sleep(0.5);

echo '<html><body style="text-align:center;">
<!-- BEGIN Infomous insertion --> 
<script>
    Shadowbox.init({
      handleOversize: "resize"
    });
    var myFeed = "'.$f.'"; // Feeds constructed above.
    var cloud;
    var myInfomousCloud = {  // Parameters that alter the look & feel of the cloud.
      api: "true",
      width: "650",
      height: "500",
      setFrame: "True",
      setControls: "False",
      textOption: "TITLE_ONLY",
      colFrame: "0x444444",
      colFrameTitle: "0xffffff",
      colBackground: "0xFFFFFF",
      hidden: "stock,vector",
      skinLine1Size: "14",
      skinLine2Size: "12",
      skinSourcesWidth: "400",
      skinMaxFontSize: "42",
      skinMinFontSize: "14",
      dict: "NOUN|1, VERB|0, ADJECTIVE|1, ADVERB|0, NUMBER|0, OTHER|1",
      title: "Explore Shutterstock \''.$title.'\' pictures with Infomous",
      skinBackgroundImage: "http://calebstorkey.com/wp-content/uploads/2014/05/shutterstock-logo.jpg",
     }
    // This is the main Infomous API function
    function infomous_ready(I) {
      cloud = I.clouds.get();  // Create the cloud object
      
      cloud.set_var(\'feeds\',myFeed);   // Set the feeds
    
      cloud.make_request();   // Update the cloud
    }
</script>
<center><script type="text/javascript" async data-infomous-id="myInfomousCloud" src="http://www.infomous.com/client2/"></script>
</center>
</body>
</html>';

?>
