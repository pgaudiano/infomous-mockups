<?php

$page = file_get_contents('http://www.momcentral.com/blogs');

$page = str_replace(
      '<head>',
      '<head>
      <base href="http://www.momcentral.com/">
      ',
      $page);

$page = str_replace(
      '<a href="/blogs/feed" class="feed-icon">',  
      '
	 <!-- Infomous insertion -->
	 <span style="color: #5D873A;font-size: 150%;font-weight: bold;line-height: 21px;">
	 The Mom Central Blog Navigator</span>

	 <script type="text/javascript" src="http://www.infomous.com/cloud_widget/5874?width=647\
&height=300\
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
	 <script type="text/javascript" src="http://www.infomous.com/site/mockups/MomCentral/embed.js"></script>

<a href="/blogs/feed" class="feed-icon">
',
	$page
);



echo $page;

?>