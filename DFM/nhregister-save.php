<?php

$who = 'http://www.nhregister.com/';

//$cloud_nid = 19790;

$page = file_get_contents($who);

$page = str_replace(
      '<head>',
      '<head>
      <base href="http://www.nhregister.com/">
      ',
      $page);
      
$page = str_replace(
      '<iframe width="300" height="250" id="breakingburner-iframe" frameborder="no" scrolling="no"></iframe>',
      '<iframe width="300" height="300" src="http://infomous.com/site/mockups/DFM/19790.html" frameborder="no" scrolling="no"></iframe>',
      $page);

$page = str_replace(
      '<a href="/socialwire"><h3 style="font-size:15px; color:#CA1A00; margin-left:5px; margin-bottom:10px;">Social Wire</h3></a>',
      '',
      $page);     
       
/*$page = str_replace(
      '</body>',
      '<script type="text/javascript" language="JavaScript">
      $(function() {
        	$("#bnews-widget").html(\'<iframe frameborder="0" width="313" height="369" src="19197.html"></iframe>\');
        });
      </script>
      </body>',
      $page);
*/


/*$page = str_replace(
      '<span id=\'z_doubleunderhack\'>',
      '<script type="text/javascript" language="JavaScript">
        	$("#bnews-widget").html(\'<iframe frameborder="0" width="313" height="369" src="19197.html"></iframe>\');
      </script>
      <span id=\'z_doubleunderhack\'>',
      $page);*/
      
      
echo $page;
?>