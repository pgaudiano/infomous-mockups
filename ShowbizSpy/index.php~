<?php 

/* 

   This script creates a timeline cloud, i.e., an Infomous cloud that
   has a time slider below it. Moving the time slider changes the date
   range for the cloud.

*/

// Set some global variables and parameters
$debug=0;
$title="Infomous Time Machine";
$client_name="indianexpress.com";
$url="http://www.infomous.com/site/mockups/indianexpress/timemachine/";
$description="Explore Last Week's News with Infomous";
$nid=48613;
$infoserver='www';
$cloud_width=740;
$cloud_height=450;
$slider_width=floor(0.8 * $cloud_width);
//$slider_width=500;

print_header();

/* This function prints out the HTML header information */
function print_header() {
	 global $title, $url, $description, $cloud_width, $cloud_height, $slider_width, $client_name;

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

#date-labels {
	     width:100%;
	     text-align: justify;
	     margin:0 auto;
             font-size: 10pt;
             font-family: helvetica,sans-serif,arial;
             font-weight: bold;
             height: 1em;
}

#date-labels div {
	   display: inline-block;
}

#date-labels:after {
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
	var numSteps; // The number of steps in the time slider
	var monthNameShort = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
	var dayNameShort = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];


	/* The overall time range is defined between startDate and endDate.
	   In this particular case we set the start date to 00:00:00 of 8 days ago,
	   and the end date to 23:59:59 of yesterday (relative to today's date)
	   */
        var startDate = new Date();
	var UTCOffset = startDate.getTimezoneOffset()/60; // Offset relative to UTC time zone (where the cloud is seen)

	// set the start (earliest) date to one week earlier
	startDate.setUTCDate(startDate.getUTCDate()-7);
	startDate.setUTCHours(UTCOffset);
	startDate.setUTCMinutes(0);
	startDate.setUTCSeconds(0);

        var endDate = new Date();
	// set the end (most recent) date to yesterday at 00:00
	endDate.setUTCDate(endDate.getUTCDate()-1);
	endDate.setUTCHours(23+UTCOffset);
	endDate.setUTCMinutes(59);
	endDate.setUTCSeconds(59);

	// These parameters are used for various conversions. Not all of them may be needed
        var oneMinInMsec = 60000;
        var oneHourInMsec = 60*oneMinInMsec;
        var oneDayInMsec = 24*oneHourInMsec;
        var oneWeekInMsec = 7*oneDayInMsec;
        var onMonthInMsec = 30*oneDayInMsec;
        var oneYearInMsec = 365*oneDayInMsec;

	// Here we specify the step size and calculate the require number of steps
	var step = "1d";
	var msecStep;
	var stepUnit = step.slice(-1);
	var stepValue = parseInt(step);

	// Depending on the step size, set different variables
	switch(stepUnit) {
	  case 'm':
	    stepName = 'minute';
	    msecStep = stepValue*oneMinInMsec;
	    break;
	  case 'h':
	    stepName = 'hour';
	    msecStep = stepValue*oneHourInMsec;
	    break;
	  case 'd':
            stepName = 'day';
	    msecStep = stepValue*oneDayInMsec;
	    break;
	  case 'w':
            stepName = 'week';
	    msecStep = stepValue*oneWeekInMsec;
	    break;
	  case 'M':
            stepName = 'month';
	    msecStep = stepValue*oneMonthInMsec;
	    break;
	  case 'Y':
            stepName = 'year';
	    msecStep = stepValue*oneYearInMsec;
	    break;
	  default:
	    msecStep = stepValue*oneWeekInMsec;
	    }

	numSteps = Math.ceil((endDate-startDate)/msecStep);

