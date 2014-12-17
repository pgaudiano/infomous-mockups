<?php
/* 

   Dive clouds

*/

// Set some global variables and parameters
$debug=0;
$title="Infomous News Digger";
$client_name="infomous.com";
$description="Explore News with Infomous";
$nid=49436;
$infoserver='www';
$cloud_width=740;
$cloud_height=450;
$start_depth=0;
$dive_step=20;
$num_steps=10;
$max_words=40;

// Check for run-time parameters
// Look for width and height, or set reasonable defaults based host site
if (isset($_GET["width"])) $cloud_width=$_GET["width"];
if (isset($_GET["height"])) $cloud_height=$_GET["height"];
if (isset($_GET["max_words"])) $max_words=$_GET["max_words"];
if (isset($_GET["start_depth"])) $start_depth=$_GET["start_depth"];
if (isset($_GET["dive_step"])) $dive_step=$_GET["dive_step"];
if (isset($_GET["num_steps"])) $num_steps=$_GET["num_steps"];
if (isset($_GET["nid"])) $nid=$_GET["nid"];
if (isset($_GET["server"])) $infoserver=$_GET["server"];

$slider_width=floor(0.8 * $cloud_width);

print_header();

/* This function prints out the HTML header information */
function print_header() {
	 global $title, $description, $cloud_width, $cloud_height, $slider_width, $client_name;

	 print('
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns:fb="http://ogp.me/ns/fb#" xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en" dir="ltr">
<head>
<title>'.$client_name.' News from the Past Week - Infomous </title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
<link type="text/css" rel="stylesheet" media="all" href="/modules/system/defaults.css?y" />
<script type="text/javascript" src="/misc/jquery.js?y"></script>
<script type="text/javascript" src="/misc/drupal.js?y"></script>
<script type="text/javascript" src="/sites/all/themes/infomous2/scripts/analytics.js?y"></script>
<script type="text/javascript">jQuery.extend(Drupal.settings, { "basePath": "/" });</script>

<link type="text/css" rel="stylesheet" media="all" href="/client/lib/jquery-ui-1.8.16.custom.css" />
<script type="text/javascript" src="/client/lib/jquery-ui-1.8.16.custom.min.js"></script>
<style type="text/css" media="all">
.fb_iframe_widget iframe {min-height: 21px !important;margin-top:0px;min-height:80px !important;min-width:80px;}
.fb_iframe_widget span {min-height: 21px !important;min-height:21px !important;}

/* Now some styling for the various elements */
#container {
	font-size:1em;
	margin-top:10px;
	margin-left:auto;
	margin-right:auto;
	width:'.($cloud_width+2).'px;
}

#share-links {
	margin: 15px 0;
	width:930px;
	border:1px solid #4A8019;
	font-family: helvetica,sans-serif,arial;
	font-size: 0.9em;
	padding: 10px;
	background-color:#DDDDDD;
	text-align:center;
}

#slider-container {
        width: '.$slider_width.'px;
        margin: 10px auto 0px auto;
        position: relative;
        z-index: 1;
}

#slider-labels {
	     width:100%;
	     text-align: justify;
	     margin:0 auto;
             font-size: 10pt;
             font-family: helvetica,sans-serif,arial;
             font-weight: bold;
             height: 1em;
}

#slider-labels div {
	   display: inline-block;
}

#slider-labels:after {
  content: \'\';
  width: 100%; /* Ensures there are at least 2 lines of text, so justification works */
  height: 0px;
  display: inline-block;
}

#legend {
	font-size: 14px;
	font-family: helvetica,sans-serif,arial;
	color: #333333;
	margin-top: 4px;
	text-align: center;
	height: 48px;
	line-height: 22px;
}

</style>
</head>

<body>

