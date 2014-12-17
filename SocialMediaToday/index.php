<?php
$page = file_get_contents('http://socialmediatoday.com/');


$page = str_replace('<head>',
      '<head>
      <base href="http://socialmediatoday.com/">
      ',
      $page);

$page = preg_replace(
		    '+<!-- top stories -->.*?end top stories -->+s',
		    '
		    <!-- top stories -->
		    <div id="topcontainer" style="height:236px">
		    <div class="titlebar" style="padding:8px">
		    Top posts: Interactive cloud <script type="text/javascript" src="http://www.infomous.com/site/mockups/SocialMediaToday/embed.js"></script>
		    </div>
<!-- Infomous Insertion -->
<!--     <script type="text/javascript" src="http://www.infomous.com/site/mockups/SocialMediaToday/embed.js"></script> -->
<script type="text/javascript" src="http://www.infomous.com/cloud_widget/3790?width=424&height=200&hide=social,media"></script>
<!-- End Infomous Insertion -->

     </div>

',
	$page
);


echo $page;

?>