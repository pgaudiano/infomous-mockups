<?php
require_once('simple_html_dom.php');

// used for lucky search project
if (isset($_POST['term'])) {
    $kw = $_POST['term'];
    $kw = implode("+", explode(" ", $kw));
    $feed = "http://gdata.youtube.com/feeds/api/videos?orderby=updated&max-results=50&vq=".$kw;
    echo $feed;
    exit;
}

// used for checking valid rss xml file
if (isset($_POST['check'])) {
    $url = $_POST['check'];
    // check if the url exists
    $urls = explode("|", $url);
    $feed = "";
    for ($i = 0; $i < count($urls); $i++) {
        if(simplexml_load_string(file_get_contents($urls[$i]))){
            $html = file_get_html($urls[$i]);
            $res = $html->find('item', 0); // check if <item> exists, aim at general rss
            if (!is_null($res)) {
                // echo "yes";
                // exit;
                if ($feed != "") {
                    $feed = $feed."|";
                }
                $feed = $feed.$urls[$i];
            }
            $ret = $html->find('entry', 0); // check if <entry> exists, aim at youtube rss
            if (!is_null($ret)) {
                // echo "yes";
                // exit;
                if ($feed != "") {
                    $feed = $feed."|";
                }
                $feed = $feed.$urls[$i];
            }
        }
    }
    // if exists useful url
    if ($feed != "") {
        echo $feed;
    } else {
        echo "no";
    }
    exit;
}   
?>

<html>
	<head>
		<meta http-equiv='Content-type' content='text/html;charset=UTF-8' >
		<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
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
        <center>
		<div style="width:90%;font-family:helvetica,sans-serif,arial;padding:5px;">
			<table style="width:96%;  margin-left: 2%; margin-right: 2%">
				<tr>
					<td align=left>
						<a href="http://www.infomous.com"><img src="http://www.infomous.com/site/logos/logo_on_white.jpg" height="50"></a>
					</td>
                    <td align=right>
                        <a href="https://www.youtube.com/"><img src="http://www.infomous.com/site/mockups/youtube/YouTube-logo-full_color.png" height="60"></a>
                    </td>
				</tr>
			</table>
			<h3 style="text-align:center;">Visual Exploration of YouTube Videos - by <em>Infomous</em></h3>
			<table style="width:100%" id="td">
                <tr>
                    <td id="td" style="width:32%">
                        <legend>Explore all YouTube by keyword</legend>
                        <label>Keyword: </label><input type="text" id="kw" onkeypress="searchKeyPress(event, 'btnSearch1');"><BR>
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
                        <label>Username: </label><input type="text" id="name" value="NBA" onkeypress="searchKeyPress(event, 'btnSearch2');"><BR>
                        <label>Options: </label>
                            <input type="checkbox" name="user_search" value="uploads" checked>Explore uploaded video
                            <input type="checkbox" name="user_search" value="favorites">Explore favorite video
                            <input type="checkbox" name="user_search" value="subscriptions">Explore subscription channels<BR>
                            <input type="checkbox" name="user_search" value="newsubscriptionvideos">Explore subscription videos
                            <input type="checkbox" name="user_search" value="playlists">Explore playlist<BR>
                        <legend style="margin-top:2px">Explore user video by kewword</legend>
                        <label>Keyword: <label><input type="text" id="kw_user" onkeypress="searchKeyPress(event, 'btnSearch3');"><BR>
                        <label>Options: </label>
                            <input type="checkbox" name="kw_user_search" value="uploads" checked>Explore from uploaded video
                            <input type="checkbox" name="kw_user_search" value="favorites">Explore from favorite video
                    </td>
                </tr>
                <tr>
                    <td id="td" >
                        <label class="field" for="Number">Overall number of items: </label><input type="text" id="number" value = "50"> (up to 50)<br>
                    </td>
                </tr>
            </table>
            <input type="button" value="Explore it!" id="btnSearch1" style="margin-top:5px; margin-left:15%; height:100; width:100" onclick="kwSearch()">
            <input type="button" value="Explore it!" id="btnSearch2" style="margin-top:5px; margin-left:35%; height:100; width:100" onclick="urSearch()">   
            <input type="button" value="Explore kw!" id="btnSearch3" style="margin-top:5px; margin-left:5%; height:100; width:100" onclick="urKwSearch()"><BR>
            <iframe id="myframe" width="850" height="600" frameBorder="0"></iframe>
            <div id="url"></div> 
        </div>            
	
    <script>
        var path = "";
        
        // press enter button to search term
        function searchKeyPress(e, id) {
            // look for window.event in case event isn't passed in
            if (typeof e == 'undefined' && window.event) { e = window.event; }
            if (e.keyCode == 13){
                document.getElementById(id).click();
            }
        
        }

        // explore youtube by keyword
        function kwSearch() {
            var feed = "";
            var kw = document.getElementById('kw').value.trim().split(" ").join("%20");
            var options = document.getElementsByName("kw_search");
            // get keyword search options
            for (var i = 0; i < options.length; i++) {
                if(options[i].checked) {
                    if (feed !== "") {
                        feed = feed + "|";
                    }
                    feed = feed + search(options[i].value);
                }
            }
            path = "getcloud.php?title=" + kw + "&input=";
            check(feed);
        }
        
        // explore youtube by username
        function urSearch() {
            var feed = "";
            var name = document.getElementById("name").value;
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
            path = "getcloud.php?title=" + name + "&input=";
            check(feed);
        }

        // explore user's video by keyword
        function urKwSearch() {
            var feed = "";
            var kw = document.getElementById('kw_user').value.trim().split(" ").join("%20");
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
            path = "getcloud.php?title=" + kw + "&input=";
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

        // used for showing the rss xml file's url
        function showUrl(feed) {
            var f = feed.split("|").join("\\n\\n");
            document.getElementById('url').innerHTML="<input type='button' value='Show url' onclick='copy(\"" + f + "\")'>";
        }

        // used for poping up a dialog and copying the url 
        function copy(feed) {
            alert(feed);
        }

        // used for checking if it's a valid rss xml file
        function check(url) {
            $.ajax({
                type: "POST",
                url: "index.php",
                data: {check: url},
                success: function(data) {
                    if (data === "no") {
                        alert("Not available. Try again!");
                    } else {
                        path = path + encodeURIComponent(data);
                        document.getElementById("myframe").src = path; 
                        showUrl(data);
                    }
                }
            });
        }
	</script>
    </body>
    <!-- test username: NBA, ESPN (no favorite video), garyferro-->
</html>
