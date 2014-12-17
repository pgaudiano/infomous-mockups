<style type="text/css">
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
<div style="width:800px;font-family:helvetica,sans-serif,arial">
<h2>WIRED.com dynamic spotlighter generator by Infomous</h2>
This demo illustrates the use of an Infomous <em>spotlighter</em> to give readers access to related content after reading any article on wired.com.

<p>
Copy and paste the URL of any article from wired.com in the form below (or use the default provided), then click the Submit button. You will then see a page that shows the original article. Scroll to the bottom of the article to see an Infomous spotlighter created dynamically from related content.

<p>
Select the checkbox if you want Wired Top Stories also to be included in the spotlighter. Keep in mind that some stories may be duplicated in the lists shown in the spotlighter.
<p>
<form action="#">
<label>Wired.com article URL: </label>
<input type="text" name="url" style="width:600px" value="http://www.wired.com/threatlevel/2013/03/gps-warrant-requirement/">
<p>
<input type="checkbox" name="top" value="true">Include Wired Top Stories
<!-- NOTE: We have found tags to be fairly useless, so we commented this out.
&nbsp;&nbsp;
<input type="checkbox" name="tags" value="true">Include article tags
-->

<p>
<input type="submit" style="cursor:pointer;" value="Submit">
</form>
</div>
<?
}

$inputfile = $_GET["url"];
$page = file_get_html($inputfile);

// First off, find the category feeds from the page itself
foreach($page->find('ul#entryCategories li a') as $element) 
{
 $feeds .= $element->href."feed/|";
}

// Next, pull out the main section feed.
$section = $page->find('div#header a');
$feeds .= $section[0]->href."feed/|";

// Optionally, add feeds using the tags
if ($_GET["tags"])
{
	foreach($page->find('entryTags a') as $element) 
	{
	 $feeds .= $element->href."feed/|";
	 }
}

// Optionally, add also the top stories feed
if ($_GET["top"])
{
$feeds .= "http://feeds.wired.com/wired/index?format=xml";
}

/* $page = str_replace(
      '<title>',
      '<base href="http://www.wired.com">
      <title>
      ',
      $page); */

//$page = file_get_contents($inputfile);
$page_to_print =  file_get_contents($inputfile);
$page_to_print = str_replace('<title>','<base href="http://www.wired.com/"><title>',$page_to_print);
//$page_to_print = str_replace('ads','http://www.wired.com/ads',$page_to_print);

// This is the string to search for in the original HTML for insertion
$matchstring='<div id=\'linker_widget\' class=\'contextly-widget\'></div>';

// Now create the insertion code needed for the cloud.
$insertion='
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
	    setFreezeTime: "12000",
	    zoom: "1.5",
	    "query:sort": "d",
    }
</script>
<script type="text/javascript" src="http://infomous.com/client/embed.js"></script>  
<em>FOR THE DEMO ONLY (this text would not show in the production version):<br>The spotlighter above uses the following feeds:<br>'.str_replace('|','<br>',$feeds).'<br></em>

<a href="http://www.infomous.com/site/mockups/wired/'.basename(__FILE__).'">Return to the Infomous demo</a>
';

// Check to see if something has changed - there will be a mismatch.
if (!strpos($page,$matchstring)) {
$page = '<h1>Error!</h1>
<div style="width:800px">
We can\'t find the place on the page where to insert the Infomous spotlighter. Chances are, something changed in the html of the original source file:<br> (<a href="'.$inputfile.'">'.$inputfile.'</a>).
<p>
Instead, we will only show the Infomous spotlighter that would have been embedded into that page:
</div>
'.$insertion;

} else {

// We found the place to inject the cloud - now insert the necessary code.

$page = preg_replace(
'+'.$matchstring.'+s',	 '
<style type="text/css">
object,embed{width:inherit;height:inherit}
</style>
<table width=100%>
<tr>
<td>
<h1 class="widget-title">Click the words to explore related content</h1>
</td>
<td align="right">
<script type="text/javascript" src="http://www.infomous.com/site/mockups/wired/help.js"></script>
</td>
</tr>
</table>
'.$insertion.'
	 <!-- Infomous insertion -->
<!--
'.$matchstring.'
-->
',
	$page_to_print
);

}

echo $page;

?>