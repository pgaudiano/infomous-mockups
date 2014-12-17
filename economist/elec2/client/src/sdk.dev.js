
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

        //seach for infomous.com and /client/
        var re = /(?=.*infomous\.com)(?=.*\/client\/)/,
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

I.$ready = function() {
    I.$ = jQuery.noConflict();
}

//TODO replace get_script_url by get_script_tag

I.get_script_url = function(re) { return I.get_script_tag(re).src; }

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

//TODO support recursiveness?
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

var _log_enabled = /dev3/.test( I.base_root() );

})(this, window, Infomous, undefined);

