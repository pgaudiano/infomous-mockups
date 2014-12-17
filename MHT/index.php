<?php

$page = file_get_contents('http://www.masshightech.com/news.html');

$page = str_replace(
      '<head>',
      '<head>
      <base href="http://www.masshightech.com/">
      ',
      $page);

$page = preg_replace(
      '+<h1>News</h1>+s',
      '
	 <!-- Infomous insertion -->
	 <span style="color: #0072BB;font-size: 120%;font-weight: bold">
	 The MassHighTech News Navigator</span>

<script type="text/javascript" src="http://www.infomous.com/cloud_widget/6197?width=626&height=320&caption=true&skinMinFontSize=12&colLink=0xD6E8F5\
&colLinkHover=0x425683\
&colWord=0x0072BB\
&colWordHover=0x002244\
&colWordHoverLinked=0x122653\
&colWordFade=0xA1BACB\
&colHoverBox=0xBCBCBC
&colBlob=0xFFFFFF\
&colBlobBorder=0x2D72AD\
&colBlobHover=0xD0D0D0\
&colBackground=0xF0F0F0\
"></script>
<a style="font-weight:bold" href="javascript:nw=window.open(\'http://www.infomous.com/cloud/fullscreen/6197\',\'_blank\',\'width=770,height=500,menubar=no,toolbar=no,location=no,resizable=yes,scrollbars=no\');void(0);">[Open in New Window]</a> &nbsp; &nbsp;<a style="font-weight:bold" href="javascript:nw=window.open(\'http://www.infomous.com/site/mockups/MHT/infohelp.html\',\'_blank\',\'width=600,height=450,menubar=no,toolbar=no,location=no,resizable=yes,scrollbars=no\');void(0);">[Help]</a> 
<p>
<h1>News</h1>
',
	$page
);



echo $page;

?>