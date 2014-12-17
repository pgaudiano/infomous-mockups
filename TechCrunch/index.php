<?php
/*
    This script generates a cloud dynamically based on a URL passed to it.
    The current version has been modified for TechCrunch

    Written by P. Gaudiano, Infomous.
*/
$dummy=5; // Dummy param used to force a reload of embed.js
$promoted=false; // Whether or not to include promoted content
// Start out with html headers stuff
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns:fb="http://ogp.me/ns/fb#" xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en" dir="ltr">
<head>
<title>Infomous demo for TechCrunch</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
<link type="text/css" rel="stylesheet" media="all" href="/modules/system/defaults.css?y" />
<script type="text/javascript" src="/misc/jquery.js?y"></script>
<link type="text/css" rel="stylesheet" media="all" href="/client/lib/jquery-ui-1.8.16.custom.css" />
<script type="text/javascript" src="/client/lib/jquery-ui-1.8.16.custom.min.js"></script>
<style type="text/css" media="all">
</style>
<link rel="stylesheet" href="colorbox.css" />
<script src="/site/scripts/colorbox-master/jquery.colorbox.js"></script>
<script>
  $(document).ready(function(){
  $(".iframe").colorbox({iframe:true, width:"700", height:"400", scrolling:false});

});
</script>
</head>
<body>
<?
include("simple_html_dom.php");

// Set some reasonable defaults, respect GET params
if ($_GET["url"]) $url = $_GET["url"]; else $url = "http://techcrunch.com/2014/02/27/apple-explains-exactly-how-secure-imessage-really-is/";
if ($_GET["top"]) $top = $_GET["top"]; else $top = "false";
if ($_GET["showpage"]) $showpage = $_GET["showpage"]; else $showpage = "true";
if ($_GET["debug"]) $debug = $_GET["debug"]; else $debug = "false";

/* The page content and form are only printed if this is not invoked
with a URL, OR if it is invoked with a URL and the "Show cloud
embedded..." is unchecked.
*/
if (!isset($_GET["url"]) || ($showpage !== "true"))
{
?>
<div style="width:800px;font-family:helvetica,sans-serif,arial">
<h2>The TechCrunch interactive explorer by Infomous</h2>
Infomous is a great way to keep reades on your site longer. This demo illustrates the use of an Infomous cloud to give TechCrunch readers access to related content after reading any article or author page on techcrunch.com.

<p>
Copy and paste the URL of any article or author page from techcrunch.com in the form below (or use the default provided), then click the Submit button. You will then see a page that shows the original article or author page as it appears on TC. Below the main page content you will see an Infomous cloud created dynamically from related content.

<p>
If you specify the URL of an article, the cloud will show content from a collection of recent articles from several sections of TC. If you specify the URL of an author page, the cloud will contain a collection of the top 20 stories from that author, optionally mixed in with the &quot;top stories&quot; feed from TC.

<!-- Input form -->
<form action="">
<label>Enter the techcrunch.com URL of any article or author page: </label>
<input type="text" name="url" style="width:600px" value="<?print $url;?>">
<p>
<input type="checkbox" name="showpage" value="true" <?print ($showpage == "true")?'checked':'';?> >Show cloud embedded on original TechCrunch page<br><em>Check this box to see the original TC page with the cloud embedded underneath the main content.<br>Uncheck this box and you will see a page with only the Infomous cloud.</em>
<p>
<input type="checkbox" name="top" value="true" <?print ($top == "true")?'checked':'';?>>If viewing an author page, include TechCrunch top stories as well as author stories
<!-- 
<p>
<input type="checkbox" name="debug" value="true" <?print ($debug == "true")?'checked':'';?>>Show debug info below Infomous cloud
-->
<p>
<input type="submit" value="See mockup">
</form>

<p>Alternatively, use the links below to see demos of some specific pages.

<ul>
  <li> <a href="http://www.infomous.com/site/mockups/TechCrunch/?url=http%3A%2F%2Ftechcrunch.com%2Fauthor%2Falexia-tsotsis%2F&showpage=true">Alexia Tsotsis' author page</a></li>

  <li><a href="http://www.infomous.com/site/mockups/TechCrunch/?url=http%3A%2F%2Ftechcrunch.com%2F2014%2F02%2F27%2Fapple-explains-exactly-how-secure-imessage-really-is%2F&showpage=true">Apple Explains Exactly How Secure iMessage Really Is</a></li>
</ul>

<?
}

