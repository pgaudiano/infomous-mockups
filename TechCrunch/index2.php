<?php
/*
    This script generates a cloud dynamically based on a URL passed to it.
    The current version has been modified for TechCrunch

    Written by P. Gaudiano, Infomous.
*/

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

/* The page content and form are only printed if this is not invoked
with a URL, OR if it is invoked with a URL and the "Show cloud
embedded..." is unchecked.
*/
if(!isset($_GET["url"]) || ($_GET["showpage"] !== "true"))
{
?>
<div style="width:800px;font-family:helvetica,sans-serif,arial">
<h2>The TechCrunch interacive explorer by Infomous</h2>
This demo illustrates the use of an Infomous cloud to give readers access to related content after reading any article on techcrunch.com.

<p>
Copy and paste the URL of any article from techcrunch.com in the form below (or use the default provided), then click the Submit button. You will then see a page that shows the original article; below the article text you should see an Infomous cloud created dynamically from related content.

<!-- Input form -->
<form action="">
<label>Enter the techcrunch.com URL: </label>
<input type="text" name="url" style="width:600px" value="http://techcrunch.com/author/alexia-tsotsis/">
<p>
<input type="checkbox" name="showpage" value="true" checked>Show cloud embedded on original TechCrunch page
<p>
<input type="checkbox" name="top" value="true">Include TechCrunch top stories
<p>
<input type="checkbox" name="debug" value="true">Show debug info below Infomous cloud
<p>
<input type="submit" value="See mockup">
</form>
<?
}

$url = $_GET["url"];
$author_page = strpos($url,'/author/'); // Check to see if it is a TR author page

$page = file_get_html($url);

// if it's an author's page, simply fetch the feed and set some params
if ($author_page) {
   $feeds .= rtrim($url,"/").'/feed';
   $author = $page->find('h1',0)->innertext;
   $search_string = '<h2 class="section-title">Featured Picks';
   $title_label = 'Explore articles by '.$author;
   $width=948;
   $height=400;
} else { // Not an author page - build a generic cloud
  $feeds = "http://feeds.feedburner.com/TechCrunch/startups";
  $feeds .= "|http://feeds.feedburner.com/TechCrunch/fundings-exits";
  $feeds .= "|http://feeds.feedburner.com/TechCrunch/social";
  $feeds .= "|http://feeds.feedburner.com/TechCrunch/gaming";
  $feeds .= "|http://feeds.feedburner.com/crunchgear";
  $feeds .= "|http://feeds.feedburner.com/Mobilecrunch";
  $feeds .= "|http://feeds.feedburner.com/TechCrunchIT";
  $search_string = '<div id="grv-personalization';
  $title_label = 'More from TechCrunch';
  $width=698;
  $height=400;
}

// Optionally, add also the top stories feed
if ($_GET["top"])
{
$feeds .= "|http://www.techcrunch.com/feed";
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

// Need to behave differently for author pages
if ($author_page) {
}

$page = preg_replace(
'+'.$search_string.'+s',
'
<!-- BEGIN Infomous insertion --> 
<h2 class="widget-title" style="margin-top:1em;">'.$title_label.' - <span style="font-size:0.8em;font-style:italic;">Click any word for a list of articles</span>
</h2>

<script type="text/javascript" src="http://infomous.com/site/mockups/TechCrunch/embed.js?width='.$width.'&height='.$height.'&url='.$feeds.'&a=2">
</script>
<div style="text-align:right;margin-top:-24px;height=30px;">
<!-- <script type="text/javascript" src="http://infomous.com/site/mockups/TechCrunch/help.js"></script> -->
<p style="font-size:0.7em;"><a class="iframe" href="http://www.infomous.com/embed?nid=46991&width=100%&height=100%&setFrame=0">[What\'s this?]</a></p>

</div>

'.($_GET["debug"]?'<em>FOR THE DEMO ONLY (the text below would not show in the production version):

<div><a href="https://www.infomous.com/site/mockups/TechCrunch/">Return to the Infomous demo</a></div>

<p>
The Infomous cloud above uses the following feeds:<br>'.str_replace('|','<br>',$feeds).'<br></em>

':'').'
	 <!-- End Infomous insertion -->

'
.($author_page?'<hr />':'')
.$search_string
,
	$page
);

echo $page;
} else {  // If we get here, just embed the cloud on the script main page
if (isset($_GET["url"])) print('<script type="text/javascript" src="http://infomous.com/site/mockups/TechCrunch/embed.js?width=800&height=400&url='.$feeds.'&a=0"></script>');
}

// print('<p>DONE');

?>

</body>
</html>