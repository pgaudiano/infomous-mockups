<style type="text/css">
body { padding:20px 50px; font:12px Verdana, Geneva, sans-serif;
 }

input, textarea {
 padding: 8px;
 border: solid 1px #E5E5E5;
font: normal 12px Verdana, Tahoma, sans-serif;
 }
</style>
<?php
include("simple_html_dom.php");

if(!isset($_GET["url"]))
{
?>
<h1>WIRED.com dynamic spotlighter generator by Infomous</h1>
Copy and paste the URL of any article from wired.com in the form below, then click the Submit button. You will then see a page that shows the original article, followed by an Infomous spotlighter created dynamically from related content.
<p>
<form action="#">
<label>Wired.com article URL: </label>
<input type="text" name="url" style="width:600px" value="http://www.wired.com/design/2013/03/3d-print-smoothing/"><input type="submit" style="cursor:pointer;" value="Submit">
</form>
<?
}

$page = file_get_html($_GET["url"]);

// First off, find the category feeds from the page itself
foreach($page->find('ul#entryCategories li a') as $element) 
{
 $feeds .= $element->href."feed/|";
}

// Next, pull out the main section feed.
$section = $page->find('div#header a');
$feeds .= $section[0]->href."feed/|";

// Finally, add the main top stories feed
$feeds .= "http://feeds.wired.com/wired/index?format=xml";

/* $page = str_replace(
      '<title>',
      '<base href="http://www.wired.com">
      <title>
      ',
      $page); */

$page = preg_replace(
'+<div id=\'linker_widget\'></div>+s',	 '
<style type="text/css">
object,embed{width:inherit;height:inherit}
</style>
<table width=100%>
<tr>
<td>
<h2 class="widget-title">Explore related Wired.com content - click the words below</h2>
</td>
<td align="right">
<script type="text/javascript" src="http://www.infomous.com/site/mockups/wired/help.js"></script>
</td>
</tr>
</table>
<div id="infomous" class="infomous"></div>
<script type="text/javascript">
    var vars = {
            width: "660",
            height: "350",
	    maxWords: "35",
	    dict: "NOUN|1,VERB|0,ADJECTIVE|1,ADVERB|0,NUMBER|0,OTHER|1",
            feeds: "'.$feeds.'",
	    setControlBar: "true",
	    setControls: "fontSlider, zoomSlider, wordsSlider, groups, dict, fullscreen",
	    brandLogoDestination: "http://www.infomous.com/site/mockups/wired/",
	    campaign: "WiredCampaign",
	    colWord: "0x00afef",
	    colWordHoverLinked: "0x00afef",
	    colWordFade: "0xbac1c4",
	    colHoverBox: "0x000000",
	    colFocusBorder: "0x00afef",
	    colLink: "0xf2f2f2",
	    colBlob: "0xffffff",
	    colBlobBorder: "0x000000",
	    colBlobHover: "0xf5fcff",
	    colSourcesBorder: "0x00afef",
	    colSourcesLine1: "0x000000",
	    colSourcesTextHover: "0x0085b5",
	    colPanelFill: "0xb2e5f7",
	    colButton: "0x000000",
	    colButtonHover: "0x333333",
	    colButtonDown: "0x030203",
	    skinMaxFontSize: "42",
	    skinMinFontSize: "14",
	    skinLine1Size: "13",
	    skinLine2Size: "12",
	    skinSourcesWidth: "300",
	    wmode: "transparent",
	    zoom: "1.5",
	    "query:sort": "d",
    }
</script>
<script type="text/javascript" src="http://infomous.com/client/embed.js"></script>  
<em>FOR THE DEMO ONLY (this text would not show in the production version):<br>The spotlighter above uses the following feeds:<br>'.str_replace('|','<br>',$feeds).'<br></em>

<a href="http://www.infomous.com/site/mockups/wired/">Return to the Infomous demo</a>
	 <!-- Infomous insertion -->
',
	$page
);



echo $page;

?>
