<?php
$page = file_get_contents('http://socialmediatoday.com/');


$page = str_replace('<head>',
      '<head>
      <base href="http://socialmediatoday.com/">
      ',
      $page);

$page = str_replace('<div id="topcontainer">',
      '<div id="topcontainer" style="height:230px">',
      $page);

$page = preg_replace(
		    '+Top posts in: Twitter.*?</div></div>+s',
		    '
		    Top posts: Infomous cloud</div>
<!-- Infomous Insertion -->
<!--     <script type="text/javascript" src="http://www.infomous.com/site/mockups/SocialMediaToday/embed.js"></script> -->
<script type="text/javascript" src="http://www.infomous.com/cloud_widget/3790?width=420&height=200"></script>
<!-- End Infomous Insertion -->

     </div>

',
	$page
);


echo $page;

?>