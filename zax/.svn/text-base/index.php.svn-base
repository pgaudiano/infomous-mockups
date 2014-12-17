<?php
$page = file_get_contents('http://www.fastcompany.com/user/david-zax');

$page = str_replace('<head>',
      '<head>
      <base href="http://www.fastcompany.com/">
      ',
      $page);

$page = str_replace(
		    '<div id="block-fc_blocks-rs_block_sitewide_1" class="clear-block block block-fc_blocks">',
		    '<div id="block-fc_blocks-rs_block_sitewide_1" class="clear-block block block-fc_blocks">
<!-- Infomous Insertion -->
	<script type="text/javascript" src="http://www.infomous.com/site/mockups/zax/embed.js"></script>
<!-- End Infomous Insertion -->


',
	$page
);



echo $page;

?>