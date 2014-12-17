<?php

$page = file_get_contents('http://futurem.org/Speakers.aspx');

$page = str_replace(
      '<head id="ctl00_ctl00_Head1"><title>',
      '<head id="ctl00_ctl00_Head1">
      <title>',
      $page);

$page = preg_replace(
	 '+<style>.short {display:none;}</style>+s',
	 8'
	 <!-- Infomous insertion -->
<h4 style="margin:0 0 6px 0;font-size:12px">Interactive navigation cloud for #FutureM</h4>
<script type="text/javascript" src="http://www.infomous.com/cloud_widget/4316?width
=160&height=320"></script>
<br>
<script type="text/javascript" src="http://www.infomous.com/site/mockups/FutureM/embed.js"></script>
<a href="javascript:openHelp()"><img src="http://www.infomous.com/site/mockups/FutureM/help_on_big.png"></a>
<a href="javascript:openSnippet()"><img src="http://www.infomous.com/site/mockups/FutureM/popup_on_big.png"></a>
<br>
<p style="margin:10px 0 0 0">
<hr>
',
	$page
);



echo $page;

?>