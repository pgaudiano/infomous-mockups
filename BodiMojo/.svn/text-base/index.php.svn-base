<?php

$page = file_get_contents('http://www.bodimojo.com/');

$page = str_replace(
      '<head>',
      '<head>
      <base href="http://www.bodimojo.com/">
      ',
      $page);

$page = preg_replace(
	 '+<div class="view view-bodimojotweets.*?<div class="view-footer">+s',
	 '
<div class="view view-bodimojotweets view-id-bodimojotweets view-display-id-block_1 view-dom-id-1">
        <div class="view-header">
      <img src="/sites/all/themes/bodimojo/images/home/header_bodimojotweets.gif" width="253" height="40" border="0" />    </div>
  
	 <!-- Infomous insertion -->
	 <script type="text/javascript" src="http://www.infomous.com/cloud_widget/5239?width=250&height=350&caption=false&setInteractionMode=click&colLink=0xDDDDDD&colLinkHover=0x00AEF0&colWord=0x2C9F24&colWordFade=0x5CBF54&colBlobBorder=0x55CFF4&colBlobHover=0xADF1FF"></script>
	 <script type="text/javascript" src="http://www.infomous.com/site/mockups/BodiMojo/embed.js"></script>

<div class="view-footer">
',
	$page
);



echo $page;

?>