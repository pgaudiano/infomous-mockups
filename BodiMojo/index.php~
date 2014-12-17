<?php

$page = file_get_contents('http://www.tnaflix.com/');

$page = str_replace(
      '<head><title>',
      '<head>
      <base href="http://futurem.org/">
      <title>',
      $page);

$page = str_replace(
	 '<div class="floatRight" id="rightColumn">',
	 '
<div class="floatRight" id="rightColumn">

	 <!-- Infomous insertion -->
	 <script type="text/javascript" src="http://www.infomous.com/cloud_widget/4989?width=210&height=300&caption=true&setInteractionMode=click"></script>
	 <script type="text/javascript" src="http://www.infomous.com/site/mockups/tnaflix/embed.js"></script>

',
	$page
);



echo $page;

?>