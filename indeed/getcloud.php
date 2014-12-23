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

echo '<html><body style="margin:0;padding:0;">
<!-- BEGIN Infomous insertion --> 
<script>
    Shadowbox.init({
      handleOversize: "resize"
    });
    var myFeed = "'.$f.'"; // Feeds constructed above.
    var cloud;
    var myInfomousCloud = {  // Parameters that alter the look & feel of the cloud.
      api: "true",
      width: "100%",
      height: "92%",
      zoom: "6",
      dict: "NOUN|1, VERB|0, ADJECTIVE|1, ADVERB|0, NUMBER|0, OTHER|1",
      hiddenSource: "http://www.infomous.com/site/blocked/english.txt",
      fontScale: "0.9",
      setFrame: "false",
      setControls: "False",
      textOption: "TITLE_ONLY",
      skinSourcesWidth: "400",
      skinLine1Size: "15",
      skinLine2Size: "12",
      skinMaxFontSize: "42",
      skinMinFontSize: "10",
      colSourcesBorder: "0x2164F3",
      colBackground: "transparent",
      wmode: "transparent",
      colWord: "0x333333",
      colBlobBorder: "0x2164F3",
      "query:titleFmt": "%t",
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
