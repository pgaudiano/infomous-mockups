<?php
$page = file_get_contents('http://www.economist.com/');

/*$page = str_replace(
	'<!--[if IE 8]>',
	'<link type="text/css" rel="stylesheet" media="all" href="http://www.jodange.com/publishers/cloud/styles/general.css" />
	<!--[if IE 8]>',
    $page);*/

$page = str_replace(
	'<div id="most-lists" class="block">',
	'<div style="border: 1px solid #CDD9DA; background-color: #F4F8FB; margin-bottom: 15px;">
		<script type="text/javascript" src="economist_embed_front.js"></script>
	</div>
	<div id="most-lists" class="block">',
    $page);
    

echo $page;
?>
