<?php
/* 

   This script creates a timeline cloud, i.e., an Infomous cloud that
   has a time slider below it. Moving the time slider changes the date
   range for the cloud.

   This particular version has been modified to do a weekend timeline for USAT

*/

// Check for run-time parameters
// Look for width and height, or set reasonable defaults based host site
if (isset($_GET["width"])) $cloud_width=$_GET["width"];
if (isset($_GET["height"])) $cloud_height=$_GET["height"];
if (isset($_GET["start_date"])) $start_date=$_GET["start_date"];
if (isset($_GET["end_date"])) $end_date=$_GET["end_date"];
if (isset($_GET["time_step"])) $time_step=$_GET["time_step"];
if (isset($_GET["refresh"])) $refresh=$_GET["refresh"];

/* A trick used to force a reload of a cloud to get around caching when testing things. */
if ($refresh) {
   $refresh='&x='.mt_rand(0,100);
   }

$slider_width=floor(0.9 * $cloud_width);

print_header();

/* This function prints out the HTML header information */
function print_header() {
	 global $title, $description, $cloud_width, $cloud_height, $slider_width, $client_name;

	 print('
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns:fb="http://ogp.me/ns/fb#" xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en" dir="ltr">
<head>
<title>'.$client_name.' Weekend in Review - Infomous </title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
<link type="text/css" rel="stylesheet" media="all" href="/modules/system/defaults.css?y" />
<script type="text/javascript" src="/misc/jquery.js?y"></script>
<script type="text/javascript" src="/misc/drupal.js?y"></script>
<script type="text/javascript" src="/sites/all/themes/infomous2/scripts/analytics.js?y"></script>
<script type="text/javascript">jQuery.extend(Drupal.settings, { "basePath": "/" });</script>
<script type="text/javascript" src="http://www.infomous.com/site/scripts/shadowbox/shadowbox.js"></script>
<link type="text/css" rel="stylesheet" href="http://www.infomous.com/site/scripts/shadowbox/shadowbox.css"/>

<link type="text/css" rel="stylesheet" media="all" href="/client/lib/jquery-ui-1.8.16.custom.css" />
<script type="text/javascript" src="/client/lib/jquery-ui-1.8.16.custom.min.js"></script>
<style type="text/css" media="all">

/* Now some styling for the various elements */
#container {
	font-size:1em;
	margin-top:10px;
	margin-left:auto;
	margin-right:auto;
//	width:'.($cloud_width+2).'px;
	max-width:'.($cloud_width+2).'px;
	width:95%;
	height:85%;
	max-height:'.($cloud_height+2).'px;
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

#footer_info {
	font-size: 14px;
	font-family: helvetica,sans-serif,arial;
	color: #333333;
	margin-top: 4px;
	text-align: center;
	height: 48px;
	line-height: 22px;
}

#cloud_top {
	   height: 32px;
	   line-height: 30px;
	   background-color: #000000;
	   font-size: 14px;
	   font-family: \'Futura Today Bold\',Helvetica,Arial,sans-serif;
	   font-weight: bold;
	   text-transform: uppercase;
	   text-shadow: 0 1px 0 #000;
	   color: #ffffff;
	   padding: 1px 14px;
}

.day_label {
	   height: 20px;
//	   border: 1px solid blue;
   	   width: 100px;
//	   line-height: 30px;
//	   background-color: #dddddd;
	   font-size: 14px;
	   font-family: \'Futura Today Bold\',Helvetica,Arial,sans-serif;
	   font-weight: bold;
	   color: #000000;
	   text-transform: uppercase;
	   align: center;
	   padding: 1px 4px 1px 4px;
//	   text-shadow: 0 1px 0 #000;
	   text-decoration: none;
}

.day_label:hover {
           background-color: #9999ff;
}

#day_sat:hover {
           background-color: #9999ff;
}

#day_sun:hover {
           background-color: #9999ff;

}

#sb-body,#sb-loading{background-color:#ffffff;}

</style>

