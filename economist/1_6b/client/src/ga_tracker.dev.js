/*!
 * Infomous Google Analytics Tracker
 * http://www.infomous.com/
 * 
 * @constructor
 * @param {string} name
 * @param {string} account id
 */

Infomous.define('GAtracker', (function(I) {

var GAtracker = function(name, account) {

	//ga global
	_gaq = window._gaq || [];

	this.set_account(name, account);

	if ( GAtracker.inited() )
		return;

	(function() {
		var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
		ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
		var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
	})();
}

GAtracker.inited = function() {
	return typeof _gaq !== 'undefined' && typeof _gat !== 'undefined';
        //&& _gat._getTracker !== undefined;
}

GAtracker.prototype = {

    constructor: GAtracker,

    //https://developers.google.com/analytics/devguides/collection/gajs/

    set_account: function(name, account) {
        
        this.name = name;
        this.account = account;

        //_gaq.push( function() {
            //_gat._createTracker(account, name); 
        //});			

        _gaq.push([ name + '._setAccount', account ]);
    },

    track_event: function(action, label, cvars, url) {

        if (typeof cvars === 'string' && url === undefined) {
            url = cvars.slice();
            cvars = undefined;
        }

        // set
        this.set_custom_var( cvars );

        // track (use url as category)
        if (!url) {
            try {
                url = window.top.location.href;
            }
            catch (err) {
                url = document.referrer;
            }
        }
        
        _gaq.push([ this.name + '._trackEvent', url, action, label ]);

        I.log('[GAtracker]', 'track event', this.name, 'url', url);
        
        // del
        this.del_custom_var( cvars );
    },

    track_page: function(cvars, url) {

        if (typeof cvars === 'string' && url === undefined) {
            url = cvars.slice();
            cvars = undefined;
        }

        // set
        this.set_custom_var( cvars );

        // track (use url as category)
        if (!url) {
            try {
                var loc = window.top.location;
                url = loc.protocol + '//' + loc.host + loc.pathname + loc.hash;
            }
            catch (err) {
                url = document.referrer;
            }
        }

        _gaq.push([ this.name + '._trackPageview', url ]);

        I.log('[GAtracker]', 'track page', this.name, 'url', url);

        // del
        this.del_custom_var( cvars );
    },

    /*
     * @param {Array} of Objects with { [index,] name, value, opt_scope }
     */

    set_custom_var: function(data) {	

        if (data === undefined) 
            return;

        data = I.make_array(data);

        var i = data.length;
        while (i--) { 
            if (data[i] === undefined) 
                continue;
            _gaq.push([ this.name + '._setCustomVar', 
                data[i].index || (i + 1),
                data[i].name, 
                data[i].value, 
                data[i].opt_scope ]);
        }
    },

    del_custom_var: function(data) {

        if (data === undefined) 
            return;
        
        data = I.make_array(data);

        var i = data.length;
        while (i--) {
            if (data[i] === undefined) 
                continue;
            _gaq.push([ this.name + '._deleteCustomVar', 
                    data[i].index || (i + 1) ]);
        }
    }
};

return GAtracker;

})(Infomous) );

