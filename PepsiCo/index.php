<?php

$page = file_get_contents('http://pepsicoblogs.com/');

/* $page = str_replace(
      '<head>',
      '<head>
      <base href="http://www.momcentral.com/">
      ',
      $page); */

$page = preg_replace(
      '+<li class="widget pepsico_twitter">.*?</li>+s',
      '
	 <!-- Infomous insertion -->
	 <span style="color: #003399;font-size: 120%;font-weight: bold">
	 The PepsiCo Twitter Navigator</span>

<script type="text/javascript" src="http://www.infomous.com/cloud_widget/6116?width=288&height=320&caption=true&colBackground=0xFFFFFF&skinMinFontSize=12&colWord=0x0046A0&colWordHover=0xC92626&colWordFade=0x2AABFF&colWordHighlighted=0xF78F8F&colWordHoverLinked=0x675FAA&colHoverBox=0x64EBFA&colLink=0xFF817E&colBlob=0xFFFFFF&colBlobBorder=0xFA6865&colBlobHover=0xF3F7F7&colSourcesFill=0xFFFFFF&colSourcesBorder=0xFFFFFF&colSourcesAds=0x454BFF"></script>
<a style="font-weight:bold" href="javascript:nw=window.open(\'http://www.infomous.com/cloud/fullscreen/6116\',\'_blank\',\'width=770,height=500,menubar=no,toolbar=no,location=no,resizable=yes,scrollbars=no\');void(0);">Open in New Window</a> &nbsp; &nbsp;<a style="font-weight:bold" href="javascript:nw=window.open(\'http://www.infomous.com/site/mockups/PepsiCo/infohelp.html\',\'_blank\',\'width=600,height=450,menubar=no,toolbar=no,location=no,resizable=yes,scrollbars=no\');void(0);">Help</a> 
',
	$page
);



echo $page;

?>