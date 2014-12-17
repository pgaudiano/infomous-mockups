/*!
 * Infomous Events
 * http://www.infomous.com/
 * 
 * @constructor
 */

(function(I) {

var Events = function() {

    this.listeners = { all: [] };
}

Events.prototype = {

	constructor: Events, 

	on: function(types, fn, context) {

        var lst = this.listeners;

        if ( I.contains(lst,fn) )
			return false;
		
        types = I.to_arr(types);
		
        var type,
		    i = types.length;
		
        while(i--) {
			type = types[i];
			lst[type] = lst[type] || []; 
			lst[type].push({ 
				fn: fn, 
				context: context || this
			});
		}
		return true;
	},

	//TODO FIXME
	
    off: function(types, fn, context) {

		types = I.to_arr(types);
		
        if ( ! I.contains(types, 'all') )
			types = types.concat('all');
		
        var type, 
		    i = types.length;
		
        var list, len, j;
		
        while(i--) {
			type = types[i];
			list = this.listeners[type];
			len = list ? list.length : 0;
			for (j = 0; j < len; j++) {
				if (list[j].fn === fn && 
					list[j].context === context ) 
					list.splice(j, 1);
			}
		}
	},	

	dispatch: function(types, _event) {

		types = I.to_arr(types);

		var lst = this.listeners,
		    type,
		    tylen = types.length;

		var callbacks,
		    callback,
		    cblen;

		for (var i = 0; i < tylen; i++) {
			type = types[i];
			callbacks = lst.all.concat( lst[type] );
			cblen = callbacks.length;
			for (var j = 0; j < cblen; j++) {
				callback = callbacks[j];
				if (callback === undefined) 
					continue;
				callback.fn.call( callback.context, _event || {} );
			}
		}
	}

    //has: function(fn) {
		//var lst = this.listeners,
			//i = lst.length;
		//while(i--) 
			//if ( lst[i].fn === fn )
				//return true;
		//return false;
	//}
};

Infomous.define('Events', Events);

})(Infomous);

