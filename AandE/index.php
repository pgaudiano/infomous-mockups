<?php

$page = file_get_contents('http://www.biography.com/on-this-day/');

$page = str_replace(
      '<head>',
      '<head>
      <base href="http://www.biography.com/">
      ',
      $page);


$page = preg_replace(
      '+<h4>Born on This Day Widget</h4>.*?<div class="botd-module">+s',
      '<h4>Born on This Day Navigator</h4>
<script type="text/javascript" src="http://www.infomous.com/cloud_widget/6908?width=297&height=350&caption=true&colWord=0xA40102&colWordHover=0xA40102&colWordFade=0x919191&colWordHoverLinked=0xFA0203&colBlobBorder=0x1D60AD&colBlobHover=0x44AAFF"></script> 

<div class="botd-module">',
	$page
);



echo $page;

?>