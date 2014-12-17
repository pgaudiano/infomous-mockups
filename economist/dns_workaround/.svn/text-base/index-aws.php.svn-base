<?php
$serverName = 'http://ec2-50-16-105-225.compute-1.amazonaws.com';

$page = file_get_contents('http://www.economist.com/node/17361344/comments');

/*$page = str_replace(
	'<!--[if IE 8]>',
	'<link type="text/css" rel="stylesheet" media="all" href="http://www.jodange.com/publishers/cloud/styles/general.css" />
	<!--[if IE 8]>',
    $page);*/

$page = preg_replace(
		     '</head>',
		     '<base href="http://www.economist.com">
</head>',
		     $page);
		     
$page = str_replace( 'src="/', 'src="http://www.economist.com/', $page);

$page = preg_replace( '/economist.infomous.com/', 'ec2-50-16-105-225.compute-1.amazonaws.com', $page);
$page = preg_replace( '/economist_embed_[a-z]*.js/', 'economist_embed_aws.js', $page);
    

echo $page;
?>