<!-- Facebook like stuff -->
<div id="fb-root"></div>
<script>
	(function(d, s, id) {
	  var js, fjs = d.getElementsByTagName(s)[0];
	  if (d.getElementById(id)) return;
	  js = d.createElement(s); js.id = id;
	  js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=174110932702067";
	  fjs.parentNode.insertBefore(js, fjs);
	}(document, \'script\', \'facebook-jssdk\'));
</script>
');

}
/* End of print_header() */

?>

<!-- Now we define a number of JS variables and functions that manipulate the cloud -->
<script>
	var debug=<? print $debug; ?>; // Prints out some debug information
	var numSteps = <? print $num_steps; ?>; // The number of steps in the time slider
	var diveStep = <? print $dive_step; ?>;
	var startDepth = <? print $start_depth; ?>;
	var maxWords = <? print $max_words; ?>;

/* Core Infomous function */
function infomous_ready(I) {

	var cloud = I.clouds.get();

	// Create a jquery slider
	var slider = $( "#slider" ).slider({
		value: 0,
		min: 0,
		max: numSteps-1, 
		slide: function( e, ui ) {
			update_slider_text( ui.value );
		},
		change: function( e, ui ) {
			update_slider( ui.value );  
		}
	}).data('slider');

	// Let's initialize the slider
	update_slider( slider.value() );
	update_slider_text( slider.value() );
	
	// This function is called when the slider position has been changed
	function update_slider( step ) {
		cloud.set_var('popularWordCutoff', startDepth+step*diveStep); 

		// Now update the cloud
		cloud.make_request();
	} // end of function updated_slider()

	// This function is called while the slider is being moved
	function update_slider_text( step ) {

		/* Use any of the lines below to print a legend below the cloud showing the
		changing dates/times while the slider is being moved. */
	
		$( "#legend" ).html('<div style="text-align:center;font-weight:bold">Showing words '+(startDepth+step*diveStep+1)+'-'+(maxWords+startDepth+step*diveStep)+'</div>');

	} // end of function updated_slider_text()
	
	// This function parses any URL params, if present
	function get_url_params() {
		var url = window.location.href;
		var sep = '?';
		var query = url.split(sep);
		if (query.length == 1)
			return {};
		query = query[1];
		var args = query.split('&'),
		    i = args.length,
		    params = {};
		while (i--) {
			var keyval = args[i].split('=');
			params[ keyval[0] ] = keyval[1]; 
		}
		return params;
	}

} // End of infomous_ready()

// This function generates dynamic labels for the time slider
function print_slider_labels () {

	  // Loop through the steps
	  for (var i=0; i<numSteps; i++) {
	  var tickDiv = document.createElement("div"); // Each time tick gets its own label
	  tickDiv.textContent = startDepth+i*diveStep;
          document.getElementById("slider-labels").appendChild(tickDiv);

	  // Need this for auto-spacing to work
	  var t = document.createTextNode("\n"); 
          document.getElementById("slider-labels").appendChild(t);
	  }
}

</script>

<!-- Now we are back in the HTML body and we start building the page -->

<!-- Overall container for the entire body -->
<div id="container">

<!-- Prints a debugging message -->
<div id="debug"> </div>
<script>
	(!debug || $( "#debug" ).html('Debug stuff here<p>'));
</script>


  <!-- Box containing the cloud, legend, slider etc. -->
  <div style="border: 1px solid #333333; margin-top:5px;">

    <!-- Infomous Cloud -->
    <div id="infomousMovie" style="border-style:none; margin-top:0px; margin-bottom:10px;">
    <script type="text/javascript">
    var nid<? print $nid ?> = {
//    "setFrame": 'false',
//    "colFrame": '0xef5b32',
      "title" : 'The News Digger: Explore news <?print ($client_name)?'from '.$client_name:'';?>',
      "maxWords" : maxWords,
      "loadAtStart": false,
    }
    </script>
      <script type="text/javascript" async data-infomous-id="nid<? print $nid ?>" src="http://<? print $infoserver;?>.infomous.com/client2/?width=<? print $cloud_width;?>&height=<? print $cloud_height;?>"></script> 
    </div> 

    <!-- container for time slider and labels -->
      <div id="slider-container">

      <!-- Date labels -->
      <div id="slider-labels">
      <script type="text/javascript">
	print_slider_labels();
      </script>
      </div> <!-- End of Date Labels -->

      <!-- Date slider -->
      <div style="height:15px;">
      <div id="slider" style="margin:2px auto 0px auto;width:100%;height:8px;"></div>
      </div> <!-- End of Date slider -->

      </div> <!-- End of slider and labels container -->

    <!-- Container for legend, slider and date labels -->
    <!--
    <div style="margin-left:auto; margin-right:auto; position: relative;">
    -->

            <!-- Legend -->
    <div id="legend" ></div>

    </div> <!-- End of Containter for legend, slider and date labels -->

<p>
This demo shows the impact of using the <code>popularWordCutoff</code> parameter. You can pass several parameters to this script:
<ul>
<li>max_words - # of words shown in the cloud (current: <?print $max_words;?>)
<li>start_depth - how many of the top words to skip (current: <?print $start_depth;?>)
<li>dive_step - how many more words to skip as the slider is moved one notch (current: <?print $dive_step;?>)
<li>num_steps - how many steps are in the slider (current: <?print $num_steps;?>)
<li>nid - the cloud NID (current: <?print $nid;?>)
<li>server - which infomous server is used, e.g., "www" or "analyst2" or "nbcuni" (current: <?print $infoserver;?>)
<li>width - the cloud width (current: <?print $cloud_width;?>)
<li>height - the cloud height (current: <?print $cloud_height;?>)
</ul>

Parameters are appended to the URL. For example, if you want to see a cloud of 30 words at a time, where the first cloud shows words ranked 51-80, and clicking the slider one cliek then gives you words 61-90, then 71-100 and so on, up to words 141-170, use the following command:
<br>
<code>
http://www.infomous.com/site/mockups/dive/?start_depth=50&#x26;dive_step=10&#x26;num_steps=10&#x26;max_words=30

  </div> <!-- End of Box containing the cloud, legend, slider etc. -->



</div> <!-- End of Container -->


</body>
