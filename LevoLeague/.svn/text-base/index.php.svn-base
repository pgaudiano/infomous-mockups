<?php

$page = file_get_contents('http://www.prettyyoungprofessional.com/');

/* $page = str_replace(
      '<head><title>',
      '<head>
      <base href="http://futurem.org/">
      <title>',
      $page);
*/

$page = preg_replace(
	 '+<div class="column last">+s',
	 '
	 <div class="column last">
	 <script type="text/javascript" src="http://www.infomous.com/cloud_widget/3830?width=900&height=300&maxWords=50&caption=true"></script>

',
	$page
);



echo $page;

?>