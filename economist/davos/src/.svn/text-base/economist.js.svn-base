
(function(root) {

var config = { 
    version: 'davos' //TODO update this to 'davos' when available
}

var _vars_ec = {

    ec_tabs: 'davos,readerscomments', //TODO put this in config

    loadAtStart: false,
    setInterfaceType: 'widget',
    setFrame: false,

    'query:campaign': 'noAds',

    'query:cAuthors': true,
    'query:cFeed': false,
    'query:cFeedLink': 'none',

    adsPosition: 'bottom',
    skin: 'economist',

    linkageThreshold: 1,
    setPanels: 'words,blobs,status,branding',
    setShowReset: true,
    setShowErrors: false,
    brandLogoPosition: 'top left',
    title: 'The Economist Opinion Cloud', 
    description: '',
    groups: 1,
    fontScale: 1,
    zoom: 1,
    dict: 'NOUN|1,VERB|0,ADJECTIVE|0,ADVERB|0,NUMBER|0,OTHER|1',
    setMinutesToReload: 15,

    trackOmniture: false,
    trackGoogle: true,
    trackGAAccount: 'UA-20995290-1'
};

/*
 * Infomous sdk utils copy
 */

var _I = {};

_I.get_script_urls = function(re) {
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

_I.get_url_params = function(url, sep) {
    if (sep === undefined && typeof url === 'string' && url.length === 1) {
        sep = url;
        url = undefined;
    }
    url = url || _I.href(); 
    sep = sep || '?';
    var query = url.split(sep);
    if (query.length == 1)
        return {};
    query = query[1];
    var args = query.split('&'),
        i = args.length,
        params = {};
    while (i--) {
        if ( _I.is_empty( args[i] ) )
            continue;
        var kv = args[i].split('=');
        params[ kv[0] ] = kv[1]; 
    }
    return params;
}

_I.href = function() {
    var url;
    try { url = window.top.location.href; }
    catch (err) { }
    return url || document.referrer;
}

_I.is_empty = function(obj) {
    
    if (obj === null || obj === undefined) 
        return true;
    
    if ( typeof obj === 'string' ) return obj.replace(/\s/g,'') === ''; 
    //if ( I.is_array(obj) ) return obj.length === 0;
    //if ( I.is_str(obj) ) return obj.replace(/\s/g,'') === ''; 
    //if ( I.is_num(obj) ) return false;

    for (var key in obj) 
        if (obj.hasOwnProperty(key)) 
            return false;
    
    return true;
}

_I.esc = function(data) {
    if ( Object.prototype.toString.call(data) === "[object Object]" ) {
        for (var k in data) 
            data[k] = _esc(data[k]);
    }
    else return _esc(data);

    function _esc(d) {
        if ( ! Object.prototype.toString.call(d) == "[object String]" ) return d;
        return d.replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
    }
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

/* end of Infomous sdk utils copy */

/*
 * economist app
 */

var I, $, proxy, ga, cloud_width;

root.infomous_load = function(platform, vars) {

    I = Infomous;

    I.require('jquery', function() {

        $ = I.$;

        proxy = new I.CloudProxy(
            platform, vars, 'economist_proxy');

        ga = new I.GAtracker({
            name: 'infomous_economist', 
            account: vars.trackGAAccount
        });

        cloud_width = parseInt(vars.width);

        init();
    });
}

/*
 * embed.js snippet
 * always after infomous_load global definition
 */

var _ec_tag = _I.get_script_urls(/economist_cloud\.js/)[0];
var _ec_path = (function() {
    var server = /dev3\.infomous\.com/.test( _I.href() ) ? 'dev3' : 'economist';
    var base = 'http://'+ server +'.infomous.com/site/economist/'+ config.version +'/';
    return {
        //css: base+'economist.css',
        embedjs: base+'client/embed.js?'
    };
})();

var _vars = _I.get_url_params( _ec_tag );
var _params = _I.get_url_params();

_I.esc(_vars);
_I.esc(_params);

for (var k in _vars_ec)
    _vars[k] = _vars_ec[k];

window.params = {
    allowFullScreen: true,
    allowScriptAccess: "always",
    wmode: "opaque",
    bgcolor: "#D9E4E6"
};

//go...

load_js_file( _ec_path.embedjs + hash2query(_vars), function(){} );

/* end of embed.js snippet sim */


/*
 * economist app
 */

function hash2query( hash ) {
    var query = '';
    for (var k in hash)
        query += k + '=' + hash[k] + '&';
    return query;
}

function get_full_cloud_url() {
    
    var trail = '/conversation-cloud';
    var href = window.location.href;

    if ( /economist\.com/.test(href) )
        return trail;
    
    var arr = href.split('/');
    if ( ! /\./.test( arr[arr.length-1] ) ) //url is not a file
        return href + trail; 
    
    return arr.slice(0,-1).join('/') + trail;
}

function is_full_version() {
    return cloud_width > 450;
}

function set_logo(url, title) {
    var bld = _vars.brandLogoDestination;
    url = bld !== undefined ? decodeURIComponent(bld) : url;
    proxy.set_var('brandLogoDestination', url);
    proxy.set_var('brandLogoText', title);
}

function init() { 

    var sections = (function() {

        var _curr = undefined;
        
        var _list = {

            readerscomments: {
                
                ga_event: 'Readerscomments',
                title: 'Readers\' comments',
                
                update: function( daysback ) {

                    set_logo('http://www.infomous.com/site/economist', 'Powered by Infomous and Appinions');
                    
                    proxy.set_var('type', 'jodange');
                    //colors
                    proxy.set_vars( this.colors );
                    //del aggregator
                    proxy.set_vars({
                        agg: undefined,
                        sinceLast: undefined,
                        feeds: 'undefined'
                    });
                    //set appinions
                    proxy.set_vars({
                        fromDaysBack: daysback,
                        toDaysBack: 0,
                        'query:numOpinions': '2500',
                        'query:licensee': 'jodange',
                        'query:campaign': 'noAds',
                        'query:blocked': 'Polish,Russian,American,European,Libyan,French,Indian,Chinese,German,Turkish,Japanese,British,Nepali,Canadian'
                    });
                    //req
                    proxy.make_request();
                },

                colors: { 
                    colWord: '0x000000',
                    colWordHover: '0xFFFFFF',
                    colWordFade: '0x333333',
                    colWordHoverLinked: '0x000000',
                    colBackground: '0xD9E4E6',
                    colHoverBox: '0x08526D',
                    colFocusBox: '0xFFFFFF',
                    colFocusBorder: '0x08526D',
                    colBlob: '0xFFFFFF',
                    colBlobHover: '0x96AFAE',
                    colBlobBorder: '0x86A1A8',
                    colLink: '0x86A1A8',
                    colLinkHover: '0xFF0000',
                    colSourcesFill: '0xFFFFFF',
                    colSourcesLine1: '0x08526D',
                    colSourcesLine2: '0x08526D',
                    colSourcesTextHover: '0x488CA7',
                    colSourcesBorder: '0x488CA7'                    
                }
            },

            electionism: {
                
                ga_event: 'Election2012',
                title: 'Election 2012 tweets',

                update: function( daysback ) {

                    set_logo('http://www.infomous.com/site/economist/electionism.html', 'Powered by Infomous');

                    proxy.set_var('type', 'rss');
                    //colors
                    proxy.set_vars( this.colors );
                    //del appinions
                    proxy.set_vars({
                        fromDaysBack: undefined,
                        toDaysBack: undefined
                    });
                    //set aggregator
                    proxy.set_vars({
                        agg: 'yes',
                        sinceLast: daysback+'d',
                        'query:num': '2500',
                        'query:campaign' : 'electionism',
                        feeds: 'http://api.twitter.com/1/lists/statuses.atom?slug=latest-from-twitter&owner_screen_name=Electionism&per_page=100&include_entities=true&infcutbef=:%20'
                    });
                    //req
                    proxy.make_request();
                },

                colors: {
                    colBackground: '0xD9E4E6',
                    colHoverBox: '0xBF0A30',
                    colFocusBox: '0xFFFFFF',
                    colSourcesFill: '0xFFFFFF',
                    colSourcesLine1: '0x08526D',
                    colSourcesLine2: '0x08526D',
                    colSourcesTextHover: '0x488CA7',
                    colSourcesBorder: '0x488CA7',                            
                    colWordHighlighted: '0x005BED',
                    colWord: '0x002868',
                    colWordHover: '0xFFFFFF',
                    colWordFade: '0xFFB0B0',
                    colWordHoverLinked: '0x005BED',
                    colFocusBorder: '0x005BED',
                    colLink: '0xFFE0E0',
                    colLinkHover: '0xDEF1FF',
                    colBlob: '0xFFFFFF',
                    colBlobBorder: '0xBF0A30',
                    colBlobHover: '0xAAAAAA'
                }
            },

            davos: {
                
                ga_event: 'Davos2013',
                title: 'Davos Tweets',

                update: function( daysback ) {

                    set_logo('http://www.infomous.com/site/economist/davos.html', 'Davos 2013 Cloud by Infomous');

                    proxy.set_var('type', 'rss');
                    //colors
                    proxy.set_vars( this.colors );
                    //del appinions
                    proxy.set_vars({
                        fromDaysBack: undefined,
                        toDaysBack: undefined
                    });
                    //set aggregator
                    proxy.set_vars({
                        agg: 'yes',
                        sinceLast: daysback+'d',
                        'query:num': '2500',
                        'query:campaign' : 'davos',
                        feeds: 'http://api.twitter.com/1/lists/statuses.atom?slug=davos&owner_screen_name=InfomousLists&per_page=100&include_entities=true'
                    });
                    //req
                    proxy.make_request();
                },

                colors: {
                    colBackground: '0xD9E4E6',
                    colHoverBox: '0xBF0A30',
                    colFocusBox: '0xFFFFFF',
                    colSourcesFill: '0xFFFFFF',
                    colSourcesLine1: '0x08526D',
                    colSourcesLine2: '0x08526D',
                    colSourcesTextHover: '0x488CA7',
                    colSourcesBorder: '0x488CA7',                            
                    colWordHighlighted: '0x005BED',
                    colWord: '0x002868',
                    colWordHover: '0xFFFFFF',
                    colWordFade: '0xFFB0B0',
                    colWordHoverLinked: '0x005BED',
                    colFocusBorder: '0x005BED',
                    colLink: '0xFFE0E0',
                    colLinkHover: '0xDEF1FF',
                    colBlob: '0xFFFFFF',
                    colBlobBorder: '0xBF0A30',
                    colBlobHover: '0xAAAAAA'
                }
            }

        };
        
        return {

            has: function( section ) {
                return _list[section] !== undefined;
            },

            curr: function( section ) { 
                if (section === undefined)
                    return _list[_curr];
                _curr = section;
            },

            curr_id: function() { return _curr; },

            make_el: function( id ) {
                if ( ! sections.has(id) )
                    return undefined;
                return $('<a id="' + id + '" href="javascript:void(0);"><span>' + _list[id].title + '</span></a>');
            }
        }
    })();

    var $container = $('#infomous-cloudContainer');
    var $sections_container = $('#infomous-cloudSections');
    var $periodbar = $('#infomous-cloudPeriodBar');
    var $periodbt = $('#cloud-period-bt');
    var $fullbt = $('#cloud-full-bt');
    var $dates = $periodbar.find('.date');
    //var $footer = $('#infomous-cloudFooter');
    //var $periodtxt = $periodbt.find('span');

    //var $sections = $sections_container.find('.section'); 
    var $sections = add_sections( 
            section2arr( get_tabs() ),
            $sections_container
        );

    $sections.click( function() {
        goto_section( $(this).attr('id') );
        ga.track_event({
            action: 'menu_tab',
            label: sections.curr().ga_event
        });
    });

    $dates.click( function() {
        goto_date( $(this).attr('id') );
    }); 
    
    $container.css( 'width', I.css.size(cloud_width) );
    
    $periodbar.hide();
    //$periodbar.css('left', ($periodbar.parent().width()/2 - $periodbar.width()/2) );

    $periodbt.click( toggle_periodbar );
    $periodbar.find('img').click( toggle_periodbar );

    update_period_text(); 

    goto_section( get_ini_tab() );

    function add_sections( arr, $container ) {

        var i, id, $el;
        for (i = 0; i < arr.length; i++) {
            id = arr[i];
            $el = sections.make_el( id );
            if ( !$el ) continue;
            $el.addClass('section');
            if ( i === 0 )
                $el.addClass('active');

            $container.append( $el ); 
        }

        return $container.find('.section');
    }

    function toggle_periodbar() {
        if ( $periodbar.is(':visible') )
            $periodbar.fadeOut(400, update_period_text );
        else
            $periodbar.fadeIn(400, update_period_text );
    }

    function update_period_text() {
        //if ( $periodbar.is(':visible') )
            //$periodtxt.text('Hide time span');
        //else
            //$periodtxt.text('Show time span');
    }

    function update_full_bt() {

        if ( is_full_version() ) {
            $fullbt.hide();
            return;
        }
        
        var _curr = sections.curr_id();
        var _url = get_full_cloud_url();

        $fullbt.click( function() {
            $(this).attr( 'href', _url+'?days=1&ec_ini_tab='+_curr+'&ec_tabs='+get_tabs() );
        });

        $fullbt.show();
    }

    function goto_section(id) {

        if ( ! sections.has(id) )
            return;

        var $el = $('#'+id);
        
        if ( !$el.length )
            return;

        sections.curr( id );
        
        $sections.removeClass('active');
        $el.addClass('active');

        //set default period:
        
        var def_daysback = 1;

        sections.curr().update( def_daysback );
        
        update_full_bt();

        $dates.removeClass('activeDate');
        $periodbar.find('#daysback_'+def_daysback).addClass('activeDate');

        ga.track_page( sections.curr().ga_event );
    };

    function goto_date(id) {

        var $el = $('#'+id);

        if ( !$el.length )
            return;

        var daysback = parseInt( id.split('_').pop() );
        
        sections.curr().update( daysback );

        update_full_bt();

        $dates.removeClass('activeDate');
        $el.addClass('activeDate');
    } 

    function get_ini_tab() {

        var key = 'ec_ini_tab';

        var checks = []
            .concat( section2arr( _params[key] ) )
            .concat( section2arr( _vars[key] ) )
            .concat( section2arr( get_tabs() ) );

        for (var i = 0; i < checks.length; i++)
            if ( _valid( checks[i] ) )
                return checks[i];

        return undefined;

        function _valid( _id ) {
            return ! I.is_empty(_id) && sections.has(_id);
        } 
    } 

    function get_tabs() {

        var key = 'ec_tabs';

        var checks = [
            _params[key],
            _vars[key],
            'davos,electionism,readerscomments'
        ];

        for (var i = 0; i < checks.length; i++)
            if ( checks[i] )
                return checks[i];

        return undefined;
    }

    function section2arr( str ) {
        return I.is_str(str) ? str.split(',') : [];
    }
}

})(window);
