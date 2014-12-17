/*!
 * Infomous Google Analytics Tracker
 * http://www.infomous.com/
 * 
 * @constructor
 * @param {string} name
 * @param {string} account id
 *
 * https://developers.google.com/analytics/devguides/collection/gajs/
 */

(function(I) {

var GAtracker = function(opt) {

    GAtracker.load();

    var acct = opt.account || GAtracker.def_acct();

    this.nid = opt.nid;
    this.set_account(opt.name, acct);
}

GAtracker.def_acct = function() {
    return 'UA-18489566-1';
}

GAtracker.load = function() {

    if (window._gaq) return;

    //ga global
	_gaq = window._gaq || [];

    (function() {
		var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
		ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
		var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
	})();
}

GAtracker.prototype = {

    constructor: GAtracker,

    set_account: function(name, account) {
        
        this.name = name;
        this.account = account;

        _gaq.push([ name + '._setAccount', account ]);
    },

    track_event: function(opt) {

        var link_url = opt.link_url || {};

        //this.custom_vars.push();
        var cvars = [
            { name: 'nid', value: opt.nid || this.nid },
            { name: link_url.name, value: link_url.value }
            //{ name: 'vbfi', value: opt.vbfi }, 
            //{ name: 'uid', value: opt.uid }, 
            //{ name: 'account', value: opt.account }
        ];
        this.set_custom_vars( cvars );

        // use url as category
        var url = I.href();

        //var value = opt.value;
        //var noninteraction = opt.is_interaction;
        
        _gaq.push([ this.name + '._trackEvent', url, opt.action, opt.label ]);

        I.log('[GAtracker]', 'track event', this.name, 
                'url', url, 'opt', opt, 'cvars', cvars);
        
        //this.custom_vars.pop();
        this.del_custom_vars( cvars );
    },

    track_page: function(url) {

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

        //I.log('[GAtracker]', 'track page', this.name, 'url', url);
    },

    set_custom_vars: function(data) {	

        if (data === undefined) 
            return;

        data = I.to_arr(data);

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

    del_custom_vars: function(data) {

        if (data === undefined) 
            return;
        
        data = I.to_arr(data);

        var i = data.length;
        while (i--) {
            if (data[i] === undefined) 
                continue;
            _gaq.push([ this.name + '._deleteCustomVar', 
                    data[i].index || (i + 1) ]);
        }
    }
};

I.define('GAtracker', GAtracker);

})(Infomous);

