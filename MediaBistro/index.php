<?php

$page = file_get_contents('http://www.mediabistro.com/');

$page = str_replace(
      '<head>',
      '<head>
      <base href="http://www.mediabistro.com/">
      ',
      $page);


$page = preg_replace(
      '+(<div class="blogdate">.*?</div>)+s',
      '
$1
<h2>The MediaBistro Spotlighter - Click words to explore</h2>
<div style="height:280px; border-style:solid; border-color:#A1A100; border-width:thin">
<script type="text/javascript" src="http://www.infomous.com/cloud_widget/20612?width=588&height=280&maxWords=40"></script>
</div> 

<a style="font-weight:bold" href="javascript:nw=window.open(\'http://www.infomous.com/cloud/fullscreen/20612\',\'_blank\',\'width=770,height=500,menubar=no,toolbar=no,location=no,resizable=yes,scrollbars=no\');void(0);">[Open in New Window]</a> &nbsp; &nbsp;<a style="font-weight:bold" href="javascript:nw=window.open(\'http://www.infomous.com/site/mockups/MediaBistro/infohelp.html\',\'_blank\',\'width=600,height=450,menubar=no,toolbar=no,location=no,resizable=yes,scrollbars=no\');void(0);">[Help]</a>

',
	$page,1
);



echo $page;

?>