<script>
	Shadowbox.init({
	handleOversize: "resize"
	});
	var switchday;
	var ww=window.innerWidth;
	var wh=window.innerHeight-80;
	var sWidth = (ww > 450) ? 400 : 0.85*ww;
	var mWords = (ww > 450) ? 40 : 30;

	$(window).bind("load", function() {
	if (ww > 580) {
	   document.getElementById("frame_title_left").innerHTML="The Time Machine: Explore Weekend Stories";
	   document.getElementById("frame_title_right").innerHTML="Click any word to explore<br>related weekend stories";
	   } else {
	   document.getElementById("frame_title_left").innerHTML="Explore Weekend Stories";
	   document.getElementById("frame_title_right").innerHTML="Click words<br>to explore";
	   }
	   });

</script>

</head>
<body>
');

}
/* End of print_header() */

?>

<!-- Now we define a number of JS variables and functions that manipulate the cloud -->
<script>
	var debug=<? print $debug; ?>; // Prints out some debug information
//	var useExternalStartDate = '<?print isset($_GET["start_date"]);?>';
//	var useExternalEndDate = '<?print isset($_GET["end_date"]);?>';
	var useExternalStartDate = '<?print isset($start_date);?>';
	var useExternalEndDate = '<?print isset($end_date);?>';
	var numSteps; // The number of steps in the time slider
	var monthNameShort = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
	var dayNameShort = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
	// These parameters are used for various conversions. Not all of them may be needed
        var oneMinInMsec = 60000;
        var oneHourInMsec = 60*oneMinInMsec;
        var oneDayInMsec = 24*oneHourInMsec;
        var oneWeekInMsec = 7*oneDayInMsec;
        var onMonthInMsec = 30*oneDayInMsec;
        var oneYearInMsec = 365*oneDayInMsec;

	/* The overall time range is defined between startDate and endDate.
	   In this particular case we set the start date to 00:00:00 of 8 days ago,
	   and the end date to 23:59:59 of yesterday (relative to today's date)
	   */

	/* Need to do a bit of magic to determine the UTC time zone offset, ensuring that
	this works regardless of daylight savings. */
	Date.prototype.stdTimezoneOffset = function() {
	    var jan = new Date(this.getFullYear(), 0, 1);
	    var jul = new Date(this.getFullYear(), 6, 1);
	    return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
	    }

	Date.prototype.dst = function() {
	       return this.getTimezoneOffset() < this.stdTimezoneOffset();
	}

        var startDate = new Date();

	// Select the start date in various possible ways
	if (useExternalStartDate) {
	var externalStartDate = '<?print $start_date;?>';
	var tempStart = externalStartDate.split("-"); // Expect the format year-month-day
	startDate.setUTCFullYear(tempStart[0]);
	startDate.setUTCMonth(tempStart[1]-1); // UTC months are 0-11
	startDate.setUTCDate(tempStart[2]);
	} else 
	{ // In this case, set the start (earliest) date to one week earlier 
	startDate.setUTCDate(startDate.getUTCDate()-7);
	}

	/****** NEED TO FIX THIS!!! ********/

	// In all cases, start the clock at 00:00:00 local time
	// Calculate offset relative to UTC time zone (where the cloud is seen)
	// And account for daylight savings
	var startUTCOffset = startDate.getTimezoneOffset()/60 + ((startDate.dst())? 0 : 1); 

	startDate.setUTCHours(startUTCOffset);
	startDate.setUTCMinutes(0);
	startDate.setUTCSeconds(0);

        var endDate = new Date();

	// The following code is short-circuited for weekends - just add one day
/* 	if (useExternalEndDate) {
	var externalEndDate = '<?print $end_date;?>';
	var tempEnd = externalEndDate.split("-"); // Expect the format year-month-day
	endDate.setUTCFullYear(tempEnd[0]);
	endDate.setUTCMonth(tempEnd[1]-1); // UTC months are 0-11
	endDate.setUTCDate(tempEnd[2]);
	endDate.setUTCHours(UTCOffset);
	} else 
*/
	{	// set the end (most recent) date to the following day (for weekend only)
//	endDate.setTime(startDate.getTime()+1*oneDayInMsec);
	endDate.setUTCFullYear(startDate.getUTCFullYear());
	endDate.setUTCMonth(startDate.getUTCMonth());
	endDate.setUTCDate(startDate.getUTCDate()+1);
	endDate.setUTCHours(10);
	}

