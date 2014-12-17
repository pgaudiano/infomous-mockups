
(function(root) {

/*
 * Infomous sdk utils copy
 */

function get_script_tag(re) {
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

function get_url_params(url, sep) {
    if (sep === undefined && typeof url ==='string' && url.length === 1) {
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

function get_href() {
    try {
        return window.top.location.href;
    }
    catch (err) {
        return document.referrer;
    }
    return window.location.href;
}

function config_to_query(config) {
    var query = '';
    for (var k in config)
        query += k + '=' + config[k] + '&';
    return query;
}

function esc(data) {
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

/* end of Infomous sdk utils copy */


/*
 * economist app
 */

var I, $, proxy,
    cloud_width,
    ga;

root.infomous_load = function(platform, vars) {

    Infomous.require('jquery', function() {

        I = Infomous;
        $ = I.$;

        proxy = new CloudProxy(platform, vars, 'economist_proxy');
        ga = new GAtracker('infomous_economist', vars.trackGAAccount);

        cloud_width = parseInt(proxy.config.width);

        init();
    });
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

function init() { 

    var $container = $('#infomous-cloudContainer');
    var $periodbar = $('#infomous-cloudPeriodBar');
    var $periodbt = $('#cloud-period-bt');
    var $fullbt = $('#cloud-full-bt');
    var $sections = $('#infomous-cloudSections .section');
    var $dates = $periodbar.find('.date');
    //var $footer = $('#infomous-cloudFooter');
    //var $periodtxt = $periodbt.find('span');

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

    function goto_section(id) {

        if ( sections[id] === undefined )
            return;

        var $el = $('#'+id);
        
        if ( !$el.length )
            return;

        sections.curr( id );
        
        $sections.removeClass('active');
        $el.addClass('active');

        //set default period:
        
        sections.curr().update( 1 );

        $dates.removeClass('activeDate');
        $periodbar.find('#daysback_1').addClass('activeDate');

        ga.track_page();
    };

    function goto_date(id) {

        var $el = $('#'+id);

        if ( !$el.length )
            return;

        var daysback = parseInt( id.split('_').pop() );
        
        sections.curr().update( daysback );

        $dates.removeClass('activeDate');
        $el.addClass('activeDate');
    }

    function set_logo(url, title) {
        var bld = _vars.brandLogoDestination;
        url = bld !== undefined ? decodeURIComponent(bld) : url;
        proxy.set_var('brandLogoDestination', url);
        proxy.set_var('brandLogoText', title);
    }

    function get_init_section() {

        //move to section dynamically according to url params or proxy.config
        
        var params = I.get_url_params();

        if ( _valid(params.section) ) {
            return params.section;
        }
        else if ( _valid(proxy.config.section) ) {
            return proxy.config.section;
        }
        else 
            return 'electionism'; //default

        function _valid(section_id) {
            return section_id !== undefined && sections[section_id] !== undefined;
        }
    }

    var sections = (function() {

        var _curr = undefined;
        
        return {

            curr: function( section ) { 
                if (section === undefined)
                    return this[_curr];
                _curr = section;
            },

            curr_id: function() { return _curr; },

            electionism: {
                
                ga_event: 'Election2012',

                update: function( daysback ) {
                    this.update_ui();
                    this.update_cloud( daysback ); 
                },

                update_ui: function() {
                    
                    if ( is_full_version() ) {
                        $fullbt.hide();
                        return;
                    }

                    var url = get_full_cloud_url();

                    $fullbt.click( function() {
                        $(this).attr( 'href', url+'?days=1&section='+_curr );
                    });

                    $fullbt.show();
                },

                update_cloud: function( daysback ) {
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

            readerscomments: {
                
                ga_event: 'Readerscomments',
                
                update: function( daysback ) {
                    this.update_ui();
                    this.update_cloud( daysback ); 
                },

                update_ui: function() {

                    if ( is_full_version() ) {
                        $fullbt.hide();
                        return;
                    }

                    var url = get_full_cloud_url();

                    $fullbt.click( function() {
                        $(this).attr( 'href', url+'?days=1&section='+_curr );
                    });

                    $fullbt.show();
                },

                update_cloud: function( daysback ) {
                    set_logo('http://www.infomous.com/site/economist', 'Powered by Infomous and Appinions');
                    proxy.set_var('type', 'jodange');
                    //colors
                    proxy.set_vars( this.colors );
                    //del aggregator
                    proxy.set_vars({
                        agg: undefined,
                        sinceLast: undefined,
                        feeds: undefined
                    });
                    //set appinions
                    proxy.set_vars({
                        fromDaysBack: daysback,
                        toDaysBack: 0,
                        'query:campaign' : '',
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
            }
        }
    })();

    // init 

    $sections.click( function() {
        goto_section( $(this).attr('id') );
        ga.track_event('menu_tab', sections.curr().ga_event);
    });

    $dates.click( function() {
        goto_date( $(this).attr('id') );
    }); 
    
    $container.css( 'width', I.css_size(cloud_width) );
    
    $periodbar.hide();
    //$periodbar.css('left', ($periodbar.parent().width()/2 - $periodbar.width()/2) );

    $periodbt.click( toggle_periodbar );
    $periodbar.find('img').click( toggle_periodbar );

    update_period_text(); 

    goto_section( get_init_section() ); 
}


/*
 * embed.js snippet sim: always after infomous_load global definition
 */


var _ec_tag = get_script_tag(/economist_cloud\.js/);
//root.vars = root.vars || get_url_params(_ec_tag.src);
var _vars = get_url_params(_ec_tag.src);
esc(_vars);

//console.log('*** economist embed ***', 'ec_tag', ec_tag, 'vars', vars, 'query', config_to_query(vars) );

var _vars_ec = {

    loadAtStart: false,
    setInterfaceType: 'widget',
    setFrame: false,

    'query:campaign': 'electionism',

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

for (var k in _vars_ec)
    _vars[k] = _vars_ec[k];

window.params = {
    allowFullScreen: true,
    allowScriptAccess: "always",
    wmode: "opaque",
    bgcolor: "#D9E4E6"
};

var serv = /dev3/.test( get_href() ) ? 'dev3' : 'economist';
load_js_file( 'http://'+serv+'.infomous.com/site/economist/1_6b/client/embed.js?' + config_to_query(_vars) );

/* end of embed.js snippet sim */


})(window);
