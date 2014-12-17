<?php
include("simple_html_dom.php");

if(!isset($_GET["url"]))
{
?>
<div style="width:800px;font-family:helvetica,sans-serif,arial">
<h2>The Gigaom.com dynamic spotlighter generator by Infomous</h2>
This demo illustrates the use of an Infomous <em>spotlighter</em> to give readers access to related content after reading any article on gigaom.com.

<p>
Copy and paste the URL of any article from gigaom.com in the form below (or use the default provided), then click the Submit button. You will then see a page that shows the original article; below the article text you should see an Infomous spotlighter created dynamically from related content.

<form action="#infomous">
<label>Gigaom.com URL: </label>
<input type="text" name="url" style="width:600px" value="http://gigaom.com/2013/11/18/why-the-youth-market-matters-for-snapchat-and-facebook-despite-what-the-wsj-thinks/">
<p>
<input type="checkbox" name="top" value="true" checked>Include Gigaom top stories
<p>
<input type="checkbox" name="debug" value="true" checked>Show debug info below spotlighter
<p>
<input type="submit" value="See mockup">
</form>
<?
}

$page = file_get_html($_GET["url"]);

foreach($page->find('ul.sorted_tags li a') as $element) 
{
 $feeds .= $element->href."feed/|";
}

// Optionally, add also the top stories feed
if ($_GET["top"])
{
$feeds .= "http://feeds.feedburner.com/ommalik";
}


$page = str_replace(
      '<head>',
      '<head>
      <base href="http://www.gigaom.com">
      ',
      $page);

$page = preg_replace(
'+<h2 class="widget-title">Related research</h2>+s',	 '
<style type="text/css">
object,embed{width:inherit;height:inherit}
</style>
<a name="infomous"></a>
<h2 class="widget-title">Explore related content - click any word
</h2>

<div id="infomous" class="infomous"></div>
<script type="text/javascript">
    var vars = {
            width: "600",
            height: "300",
	    maxWords: "35",
	    dict: "NOUN|1,VERB|0,ADJECTIVE|1,ADVERB|0,NUMBER|0,OTHER|1",
	    setControlBar: "true",
	    setControls: "fontSlider, zoomSlider, wordsSlider, groups, dict, fullscreen",
	    brandLogoDestination: "http://www.infomous.com/site/mockups/gigaom/",
            feeds: "'.$feeds.'",
	    campaign: "GigaomCampaign",
	    colWord: "0x000000",
	    colWordHoverLinked: "0x4883ab",
	    colWordFade: "0xbfcfd6",
	    colWordHighlighted: "0x64a0c8",
	    colHoverBox: "0x000000",
	    colFocusBorder: "0x64a0c8",
	    colLink: "0xf7f7f7",
	    colLinkHover: "0xc7dbe8",
	    colBlob: "0xf7fbfd",
	    colBlobBorder: "0xdeebf3",
	    colBlobHover: "0xedf3f7",
	    colSourcesBorder: "0x64a0c8",
	    colSourcesLine1: "0x000000",
	    colSourcesTextHover: "0x60a0d1",
	    colPanelFill: "0xdeebf3",
	    colButton: "0x000000",
	    colButtonHover: "0x383838",
	    colButtonDown: "0x141014",
	    colBackground: "0xffffff",
	    skinMaxFontSize: "44",
	    skinMinFontSize: "12",
	    skinLine1Size: "13",
	    skinLine2Size: "12",
	    skinSourcesWidth: "300",
	    "query:sort": "d",
    }
</script>
<script type="text/javascript" src="http://infomous.com/client/embed.js"></script>  
<div style="text-align:right">
<script type="text/javascript" src="http://www.infomous.com/site/mockups/gigaom/help.js"></script>
</div>

'.($_GET["debug"]?'<em>FOR THE DEMO ONLY (the text below would not show in the production version):

<div><a href="http://www.infomous.com/site/mockups/gigaom/">Return to the Infomous demo</a></div>

<p>
The spotlighter above uses the following feeds:<br>'.str_replace('|','<br>',$feeds).'<br></em>

':'').'
	 <!-- End Infomous insertion -->

<h2 class="widget-title" style="margin-top:10px;">Related research</h2>'
,
	$page
);



echo $page;

?>
