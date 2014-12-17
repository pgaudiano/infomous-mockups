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

// $f = "http://www.infomous.com/site/rss/xml/Infomous_RSS_Creator_from_Text~1732627.xml";
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
      width: "1000",
      height: "500",
      setFrame: "True",
      setControls: "False",
      textOption: "TITLE_ONLY",
      maxWords: "30",
      skinBackgroundImage: "http://www.infomous.com/site/images/careerbuilder.png",
      hiddenSource: "http://www.infomous.com/site/blocked/english.txt",
      skinLine1Size: "14",
      skinLine2Size: "12",
      setFrame: "1",
      colFrame: "0x0079B5",
      colFrameTitle: "0xFFFFFF",
      skinSourcesWidth: "450",
      skinMaxFontSize: "42",
      skinMinFontSize: "14",
      colWord: "0x201c56",
      colHoverBox: "0x201c56",
      colLinkHover: "0xf7b68b",
      colBlob: "0xfffcff",
      colBlobBorder: "0xff6600",
      colBlobHover: "0xe1edf2",
      colSourcesFill: "0xfcf0e8",
      colSourcesBorder: "0x0079b5",
      colButton: "0x023658",
      colButtonHover: "0x081c29",
      colButtonDown: "0x0566a6",
      colBackground: "0xffffff",
      title: "Explore CareerBuilder.com \''.$title.'\' jobs with Infomous",
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