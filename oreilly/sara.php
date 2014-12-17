<?php

$page = file_get_contents('http://radar.oreilly.com/sara/index.html');

$page = str_replace(
      '<head>',
      '<head>
      <base href="http://radar.oreilly.com/">
      ',
      $page);


$page = preg_replace(
      '+<p class="sidebar-title2">From Twitter</p>.*?<!--div class="sidebar-item">+s',
      '<p class="sidebar-title2">The @sarawinge Navigator</p>
<script type="text/javascript" src="http://www.infomous.com/cloud_widget/6957?width=320&height=350&skinMinFontSize=12"></script> 
<a style="font-weight:bold" href="javascript:nw=window.open(\'http://www.infomous.com/cloud/fullscreen/6957\',\'_blank\',\'width=770,height=500,menubar=no,toolbar=no,location=no,resizable=yes,scrollbars=no\');void(0);">[Open in New Window]</a> &nbsp; &nbsp;<a style="font-weight:bold" href="javascript:nw=window.open(\'http://www.infomous.com/site/mockups/oreilly/infohelp.html\',\'_blank\',\'width=600,height=450,menubar=no,toolbar=no,location=no,resizable=yes,scrollbars=no\');void(0);">[Help]</a>
</div>
<!--div class="sidebar-item">
',
	$page
);



echo $page;

?>