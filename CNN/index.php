<?php

$page = file_get_contents('http://globalpublicsquare.blogs.cnn.com/');

/* $page = str_replace(
      '<head>',
      '<head>
      <base href="http://www.masshightech.com/">
      ',
      $page);
*/

 $page = preg_replace(
      '+<div id="cnn_cnn_adtag-3".*?<!-- @start 2 -->+s',
      '
	 <!-- Infomous insertion -->
	 <div style="margin-left: 9px">
	 <h3 class="cnn_widget_title" style="color: #004473">
	 The CNN GPS Interactive Navigator</h3>

<script type="text/javascript" src="http://www.infomous.com/cloud_widget/8125?width=320&height=250&caption=true&skinMinFontSize=12"></script>
<a style="font-weight:bold;color: #004473" href="javascript:nw=window.open(\'http://www.infomous.com/cloud/fullscreen/8125\',\'_blank\',\'width=770,height=500,menubar=no,toolbar=no,location=no,resizable=yes,scrollbars=no\');void(0);">[Open in New Window]</a> &nbsp; &nbsp;<a style="font-weight:bold;color: #004473" href="javascript:nw=window.open(\'http://www.infomous.com/site/mockups/CNN/infohelp.html\',\'_blank\',\'width=600,height=450,menubar=no,toolbar=no,location=no,resizable=yes,scrollbars=no\');void(0);">[Help]</a> 
</div>
<!-- @start 2 -->
',
	$page
);



echo $page;

?>