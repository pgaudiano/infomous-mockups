
/*!
 * Infomous JS SDK
 * http://www.infomous.com/
 */

(function(root, window, document, undefined) {

var I = {};

I.log = function() {

    if ( !_log_enabled || typeof console === 'undefined' ) 
        return;

    if ( I.device.ios() )
        console.log( ['[infomous]'].concat(arguments).join(' ') );
    else if (typeof console.log.apply === 'function')
        console.log.apply( console, ['[infomous]'].concat(arguments) );
}

I.log_enable = function(val) { _log_enabled = val; }

I.base_root = function() {	

    var snippet = I.get_snippets()[0];

    if (snippet) 
        return snippet.get_base_root();

    var loc = window.location;
    return /infomous\.com/.test(loc.hostname) ? loc.protocol+'//'+loc.hostname+'/' : '';
}

//get path to client

I.base_path = function() {

    var snippet = I.get_snippets()[0];

    if (snippet) 
        return snippet.get_base_path();

    return I.base_root() + 'client/';
}

var _snippets = 
{
    _default: 
    {
        get_urls: function() {
            return I.get_script_urls(/infomous\.com/);
        },
        get_base_path: function( url ) {
            return url.split('/',3).join('/')+'/client/';
        },
        get_base_root: function( url ) {
            return url.split('/',3).join('/')+'/';
        }
    },   
    //xxx.infomous.com/.../client/embed.js
    embed_js: 
    {
        get_urls: function() {
            return I.get_script_urls(/(?=.*infomous\.com)(?=.*embed\.js)/);
        },
        get_base_path: function( url ) {
            return url.split('/').slice(0,-2).join('/')+'/client/';
        }
    },
    //xxx.infomous.com/cloud/get?[vars]
    cloud_get: 
    {
        get_urls: function() {
            return I.get_script_urls(/(?=.*infomous\.com)(?=.*cloud\/get)/);
        }
    },
    //xxx.infomous.com/cloud_widget/[nid]
    cloud_widget: 
    {
        get_urls: function() {
            return I.get_script_urls(/(?=.*infomous\.com)(?=.*cloud_widget)/);
        }
    },
    //xxx.infomous.com/cloud/fullscreen/[nid]
    cloud_fullscreen: 
    {
        get_urls: function() {
            return I.get_script_urls(/(?=.*infomous\.com)(?=.*cloud\/fullscreen)/);
        }
    }
    //relative: /client/embed.js
    //make this check only if we are sure the we are in an infomous site
    //social_site:
    //{
        //get_urls: function() {
            //re = has /client/embed.js/ but not /infomous.com/
            //return I.get_script_urls(/client\/embed\.js/);
        //}
    //}
};

//set default snippets

for (var _k in _snippets) {
    if ( _k === '_default' )
        continue;
    for (var _d in _snippets._default) {
        if ( _snippets[_k][_d] === undefined )
            _snippets[_k][_d] = _snippets._default[_d];
    }
}
delete _snippets._default;

I.get_snippets = function() {
    var snips = [];
    for (var k in _snippets) {
        var urls = _snippets[k].get_urls();
        for (var i = 0; i < urls.length; i++) {
            var url = urls[i];
            snips.push({
                id: k,
                url: url,
                get_base_path: function() {
                    return _snippets[this.id].get_base_path( url );
                },
                get_base_root: function() {
                    return _snippets[this.id].get_base_root( url );
                }
            });
        }
    }
    return snips;
}

//I.get_embed_tags = function() {
    //return I.get_script_urls(/((?=.*infomous\.com)(?=.*embed\.js)|(?=.*infomous\.com)(?=.*cloud\/get))/);
//}

//I.get_script_tags = function(re) {
    //var scripts = document.getElementsByTagName('script'),
        //el, src; 
    //var tags = [];
    //for (var i = 0; i < scripts.length; i++) {
        //el = scripts[i];
        //src = el.getAttribute ? el.getAttribute('src') : el.src;
        //if (src && re.test(src)) 
            //tags.push( { src: src, el: el } );
    //}	
    //return tags;
//}

I.get_script_urls = function(re) {
    var scripts = document.getElementsByTagName('script'),
        el, src; 
    var urls = [];
    for (var i = 0; i < scripts.length; i++) {
        el = scripts[i];
        src = el.getAttribute ? el.getAttribute('src') : el.src;
        if (src && re.test(src)) 
            urls.push( src );
    }	
    return urls;
}

I.get_url_params = function(url, sep) {
    if (sep === undefined && I.is_str(url) && url.length === 1) {
        sep = url;
        url = undefined;
    }
    url = url || I.href(); 
    sep = sep || '?';
    var query = url.split(sep);
    if (query.length == 1)
        return {};
    query = query[1];
    var args = query.split('&'),
        i = args.length,
        params = {};
    while (i--) {
        if ( I.is_empty( args[i] ) )
            continue;
        var kv = args[i].split('=');
        params[ kv[0] ] = kv[1]; 
    }
    return params;
}

I.href = function() {
    var url;
    try { url = window.top.location.href; }
    catch (err) { }
    return url || document.referrer;
}

/**
 * loads required js/css external files in runtime
 * @param 
 * {Array|string} array of dependencies or single dependency string
 * {Function} files loading complete callback
 */

var deps_cfg = (function() { 

    var base_path = I.base_path();

    function less_than(ver, req) {
        var _ver = ver.split('.');
        var _req = req.split('.');
        for (var i = 0; i < _req.length; i++) {
            if ( parseInt(_ver[i]) === parseInt(_req[i]) )
                continue;
            return parseInt(_ver[i]) < parseInt(_req[i]);
        }
        return false;
    }

    return {	

        'jquery': {
            files: [ 
                base_path+'lib/jquery.js' 
            ],
            on_loaded: function() {
                I.$ = root.jQuery.noConflict();
            },
            is_loaded: function() {
                if ( I.$ ) return true;
                if ( !root.jQuery ) return false;
                //has jQuery but not I.$ ...
                if ( ! less_than( root.jQuery.fn.jquery, '1.4.3' ) ) {
                    I.$ = root.jQuery.noConflict();
                    return true;
                }
                return false;
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
                    //return I.$.ui.version === '1.8.16';
                    return ! less_than(I.$.ui.version, '1.8.16');
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
                return !! I.CloudJS;
            }
        },

        'CloudToolbar': {
            files: [
                'jquery-ui',
                base_path+'cloud_gui.css',
                base_path+'cloud_gui.js'
            ],
            is_loaded: function() {
                return !! I.CloudToolbar;
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
                return !! I.CloudFrame;
            }
        }

        //'CloudProxy': {
            //files: [ base_path+'cloud_proxy.js' ],
            //is_loaded: function() {
                //return typeof CloudProxy !== 'undefined';
            //}
        //}
    };
})();

I.define = function(name, ctor) {
    I[name] = ctor;
    //FIXME backwards compatibility, do we really need this?
    var _g = [ 'CloudProxy', 'GAtracker' ];
    for ( var k in _g )
        if (_g[k] === name)
            root[name] = ctor;
}

// TODO 
// implement AMD
// mirror requirejs args
// add fail callback

I.require = function(deps, on_complete) {

    deps = I.to_arr(deps);
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
    return I.extend( obj, new I.Events() );
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
                dst[k] = I.is_arr(src[k]) ? [] : {};
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

//https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object/freeze

I.freeze = function(o, deep) {
    if ( typeof Object.freeze !== 'function' )
        return;
    Object.freeze(o);
    if ( !deep )
        return;
    for (var k in o) {
        if ( !o.hasOwnProperty(k) || !(typeof o === "object") ) {
            // If the object is on the prototype, not an object 
            // skip it. 
            continue;
        }
        I.freeze( o[k] ); // Recursively call deepFreeze.
    }
}

I.bind = function(fn, ctx) {
    if ( !I.is_fn(fn) )
        return undefined;
    ctx = ctx || {};
    return function() {
        return fn.apply( ctx, [].slice.call(arguments) );
    };
}

I.is_arr = function(obj) {
    return Object.prototype.toString.call(obj) == "[object Array]";
}

I.is_obj = function(obj) {
    return Object.prototype.toString.call(obj) == "[object Object]";
}

I.is_fn = function(obj) {
    return Object.prototype.toString.call(obj) == "[object Function]";
}

I.is_str = function(obj) {
    return Object.prototype.toString.call(obj) == "[object String]";
}

I.is_num = function(obj) {
    return Object.prototype.toString.call(obj) == "[object Number]";
}

I.bool = function(val) {
    return (/^true$/i).test(val) || (/^1$/i).test(val);
}

I.is_empty = function(obj) {
    
    if (obj === null || obj === undefined) 
        return true;
    
    if ( I.is_arr(obj) ) return obj.length === 0;
    if ( I.is_str(obj) ) return obj.replace(/\s/g,'') === ''; 
    if ( I.is_num(obj) ) return false;

    for (var key in obj) 
        if (obj.hasOwnProperty(key)) 
            return false;
    
    return true;
}

I.to_arr = function(obj) {
    return I.is_arr(obj) ? obj : [obj];
}

I.contains = function(arr, obj) {
    return I.indexof(arr, obj) != -1;
}

I.add_unique = function(arr, obj) {
    if ( I.contains(arr, obj) ) 
        return 0;
    return arr.push(obj);
}

I.remove = function(arr, obj) {
    if ( !I.is_arr(arr) )
        return undefined;
    var i = I.indexof(arr,obj);
    if (i === -1)
        return undefined;
    return arr.splice(i,1)[0];
}

//Array.indexOf for IE
I.indexof = function(arr, obj) {	

    if (!I.is_arr(arr)) 
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

    seq = I.to_arr(seq);
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

/*
 * clouds module
 */

var _clouds = {};

I.clouds = { 

    add: function( _cloud ) {
        var id = _cloud.id();
        if ( I.is_empty(id) )
            return;
        I.clouds.remove( id );
        _clouds[id] = _cloud; 
    },
    
    get: function( id ) {
        //get the first one
        if ( !id ) 
            for (var k in _clouds) 
                return _clouds[k];
        return _clouds[id];
    },

    remove: function( id ) {
        try { _clouds[id].dispose(); }
        catch(err) { }
        _clouds[id] = undefined;
        delete _clouds[id];
    }

};

/*
 * css module
 */

I.css = {};

I.css.get = function(file_str, rule_str) {

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

I.css.size = function(size) {
    return size ? (I.css.is_abs_size(size) ? parseInt( size ) + 'px' : size) : undefined;
}

I.css.is_abs_size = function(size) {
    return size.toString().indexOf('%') == -1;
}

I.css.attach = function(css_str) {
    css_str = I.esc(css_str);
    if ( ! I.is_str(css_str) )
        return;
    //attach css text to head with IE support
    //http://stackoverflow.com/questions/3922139/add-css-to-head-with-javascript
    //http://www.quirksmode.org/bugreports/archives/2006/01/IE_wont_allow_documentcreateElementstyle.html
    var div = document.createElement('div');
    div.innerHTML = '<p></p><style>' + css_str + '</style>';
    document.getElementsByTagName('head')[0].appendChild(div.childNodes[1]);
}

/*
 * aggregator module
 */

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
        offset = offset || {};
        var from = from || new Date;
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

/*
 * bus module 
 * dynamic
 * to talk with other app parts...
 */

I.bus = {
    flash: {},
    drupal: {}
};

/*
 * device detection module
 */

I.device = (function() {
    
    var ua = navigator.userAgent;

    return {
        android: function() {
            return /Android/i.test(ua);
        }, 
        iphone: function() {
            return /iPhone/i.test(ua);
        },
        ipod: function() {
            return /iPod/i.test(ua);
        },
        ipad: function() {
            return /iPad/i.test(ua);
        },
        ios: function() {
            return this.iphone() || this.ipod() || this.ipad();
        },
        blackberry: function() {
            return /BlackBerry/i.test(ua);
        },
        mobile: function() {
            return /Mobile/i.test(ua);
        },
        osx: function() {
            return /Mac OS X/i.test(ua);
        },
        win: function() {
            return /Windows/i.test(ua);
        },
        str: function() { 
            for (var k in this) 
                if ( k !== 'str' && this[k]() ) 
                    return k;
            return 'device-not-found';
        }
    }
})();

var _log_enabled = /dev3|staging/.test( I.base_root() );

root.Infomous = I;

})(this, window, document, undefined);

