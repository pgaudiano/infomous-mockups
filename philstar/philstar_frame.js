$(document).ready(function(){
	$("head").append('<link href="http://www.infomous.com/client/cloud_frame.css" type="text/css" rel="stylesheet">'
			+'<style type="text/css">'
			+'.infomous-embed-frame .infomous-embed-frame-header {background: #0E69C3 !important; background: -moz-linear-gradient(top, #0E69C3 0%, #1F70D4 100%) !important; background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#0E69C3), color-stop(100%,#1F70D4)) !important; background: -webkit-linear-gradient(top,  #0E69C3 0%,#1F70D4 100%) !important; background: -o-linear-gradient(top,  #0E69C3 0%,#1F70D4 100%) !important; background: -ms-linear-gradient(top,  #0E69C3 0%,#1F70D4 100%) !important; background: linear-gradient(to bottom,  #0E69C3 0%,#1F70D4 100%) !important; filter: progid:DXImageTransform.Microsoft.gradient( startColorstr="#0E69C3", endColorstr="#1F70D4",GradientType=0 ) !important; }'
			+'.infomous-embed-frame { border: 2px solid #0E69C3 !important; }'
			+'.infomous-embed-frame .infomous-embed-frame-elem { border: 1px solid #0E69C3 !important; }'
			+'.infomous-embed-frame .infomous-embed-frame-header { color: #FFFFFF !important; }'
			+'.infomous-embed-frame .infomous-embed-frame-header .infomous-embed-frame-header-help { color: #FFFFFF !important; }'
			+'</style>')
	
	$(".infomous-embed-frame").prepend('<div style="width: 600px;" class="infomous-embed-frame-header infomous-embed-frame-elem"><p style="" class="infomous-embed-frame-header-title">Philstar Breaking News</p><p class="infomous-embed-frame-header-help infomous-embed-frame-header-elem">CLICK WORDS<br>TO EXPLORE</p></div>');
	$(".infomous-embed-frame").append('<div style="width: 600px;" class="infomous-embed-frame-footer infomous-embed-frame-elem"></div>');
	
	$(".infomous-embed-frame-footer").append('<div class="infomous-embed-frame-footer-btn infomous-embed-frame-footer-btn-enlarge infomous-embed-frame-footer-btn-left"><p><a href="javascript:nw=window.open(\'http://www.infomous.com/cloud/fullscreen/32935?interface=viewer\', \'_blank\', \'width=770,height=500,menubar=no,toolbar=no,location=no,resizable=yes,scrollbars=no\'); void(0);" class="btn" style="background-image:url(http://www.infomous.com/client/img/frame/enlarge.png)"></a></p></div>');
	$(".infomous-embed-frame-footer").append('<div class="infomous-embed-frame-footer-btn infomous-embed-frame-footer-btn-help infomous-embed-frame-footer-btn-left"><p><a href="http://www.infomous.com/help/faq" target="_blank" class="btn" style="background-image:url(http://www.infomous.com/client/img/frame/help.png)"></a></p></div>');
	$(".infomous-embed-frame-footer").append('<div class="infomous-embed-frame-footer-btn infomous-embed-frame-footer-btn-visit infomous-embed-frame-footer-btn-right"><p><a href="http://www.infomous.com/" target="_blank" class="btn" style="background-image:url(http://www.infomous.com/client/img/frame/powered_by_infomous.png)"></a></p></div>');
});