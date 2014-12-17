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

    this._loc = window.top.location;
	
	this.set_account(name, account);

	if ( GAtracker.loaded() )
		return;

	(function() {
		var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
		ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
		var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
	})();
}

GAtracker.loaded = function() {
	return typeof _gaq !== 'undefined' && typeof _gat !== 'undefined' 		
		&&  _gat._getTracker !== undefined;
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
        url = url || this._loc.href;
        _gaq.push([ this.name + '._trackEvent', url, action, label ]);
        
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

        // track
        var loc = this._loc;
        url = url || (loc.protocol+'//'+loc.host+loc.pathname+loc.hash);
        _gaq.push([ this.name + '._trackPageview', url ]);

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

