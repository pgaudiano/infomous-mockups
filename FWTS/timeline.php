<?php
/* 

   This script creates a timeline cloud, i.e., an Infomous cloud that
   has a time slider below it. Moving the time slider changes the date
   range for the cloud.

*/

// Set some global variables and parameters
$debug=0;
$title="Infomous Twitter Time Machine";
$client_name="Fred Wilson TweetStorm";
$description="Explore Tweets with Infomous";
$nid=1417;
$infoserver='analyst2';
$cloud_width=960;
$cloud_height=600;
//$slider_width=500;

// Check for run-time parameters
// Look for width and height, or set reasonable defaults based host site
if (isset($_GET["width"])) $cloud_width=$_GET["width"];
if (isset($_GET["height"])) $cloud_height=$_GET["height"];
if (isset($_GET["start_date"])) $start_date=$_GET["start_date"];
if (isset($_GET["end_date"])) $end_date=$_GET["end_date"];
if (isset($_GET["start_time"])) $start_time=$_GET["start_time"];
if (isset($_GET["end_time"])) $end_time=$_GET["end_time"];
if (isset($_GET["time_step"])) $time_step=$_GET["time_step"];
if (isset($_GET["refresh"])) $refresh=$_GET["refresh"];

/* A trick used to force a reload of a cloud to get around caching when testing things. */
if ($refresh) {
   $refresh='&x='.mt_rand(0,100);
   }

// The overall width of the slider / labels, relative to the cloud width
$slider_width=floor(0.9 * $cloud_width);


print_header();