//	alert('endDate time is '+endDate.getUTCHours());

	var endUTCOffset = endDate.getTimezoneOffset()/60 - ((endDate.dst())? 1 : 0); 

	// In all cases, end the clock at 23:59:59
	endDate.setUTCHours(23+endUTCOffset);
	endDate.setUTCMinutes(59);
	endDate.setUTCSeconds(59);

	// Now create the date labels
	console.log("Here we are, and the width is "+ww);
	if (ww > 580) {
		$( "#day_sat" ).html(dayNameShort[startDate.getDay()] + ' ' + monthNameShort[startDate.getMonth()] + ' ' + startDate.getDate() + ', ' + startDate.getFullYear());
		$( "#day_sun" ).html(dayNameShort[endDate.getDay()] + ' ' + monthNameShort[endDate.getMonth()] + ' ' + endDate.getDate() + ', ' + endDate.getFullYear());
	} else {
		$( "#day_sat" ).html(dayNameShort[startDate.getDay()] + ' ' + startDate.getMonth() + '/' + startDate.getDate());
		$( "#day_sun" ).html(dayNameShort[endDate.getDay()] + ' ' + endDate.getMonth() + '/' + endDate.getDate());
	}

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
		value: numSteps-1,
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
	if (ww > 580) {
		$( "#day_sat" ).html(dayNameShort[startDate.getDay()] + ' ' + monthNameShort[startDate.getMonth()] + ' ' + startDate.getDate() + ', ' + startDate.getFullYear());
		$( "#day_sun" ).html(dayNameShort[endDate.getDay()] + ' ' + monthNameShort[endDate.getMonth()] + ' ' + endDate.getDate() + ', ' + endDate.getFullYear());
	} else {
		$( "#day_sat" ).html(dayNameShort[startDate.getDay()] + ' ' + startDate.getMonth() + '/' + startDate.getDate());
		$( "#day_sun" ).html(dayNameShort[endDate.getDay()] + ' ' + endDate.getMonth() + '/' + endDate.getDate());
	}
	update_date( 0 );
