<?php
$page = file_get_contents('http://espn.go.com/');

$page = str_replace(
		    '<ul class="headlines">',
		    '
	<script language="javascript">
          <!--
          function openSnippet(){
          	window.open("popup.html","_blank", "width=800,height=650,menubar=no,toolbar=no,resizable=no");
          }
          function openHelp(){
          	window.open("infohelp.html","_blank", "width=800,height=400,menubar=no,toolbar=no,resizable=no");
          }
--></script>

		    <div style="padding: 5px; margin: 0 0 10px 0;">
                <div style="font-size: 14px; margin: 0 0 10px 0; font-weight: bold;">Interactive Headlines Cloud</div>
		<script type="text/javascript" src="cloud.js"></script>
                <a href="javascript:openHelp()"><img src="help_on_big.png"></a>
		<a href="javascript:openSnippet()"><img src="popup_on_big.png"></a>
                </div>

		<ul class="headlines">',
	$page
);

echo $page;

?>