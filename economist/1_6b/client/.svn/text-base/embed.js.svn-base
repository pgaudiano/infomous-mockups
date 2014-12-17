
/*!
 * Infomous JS SDK
 * http://www.infomous.com/
 */

var Infomous = Infomous || {};

(function(root, window, I, undefined) {

I.log = function() {

    if (!_log_enabled || typeof console === 'undefined') 
        return;

    console.log.apply( console, ['[infomous]'].concat(arguments) );
}

I.log_enable = function(val) {
    _log_enabled = val;
}

/*
 * get base url
 */

I.base_root = function() {	

    return I._base_root || (function() {

        //snippet can call xxx.infomous.com/cloud/get?[vars]
        //var re = /(?=.*infomous\.com)(?=.*\/client\/embed\.js)/,
        var re = /infomous\.com/,
           url = I.get_script_tag(re).src;

        if (url) 
            return url.split('/',3).join('/')+'/';

        var loc = window.location;
        return re.test(loc.hostname) ? loc.protocol+'//'+loc.hostname+'/':'';
    })();
}

/*
 * get path to client
 */

I.base_path = function() {

    return I._base_path || (function() {

        //seach for infomous.com and /client/embed.js
        var re = /(?=.*infomous\.com)(?=.*\/client\/embed\.js)/,
           url = I.get_script_tag(re).src;

        if (url) 
            //for cases like: http://infomous.com/long/path/.../client/embed.js
            return url.split('/').slice(0,-2).join('/') + '/client/';

        return I.base_root() + 'client/';
    })();
}

/**
 * loads required js/css external files in runtime
 * @param 
 * {Array|string} array of dependencies or single dependency string
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
                I.$ready();
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
                base_path+'cloud_frame.css',
                base_path+'cloud_frame.js' 
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
    var file_seq = [], on_loaded_fns = [];

    for (var i = 0; i < deps.length; i++) {
        add_dep( file_seq, deps[i] );
    }	

    function add_dep(_fseq, dep) {

        var cfg = deps_cfg[dep],
            dep_loaded = cfg && cfg.is_loaded();

        if ( !cfg )
            return;

        var file, 
            files = cfg.files,
            on_loaded = cfg.on_loaded;

        if ( !dep_loaded && typeof on_loaded === 'function' )
            on_loaded_fns.push(on_loaded);

        for (var j = 0; j < files.length; j++) {

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
        var on_loaded;
        for (var k = 0; k < on_loaded_fns.length; k++) {
            on_loaded = on_loaded_fns[k];
            if (typeof on_loaded === 'function')
                on_loaded();
        }
        if (typeof on_complete === 'function')
            on_complete();
    });
}

I.$ready = function() {
    I.$ = jQuery.noConflict();
}

//TODO replace get_script_url by get_script_tag

I.get_script_url = function(re) { return I.get_script_tag(re).src; }

I.get_script_tag = function(re) {
    var scripts = document.getElementsByTagName('script'),
        el, src;
    for (var i = 0; i < scripts.length; i++) {
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

//TODO support recursiveness?
I.esc = function(data) {
    if ( I.is_obj(data) ) {
        for (var k in data) 
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
    return I.extend( obj, new Events() );
}

I.extend = function(dst, src) {
    if (src === undefined) {
        src = dst;
        dst = undefined;
    }
    dst = dst || {};
    for (var k in src) {
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

I.bind = function(fn, ctx) {
    if (fn === undefined) 
        return undefined;
    ctx = ctx || {};
    return function() {
        return fn.apply( ctx, [].slice.call(arguments) );
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
    if ( str === undefined || str === null )
        return true;
    if ( !I.is_str(str) ) 
        return false;
    return str.replace(/\s/g,"") === "";
}

I.make_array = function(obj) {
    return I.is_array(obj) ? obj : [obj];
}

I.contains = function(arr, obj) {
    return I.indexof(arr, obj) != -1;
}

I.add_unique = function(arr, obj) {
    if ( I.contains(arr, obj) ) 
        return false;
    arr.push(obj);
    return true;
}

I.remove = function(arr, obj) {
    if ( !I.is_array(arr) )
        return false;
    var i = I.indexof(arr,obj);
    if (i === -1)
        return false;
    return !!arr.splice(i,1)[0];
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
 * {Array} array of functions 
 *      each function must explicitly call the next function
 *      next function is passed as arg, with the form: function(next) 
 *      except the last one which acts a callback and is called without args
 */

I.sequence = function() {
    var seq = [].slice.call(arguments);
    var callback = seq.pop();
    var fn;
    (function next() {
        if (seq.length == 0) {
            if ( typeof callback === 'function' ) 
                callback();
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
        var callback, callbacks = I.load_file.loading[url];
        for (var i = 0; i < callbacks.length; i++) {
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

            if (value 
                && value === 'rgb(121, 121, 121)' || value === '#797979') {
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

I.css_size = function(size) {
    return !!size ? (I.is_abs_size(size) ? parseInt( size ) + 'px' : size) : undefined;
}

I.is_abs_size = function(size) {
    return size.toString().indexOf('%') == -1;
}

I.attach_css = function(css_str) {
    if ( ! I.is_str(css_str) )
        return;
    //attach css text to head with IE support
    //http://stackoverflow.com/questions/3922139/add-css-to-head-with-javascript
    //http://www.quirksmode.org/bugreports/archives/2006/01/IE_wont_allow_documentcreateElementstyle.html
    var div = document.createElement('div');
    div.innerHTML = '<p></p><style>' + css_str + '</style>';
    document.getElementsByTagName('head')[0].appendChild(div.childNodes[1]);
}

I.agg = (function() { 

    function date2agg(date) {
        //ISO8601
        //YYYYMMDDTHHMMSSZ
        var hh = to2digits( date.getUTCHours() ),
            mm = to2digits( date.getUTCMinutes() ),
            ss = '00',
            YYYY = date.getUTCFullYear().toString(),
            MM = to2digits( date.getUTCMonth() + 1 ), //getMonth is 0-11
            DD = to2digits( date.getUTCDate() );
        return YYYY + MM + DD + 'T' + hh + mm + ss + 'Z';
    }

    function agg2date(str) {
        if ( ! I.is_str(str) )
            return undefined;
        var radix = 10,
            dd = parseInt( str.substr(6,2), radix ),
            mm = parseInt( str.substr(4,2), radix ) - 1,
            yy = parseInt( str.substr(0,4), radix ),
            hh = parseInt( str.substr(9,2), radix ),
            min = parseInt( str.substr(11,2), radix ),
            ss = 0;
        var d = new Date;
        d.setUTCDate(dd);
        d.setUTCMonth(mm);
        d.setUTCFullYear(yy);
        d.setUTCHours(hh);
        d.setUTCMinutes(min);
        d.setUTCSeconds(ss);
        return d;
    }

    function date_offset( offset, from ) { 
        var d = new Date,
            from = from || new Date;
        return new Date(
            from.getFullYear() + (offset.years || 0),
            from.getMonth() + (offset.months || 0),
            from.getDate() + (offset.days || 0),
            from.getHours() + (offset.hours || 0),
            from.getMinutes() + (offset.minutes || 0),
            from.getSeconds() + (offset.seconds || 0),
            from.getMilliseconds() + (offset.milliseconds || 0)
        );
    }

    function to2digits(n) {
        var nstr = n.toString();
        return n < 10 && nstr.length === 1 ? '0'+n : nstr;
    }

    return {
        date2agg: date2agg,
        agg2date: agg2date
    }
})();

// global bus to talk with other app parts...
I.bus = {
    flash: {},
    drupal: {}
};

var _log_enabled = /dev3/.test( I.base_root() );

})(this, window, Infomous, undefined);

/*!
 * Infomous Google Analytics Tracker
 * http://www.infomous.com/
 * 
 * @constructor
 * @param {string} name
 * @param {string} account id
 */

Infomous.define('GAtracker', (function(I) {

var GAtracker = function(name, account) {

	//ga global
	_gaq = window._gaq || [];

	this.set_account(name, account);

	if ( GAtracker.inited() )
		return;

	(function() {
		var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
		ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
		var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
	})();
}

GAtracker.inited = function() {
	return typeof _gaq !== 'undefined' && typeof _gat !== 'undefined';
        //&& _gat._getTracker !== undefined;
}

GAtracker.prototype = {

    constructor: GAtracker,

    //https://developers.google.com/analytics/devguides/collection/gajs/

    set_account: function(name, account) {
        
        this.name = name;
        this.account = account;

        //_gaq.push( function() {
            //_gat._createTracker(account, name); 
        //});			

        _gaq.push([ name + '._setAccount', account ]);
    },

    track_event: function(action, label, cvars, url) {

        if (typeof cvars === 'string' && url === undefined) {
            url = cvars.slice();
            cvars = undefined;
        }

        // set
        this.set_custom_var( cvars );

        // track (use url as category)
        if (!url) {
            try {
                url = window.top.location.href;
            }
            catch (err) {
                url = document.referrer;
            }
        }
        
        _gaq.push([ this.name + '._trackEvent', url, action, label ]);

        I.log('[GAtracker]', 'track event', this.name, 'url', url);
        
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

        // track (use url as category)
        if (!url) {
            try {
                var loc = window.top.location;
                url = loc.protocol + '//' + loc.host + loc.pathname + loc.hash;
            }
            catch (err) {
                url = document.referrer;
            }
        }

        _gaq.push([ this.name + '._trackPageview', url ]);

        I.log('[GAtracker]', 'track page', this.name, 'url', url);

        // del
        this.del_custom_var( cvars );
    },

    /*
     * @param {Array} of Objects with { [index,] name, value, opt_scope }
     */

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
                    data[i].index || (i + 1) ]);
        }
    }
};

return GAtracker;

})(Infomous) );

/*!
 * Infomous Events
 * http://www.infomous.com/
 * 
 * @constructor
 */

Infomous.define('Events', (function(I) {

var Events = function() {

	if (!(this instanceof Events)) 
		return new Events();
	
    this.listeners = { all: [] };
}

Events.prototype = {

	constructor: Events, 

	on: function(types, fn, context) {

        var lst = this.listeners;

        if ( I.contains(lst,fn) )
			return false;
		
        types = I.make_array(types);
		
        var type,
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
		
        if ( ! I.contains(types, 'all') )
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

	dispatch: function(types, _event) {

		types = I.make_array(types);

		var lst = this.listeners,
		    type,
		    tylen = types.length;

		var callbacks,
		    callback,
		    cblen;

		for (var i = 0; i < tylen; i++) {
			type = types[i];
			callbacks = lst.all.concat( lst[type] );
			cblen = callbacks.length;
			for (var j = 0; j < cblen; j++) {
				callback = callbacks[j];
				if (callback === undefined) 
					continue;
				callback.fn.call( callback.context, _event || {} );
			}
		}
	}

    //has: function(fn) {
		//var lst = this.listeners,
			//i = lst.length;
		//while(i--) 
			//if ( lst[i].fn === fn )
				//return true;
		//return false;
	//}
};

return Events;

})(Infomous) );

/*!
 * Infomous Cloud Proxy
 * http://www.infomous.com/
 *
 * @constructor
 * @param {string} 'js' | 'flash'
 * @param {Object} config
 */

Infomous.define('CloudProxy', (function(I) {

var CloudProxy = function(_platform, config, _id) {

	if (!(this instanceof CloudProxy))
		return new CloudProxy(_platform, config, _id);
	
	I.events(this);

	_platform = _platform || 'flash';
	//this.platform = function() { return _platform; };

    _id = _id || 'CloudProxy_'+new Date().getTime();
    this.id = function() { return _id; };
	
	//FIXME config is a pointer to global vars
    this.config = config || {}; 
	//this.config = I.extend( config ); //make a copy

	this.impl = CloudProxy.clouds[_platform](this);
	this.impl.init();
}

//function CloudProxy(version, _platform, config) {
	//if (!(this instanceof CloudProxy)) {
		//return new CloudProxy(version, _platform, config);
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
//CloudProxy.versions['0.9.1'] = function(version, _platform, config) {} 

//CloudProxy.versions['0.9.1'].prototype = function() {
CloudProxy.prototype = {

	//constructor: CloudProxy.versions['0.9.1']
	constructor: CloudProxy,

	//% abstract methods

	get_var: function(key) {
		//I.log('[CloudProxy]', 'get_var', key);
		return this.impl.get_var(key);
	},

	set_var: function(key, value, b_make_request) {
		value = I.esc(value);
		I.log('[CloudProxy]', 'set_var', key, value, 'make req: '+b_make_request);
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
		I.log('[CloudProxy]', key, hash);
        for (var k in hash) {
            this.set_var( k, hash[k] );
        }
		return this.impl.set_vars(hash);
	},

	make_request: function() {
		I.log('[CloudProxy]', 'make_request');
		return this.impl.make_request();
	},

	set_feeds: function(feeds_str) {
		I.log('[CloudProxy]', 'set_feeds', feeds_str);
		return this.impl.set_feeds(feeds_str);	
	},

	empty_cloud: function() {
		I.log('[CloudProxy]', 'empty_cloud');
		return this.impl.empty_cloud();
	},

	kill_current_request: function() {
		I.log('[CloudProxy]', 'kill_current_request');
		return this.impl.kill_current_request();
	},

	send_event: function(action, link_url) {
		I.log('[CloudProxy]', 'send_event', action, link_url);
		return this.impl.send_event(action, link_url);
	},

	get_save_state: function() {
		I.log('[CloudProxy]', 'get_save_state');
		return this.impl.get_save_state();
	},

    has_feeds: function(feeds_str) {
        feeds_str = feeds_str || (this.get_var('feeds') || '');
        return feeds_str.replace(/\s/g,"") !== '';
    }
};

//% js proxy

//CloudProxy.clouds['0.9.1'].js = function() {
CloudProxy.clouds.js = function(proxy) {

	var cloudjs;

	return {
		init: function() {

			I.log('[CloudProxy]', 'init js', proxy.id());
			
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
				//curr.push(word);
                var added = I.add_unique(curr, word);
                proxy.set_var( key, curr.join() );
                if (added) proxy.make_request();
			}

			function remove_word(key, word) {
				var curr_str = (proxy.get_var(key) || '').trim();
				if (curr_str === '') return;
				var curr = curr_str.split(',');
				var removed = I.remove(curr, word);
                proxy.set_var( key, curr.join() );
                if (removed) proxy.make_request();
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
			for (var k in hash)
				proxy.config[k] = hash[k];
            cloudjs.set_vars(hash);
		},

		make_request: function() {
			cloudjs.make_request();
		},
	
		set_feeds: function(feeds_str) {
			if ( I.is_empty( feeds_str ) ) {
				proxy.empty_cloud();
				cloudjs.add_cloud_feedback('Please add some content to the cloud');
			}
			else cloudjs.remove_cloud_feedback();

			proxy.set_var('feeds', feeds_str);
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

			I.log('[CloudProxy]', 
                    'init flash cloud proxy', 
                    'flash', flash,
                    'proxy.config', proxy.config);
		},

		get_var: function(key) {
			return flash.getVar(key);
			//return proxy.config[key];
		},

		set_var: function(key, value, b_make_request) {
			proxy.config[key] = value; 
			flash.setVar(key, value, b_make_request);
		},
		
		set_vars: function(hash) {
			for(var k in hash)
				proxy.config[k] = hash[k];
			flash.setVars(hash);
		},

		make_request: function() {
			flash.makeRequest();
		},
	
		set_feeds: function(feeds_str) {
			// update data here to keep sync
			proxy.config.feeds = feeds_str;
			flash.setFeeds(feeds_str);
			if ( I.is_empty( feeds_str ) )
				proxy.empty_cloud();
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

/*	SWFObject v2.2 <http://code.google.com/p/swfobject/> 
	is released under the MIT License <http://www.opensource.org/licenses/mit-license.php> 
*/
var swfobject=function(){var D="undefined",r="object",S="Shockwave Flash",W="ShockwaveFlash.ShockwaveFlash",q="application/x-shockwave-flash",R="SWFObjectExprInst",x="onreadystatechange",O=window,j=document,t=navigator,T=false,U=[h],o=[],N=[],I=[],l,Q,E,B,J=false,a=false,n,G,m=true,M=function(){var aa=typeof j.getElementById!=D&&typeof j.getElementsByTagName!=D&&typeof j.createElement!=D,ah=t.userAgent.toLowerCase(),Y=t.platform.toLowerCase(),ae=Y?/win/.test(Y):/win/.test(ah),ac=Y?/mac/.test(Y):/mac/.test(ah),af=/webkit/.test(ah)?parseFloat(ah.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):false,X=!+"\v1",ag=[0,0,0],ab=null;if(typeof t.plugins!=D&&typeof t.plugins[S]==r){ab=t.plugins[S].description;if(ab&&!(typeof t.mimeTypes!=D&&t.mimeTypes[q]&&!t.mimeTypes[q].enabledPlugin)){T=true;X=false;ab=ab.replace(/^.*\s+(\S+\s+\S+$)/,"$1");ag[0]=parseInt(ab.replace(/^(.*)\..*$/,"$1"),10);ag[1]=parseInt(ab.replace(/^.*\.(.*)\s.*$/,"$1"),10);ag[2]=/[a-zA-Z]/.test(ab)?parseInt(ab.replace(/^.*[a-zA-Z]+(.*)$/,"$1"),10):0}}else{if(typeof O.ActiveXObject!=D){try{var ad=new ActiveXObject(W);if(ad){ab=ad.GetVariable("$version");if(ab){X=true;ab=ab.split(" ")[1].split(",");ag=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}}catch(Z){}}}return{w3:aa,pv:ag,wk:af,ie:X,win:ae,mac:ac}}(),k=function(){if(!M.w3){return}if((typeof j.readyState!=D&&j.readyState=="complete")||(typeof j.readyState==D&&(j.getElementsByTagName("body")[0]||j.body))){f()}if(!J){if(typeof j.addEventListener!=D){j.addEventListener("DOMContentLoaded",f,false)}if(M.ie&&M.win){j.attachEvent(x,function(){if(j.readyState=="complete"){j.detachEvent(x,arguments.callee);f()}});if(O==top){(function(){if(J){return}try{j.documentElement.doScroll("left")}catch(X){setTimeout(arguments.callee,0);return}f()})()}}if(M.wk){(function(){if(J){return}if(!/loaded|complete/.test(j.readyState)){setTimeout(arguments.callee,0);return}f()})()}s(f)}}();function f(){if(J){return}try{var Z=j.getElementsByTagName("body")[0].appendChild(C("span"));Z.parentNode.removeChild(Z)}catch(aa){return}J=true;var X=U.length;for(var Y=0;Y<X;Y++){U[Y]()}}function K(X){if(J){X()}else{U[U.length]=X}}function s(Y){if(typeof O.addEventListener!=D){O.addEventListener("load",Y,false)}else{if(typeof j.addEventListener!=D){j.addEventListener("load",Y,false)}else{if(typeof O.attachEvent!=D){i(O,"onload",Y)}else{if(typeof O.onload=="function"){var X=O.onload;O.onload=function(){X();Y()}}else{O.onload=Y}}}}}function h(){if(T){V()}else{H()}}function V(){var X=j.getElementsByTagName("body")[0];var aa=C(r);aa.setAttribute("type",q);var Z=X.appendChild(aa);if(Z){var Y=0;(function(){if(typeof Z.GetVariable!=D){var ab=Z.GetVariable("$version");if(ab){ab=ab.split(" ")[1].split(",");M.pv=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}else{if(Y<10){Y++;setTimeout(arguments.callee,10);return}}X.removeChild(aa);Z=null;H()})()}else{H()}}function H(){var ag=o.length;if(ag>0){for(var af=0;af<ag;af++){var Y=o[af].id;var ab=o[af].callbackFn;var aa={success:false,id:Y};if(M.pv[0]>0){var ae=c(Y);if(ae){if(F(o[af].swfVersion)&&!(M.wk&&M.wk<312)){w(Y,true);if(ab){aa.success=true;aa.ref=z(Y);ab(aa)}}else{if(o[af].expressInstall&&A()){var ai={};ai.data=o[af].expressInstall;ai.width=ae.getAttribute("width")||"0";ai.height=ae.getAttribute("height")||"0";if(ae.getAttribute("class")){ai.styleclass=ae.getAttribute("class")}if(ae.getAttribute("align")){ai.align=ae.getAttribute("align")}var ah={};var X=ae.getElementsByTagName("param");var ac=X.length;for(var ad=0;ad<ac;ad++){if(X[ad].getAttribute("name").toLowerCase()!="movie"){ah[X[ad].getAttribute("name")]=X[ad].getAttribute("value")}}P(ai,ah,Y,ab)}else{p(ae);if(ab){ab(aa)}}}}}else{w(Y,true);if(ab){var Z=z(Y);if(Z&&typeof Z.SetVariable!=D){aa.success=true;aa.ref=Z}ab(aa)}}}}}function z(aa){var X=null;var Y=c(aa);if(Y&&Y.nodeName=="OBJECT"){if(typeof Y.SetVariable!=D){X=Y}else{var Z=Y.getElementsByTagName(r)[0];if(Z){X=Z}}}return X}function A(){return !a&&F("6.0.65")&&(M.win||M.mac)&&!(M.wk&&M.wk<312)}function P(aa,ab,X,Z){a=true;E=Z||null;B={success:false,id:X};var ae=c(X);if(ae){if(ae.nodeName=="OBJECT"){l=g(ae);Q=null}else{l=ae;Q=X}aa.id=R;if(typeof aa.width==D||(!/%$/.test(aa.width)&&parseInt(aa.width,10)<310)){aa.width="310"}if(typeof aa.height==D||(!/%$/.test(aa.height)&&parseInt(aa.height,10)<137)){aa.height="137"}j.title=j.title.slice(0,47)+" - Flash Player Installation";var ad=M.ie&&M.win?"ActiveX":"PlugIn",ac="MMredirectURL="+O.location.toString().replace(/&/g,"%26")+"&MMplayerType="+ad+"&MMdoctitle="+j.title;if(typeof ab.flashvars!=D){ab.flashvars+="&"+ac}else{ab.flashvars=ac}if(M.ie&&M.win&&ae.readyState!=4){var Y=C("div");X+="SWFObjectNew";Y.setAttribute("id",X);ae.parentNode.insertBefore(Y,ae);ae.style.display="none";(function(){if(ae.readyState==4){ae.parentNode.removeChild(ae)}else{setTimeout(arguments.callee,10)}})()}u(aa,ab,X)}}function p(Y){if(M.ie&&M.win&&Y.readyState!=4){var X=C("div");Y.parentNode.insertBefore(X,Y);X.parentNode.replaceChild(g(Y),X);Y.style.display="none";(function(){if(Y.readyState==4){Y.parentNode.removeChild(Y)}else{setTimeout(arguments.callee,10)}})()}else{Y.parentNode.replaceChild(g(Y),Y)}}function g(ab){var aa=C("div");if(M.win&&M.ie){aa.innerHTML=ab.innerHTML}else{var Y=ab.getElementsByTagName(r)[0];if(Y){var ad=Y.childNodes;if(ad){var X=ad.length;for(var Z=0;Z<X;Z++){if(!(ad[Z].nodeType==1&&ad[Z].nodeName=="PARAM")&&!(ad[Z].nodeType==8)){aa.appendChild(ad[Z].cloneNode(true))}}}}}return aa}function u(ai,ag,Y){var X,aa=c(Y);if(M.wk&&M.wk<312){return X}if(aa){if(typeof ai.id==D){ai.id=Y}if(M.ie&&M.win){var ah="";for(var ae in ai){if(ai[ae]!=Object.prototype[ae]){if(ae.toLowerCase()=="data"){ag.movie=ai[ae]}else{if(ae.toLowerCase()=="styleclass"){ah+=' class="'+ai[ae]+'"'}else{if(ae.toLowerCase()!="classid"){ah+=" "+ae+'="'+ai[ae]+'"'}}}}}var af="";for(var ad in ag){if(ag[ad]!=Object.prototype[ad]){af+='<param name="'+ad+'" value="'+ag[ad]+'" />'}}aa.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+ah+">"+af+"</object>";N[N.length]=ai.id;X=c(ai.id)}else{var Z=C(r);Z.setAttribute("type",q);for(var ac in ai){if(ai[ac]!=Object.prototype[ac]){if(ac.toLowerCase()=="styleclass"){Z.setAttribute("class",ai[ac])}else{if(ac.toLowerCase()!="classid"){Z.setAttribute(ac,ai[ac])}}}}for(var ab in ag){if(ag[ab]!=Object.prototype[ab]&&ab.toLowerCase()!="movie"){e(Z,ab,ag[ab])}}aa.parentNode.replaceChild(Z,aa);X=Z}}return X}function e(Z,X,Y){var aa=C("param");aa.setAttribute("name",X);aa.setAttribute("value",Y);Z.appendChild(aa)}function y(Y){var X=c(Y);if(X&&X.nodeName=="OBJECT"){if(M.ie&&M.win){X.style.display="none";(function(){if(X.readyState==4){b(Y)}else{setTimeout(arguments.callee,10)}})()}else{X.parentNode.removeChild(X)}}}function b(Z){var Y=c(Z);if(Y){for(var X in Y){if(typeof Y[X]=="function"){Y[X]=null}}Y.parentNode.removeChild(Y)}}function c(Z){var X=null;try{X=j.getElementById(Z)}catch(Y){}return X}function C(X){return j.createElement(X)}function i(Z,X,Y){Z.attachEvent(X,Y);I[I.length]=[Z,X,Y]}function F(Z){var Y=M.pv,X=Z.split(".");X[0]=parseInt(X[0],10);X[1]=parseInt(X[1],10)||0;X[2]=parseInt(X[2],10)||0;return(Y[0]>X[0]||(Y[0]==X[0]&&Y[1]>X[1])||(Y[0]==X[0]&&Y[1]==X[1]&&Y[2]>=X[2]))?true:false}function v(ac,Y,ad,ab){if(M.ie&&M.mac){return}var aa=j.getElementsByTagName("head")[0];if(!aa){return}var X=(ad&&typeof ad=="string")?ad:"screen";if(ab){n=null;G=null}if(!n||G!=X){var Z=C("style");Z.setAttribute("type","text/css");Z.setAttribute("media",X);n=aa.appendChild(Z);if(M.ie&&M.win&&typeof j.styleSheets!=D&&j.styleSheets.length>0){n=j.styleSheets[j.styleSheets.length-1]}G=X}if(M.ie&&M.win){if(n&&typeof n.addRule==r){n.addRule(ac,Y)}}else{if(n&&typeof j.createTextNode!=D){n.appendChild(j.createTextNode(ac+" {"+Y+"}"))}}}function w(Z,X){if(!m){return}var Y=X?"visible":"hidden";if(J&&c(Z)){c(Z).style.visibility=Y}else{v("#"+Z,"visibility:"+Y)}}function L(Y){var Z=/[\\\"<>\.;]/;var X=Z.exec(Y)!=null;return X&&typeof encodeURIComponent!=D?encodeURIComponent(Y):Y}var d=function(){if(M.ie&&M.win){window.attachEvent("onunload",function(){var ac=I.length;for(var ab=0;ab<ac;ab++){I[ab][0].detachEvent(I[ab][1],I[ab][2])}var Z=N.length;for(var aa=0;aa<Z;aa++){y(N[aa])}for(var Y in M){M[Y]=null}M=null;for(var X in swfobject){swfobject[X]=null}swfobject=null})}}();return{registerObject:function(ab,X,aa,Z){if(M.w3&&ab&&X){var Y={};Y.id=ab;Y.swfVersion=X;Y.expressInstall=aa;Y.callbackFn=Z;o[o.length]=Y;w(ab,false)}else{if(Z){Z({success:false,id:ab})}}},getObjectById:function(X){if(M.w3){return z(X)}},embedSWF:function(ab,ah,ae,ag,Y,aa,Z,ad,af,ac){var X={success:false,id:ah};if(M.w3&&!(M.wk&&M.wk<312)&&ab&&ah&&ae&&ag&&Y){w(ah,false);K(function(){ae+="";ag+="";var aj={};if(af&&typeof af===r){for(var al in af){aj[al]=af[al]}}aj.data=ab;aj.width=ae;aj.height=ag;var am={};if(ad&&typeof ad===r){for(var ak in ad){am[ak]=ad[ak]}}if(Z&&typeof Z===r){for(var ai in Z){if(typeof am.flashvars!=D){am.flashvars+="&"+ai+"="+Z[ai]}else{am.flashvars=ai+"="+Z[ai]}}}if(F(Y)){var an=u(aj,am,ah);if(aj.id==ah){w(ah,true)}X.success=true;X.ref=an}else{if(aa&&A()){aj.data=aa;P(aj,am,ah,ac);return}else{w(ah,true)}}if(ac){ac(X)}})}else{if(ac){ac(X)}}},switchOffAutoHideShow:function(){m=false},ua:M,getFlashPlayerVersion:function(){return{major:M.pv[0],minor:M.pv[1],release:M.pv[2]}},hasFlashPlayerVersion:F,createSWF:function(Z,Y,X){if(M.w3){return u(Z,Y,X)}else{return undefined}},showExpressInstall:function(Z,aa,X,Y){if(M.w3&&A()){P(Z,aa,X,Y)}},removeSWF:function(X){if(M.w3){y(X)}},createCSS:function(aa,Z,Y,X){if(M.w3){v(aa,Z,Y,X)}},addDomLoadEvent:K,addLoadEvent:s,getQueryParamValue:function(aa){var Z=j.location.search||j.location.hash;if(Z){if(/\?/.test(Z)){Z=Z.split("?")[1]}if(aa==null){return L(Z)}var Y=Z.split("&");for(var X=0;X<Y.length;X++){if(Y[X].substring(0,Y[X].indexOf("="))==aa){return L(Y[X].substring((Y[X].indexOf("=")+1)))}}}return""},expressInstallCallback:function(){if(a){var X=c(R);if(X&&l){X.parentNode.replaceChild(l,X);if(Q){w(Q,true);if(M.ie&&M.win){l.style.display="block"}}if(E){E(B)}}a=false}}}}();
(function(root, I) {

    root.base_root = root.base_root || I.base_root();
    root.base_path = root.base_path || I.base_path();
    root.forceFlash = false;

    //root.vars = root.vars || {};
    var re = /(?=.*infomous\.com)(?=.*\/client\/embed\.js)/;
    var tag = I.get_script_tag(re);
    var vars = I.get_url_params(tag.src);
    
    //console.log('*** embed ***', 'tag', tag, 'vars', vars);

    root.params = root.params || {
        allowFullScreen: true,
        allowScriptAccess: 'always',
        bgcolor: typeof(vars.colBackground) == 'undefined' ? "#FAFAFA" : vars.colBackground.replace('0x', '#')
    };

    vars.target = vars.target || 'infomous';
    vars.type = vars.type || 'rss';
    vars.width = I.css_size(vars.width) || '400';
    vars.height = I.css_size(vars.height) || '300';

    I.esc(vars);
    //I.$ready();

    var proxy,
        target,
        user_cb = root.infomous_load;

    root.infomous_load = function(platform) {
        proxy = new CloudProxy(platform, vars, 'embed_proxy');
        
        //console.log('*** embed infomous_load ***', 
                //'proxy.config===vars', proxy.config===vars,
                //'vars', vars);

        if ( typeof user_cb === 'function' )
            user_cb(platform, vars);
    } 

    I.sequence(
        check_target,
        check_frame, 
        fix_size, 
        loadFlash 
    );

    function check_target(next) {
        
        (function _check_target() {
            target = document.getElementById(vars.target);
            if (target)
                next();
            else
                setTimeout(_check_target, 100);
        })();
    }

    function check_frame(next) {
        
        if ( ! I.bool( vars.setFrame ) ) {
            next();	
            return;
        }

        I.require('CloudFrame', function() {
            _add_frame();
            next();
        });

        function _add_frame() {
            var frame = new CloudFrame({
                width: vars.width,
                height: vars.height,
                nid: vars.nid,
                title: vars.title
            });
            frame.add_to_dom( target );
            frame.on('click', function(e) {
                //ux event format: action, link_url
                proxy.send_event( e.id+'_button', e.url );
            });
            vars.height = frame.css_size().cloud.height;
        }
    }

    //against coulisse fx
    function fix_size(next) {

        target.style.width = I.css_size( vars.width );
        target.style.height = I.css_size( vars.height );
        target.style.position = 'relative';

        next();
    }	

    function loadFlash() {
        //pass flash a version of vars with no dimensions to avoid problems with %
        var flashvars = {};
        for(var v in vars) flashvars[v] = encodeURIComponent(vars[v]);
        delete flashvars.width;
        delete flashvars.height;

        if ( (navigator.userAgent.indexOf('Android') != -1 || vars.platform == 'js') && forceFlash == false) 
            loadJS();
        else 
            swfobject.embedSWF(base_path + "infomous2.swf", vars.target, vars.width, vars.height, "10.0.0", false, flashvars, params, null, so_callback);

        function so_callback(e) {
            if (e.success)
                return;
            if (vars.flashOnly) {
                document.getElementById(vars.target).innerHTML = '<div class="flashOnly">Sorry, this cloud can only be viewed in devices that support Flash</div>';
            }
            else loadJS();
        }
    } 

    function loadJS() {
        I.require('CloudJS', function() {
            root.infomous_js = new CloudJS(vars);
        });
    }

})(this, Infomous);
