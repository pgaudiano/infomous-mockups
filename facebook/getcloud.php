<script type="text/javascript" src="lib/shadowbox.js"></script>
<link type="text/css" rel="stylesheet" href="lib/shadowbox.css"/>

<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
require_once("simple_html_dom.php");
// nid: 50773,

if (isset($_GET['input'])) {
  $f = $_GET['input'];
  $title = $_GET['title'];
} 

echo '<html><body>
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
      textOption: "DESCRIPTION_ONLY",
      colFrame: "0x3B579D",
      colFrameTitle: "0xffffff",
      skinBackgroundImage: "http://www.infomous.com/site/mockups/facebook/fb_logo.png",
      colSourcesBorder: "0x3B579D",
      title: "Explore Facebook \''.$title.'\' posts with Infomous",
    }
    // This is the main Infomous API function
    function infomous_ready(I) {
      cloud = I.clouds.get();  // Create the cloud object
      
      cloud.set_var(\'feeds\',myFeed);   // Set the feeds
    
      cloud.make_request();   // Update the cloud
    }
</script>
<script type="text/javascript" async data-infomous-id="myInfomousCloud" src="http://www.infomous.com/client2/"></script>
</body>
</html>';

?>