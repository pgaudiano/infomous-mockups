<?php
$page = file_get_contents('http://sports.espn.go.com/espn/page2/simmons/index');

$page = str_replace(
		    '<div class="sg-row2-left">',
		    '
		<div class="sg-row2-left">

		    <!-- Infomous insertion -->
	<script language="javascript">
          <!--
          function openSnippet(){
          	window.open("popup.html","_blank", "width=800,height=650,menubar=no,toolbar=no,resizable=no");
          }
          function openHelp(){
          	window.open("infohelp.html","_blank", "width=800,height=400,menubar=no,toolbar=no,resizable=no");
          }
--></script>

		<div class="leftItem clearfix">
		<h1>Interactive Bill Simmons Blog Navigator &nbsp;&nbsp;<a href="javascript:openSnippet()" style="text-decoration:underline;text-weight:normal">[New window]</a></h1>
		<script type="text/javascript" src="cloud.js"></script>
                </div>
',
	$page
);

echo $page;

?>