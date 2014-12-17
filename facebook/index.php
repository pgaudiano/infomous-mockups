<?php
require_once('rss_generator.php');
require_once('simple_html_dom.php');

// facebook API explorer access token
$accessToken="CAACEdEose0cBAJiMvVwpGAY3ASsYSbeI865Qso3b7SDiIdVQsxbz3bwjPMtWER6jZC3in7PRak49dAeuguxJ3pZBVm1DwvKOp2uphJ5btyY4IkGgZAs1m0ZB7vxeUnXb01fLP4R3aezAEJKw4fdPu7Nctu7RVg588De425v59kBTjoBevXeYV4oqGblNS6qNWrrvB0LNA53RZCaorzXaZB";
if (isset($_POST['term'])) {
	$term = $_POST['term'];
    $type = $_POST['type'];
	$num = $_POST['num'];
	$url = "https://graph.facebook.com/search?";
	$data = curlInfo($term, $url, $accessToken, $type);
    $data = json_decode($data);
    $data = $data->data;
    
	// create channel
	$link = "http://www.infomous.com/site/mockups/facebook";
    $description = "Explore $term from Facebook";
    $rss = new RSS($term, $link, $description, $num);
	for ($i = 0; $i < count($data); $i++) {
        $item_name = $data[$i]->name;
        $item_url = $data[$i]->actions[0]->link;
        $des = $data[$i]->description;
        $thumbnail = $data[$i]->icon;
        if (is_null($item_name) || is_null($item_url) || is_null($des)) {
            continue;
        }
		$rss->addItem($item_name, $item_url, $des, $thumbnail);
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
function curlInfo($term, $url, $accessToken, $type) {
	$ch = curl_init(); 
	$url = $url."access_token=".$accessToken."&type=".$type."&q=".$term."&limit=150";
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
    <title>Facebook Visual Explorer</title>
</head>
<center>
<body>
    <div style="width:700px;font-family:helvetica,sans-serif,arial;padding:20px;">
        <table style="width:96%;  margin-left: 2%; margin-right: 2%">
          <tr>
            <td align=left>
              <a href="http://www.infomous.com"><img src="http://www.infomous.com/site/logos/logo_on_white.jpg" height="50"></a>
            </td>
            <td align=right>
              <a href="https://www.facebook.com/"><img src="http://www.infomous.com/site/mockups/facebook/fb_logo.png" height="70"></a>
            </td>         
          </tr>
        </table>
        <h3>The Facebook Visual Explorer by <em>Infomous</em></h3>
    
        <div>
            <span style="padding: 10px;">Search Term: 
	    		<input type="text" name="kw" size="30" id="search_term">
                <select id="search_type">
                    <option value="post">post</option>
                 <!--   <option value="user">user</option>
                    <option value="page">page</option>
                    <option value="event">event</option>
                    <option value="group">group</option>
                --!>
                </select>
                <br>
	    		<input type="button" value="Explore" onclick="search()">
	    	</span>
        </div>
    </div>
    <iframe id="myframe" width="700" height="550" frameBorder="0"></iframe>
    <div id="url"></div> 
    <script>
    	var fullpath = "";
        var path = "";
        var num = 0;

        // pass data to the file itself
        function callAjaxAddition(term, type, num) {
            $.ajax({
               type: "POST",
               url: "index.php",
               data: {term: term, type: type, num: num},
               success: function(data) {
              }
            });
        }

		function search() {
			var term = document.getElementById("search_term").value;
            var type = document.getElementById("search_type").value;
			num = Math.floor(Math.random() * 10000000) + 1; // random number to avoid duplicate
			callAjaxAddition(term, type, num);
            var name = term.split(" ").join("_") + '~'+ num;
			fullpath = 'http://www.infomous.com/site/mockups/facebook/xml/' + name + ".xml";
			path = "getcloud.php?input=" + fullpath +"&title=" + term;
            // setTimeout(function(){window.open(path,'popUpWindow','height=550,width=700'); showUrl(fullpath);}, 1000);
            // setTimeout(function(){document.getElementById("myframe").src = path; showUrl(fullpath);}, 1000);
		    setTimeout(function(){check(fullpath);}, 8000);
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
                        // showcloud(url);
                        document.getElementById("myframe").src = path; 
                        showUrl(fullpath);
                    }
                }
            });
        }

        function showUrl(url) {
            document.getElementById('url').innerHTML='<pre><p>' + url + ' <button onclick="copy()"><b>Copy To Clipboard</b></button></p></pre>';
        }
        // popup a copy window
        function copy() {
            window.prompt("Copy to clipboard: Ctrl+C, Enter", fullpath);
        }
    </script> 
</body>
</center>
</html>
