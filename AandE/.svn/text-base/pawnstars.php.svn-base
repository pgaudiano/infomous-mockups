<?php

$page = file_get_contents('http://www.history.com/shows/pawn-stars');

$page = str_replace(
      '<head>',
      '<head>
      <base href="http://www.history.com/">
      ',
      $page);


$page = preg_replace(
      '+<h2 class="four-under-grey">Featured Articles</h2>.*?<div class="col col-3 col-last">+s',
      '<!-- Infomous Insertion -->
<h2 class="four-under-grey">The Pawnstars Twitter Navigator</h2>
<script type="text/javascript" src="http://www.infomous.com/cloud_widget/7220?width=480&height=300&skinMinFontSize=14"></script>
<script type="text/javascript" src="http://www.infomous.com/site/mockups/AandE/pawnstars_embed.js"></script>

</div><!--[if !IE]>		.mod	   <![endif]-->
	      			
				</div><!--[if !IE]>  .col-5  <![endif]-->
				<div class="col col-3 col-last">
',
	$page
);



echo $page;

?>