// Fetch the file
$page = file_get_html($url);

// Check to see if it is a TR author page
$author_page = strpos($url,'/author/');

// Behave differently if it's an author page
if ($author_page && isset($_GET["url"])) {
   $feeds .= rtrim($url,"/").'/feed';
   // Optionally, add also the top stories feed
   if ($top) $feeds .= "|http://www.techcrunch.com/feed";
   if ($promoted) $feeds .= '|http://www.infomous.com/site/mockups/AdDemo/get_feed.php';
   $author = $page->find('h1',0)->innertext;
   $search_string = '<h2 class="section-title">Featured Picks';
   $title_label = 'Explore recent articles by '.$author;
   $width=948;
   $height=400;
} else { // Not an author page, or no URL passed - build a generic cloud
  $feeds = "http://feeds.feedburner.com/TechCrunch/startups";
  $feeds .= "|http://feeds.feedburner.com/TechCrunch/fundings-exits";
  $feeds .= "|http://feeds.feedburner.com/TechCrunch/social";
  $feeds .= "|http://feeds.feedburner.com/TechCrunch/gaming";
  $feeds .= "|http://feeds.feedburner.com/crunchgear";
  $feeds .= "|http://feeds.feedburner.com/Mobilecrunch";
  $feeds .= "|http://feeds.feedburner.com/TechCrunchIT";
  $feeds .= "|http://www.techcrunch.com/feed";
  if ($promoted) $feeds .= '|http://www.infomous.com/site/mockups/AdDemo/get_feed.php';
  $search_string = '<div id="jp-post-flair"';
  $title_label = 'Explore more stories from TechCrunch';
  $width=698;
  $height=400;
}

// If "showpage" is set, show the original page, otherwise show the cloud in place.
if (isset($_GET["showpage"])) {

// First off add <base href...> to ensure rel links work properly
$page = str_replace(
      '<head>',
      '<head>
      <base href="http://www.techcrunch.com">
      ',
      $page);

$page = preg_replace(
'+'.$search_string.'+s',
'
<!-- BEGIN Infomous insertion --> 
<h2 class="widget-title" style="margin-top:1em;">'.$title_label.' - <span style="font-size:0.8em;font-style:italic;">Click any word for a list</span>
</h2>

<script type="text/javascript" src="http://infomous.com/site/mockups/TechCrunch/embed.js?width='.$width.'&height='.$height.'&url='.$feeds.'&author_page='.$author_page.'&a='.$dummy.'">
</script>
<div style="text-align:right;margin-top:0px;height=30px;">
<p style="font-size:0.7em;"><a class="iframe" href="http://www.infomous.com/site/mockups/TechCrunch/infohelp.html">[What\'s this?]</a></p>

</div>

'.($_GET["debug"]?'<em>FOR THE DEMO ONLY (the text below would not show in the production version):

<div><a href="https://www.infomous.com/site/mockups/TechCrunch/"><em><-- Back to the Infomous demo</em></a></div>

<p>
The Infomous cloud above uses the following feeds:<br>'.str_replace('|','<br>',$feeds).'<br></em>

':'').'
<p><a href="http://www.infomous.com/site/mockups/TechCrunch/"><em><-- Back to the Infomous demo page</em></a>
	 <!-- End Infomous insertion -->

'
.($author_page?'<hr />':'')
.$search_string
,
	$page
);

echo $page;
} else {  // If we get here, just embed the cloud on the script main page
if (isset($_GET["url"])) print('
<h2>Infomous TechCrunch Navigation Demo</h2>

<div style="width:'.$width.'px;">
The cloud below shows trending topics based on a collection of top feeds from TechCrunch. Click any word to reveal a list of related articles from TechCrunch. Click any article in the list to read it.
<p>
<script type="text/javascript" src="http://infomous.com/site/mockups/TechCrunch/embed.js?width='.$width.'&height='.$height.'&url='.$feeds.'&author_page='.$author_page.'&a='.$dummy.'"></script>

<p><a href="http://www.infomous.com/site/mockups/TechCrunch/"><em><-- Back to the Infomous demo page</em></a>
	 <!-- End Infomous insertion -->

');
}

// print('<p>DONE');

?>

</body>
</html>