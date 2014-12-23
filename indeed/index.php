<?
require_once('rss_generator.php');
require_once('simple_html_dom.php');

// crawl information from indeed and write to file
if (isset($_POST['term'])) {
	$term = $_POST['term'];
	$loc = $_POST['loc'];
	$num = $_POST['num'];
	// crawl info
	$data = curlInfo($term, $loc);
	$data = json_decode($data);
	$results = $data->results;
	$link = "http://www.infomous.com/site/mockups/indeed";
    $description = "Explore ".$term." -- ".$loc." from Indeed";
    $fulltitle = "Indeed jobs: ".$term." -- ".$loc;
    $rss = new RSS($term, $link, $description, $num, $fulltitle);
	$results = $data->results;
	for ($i = 0; $i < count($results); $i++) {
		$title = $results[$i]->jobtitle;
		$company = $results[$i]->company;
		$title = $title." &#xA;   -- ".$company;
		$date = $results[$i]->date;
		$des = $results[$i]->snippet;
		$url = $results[$i]->url;
		$rss->addItem($title, $url, $des, $thumbnail, $date);
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
function curlInfo($term, $loc) {
	$ch = curl_init(); 
	$url = "http://api.indeed.com/ads/apisearch?publisher=6492435540368139&userip=1.2.3.4&v=2&format=json&limit=100";
	$loc = implode("%20", explode(" ", $loc));
	$url = $url."&q=".$term."&l=".$loc;
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
    <script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?sensor=false&libraries=places&dummy=.js"></script>
    <title>Indeed Visual Explorer</title>
<script type="text/javascript" src="http://www.infomous.com/site/scripts/shadowbox/shadowbox.js"></script>
<link type="text/css" rel="stylesheet" href="http://www.infomous.com/site/scripts/shadowbox/shadowbox.css"/>
<style>
#sb-body,#sb-loading{background-color:#ffffff;}
</style>
<script>
	Shadowbox.init({
	handleOversize: "resize"
	});
</script>

</head>
<center>
<body  style="background: url('jobs3.png');background-size: cover">
    <div style="width:90%;font-family:helvetica,sans-serif,arial;padding:20px;">
        <table style="width:96%; margin: -10px 2% -20px 2%;">
          <tr>
            <td align=left>
              <a href="http://www.infomous.com"><img src="http://www.infomous.com/site/logos/logo_on_white.jpg" height="50"></a>
            </td>
            <td align=right>
              <a href="http://www.indeed.com/"><img src="http://www.infomous.com/site/mockups/indeed/indeed_logo.png" height="60"></a>
            </td>         
          </tr>
        </table>
        <h3>The Indeed Visual Explorer by <em>Infomous</em>
<a rel="shadowbox;width=720;height=400" href="help.php" style="color:#2164F3;text-decoration:none;margin-left:20px;">[Help]</a>
</h3>
    
        <div style="margin-top:-18px;">
            <span style="padding: 0px;">Keywords: 
	    		<input type="text" name="kw" size="40" id="search_term" onkeypress="searchKeyPress(event);">
	    	</span>
	    	<span style="margin-left: 10px;padding: 0px ;">Location: 
	    		<input type="text" name="kw" size="40" id="search_loc" placeholder="city, state/province/region" >
	    	</span>
	    	<input type="button" id="btnSearch" value="Explore" onclick="search()" style="margin-top:15;width:8em;margin-left:10px;" >
        </div>
    </div>
    <iframe id="myframe" width="100%" height="100%" frameBorder="0"></iframe>
<!--     <div id="url"></div> -->
    <script>
    	var fullpath = "";
        var path = "";
        var num = 0;

        // set up googlemaps autocomplete address suggestion
        var loc = document.getElementById('search_loc');
    	var options = {
    	    componentRestrictions: {
    	        country: 'us'
    	    }
    	};
    	new google.maps.places.Autocomplete(loc, options);

        // press enter button to search term
        function searchKeyPress(e) {
            // look for window.event in case event isn't passed in
            if (typeof e == 'undefined' && window.event) { e = window.event; }
            if (e.keyCode == 13){
                document.getElementById('btnSearch').click();
            }
        
        }

	// pass data to the file itself
        function callAjaxAddition(term, loc, num) {
            $.ajax({
               type: "POST",
               url: "index.php",
               data: {term: term, loc: loc, num: num},
               success: function(data) {
		}
            });
        }

		// search job with given keyword from indeed and store job information in RSS feed
		function search() {
			var term = document.getElementById("search_term").value;
			term = term.trim();
			num = Math.floor(Math.random() * 10000000) + 1; // random number to avoid duplicate
			loc = document.getElementById("search_loc").value;
			callAjaxAddition(term, loc, num);
            var name = term.split(" ").join("_") + '~'+ num;
			fullpath = 'http://www.infomous.com/site/mockups/indeed/xml/' + name + ".xml";
			path = "getcloud.php?input=" + fullpath +"&title=" + term + " -- " + loc;
            // setTimeout(function(){document.getElementById("myframe").src = path; showUrl(fullpath);}, 1000);
		    setTimeout(function(){check(fullpath);}, 1000);
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
        // used for poping up a dialog and copying the url 
        function copy() {
            window.prompt("Copy to clipboard: Ctrl+C, Enter", fullpath);
        }
    </script> 
</body>
</center>
</html>
