<?php

$page = file_get_contents('http://www.momcentral.com/articles');

$page = str_replace(
      '<head>',
      '<head>
      <base href="http://www.momcentral.com/">
      ',
      $page);

$page = str_replace(
      '<div class="block block-views " id="block-views-current_giveaway-block_1">',  
      '
	 <!-- Infomous insertion -->
	 <span style="color: #5D873A;font-size: 120%;font-weight: bold;line-height: 21px;">
	 The Mom Central Article Navigator</span>

	 <script type="text/javascript" src="http://www.infomous.com/cloud_widget/5875?width=300\
&height=400\
&caption=false\
&setInteractionMode=click\
&colLink=0xB4C59B\
&colLinkHover=0xEEDFBB\
&colWord=0x91489B\
&colWordHover=0x588338\
&colWordHoverLinked=0x285308\
&colWordFade=0x9A775D\
&colBlob=0xD7C0E6\
&colBlobBorder=0x91489B\
&colBlobHover=0xE8B2C1\
&colBackground=0xF3E3BF\
"></script>
	 <script type="text/javascript" src="http://www.infomous.com/site/mockups/MomCentral/embed2.js"></script>

<p><div class="block block-views " id="block-views-current_giveaway-block_1">
',
	$page
);



echo $page;

?>