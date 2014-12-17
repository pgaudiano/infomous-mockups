//= require <jquery>
//= require "plugins/jquery.easing.1.3"
//= require "plugins/jquery.flash"
//= require "plugins/jquery.metadata"
//= require "bk/utilities"

window.onerror = function (msg, src, line) {

//    alert("line: " + line + "\nfrom: " + src + "\n detail:\n" + msg);

}


// setup namespace
var BK = BK || {};

// aran: protected bug I was found on BK Career 
var GeoCodeByIP = function (code) {
    return code;
};


// debug non-implemented links
$.fn.debug_links = function() {
  return this.each(function() {
		$(this).click(function() {
			alert("Sorry, this link is not implemented yet.");
			return false;
		});
	});
};

// WebTrends tracking for pdf and other downloadable files and outbound links
$.fn.track_file_outbound = function() {
	return this.each(function() {
	$(this).click(function() {
			try{
			    //dcsMultiTrack('DCS.dcsuri', $(this).attr("href"));
			    pageTracker._trackEvent(CulturePrefix + 'file_link', 'download', 'download/' + $(this).attr("href"));
			}
            catch(e){}
			return true;
		});
	});
};
// WebTrends tracking for video start
function track_video_start(urlPath) {
    try{
        //dcsMultiTrack('DCS.dcsuri', urlPath + '/start');
        pageTracker._trackEvent(CulturePrefix + 'video/' + document.title, 'start', urlPath);
    }
    catch(e){}
}
// WebTrends tracking for video complete
function track_video_complete(urlPath) {
    try{
        //dcsMultiTrack('DCS.dcsuri', urlPath + '/complete');
        pageTracker._trackEvent(CulturePrefix + 'video/' + document.title, 'complete', urlPath);
    }
    catch(e){}
}

// Functions applied on page load and on the inserted DOM in any XHR request,
// don't forget to scope the Selectors.
BK.onload = function() {
	var scope = scope || $(document);

	$('a[href=BK_TEST]', scope).debug_links();
	$('a[href^=http],a[href$=3g2],a[href$=3gp],a[href$=asf],a[href$=asx],a[href$=mkv],a[href$=qt],a[href$=rm],a[href$=swf],a[href$=vob],a[href$=flv],a[href$=wmv],a[href$=mpg],a[href$=mpeg],a[href$=mp4],a[href$=avi],a[href$=mov],a[href$=pdf],a[href$=zip],a[href$=csv],a[href$=doc],a[href$=xls],a[href$=ppt],a[href$=docx],a[href$=xlsx],a[href$=pptx]', scope).track_file_outbound();
};

// Functions only applied on DOM ready, includes BK.onload.
BK.load_once = function() {
	BK.onload();

};

// Language Toggle
var timeout = 500;
var closetimer = 0;
var ltmenuitem = 0;
var checkMarkStartVal = -9;
var checkMarkDefaultVal = 15;
var checkMarkPosition;
var multipliedValue = -15;
var addedValue = 30;

function ltools_open() {
	ltools_canceltimer();
	ltools_close();
	ltmenuitem = $(this).find('ul').css('visibility', 'visible');
}

function ltools_close() {
	if (ltmenuitem) {
		ltmenuitem.css('visibility', 'hidden');
	}
}

function ltools_timer() {
	closetimer = window.setTimeout(ltools_close, timeout);
}

function ltools_canceltimer() {
	if (closetimer) {
		window.clearTimeout(closetimer);
		closetimer = null;
	}
}

document.onclick = ltools_close;

