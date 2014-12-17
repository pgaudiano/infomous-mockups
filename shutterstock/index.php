<?php
	//include Shutterstock API PHP Client lib
	require_once('shutterstockAPI.php') ;
	require_once('rss_generator.php');
	require_once('simple_html_dom.php');

	// used for lucky search project
	if (isset($_POST['term'])) {
		$term = $_POST['term'];
		$num = $_POST['num'];
		//$title = str_replace(" ", "_", $term);
		createFeed($term, $num);
		exit;
	}
	
	// used for shutterstock project 
	if (isset($_POST['keyword'])) {
		$arr = $_POST['keyword'];
		$term = $arr[0];
		$num = $arr[1];
		createFeed($term, $num);
		exit;
	}
	
	// used for checking valid rss xml file
	if (isset($_POST['check'])) {
                $url = $_POST['check'];
                // check it 5 times
		for ($i = 0; $i < 5; $i++) {
			if(simplexml_load_string(file_get_contents($url))){
                        	$html = file_get_html($url);
                        	$res = $html->find('item', 0); // check if <item> exists, aim at general rss
                        	if (!is_null($res)) {
                                	echo "yes";
                                	exit;
                        	}
                        	$ret = $html->find('entry', 0); // check if <entry> exists, aim at youtube rss
                        	if (!is_null($ret)) {
                                	echo "yes";
                                	exit;
                        	}
                	}
			sleep(2); // sleep for 2 seconds
		}
                echo "no";
                exit;
        }

	// crawl information for shutterstock and write to xml file
	function createFeed($term, $num) {
		// curl images infomation from shutterstock
		$api_username = 'infomous'; // api username
        	$api_key = 'b8f85808ab0c4ce5b02c4e32e08f0a921f8d06bc'; // api key
		// call ShutterstockAPI with username and key
		$sapi = new ShutterstockAPI($api_username, $api_key);
		// all results get from search keywords
		$images = $sapi->search($term);
		// create rss file
		$link = "http://www.infomous.com/site/rss/shutterstock";
                $description = "Similar Images with ".$term;
		$rss = new RSS($term, $link, $description, $num);	

		for ($i = 0; $i < count($images->results); $i++) {
			// get the image url
			$l = $images->results[$i]->web_url;
			// get image's small thumbnail
			$thumb = $images->results[$i]->thumb_small->url;
			// as image's full description ends with "- stock photo", remove these useless words
			$t = explode(" - stock photo", $images->results[$i]->full_description);
			// add as an item
			$rss->addItem($t[0], $l, $t[0], $thumb);
		}
		$rss->output();
	}

?>

<html>
<head>
	<link type="text/css" rel="stylesheet" href="lib/bootstrap.min.css"/>
	<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
	<title>Shutterstock Similar Images Search</title>
</head>
<body>
	<center>
	<div style="width:700px;font-family:helvetica,sans-serif,arial;padding:20px;">
	
	    <table style="width:96%;  margin-left: 2%; margin-right: 2%">
	      <tr>
	        <td align=left>
	          <a href="http://www.infomous.com"><img src="http://www.infomous.com/site/logos/logo_on_white.jpg" height="50"></a>
	        </td>
	        <td align=right>
              	  <a href="http://www.shutterstock.com/"><img src="http://www.infomous.com/site/mockups/shutterstock/shutterstock_logo.png" height="35"></a>
                </td>
	      </tr>
	    </table>
	    <h3 style="text-align:center;">Visual Exploration of Shutterstock Images - by <em>Infomous</em></h3>

	    <div>
	    	<span style="padding: 10px;">Enter keywords: 
	    		<input type="text" id="search_terms" placeholder="Search terms" size="50" onkeypress="searchKeyPress(event);">
	    		<input type="button" id="btnSearch" value="Search" onclick="search()">
			</span>
		</div>
		<iframe id="myframe" width="700" height="550" frameBorder="0"></iframe>
    		<div id="url"></div> 
	</div>
	<script>
		var arr = [];
		var fullpath = "";
		var path = "";
		
		// pass data to the file itself
		function callAjaxAddition() {
		  	$.ajax({
		  	   type: "POST",
		  	   url: "index.php",
		  	   data: {keyword: arr},
		  	   success: function(data) {
		  	  }
		  	});
		}
		
		// press enter button to search term
		function searchKeyPress(e) {
			// look for window.event in case event isn't passed in
        		if (typeof e == 'undefined' && window.event) { e = window.event; }
        		if (e.keyCode == 13){
            			document.getElementById('btnSearch').click();
        		}
		
		}
		
		// search images with given keyword from shutterstock and store images information in RSS feed
		function search() {
			arr = [];
			var num = Math.floor(Math.random() * 10000000) + 1;
			var words = document.getElementById('search_terms').value;
			arr.push(words);
			arr.push(num);
			callAjaxAddition();	
			fullpath = 'http://www.infomous.com/site/mockups/shutterstock/xml/' + arr[0].split(" ").join("_") + '~'+ arr[1] + ".xml";
			path = "getcloud.php?input=" + fullpath + "&title=" + words;
			setTimeout(function(){check(fullpath);}, 1500); // delay by 1.5 seconds
		}
		
		// used for checking if it's a valid rss xml file
		function check(url) {
			$.ajax({
				type: "POST",
				url: "index.php",
				data: {check: url},
				success: function(data) {
					if (data !== "yes") {
						alert("Not available. Try again!");
					} else {
						document.getElementById("myframe").src = path; 
						showUrl(fullpath);
					}
				}
			});
		}
		
		// used for showing the rss xml file's url
		function showUrl(url) {
        		document.getElementById('url').innerHTML='<pre><p>' + url + ' <button onclick="copy()"><b>Copy To Clipboard</b></button></p></pre>';
		}
        	
		// used for poping up a dialog and copying the url 
		function copy() {
        		window.prompt("Copy to clipboard: Ctrl+C, Enter", fullpath);
		}
	</script>
</center>
</body>
</html>

