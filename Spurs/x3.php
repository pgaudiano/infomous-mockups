<?php

$page = file_get_contents('http://www.nba.com/spurs/features/130701_rodriguez_deshaun_thomas');

$page = str_replace(
      '<head>',
      '<head>
      <base href="http://www.nba.com/">
      ',
      $page);

$page = preg_replace(
	 '+      <h2>July 17, 2013</h2>+s',
	 '      <h2>July 17, 2013</h2>
<!-- Infomous Insertion -->
<div style="height:400px">
<script type="text/javascript" async data-infomous-id="nid40051" src="http://infomous.com/client2?width=660&height=400&colFrame=0x78838a&skinBackgroundImage=http://www.infomous.com/site/mockups/Spurs/floor2.jpg"></script>
</div>

',
	$page
);



echo $page;

?>