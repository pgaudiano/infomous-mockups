<?php

$page = file_get_contents('http://www.biography.com/on-this-day/');

$page = str_replace(
      '<head>',
      '<head>
      <base href="http://www.biography.com/">
      ',
      $page);


$page = preg_replace(
      '+<div id="happened-today">+s',
      '<div id="happened-today">
	<h2 class="main-heading"><span>The <i>On This Day</i> Navigator</span></h2>
<script type="text/javascript" src="http://www.infomous.com/cloud_widget/6908?width=613&height=350&caption=true&colWord=0xA40102&colWordHover=0xA40102&colWordFade=0x919191&colWordHoverLinked=0xFA0203&colBlobBorder=0x1D60AD&colBlobHover=0x44AAFF"></script>
	<br/>
	<script type="text/javascript" src="http://www.infomous.com/site/mockups/AandE/embed.js"></script>
	</div>
<br/><br/>
',
	$page
);



echo $page;

?>
