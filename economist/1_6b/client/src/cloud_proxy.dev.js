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

