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

// $f = "http://www.infomous.com/site/rss/xml/Infomous_RSS_Creator_from_Text~1732627.xml";
echo '<html><body><input id="backup" type="button" onclick="history.go(-1);" value="Back" style="margin-left: 600px;"><BR>';

echo '
<!-- BEGIN Infomous insertion --> 
<script>
    if (document.referrer == "http://www.infomous.com/site/mockups/FreshPatents/" || document.referrer == "http://www.infomous.com/site/mockups/luckySearch/") {
	document.getElementById("backup").disabled = true;
}
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
      setLinksTarget: "_parent",
      colFrame: "#66FF00",
      colFrameTitle: "0xffffff",
      skinBackgroundImage: "http://images1.freshpatents.com/images/FP-LOGO-LG.png",
      colSourcesBorder: "#66FF00",
      title: "Explore FreshPatents \''.$title.'\' patents with Infomous",
      hidden: "Category,category",
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
