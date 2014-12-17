<?php

$page = file_get_contents('http://www.economist.com/conversation-cloud');

$page = str_replace(
         '</head>',
         '<base href="http://www.economist.com">
</head>',
         $page);
         
$page = str_replace(
  'src="/sites',
    'src="http://www.economist.com/sites',
    $page
);

$page = str_replace(
	'<script type="text/javascript" src="http://economist.infomous.com/site/economist/economist_embed_full_prod.js"></script>',
	'<script type="text/javascript" src="http://economist.infomous.com/site/economist/js/embed_full.js"></script>',
    $page
);

$page = str_replace(
  '<script type="text/javascript" src="http://economist.infomous.com/site/economist/economist_embed_full_dev.js"></script>',
  '<script type="text/javascript" src="http://economist.infomous.com/site/economist/js/embed_full.js"></script>',
    $page
);

echo $page;
?>