// global OnDOMReady()
$(document).ready(function () {
    BK.load_once();

    if (typeof language_array == 'undefined' || language_array == null) {
        $('#niLanguage').css({ 'display': 'none' });
        $('#niLanguage').next('.separator').css({ 'display': 'none' });
        $('#niShare').addClass('last');
    } else {
        var languageNode = language_array[0][0];
        var userLanguage;
        var languageURL;
        var activeLanguage;

        for (var i = 0; i < language_array.length; i++) {
            for (var j = 0; j < language_array[i].length; j++) {
                if (j == 0) {
                    userLanguage = language_array[i][j];
                } else if (j == 1) {
                    languageURL = language_array[i][j];
                } else if (j == 2) {
                    activeLanguage = language_array[i][j];
                }
            } // end inner for	

            if (activeLanguage == "inactive") {
                // for normal site
                $('#niLanguage > .navpane .languages').append('<a class="inactive_language" href="' + languageURL + '"><img src="/images/nav/selected_language.gif" width="7" height="5" class="check_mark"/>' + userLanguage + '</a>');
                $('#niLanguage > a').text(userLanguage);

                // for mobile site
                $('#niLanguage > select').append('<option value="' + languageURL + '" selected>' + userLanguage + '</option>');
            } else {
                // for normal site
                $('#niLanguage > .navpane .languages').append('<a class="active_language" href="' + languageURL + '">' + userLanguage + '</a>');

                // for mobile site
                $('#niLanguage > select').append('<option value="' + languageURL + '">' + userLanguage + '</option>');
            }
        } // end outer for

        var initialLinksPosition = (multipliedValue * language_array.length) + addedValue;
        $('#niLanguage > .navpane > .content a').css({ 'margin-top': initialLinksPosition });

        //$('#Tools .language_toggle').css({ 'display': 'block' });

        //$('#Tools > li').bind('mouseover', ltools_open);
        //$('#Tools > li').bind('mouseout', ltools_timer);
    }

    $('a.titleLink').each(function () {
        if ($('img.arrow', this).length == 0) {
            $(this).append('<img class="arrow" src="/images/nav/link_arrow.png" border=0  width=5 height=9 />');
        }
    });

    $(document).bind('ItemUrlChanged', function (e, url, title) {
        try {
            addthis.update('share', 'url', url);
            addthis.update('share', 'title', title);
        } catch (e) {
        }
    });
});

/*
//write javascript.css link
var jsCss = document.createElement('link');
jsCss.rel = 'stylesheet';
jsCss.href = '/css/javascript.css';
jsCss.type = 'text/css';
document.getElementsByTagName('head')[0].appendChild(jsCss);

//write javascript.css link
//var jsCss = document.createElement('link');
//jsCss.rel = 'stylesheet';
//jsCss.href = '/page_templates/cultures' + CulturePrefix + 'css/javascript.css';
//jsCss.type = 'text/css';
//document.getElementsByTagName('head')[0].appendChild(jsCss);

var currentURL = document.location + " ";

if ( currentURL.search('menu-nutrition') == -1 && document.all && /MSIE (5\.5|6)/.test(navigator.userAgent) &&
	document.styleSheets && document.styleSheets[0] && document.styleSheets[0].addRule) {
	try{
	    DD_belatedPNG.fix('img, h1, h2, h3, h4, h5, h6, ul, li, a, p, div, span, input, td, th, fieldset, label, dl, dd, dt');
	}catch(e){
	    var t = setTimeout(function(){DD_belatedPNG.fix('img, h1, h2, h3, h4, h5, h6, ul, li, a, p, div, span, input, td, th, fieldset, label, dl, dd, dt');},1000);
	}
} 
//Previous statement blocks pngfix on M&N full-menu, so run again against that condition.
else if ( currentURL.search('menu-nutrition') != -1 && currentURL.search('full-menu') != -1 && document.all && /MSIE (5\.5|6)/.test(navigator.userAgent) &&
	document.styleSheets && document.styleSheets[0] && document.styleSheets[0].addRule) {
	try{
	    DD_belatedPNG.fix('img, h1, h2, h3, h4, h5, h6, ul, li, a, p, div, span, input, td, th, fieldset, label, dl, dd, dt');
	}catch(e){
	    var t = setTimeout(function(){DD_belatedPNG.fix('img, h1, h2, h3, h4, h5, h6, ul, li, a, p, div, span, input, td, th, fieldset, label, dl, dd, dt');},1000);
	}
}

$('<img src="/images/nav/bkg.menubar.png" />');
$('<img src="/cms/en/us/cms_out/digital_assets/graphics/pages/bkg.btn-navtab.png" />');
*/

BK.local = BK[CultureLanguage][CultureCountry];
