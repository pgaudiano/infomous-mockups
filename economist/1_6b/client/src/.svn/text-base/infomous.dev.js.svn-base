
/*!
 * Infomous Cloud JS
 * http://www.infomous.com/
 *
 * @constructor
 * @param {Object} config
 */

Infomous.define('CloudJS', (function(I) {

var CloudJS = function(vars) {

    if (!(this instanceof CloudJS))
        return new CloudJS(vars);

    //vars = I.extend(vars); //make a copy
    I.events(this);

    var base_root = I.base_root(),
        base_path = I.base_path(),
        $ = I.$;

    var jqxhr = undefined,
        ga = null,
        toolbar = null,
        renderer = null,
        self = this;

    this.get_var = function(key) {
        return vars[key];
    }

    this.set_var = function(key, value) {
        vars[key] = value;
    }

    this.set_vars = function(hash) {
        for (var k in hash)
            vars[k] = hash[k];
    }

    this.id = function() { return 'js'; }

    var defaults = {

        loadAtStart: true,
        fontScale: 1,
        zoom: 1,
        maxWords: 40,
        groups: true,
        setHideControlBar: true,
        setLinksTarget: '_blank',

        //Interaction Modes
        setInteractionMode: 'hover_click',

        //Colors
        skin: 'blue',

        // all commented color vars below are set by skin (blue)

        //colBackground: '0xFAFAFA',

        //Words
        //colWord: '0x1E450C',
        //colWordHover: '0x103800',
        //colWordFade: '0x436632',
        //colWordHighlighted: '0xFF0000',
        //colWordHoverLinked: '0x1E450C',
        //colHoverBox: '0xEEEEEE',
        colHoverBorder: '0x999999',
        //colFocusBox: '0xEEEEEE',
        //colFocusBorder: '0xFF0000',

        //Links
        //colLink: '0xCCCCCC',
        //colLinkHover: '0xFF9999',

        //Blobs
        //colBlob: '0xFAFAFA',
        //colBlobBorder: '0x999999',
        //colBlobHover: '0xCDD0D2',	

        //Sources lists
        //colSourcesFill: '0xEEEEEE',
        //colSourcesBorder: '0x999999',
        //colSourcesLine1: '0x000000',
        //colSourcesLine2: '0x666666',
        //colSourcesTextHover: '0x0000CC',
        //skinSourcesWidth: 200,
        skinSourcesOpacity: 0.9,
        skinSourcesMargin: 10,

        //Ads
        colAdsBackground: '0xDDDDDD',
        colAdsBorder: '0xCCCCCC',
        //colAdsLine1: '0x000000',
        colAdsSponsored: '0x666666',
        //adsPosition: 'top',

        //Branding
        brandLogoDestination: base_root,
        brandLogoSource: base_path+'img/infomous_icon_24x24.png',
        brandLogoText: 'Powered by Infomous',

        //Tracking
        trackOmniture: false,
        trackGoogle: false,
        trackGAAccount: 'UA-18489566-1',
        trackHovers: true
    };

    for (var d in defaults) 
        if (vars[d] === undefined) 
            vars[d] = defaults[d];

    I.esc(vars);

    // init dom stuff...

    var $target = $('#' + vars.target),
    $cloud = $('<div class="infomous-cloud"/>'),
    $preloader;

    //TODO delegate dom insertion to the code that uses the cloud.. 
    //make and keep the elem internally
    //add a getter like:
    //this.$el = function() { return $cloud; };

    $target.append( $cloud );
    //$target.after('<div style="clear:both"/>');

    parse_size(vars);	

    $preloader = $('<img/>', { 'src': base_path+'img/preloader.gif' });

    $preloader.css({
        'position': 'absolute',
        'top': Math.round(vars.height/2 - 32) + 'px',
        'left': Math.round(vars.width/2 - 32) + 'px',
        'z-index': '1001'
    });

    //

    renderer = new Canvas2dRenderer( vars.width, vars.height );

    load_config( function(data) {

        parse_config(data);
        parse_skin(vars);
        apply_css(vars);
        load_ga();

        self.track_event('jload', vars.setInterfaceType);

        add_toolbar( function() {
            if ( typeof infomous_load === 'function' )
                infomous_load('js');

            if ( isTrue(vars.loadAtStart) ) 
                self.make_request();
        });
    });

    function load_config(callback) {

        var configURL = base_path + 'config.txt';

        if (vars.nid !== undefined) 
            configURL = base_root+'cloud/config/'+vars.nid+'/'+vars.setInterfaceType;

        if (vars.setConfigURL !== undefined) 
            configURL = base_path + vars.setConfigURL; 

        //TODO why do we need to use jsonizer?
        $.ajax({
            url: base_path+'jsonizer.php?url='+encodeURIComponent(configURL)+'&callback=?',
            dataType: 'json',
            jsonpCallback: 'configCallback',
            //success: callback 
            success: function(data) {
                callback( data.config );
            }
        });
        //we can use...
        //$.ajax({
            //url: configURL,
            //dataType: 'text',
            //success: callback
        //});
    }

    function parse_config(config) {

        var conf_vars = _parse( decodeURIComponent(config) );

        //make local config obj, this code is a clone 
        //of Params.as in flash client
        //where Params is analog to the new vars obj 
        //and flashvars to the existing vars obj
        var Params = {}, p;
        if ( vars.preview !== undefined 
                && isTrue(vars.preview) 
                && base_root.indexOf('infomous.com') != -1 ) 
        {
            //This is a preview cloud at one of our sites: 
            //flashvars override config
            for (p in conf_vars) 
                Params[p] = conf_vars[p];
            for (p in vars) 
                Params[p] = vars[p];
        } 
        else {
            //The usual case: config overrides flashvars
            for (p in vars) 
                Params[p] = vars[p];
            for (p in conf_vars) 
                Params[p] = conf_vars[p];
        }
        for (p in Params) 
            vars[p] = Params[p];

        function _parse(config) {
            var out = {};
            var lines = config.split('\n');
            for (var l in lines) {
                var line = lines[l];
                if (line.length <3 
                        || line.indexOf('//') == 0 
                        || line.indexOf('#') == 0)
                    continue;
                var cut = line.indexOf('=');
                if (cut == -1) 
                    continue;
                var key = trim(line.substring(0, cut));
                var val = trim(line.substring(cut+1));
                if (key.length > 0 && val.length > 0) 
                    out[key] = val;
            }
            return out;
        }
    }

    function parse_size(vars) {

        $target.css({
            'width': I.css_size( vars.width ),
            'height': I.css_size( vars.height ),
            'position': 'relative'
        });

        //convert to absolute size number
        vars.width = $target.width();
        vars.height = $target.height();

        $target.css({
            'width': vars.width, 
            'height': vars.height
        });

        $cloud.css({
            'width': vars.width, 
            'height': vars.height
        });

        if ( !I.is_abs_size( vars ) ) {
            $('.infomous-container').css({
                'width': '100%', 
                'height': '100%'
            });
        }
    }

    function parse_skin(vars) {
        //see flash->com.ui.util.Defaults.as
        var skins = {
            blue: {
                  /** Colors **/
                  colBackground: '0xFFFFFF',
                  // Words
                  colWord: '0x062D40',
                  colWordHover: '0xFFFFFF',
                  colWordFade: '0x8EAFBF',
                  colWordHighlighted: '0xFF0000',
                  colWordHoverLinked: '0x00405E',
                  colHoverBox: '0x00405E',
                  colFocusBox: '0xFFFFFF',
                  colFocusBorder: '0xFF0000',
                  // Links
                  colLink: '0xCCCCCC',
                  colLinkHover: '0x75C4EB',
                  // Blobs
                  colBlob: '0xF5F8FA',
                  colBlobBorder: '0x8EAFBF',
                  colBlobHover:  '0xC1DCE8',
                  // Sources lists
                  colSourcesFill: '0xFFFFFF',
                  colSourcesBorder: '0x00405E',
                  colSourcesLine1: '0x006299',
                  colSourcesLine2: '0x666666',
                  colSourcesTextHover: '0x0000CC',
                  skinLine1Size: '11px',
                  skinLine2Size: '10px',
                  // Ads
                  colAdsLine1: '0x006299',
                  adsPosition: 'bottom',
                  /** Other skin variables **/
                  skinScrollWidth: 12,
                  skinSourcesShadow: 0,		
                  skinSourcesWidth: 240
              }
        }

        var skin = skins[vars.skin] || skins.blue;

        for (var k in skin) 
            if (vars[k] === undefined)
                vars[k] = skin[k];
    }

    function apply_css(vars) {	

        var css = '#'+vars.target+' {'+
            'background-color:'+hex(vars.colBackground)+';'+
            '}\n';
        css += '.infomous .infomous-cloud .body {'+
            'color: '+ hex(vars.colWord)+';'+
            '}\n';
        css += '.infomous .infomous-cloud .fade {'+
            'color: '+ hex(vars.colWordFade)+';'+
            '}\n';
        css += '.infomous .infomous-cloud .focused {'+
            'background-color: '+hex(vars.colFocusBox)+';'+
            'border-color: '+hex(vars.colFocusBorder)+';'+
            '}\n';
        css += '.infomous .infomous-cloud .highlighted {'+
            'color:'+hex(vars.colWordHighlighted)+';'+
            '}\n'; 

        // menu
        
        var _srcs_line1 = '.infomous .infomous-cloud .sources .menu-sources-list .menu-source-item .line1';
        var _srcs_line2 = '.infomous .infomous-cloud .sources .menu-sources-list .menu-source-item .line2';
        var _ads_line1 = '.infomous .infomous-cloud .sources .menu-ad .menu-ad-txt .line1';

        // sources
        var src = I.hex2rgb(vars.colSourcesFill);
        src.a = vars.skinSourcesOpacity;
        css += '.infomous .infomous-cloud .sources { '+
            'background-color:rgba('+src.r+','+src.g+','+src.b+','+src.a+');'+
            'border-color: '+hex(vars.colSourcesBorder)+';'+
            '}\n';	
 
        css += _srcs_line1 + ', ' + _srcs_line1 + ' * { '+
            'color: '+hex(vars.colSourcesLine1)+';'+
            'font-size:'+ parseInt(vars.skinLine1Size)+'px;'+
            '}\n';

        css += _srcs_line1 + ':hover { '+
            'color: '+hex(vars.colSourcesTextHover)+';'+
            '}\n';

        css += _srcs_line2 + ', ' + _srcs_line2 + ' * { '+
            'color: '+hex(vars.colSourcesLine2)+';'+
            'font-size: '+parseInt(vars.skinLine2Size)+'px;'+
            '}\n';

        // ads	
        css += '.infomous .infomous-cloud .sources .menu-ad { '+
            'background-color:'+hex(vars.colAdsBackground)+';'+
            'border-color:'+hex(vars.colAdsBorder)+';'+
            '}\n';

        css += _ads_line1 + ', ' + _ads_line1 + ' * { '+
            'color: '+hex(vars.colAdsLine1)+';'+
            '}\n';

        // footer
        css += '.infomous .infomous-cloud .sources .menu-footer { '+
            'background-color: '+hex(vars.colSourcesBorder)+';'+
            'border-color: '+hex(vars.colSourcesBorder)+';'+
            '}\n';

        // header
        css += '.infomous .infomous-cloud .sources .menu-header { '+
            'background-color: '+hex(vars.colSourcesBorder)+';'+
            'border-color: '+hex(vars.colSourcesBorder)+';'+
            '}\n'; 

        // append to head...
        
        $('\n<style type=text/css>\n'+ css +'</style>\n').appendTo('head');
    }

    //TODO decouple toolbar from cloud

    function add_toolbar(callback) {

        if (vars.setInterfaceType !== 'viewer') {
            if (typeof callback === 'function')
                callback();
            return;
        }

        I.require('CloudToolbar', function() {

            toolbar = new CloudToolbar({
                width: vars.width,
                controls: vars.setControls
            });

            toolbar.add_to_dom( $target );

            //make place for the inner toolbar
            var max = toolbar.$el().height() + 4;
            var curr = vars.skinSourcesMargin; 
            vars.skinSourcesMargin = curr > max ? curr : max;

            setup_autohide(toolbar);

            if (typeof callback === 'function')
                callback();
        });

        function setup_autohide(toolbar) {

            if ( ! I.bool(vars.setHideControlBar) )
                return;

            var ythres = $cloud.height() - toolbar.$el().height(),
                ylocal, ontool, oncloud,
                hidetimeout = 500,
                speed = 300,
                hidden = false,
                timeout = null;

            $cloud.unbind('mousemove');
            toolbar.$el().unbind('mousemove');

            $cloud.mousemove( autohide );
            toolbar.$el().mousemove( autohide );

            $cloud.mousemove( function() {
                oncloud = true;
            });
            toolbar.$el().mousemove( function() {
                oncloud = false;
            });

            function autohide(e) { 

                ylocal = $cloud.offset().top;
                ontool = e.pageY-ylocal > ythres; 

                if ( !ontool && !hidden && oncloud ) {
                    hidden = true;	
                    clear_timeout();
                    timeout = setTimeout( function() {
                        clear_timeout();
                        hide_toolbar();	
                    }, hidetimeout);	
                }
                else if (ontool && hidden) {
                    hidden = false;
                    if ( clear_timeout() )
                        return;
                    show_toolbar();	
                }
                else if (!oncloud) {
                    hidden = false;
                    clear_timeout();
                }
            }

            function show_toolbar() {
                toolbar.$el().show('slide', {
                    direction: 'down'
                }, speed);
            }

            function hide_toolbar() {
                toolbar.close_all_menues();
                toolbar.$el().hide('slide', {
                    direction: 'down'
                }, speed);
            }

            function clear_timeout() {
                if (timeout == null)
                    return false;
                clearTimeout( timeout );
                timeout = null;
                return true;
            }
        }
    }

    // toolbar / proxy comm helper
    this.plug_toolbar = function(proxy) {

        if (toolbar === null)
            return;

        toolbar.on(['hidden','focused','dict','groups', 
                'maxWords','zoom','fontScale'], 
                function(e) {
                    proxy.set_var(e.key, e.value, e.b_make_request);
                });

        proxy.on(['hidden','focused','dict','groups', 
                'maxWords','zoom','fontScale'], 
                function(e) {
                    toolbar['update_'+e.key](e.value);
                });
    }

    this.kill_current_request = function() {
        if (jqxhr === undefined) 
            return;
        jqxhr.abort();	
        jqxhr = undefined;
        $preloader.remove();
    }

    this.make_request = function() {

        self.kill_current_request();

        $cloud.append($preloader);

        var req = base_path + 'proxy.php?positions=json&callback=?';
        req += '&url='+encodeURIComponent(vars.feeds);

        var allowed = [
            'type', 'width', 'height', 'maxWords', 'linkageThreshold', 'popularWordCutoff', 'textOption', 'maxResults', 'minChars', 'dict', 'focused', 'hidden', 'blocked', 'ngrams', 'hiddenSource', 'ngramsSource', 'fromDaysBack', 'toDaysBack', 'campaign', 'zoom', 'fontScale', 'groups',
            //twitter aggregator
            'agg', 'since', 'until', 'sinceLast', 'untilLast',
            //appinions
            'fromDaysBack', 'toDaysBack'
        ];

        for (var v in vars) {
            if (I.contains(allowed, v) && vars[v] !== undefined && vars[v] !== '') {
                req += '&'+v+'='+encodeURIComponent(vars[v]);
            }
            if (v.indexOf('query:') == 0) {
                req += '&'+v.substring(6)+'='+encodeURIComponent(vars[v]);
            }
        }

        jqxhr = $.ajax({
            url: req,
            dataType: 'json',
            success: function(data) {
                self.render(data);
            },	
            jsonpCallback: 'proxyCallback'
        });	
    }

    var words, links, sources, ads, requests; 
    var pos, groups;

    var $selected, $pinned;

    this.render = function(data) {

        $cloud.empty();

        $selected = null;
        $pinned = null;

        if (data === undefined)
            return;

        var net = data.network;

        if ( I.is_empty(net.words) ) {
            self.add_cloud_feedback('No results found');
            return;
        }

        words = net.words.word;
        links = net.links.link;
        sources = net.sources.source;
        requests = net.requests.rssInputRequest;
        ads = net.ads !== undefined ? net.ads.ad : undefined; 

        pos = {};
        groups = {};

        // nodes (set pos,groups data)
        var i = words.length,
            nodes = [];
        while (i--) 
            nodes[i] = add_node( i );

        // nodes hack to make jquery.height() work properly on node.menu
        i = words.length;
        while (i--) {
            nodes[i].add_menu(false);
            nodes[i].remove_menu();
        }
        //

        $cloud.unbind('click');
        $cloud.click( function() {
            if ( !!$selected ){
                $selected.remove_menu();
                $pinned = null;
            }
            else self.dispatch('unfocus_all');
        });	

        // draw (needs pos,groups data)
        render_graph();

        add_brand();	
    }

    function is_focused(word) {
        if (typeof vars.focused !== 'string')
            return false;
        return I.contains( vars.focused.split(','), word );
    }

    function is_highlighted(word) {
        if (typeof vars.highlighted !== 'string')
            return false;
        return I.contains( vars.highlighted.split(','), word );
    }

    function node_hover(word_txt) {
        if ( ! I.bool(vars.trackHovers) ) 
            return;
        self.track_event('jmouseover', word_txt);
    }

    function node_hide(word_txt) {
        //when a word is hidden it is unfocused as well
        self.dispatch( ['hide','unfocus'], { word: word_txt } );
        self.track_event('jhide', word_txt);
    }

    function node_focus(word_txt) {
        self.dispatch('focus', { word: word_txt });
        self.track_event('jfocus', word_txt);
    }

    function node_unfocus(word_txt) {
        self.dispatch('unfocus', { word: word_txt });
    }

    function source_follow(word_txt, link_url) {
        self.track_event('jsource_follow', word_txt, [
                { name: 'url', value: link_url }
            ]);
    }

    function ad_follow(word_txt, link_url) {
        self.track_event('jad_follow', word_txt, [
                { name: 'url', value: link_url }
            ]);
    }

    function add_node( i ) {

        var node, word, wpos,
            _ads, _srcs,
            $body, $word, 
            $hide, $menu,
            imode = null;

        // data...

        word = words[i];	

        _ads = parse_indices( ads, word.ads );
        _srcs = parse_indices( sources, word.sources );

        //string to number
        word.x = Math.round(word.x);
        word.y = Math.round(word.y);

        if ( !word.hasOwnProperty('id') || !word.hasOwnProperty('text') ) 
            return;

        groups[word.group] = groups[word.group] === undefined ? 
            [word.id] : groups[word.group].concat(word.id);	 

        // body...

        $body = $('<div/>', {
            'class': 'body',
            'id': 'body_' + i
        });

        $body.css({
            'padding': '3px 10px',
            'font-size': word.size + 'px',
            'z-index': i + 1
        });

        if ( is_focused(word.text) ) 
            $body.addClass('focused');

        if ( is_highlighted(word.text) ) 
            $body.addClass('highlighted');	

        // word...

        var html_text = trim(word.text),
            br = parseInt(word.br);
        if ( br > 0 ) 
            html_text = html_text.substring(0, br) 
                + '<br/>' 
                + html_text.substring(br + 1);
        html_text = html_text.replace(/\s/g, '&nbsp;');

        $word = $('<span/>', {
            'html': html_text,
            'class': 'word',
            'id': 'word_' + i
        });	

        $word.mouseover( function(e) {
            node_hover(word.text);
        }); 

        // hide...

        $hide = $('<div/>', {'class': 'hide'});

        $hide.css({
            'margin': (Math.round(word.size/2)-3)+'px 0 0 5px',
            'display': 'none'
        });

        $hide.click( function(e) {	
            $(this).parent().hide();
            var hword = $(this).siblings('.word').text();
            node_hide( hword ); 
            e.stopPropagation();
        });

        // dom...

        $body.append( $word );
        $body.append( $hide );

        $cloud.append( $body );

        wpos = pos[word.id] = {
            x: word.x,
            y: word.y,
            //TODO body w,h needs the elem to be
            //into the dom to get its size
            //replace this with a variable to let
            //delegate dom insertion
            w: $body.width(),
            h: $body.height(),
            ow: $body.outerWidth(),
            oh: $body.outerHeight()
        };

        $body.css({
            'left': (word.x - wpos.ow/2) + 'px',
            'top': (word.y - wpos.oh/2) + 'px'
        });	

        node = {
            add_menu: add_menu,
            remove_menu: remove_menu,
            get_ads: function() { return _ads; },
            get_srcs: function() { return _srcs; }
        };

        // imode init...
        // see also $cloud.click for background

        // TODO send imode obj out of the node scope
        // + imode receives the node as arg, 
        // + the node has getters for what imode needs:
        // $menu, $body, add_menu, remove_menu, wpos, etc..
        // it will also need access to $selected (1 level up from node)
        // then remove imode from make_menu args

        imode = get_imode( vars.setInteractionMode, wpos );

        $menu = make_menu( node, word, imode );

        imode.init(); 

        return node; 

        // node private functions... 

        /*
         * @param {Array.<Object>} list of objects
         * @param {string} comma separated list of indices 
         *      to use with tha list
         */

        function parse_indices( arr, idxs_str ) {

            if ( I.is_empty(idxs_str) )
                return [];

            var _list = [],
                idxs = idxs_str.split(','),
                obj, idx, i = idxs.length;

            while (i--) {

                idx = parseInt( idxs[i] );
                if ( isNaN( idx ) )
                    continue;

                obj = arr[ idx ];
                if ( obj === undefined )
                    continue;

                _list.push( obj );    
            }

            return _list;
        }
        
        function get_imode(type, wpos) {

            var imodes = {};

            var cmargin = { 
                x: vars.skinSourcesMargin,
                y: vars.skinSourcesMargin
            };

            // + hover mode for desktop browsers + touch devices

            imodes.hover = imodes.hover_click = (function() {

                var t = null,
                d = 1000;

                function clear_t() {
                    if (t === null) return;
                    clearTimeout(t);
                    t = null;
                }

                return {

                    init: function() {	

                        var $tab = $menu.header();
                        var $arrow = $tab.find('.m-header-arrow');
                        rotate($arrow, 90);

                        $body.unbind('click');
                        $body.click( function(e) {

                            if ($pinned !== null && $pinned !== $body) {
                                if ( $selected !== null ) {
                                    $selected.remove_menu();
                                }
                            }

                            if ($selected !== $body) {
                                clear_t();
                                add_menu();
                                $pinned = $body;
                                rotate($arrow, 0);
                            }

                            e.stopPropagation();
                        });

                        $body.remove_menu = remove_menu;

                        $body.unbind('mouseenter');
                        $body.mouseenter( function(e) {
                            if ($pinned === null) {
                                clear_t();
                                t = setTimeout( add_menu, d );
                            }
                        });

                        $body.unbind('mouseleave');
                        $body.mouseleave( function(e) {
                            clear_t();
                        });

                        $menu.unbind('mouseleave');
                        $menu.mouseleave( function(e) {
                            if ($pinned === null) {
                                remove_menu();
                            }
                        });

                        $tab.unbind('click');
                        $tab.click( function(e) {
                            if ($pinned === null) {
                                $pinned = $body;
                                rotate($arrow, 0);
                            }
                            else if ( $pinned === $body ) {
                                remove_menu();
                                $pinned = null;
                                rotate($arrow, 90);
                            }
                        e.stopPropagation();
                        });
                    },

                    add_menu: function() {

                        if ( !!$selected )
                            $selected.remove_menu();

                        this.init();

                        $cloud.append( $menu );
                        $menu.show();

                        var layout = this.get_menu_layout();

                        $menu.css({
                            'position': 'absolute',
                            'left': layout.x,
                            'width': layout.w,
                            'top': layout.y
                        });	

                        //if menu height goes out of the cloud
                        //we shrink it to fit
                        if ( layout.h_dif > 0 ) {
                            $menu.height( layout.h );
                            // adjust source list height on ads height
                            var ads_h = $menu.ads().outerHeight(true) + 10;
                            $menu.srcs().height( layout.h - ads_h );
                        }
                    },

                    get_menu_layout: function() {

                        var wx = wpos.x,
                            wy = wpos.y,
                            wh = wpos.oh,
                            cw = vars.width,
                            ch = vars.height,

                            // ** we assume $menu is on dom to get its height

                            //srcs_h = $menu.srcs().outerHeight(true),
                            //ads_h = $menu.ads().outerHeight(true),
                            //menu_h = srcs_h + ads_h,
                            menu_h = $menu.outerHeight(true),
                            header_h = $menu.header().outerHeight(true),
                            footer_h = $menu.footer().outerHeight(true),
                            total_h = menu_h + header_h + footer_h;

                        return {
                            x: get_x(),
                                y: get_y(),
                                w: get_w(),
                                h: get_h(),
                                h_dif: get_h_dif()
                        };

                        function get_x() {

                            var _x = wx - get_w()/2,
                                cr = cw - cmargin.x,
                                cl = cmargin.x,
                                mr = wx + get_w()/2,
                                ml = wx - get_w()/2;

                            if (mr > cr)        //out of right
                                return _x - (mr-cr);
                            else if (ml < cl)   //out of left
                                return cl;
                            else                //in place
                                return _x;
                        }

                        function get_w() {
                            return vars.skinSourcesWidth;
                        }

                        function get_y() {

                            var _h = total_h - get_h_dif();

                            var cb = ch - cmargin.y,
                                ct = cmargin.y,
                                mb = (wy + wh/2) + _h/2,
                                mt = (wy - wh/2) - _h/2;

                            if (mb > cb)        //out of bottom
                                return cb - (_h - header_h);
                            else if (mt < ct)   //out of top
                                return ct + header_h;
                            else                //in place 
                                return wy - get_h()/2;
                        }

                        function get_h() {
                            return menu_h - get_h_dif();
                        }

                        function get_h_dif() {
                            var _ch = ch - cmargin.y * 2,
                                dif = total_h - _ch;
                            return dif > 0 ? dif : 0;
                        }
                    }
                }
            })();

            //end of hover, hover_click imode

            // + click mode

            imodes.click = {

                init: function() {

                    $body.unbind('click');
                    $body.click( function(e) {
                        if ( $menu.is_open() )
                            node_focus( word.text ); //deprecated?
                        else
                            add_menu();
                        //prevent $cloud.click
                        e.stopPropagation();
                    });

                    $body.remove_menu = remove_menu;

                    $menu.unbind('mouseleave');
                    $menu.mouseleave( remove_menu );
                },

                add_menu: function() {

                    if ( !!$selected )
                        $selected.remove_menu();

                    this.init();

                    $cloud.append( $menu );
                    $menu.show();

                    var layout = this.get_menu_layout();

                    $menu.css({
                        'position': 'absolute',
                        'left': layout.x,
                        'top': layout.y,
                        'width': layout.w
                    });	

                    //if menu height goes out of the cloud
                    //we shrink it to fit
                    if ( layout.h_dif > 0 ) {
                        $menu.height( layout.h );
                        // adjust source list height on ads height
                        var ads_h = $menu.ads().outerHeight(true) + 10;
                        $menu.srcs().height( layout.h - ads_h );
                    }

                    // adjust source list height on ads height
                    //var hads = $menu.ads().height() + 10;
                    //$menu.srcs().css( 'height', layout.h - hads );

                    $hide.show();
                },

                get_menu_layout: function() {

                    var wx = wpos.x,
                        wy = wpos.y,
                        wh = wpos.oh,
                        cw = vars.width,
                        ch = vars.height,

                        // ** we assume $menu is on dom to get its height
                        menu_h = $menu.outerHeight(true),
                        //
                        upper = wy < ch/2,
                        left = wx < cw/2,
                        // calc h dif first...
                        h_dif = get_h_dif();

                    return {
                        x: get_x(),
                        y: get_y(),
                        w: get_w(),
                        h: get_h(),
                        h_dif: h_dif
                    };

                    //function get_x() {	
                    //return left ? wx : wx - get_w();
                    //}

                    // if out of left|right move menu inside along x

                    function get_x() {

                        var _x = wx,
                            cr = cw - cmargin.x,
                            cl = cmargin.x,
                            mr = wx + get_w(),
                            ml = wx;

                        if (mr > cr)        //out of right
                            return _x - (mr-cr);
                        else if (ml < cl)   //out of left
                            return cl;
                        else                //in place
                            return _x;
                    }    

                    function get_w() {
                        return vars.skinSourcesWidth;
                    }

                    function get_y() {	
                        return upper ? 
                            (wy + wh/2) : 
                            (wy - wh/2) - get_h();
                    }

                    function get_h() {
                        return menu_h - h_dif; 
                    }

                    function get_h_dif() {

                        var dif;

                        if (upper) {
                            var cb = ch - cmargin.y,
                                mb = (wy + wh/2) + menu_h;
                            dif = mb - cb;
                        }
                        else {
                            var ct = cmargin.y,
                                mt = (wy - wh/2) - menu_h;
                            dif = ct - mt; 
                        }
                        return dif > 0 ? dif : 0;
                    }
                }
            };
            // end of click imode

            return imodes[type];
        }

        function add_menu(b_track_event) {

            imode.add_menu();

            $selected = $body;

            activate_blob_colors();

            if ( b_track_event !== false ) {

                self.track_event('jsources_view', word.text);

                var ads = node.get_ads(),
                    len = ads.length;

                for (var i = 0; i < len; i++)
                    self.track_event('jad_view', word.text, [
                            { name: 'url', value: ads[i].url }
                        ]);
            }
        }

        function remove_menu() {

            $hide.hide();

            deactivate_blob_colors();

            $menu.detach();

            if ($selected === $body)
                $selected = null;
        }

        function activate_blob_colors() {

            var _group = groups[ word.group ];
            var hover_col = hex(vars.colWordHover);
            var hover_linked_col = hex(vars.colWordHoverLinked);

            set_group_color(_group, hover_linked_col);
            set_word_color($word, hover_col);

            render_group_blob( _group, {
                blob: hex(vars.colBlobHover),
                border: hex(vars.colBlobBorder)
            });
            render_group_links( _group, links, hex(vars.colLinkHover) );
        }

        function deactivate_blob_colors() {

            var _group = groups[ word.group ];
            var stdcol = hex(vars.colWord);

            set_group_color(_group, stdcol);
            set_word_color($word, stdcol);

            render_group_blob( _group, {
                blob: hex(vars.colBlob),
                border: hex(vars.colBlobBorder)
            });
            render_group_links( _group, links, hex(vars.colLink) );
        }	

        function set_group_color(group, color) {
            if (group === undefined) 
                return;
            var $link, len = group.length;
            for (var i = 0; i < len; i++) {
                $link = get_$word( group[i] );
                set_word_color( $link, color );
            }
        }

        function set_word_color($w, color) {
            $w.css('color', color);
        }

        function get_$word(id) {
            //TODO improve performance here
            return $('#word_'+id);
        }
    }
    //end of add_node				

    function make_menu(node, word, imode) {

        var $header = make_menu_header(),
            $ads = make_menu_ads( node.get_ads() ),
            $srcs = make_menu_sources( node.get_srcs() ),
            $footer = make_menu_footer();

        // menu views by interaction mode + ads position

        var menu_elems = {};

        menu_elems.hover = menu_elems.hover_click = 
        {
            bottom: [ $header, $srcs, $ads, $footer ],
            top: [ $header, $ads, $srcs, $footer ]
        };

        menu_elems.click = 
        {
            bottom: [ $srcs, $ads ],
            top: [ $ads, $srcs ]
        };

        //

        var $el = $('<div/>', {
            'class': 'sources', 
            'id': 'sources_'+word.id 
        });	

        var elems = menu_elems[vars.setInteractionMode][vars.adsPosition]; 

        for (var i = 0; i < elems.length; i++)
            $el.append( elems[i] );		

        //TODO test these clicks...

        $el.find('.menu-source-item a').click( function() {
            source_follow( word.text, $(this).attr('href') );
        });

        $el.find('.menu-ad a').click( function() {
            ad_follow( word.text, $(this).attr('href') );
        });

        $el.is_open = function() {
            return $el.parent().length > 0 && //is on dom
                $el.css('display') !== 'none'; //is visible
        }

        //$el.has_ads = function() {
            //return $ads.length > 0;
        //}

        //getters
        $el.ads = function() { return $ads; }
        $el.srcs = function() { return $srcs; }
        $el.header = function() { return $header; }
        $el.footer = function() { return $footer; }

        return $el;

        function make_menu_header() {

            var $el = $('<div/>', {
                'class': 'menu-elem menu-header'
            });

            var $txt = $('<span/>', {
                'class': 'm-header-elem m-header-txt'
            });

            var $arrow = $('<img/>', {
                'class': 'm-header-elem m-header-arrow',
                'src': I.base_path()+'img/rightpointing_triangle_10x10_white.png'
            });

            $txt.text( word.text );

            $el.append( $arrow );
            $el.append( $txt );

            $el.css( word.x < vars.width/2 ? 'left' : 'right', '-1px' );

            return $el;
        }

        function make_menu_footer() {

            var state = is_focused(word.text) ?
                'focused' : 'unfocused';

            var $el = $('<div/>', {
                'class': 'menu-elem menu-footer'
            });

            var focus_cfg = {
                unfocused: {
                    text: 'DRILL DOWN',
                    click: function() {
                        node_focus( word.text );
                    }
                },
                focused: {
                    text: 'GO BACK UP',
                    click: function() {
                        node_unfocus( word.text );
                    }
                }
            };

            var $focus_bt = $('<span/>', {
                'class': 'm-footer-bt bt-focus'
            });
            var $hide_bt = $('<span/>', {
                'class': 'm-footer-bt bt-hide'
            });

            var $rayita = $('<div class="rayita"></div>');

            $focus_bt.text( focus_cfg[state].text );
            $focus_bt.unbind('click');
            $focus_bt.click( focus_cfg[state].click );

            $hide_bt.text('HIDE WORD');
            $hide_bt.unbind('click');
            $hide_bt.click( function() {
                node_hide( word.text ); 
            });

            var loc = vars.skinSourcesWidth * 0.1;

            $focus_bt.css( 'left', loc+'px' );
            $hide_bt.css( 'right', loc+'px' );
            $rayita.css( 'left', (vars.skinSourcesWidth / 2)+'px' );
            $rayita.css( 'color', hex(vars.colSourcesLine1) );

            $el.append( $focus_bt );
            $el.append( $rayita );
            $el.append( $hide_bt );

            return $el;
        }

        function make_menu_ads(_node_ads) {

            var ads_html = '',
                trg = vars.setLinksTarget,
                ad,
                i = _node_ads.length;

            var _line1, 
                _line2;

            while (i--) {

                ad = _node_ads[i];

                ads_html += '<div class="menu-elem menu-ad">';

                if (ad.img) 
                    ads_html += '<div class="menu-ad-img">'+
                        '<img src="'+ad.img+'"></div>';

                if ( I.is_empty(ad.url) ||
                        I.is_empty(ad.line1) ||
                        I.is_empty(ad.line2) )
                    continue;

                _line1 = '<a class="line1" href="'+ad.url+'" target="'+trg+'">'+ad.line1+'</a>';

                _line2 = '<span class="line2">'+ad.line2+'</span>';

                ads_html += '<div class="menu-ad-txt">'+
                            _line1 +
                            _line2 +
                            '</div>'+

                    '</div>';
            }

            return $(ads_html);
        }

        function make_menu_sources(_node_srcs) {

            var $el = $('<div/>', { 
                'class': 'menu-elem menu-sources-list'
            });

            var srcs_html = '', 
                trg = vars.setLinksTarget,
                src,
                i = _node_srcs.length;
            
            var _line1, 
                _line2;

            while (i--) {

                src = _node_srcs[i];

                _line1 = /href/.test(src.title) ? 
                    '<span class="line1">'+src.title+'</span>' :
                    '<a class="line1" href="'+src.url+'" target="'+trg+'">'+ 
                        src.title+
                    '</a>';

                _line2 = '<span class="line2">'+src.caption+'</span>';

                srcs_html += '<div class="menu-source-item">'+ 
                                _line1 + 
                                _line2 + 
                                '</div>';
            }

            $el.append(srcs_html);	

            return $el;
        }
    }

    function rotate(object, degrees) {
        object.css({
            '-webkit-transform' : 'rotate('+degrees+'deg)',
            '-moz-transform' : 'rotate('+degrees+'deg)',  
            '-ms-transform' : 'rotate('+degrees+'deg)',  
            '-o-transform' : 'rotate('+degrees+'deg)',  
            'transform' : 'rotate('+degrees+'deg)',  
            'zoom' : 1
        });
    }

    // render graph

    function render_graph() {

        renderer.clear();
        $cloud.append( renderer.el() );
        //$('canvas').remove(); //already emptied by $cloud.empty()

        render_all_blobs( groups, {
            blob: hex(vars.colBlob),
            border: hex(vars.colBlobBorder)
        });

        render_all_links( links, hex(vars.colLink) );
    }

    // links

    function render_all_links( links, color ) {
        var len = links.length;
        for (var i = 0; i < len; i++) 
            render_link( links[i], color );	
    }

    function render_group_links( group, links, color) {

        if (group === undefined || links === undefined)
            return;

        var i, wid, glen = group.length,
            j, link, llen = links.length;

        for (i = 0; i < glen; i++) {
            wid = group[i];
            for (j = 0; j < llen; j++) {
                link = links[j];
                if ( wid !== link.from )
                    continue;
                render_link( link, color );
            }	
        }
    }

    function render_link( link, color ) {

        if ( link.from === undefined )
            return;

        var from = pos[link.from],
            to = pos[link.to];

        //#draw 
        //$cloud.drawLine(from.x, from.y, to.x, to.y, { color: color });
        renderer.line(from.x, from.y, to.x, to.y, color);
    }	

    // blobs

    function render_all_blobs( groups, color ) {
        if ( !isTrue(vars.groups) )
            return;
        for (var g in groups) 
            render_group_blob( groups[g], color );
    }

    function render_group_blob( group, color ) {

        var scale = 0.9,
            outline = 2;

        var k, wid, 
            _pos,
            _x, _y, _w;

        for (k in group) {

            wid = group[k];
            if (pos[wid] === undefined)
                continue;

            _pos = pos[wid];
            _w = Math.round( _pos.w * scale );
            _x = _pos.x;
            _y = _pos.y;

            //#draw
            //$cloud.fillEllipse(_x-_w/2,_y-_w/2,_w,_w,{color:color.border});
            renderer.ellipse(_x, _y, _w, _w, color.border);
        }

        for (k in group) {

            wid = group[k];
            if (pos[wid] === undefined)
                continue;

            _pos = pos[wid];
            _w = Math.round( _pos.w * scale ) - outline;
            _x = _pos.x;
            _y = _pos.y;

            //#draw
            //$cloud.fillEllipse(_x-_w/2,_y-_w/2,_w,_w,{color:color.blob});
            renderer.ellipse(_x, _y, _w, _w, color.blob);
        }
    }

    //

    function add_brand() {

        var logoid = 'infomous-logo';
        if ( ! isTrue(vars.brandShowLogo) || $('#'+logoid).length > 0 )
            return;

        var link_url = vars.brandLogoDestination,
            img = vars.brandLogoSource,
            title = vars.brandLogoText,
            $brand = $('<a/>', {
                'text': ' ',
                'href': link_url,
                'id': logoid,
                'target': '_blank',
                'title': title,
                'style': 'background-image: url('+img+');'
            });

        $brand.click( function() {
            self.track_event( 'jlogo_follow', '', [
                { name: 'url', value: link_url }
            ]);
        });

        $cloud.append( $brand );
    }

    this.remove_cloud_feedback = function() {
        $cloud.find('.cloud-feedback').remove();
    }

    this.add_cloud_feedback = function(msg) {
        self.remove_cloud_feedback();
        var z = parseInt($cloud.css('z-index'))+1;
        var feedback = $('<div/>', {
            'class': 'cloud-feedback ctrls-dialog',
            'style': 
                'width:'+($cloud.width()-2)+'px;'+ 
                //'height:30px;'+
                //'border: 1px solid #777;'+
                //'background-color: rgb(255,255,255);'+
                //'text-align: center;'+
                'z-index: ' + z 
        });
        feedback.append('<p>'+msg+'</p>');
        $cloud.empty();
        $cloud.append(feedback); 
        //feedback.position({ of: $trg });
    }

    this.track_event = function(action, label, addcvars) {

        if ( I.bool(vars.trackGoogle) ) {
            //always send cloud nid in cvars[1] --> impl this in GAtracker?
            var cvars = [ { name: 'nid', value: vars.nid } ];
            //addcvars
            if ( I.is_array(addcvars) ) {
                var len = addcvars.length;
                for (var i = 0; i < len; i++) 
                    cvars.push( addcvars[i] );
            }
            ga.track_event( action, label, cvars );
        }

        if ( I.bool(vars.trackOmniture) ) {
            var url = document.URL;
            var omEvent = 'infomous/' + action + '/' + label;
            var omUrl = url + '/' + omEvent;
            if (omEvent.indexOf('?') == -1) 
                omEvent += '?p1=infomous';
            else omEvent += '&p1=infomous';
            var omObject = {"href" : omUrl};
            if (typeof s !== 'undefined') 
                s.tl(omObject, 'o', omEvent);
        }
    }	

    function load_ga(){
        if ( ! I.bool(vars.trackGoogle) ) 
            return;
        ga = new GAtracker('infomousTracker', vars.trackGAAccount);
    }

    function hex(c) {
        return escape(c).replace('0x', '#');
    }

    function trim(s) {
        return s.replace( /^["\'\s]+|["\'\s]+$/g, '' );
    }

    function isTrue(val) {
        return val != false && val != "false" && val != 0 && val != "0";
    }
};

var Canvas2dRenderer = function(w, h) {

    w = parseInt(w);
    h = parseInt(h);

    var canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;

    var ctx = canvas.getContext('2d');

    var def = {
        lineWidth: 1,
        strokeStyle: 'black',
        fillStyle: 'red',
        lineCap: 'butt', //'round' 'square'
        lineJoin: 'round' //'miter' 'bevel'
    };

    for (var k in def)
        ctx[k] = def[k]; 

    this.el = function() {
        return canvas;
    }

    this.clear = function() {
        ctx.clearRect(0, 0, w, h);
    } 

    this.line = function(x1, y1, x2, y2, color, width) {

        ctx.beginPath();

        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);

        _style('strokeStyle', color);
        _style('lineWidth', width);

        ctx.stroke();
        //ctx.closePath();
    }

    this.ellipse = function(x, y, w, h, color, stroke_width, stroke_color) {

        ctx.save();
        ctx.beginPath();

        ctx.translate(x-w, y-h);
        ctx.scale(w, h);
        ctx.arc(1, 1, 1, 0, 2 * Math.PI, false);

        ctx.restore();

        _style('fillStyle', color); 
        if (color) 
            ctx.fill();

        _style('lineWidth', stroke_width);
        _style('strokeStyle', stroke_color);
        if (stroke_width || stroke_color)
            ctx.stroke();
    }

    function _style(key, val) {
        if (val && ctx[key] !== val) 
            ctx[key] = val;
    }
}

return CloudJS;

})(Infomous) );

