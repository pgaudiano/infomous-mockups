/*!
 * Infomous embed
 * http://www.infomous.com/
 */

(function(root, I) {

    //we know embed.js has jquery included
    I.$ = root.jQuery.noConflict(true);

    root.base_root = null;
    root.base_path = null;

    //var vars = root.vars || (function() {
    var vars = (function() {
        var snippet = I.get_snippets()[0];
        return snippet ? I.get_url_params( snippet.url ) : {};
    })();

    vars.target = vars.target || 'infomous';
    vars.type = vars.type || 'rss';
    vars.width = I.css.size(vars.width) || '400';
    vars.height = I.css.size(vars.height) || '300';

    I.esc(vars); 

    var proxy, target;

    var ga = new I.GAtracker({
        name: 'infomous_embed', 
        account: vars.trackGAAccount, 
        nid: vars.nid
    });

    //global infomous_load should be set before calling embed.js
    //if its set after by some js code we are screwed..
    var user_cb = root.infomous_load;
    root.infomous_load = null;

    function cloud_ready(platform) {
        
        I.log('[embed]', 'cloud ready', platform);
        
        proxy = new I.CloudProxy(
                platform, vars, 'cloud_proxy_embed');

        if ( typeof user_cb === 'function' )
            user_cb(platform, vars);
    } 

    I.sequence(
        check_target,
        check_frame, 
        fix_size,
        track_viewable_impression, 
        loadFlash 
    );

    function check_target(next) {
        
        (function _check_target() {
            target = document.getElementById(vars.target);
            ( !!target ? next() : setTimeout(_check_target, 20) );
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
            var frame = new I.CloudFrame({
                width: vars.width,
                height: vars.height,
                nid: vars.nid,
                title: vars.title
            });
            frame.add_to_dom( target );
            frame.on('click', function(e) {
                //ux event format: action, link_url
                ga.track_event({
                    action: e.id+'_button', 
                    label: undefined,
                    link_url: { name: 'url', value: e.url }
                });
            });
            vars.height = frame.css_size().cloud.height;
        }
    }

    //against coulisse fx
    function fix_size(next) {

        target.style.width = I.css.size( vars.width );
        target.style.height = I.css.size( vars.height );
        target.style.position = 'relative';

        next();
    }	

    function track_viewable_impression(next) {
        I.require('jquery', function() {
            I.$('.infomous').waypoint( function(e, dir) {
                ga.track_event({
                    action: 'view', 
                    label: vars.setInterfaceType
                });
            },
            {
                triggerOnce: true,
                offset: 'bottom-in-view'
            });
        });
        next();
    }

    function loadFlash() {
        var _cloud = new I.CloudFlash( vars );
        _cloud.add_to_dom( vars.target, 
            function() {
                I.clouds.add( _cloud );
                cloud_ready('flash');
            },
            function() {
                loadJS();
            });
    } 

    function loadJS() {
        I.require('CloudJS', function() {
            I.clouds.add( new I.CloudJS( 
                vars.target, vars, cloud_ready ) );
            //var _cloud = new I.CloudJS( vars );
            //_cloud.add_to_dom( vars.target, 
                //function() {
                    //I.clouds.add( _cloud );
                    //cloud_ready('js');
                //},
                //function() { [>error<] } 
                //);
        });
    }

})(this, Infomous);
