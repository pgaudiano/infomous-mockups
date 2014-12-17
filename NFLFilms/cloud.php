<?php
/* 

   Load a generic blank page with a cloud in the middle. Pass the NID as a param

*/

$page_title = "NFL Top 10 Demo Clouds";
$cloud_width = 900;
$cloud_height = 600;
$nid = 43867;
$debug = 0;
$infoserver = 'www';

// Check for run-time parameters
// Look for width and height, or set reasonable defaults based host site
if (isset($_GET["width"])) $cloud_width=$_GET["width"];
if (isset($_GET["height"])) $cloud_height=$_GET["height"];
if (isset($_GET["max_words"])) $max_words=$_GET["max_words"];
if (isset($_GET["nid"])) $nid=$_GET["nid"];
if (isset($_GET["page_title"])) $page_title=$_GET["page_title"];

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<head>
<title><? print $page_title ?> - Infomous </title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />

<style>
</style>
</head>

<body >

  <!-- Box containing the cloud, legend, slider etc. -->
  <div style="border: 1px solid #333333; margin-top:5px;width:<? print $cloud_width ?>px;margin-left:auto;margin-right:auto;">

    <!-- Infomous Cloud -->
    <script type="text/javascript">
    var nid<? print $nid ?> = {
//    "setFrame": 'false',
//    "colFrame": '0xef5b32',
//      "title" : '<?print ($page_title)?>',
      "maxWords" : '<?print $max_words ?>',
//      "loadAtStart": false,
    }
    </script>
      <script type="text/javascript" async data-infomous-id="nid<? print $nid ?>" src="http://<? print $infoserver;?>.infomous.com/client2/?width=<? print $cloud_width;?>&height=<? print $cloud_height;?>"></script> 
    </div> 

</div> <!-- End of Container -->


</body>
