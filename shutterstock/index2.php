<?php
	//include Shutterstock API PHP Client lib
	require_once('shutterstockAPI.php') ;
	require_once('rss_generator.php');

	if (isset($_POST['keyword'])) {
		$arr = $_POST['keyword'];
		$term = $arr[0];
		$num = $arr[1];
		// curl images infomation from shutterstock
		$api_username = 'infomous';
        $api_key = 'b8f85808ab0c4ce5b02c4e32e08f0a921f8d06bc';
		$sapi = new ShutterstockAPI($api_username, $api_key);
		$images = $sapi->search($term);

		// create rss file
		$link = "http://www.infomous.com/site/mockups/shutterstock";
		$description = "Similar Images with ".$term;
		$rss = new RSS($term, $link, $description, $num);

		for ($i = 0; $i < count($images->results); $i++) {
			$l = $images->results[$i]->web_url;
			$thumb = $images->results[$i]->thumb_small->url;
			$t = explode(" - stock photo", $images->results[$i]->full_description);
			$rss->addItem($t[0], $l, $t[0], $thumb);
		}
		$rss->output();
		exit;
	}
?>

<html>
<head>
<!--	<link type="text/css" rel="stylesheet" href="lib/bootstrap.min.css"/> -->
	<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
	<title>Shutterstock Similar Images Search</title>
</head>
<body>
	<div style="width:700px;font-family:helvetica,sans-serif,arial;padding:20px;">
	
	    <table style="width:96%;  margin-left: 2%; margin-right: 2%">
	      <tr>
	        <td align=left>
	          <a href="http://www.infomous.com"><img src="http://www.infomous.com/site/logos/logo_on_white.jpg" height="50"></a>
	        </td>
	      </tr>
	    </table>
	    <h3 style="text-align:center;">Visual Exploration of Shutterstock Images - by <em>Infomous</em></h3>
	
	    <div>
	    	<input type="text" id="search_terms" placeholder="Search terms" style="margin-left:160px; margin-top:30px">
	    	<input type="button" style="width:10em; margin-left:20px" value="Search" onclick="search()">
		</div>
	</div>
	<script>
		var arr = [];
		function callAjaxAddition() {
		  	$.ajax({
		  	   type: "POST",
		  	   url: "index2.php",
		  	   data: {keyword: arr},
		  	   success: function(data) {
		  	  }
		  	});
		}

		function search() {
			arr = [];
			//var num = Math.floor(Math.random() * 10000000) + 1;
			var num = 0;
			var words = document.getElementById('search_terms').value;
			arr.push(words);
			arr.push(num);
			callAjaxAddition();	
			var fullpath = 'http://www.infomous.com/site/mockups/shutterstock/xml/' + arr[0].split(" ").join("_") + '~'+ arr[1] + ".xml";
			console.log('inside search with arr[0] = '+arr[0]+' and fullpath='+fullpath);
			window.open('getcloud.php?input=' + fullpath,'popUpWindow','height=550,width=700');

			//window.showModalDialog('getcloud.php?input=' + fullpath, '', 'dialogHeight:550px;dialogWidth:700px');	
		}
	</script>
</body>
</html>
