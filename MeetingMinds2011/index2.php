<?php

$page = file_get_contents('http://www.meetingminds2011.org/category/food-for-thought/');

/* $page = str_replace(
      '<head>',
      '<head>
      <base href="http://www.momcentral.com/">
      ',
      $page); */

$page = preg_replace(
      '+<!-- #nav-above -->+s',
      '<!-- #nav-above -->

	 <!-- Infomous insertion -->
	 <h2 class="entry-title">The Food for Thought Navigator</h2>

<script type="text/javascript" src="http://www.infomous.com/cloud_widget/6349?width=640&height=300&maxWords=30"></script>
<a style="font-weight:bold" href="javascript:nw=window.open(\'http://www.infomous.com/cloud/fullscreen/6349\',\'_blank\',\'width=770,height=500,maxWords=50,menubar=no,toolbar=no,location=no,resizable=yes,scrollbars=no\');void(0);">New Window</a> &nbsp; &nbsp;<a style="font-weight:bold" href="javascript:nw=window.open(\'http://www.infomous.com/site/mockups/MeetingMinds2011/infohelp.html\',\'_blank\',\'width=600,height=450,menubar=no,toolbar=no,location=no,resizable=yes,scrollbars=no\');void(0);">Help</a> 
<p>
',
	$page
);



echo $page;

?>