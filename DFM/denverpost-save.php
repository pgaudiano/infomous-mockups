<?php

$who = 'http://www.denverpost.com/';

$cloud_nid = 19197;

$page = file_get_contents($who);


/*$page = str_replace(
      "<span id='bnews-widget'>",
      "<iframe frameborder='0' width='313' height='369' src='small.html'></iframe> <span id='bnews-widget'>",
      $page);*/

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


$page = str_replace(
      '<span id=\'z_doubleunderhack\'>',
      '<script type="text/javascript" language="JavaScript">
        	$("#bnews-widget").html(\'<iframe frameborder="0" width="313" height="369" src="19197.html"></iframe>\');
      </script>
      <span id=\'z_doubleunderhack\'>',
      $page);
echo $page;
?>