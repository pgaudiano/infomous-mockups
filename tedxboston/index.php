<?php
$page = file_get_contents('http://tedxboston.org/adventures/tedxboston-2011-adventures/');

$page = str_replace(
	 '<div id="sidebar">',
	 '<div id="sidebar">

<!-- Infomous Insertion -->
	<script type="text/javascript" src="http://www.infomous.com/site/mockups/tedxboston//embed.js"></script>
<!-- End Infomous Insertion -->


',
	$page
);



echo $page;

?>