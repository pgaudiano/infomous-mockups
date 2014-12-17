<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
require_once("simple_html_dom.php");
// nid: 50773,

if (isset($_GET['input'])) {
  $f = $_GET['input'];
  $title = $_GET['title'];
  $ngram = substr($f, 0, -3);
  $ngram = $ngram."ngram";
} 

//$f = "http://www.infomous.com/site/mockups/yummly/def.xml";
echo '<html><body style="margin:0;padding:0;">
<!-- BEGIN Infomous insertion --> 
<script>
    var myFeed = "'.$f.'"; // Feeds constructed above.
    var cloud;
    var myInfomousCloud = {  // Parameters that alter the look & feel of the cloud.
      api: "true",
      width: "100%",
      height: "92%",
      zoom: "3",
      setFrame: "false",
      setControls: "False",
      textOption: "DESCRIPTION_ONLY",
      skinSourcesWidth: "400",
      skinLine1Size: "15",
      skinLine2Size: "12",
      skinMaxFontSize: "48",
      skinMinFontSize: "12",
      colFrame: "0xE75918",
      colFrameTitle: "0xffffff",
//      skinBackgroundImage: "http://www.infomous.com/site/mockups/yummly/yummly_background.png",
      skinImagePosition: "center middle",
      colBackground: "transparent",
      fontScale: "1.2",
      colSourcesBorder: "0xE06331",
      colWord: "0x333333",
      colBlobBorder: "0xE06331",
      hidden: "Course,course,Ingredients,ingredients,Cuisine,cuisine",
      title: "Explore Yummly \''.$title.'\' recipes with Infomous",
      ngramsSource: "'.$ngram.'",
      "query: cFmt": "true",
      "query:titleFmt" : "%t",
//      "query:captionFmt" : "%t",
    }
    // This is the main Infomous API function
    function infomous_ready(I) {
      cloud = I.clouds.get();  // Create the cloud object
      
      cloud.set_var(\'feeds\',myFeed);   // Set the feeds
    
      cloud.make_request();   // Update the cloud
    }
</script>
<script type="text/javascript" async data-infomous-id="myInfomousCloud" src="http://www.infomous.com/client2/?wmode=transparent"></script>
</body>
</html>
';

?>
