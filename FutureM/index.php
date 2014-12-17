<?php

$page = file_get_contents('http://futurem.org/');

$page = str_replace(
      '<head><title>',
      '<head>
      <base href="http://futurem.org/">
      <title>',
      $page);

$page = preg_replace(
	 '+<div class="twitterFeed".*?</div>+s',
	 '
	 <!-- Infomous insertion -->
	     <h3>Visualize FutureM on Twitter</h3>
	     <table width="250" style="text-align:center">
	     <tr>
	     <td width="50%" style="margin:10px 0 0 0">
	     <a href="javascript:nw=window.open(\'http://www.infomous.com/cloud/fullscreen/4297\',%20\'_blank\',%20\'width=770,height=500,menubar=no,toolbar=no,location=no,resizable=yes,scrollbars=no\');%20void(0);">
	     <p style="font-size:10px;margin:6px 0 6px 0">Follow @FutureMBoston</p>
	     </a>
	     </td>
	     <td>
	     <a href="javascript:nw=window.open(\'http://www.infomous.com/cloud/fullscreen/4316\',%20\'_blank\',%20\'width=770,height=500,menubar=no,toolbar=no,location=no,resizable=yes,scrollbars=no\');%20void(0);">
	     <p style="font-size:10px">Search for #FutureM</p>
	     </a>
	     </td>
	     </tr>
	     <tr>
	     <td>
	     <a href="javascript:nw=window.open(\'http://www.infomous.com/cloud/fullscreen/4297\',%20\'_blank\',%20\'width=770,height=500,menubar=no,toolbar=no,location=no,resizable=yes,scrollbars=no\');%20void(0);">
	     <img src="http://www.infomous.com/site/mockups/FutureM/ScreenShot1.png" border="0">
	     </a>
	     </td>
	     <td>
	     <a href="javascript:nw=window.open(\'http://www.infomous.com/cloud/fullscreen/4316\',%20\'_blank\',%20\'width=770,height=500,menubar=no,toolbar=no,location=no,resizable=yes,scrollbars=no\');%20void(0);">
	     <img src="http://www.infomous.com/site/mockups/FutureM/ScreenShot2.png" border="0">
	     </a>
	     </td>
	     </tr>
	     <tr style="margin:8px 0 0 0">
	     <td colspan="2"><p class="description" style="margin:10px 0 0 0">Brought to you by <a href="http://www.infomous.com" target="_blank">Infomous</a></td>
	     </tr>
	     </table>
',
	$page
);



echo $page;

?>