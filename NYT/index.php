<?php
$page = file_get_contents('http://bits.blogs.nytimes.com/author/john-markoff/');

$page = str_replace(
		    '<!-- MiddleRight position -->',
		    '
        <!-- Infomous Insertion -->
	<script language="javascript">
          <!--
          function openSnippet(){
          	window.open("markoff_popup.html","_blank", "width=700,height=550,menubar=no,toolbar=no,resizable=no");
          }
          function openHelp(){
          	window.open("infohelp.html","_blank", "width=800,height=400,menubar=no,toolbar=no,resizable=no");
          }
--></script>

		    <div style="padding: 5px; margin: 0 0 10px 0;">
                <div style="font-size: 14px; margin: 0 0 10px 0; font-weight: bold;">Interactive Blog Cloud</div>
		<script type="text/javascript" src="markoff.js"></script>
                <a href="javascript:openHelp()"><img src="help_on_big.png"></a>
		<a href="javascript:openSnippet()"><img src="popup_on_big.png"></a>
                </div>

<!-- MiddleRight position -->',
	$page
);


echo $page;

?>