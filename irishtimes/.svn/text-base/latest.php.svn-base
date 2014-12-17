<?php

$page = file_get_contents('http://www.irishtimes.com/');

$page = str_replace(
      '<head>',
      '<head>
      <base href="http://www.irishtimes.com/">
      ',
      $page);


$page = preg_replace(
        '+<div id="right-column-homepage">+s',
        '<div id="right-column-homepage">
                <h1><span class="red">Latest News Navigator</span></h1>
                <!-- BEGIN Infomous insertion -->
                <div class="infomous-wrapper" style="border: 1px solid #CCC;">
                        <div id="infomous" class="infomous"></div>
                        <br>
                        <script type="text/javascript" src="http://infomous.com/site/mockups/irishtimes/latest_embed.js"></script>
		</div>
	<br>
        <script type="text/javascript">
		var vars = {
			width: "308",
			height: "308",
			colBackground: "0xFFFFFF",
			setInterfaceType: "widget",
			caption: "true",
			nid: 11979
			//feeds: "http://rss.feedsportal.com/c/851/f/10838/index.rss"
		}
        </script>
        <script type="text/javascript" src="http://infomous.com/client/embed.js"></script>
        <!--<script type="text/javascript" src="http://infomous.com/cloud/get?nid=11979&width=308&height=308"></script>-->
        ',
        $page
);



echo $page;

?>
