<?php
require_once('simple_html_dom.php');

// used for lucky search
if (isset($_POST['term'])) {
    $kw = $_POST['term'];
    $kw = implode("+", explode(" ", $kw));
    $feed = "http://www.careerbuilder.com/RTQ/rss20.aspx?rssid=RSS_PD&num=100&kw=".$kw;
    echo $feed;
    exit;
}

// used for checking valid rss xml file
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

<!DOCTYPE html>
<html id="HTMLTag" xmlns="http://www.w3.org/1999/xhtml" xml:lang="en-US" lang="en-US">
<head>
    <title>
        Find Jobs on CareerBuilder.com
    </title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <link rel="stylesheet" type="text/css" href="cb.css" />
    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
    <script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?sensor=false&libraries=places&dummy=.js"></script>
</head>

<body>
    <header class="desktop-header">
        <div class="new-platform-nav">
            <div class="row">
                <div class="small-6 columns no-padding">
		  <table width=100%>
				<tr>
					<td align=left>
						<a href="http://www.infomous.com"><img src="http://www.infomous.com/site/logos/logo_on_white.jpg" height="50"></a>
					</td>
                    <td align=right>
                    <a id="_ctl1_cbLogo" title="Click to go to the CareerBuilder homepage" class="desktop-logo" href="http://www.careerbuilder.com/"></a>
                    </td>
				</tr>
			</table>
                </div>
            </div>
        </div>
    </header>
    
    <!-- Begin QuickBarV2 -->
    <div class="quickSearchBar clearfix">
        <div class="quickbar_inner css3 clearfix">
            <div class="narrowWidth clearfix">
                <a href="#" id="search-form"></a>
                <div class="searchBox quickbar_large clearfix">
                    <h1>Find Jobs</h1>
                    <div class="inputWrapper">
                        <label for="s_rawwords">Keywords
                            <span class="example">Ex. Registered Nurse or Sales</span>
                        </label>
                        <input id="s_rawwords" name="s_rawwords" maxlength="512" type="text" class="cbautocomplete-keywords" onkeypress="searchKeyPress(event);">
                    </div>
                    <div id="AutoComplete" class="inputWrapper">
                        <label for="s_freeloc">Location
                            <span class="example">Ex. Chicago, IL or 60607</span>
                        </label>
                        <input class="cbautocomplete-location placeholder" id="s_freeloc" type="text" name="s_freeloc" onkeypress="searchKeyPress(event);">
                    </div>
                    <!-- Job Categories -->
                    <div id="careersByCategory" class="inputWrapper">
                        <label for="s_jobtypes">Careers by Category</label>
                        <select id="s_jobtypes" name="s_jobtypes" value="Accounting">
                            <option value="ALL">- Select a Job Category -</option>
                            <option value="JN001">Accounting</option>
                            <option value="JN002">Admin - Clerical</option>
                            <option value="JN054">Automotive</option>
                            <option value="JN038">Banking</option>
                            <option value="JN053">Biotech</option>
                            <option value="JN019">Business Development</option>
                            <option value="JN059">Business Opportunity</option>
                            <option value="JN043">Construction</option>
                            <option value="JN020">Consultant</option>
                            <option value="JN003">Customer Service</option>
                            <option value="JN021">Design</option>
                            <option value="JN027">Distribution - Shipping</option>
                            <option value="JN031">Education</option>
                            <option value="JN004">Engineering</option>
                            <option value="JN022">Entry Level</option>
                            <option value="JN018">Executive</option>
                            <option value="JN017">Facilities</option>
                            <option value="JN005">Finance</option>
                            <option value="JN060">Franchise</option>
                            <option value="JN006">General Business</option>
                            <option value="JN051">General Labor</option>
                            <option value="JN046">Government</option>
                            <option value="JN070">Government - Federal</option>
                            <option value="JN055">Grocery</option>
                            <option value="JN023">Health Care</option>
                            <option value="JN040">Hospitality - Hotel</option>
                            <option value="JN007">Human Resources</option>
                            <option value="JN008">Information Technology</option>
                            <option value="JN056">Installation - Maint - Repair</option>
                            <option value="JN034">Insurance</option>
                            <option value="JN015">Inventory</option>
                            <option value="JN030">Legal</option>
                            <option value="JN041">Legal Admin</option>
                            <option value="JN037">Management</option>
                            <option value="JN029">Manufacturing</option>
                            <option value="JN009">Marketing</option>
                            <option value="JN047">Media - Journalism - Newspaper</option>
                            <option value="JN058">Nonprofit - Social Services</option>
                            <option value="JN050">Nurse</option>
                            <option value="JN010">Other</option>
                            <option value="JN049">Pharmaceutical</option>
                            <option value="JN024">Professional Services</option>
                            <option value="JN016">Purchasing - Procurement</option>
                            <option value="JN025">QA - Quality Control</option>
                            <option value="JN057">Real Estate</option>
                            <option value="JN026">Research</option>
                            <option value="JN035">Restaurant - Food Service</option>
                            <option value="JN033">Retail</option>
                            <option value="JN011">Sales</option>
                            <option value="JN012">Science</option>
                            <option value="JN013">Skilled Labor - Trades</option>
                            <option value="JN028">Strategy - Planning</option>
                            <option value="JN014">Supply Chain</option>
                            <option value="JN048">Telecommunications</option>
                            <option value="JN032">Training</option>
                            <option value="JN044">Transportation</option>
                            <option value="JN069">Veterinary Services</option>
                            <option value="JN045">Warehouse</option>
                        </select>
                    </div>
                    <div id="searchPanel" class="inputWrapper narrowbox">
                        <input type="Submit" class="btn" id="qsbButton" value="Find Jobs" title="Find Jobs" onclick="find()">
                        <!-- link to advanced search page-->
                        <a id="_ctl6_NavBar_ucQuickBar_advSearch" title="Advanced Search" href="careerBuilder_advanced_search.php">Advanced Search</a>
                    </div>
                    <!-- </form> -->
                </div>
            </div>
        </div>
    </div>
    <center>
        <iframe id="myframe" width="1050" height="550" frameBorder="0"></iframe>
        <div id="url"></div>
    </center>
    <!-- End QuickBarV2 -->
