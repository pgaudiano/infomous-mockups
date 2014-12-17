/*!
 * Infomous Cloud Flash
 * http://www.infomous.com/
 *
 * @constructor
 * @param {Object} config
 */

(function(I) {

var CloudFlash = function(_config) { 
    
    //immutable
    var cfg = I.extend(_config);
    this.config = function() { return cfg; };  
}

CloudFlash.required_version = function() {
    return '10.0.0';
}

CloudFlash.supported = function() {
    return swfobject.hasFlashPlayerVersion(CloudFlash.required_version());  
}

CloudFlash.prototype.add_to_dom = function( _target_id, ready, error ) {

    var self = this;

    self.id = function() { return _target_id; }
    self.dispose = function() { /* events */ } 

    function run( fn ) { if (typeof fn === 'function') fn(); }

    function complete( success ) {
        ( success ? run(ready) : run(error) );
        delete I.bus.flash.load;
    }

    var cfg = this.config();

    if ( cfg.platform === 'js' || ! CloudFlash.supported() ) {
        complete( false );
        return;
    } 

    I.bus.flash.load = function() {
        complete( true );
    }; 

    init_ga( cfg.trackGAAccount );

    var base_path = I.base_path();
    var req = CloudFlash.required_version();

    // global params for flash
    var params = window.params || {
        allowFullScreen: true,
        allowScriptAccess: 'always',
        bgcolor: typeof(cfg.colBackground) == 'undefined' ? "#FAFAFA" : cfg.colBackground.replace('0x', '#')
    };

    var flashvars = {};
    for (var k in cfg)
        flashvars[k] = encodeURIComponent( cfg[k] );
    //pass flash a version of vars with no dimensions to avoid problems with %
    delete flashvars.width;
    delete flashvars.height; 

    I.require('jquery', function() {

        var cloud_div_id = self.id()+'-flash-cloud';

        var cloud_div = I.$('<div id="'+cloud_div_id+'"/>');
        I.$( '#'+self.id() ).append( cloud_div );

        swfobject.embedSWF(base_path + "infomous2.swf", cloud_div_id, cfg.width, cfg.height, req, false, flashvars, params, null, 
            function(e) {
                if (e.success)
                    //init(swfobject.getObjectById(cloud_div_id));
                    init( document.getElementById(cloud_div_id) );
                else
                    complete( false );
            });
    });  

    function init( flash ) {

        I.log('[CloudFlash]', 'init', flash);  

        self.get_var = function(key) {
			return flash.getVar(key);
		}

		self.set_var = function(key, value) {
			flash.setVar(key, value);
		}
		
		self.set_vars = function(hash) {
			flash.setVars(hash);
		}	
	
		self.set_feeds = function(feeds_str) {
			flash.setFeeds(feeds_str);
			if ( I.is_empty( feeds_str ) )
				self.empty_cloud();
		}

        self.make_request = function() {
			flash.makeRequest();
		}

        self.kill_current_request = function() {
			flash.killRequest();
		}

		self.empty_cloud = function() {
			flash.killRequest();
			flash.emptyCloud();
		}	

		self.get_save_state = function() {
			return flash.jsGetCloudState();
		}
    }
}

function init_ga( account ) {

    account = account || I.GAtracker.def_acct();

    I.GAtracker.load();
    
    var name = 'as3';

    _gaq.push([ name + '._setAccount', account ]);

    I.bus.flash.tracker = {
        trackEvent: function(url, action, label) {
            _gaq.push([ name + '._trackEvent', url, action, label ]);
        },
        //trackPage: function(url) {
            //_gaq.push([ name + '._trackPageview', url ]);
        //},
        setCustomVar: function(_i, _name, _value) {
            _gaq.push([ name + '._setCustomVar', 
                    _i, _name, _value ]);
        },
        deleteCustomVar: function(_i) {
            _gaq.push([ name + '._deleteCustomVar', _i ]);
        }
    };
}

I.define('CloudFlash', CloudFlash);

})(Infomous);

