
/*!
 * Infomous JS SDK
 * http://www.infomous.com/
 */

var Infomous = Infomous || {};

(function(root, window, I, undefined) {

I.log = function() {

    if (!_log_enabled || typeof console === 'undefined') 
        return;

    console.log('[infomous]', [].slice.call(arguments));

    //console.log( to_str( [].slice.call(arguments), '[infomous] ' ) );

    //function to_str(obj, str) {
        //str = str || '';
        //if ( I.is_obj(obj) || I.is_array(obj) ) {
            //for (var k in obj) {
                //var v = obj[k];
                //if ( I.is_obj(v) || I.is_array(v) ) 
                    //to_str(v, str);
                //else
                    //str += v + ' ';
            //}
        //}
        //else str += obj + ' ';
        //return str;
    //}
}

I.base_root = function() {	
    return root.base_root || (function() {
        //var url = I.get_script_url(/(?=.*embed\.js)(?=.*infomous\.com)/),
        var re = /infomous\.com/,
           url = I.get_script_url(re),
           loc = window.location;
        if (url !== null)
            return url.split('/',3).join('/')+'/';
        return re.test(loc.hostname) ?
            loc.protocol+'//'+loc.hostname+'/' : ''; //'http://infomous.com/;
    })();
}

I.base_path = function() {
    return root.base_path || (I.base_root() + 'client/');
}

/**
 * loads required js/css external files in runtime
 * @param 
 * {Array} || {String} array of dependencies or single dependency string
 * {Function} files loading complete callback
 *
 * TODO implement AMD
 */

I.define = function(name, ctor) {
    //I[name] = ctor;
    root[name] = ctor;
}

I.require = function(deps, on_complete) {

    var base_path = I.base_path();

    var deps_cfg = {	
        'jquery': {
            files: [ 
                base_path+'lib/jquery.js' 
            ],
            on_loaded: function() {
                I.$ = jQuery.noConflict();
            },
            is_loaded: function() {
                return !!I.$;
            }
        },
        'jquery-ui': {
            files: [ 'jquery-ui-1.8.16' ],
            is_loaded: function() {
                try {
                    return !!I.$.ui;
                }
                catch (err) { return false; }
            }
        },
        'jquery-ui-1.8.16': {
            files: [
                'jquery',
                base_path+'lib/jquery-ui-1.8.16.custom.css',
                base_path+'lib/jquery-ui-1.8.16.custom.min.js'
            ],
            is_loaded: function() {
                try {
                    return I.$.ui.version === '1.8.16';
                }
                catch (err) { return false; }
            }
        },
        'CloudJS': {
            files: [
                'jquery',
                base_path+'infomous.css',
                base_path+'infomous.js'
            ],
            is_loaded: function() {
                return !!root.CloudJS;
            }
        },
        'CloudToolbar': {
            files: [
                'jquery-ui',
                base_path+'cloud_gui.css',
                base_path+'cloud_gui.js'
            ],
            is_loaded: function() {
                return !!root.CloudToolbar;
            }
        },
        //TODO add CloudFrame to cloud_gui ?
        'CloudFrame': {
            files: [
                'jquery',
                //base_path+'cloud_gui.css',
                //base_path+'cloud_gui.js'
                base_path+'cloud_frame.css'
                //base_path+'cloud_frame.js' //part of the sdk core tmply
            ],
            is_loaded: function() {
                return !!root.CloudFrame;
            }
        }
        //'CloudProxy': {
            //files: [ base_path+'cloud_proxy.js' ],
            //is_loaded: function() {
                //return typeof CloudProxy !== 'undefined';
            //}
        //}
        //as a list:
        //'CloudProxy,Events': [base_path+'embed.js']
    };

    deps = I.make_array(deps);
    var i, file_seq = [], on_loaded_fns = [];

    for (i = 0; i < deps.length; i++) {
        add_dep( file_seq, deps[i] );
    }	

    function add_dep(_fseq, dep) {

        var cfg = deps_cfg[dep],
            dep_loaded = cfg && cfg.is_loaded();

        if ( !cfg )
            return;

        var j, file, 
            files = cfg.files,
            on_loaded = cfg.on_loaded;

        if ( !dep_loaded && typeof on_loaded === 'function' )
            on_loaded_fns.push(on_loaded);

        for (j = 0; j < files.length; j++) {

            file = files[j];
            
            if ( is_dep(file) ) {
                add_dep(_fseq, file);
            }
            else if ( !dep_loaded || !is_js(file) ) {
                _fseq.push( file );
            }
        }
    }

    function is_dep(key) {
        return !!deps_cfg[key];
    }

    function is_js(url) {
        return /\.js/.test(url);
    }

    I.load_files( file_seq, function() {
        var k, on_loaded;
        for (k = 0; k < on_loaded_fns.length; k++) {
            on_loaded = on_loaded_fns[k];
            if (typeof on_loaded === 'function')
                on_loaded();
        }
        if (typeof on_complete === 'function')
            on_complete();
    });
}

//TODO replace get_script_url by get_script_tag

I.get_script_url = function(re) {
    var scripts = document.getElementsByTagName('script'),
        i, el, src;
    for (i = 0; i < scripts.length; i++) {
        el = scripts[i];
        src = el.getAttribute ? el.getAttribute('src') : el.src;
        if (src && re.test(src)) 
            return src;
    }	
    return null;	
}

I.get_script_tag = function(re) {
    var scripts = document.getElementsByTagName('script'),
        i, el, src;
    for (i = 0; i < scripts.length; i++) {
        el = scripts[i];
        src = el.getAttribute ? el.getAttribute('src') : el.src;
        if (src && re.test(src)) 
            return { src: src, el: el };
    }	
    return {};
}

I.get_url_params = function(url, sep) {
    if (sep === undefined && I.is_str(url) && url.length === 1) {
        sep = url;
        url = undefined;
    }
    url = url || window.location.href;
    sep = sep || '?';
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

I.esc = function(data) {
    if ( I.is_obj(data) ) {
        var k; 
        for (k in data) 
            data[k] = _esc(data[k]);
    }
    else return _esc(data);

    function _esc(d) {
        if ( ! I.is_str(d) ) return d;
        return d.replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
        //return (''+d).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;').replace(/\//g,'&#x2F;');
        //return d ? d.replace( /[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g, "\\$&" ) : "";
    }
}

I.object = function(o) { 
    function F(){}; 
    F.prototype = o;
    return new F();
}

I.events = function(obj) {
    I.extend( obj, new Events() );
}

I.extend = function(dst, src) {
    if (src === undefined) {
        src = dst;
        dst = undefined;
    }
    dst = dst || {};
    var k; 
    for (k in src) {
        if ( src.hasOwnProperty(k) ) {
            if ( typeof src[k] === 'object' ) {
                dst[k] = I.is_array(src[k]) ? [] : {};
                I.extend( dst[k], src[k] );
            }
            //primitive or function
            else dst[k] = src[k];
        }
        //prototype prop
        else dst[k] = src[k];
    }
    return dst;
}

I.bind = function(obj, fn) { 
    return function() {
        return fn.apply( obj, [].slice.call(arguments) );
    };
}

I.is_array = function(obj) {
    return Object.prototype.toString.call(obj) === "[object Array]";
}

I.is_obj = function(obj) {
    return Object.prototype.toString.call(obj) === "[object Object]";
}

//I.is_fn = function(obj) {
//return obj !== undefined && typeof obj === 'function';
//}

I.is_str = function(obj) {
    return typeof obj === 'string';
}

I.bool = function(val) {
    return (/^true$/i).test(val) || (/^1$/i).test(val);
}

I.is_empty = function(str) {
    if ( !I.is_str(str) ) return true;
    return str.replace(/\s/g,"") === "";
}

I.remove = function(arr, obj) {
    if (!I.is_array(arr))
        return;
    var i = I.indexof(arr,obj);
    if (i === -1)
        return;
    arr.splice(i,1);
}

I.make_array = function(obj) {
    return I.is_array(obj) ? obj : [obj];
}

I.contains = function(arr, obj) {
    return I.indexof(arr, obj) != -1;
}

//Array.indexOf for IE
I.indexof = function(arr, obj) {	

    if (!I.is_array(arr)) 
        return -1;

    if (Array.prototype.indexOf)
        return arr.indexOf(obj);	

    var i = arr.length;
    while (i--) {
        if (arr[i] === obj)
            return i;
    }
    return -1;
}

/*
 * Runs a sequence of functions
 * @param 
 * {Array} array of functions with the form: function(next)
 * {Function} on_complete callback
 */

I.sequence = function() {
    var seq = [].slice.call(arguments);
    var on_complete = seq.pop();
    var fn;
    (function next() {
        if (seq.length == 0) {
            if ( typeof on_complete === 'function' ) 
                on_complete();
            return;
        }
        fn = seq.shift();
        if ( typeof fn === 'function' ) 
            fn(next);
        else 
            next();
    })();
}

I.load_files = function(seq, on_complete) {

    seq = I.make_array(seq);
    seq = seq.slice(0);

    var url;
    (function next() {
        if (seq.length == 0) {
            if ( typeof on_complete === 'function' ) 
                on_complete();
            return;
        }
        url = seq.shift();
        I.load_file(url, next);	
    })();
}

I.load_file = function(url, on_complete) {

    I.load_file.loading = I.load_file.loading || {};

    if (I.load_file.loading[url] === 'complete') {
        on_complete();
        return;
    }

    if ( I.load_file.loading[url] !== undefined ) {
        I.load_file.loading[url].push( on_complete );
        return;
    }

    I.load_file.loading[url] = [on_complete];

    if ( /\.js/.test(url) ) 
        load_js_file( url, complete );
    else if ( /\.css/.test(url) ) 
        load_css_file( url, complete );

    function complete() {
        var i, callback, callbacks = I.load_file.loading[url];
        for (i = 0; i < callbacks.length; i++) {
            callback = callbacks[i];
            if (typeof callback === 'function')
                callback();
        }
        I.load_file.loading[url] = 'complete';
    }

    function load_js_file(url, on_complete) {
        //console.log('load_js_file', url, on_complete);
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.src = url;
        var entry = document.getElementsByTagName('script')[0];
        entry.parentNode.insertBefore(script, entry);
        if (script.addEventListener)
            script.addEventListener('load', on_complete, false);
        else {
            script.attachEvent('onreadystatechange',
                    readyHandler = function() {
                        if (/complete|loaded/.test(
                                script.readyState)) {
                            on_complete();
                            script.detachEvent(
                                'onreadystatechange',
                                readyHandler);
                        }
                    });
        }	
    }

    function load_css_file(url, on_complete) {
        //console.log('load_css_file', url, on_complete);

        var link, entry, 
            //testElem, 
            node, value;

        link = document.createElement('link');
        link.rel  = 'stylesheet';
        link.type = 'text/css';
        link.href = url;

        entry = document.getElementsByTagName('script')[0];
        entry.parentNode.insertBefore(link, entry);

        node = document.createElement('span');
        node.id = 'css-ready';

        entry.parentNode.insertBefore(node, entry);

        (function check_css() {

            if (window.getComputedStyle) {
                value = document.defaultView
                            .getComputedStyle(node, null)
                            .getPropertyValue('color');
            }
            else if (node.currentStyle) {
                value = node.currentStyle['color'];
            }

            if (value && value === 'rgb(121, 121, 121)' 
                || value === '#797979') {
                node.parentNode.removeChild(node);
                on_complete();
            } 
            else {
                setTimeout(check_css, 100);
            }
        })();
    }
}

I.hex2rgb = function(hex) {
    hex = hex.replace('0x','#');
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
    } : null;	
}

I.rgb2hex = function(r, g, b) {
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

I.get_css = function(file_str, rule_str) {

    var styles = document.styleSheets,
        i, style,
        rules, 
        j, rule;

    for (i = 0; i < styles.length; i++) 
    {
        style = styles[i];
        if ( !style.href || !style.href.indexOf(file_str) )
            continue;
        rules = style.cssRules;
        if ( !rules )
            continue;
        for (j = 0; j < rules.length; j++) 
        {
            rule = rules[j];
            if (rule.selectorText === rule_str)
                return rule.style;
        }
    }
    return null;
}

var _log_enabled = /dev3/.test( I.base_root() );

})(this, window, Infomous, undefined);

/*!
 * Infomous GA Tracker
 * http://www.infomous.com/
 */

Infomous.define('GAtracker', (function(I) {

var GAtracker = function(name, account) {

	//ga global
	_gaq = window._gaq || [];
	
	this.set_account(name, account);

	if ( GAtracker.loaded() )
		return;

	(function() {
		var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
		ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
		var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
	})();
}

GAtracker.loaded = function() {
	return typeof _gaq !== 'undefined' 
		&& typeof _gat !== 'undefined' 		
		&&  _gat._getTracker !== undefined;
}

GAtracker.prototype = (function() {
	
	var loc = window.top.location;

	return {
		constructor: GAtracker,
	
		set_account: function(name, account) {
			this.name = name;
			this.account = account;
			_gaq.push(function() {
				var pageTracker = _gat._createTracker(
					account, name);
			});			
			_gaq.push([ name + '._setAccount', account ]);
		},
		//https://developers.google.com/analytics/devguides/collection/gajs/
		track_event: function(action, label, cvars, url) {

			if (typeof cvars === 'string' && url === undefined) {
				url = cvars.slice();
				cvars = undefined;
			}

			// set
			this.set_custom_var( cvars );

			// track (use url as category)
			url = url || loc.href;
			_gaq.push([ this.name + '._trackEvent', 
				url, action, label ]);
			
			// del
			this.del_custom_var( cvars );
		},
		track_page: function(cvars, url) {

			if (typeof cvars === 'string' && url === undefined) {
				url = cvars.slice();
				cvars = undefined;
			}

			// set
			this.set_custom_var( cvars );

			// track
			url = url || (loc.protocol + '//' + loc.host + 
					loc.pathname + loc.hash);
			_gaq.push([ this.name + '._trackPageview', url ]);

			// del
			this.del_custom_var( cvars );
		},
		set_custom_var: function(data) {	

			if (data === undefined) 
				return;

			data = I.make_array(data);

			var i = data.length;
			while (i--) { 
				if (data[i] === undefined) 
					continue;
				_gaq.push([ this.name + '._setCustomVar', 
					data[i].index || (i + 1),
					data[i].name, 
					data[i].value, 
					data[i].opt_scope ]);
			}
		},
		del_custom_var: function(data) {

			if (data === undefined) 
				return;
			
			data = I.make_array(data);

			var i = data.length;
			while (i--) {
				if (data[i] === undefined) 
					continue;
				_gaq.push([ this.name + '._deleteCustomVar', 
					data[i].index || (i + 1)
					]);
			}
		}
	};
})();

return GAtracker;

})(Infomous) );

Infomous.define('Events', (function(I) {

var Events = function() {
	if (!(this instanceof Events)) 
		return new Events();
	this.listeners = { all: [] };
}

Events.prototype = {

	constructor: Events, 

	on: function(types, fn, context) {
		if ( this.has(fn) )
			return false;
		types = I.make_array(types);
		var lst = this.listeners,
		    type,
		    i = types.length;
		while(i--) {
			type = types[i];
			lst[type] = lst[type] || []; 
			lst[type].push({ 
				fn: fn, 
				context: context || this
			});
		}
		return true;
	},

	//TODO FIXME
	off: function(types, fn, context) {
		types = I.make_array(types);
		if ( !I.contains(types,'all') )
			types = types.concat('all');
		var type, 
		    i = types.length;
		var list, len, j;
		while(i--) {
			type = types[i];
			list = this.listeners[type];
			len = list ? list.length : 0;
			for (j = 0; j < len; j++) {
				if (list[j].fn === fn && 
					list[j].context === context ) 
					list.splice(j, 1);
			}
		}
	},

	has: function(fn) {
		var lst = this.listeners,
		    i = lst.length;
		while(i--) {
			if ( lst[i].fn === fn )
				return true;
		}
		return false;
	},
	
	dispatch: function(types, _event) {
		
		types = I.make_array(types);

		var lst = this.listeners,
		    type,
		    tlen = types.length,
		    i;
		
		var list,
		    listner,
		    llen,
		    j;
		
		for (i = 0; i < tlen; i++) {
			type = types[i];
			list = lst.all.concat( lst[type] );
			llen = list.length;
			for (j = 0; j < llen; j++) {
				listner = list[j];
				if (listner === undefined) 
					continue;
				listner.fn.call( listner.context, 
						_event || {} );
			}
		}
	}
};

return Events;

})(Infomous) );

/*!
 * Infomous Cloud Frame
 * http://www.infomous.com/
 */

Infomous.define('CloudFrame', (function(I) {

var CloudFrame = function(config) {

	if (!(this instanceof CloudFrame))
		return new CloudFrame(config);

	I.esc(config);
	I.events(this);

	config.title = config.title || 'Explore News Content';
	config.help = config.help || 'hover & click to explore';

	var self = this,
	    $ = I.$,
	    base_class = 'infomous-embed-frame',
	    $frame = make_frame(),
	    //$cloud = make_cloud_container(),
	    $header = make_header( config.title, config.help ),
	    $footer = make_footer();

	$frame.append( $header );
	//$frame.append( $cloud );
	$frame.append( $footer );

	this.add_to_dom = function( $target ) {
		$target.after( $frame );
		//$cloud.append( $target );
		$header.after( $target );
		//$target.wrap( $frame );
	}

    this.height = function() {
        return $header.outerHeight(true) + $footer.outerHeight(true);
    }
	
	function make_frame() {
		var $el = $('<div/>', {
			'class': base_class 
		});
		$el.css({
			width: css_size(config.width)
		});
		return $el;
	}

	function make_cloud_container() {
		var $el = $('<div/>', {
			'class': base_class+'-cloud-container'
		});
		return $el;
	}

	function make_header( title, help ) {

		var $el = $('<div/>', {
			'class': base_class+'-header '+
				base_class+'-elem'
	 	    }),
		    //$title = $('<p/>', {
			//'class': base_class+'-header-title'
		    //}),
		    $title = $('<img/>', {
			'class': base_class+'-header-title '+
			    	base_class+'-header-elem',
		    	'src': I.base_path()+'img/frame/title.png' 
		    }),
		    $help = $('<p/>', {
			'class': base_class+'-header-help '+
			    	base_class+'-header-elem',
		    });

		$title.text( title );
		$help.text( help );

		$el.css({
			width: css_size(config.width)
		});
	
		$el.append( $title );
		$el.append( $help );

		return $el;
	}

	function make_footer() {

		var $el = $('<div/>', {
			'class': base_class+'-footer '+base_class+'-elem'
		    }),
		    base_img_url = I.base_path()+'img/frame/',
		    $enlarge = make_bt('enlarge',
				    config.nid !== undefined ?
				    	I.base_root()+'node/'+config.nid :
					I.base_root(),
				    base_img_url+'enlarge.png', 
				    'left'),
		    $help = make_bt('help',
				    I.base_root()+'help/interact', 
				    base_img_url+'help.png', 
				    'left'),
		    $visit = make_bt('visit',
				    I.base_root(), 
				    base_img_url+'visit_infomous.png', 
				    'right');
		    
		$el.css({
			width: css_size(config.width)
		});

		$el.append( $enlarge );
		$el.append( $help );
		$el.append( $visit );

		function make_bt( id, link_url, img_url, side ) {
			var baseclas = base_class+'-footer-btn',
			    $bt = $('<div class="'+baseclas+' '+
					baseclas+'-'+id+' '+
					baseclas+'-'+side+'">'+
					'<p><a href="'+link_url+'" '+
					'target="_blank" '+
					'class="btn" '+
					'style="background-image:'+
					'url('+img_url+')">'+
					'</a></p></div>');
			$bt.click( function() {
				self.dispatch('click', {
					id: id,
					url: link_url
				});
			});
			return $bt;
		}

		return $el;
	}

	function css_size(num) {
        if (num === undefined) 
            return undefined;
        return parseInt(num)+'px';
		//var str = num.toString();
		//return str.indexOf('%') == -1 ? str+'px' : str;
	}
}

return CloudFrame;

})(Infomous) );
/*!
 * Infomous Cloud Proxy
 * http://www.infomous.com/
 *
 * @class CloudProxy
 * @param {String} client 'js' or 'flash'
 */

Infomous.define('CloudProxy', (function(I) {

var CloudProxy = function(client, config) {

	if (!(this instanceof CloudProxy))
		return new CloudProxy(client);
	
	I.events(this);

	var _id = client || 'flash';

	this.id = function() { return _id; };
	
	//FIXME config is a pointer to global vars
    this.config = config || {}; 
	//this.config = I.extend( config ); //make a copy

	this.impl = CloudProxy.clouds[_id](this);
	this.impl.init();
}

//function CloudProxy(version, client, config) {

	//if (!(this instanceof CloudProxy)) {
		//return new CloudProxy(version, client, config);
	//}

	//var args = Array.prototype.slice.call(arguments);
	//var _version = is_version(args[0]) ? args.shift() : '0.9.1';

	//if (CloudProxy.versions[_version] === undefined)
		//throw 'unknown version: '+_version;

	//return new CloudProxy.versions[_version](_version,
			//args[0],args[1],args[2]);

	//function is_version(str) {
		//if (str == undefined) return false;
		//var i, arr = str.split('.');
		//for (i = 0; i < arr.length; i++)
			//if (isNaN(parseInt(arr[i])))
				//return false;
		//return true;
	//}
//}

CloudProxy.clouds = {};

//CloudProxy.clouds['0.9.1'] = {};
//CloudProxy.versions = {};
//CloudProxy.versions['0.9.1'] = function(version, client, config) {} 

//CloudProxy.versions['0.9.1'].prototype = function() {
CloudProxy.prototype = {

	//constructor: CloudProxy.versions['0.9.1']
	constructor: CloudProxy,

	//% abstract methods

	get_var: function(key) {
		I.log('get_var', key);
		return this.impl.get_var(key);
	},

	set_var: function(key, value, b_make_request) {
		value = I.esc(value);
		I.log('set_var', key, value, 'make req: '+b_make_request);
		this.dispatch( key, {
			key: key,
			value: value,
			b_make_request: b_make_request
		});
		return this.impl.set_var(key, value, b_make_request);	
	},

	set_vars: function(hash) {
		var key = 'set_vars';
		I.esc(hash);	
		I.log(key, hash);
		this.dispatch( key, {
			key: key,
			value: hash,
			b_make_request: false
		});
		return this.impl.set_vars(hash);
	},

	make_request: function() {
		I.log('make_request');
		if ( ! this.has_feeds() ) 
			return;	
		return this.impl.make_request();
	},

	set_feeds: function(feeds_str, b_make_request) {
		I.log('set_feeds', 
			'make req', b_make_request, 
			'feeds', feeds_str);
		return this.impl.set_feeds(feeds_str, b_make_request);	
	},

	empty_cloud: function() {
		I.log('empty_cloud');
		return this.impl.empty_cloud();
	},

	kill_current_request: function() {
		I.log('kill_current_request');
		return this.impl.kill_current_request();
	},

	send_event: function(action, link_url) {
		I.log('send_event', action, link_url);
		return this.impl.send_event(action, link_url);
	},

	get_save_state: function() {
		I.log('get_save_state');
		return this.impl.get_save_state();
	},

	//% common methods

	has_feeds: function(feeds_str) {
		feeds_str = feeds_str !== undefined ? 
			feeds_str : (this.get_var('feeds')||"");
		return feeds_str.replace(/\s/g,"") !== "";
	}
};

//% js proxy

//CloudProxy.clouds['0.9.1'].js = function() {
CloudProxy.clouds.js = function(proxy) {

	var cloudjs;

	return {
		init: function() {

			I.log('init js cloud proxy');
			
			cloudjs = window.infomous_js; //global

			cloudjs.plug_toolbar(proxy);

			// cloud js input events...
			cloudjs.on('hide', function(e) {
				add_word('hidden', e.word);
			});

			cloudjs.on('focus', function(e) {
				add_word('focused', e.word);
			});

			cloudjs.on('unfocus', function(e) {
				remove_word('focused', e.word);	
			});

			cloudjs.on('unfocus_all', function(e) {
				proxy.set_var('focused', '', true);
			});	

			function add_word(key, word) {
				var curr_str = (proxy.get_var(key) || '').trim();
				var curr = curr_str === '' ? [] : curr_str.split(',');
				curr.push(word);
				proxy.set_var(key, curr.join(), true);
			}

			function remove_word(key, word) {
				var curr_str = (proxy.get_var(key) || '').trim();
				if (curr_str === '') return;
				var curr = curr_str.split(',');
				I.remove(curr, word);
				proxy.set_var(key, curr.join(), true);
			}
		},

		get_var: function(key) {
			return proxy.config[key];
		},

		set_var: function(key, value, b_make_request) {
			proxy.config[key] = value;
            cloudjs.set_var(key, value);
			if (b_make_request) 
                proxy.make_request(); 
		},
		
		set_vars: function(hash) {
			var k;
			for (k in hash)
				proxy.config[k] = hash[k];
            cloudjs.set_vars(hash);
		},

		make_request: function() {
			cloudjs.make_request();
		},
	
		set_feeds: function(feeds_str, b_make_request) {
			if ( ! proxy.has_feeds( feeds_str ) ) {
				proxy.empty_cloud();
				cloudjs.add_cloud_feedback(
                        'Please add some content to the cloud');
			}
			else cloudjs.remove_cloud_feedback();

			proxy.set_var('feeds', feeds_str, b_make_request);
		},

		empty_cloud: function() {
			proxy.kill_current_request();
			cloudjs.render(undefined);
		},

		kill_current_request: function() {
			cloudjs.kill_current_request();
		},

		send_event: function(action, link_url) {
			// UX event format
			cloudjs.track_event(action, undefined, [
				{
					name: 'nid',
					value: proxy.config.nid
				},
				{
					name: 'url',
					value: link_url
				}
			]);
		},

		get_save_state: function() {
			var data = proxy.config;
			//@see as3cloud/com.ui.util.Saver.getVariables()
			var variables = {};
			var feedString = data.feeds;
			variables.type = data.type;
			variables.text_option = data.textOption;
			variables.feeds = feedString;
			variables.nid = I.bool(data.cloned) ? 0 : data.nid;
			variables.title = data.title;
			variables.description = data.description;
			variables.groups = I.bool(data.groups) ? 1 : 0;
			variables.font_size = data.fontScale;
			variables.zoom = data.zoom;
			variables.max_words = Math.round(data.maxWords);
			variables.word_cutoff = Math.round(data.popularWordCutoff);
			variables.linkage_threshold = data.linkageThreshold;
			//variables.pos = Parameters.p.pos;
			variables.dict = data.dict;
			variables.focused = data.focused;
			variables.hidden = data.hidden;
			variables.tags = data.tags;
			//variables.status = data.status;
			variables.isPublic = I.bool(data.isPublic) ? 1 : 0;
			return variables;
		}
	}
};

//% flash proxy

//CloudProxy.clouds['0.9.1'].flash = function() {
CloudProxy.clouds.flash = function(proxy) {

	var flash;
	
	return {
		init: function() {

			flash = (function(target) {
				if (navigator.appName.indexOf("Microsoft") != -1) {
					return window[target];
				} 
				else {
					return document[target];
				}
			})(proxy.config.target);

			I.log('init flash cloud proxy', 'flash', flash);
		},

		//just for debugging....
		//get_cloud: function() {
			//return flash;
		//},
	
		get_var: function(key) {
			return flash.getVar(key);
			//return proxy.config[key];
		},

		set_var: function(key, value, b_make_request) {
			proxy.config[key] = value; 
			flash.setVar(key, value, b_make_request);
		},
		
		set_vars: function(hash) {
			var k;
			for(k in hash)
				proxy.config[k] = hash[k];
			flash.setVars(hash);
		},

		make_request: function() {
			flash.makeRequest();
		},
	
		set_feeds: function(feeds_str, b_make_request) {
			// update data here to keep sync
			proxy.config.feeds = feeds_str;
			flash.setFeeds(feeds_str);
			if ( ! proxy.has_feeds( feeds_str ) )
				proxy.empty_cloud();
			if (b_make_request) 
				proxy.make_request(); 
		},

		empty_cloud: function() {
			proxy.kill_current_request();
			flash.emptyCloud();
		},

		kill_current_request: function() {
			flash.killRequest();
		},

		send_event: function(action, link_url) {
			try {
				flash.sendEvent(action, link_url);
			}
			catch(err) { I.log(err) };
		},

		get_save_state: function() {
			return flash.jsGetCloudState();
			//var data = {};
			//var state = decodeURIComponent(
				//flash.jsGetCloudState());
			//var kvpairs = state.split('&');
			//var len = kvpairs.length;
			//var kv, i;
			//for (i = 0; i < len; i++) {
				//kv = kvpairs[i].split('=');
				//data[ kv[0] ] = kv[1]; 
			//}
			//return data;
		}
	}
};

return CloudProxy;

})(Infomous) );

