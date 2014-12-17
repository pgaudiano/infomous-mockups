<?
$titles = array ( 
"US News from NewsWhip + USA Today",
"Wold News from NewsWhip + USA Today",
"Us and World News from NewsWhip + USA Today",
       		  );
$nids = array(
909,
875,
874
);

/* $dates = array(
"2013,0,23,6,0,0,0",
"2013,0,23,6,0,0,0",
"2013,0,23,6,0,0,0",
); */


$width=550;
$height=540;
$sw=350;
$sl1=14;
$sl2=11;
$cam="PoweredByInfomous";

$cloudParams = "width=".$width."&height=".$height."&setFrame=true&maxWords=40&wmode=transparent&setControlBar=true&setShowTitle=0&skinSourcesWidth=".$sw.'&skinLine1Size='.$sl1.'&skinLine2Size='.$sl2.'&campaign='.$cam.'&colFrame=0x333333&colFrameTitle=0xffffff'.'"';


if (isset($_GET["nid_key"]))
   $nid_key = $_GET["nid_key"];
else
   $nid_key = 0;
   
$expires = 60*2;   # seconds
header('Pragma: public');
header('Cache-Control: public,max-age='.$expires);
header('Last-modified: ' . gmdate('D, d M Y H:i:s', time()) . ' GMT');
header('Expires: ' . gmdate('D, d M Y H:i:s', time()+$expires) . ' GMT');

?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en" dir="ltr">

<head>
  <title>USA Today and NewsWhip News by Infomous</title>
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
<link type="text/css" rel="stylesheet" media="all" href="/client/lib/jquery-ui-1.8.16.custom.css" />
<script type="text/javascript" src="/client/lib/jquery-ui-1.8.16.custom.min.js"></script>
<script src="jQAllRangeSliders-min.js"></script>
<style type="text/css">
.fb_iframe_widget iframe {min-height: 21px !important;margin-top:-4px;min-height:80px !important;min-width:80px;}
.fb_iframe_widget span {min-height: 21px !important;min-height:21px !important;}}
</style>

<!--
<script>
var minDate_preset = new Date(<?=$dates[$nid_key]?>);
</script>
<script type="text/javascript" src="timeline.js"></script>
<link rel="stylesheet" id="themeCSS" href="css/slider.css"> 
-->

<link rel="stylesheet" type="text/css" href="landing/infomous.css" />

</head>

<body style="background: #ffffff url('SpursBG.jpg') no-repeat center top;">

<div style="font-size:22pt;color:#ffffff;margin-top:10px;margin-left:auto;margin-right:auto;width:550px">
<table width="100%" cellspacing="60px">
<tr>
<td>
<img src="/site/events/NFL/logo_on_white.jpg" style="vertical-align:middle" >
</td>
<td align="right">
<img src="http://www.infomous.com/site/newswhip/landing/newswhip-logo-blue.png" style="vertical-align:middle">
</td>
</tr>
</table>

<div id="infomousMovie" style="border-style:none;width:550px;margin-left:auto;margin-right:auto;margin-top:10px">
<!--
<script type="text/javascript" src="http://analyst2.infomous.com/cloud_widget/<?=$nids[$nid_key].'?'.$cloudParams?>"></script>
-->
<script type="text/javascript" async data-infomous-id="nid<?=$nids[$nid_key]?>" src="http://analyst2.infomous.com/client2/?<?=$cloudParams?>"></script>

</div>

<div style="font-size:14pt;color:#3793d2;margin-top:-10px;margin-bottom:4px;text-align:right">
<p>
<form action="" method="GET" name="category">
<label>Select a different visualization: </label> <select onChange="document.category.submit()" name="nid_key">
<?
 foreach($nids as $key => $nid) {

?>
<option value="<?=$key?>" <?=($key==$nid_key)?" selected":""?>><?=$titles[$key]?></option>
<?}?>
</select>
<?
foreach($_GET as $key =>$value)
{
if($key != "nid_key")
{
 echo "<input type='hidden' name='$key' value='$value' >";
}
}
?>
</form>
</div>

<div style="font-size:12pt; font-family: helvetica,sans-serif,arial;
color:#333333; font-weight:normal;
margin-top:10px;font-style:normal;width:550px;margin-left:auto;margin-right:auto">
This interactive visualization is brought to you by <a
href="http://www.newswhip.com">NewsWhip</a> and <a
href="http://www.infomous.com">Infomous</a>.

<p> Click any word to open a list of links to news articles related to that word. Clicking any of the links will
open that item in a separate browser window. Use the drop-down menu below the cloud to explore other news visualizations.

<p>If you have any questions or if you would like to create and embed your own Infomous clouds, please <a href="http://www.infomous.com/contact">contact us</a>.

<!--
<div id="footer" class="home-block" style="font-size:11pt;text-align:center;line-height:14pt">
-->

<div style="border:solid 1px;background-color:#111111;color:#ffffff;text-align:center;font-size:11pt;vertical-align:bottom">

<p>
Copyright 2007-2013 Icosystem. All rights reserved. <p><a href="/drupal/terms">Terms of service</a> | <a href="/drupal/privacy">Privacy policy</a> | <a href="/drupal/about">About us</a> | <a href="/drupal/contact">Feedback</a></p>

</div>

</body>

