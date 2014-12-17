<?php
error_reporting(E_ALL);

$page = file_get_contents('http://www.economist.com/topics');

$page = str_replace(
		     '</head>',
		     '<base href="http://www.economist.com">
</head>',
		     $page);
		     
$page = str_replace(
	'src="/sites',
    'src="http://www.economist.com/sites',
    $page
);

/*$page = str_replace(
  'href="/',
    'href="http://www.economist.com/',
    $page
);*/

$page = str_replace(
	'<div id="column-right" class="grid-6 clearfix">',
  '<script type="text/javascript" src="http://www.infomous.com/site/mockups/economist/topics/topics.js?a=2"></script><div id="column-right" class="grid-6 clearfix">',
    $page);
    

echo $page;
?>
