<?php
/**
 * Yelp API v2.0 code sample.
 *
 * This program demonstrates the capability of the Yelp API version 2.0
 * by using the Search API to query for businesses by a search term and location,
 * and the Business API to query additional information about the top result
 * from the search query.
 * 
 * Please refer to http://www.yelp.com/developers/documentation for the API documentation.
 * 
 * This program requires a PHP OAuth2 library, which is included in this branch and can be
 * found here:
 *      http://oauth.googlecode.com/svn/code/php/
 * 
 */

// Enter the path that the oauth library is in relation to the php file
require_once('OAuth.php');
// include RSS writer lib
require_once('rss_generator.php');

// Set your OAuth credentials here  
// These credentials can be obtained from the 'Manage API Access' page in the
// developers documentation (http://www.yelp.com/developers)
$CONSUMER_KEY = "ouvxrvUvnzwDHjxcwDPDDw";
$CONSUMER_SECRET = "uBy6CFFO_J6YBSinbK4UNRnWfFs";
$TOKEN = "Z3zWE0p8zkBbPnvREnAiMpkXiW4ebU7i";
$TOKEN_SECRET = "pmJr8EgsMB7yQYP_X5pL0RGW_zM";


$API_HOST = 'api.yelp.com';
$DEFAULT_TERM = 'dinner';
$DEFAULT_LOCATION = 'New York, NY';
$SEARCH_LIMIT = 20;
$SEARCH_PATH = '/v2/search/';
$BUSINESS_PATH = '/v2/business/';
$DEFAULT_MODE = 0;

/** 
 * Makes a request to the Yelp API and returns the response
 * 
 * @param    $host    The domain host of the API 
 * @param    $path    The path of the APi after the domain
 * @return   The JSON response from the request      
 */
