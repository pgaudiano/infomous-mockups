<?php

$page = file_get_contents('http://www.irishtimes.com/newspaper/breaking/2012/0216/breaking14.html');

$page = str_replace(
      '<head>',
      '<head>
      <base href="http://www.irishtimes.com/">
      ',
      $page);


$page = preg_replace(
        '+<div class="right-column">+s',
        '<div class="right-column">
                <h1><span class="red">Business News Navigator</span></h1>
                <!-- BEGIN Infomous insertion -->
                <div class="infomous-wrapper" style="border: 1px solid #CCC;">
                        <div id="infomous" class="infomous"></div>
                        <br>
                        <script type="text/javascript" src="http://infomous.com/site/mockups/irishtimes/business_embed.js"></script>
		</div>
	<br>
        <script type="text/javascript">
		var vars = {
			width: "318",
			height: "318",
			colBackground: "0xFFFFFF",
			setInterfaceType: "widget",
			caption: "true",
			nid: 11981
			//feeds: "http://rss.feedsportal.com/c/851/f/10841/index.rss"
		}
        </script>
        <script type="text/javascript" src="http://infomous.com/client/embed.js"></script>
        <!--<script type="text/javascript" src="http://infomous.com/cloud/get?nid=11981&width=308&height=308"></script>-->
        ',
        $page
);



echo $page;

?>
