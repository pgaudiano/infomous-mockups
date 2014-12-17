function getParam( name ) {
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null )
    return "";
  else
    return results[1];
}

var code = 
	'<embed type="application/x-shockwave-flash" '+
	'src="http://economist.infomous.com/site/economist/infomous.swf" '+
	'id="infomous" name="infomous" bgcolor="#D9E4E6" quality="high" allowscriptaccess="always" allowFullScreen="true" wmode="opaque"'+
	'flashvars="omnitureTracking=true&amp;GA_account=UA-20995290-1&amp;loadAtStart=true&amp;groups=1&amp;fontScale=1&amp;zoom=1&amp;maxWords=50&amp;linkageThreshold=1&amp;dict=NOUN|1,VERB|1,ADJECTIVE|0,ADVERB|0,NUMBER|0,OTHER|1&amp;bottomBarControls=fontSlider,zoomSlider,wordsSlider,groups&amp;fromDaysBack='+ getParam("days") +'&amp;toDaysBack=0&amp;interfaceClass=viewer&amp;skin=economist&amp;panels=words,blobs,status,bottom,branding&amp;brandShowLogo=true&amp;brandLogoDestination=http%3A%2F%2Finfomous.com%2Fsite%2Feconomist&amp;brandLogoText=About%20Infomous%2FAppinions%20clouds" '+
	'width="595" height="550">';

document.write(code);

