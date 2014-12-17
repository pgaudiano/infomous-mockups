<?php
require_once('rss_generator.php');
require_once('simple_html_dom.php');

// crawl information from yummly and write to file
if (isset($_POST['term'])) {
	// avoid cache problem
	echo "<script>console.log('test');</script>";
	$term = $_POST['term'];
	$num = $_POST['num'];
	$url = "http://api.yummly.com/v1/api/recipes?";
	$id = "5e22dadb";
	$key = "a6ae49c4f9102b1a6d85d57f4d2b300b";
	// crawl info from yummly
	$data = curlInfo($term, $url, $id, $key);
	// decode json object
	$data = json_decode($data);
	$items = $data->matches;
    	// use to set ngram, 
    	$ngram = "";
    	$ngrams = array('ingr' =>'#333333', 'course' => '#E06331', 'cuisine' => '#green');
    	$array[] = $ingredients;
    	$array[] = $cuisines;
    	$array[] = $courses;
	// create channel
	$link = "http://www.infomous.com/site/mockups/yummly";
    	$description = "Explore $term from Yummly";
    	$rss = new RSS($term, $link, $description, $num);
	for ($i = 0; $i < count($items); $i++) {
		$item_id = $items[$i]->id;
		$item_name = $items[$i]->recipeName;
		$item_url = "http://www.yummly.com/recipe/".$item_id;
		$item_course = $items[$i]->attributes->course[0];
		$item_cuisine = $items[$i]->attributes->cuisine[0];
		$item_ingredients = $items[$i]->ingredients;
        	$rating = $items[$i]->rating;
        	$item_name = "<b>".$item_name."</b>\nRating: ".$rating;
        	$time = $items[$i]->totalTimeInSeconds;
        	// add cooking time
		if ($time > 0) {
            		$time = ($time / 60)."min";
            		$item_name = $item_name." -- Cooking time: ".$time;
       	 	}

		$des = "";
		// add course info
		if ($item_course != "") {
			$des = $des."Course: $item_course.";
            		$item_course = strtolower($item_course);
            		// remove duplicate
            		if (is_null($courses[$item_course])) {
                		$ngram = $ngram.$item_course.$ngrams['course']."\n";
                		$courses[$item_course] = $ngrams['course'];
            		}  
		}
		// add cuisine info
		if ($item_cuisine != "") {
			$des = $des." Cuisine: $item_cuisine.";
            		$item_cuisine = strtolower($item_cuisine);
            		// remove duplicate
            		if (is_null($cuisines[$item_cuisine])) {
                		$ngram = $ngram.$item_cuisine.$ngrams['cuisine']."\n";
                		$cuisines[$item_cuisine] = $ngrams['cuisine'];
            		}
		}
		// add ingredients info
		if (!empty($item_ingredients)) {
            		$ingr = implode(",", $item_ingredients);
            		$des = $des." Ingredients: $ingr.";
            		foreach ($item_ingredients as $in) {
                		$in = strtolower($in);
                		// remove duplicate
                		if (is_null($ingredients[$in])) {
                    			$ngram = $ngram.$in.$ngrams['ingr']."\n";
                    			$ingredients[$in] = $ngrams['ingr'];
                		}
            		}
		}
		$rss->addItem($item_name, $item_url, $des, $thumbnail);
	}
        // write ngram to file
        writeToFile($term, $num, $ngram);
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
  * Use this function to write ngram to file
  */
function writeToFile($title, $num, $ngram) {
    $title = str_replace(" ", "_", $title);
    $file = "xml/".$title."~".$num.'.ngram';
    // Open the file to get existing content
    $current = file_get_contents($file);
    // Append a new person to the file
    $current .= $ngram;
    // Write the contents back to the file
    file_put_contents($file, $current);
}

/**
  * Use this function to curl information
  */
function curlInfo($term, $url, $id, $key) {
	$terms = explode(" ", $term);
	$term = implode("+", $terms);
	$ch = curl_init(); 
	$url = $url."_app_id=".$id."&_app_key=".$key."&q=".$term."&maxResult=100";
	curl_setopt($ch, CURLOPT_URL, $url); 
	// curl_setopt($ch, CURLOPT_HEADER, 0); 
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	$data = curl_exec($ch); 
	curl_close($ch); 
	return $data;
}
?>

<html>
<head>
    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
    <title>Yummly Visual Explorer</title>
</head>
<center>
<body  style="background: url('spices.jpg');background-size: cover">
    <div style="width:90%;font-family:helvetica,sans-serif,arial;padding:20px;">
        <table style="width:96%;  margin-left: 2%; margin-right: 2%; margin-bottom: -20px;">
          <tr>
            <td align=left>
              <a href="http://www.infomous.com"><img src="http://www.infomous.com/site/logos/logo_on_white.jpg" height="50"></a>
            </td>
            <td align=right>
              <a href="http://www.yummly.com/"><img src="http://www.infomous.com/site/mockups/yummly/yummly_logo.png" height="60"></a>
            </td>         
          </tr>
        </table>
        <h3>The Yummly Visual Explorer by <em>Infomous</em></h3>
    
        <div>
            <span style="padding: 10px;">Enter keywords to discover recipes: 
	    		<input type="text" name="kw" size="50" id="search_term" onkeypress="searchKeyPress(event);">
	    		<input type="button" id="btnSearch" value="Explore" onclick="search()">
	    	</span>
        </div>
    </div>
    <div style="width:95%;height:95%;">
    <iframe id="myframe" width="100%" height="100%" frameBorder="0"></iframe>
    </div>
<!--    <div id="url"></div> -->
    <script>
    	var fullpath = "";
        var path = "";
        var num = 0;

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

	// search images with given keyword from shutterstock and store images information in RSS feed
	function search() {
			var term = document.getElementById("search_term").value;
			num = Math.floor(Math.random() * 10000000) + 1; // random number to avoid duplicate
			callAjaxAddition(term, num);
            var name = term.split(" ").join("_") + '~'+ num;
			fullpath = 'http://www.infomous.com/site/mockups/yummly/xml/' + name + ".xml";
			path = "getcloud.php?input=" + fullpath +"&title=" + term;
            // setTimeout(function(){window.open(path,'popUpWindow','height=550,width=700'); showUrl(fullpath);}, 1000);
            // setTimeout(function(){document.getElementById("myframe").src = path; showUrl(fullpath);}, 1000);
		    setTimeout(function(){check(fullpath);}, 1500);
        }
	
	// used for checking if it's a valid rss xml file
        function check(url) {
            $.ajax({
                type: "POST",
                url: "index.php",
                data: {check: url},
                success: function(data) {
                    data = data.trim();
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
        // used for ppoping up a dialog and copying the url 
        function copy() {
            window.prompt("Copy to clipboard: Ctrl+C, Enter", fullpath);
        }
    </script> 
</body>
</center>
</html>