//	update_date( slider.value() );
//	update_date_text( slider.value() );
	
	// This function is called when the slider position has been changed
	function update_date( step ) {
	selected_col = "#1dacfc";
	unselected_col = "#dddddd";
		// Calculate the "since" and "until" values - careful of offsets
                d1 = new Date(); // The initial or "since" date
                d1.setTime(startDate.getTime()+step*msecStep+startUTCOffset*oneHourInMsec);
                d2 = new Date(); // The final or "until" date
                d2.setTime(d1.getTime()+msecStep);
                if (d2>endDate) d2=endDate; // Watch for incomplete last steps.

		if (step == 0) {
		document.getElementById("day_sat").style.backgroundColor = selected_col;
		document.getElementById("day_sun").style.backgroundColor = unselected_col;
		} else {
		document.getElementById("day_sat").style.backgroundColor = unselected_col;
		document.getElementById("day_sun").style.backgroundColor = selected_col;
		}

		// Set the cloud parameters
		cloud.set_var('sinceLast', undefined); // Needed by infomous
		cloud.set_var('since', to2digits(d1.getUTCFullYear())+to2digits(d1.getMonth()+1)+to2digits(d1.getDate())+'T'+to2digits(d1.getHours())+to2digits(d1.getMinutes())+'00Z');
		cloud.set_var('until', to2digits(d2.getUTCFullYear())+to2digits(d2.getMonth()+1)+to2digits(d2.getDate())+'T'+to2digits(d2.getHours())+to2digits(d2.getMinutes())+'0Z');

		// Now update the cloud
		cloud.make_request();

	} // end of function update_date()

	switchday = update_date;

	// This function is called while the slider is being moved
	function update_date_text( step ) {
		// Calculate the "since" and "until" values - careful of offsets
                d1 = new Date();
                d1.setTime(startDate.getTime()+step*msecStep+startUTCOffset*oneHourInMsec);
                d2 = new Date();
                d2.setTime(d1.getTime()+msecStep-2);
                if (d2>endDate) d2=endDate; // Watch for incomplete last step.

		/* Use any of the lines below to print a legend below the cloud showing the
		changing dates/times while the slider is being moved. */
	
		if (debug) {
			$( "#legend" ).html('<div style="text-align:center;font-weight:bold">Showing Top News for '+stepName+((stepValue==1)?' ':'s ')+(step*stepValue+1)+((stepValue==1)?'':('-'+(step*stepValue+stepValue)))+' (' + d1.toUTCString() + ' - ' + d2.toUTCString() + ')</div>');
			} else {
			$( "#legend" ).html('<div style="text-align:center;"><b>Showing Top News <?print ($client_name)?'from <em>'.$client_name.'</em> ':'';?> for ' + dayNameShort[d1.getDay()] + ', ' + d1.getDate() + ' ' + monthNameShort[d1.getMonth()] + ' ' + d1.getFullYear() + '</b><br><em>Move the green button above to view news from other days.</em></div>');
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

  <!-- Cloud top frame -->
  <div id="cloud_top">
<table width="100%">
<tr valign="middle">
<td align="left" id="frame_title_left"></td>
<td align="right" id="frame_title_right" style="font-size:10px;font-weight:normal;line-height:12px;"></td>
</tr>
</table>
  </div>

    <!-- Infomous Cloud -->
    <div id="infomousMovie" style="border-style:none; margin-top:0px; margin-bottom:10px;">
    <script type="text/javascript">
    var nid<? print $nid ?> = {
    "setFrame": 'false',
    "skinSourcesWidth" : sWidth,
    "maxWords" : mWords,
    "skinImageAutosize" : "fit",
    "skinImagePosition" : "bottom center",
    }
    </script>
      <script type="text/javascript" async data-infomous-id="nid<? print $nid ?>" src="http://<? print $infoserver;?>.infomous.com/client2/?width=100%25&height=<? print $cloud_height;?><? print $refresh;?>"></script> 
    </div> 

    <!-- container for time slider and labels -->
      <div id="slider-container">

      <!-- Date labels -->
<!--      <div id="date-labels">
      <script type="text/javascript">
	print_date_labels();
      </script>
      </div> --> <!-- End of Date Labels -->

      <!-- Date slider -->
<!--      <div style="height:15px;">
      <div id="slider" style="margin:2px auto 0px auto;width:95%;height:8px;"></div>
      </div> 
-->
<!-- End of Date slider -->

<!-- Testing new Sat/Sun labels -->
     <table width="100%">
     <tr>
     <td align="left">
     Select the day: <a id="day_sat" class="day_label" href="javascript:void(0);" onclick="switchday(0);"></a>
     <a id="day_sun" class="day_label" href="javascript:void(0);" onclick="switchday(1);"></a>
     </td>
     <td align="right" style="font-weight:normal;vertical-align:middle;">
     <a rel="shadowbox;width=700;height=370" href="help.php" style="color:#444444;text-decoration:none;"><img src="http://www.infomous.com/favicon.ico"> &nbsp;What is this? &nbsp;</a>
     </td>
     </tr>
     </table>

      </div> <!-- End of slider and labels container -->

    <!-- Container for legend, slider and date labels -->
    <!--
    <div style="margin-left:auto; margin-right:auto; position: relative;">
    -->

            <!-- Legend -->
<!--    <div id="legend" ></div> -->

    </div> <!-- End of Containter for legend, slider and date labels -->

  </div> <!-- End of Box containing the cloud, legend, slider etc. -->

  <div id="footer_info">
  <? print $footer_info; ?>
  </div>


</div> <!-- End of Container -->


</body>