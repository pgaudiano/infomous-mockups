
(function(root, I) {

    root.base_root = root.base_root || I.base_root();
    root.base_path = root.base_path || I.base_path();
    root.forceFlash = false;

    root.vars = root.vars || {};

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
        proxy = new CloudProxy(platform, vars);
        if ( typeof user_cb === 'function' )
            user_cb(platform);
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

    function loadFlash(){
        //pass flash a version of vars with no dimensions to avoid problems with %
        var flashvars = {};
        for(var v in vars) flashvars[v] = encodeURIComponent(vars[v]);
        delete flashvars.width;
        delete flashvars.height;

        if((navigator.userAgent.indexOf('Android') != -1  || vars.platform == 'js') && forceFlash == false) loadJS();
        else swfobject.embedSWF(base_path + "infomous2.swf", vars.target, vars.width, vars.height, "10.0.0", false, flashvars, params, null, so_callback);
    }

    function so_callback(e) {
        if(e.success == false){
            if(vars.flashOnly){
                document.getElementById(vars.target).innerHTML = '<div class="flashOnly">Sorry, this cloud can only be viewed in devices that support Flash</div>';
            }else{
                loadJS();
            }
        }
    }

    function loadJS() {
        I.require('CloudJS', function() {
            root.infomous_js = new CloudJS(vars);
        });
    }

})(this, Infomous);
