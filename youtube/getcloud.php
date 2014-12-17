<!-- passing the RSS feed link ($f) to this file and show the cloud. -->

<script type="text/javascript" src="lib/shadowbox.js"></script>
<link type="text/css" rel="stylesheet" href="lib/shadowbox.css"/>

<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
require_once("simple_html_dom.php");
// nid: 50773,

if (isset($_GET['input'])) {
  $f = $_GET['input']; // RSS feed link
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
      width: "800",
      height: "500",
      setFrame: "True",
      setControls: "False",
      textOption: "TITLE_ONLY",
      dict: "NOUN|1,ADVERB|0,ADJECTIVE|1,VERB|0,NUMBER|0,OTHER|1",
      query:sort="d",
      colFrame: "0xA82222",
      colFrameTitle: "0xffffff",
      colBackground: "0xFFFFFF",
      colSourcesBorder: "0xA82222",
      hiddenSource: "http://www.infomous.com/site/blocked/english.txt",
      skinLine1Size: "14",
      skinLine2Size: "12",
      skinSourcesWidth: "400",
      skinMaxFontSize: "42",
      skinMinFontSize: "14",
      title: "Explore YouTube \''.$title.'\' videos with Infomous",
      skinBackgroundImage: "http://www.infomous.com/site/mockups/youtube/YouTube-logo-full_color.png",
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
