<?php
require_once("simple_html_dom.php");
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
?>


<html>
<head>
	<link type="text/css" rel="stylesheet" href="config.css"/>
	<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
	<title>Lucky Explorer</title>
</head>
<body>
<center>
	<div style="width:700px;font-family:helvetica,sans-serif,arial;padding:20px;">
	    <table style="width:96%;  margin-left: 2%; margin-right: 2%">
	      <tr>
	        <td align=left>
	          <a href="http://www.infomous.com"><img src="http://www.infomous.com/site/logos/logo_on_white.jpg" height="50"></a>
	        </td>
	      </tr>
	    </table>
	    <h3 >The Lucky Explorer by <em>Infomous</em></h3>
	    <div>
	    	<input type="text" id="search_terms" placeholder="Search"><br>
	   </div>		
		<button onclick="search()">
		  <ul>
			<li>I'm Feeling Lucky</li>
	    		<li>CareerBuilder</li>
	    		<li>Indeed</li>
			<li>ShutterStock</li>
	    		<li>Youtube</li>
			<li>FreshPatents</li> 
			<li>Yummly</li>   
		  </ul>  
		</button>
	</div>
	<iframe id="myframe" width="1050" height="550" frameBorder="0"></iframe>
        <div id="url"></div>
</center>
	<script>
		// index for luckily selected explorer
		var index = 0;
		// lucky search keyword
		var keyword = "";
		// configuration for different kinds of explorers
		var types = ["CareerBuilder", "indeed", "shutterstock", "youtube", "FreshPatents", "yummly"];
		var path = ["../CareerBuilder/index.php", "../indeed/index.php", "../shutterstock/index.php", "../youtube/index.php", "../FreshPatents/index.php", "../yummly/index.php"];
		var cloudPath = ["../CareerBuilder/getcloud.php", "../indeed/getcloud.php", "../shutterstock/getcloud.php", "../youtube/getcloud.php", "../FreshPatents/getcloud.php", "../yummly/getcloud.php"];
		
		function search() {
			var kw = document.getElementById("search_terms").value;
			var num = Math.floor(Math.random() * 10000000) + 1;
			keyword = kw;
			callAjaxAddition(num);
		}

		// used for lucky search, get the index of randomly selected item
		$("button").hover(function(){
		  	var self = this;
		  	// use # of items * 30 to calculate the position. Default each item's size as 35px.
		  	// Math.random() * 3, 3 is the number of items
		  	// if add more search items, change the number.
		  	var pos = -(Math.floor(Math.random() * types.length) + 1) * 30
		  	// set 0.3 second to jump to selected item
		  	setTimeout(function(){
		  	  $(self).find("ul").css("margin-top", pos + "px");
		  	}, 100);
		  	// selected item index
		  	index = pos / -30;
		}, function(){
		  $(this).find("ul").css("margin-top", "0px");
		})

		// pass search keyword to randomly selected explorer and get the rss feed url backr
		function callAjaxAddition(num) {
	$.ajax({
               	type: "POST",
               	url: path[index - 1],
               	data: {term: keyword, num: num},
               	success: function(data) {
		       // select shutterstock, write rss feed to file, check url
                       if (index == 2 || index == 3 || index == 5 || index == 6) {
			    var filename = keyword.split(" ").join("_") + "~" + num + ".xml";
			    data = "http://www.infomous.com/site/mockups/" + types[index - 1] +"/xml/" + filename;
			}     
			check(data);
              	}
            });
        }

		function check(url) {
			$.ajax({
				type: "POST",
				url: "index.php",
				data: {check: url},
				success: function(data) {
					if (data !== "yes") {
						alert("Not available. Try again!");
					} else {
				             	var fullpath = cloudPath[index - 1] + "?input=" + encodeURIComponent(url) + "&title=" + keyword;
					        //window.open(fullpath,'popUpWindow','height=550,width=700'); // show cloud
					        document.getElementById("myframe").src = fullpath; 
					}
				}
			});
		}
	</script>
</body>
</html>