<script>
    var path = "";
    var fullpath = "";

    // set up googlemaps autocomplete address suggestion
    var input = document.getElementById('s_freeloc');
    var options = {
        componentRestrictions: {
            country: 'us'
        }
    };
    new google.maps.places.Autocomplete(input, options);

    // press enter button to search term
    function searchKeyPress(e) {
        // look for window.event in case event isn't passed in
        if (typeof e == 'undefined' && window.event) { e = window.event; }
        if (e.keyCode == 13) {
                document.getElementById('qsbButton').click();
        }
            
    }

    // search jobs with given keyword from careerbuilder.com and return the dynamic url
    function find() {
        var feed = "http://www.careerbuilder.com/RTQ/rss20.aspx?rssid=RSS_PD&num=100";
         // get search keywords
        var kw = document.getElementById('s_rawwords').value; 
        kw = kw.trim().split(" ").join("+");
        // get location
        var loc = document.getElementById('s_freeloc').value; 
        // get selected job category
        var jselector = document.getElementById('s_jobtypes'); 
        var jtype = jselector.options[jselector.selectedIndex].value;
        var query = "&kw=" + kw + "&cat=" + jtype;
        // if user inputs a zip code as location
        if (!isNaN(loc)) {
            query = query + "&city=" + loc;
        } else {
            // if not a zip code, if should be city, state
            var loca = loc.split(",");
            var city = loca[0].trim().split(" ").join("+");
            var state = loca[1].trim().split(" ").join("+");
            query = query + "&city=" + city + "&state=" + state;
        }
        feed = feed.concat(query);
        path = "getcloud.php?input=" + encodeURIComponent(feed) + "&title=" + kw;
        check(feed);
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
                        showUrl(url);
                }
            }
        });
    }

    // used for showing the rss xml file's url
    function showUrl(url) {
        fullpath = url;
        document.getElementById('url').innerHTML='<pre><p>' + url + ' <button onclick="copy()"><b>Copy To Clipboard</b></button></p></pre>';
    }
    
    // used for poping up a dialog and copying the url 
    function copy() {
        window.prompt("Copy to clipboard: Ctrl+C, Enter", fullpath);
    }
</script>
</body>
</html>

