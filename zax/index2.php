<?php
$page = file_get_contents('http://www.fastcompany.com/user/david-zax');

$page = str_replace('<head>',
      '<head>
      <base href="http://www.fastcompany.com/">
      ',
      $page);

$page = str_replace(
		    '<div id="profile-news-feed-wrapper">',
		    '<div id="profile-news-feed-wrapper">

<!-- Infomous Insertion -->
	<script type="text/javascript" src="http://www.infomous.com/site/mockups/zax/embed2.js"></script>
<!-- End Infomous Insertion -->


',
	$page
);



echo $page;

?>