function request($host, $path) {
    $unsigned_url = "http://" . $host . $path;

    // Token object built using the OAuth library
    $token = new OAuthToken($GLOBALS['TOKEN'], $GLOBALS['TOKEN_SECRET']);

    // Consumer object built using the OAuth library
    $consumer = new OAuthConsumer($GLOBALS['CONSUMER_KEY'], $GLOBALS['CONSUMER_SECRET']);

    // Yelp uses HMAC SHA1 encoding
    $signature_method = new OAuthSignatureMethod_HMAC_SHA1();

    $oauthrequest = OAuthRequest::from_consumer_and_token(
        $consumer, 
        $token, 
        'GET', 
        $unsigned_url
    );
    
    // Sign the request
    $oauthrequest->sign_request($signature_method, $consumer, $token);
    
    // Get the signed URL
    $signed_url = $oauthrequest->to_url();
    // Send Yelp API Call
    $ch = curl_init($signed_url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    $data = curl_exec($ch);
    curl_close($ch);
    
    return $data;
}

/**
 * Query the Search API by a search term and location 
 * 
 * @param    $term        The search term passed to the API 
 * @param    $location    The search location passed to the API 
 * @return   The JSON response from the request 
 */

function search($term, $location, $mode) {
    $url_params = array();
    $url_params['term'] = $term ? $term : $GLOBALS['DEFAULT_TERM'];
    $url_params['location'] = $location? $location : $GLOBALS['DEFAULT_LOCATION'];
    $url_params['limit'] = $GLOBALS['SEARCH_LIMIT'];
    // Sort mode: 0=Best matched (default), 1=Distance, 2=Highest Rated. 
    $url_params['sort'] = $mode ? $mode : $GLOBALS['DEFAULT_MODE'];
    $search_path = $GLOBALS['SEARCH_PATH']."?".http_build_query($url_params);
    return request($GLOBALS['API_HOST'], $search_path);
}

/**
 * Query the Business API by business_id
 * 
 * @param    $business_id    The ID of the business to query
 * @return   The JSON response from the request 
 */

function get_business($business_id) {
    $business_path = $GLOBALS['BUSINESS_PATH'].$business_id;
    return request($GLOBALS['API_HOST'], $business_path);
}

/**
 * Queries the API by the input values from the user 
 * 
 * @param    $term        The search term to query
 * @param    $location    The location of the business to query
 */
// function query_api($term, $location) {     
    
//     $response = json_decode(search($term, $location));
//     // transverse the jason results
//     for ($i = 0; $i < count($response->businesses); $i++) {
//         $business_id = $response->businesses[$i]->id;        
//         $response1 = get_business($business_id);
        
//         print sprintf("Result for business \"%s\" found:<BR>", $business_id);
        
//         $response1 = json_decode($response1);
//         echo "rating: ".$response1->rating."<BR>";
//         echo "review count: ".$response1->review_count."<BR>";
//         echo "name: ".$response1->name."<BR>";
//         echo "url: ".$response1->url."<BR>";
//         echo "image url: ".$response1->image_url."<BR>";
//         echo "des: ".$response1->snippet_text."<BR><BR>";
    
//         // echo "<BR><BR>$response<BR>";
//     }
// }

// query_api($term, $location);
if (isset($_POST["yelp"])) {
    $arr = $_POST["yelp"];
    $term = $arr[0];
    $loc = $arr[1];
    $num = $arr[2];
    $name = $arr[3];
    $mode = $arr[4];
    $link = "http://www.infomous.com/site/mockups/yelp";
    $description = "Explore $term in $loc from Yelp";
    $rss = new RSS($name, $link, $description, $num);
    $response = json_decode(search($term, $location, $mode));
    for ($i = 0; $i < count($response->businesses); $i++) {
        // get the business id
        $business_id = $response->businesses[$i]->id;  
        // get business information according to its id      
        $response1 = get_business($business_id);
        // decode the jason string
        $response1 = json_decode($response1);
        // rating
        $rate = $response1->rating;
        // total review counts
        $review = $response1->review_count;
        // business name
        $title = $response1->name;
        if ($title == null) {
		continue;
	}
        // add rating out of totoal review counts to title
	$title = $title."  - ".$rate." stars / ".$review." reviews.";
	// business page url
        $url = $response1->url;
        // thumbnail pic
        $thumbnail = $response1->image_url;
        // one review content as description
        $des = $response1->snippet_text;
        // create an item
        $rss->addItem($title, $url, $des, $thumbnail);
        // echo "<BR><BR>$response<BR>";
    }
    $rss->output();
    // echo $link."xml/".str_replace(" ", "_", $title).'~'.$num.'.xml';
    return;
}

?>

<html>
<head>
    <link type="text/css" rel="stylesheet" href="lib/bootstrap.min.css"/>
    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
    <script type="text/javascript" src="lib/shadowbox.js"></script>
    <link type="text/css" rel="stylesheet" href="lib/shadowbox.css"/>
    <title>Yelp Visual Explorer</title>
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
              <a href="http://www.yelp.com"><img src="http://t3.gstatic.com/images?q=tbn:ANd9GcTcabRgCsLGeyZsCmg7qxeamMB8Ja2aoaBQwaV2UaizMn-xTExu" height="100"></a>
            </td>         
          </tr>
        </table>
        <h3>The Yelp Visual Explorer by <em>Infomous</em></h3>
    
        <div>
            <label>Keyword: </label><input type="text" id="search_terms" value="dinner"><BR><BR>
            <label>Location: </label><input type="text" id="search_loc" value="New York, NY"><BR><BR>
            <label>Sort mode: </label>
                <select id="sort">
                    <option value="0">Best matched</option>
                    <option value="1">Distance</option>
                    <option value="2">Highest Rated</option>
                </select><BR><BR>
            <input type="button" style="width:10em;" value="Explore" onclick="search()">
        </div>
        <div id="url"></div>  
    </div>
    </div>
    <script>
        var arr = [];
        var fullpath = "";
        var name = "";
       
	Shadowbox.init({
            handleOversize: "resize"
        });
         myFeed = "http://www.infomous.com/site/mockups/yelp/def.xml"; // Feeds constructed above.
        var cloud;
        var myInfomousCloud = {  // Parameters that alter the look & feel of the cloud.
            api: "true",
            width: "650",
            height: "500",
            setFrame: "True",
            setControls: "False",
	    textOption: "TITLE_AND_DESCRIPTION",
	    dict: "NOUN|1,VERB|0,ADJECTIVE|1,ADVERB|0,NUMBER|0,OTHER|1",
	    query:sort='d',
            colFrame: "0xA72012",
            colFrameTitle: "0xffffff",
            skinBackgroundImage: "http://t3.gstatic.com/images?q=tbn:ANd9GcTcabRgCsLGeyZsCmg7qxeamMB8Ja2aoaBQwaV2UaizMn-xTExu",
            colSourcesBorder: "0xA72012",
	    hidden: "reviews,review,star,stars",
        }
        // This is the main Infomous API function
        function infomous_ready(I) {
          cloud = I.clouds.get();  // Create the cloud object
          
          cloud.set_var('feeds',myFeed);   // Set the feeds
        
          cloud.make_request();   // Update the cloud
        }
        // after changing feed, show the cloud
        function showcloud() {
            cloud.set_var('feeds',fullpath);
            cloud.make_request();
            showUrl(fullpath);
        }


	 // pass data to the file itself
        function callAjaxAddition() {
            $.ajax({
               type: "POST",
               url: "index.php",
               data: {yelp: arr},
               success: function(data) {
              }
            });
        }
        // search images with given keyword from shutterstock and store images information in RSS feed
        function search() {
            arr = [];
            var num = Math.floor(Math.random() * 10000000) + 1; // random number to avoid duplicate
            var words = document.getElementById('search_terms').value; // search keywords
            var loc = document.getElementById('search_loc').value; // location;
            var sortMode = document.getElementById('sort'); 
            var mode = sortMode.options[sortMode.selectedIndex].value;
            name = "Search " + words + " in " + loc + " from Yelp";
            name = name.split(",").join("");
	    arr.push(words);
            arr.push(loc);
            arr.push(num);
            arr.push(name);
            arr.push(mode);
            callAjaxAddition(); 
            fullpath = 'http://www.infomous.com/site/mockups/yelp/xml/' + name.split(" ").join("_") + '~'+ num + ".xml";
            setTimeout(showcloud, 8000); // set 8 second delay
            // window.open(fullpath)
            
        }
        function showUrl(url) {
            document.getElementById('url').innerHTML='<pre><p>' + url + ' <button onclick="copy()"><b>Copy To Clipboard</b></button></p></pre>';
        }
        // popup a copy window
        function copy() {
            window.prompt("Copy to clipboard: Ctrl+C, Enter", fullpath);
        }
    </script>
    <BR>
    <script type="text/javascript" async data-infomous-id="myInfomousCloud" src="http://www.infomous.com/client2/"></script>
</body>
<center>
</html>


