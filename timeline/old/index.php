<?php 

$title="USA Today: 2013 in Review - by Infomous";
$url="http://www.infomous.com/site/client/USAT/2013review/";
$description="Explore USA Today 2013 in Review with Infomous";
$nid=909;

print_header();

function print_header() {
	 global $title, $url, $description;

	 print('
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns:fb="http://ogp.me/ns/fb#" xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en" dir="ltr">
<head>
<title>USA Today: 2013 in Review | Infomous </title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta property="og:title" content="'.$title.'" />
<meta property="og:type" content="website" />
<meta property="og:url" content="'.$url.'" />
<meta property="og:site_name" content="Infomous" />
<meta property="fb:admins" content="539064017" />
<meta property="og:description" content="'.$description.'"/>
<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
<!-- <link type="text/css" rel="stylesheet" media="all" href="style.css" /> -->
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

#container {
	font-size:1em;
	margin-top:10px;
	margin-left:auto;
	margin-right:auto;
	width:952px
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

#cloud-legend {
	font-size:1em;
	font-family: helvetica,sans-serif,arial;
	color:#333333;
	margin-top:15px;
	text-align:left;
}

</style>
</head>

<body>
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

?>


<script>

/* Core Infomous function */
function infomous_ready(I) {

	var cloud = I.clouds.get();
        var startDate = new Date();
        var endDate = new Date();

        var oneMinInMsec = 60000;
        var oneHourInMsec = 60*oneMinInMsec;
        var oneDayInMsec = 24*oneHourInMsec;
        var oneWeekInMsec = 7*oneDayInMsec;
        var onMonthInMsec = 30*oneDayInMsec;
        var oneYearInMsec = 365*oneDayInMsec;

        var UTCOffset = 0; // Assumes USA Eastern Time, adjust accordingly

        startDate.setUTCFullYear(2013);
        startDate.setUTCMonth(0);
        startDate.setUTCDate(1);
        startDate.setUTCHours(0);
        startDate.setUTCMinutes(0);
        startDate.setUTCSeconds(0);
        startDate.setUTCMilliseconds(1);

        endDate.setUTCFullYear(2013);
        endDate.setUTCMonth(11);
        endDate.setUTCDate(31);
        endDate.setUTCHours(23);
        endDate.setUTCMinutes(59);
        endDate.setUTCSeconds(59);
        endDate.setUTCMilliseconds(999);

	var step = "3d";
	var msecStep;
	var stepUnit = step.slice(-1);
	var stepValue = parseInt(step);

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

	var numSteps = Math.ceil((endDate-startDate)/msecStep);

	var debug=1;

	(!debug || $( "#debug" ).html('There are ' + numSteps + ' ' + stepValue + '-' + stepName + ' steps of ' + msecStep + 'msec each between ' + startDate.toUTCString() + ' and ' + endDate.toUTCString() + '<p>'));

	var slider = $( "#slider" ).slider({
		value: 23,
		min: 0,
		max: numSteps-1, 
		slide: function( e, ui ) {
			update_date_text( ui.value );
		},
		change: function( e, ui ) {
			update_date( ui.value );  
		}
	}).data('slider');

	update_date( slider.value() );
	update_date_text( slider.value() );
	
	function update_date( step ) {
                d1 = new Date();
                d1.setTime(startDate.getTime()+step*msecStep+UTCOffset*oneHourInMsec);
                d2 = new Date();
                d2.setTime(d1.getTime()+msecStep+UTCOffset*oneHourInMsec-2);
                if (d2>endDate) { // Watch for incomplete last step.
                  d2=endDate;
                }
		cloud.set_var('sinceLast', undefined);
		cloud.set_var('since', '2013'+to2digits(d1.getMonth()+1)+to2digits(d1.getDate())+'T000000Z');
		cloud.set_var('until', '2013'+to2digits(d2.getMonth()+1)+to2digits(d2.getDate())+'T000000Z');
		cloud.make_request();
	}

	function update_date_text( step ) {
                d1 = new Date();
                d1.setTime(startDate.getTime()+step*msecStep+UTCOffset*oneHourInMsec);
                d2 = new Date();
                d2.setTime(d1.getTime()+msecStep+UTCOffset*oneHourInMsec-2);
                if (d2>endDate) { // Watch for incomplete last step.
                  d2=endDate;
                }

		$( "#legend" ).html('<div style="text-align:center;font-weight:bold">Showing Top News from <em>USA Today</em> for '+stepName+((stepValue==1)?' ':'s ')+(step*stepValue+1)+((stepValue==1)?'':('-'+(step*stepValue+stepValue)))+' (' + d1.toUTCString() + ' - ' + d2.toUTCString() + ')</div>');
	}
	
	function to2digits(n) {
		var nstr = n.toString();
		return n < 10 && nstr.length === 1 ? '0'+n : nstr;
	}

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

}

</script>

<!-- Overall container for the entire body -->
<div id="container">

<div id="debug" style="height:2em;"> </div>

  <!-- Box containing the cloud, legend, slider etc. -->
  <div style="border: 1px solid #333333; margin-top:5px;">

    <!-- Infomous Cloud -->
    <div id="infomousMovie" style="border-style:none; margin-top:0px; height: 510px;">
      <script type="text/javascript" async data-infomous-id="nid<? print $nid ?>" src="http://analyst2.infomous.com/client2/?width=950&height=500"></script> 
    </div> 

    <!-- Container for legend, slider and date labels -->
    <div style="width:930px; padding-top:10px; padding-bottom:20px; margin-left:auto; margin-right:auto; position: relative;">

      <!-- Legend -->
      <span id="legend">&nbsp;</span>

      <!-- Date slider -->
      <div id="slider" style="margin:15px 0px 5px 13px;width:97%;"></div>

      <div id="date-labels" style="width:1000px;margin:10px 0px 20px 20px">
	<span class="item" style="width:78px;float:left">Jan</span>
	<span class="item" style="width:78px;float:left">Feb</span>
	<span class="item" style="width:78px;float:left">Mar</span>
	<span class="item" style="width:78px;float:left">Apr</span>
	<span class="item" style="width:78px;float:left">May</span>
	<span class="item" style="width:78px;float:left">Jun</span>
	<span class="item" style="width:78px;float:left">Jul</span>
	<span class="item" style="width:78px;float:left">Aug</span>
	<span class="item" style="width:78px;float:left">Sep</span>
	<span class="item" style="width:78px;float:left">Oct</span>
	<span class="item" style="width:78px;float:left">Nov</span>
	<span class="item" style="width:78px;float:left">Dec</span>
      </div> <!-- End of Date slider -->

    </div> <!-- End of Containter for legend, slider and date labels -->

  </div> <!-- End of Box containing the cloud, legend, slider etc. -->


  <!-- Legend below the cloud -->
  <div id="cloud-legend">
    <p>This <a href="http://www.infomous.com/what_is_infomous"><em>Infomous</em></a>
      cloud shows week-by-week trending news for 2013
      from <a href="http://www.usatoday.com" target="_blank">USA
      Today</a>. Click any word to see a list of related articles from
      that week. Move the green dot in the time slider below the cloud
      to change week. If you are using a desktop you can also click
      the green dot and use the arrow keys to change week.</p>
    <p>If you have any questions or if you would like to use Infomous for your web site or for your event, please <a href="http://www.infomous.com/contact">contact us</a>.</p>

  </div>   <!-- End of Legend below the cloud -->

  <!-- Share links section -->
  <div id="share-links">
    Like this? Share it! &nbsp; &nbsp;   <a href="http://twitter.com/share" class="twitter-share-button" data-text="USA Today 2013 in Review by Infomous" data-count="none">Tweet</a><script type="text/javascript" src="http://platform.twitter.com/widgets.js"></script>
    &nbsp;

    <fb:like href="http://www.infomous.com/emc/" send="false" layout="button_count" width="45" show_faces="true"></fb:like>
    <p>
      Copyright 2007-2013 Icosystem. All rights reserved. <a href="/drupal/terms">Terms of service</a> | <a href="/drupal/privacy">Privacy policy</a> | <a href="/drupal/about">About us</a> | <a href="/drupal/contact">Feedback</a></p>
  </div><!-- End of Share links section -->


</div> <!-- End of Container -->


</body>
