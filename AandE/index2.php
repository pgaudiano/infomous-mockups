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

</div><!--[if !IE]>		.mod	   <![endif]-->
	      			
				</div><!--[if !IE]>  .col-5  <![endif]-->
				<div class="col col-3 col-last">
',
	$page
);



echo $page;

?>