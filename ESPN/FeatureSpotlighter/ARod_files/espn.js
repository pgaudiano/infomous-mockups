/*******
	ESPN.com
	$Id: //vss_espneng/Projects/Design/ESPN.com/Redesign/development/scripts/espn.loader.js#11 $
	$DateTime: 2008/12/30 14:52:57 $
	$Revision: #11 $
*******/
// ADD NON-BLOCKING JS CAPABILITY


(function($) {
	var global = this;
	if(!global.ESPN) { global.ESPN = {}; }

	global.ESPN.include = function() {
		if(arguments.callee.files === undefined) { arguments.callee.files = []; }
		var i, run = false,
		_next = function() {
			var f = global.ESPN.include.files.shift();
			if($.browser.msie) {
				// would love this to be super sexy but it's just super bitchy
				document.write('<scr'+'ipt type="text/javascript" src="'+f+'"></scr'+'ipt>');
				if(global.ESPN.include.files.length > 0) { _next(); }
			} else {
				$.ajax({
					url: f,
					cache: true,
					dataType: 'script',
					timeout: 3000,
					type: 'GET',
					complete: function(d,s) {
						if(global.ESPN.include.files.length > 0) { setTimeout(_next,100); }
					}
				});
			}
		};

		for(i=0; i<arguments.length; i++) {
			if(arguments.callee.files.length === 0) { run = true; }
			if(typeof arguments[i] === "string") {
				arguments.callee.files = arguments.callee.files.concat(arguments[i].split(','));
			} else {
				arguments.callee.files = arguments.callee.files.concat(arguments[i]);
			}
		}
		if(run === true) { _next(); }

	};

})(jQuery);
