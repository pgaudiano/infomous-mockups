/*!
 * Infomous Cloud Proxy
 * http://www.infomous.com/
 *
 * @constructor
 * @param {string} 'js' | 'flash'
 * @param {Object} config
 */

(function(I) {

var CloudProxy = function(_platform, _config, _id) {

	if (!(this instanceof CloudProxy))
		return new CloudProxy(_platform, _config, _id);
	
	I.events(this);

	_platform = _platform || 'flash';
	//this.platform = function() { return _platform; };

    _id = _id || 'cloud_proxy_'+new Date().getTime();
    this.id = function() { return _id; };
	
	//FIXME config is a pointer to vars
    this.config = _config || {}; 
	//this.config = I.extend( _config ); //make a copy

	var impl = _clouds[_platform](this);
	impl.init();

    this.get_var = function(key) {
		return impl.get_var(key);
	}

	this.set_var = function(key, value) {
		value = I.esc(value);
		I.log('[CloudProxy]', this.id(), 'set_var', key,value);
		this.dispatch( key, {
			key: key,
			value: value
		});
        this.config[key] = value; 
		return impl.set_var(key, value);	
	}

	this.set_vars = function(hash) {
		I.esc(hash);	
		I.log('[CloudProxy]', this.id(), 'set_vars', hash);
        for (var k in hash) {
            //this.set_var( k, hash[k] );
            this.dispatch( k, {
                key: k,
                value: hash[k]
            });
            this.config[k] = hash[k];
        }
		return impl.set_vars(hash);
	}

	this.make_request = function() {
		I.log('[CloudProxy]', this.id(), 'make_request');
		return impl.make_request();
	}

	this.set_feeds = function(feeds_str) {
		I.log('[CloudProxy]', this.id(), 'set_feeds', feeds_str);
        this.set_var('feeds', feeds_str);
		return impl.set_feeds(feeds_str);	
	}

	this.empty_cloud = function() {
		I.log('[CloudProxy]', this.id(), 'empty_cloud');
		return impl.empty_cloud();
	}

	this.kill_current_request = function() {
		I.log('[CloudProxy]', this.id(), 'kill_current_request');
		return impl.kill_current_request();
	}

	this.get_save_state = function() {
		I.log('[CloudProxy]', this.id(), 'get_save_state');
		return impl.get_save_state();
	}

    this.has_feeds = function(feeds_str) {
        feeds_str = feeds_str || (this.get_var('feeds') || '');
        return feeds_str.replace(/\s/g,'') !== '';
    }
}

var _clouds = {};

//% js impl

_clouds.js = function(proxy) {

	var cloudjsview;

	return {

		init: function() {

			I.log( '[CloudProxy]', proxy.id(), 'init js' );
			
			cloudjsview = I.clouds.get(); //get default cloud 

			cloudjsview.plug_toolbar(proxy);

			// cloud js input events...
			cloudjsview.on('hide', function(e) {
				add_word('hidden', e.word);
			});

			cloudjsview.on('focus', function(e) {
				add_word('focused', e.word);
			});

			cloudjsview.on('unfocus', function(e) {
				remove_word('focused', e.word);	
			});

			cloudjsview.on('unfocus_all', function(e) {
                if ( I.is_empty( proxy.get_var('focused') ) )
                    return;
				proxy.set_var('focused', '');
                proxy.make_request();
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
				var rm = I.remove(curr, word);
                proxy.set_var( key, curr.join() );
                if (rm) proxy.make_request();
			}
		},

		get_var: function(key) {
			return cloudjsview.get_var(key);
		},

		set_var: function(key, value) {
            cloudjsview.set_var(key, value);
		},
		
		set_vars: function(hash) {
            cloudjsview.set_vars(hash);
		},

        set_feeds: function(feeds_str) {

			if ( I.is_empty( feeds_str ) ) {
				proxy.empty_cloud();
				cloudjsview.add_cloud_feedback('Please add some content to the cloud');
			}
			else cloudjsview.remove_cloud_feedback();

			//proxy.set_var('feeds', feeds_str);
		},

		make_request: function() {
			cloudjsview.make_request();
		},

        kill_current_request: function() {
			cloudjsview.kill_current_request();
		},

		empty_cloud: function() {
			//cloudjsview.empty_cloud();
            cloudjsview.kill_current_request();
            cloudjsview.render(undefined);
		},	

		get_save_state: function() {
			var data = proxy.config;
            //see as3/com.ui.util.Saver.getVariables()
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

//% flash impl

_clouds.flash = function(proxy) {
	var cloudf;
	return {
		init: function() {
			I.log( '[CloudProxy]', proxy.id(), 'init flash' );
            cloudf = I.clouds.get(); //get default cloud
		},
		get_var: function(key) {
			return cloudf.get_var(key);
		},
		set_var: function(key, value) {
			cloudf.set_var(key, value);
		},
		set_vars: function(hash) {
			cloudf.set_vars(hash);
		},
		make_request: function() {
			cloudf.make_request();
		},
		set_feeds: function(feeds_str) {
			cloudf.set_feeds(feeds_str);
		},
		empty_cloud: function() {
			cloudf.empty_cloud();
		},
		kill_current_request: function() {
			cloudf.kill_current_request();
		},
		get_save_state: function() {
			return cloudf.get_save_state();
		}
	}
};

I.define('CloudProxy', CloudProxy);

})(Infomous);

