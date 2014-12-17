<?php

$who = 'http://www.denverpost.com/';

$cloud_nid = 19197;

$page = file_get_contents($who);


$embed = '<div id="infomous" class="infomous"></div><script type="text/javascript" src="http://infomous.com/site/mockups/DFM/client/embed.js"></script>';
$embed = 'HELLLO';

$page = str_replace(
      '</body>',
      '<script type="text/javascript" language="JavaScript">
      	var vars = {
          width: 313,
          height: 369,
          words: 30,
          setFrame: true,
          setInterfaceType: "widget",
          nid: "19197",
          "query:cAuthors": false,
          "query:cFeedLink": ".",
          skin: "blue",
          setInteractionMode: "hover_click",
          colBackground: "0xFFFFFF",
          setShowReset: true,
          target: "bnews-widget"
       }
       var base_path = "http://infomous.com/site/mockups/DFM/client/";
       
        //$(function() {
        //	$("#bnews-widget").html(\''. $embed .'\');
        //});
      </script>
      <script type="text/javascript" src="http://infomous.com/site/mockups/DFM/client/embed.js"></script>
      </body>',
      $page);

      
echo $page;
?>