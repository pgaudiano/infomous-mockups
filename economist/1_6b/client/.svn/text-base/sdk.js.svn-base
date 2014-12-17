
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

