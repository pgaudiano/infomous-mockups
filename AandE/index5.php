<?php

$page = file_get_contents('http://www.biography.com/on-this-day/');

$page = str_replace(
      '<head>',
      '<head>
      <base href="http://www.biography.com/">
      ',
      $page);


$page = preg_replace(
	'+<div class="square-advertisment-module">+s',
	'<div class="square-advertisment-module">
		<h2 class="main-heading"><span>The <i>On This Day</i> Navigator</span></h2>
		<!-- BEGIN Infomous insertion -->
		<div class="infomous-wrapper" style="border: 1px solid #CCC;">
			<div id="infomous" class="infomous"></div>
			<br>
			<script type="text/javascript" src="http://www.infomous.com/site/mockups/AandE/embed.js"></script>
		</div>
	<br/><br/>
	<script type="text/javascript">
	    var vars = {
	      width: "306",
	      height: "350",
	      nid: 10832,
	      setInterfaceType: "widget",
	      caption: "true",
	      colWord: "0xA40102",
	      colWordHover: "0xA40102",
	      colWordFade: "0x919191",
	      colWordHoverLinked: "0xFA0203",
	      colLink: "0xBBBBBB",
	      colLinkHover: "0x999999",
	      colBlobBorder: "0x1D60AD",
	      colBlobHover: "0x44AAFF",
	      skinMaxFontSize: 26,
	      skinMinFontSize: 13
	    }
	</script>
	<script type="text/javascript" src="http://infomous.com/client/embed.js"></script>
	',
	$page
);



echo $page;

?>