/* Core Infomous function */
function infomous_ready(I) {

	var cloud = I.clouds.get();

	// Create a jquery slider
	var slider = $( "#slider" ).slider({
		value: 0,
		min: 0,
		max: numSteps-1, 
		slide: function( e, ui ) {
			update_date_text( ui.value );
		},
		change: function( e, ui ) {
			update_date( ui.value );  
		}
	}).data('slider');

	// Let's initialize the slider
	update_date( slider.value() );
	update_date_text( slider.value() );
	
	// This function is called when the slider position has been changed
	function update_date( step ) {
		// Calculate the "since" and "until" values - careful of offsets
                d1 = new Date(); // The initial or "since" date
                d1.setTime(startDate.getTime()+step*msecStep+UTCOffset*oneHourInMsec);
                d2 = new Date(); // The final or "until" date
                d2.setTime(d1.getTime()+msecStep);
                if (d2>endDate) d2=endDate; // Watch for incomplete last steps.

		// Set the cloud parameters
		cloud.set_var('sinceLast', undefined); // Needed by infomous
		cloud.set_var('since', to2digits(d1.getUTCFullYear())+to2digits(d1.getMonth()+1)+to2digits(d1.getDate())+'T'+to2digits(d1.getHours())+to2digits(d1.getMinutes())+'00Z');
		cloud.set_var('until', to2digits(d2.getUTCFullYear())+to2digits(d2.getMonth()+1)+to2digits(d2.getDate())+'T'+to2digits(d2.getHours())+to2digits(d2.getMinutes())+'0Z');

		// Now update the cloud
		cloud.make_request();
	} // end of function update_date()

	// This function is called while the slider is being moved
	function update_date_text( step ) {
		// Calculate the "since" and "until" values - careful of offsets
                d1 = new Date();
                d1.setTime(startDate.getTime()+step*msecStep+UTCOffset*oneHourInMsec);
                d2 = new Date();
                d2.setTime(d1.getTime()+msecStep-2);
                if (d2>endDate) d2=endDate; // Watch for incomplete last step.

		/* Use any of the lines below to print a legend below the cloud showing the
		changing dates/times while the slider is being moved. */
	
		if (debug) {
			$( "#legend" ).html('<div style="text-align:center;font-weight:bold">Showing Top News from <em></em> for '+stepName+((stepValue==1)?' ':'s ')+(step*stepValue+1)+((stepValue==1)?'':('-'+(step*stepValue+stepValue)))+' (' + d1.toUTCString() + ' - ' + d2.toUTCString() + ')</div>');
			} else {
			$( "#legend" ).html('<div style="text-align:center;"><b>Showing Top News from <em><?print $client_name;?></em> for ' + dayNameShort[d1.getDay()] + ', ' + d1.getDate() + ' ' + monthNameShort[d1.getMonth()] + ' ' + d1.getFullYear() + '</b><br><em>Move the green button above to view news from other days.</em></div>');
	   	}

	} // end of function update_date_text()
	
	// This function returns a two-digit integer, e.g., 07 instead of 7.
	function to2digits(n) {
		var nstr = n.toString();
		return n < 10 && nstr.length === 1 ? '0'+n : nstr;
	}

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
function print_date_labels () {

	  // Loop through the steps
	  for (var i=0; i<numSteps; i++) {
	  var tickDiv = document.createElement("div"); // Each time tick gets its own label
	  tickDiv.textContent = dayNameShort[(startDate.getUTCDay()+i)%7];
//	  tickDiv.textContent += ', '+(startDate.getUTCDate()+i)+' '+monthNameShort[startDate.getUTCMonth()];
          document.getElementById("date-labels").appendChild(tickDiv);

	  // Need this for auto-spacing to work
	  var t = document.createTextNode("\n"); 
          document.getElementById("date-labels").appendChild(t);
	  }
}

</script>

<!-- Now we are back in the HTML body and we start building the page -->

<!-- Overall container for the entire body -->
<div id="container">

<!-- Prints a debugging message -->
<div id="debug"> </div>
<script>
	(!debug || $( "#debug" ).html('There are ' + numSteps + ' ' + stepValue + '-' + stepName + ' steps of ' + msecStep + 'msec each between ' + startDate.toUTCString() + ' and ' + endDate.toUTCString() + '<p>'));
</script>


  <!-- Box containing the cloud, legend, slider etc. -->
  <div style="border: 1px solid #333333; margin-top:5px;">

    <!-- Infomous Cloud -->
    <div id="infomousMovie" style="border-style:none; margin-top:0px; margin-bottom:10px;">
    <script type="text/javascript">
    var nid<? print $nid ?> = {
//    "setFrame": 'false',
//    "colFrame": '0xef5b32',
      "title" : 'The Time Machine: Explore the past week of news from <?print $client_name;?>',
    }
    </script>
      <script type="text/javascript" async data-infomous-id="nid<? print $nid ?>" src="http://<? print $infoserver;?>.infomous.com/client2/?width=<? print $cloud_width;?>&height=<? print $cloud_height;?>"></script> 
    </div> 

    <!-- container for time slider and labels -->
      <div id="slider-container">

      <!-- Date labels -->
      <div id="date-labels">
      <script type="text/javascript">
	print_date_labels();
      </script>
      </div> <!-- End of Date Labels -->

      <!-- Date slider -->
      <div style="height:15px;">
      <div id="slider" style="margin:2px auto 0px auto;width:95%;height:8px;"></div>
      </div> <!-- End of Date slider -->

      </div> <!-- End of slider and labels container -->

    <!-- Container for legend, slider and date labels -->
    <!--
    <div style="margin-left:auto; margin-right:auto; position: relative;">
    -->

            <!-- Legend -->
    <div id="legend" ></div>

    </div> <!-- End of Containter for legend, slider and date labels -->

  </div> <!-- End of Box containing the cloud, legend, slider etc. -->


</div> <!-- End of Container -->


</body>