/* This function prints out the HTML header information */
function print_header() {
	 global $title, $description, $cloud_width, $cloud_height, $slider_width, $client_name;

	 print('
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns:fb="http://ogp.me/ns/fb#" xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en" dir="ltr">
<head>
<title>'.$client_name.' Recent Tweets - Infomous </title>
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
body {
     margin: 0;
}

#container {
	font-size:1em;
	margin-top:0px;
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
	     width:98%;
	     text-align: justify;
	     margin:0 10px 0 0;
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

#switch-day {
	font-family:Arial, Helvetica, sans-serif;
	font-weight: bold;
	font-size: 13px;
	color: blue;
	cursor: pointer;
}
.day1{
	background-position: 0px -30px;
}
.day2{
	background-position: 0px 0px;
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

#footer_info {
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
	$("#switch-day").click(function(){
		console.log("Switching date from "+dayNumber);
	     dayNumber = (dayNumber == 1) ? 0 : 1;
		
		set_dates(dayNumber);
		document.getElementById("date-labels").innerHTML="";
		update_slider();
		update_date( slider.value() );
		update_date_text( slider.value() );
	});

	var debug=<? print $debug; ?>; // Prints out some debug information
	var useExternalStartDate = '<?print isset($_GET["start_date"]);?>';
	var useExternalEndDate = '<?print isset($_GET["end_date"]);?>';
	var useExternalStartTime = '<?print isset($_GET["start_time"]);?>';
	var useExternalEndTime = '<?print isset($_GET["end_time"]);?>';
	var numSteps; // The number of steps in the time slider
	var numLabels; // The number of steps for the labels
	var monthNameShort = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
	var dayNameShort = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
//	var hourNameShort = ["12am","01am","02am","03am","04am","05am","06am","07am","08am","09am","10am","11am","12pm","01pm","02pm","03pm","04pm","05pm","06pm","07pm","08pm","09pm","10pm","11pm"];
	var hourNameShort = ["12am"," 1am"," 2am"," 3am"," 4am"," 5am"," 6am"," 7am"," 8am"," 9am","10am","11am","12pm"," 1pm"," 2pm"," 3pm"," 4pm"," 5pm"," 6pm"," 7pm"," 8pm"," 9pm","10pm","11pm"];
	// These parameters are used for various conversions. Not all of them may be needed
        var oneMinInMsec = 60000;
        var oneHourInMsec = 60*oneMinInMsec;
        var oneDayInMsec = 24*oneHourInMsec;
        var oneWeekInMsec = 7*oneDayInMsec;
        var onMonthInMsec = 30*oneDayInMsec;
        var oneYearInMsec = 365*oneDayInMsec;
	var dayNumber = 0;
	var useLocalUTCOffset = 0;

	/* Specify custom start and end dates, and number of days, for each event */
	var eventDates = [
	{"year": 2014, "month": 6, "day": 28, "startHour": 08, "startMinute": 30, "endHour": 23, "endMinute": 59},
	];

	/* The overall time range is defined between startDate and endDate.  */
        var startDate = new Date();
        var endDate = new Date();

	// Set the UTC time zone offset, either relative to the viewer's time, or to a fixed zone
	if (useLocalUTCOffset) {
		var UTCOffset = startDate.getTimezoneOffset()/60; // Convert to hours
	} else {
		var UTCOffset = 4; // Set this to the timezone of the event.
	}

	// Here we specify the step size and calculate the require number of steps
	var step = "30m";
	var msecStep;
	var stepUnit = step.slice(-1);
	var stepValue = parseInt(step);

	// Depending on the step size, set different variables
	switch(stepUnit) {
	  case 'm':
	    stepName = 'minute';
	    msecStep = stepValue*oneMinInMsec;
	    stepsPerLabel = 60/stepValue;
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

	// Set the initial date range
	set_dates(0);	

// This function sets and updates the date range depending on which event day
function set_dates(myDay) {
	// In this case, set the start (earliest) date to one week earlier 
	startDate.setUTCFullYear(eventDates[myDay].year);
	startDate.setUTCMonth(eventDates[myDay].month-1); // UTC months are 0-11
	startDate.setUTCDate(eventDates[myDay].day);

	// Now select start time.
	startDate.setUTCHours(eventDates[myDay].startHour+UTCOffset);
	startDate.setUTCMinutes(eventDates[myDay].startMinute);
	startDate.setUTCSeconds(0);

	// Now set the end date.
	endDate.setUTCFullYear(eventDates[myDay].year);
	endDate.setUTCMonth(eventDates[myDay].month-1); // UTC months are 0-11
	endDate.setUTCDate(eventDates[myDay].day);

	// Now select end time.
	endDate.setUTCHours(eventDates[myDay].endHour+UTCOffset);
	endDate.setUTCMinutes(eventDates[myDay].endMinute);
	endDate.setUTCSeconds(59);

	// Now figure out the number of steps in the range
	numSteps = Math.ceil((endDate-startDate)/msecStep);
};

	function update_slider() {
		$( "#slider" ).slider( "option", {
			"min": 0,
			"max": numSteps-1,
			"value": 0
		} );
		update_labels();
	}

function switch_day() {

	console.log("Switching date from "+dayNumber);
	dayNumber = (dayNumber == 1) ? 0 : 1;
	
	set_dates(dayNumber);
	document.getElementById("date-labels").innerHTML="";
	update_slider();
	update_date( slider.value() );
	update_date_text( slider.value() );
}

// This function generates dynamic labels for the time slider
function update_labels () {

	  // Loop through the steps
	  for (var i=0; i<numSteps/stepsPerLabel; i++) {
	  var tickDiv = document.createElement("div"); // Each time tick gets its own label
	  tickDiv.textContent = hourNameShort[(startDate.getUTCHours()+i-UTCOffset)%24];
          document.getElementById("date-labels").appendChild(tickDiv);

	  // Need this for auto-spacing to work
	  var t = document.createTextNode("\n"); 
          document.getElementById("date-labels").appendChild(t);
	  }
}

var cloud; 
var slider;

/* Core Infomous function */
function infomous_ready(I) {

	cloud = I.clouds.get();

	// Create a jquery slider
	slider = $( "#slider" ).slider({
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
	update_labels();

} // End of infomous_ready()

// This function is called when the slider position has been changed
function update_date( step ) {
		// Calculate the "since" and "until" values - careful of offsets
                d1 = new Date(); // The initial or "since" date
//                d1.setTime(startDate.getTime()+step*msecStep+UTCOffset*oneHourInMsec);
                d1.setTime(startDate.getTime()+step*msecStep+UTCOffset*oneHourInMsec);
                d2 = new Date(); // The final or "until" date
                d2.setTime(d1.getTime()+msecStep);
//                if (d2>endDate) d2=endDate; // Watch for incomplete last steps.

		// Set the cloud parameters
		cloud.set_var('sinceLast', undefined); // Needed by infomous
		cloud.set_var('since', to2digits(d1.getUTCFullYear())+to2digits(d1.getMonth()+1)+to2digits(d1.getDate())+'T'+to2digits(d1.getHours())+to2digits(d1.getMinutes())+'00Z');
		cloud.set_var('until', to2digits(d2.getUTCFullYear())+to2digits(d2.getMonth()+1)+to2digits(d2.getDate())+'T'+to2digits(d2.getHours())+to2digits(d2.getMinutes())+'00Z');

		// Now update the cloud
		cloud.make_request();
} // end of function update_date()

// This function is called while the slider is being moved
function update_date_text( step ) {
		// Calculate the "since" and "until" values - careful of offsets
                d1 = new Date();
//                d1.setTime(startDate.getTime()+step*msecStep+UTCOffset*oneHourInMsec);
                d1.setTime(startDate.getTime()+step*msecStep+UTCOffset*oneHourInMsec);
		dd1 = new Date();
		dd1.setTime(startDate.getTime()+step*msecStep);
                d2 = new Date();
                d2.setTime(d1.getTime()+msecStep-2);
//                if (d2>endDate) d2=endDate; // Watch for incomplete last step.
		dd2 = new Date();
                dd2.setTime(dd1.getTime()+msecStep-2);


		/* Use any of the lines below to print a legend below the cloud showing the
		changing dates/times while the slider is being moved. */
	
		if (debug) {
			$( "#legend" ).html('<div style="text-align:center;font-weight:bold">Explore Tweets for '+stepName+((stepValue==1)?' ':'s ')+(step*stepValue+1)+((stepValue==1)?'':('-'+(step*stepValue+stepValue)))+' (' + d1.toUTCString() + ' - ' + d2.toUTCString() + ')</div>');
			} else {
/*			$( "#legend" ).html('<div style="text-align:center;"><b>Explore Tweets <?print ($client_name)?'from <em>'.$client_name.'</em> ':'';?> for ' + dayNameShort[d1.getDay()] + ', ' + d1.getDate() + ' ' + monthNameShort[d1.getMonth()] + ' ' + d1.getFullYear() + ' ' + to2digits(d1.getHours()-UTCOffset) + ':' + to2digits(d1.getMinutes()) + '-' + to2digits(d2.getHours()-UTCOffset) + ':' + to2digits(d2.getMinutes()) + ((eventDates.length > 1) ? ' <a href="javascript:void(0);" onclick="switch_day()">[Switch to Day '+((dayNumber)?1:2)+']</a>' : '') + '</b><br><em>Move the green button above to view tweets in different 30-minute increments.</em></div>');
*/
			$( "#legend" ).html('<div style="text-align:center;"><b>Explore Tweets <?print ($client_name)?'from <em>'.$client_name.'</em> ':'';?> for ' + dayNameShort[dd1.getDay()] + ', ' + dd1.getDate() + ' ' + monthNameShort[dd1.getMonth()] + ' ' + dd1.getFullYear() + ' ' + to2digits(dd1.getHours()-UTCOffset) + ':' + to2digits(dd1.getMinutes()) + '-' + to2digits(dd2.getHours()-UTCOffset) + ':' + to2digits(dd2.getMinutes()) + ((eventDates.length > 1) ? ' <a href="javascript:void(0);" onclick="switch_day()">[Switch to Day '+((dayNumber)?1:2)+']</a>' : '') + '</b><br><em>Move the green button above to view tweets in different 30-minute increments.</em></div>');
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
      "title" : 'The Infomous Time Machine: Explore tweets <?print ($client_name)?'from '.$client_name:'';?>, June 25 2014', // Need to fix this to come from the eventDates[].
	  "loadAtStart": false,
	  <? print $nidvars ?> // The calling script can add some nid vars here.
    }
    </script>
      <script type="text/javascript" async data-infomous-id="nid<? print $nid ?>" src="http://<? print $infoserver;?>.infomous.com/client2/?width=<? print $cloud_width;?>&height=<? print $cloud_height;?><? print $refresh;?>"></script> 
    </div> 

    <!-- container for time slider and labels -->
      <div id="slider-container">

      <!-- Date labels -->
      <div id="date-labels">
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

  </div> <!-- End of Box containing the cloud, legend, slider etc. -->

  <div id="footer_info">
  <? print $footer_info; ?>
  </div>


</div> <!-- End of Container -->


</body>
