<?php
include("simple_html_dom.php");

$page = file_get_contents("index-base.html");

$page = str_replace(
      '<div id="wrapper">',
      'HOLA
<iframe id="filmstrip" src="filmstrip.html" frameborder="0"></iframe>
      ',
      $page);

// /sitewide/css/sitewide/css
$page = str_replace(
      '/sitewide/css/sitewide',
      'http://www.mtv.com/sitewide/css/sitewide',
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
