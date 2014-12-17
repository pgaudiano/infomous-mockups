<?php

// include RSS writer lib
require_once('rss_generator.php');
require_once('simple_html_dom.php');

$url = "http://tgs.freshpatents.com/search-rss.php";

// crawl information from FreshPatents and write to xml file
if (isset($_POST["term"])) {
	$term = $_POST["term"];
	$num = $_POST['num'];
	// curl info
	$html = curlInfo($term, $url);
	// display from submitted result
	$dom = new DOMDocument();
	$dom->loadHTML($html);
	$nodes = $dom->getElementsByTagName('a'); // get all html contents as tags.
	// create channel
	$link = "http://www.infomous.com/site/mockups/FreshPatents";
        $description = "Explore $term from FreshPatents";
        $rss = new RSS($term, $link, $description, $num);
	foreach($nodes as $node){
	    $href = $node->getAttribute('href');
	    $content = parseTitle(trim($node->textContent));
	    // omit custom rss
	    if ($content == trim($node->textContent)) {
	    	continue;
	    }
	    // check if it's a rss file
	    if (substr($href, -4) == ".rss") {	
	    	// disregard unrelated result
		if (containWord($content, $term) > 0) {
		        $href = "http://www.infomous.com/site/mockups/FreshPatents/getcloud.php?input=".$href."&title=".$content;
	    		$content = "Category -- ".$content;
	    		$thumbnail = "http://www.infomous.com/site/rss/thumbs/info.png";
			$rss->addItem($content, $href, $content, $thumbnail);
	    	}	
	    }
	}
	$rss->output();
	exit;
}

// check xml url
if (isset($_POST['check'])) {
	$url = $_POST['check'];
	// check if the url exists
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
	echo "no";
	exit;
}	

/**
 * Use this function to curl information
 */
function curlInfo($term, $url) {
	// THIS ARRAY CONTAINS THE INPUT FIELDS DATA
	$data = array('pg' => $term);

	// START THE CURL PROCESS
	$ch = curl_init(); // initialize
	curl_setopt($ch, CURLOPT_URL, $url); // form location url
	curl_setopt($ch, CURLOPT_POST, 1); // form method 
	curl_setopt($ch, CURLOPT_POSTFIELDS, $data); // input fileds
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); // get form result details
	$html = curl_exec($ch); // execute the curl process
	return $html;
}

/**
 * Use this function to check if it contains the search words
 */
function containWord($content, $term) {
	$content = strtolower($content);
	$len1 = strlen($content);
	$len2 = strlen($term);
	$i = 0;
	for ($i = 0; $i < $len1 - $len2 + 1; $i++) {
		if ((substr($content, $i, $len2) === $term) && ($i + $len2 == $len1 || $content[$i + $len2] === " ") && ($i == 0 || $content[$i - 1] === " ")) {
			return 1;
		} 
	}
	return 0; 
}

/**
 * As the title is --  Subscribe to "Spin" keywords
 * Use this function to delete the useless words 'Subscribe to "' and '" keywords' or '" feed'
 */

function parseTitle($title) {
	$word1 = "Subscribe to \"";
	$word2 = "\" keywords";
	$word3 = "\" feed";
	if ((substr($title, 0, strlen($word1)) === "Subscribe to \"")) {
		if ((substr($title, strlen($title) - strlen($word2))) === "\" keywords") {
			return substr($title, strlen($word1), - strlen($word2));
		}
		if ((substr($title, strlen($title) - strlen($word3))) === "\" feed") {
			return substr($title, strlen($word1), - strlen($word3));
		}
	} else {
		return $title;
	}
}

?>

<html>
<head>
	<link type="text/css" rel="stylesheet" href="config.css"/>
	<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
	<title>FreshPatents Visual Explorer</title>
</head>
<body>
        <center>
	<div style="width:700px;font-family:helvetica,sans-serif,arial;padding:20px;">
	    <table style="width:96%;  margin-left: 2%; margin-right: 2%">
	      <tr>
	        <td align=left>
	          <a href="http://www.infomous.com"><img src="http://www.infomous.com/site/logos/logo_on_white.jpg" height="50"></a>
	        </td>
	        <td algin=right>
	          <a href="http://www.freshpatents.com/"><img src="http://www.infomous.com/site/mockups/FreshPatents/freshpatents.png" height="50"></a>
	        </td>
	      </tr>
	    </table>
	    <h3 >The FreshPatents Visual Explorer by <em>Infomous</em></h3>
	    	<span style="padding: 10px;">Enter keywords: 
	    		<input type="text" name="pg" size="50" id="search_term" onkeypress="searchKeyPress(event);">
	    		<input type="button" id="btnSearch" value="Explore" onclick="search()">
	    	</span>
	<iframe id="myframe" width="700" height="550" frameBorder="0"></iframe>
	<div id="url"></div>  
	</div>
	<script>
		var fullpath = "";
		var path = "";
		
		// search patents with given keyword from FreshPatents and store information in RSS feed
		function search() {
			var term = document.getElementById("search_term").value;
			var num = Math.floor(Math.random() * 10000000) + 1; // random number to avoid duplicate
			callAjaxAddition(term, num);
			fullpath = 'http://www.infomous.com/site/mockups/FreshPatents/xml/' + term.split(" ").join("_") + '~'+ num + ".xml";
			path = "getcloud.php?input=" + fullpath + "&title=" + term;
			//setTimeout(showcloud, 1000); // set 1 second delay
            		//setTimeout(function(){window.open(path, 'popUpWindow','height=550,width=700');showUrl(fullpath);}, 1000);
			setTimeout(function(){check(fullpath);}, 1000);
		}

		// pass data to the file itself
        function callAjaxAddition(term, num) {
            $.ajax({
               type: "POST",
               url: "index.php",
               data: {term: term, num: num},
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

	// used for checking if it's a valid rss xml file
	function check(url) {
		$.ajax({
			type: "POST",
			url: "index.php",
			data: {check: url},
			success: function(data) {
				// alert(data);
				if (data !== "yes") {
					alert("Not available. Try again!");
				} else {
					// showcloud(url);
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
        // popup a copy window
        function copy() {
            window.prompt("Copy to clipboard: Ctrl+C, Enter", fullpath);
        }
	</script>
</center>
</body>
</html>
