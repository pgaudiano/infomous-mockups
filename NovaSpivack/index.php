<?php

$page = file_get_contents('http://www.novaspivack.com/');

$page = preg_replace(
      '+<div class="textwidget"><p><script type="text/javascript".*?</script>+s',
      '<div class="textwidget"><p>
<script type="text/javascript" src="http://www.infomous.com/cloud_widget/5878?width=335&height=400&colLink=0xD6E8F5&colLinkHover=0x223663&colWord=0x021643&colWordHover=0x002244&colWordHoverLinked=0x122653&colWordFade=0x267091&colBlob=0xFFFFFF&colBlobBorder=0x2D72AD&colBlobHover=0xE0F0FF&skinMinFontSize=12"></script>',
	$page
);



echo $page;

?>