<?
$titles = array ( "AFC Team News",
       		  );
$dates = array(
"2013,0,23,6,0,0,0",
);

$nids = array(33335);

if ($_POST["nid_key"])
   $nid_key = $_POST["nid_key"];
else
   $nid_key = 0;
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en" dir="ltr">

<head>
  <title>NFL: AFC Team News Spotlighter by Infomous</title>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link rel="shortcut icon" href="/sites/all/themes/infomous2/img/favicon.ico" type="image/x-icon" />
  <link type="text/css" rel="stylesheet" media="all" href="/modules/node/node.css?y" />
<link type="text/css" rel="stylesheet" media="all" href="/modules/system/defaults.css?y" />
<link type="text/css" rel="stylesheet" media="all" href="/modules/system/system.css?y" />
<link type="text/css" rel="stylesheet" media="all" href="/modules/system/system-menus.css?y" />
<link type="text/css" rel="stylesheet" media="all" href="/modules/user/user.css?y" />
<link type="text/css" rel="stylesheet" media="all" href="/modules/forum/forum.css?y" />
<link type="text/css" rel="stylesheet" media="all" href="/sites/all/themes/infomous2/style.css?y" />


<script type="text/javascript" src="/misc/jquery.js?y"></script>


<script type="text/javascript" src="/misc/drupal.js?y"></script>
<script type="text/javascript" src="/sites/all/themes/infomous2/scripts/analytics.js?y"></script>
<script type="text/javascript">jQuery.extend(Drupal.settings, { "basePath": "/" });</script>
<link type="text/css" rel="stylesheet" media="all" href="http://analyst2.infomous.com/client/lib/jquery-ui-1.8.16.custom.css" />
<script type="text/javascript" src="http://analyst2.infomous.com/client/lib/jquery-ui-1.8.16.custom.min.js"></script>
<script src="jQAllRangeSliders-min.js"></script>
<style type="text/css">
.fb_iframe_widget iframe {min-height: 21px !important;margin-top:-4px;min-height:80px !important;min-width:80px;}
.fb_iframe_widget span {min-height: 21px !important;min-height:21px !important;}}
</style>

<script>
var minDate_preset = new Date(<?=$dates[$nid_key]?>);
</script>
<script type="text/javascript" src="timeline.js"></script>
<link rel="stylesheet" id="themeCSS" href="css/slider.css"> 

<link rel="stylesheet" type="text/css" href="landing/infomous.css" />

</head>

<body style="background: #000033 url('sb47-bg2.jpg') no-repeat center top;">

<div align="center">

<div style="width:900px; margin-left:40px; margin-top:0px; text-align:left; font-size:16px; color:#FFFFFF; font-weight:normal;line-height:130%;font-family=helvetica,sans-serif">
<h1>NFL: AFC Team News Spotlighter by <a href="http://infomous.com">Infomous</a></h1>


<!--
<div style="width:800px; margin:10px 0 20px 0; padding:0px; text-align:left; font-size:14px; color:#FFFFFF; font-weight:normal;">
<form action="" method="POST" name="category">
<label>Select a Social Spotlighter: </label><select onChange="document.category.submit()" name="nid_key">
<?
 foreach($nids as $key => $nid) {

?>
<option value="<?=$key?>" <?=($key==$nid_key)?" selected":""?>><?=$titles[$key]?></option>
<?}?>
</select>
</form>
</div>
-->

<div id="infomousMovie" style="border-style:none;background-image:url('NFL2-ongray.png');">
<div id="infomous" class="infomous" style="border-style:none"></div>
<script type="text/javascript" src="http://www.infomous.com/cloud_widget/<?=$nids[$nid_key]?>?width=900&height=500&setFrame=false&maxWords=50&wmode=transparent"></script>
</div>

<!-- <div style="width:900px;padding-top:20px;">
        <span id="amount"></span>
        <div id="slider" style="margin-top:10px;"></div>
</div>

<div class="steps" style="
    padding: 0px;
    margin-left: 0px;
width: 900px;
    text-align: left;
" id="markers">

</div>
-->


<div style="width:900px; padding:5px; text-align:left;
font-size:1.1em; font-family: arial,helvetica,sans-serif; color:#fafafa; font-weight:normal; margin-top:10px;font-style:normal"> Click any word to open a list of links to news articles that
contain that word. Clicking any of the links will open that article in
a separate browser window.

<p>If you have any questions or if you would like to create and embed your own spotlighters, please <a href="http://www.infomous.com/contact">contact us</a>.

</div>

<div id="footer" class="home-block" style="margin: 0px 0 0px 0;width:900px;">
<div align="center">

  <p>Like this? Share it!&nbsp;
    <a href="http://twitter.com/share" class="twitter-share-button"
    data-text="Infomous Super Bowl XLVII Spotlighter" data-count="none">Tweet</a><script type="text/javascript" src="http://platform.twitter.com/widgets.js"></script>
    &nbsp;
    <script src="http://connect.facebook.net/en_US/all.js#xfbml=1"></script><fb:like layout="button_count"></fb:like> 
Copyright 2007-2013 Icosystem. All rights reserved. <br><a href="/drupal/terms">Terms of service</a> | <a href="/drupal/privacy">Privacy policy</a> | <a href="/drupal/about">About us</a> | <a href="/drupal/contact">Feedback</a></p>
    </div>
</div>


	</div>
</body>
