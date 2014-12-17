<?php
require_once('simple_html_dom.php');
if (isset($_POST['term'])) {
    $kw = $_POST['term'];
    $kw = implode("+", explode(" ", $kw));
    $feed = "http://gdata.youtube.com/feeds/api/videos?orderby=updated&max-results=50&vq=".$kw;
    echo $feed;
    exit;
}

if (isset($_POST['check'])) {
    $url = $_POST['check'];
    // check if the url exists
    $urls = explode("|", $url);
    for ($i = 0; $i < count($urls); $i++) {
        if(simplexml_load_string(file_get_contents($urls[$i]))){
            $html = file_get_html($urls[$i]);
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
    }
    echo "no";
    exit;
}   
?>

<html>
	<head>
		<meta http-equiv='Content-type' content='text/html;charset=UTF-8' >
		<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
		<script type="text/javascript" src="lib/shadowbox.js"></script>
    	<link type="text/css" rel="stylesheet" href="lib/shadowbox.css"/>
    	<link type="text/css" rel="stylesheet" href="stylesheet.css"/>
        <style>
            #td {
                border: 1px solid black;
                border-collapse: collapse;
            }
            legend {font-weight: bold;}
        </style>
    	<title>Youtube Visual Explorer</title>
	</head>
	<body>
		<div style="width:90%;font-family:helvetica,sans-serif,arial;padding:5px;">
			<table style="width:96%;  margin-left: 2%; margin-right: 2%">
				<tr>
					<td align=left>
						<a href="http://www.infomous.com"><img src="http://www.infomous.com/site/logos/logo_on_white.jpg" height="50"></a>
					</td>
                    <td align=right>
                        <a href="https://www.youtube.com/"><img src="http://www.infomous.com/site/mockups/youtube/YouTube-logo-full_color.png" height="70"></a>
                    </td>
				</tr>
			</table>
			<h3 style="text-align:center;margin-top:-40px;">The Youtube Visual Explorer by <em>Infomous</em></h3>
			<table style="width:100%" id="td">
                <tr>
                    <td id="td" style="width:32%">
                        <legend>Explore all YouTube by keyword</legend>
                        <label>Keyword: </label><input type="text" id="kw"><BR>
                        <label>Category: </label>
                            <select id="category">
                                <option value="ALL">All</option>
                                <option value="Film">Film</option>
                                <option value="Music">Music</option>
                                <option value="Comedy">Comedy</option>
                                <option value="News">News</option>
                                <option value="Sports">Sports</option>
                                <option value="Autos">Autos</option>
                                <option value="Howto">Howto</option>
                            </select><BR>
                        <label>Options: </label>
                            <input type="checkbox" name="kw_search" value="videos" checked>Explore video
                            <input type="checkbox" name="kw_search" value="channels">Explore channel
                            <input type="checkbox" name="kw_search" value="playlists/snippets">Explore playlist<BR>
                    </td>
                    <td id="td" rowspan="2" style="width:45%">
                        <legend>Explore YouTube by username</legend>
                        <label>Username: </label><input type="text" id="name" value="NBA"><BR>
                        <label>Options: </label>
                            <input type="checkbox" name="user_search" value="uploads" checked>Explore uploaded video
                            <input type="checkbox" name="user_search" value="favorites">Explore favorite video
                            <input type="checkbox" name="user_search" value="subscriptions">Explore subscription channels<BR>
                            <input type="checkbox" name="user_search" value="newsubscriptionvideos">Explore subscription videos
                            <input type="checkbox" name="user_search" value="playlists">Explore playlist<BR>
                        <legend style="margin-top:2px">Explore user video by kewword</legend>
                        <label>Keyword: <label><input type="text" id="kw_user"><BR>
                        <label>Options: </label>
                            <input type="checkbox" name="kw_user_search" value="uploads" checked>Explore from uploaded video
                            <input type="checkbox" name="kw_user_search" value="favorites">Explore from favorite video
                            <!-- <input type="checkbox" name="kw_user_search" value="subscriptions">Explore from subscription channels -->
                            <!-- <input type="checkbox" name="kw_user_search" value="newsubscriptionvideos">Explore from subscription videos -->
                            <!-- <input type="checkbox" name="kw_user_search" value="playlists">Explore from playlist<BR> -->
                    </td>
                </tr>
                <tr>
                    <td id="td" >
                        <label class="field" for="Number">Overall number of items: </label><input type="text" id="number" value = "50"> (up to 50)<br>
                    </td>
                </tr>
            </table>
            <input type="button" value="Explore it!" style="margin-top:5px; margin-left:15%; height:100; width:100" onclick="kwSearch()">
            <input type="button" value="Explore it!" style="margin-top:5px; margin-left:35%; height:100; width:100" onclick="urSearch()">   
            <input type="button" value="Explore kw!" style="margin-top:5px; margin-left:5%; height:100; width:100" onclick="urKwSearch()"><BR>
            <div id="url">
            </div>               
	
    <script>
		Shadowbox.init({
      		handleOversize: "resize"
    	});
    	var myFeed = "http://gdata.youtube.com/feeds/videos?author=NBA&orderby=updated&max-results=50"; // Feeds constructed above.
    	var cloud;
    	var myInfomousCloud = {  // Parameters that alter the look & feel of the cloud.
    	    api: "true",
    	    width: "800",
    	    height: "500",
    	    setFrame: "True",
    	    setControls: "False",
    	    textOption: "TITLE_ONLY",
	    dict: "NOUN|1,ADVERB|0,ADJECTIVE|1,VERB|0,NUMBER|0,OTHER|1",
            query:sort='d',
    	    colFrame: "0xA82222",
    	    colFrameTitle: "0xffffff",
            skinBackgroundImage: "http://www.infomous.com/site/mockups/youtube/youtube_background.png",
            colSourcesBorder: "0xA82222",
	    hiddenSource: "http://www.infomous.com/site/blocked/english.txt",
	    skinLine1Size: "14",
	    skinLine2Size: "12",
	    skinSourcesWidth: "400",
	    skinMaxFontSize: "42",
	    skinMinFontSize: "14",
    	    title: "Explore Youtube videos with Infomous",
	}
    	// This is the main Infomous API function
    	function infomous_ready(I) {
    	  cloud = I.clouds.get();  // Create the cloud object
    	  
    	  cloud.set_var('feeds',myFeed);   // Set the feeds
    	
    	  cloud.make_request();   // Update the cloud
    	}
        // after changing feed, show the cloud
        function showcloud(feed) {
            cloud.set_var('feeds',feed);
            cloud.make_request();
            showUrl(feed);
        }
        // explore youtube by keyword
        function kwSearch() {
            var feed = "";
            // get keyword search options
            var options = document.getElementsByName("kw_search");
            for (var i = 0; i < options.length; i++) {
                if(options[i].checked) {
                    if (feed !== "") {
                        feed = feed + "|";
                    }
                    feed = feed + search(options[i].value);
                }
            }
            //showcloud(feed);
	    check(feed);
        }
        // explore youtube by username
        function urSearch() {
            var feed = "";
            // get user search options
            var options = document.getElementsByName("user_search");
            for (var i = 0; i < options.length; i++) {
                if (options[i].checked) {
                    if (feed !== "") {
                        feed = feed + "|";
                    }
                    feed = feed + show(options[i].value);
                }
            }
            //showcloud(feed);
	    check(feed);
        }

        // explore youtube by keyword
        function urKwSearch() {
            var feed = "";
            // get user kw search options
            var options = document.getElementsByName("kw_user_search");
            for (var i = 0; i < options.length; i++) {
                if (options[i].checked) {
                    if (feed !== "") {
                        feed = feed + "|";
                    }
                    feed = feed + searchKw(options[i].value);
                }
            }
            //showcloud(feed);
	    check(feed);
        }

        // show user's uploaded or favorite video, subscription channels or videos, playlist
        // http://gdata.youtube.com/feeds/api/users/NBA/uploads?orderby=updated&max-results=50
        // http://gdata.youtube.com/feeds/api/users/NBA/favorites?orderby=updated&max-results=50
        // http://gdata.youtube.com/feeds/api/users/NBA/subscriptions?orderby=updated&max-results=50
        // http://gdata.youtube.com/feeds/api/users/NBA/newsubscriptionvideos?orderby=updated&max-results=50
        // http://gdata.youtube.com/feeds/api/users/NBA/playlists?orderby=updated&max-results=50
    	function show(key) {
    		var name = document.getElementById("name").value;
    		var number = document.getElementById("number").value;
    		var feed = "http://gdata.youtube.com/feeds/api/users/" + name + "/" + key + "?";
    		feed = feed + "max-results=" + number;
            if (key !== "subscriptions" && key !== "newsubscriptionvideos") {
                feed = feed + "&orderby=updated";
            }
    		return feed;
    	}

        // search keywords in a category or not
        // search feeds -- http://gdata.youtube.com/feeds/api/videos?orderby=updated&vq=mapreduce&max-results=50
        // search in a category -- http://gdata.youtube.com/feeds/api/videos/-/Film/?vq=michel&orderby=updated&max-results=50
        // search channels -- http://gdata.youtube.com/feeds/api/channels?v=2&max-results=50&q=NBA
        function search(key) {
            var feed = "http://gdata.youtube.com/feeds/api/" + key;
            var e = document.getElementById('category');
            var kw = document.getElementById('kw').value.trim().split(" ").join("%20");
            var cat = e.options[e.selectedIndex].value;
            var number = document.getElementById("number").value;

            if (key == "videos") {
                if (cat == "ALL") {
                    // search feeds
                    // http://gdata.youtube.com/feeds/api/videos?orderby=updated&vq=mapreduce&max-results=50
                    feed = feed + "?orderby=updated&max-results=" + number + "&vq=" + kw;
                } else {
                    // search in a category
                    // http://gdata.youtube.com/feeds/api/videos/-/Film/?vq=michel%20gondry&orderby=updated&max-results=50
                    feed = feed + "/-/" + cat + "/?orderby=updated&max-results=" + number + "&vq=" + kw
                }
            } else {
                // search channels or playlists
                // http://gdata.youtube.com/feeds/api/channels?v=2&max-results=50&q=NBA
                // http://gdata.youtube.com/feeds/api/playlists/snippets?v=2&max-results=50&q=NBA
                feed = feed + "?v=2&max-results=" + number + "&q=" + kw;
            }
            return feed;
        }

        // search keywords in user's uploaded or favorite video
        // http://gdata.youtube.com/feeds/api/users/NBA/uploads?orderby=updated&vq=...
        // http://gdata.youtube.com/feeds/api/users/NBA/favorites?orderby=updated&vq=...
        // http://gdata.youtube.com/feeds/api/users/NBA/subscriptions?max-results=50&vq=...
        // http://gdata.youtube.com/feeds/api/users/NBA/newsubscriptionvideos?max-results=50&vq=...
        // http://gdata.youtube.com/feeds/api/users/NBA/playlists?orderby=updated&max-results=50&vq=...
        function searchKw(key) {
            var name = document.getElementById("name").value;
            var number = document.getElementById("number").value;
            var kw = document.getElementById('kw_user').value.trim().split(" ").join("%20");
            var feed = "http://gdata.youtube.com/feeds/api/users/" + name + "/" + key + "?";
            feed = feed + "max-results=" + number + "&vq=" + kw;
            if (key !== "subscriptions" && key !== "newsubscriptionvideos") {
                feed = feed + "&orderby=updated";
            }
            return feed;
        }
        function showUrl(feed) {
            var f = feed.split("|").join("\\n\\n");
            document.getElementById('url').innerHTML="<center><input type='button' value='Show url' onclick='copy(\"" + f + "\")'</center>";
        }
        function copy(feed) {
            alert(feed);
        }

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
                        showcloud(url);
                    }
                }
            });
        }
	</script>
    <BR><center>
	<script type="text/javascript" async data-infomous-id="myInfomousCloud" src="http://www.infomous.com/client2/"></script>
	</center>
    </body>
    <!-- test username: NBA, ESPN (no favorite video), garyferro-->
</html>
