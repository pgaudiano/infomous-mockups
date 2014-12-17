/*!
 * Infomous Cloud Toolbar
 * http://www.infomous.com/
 */

Infomous.define('CloudToolbar', (function(I) {

var CloudToolbar = function(config) {

	if (!(this instanceof CloudToolbar)) 
		return new CloudToolbar(config);

	config = config || {};

	I.esc(config);
	I.events(this);

	var $ = I.$;

	var state = {
		groups: true,
		sliders: {
			'maxWords': {
				value: 40,
				text: "Words",
				id: "maxWords",
				b_make_request: true,
				send_events: {
					change: true, slide: false
				},
				opt: {
					min: 1, max: 100, step: 1
				}
				
			},
			'zoom': {
				value: 0.9,
				text: "Zoom",	
				id: "zoom",
				b_make_request: true,
				send_events: {
					change: true, slide: false
				},
				opt: {
					min: 1, max: 4, step: 0.1
				}
			},
			'fontScale': {
				value: 1.1,
				text: "Font Size",
				id: "fontScale",
				b_make_request: true,
				send_events: {
					change: true, slide: false
				},
				opt: {
					min: 0.1, max: 5, step: 0.1
				}
			},
			curr_id: '',
			curr: function() {
				return this[this.curr_id];
			},
			foreach: function(fn) {
				var k, slider;
				for (k in this) {
					slider = this[k];
					if (slider === undefined ||
						slider.value === undefined)
						continue;
					fn.call(slider, k, slider);
				}
			}
		}
	};

	var wordfilters_cfg = {
		'hidden': {
			button_text: 'Hidden Words',
			add_button_text: 'Hide Term',
			dialog_title: 'Add Hidden Term',
			default_text: 'Please enter a word to hide...'
		},
		'focused': {
			button_text: 'Focused Words',
			add_button_text: 'Focus Term',
			dialog_title: 'Add Focused Term',
			default_text: 'Please enter a word to focus on...'
		}
	};
	
	// init widgets
	
	var _this = this,
	    _toolbar_id = 'cloud-toolbar',
	    _toolbar = $('<div/>', { 'class': _toolbar_id }),
	    widgets = {
		has: function(widget) {
			return this[widget] !== undefined;
		}
	    };

	config.has = function(widget) {
		return this.controls === undefined
			|| this.controls.toLowerCase().indexOf(
					widget.toLowerCase()) != -1;
	};

	if ( !config.has('font') ) delete state.sliders.fontScale;
	if ( !config.has('zoom') ) delete state.sliders.zoom;
	if ( !config.has('words') ) delete state.sliders.maxWords;

	state.sliders.curr_id = (function() { //pick the first valid slider
		var curr_id, i = 0;
		state.sliders.foreach( function(k, slider) {
			if (i++ == 0) 
				curr_id = slider.id;
		});
		return curr_id;
	})();

	if ( config.has('slider') ) {
		widgets.sliders = make_sliders(_toolbar);
		widgets.sliders_widget = make_sliders_widget(
				_toolbar, widgets.sliders);
	}

	if ( config.has('dict') )
		widgets.dict = make_dict(_toolbar);
	
	if ( config.has('focus') )
		widgets.focused = make_wordfilter(_toolbar, 'focused');
		widgets.hidden = make_wordfilter(_toolbar, 'hidden');
	
	if ( config.has('groups') )
		widgets.groups = make_groups(_toolbar);	

	if ( widgets.has('sliders') ) {
		state.sliders.foreach( function(k, slider) {
			_update_dispatch_slider(
				slider.id, slider.value, false);
		});
		widgets.sliders.get_selected_item().click();
	}

	// public methods TODO add to prototype	
	
	this.update_dict = function(dict_str) {
		_update_dict( dict_str );
	}	

	this.update_focused = function(focused_str) {
		_update_wordfilter( 'focused', focused_str );
	}

	this.update_hidden = function(hidden_str) {
		_update_wordfilter( 'hidden', hidden_str );
	}

	this.update_groups = function(b_groups) {
		_update_groups(b_groups);
	}

	//this.update_slider = function(id, value) {
		//_update_slider(id, value);
	//}

	this.update_maxWords = function(value) {
		_update_slider('maxWords', value);
	}

	this.update_zoom = function(value) {
		_update_slider('zoom', value);
	}

	this.update_fontScale = function(value) {
		_update_slider('fontScale', value);
	}

	this.add_to_dom = function($target) {
		
		_toolbar.appendTo($target);

		_toolbar.css( 'width', to_css_dim( config.width || 'auto' ) );
		
		var height = _toolbar.height();

		hide(widgets);

		function hide(obj) {
			var key, wgt;
			for (key in obj) {
				wgt = obj[key];
				if (wgt.jquery !== undefined) {
					if (wgt.position().top >= height)
						wgt.hide();
					else
						wgt.show();
				}
				else if (Object.prototype.toString.call(wgt) 
						=== "[object Object]")
					hide(wgt);
			}
		}

		function to_css_dim(val) {

			var n = parseInt(val); 

			return isNaN(n) ? 'auto' : n + parse_format(val);

			function parse_format(css) {
				return !I.is_str(css) ? 'px' : //num is px
					(css.indexOf('px') != -1 ? 'px' : 
					 (css.indexOf('%') != -1 ? '%' : ''));
			}	
		}
	}

	this.$el = function() {
		return _toolbar;
	}

	this.close_all_menues = function() {
		$.each( widgets, function(k, widget) {
			if (widget.get_list !== undefined)
				widget.get_list().hide();
		});
	}

	//this.has_opened_menues = function() {
		//var k, widget, list;
		//for (k in widgets) {
			//widget = widgets[k];
			//if (widget.get_list === undefined)
				//continue;
			//list = widget.get_list();
			//if ( ! list.hidden )
			//return true;
		//}
	//}

	this.update_focused('');
	this.update_hidden('');

	// update and dispatch
	
	function _update_dispatch_dict(dict_str, b_make_request) {
		_update_dict( dict_str );
		_this.dispatch('dict', { 
			key: 'dict',
			value: dict_str,
			b_make_request: b_make_request
		});
	}

	function _update_dispatch_wordfilter(id, word_str, b_make_request) {
		_update_wordfilter( id, word_str );
		_this.dispatch( id, {
			key: id,
			value: word_str,
			b_make_request: b_make_request
		});
	}	

	function _update_dispatch_groups(b_groups, b_make_request) {
		_update_groups( b_groups );
		_this.dispatch( 'groups', {
			key: 'groups',
			value: b_groups,
			b_make_request: b_make_request
		});
	}

	function _update_dispatch_slider(id, value, b_make_request) {
		_update_slider( id, value );
		_this.dispatch( id, {
			key: id,
			value: value,
			b_make_request: b_make_request
		});
	}

	// word filters
	
	function make_wordfilter(container, id) {
		
		var _id = 'ctrls-'+id,
		    btid = _id+'-bt',
		    listid = _id+'-list';

		var filter = $('<div/>', { 'class': _id + ' ctrls-widget' }),
		    bt = $('<button/>', { 'class': btid }),
		    list = $('<div/>', { 'class': listid });

		bt.text( wordfilters_cfg[id].button_text );

		filter.get_list = function() {
			return list;
		}

		init_dropup_menu(container, filter, list, bt);

		return filter;
	}

	function _update_wordfilter(id, words_str) { 

		if ( !widgets.has(id) )
			return;

		var itemid = 'ctrls-'+id+'-list-item',
		    list = widgets[id].get_list();

		list.empty();

		var add_bt = make_wordfilter_add_bt(list, id);

		var words_arr = words_str ? words_str.split(',') : [];
		$.each(words_arr, function(i, word) {
			list.append(
			'<div>'+
			'<button class="'+itemid+'">'+word+'</button>'+
			'</div>');
		});

		var items = list.find('.'+itemid);
		items.button( {
			icons: {
				secondary: 'ui-icon-close'
			} 
		});
		items.unbind('click');
		items.click( function() {
			var word = $(this).text();
			remove_word.call(_this, word, id);
		});
		
		init_dropup_item(add_bt);
		init_dropup_item(items);	
	}

	function get_words_str(id) {
		var words_str = '',
		    list = widgets[id].get_list(),
		    itemid = 'ctrls-'+id+'-list-item',
		    items = list.find('.'+itemid);
		items.each( function(i, elem) {
			words_str += $(elem).text()+',';
		});
		return words_str.slice(0, words_str.length-1);
	}

	function make_wordfilter_add_bt(container, id) {

		var bt_id = 'ctrls-'+id+'-add-bt',
		    bt_class = 'ctrls-word-add-bt';

		var add_bt = $('<button class="'+bt_class+'"/>');
		
		container.remove('.'+bt_id);
		container.append( $('<div class="'+bt_id+'"/>')
				.append(add_bt) );

		var title = wordfilters_cfg[id].add_button_text;
		add_bt.text(title);
		add_bt.button({
			icons: {
				secondary: 'ui-icon-plus'
			} 
		});
		add_bt.unbind('click');
		add_bt.click( function() {
			add_wordfilter_dialog( id, function(e) {
				process_wordfilter_user_input(e, id, add_word);
			});
		});

		return add_bt;
	}

	function add_word(word, id) {
		var word_str = get_words_str(id),
		    word_arr = _is_empty(word_str)?[]:word_str.split(',');
		word_arr.push(word);
		var word_str = word_arr.join();

		_update_dispatch_wordfilter.call(_this, id, word_str, true);
	}

	function remove_word(word, id) {
		var word_arr = get_words_str(id).split(',');
		I.remove( word_arr, word);
		var word_str = word_arr.join();
		
		_update_dispatch_wordfilter.call(_this, id, word_str, true);
	}

	function add_wordfilter_dialog( id, callback ) {

		var diag_id = 'ctrls-'+id+'-add-dialog',
		    diag_class = 'ctrls-dialog ctrls-word-add-dialog',

		    diag_input_id = diag_id+'-input',
		    diag_input_class = diag_class+'-input',
		    
		    dialog = $('<div/>', {
			'id': diag_id,
		    	'class': diag_class,
		    	'title': wordfilters_cfg[id].dialog_title 
		    }),
		    input = $('<input/>', {
			'type': 'text',
		    	'id': diag_input_id,
		    	'class': diag_input_class
		    });

		$('#'+diag_id).remove();
		dialog.append( input );
		$('body').append( dialog );

		dialog.dialog({
			buttons:
			[
				{
					text: 'Add',
					click: callback
				},
				{
					text: 'Cancel',
					click: function() { dialog.remove(); }
				}
			 ]
		});

		input.unbind('keydown');
		input.keydown( callback );
		input.attr('size', 50);
		input.focus();
	}

	function process_wordfilter_user_input(e, id, callback) {

		if ( ! _enter_key(e) )
			return;

		var dialog = $('#ctrls-'+id+'-add-dialog');
		var input = dialog.find('#ctrls-'+id+'-add-dialog-input');
		
		var word = escape( $(input).val() );
		var def_txt = wordfilters_cfg[id].default_text;

		if ( _is_empty( word ) || word == def_txt ) {
			$(input).val( def_txt );
			return;
		}
		callback.call(_this, word, id);
		dialog.remove();
	}

	// sliders

	function make_sliders(container) {

		// create sliders menu

		var id = 'ctrls-sliders',
		    btid = id+'-bt',
		    listid = id+'-list',
		    itemid = id+'-list-item',
		    timestamp = '_'+new Date().getTime();

		var sliders = $('<div/>', { 
			    'id': id + timestamp,
		    	    'class': id + ' ctrls-widget' 
		    }),
		    bt = $('<button/>', { 
			    'id': btid + timestamp,
				'class': btid 
		    }),
		    list = $('<div/>', { 
			    'id': listid + timestamp,
				'class': listid 
		    });	

		var it, itid;
		state.sliders.foreach( function(k, slider) {
			it = slider.id;
			itid = itemid + '-' + it + timestamp;
			list.append(
			'<div>'+
				'<input type="radio" '+
					'id="'+itid+'" '+
					'name="'+listid+'" '+
					'value="'+it+'" '+
					'checked="">'+
				'<label for="'+itid+'" '+
					'class="'+itemid+'">'+
						slider.text+'</label>'+
			'</div>');
		});

		sliders.get_list = function() {
			return list;
		}

		sliders.get_bt = function() {
			return bt;
		}

		sliders.get_items = function() {
			return list.find('input[name="'+listid+'"]');
		}

		sliders.get_selected_item = function() {
			return list.find(
				'input[value="'+state.sliders.curr_id+'"]');
		}

		init_dropup_menu(container, sliders, list, bt);

		var labels = list.find('label[class="'+itemid+'"]');
		init_dropup_item(labels);

		return sliders;
	}

	function make_sliders_widget(container, sliders) {

		var list = sliders.get_list(),
		    bt = sliders.get_bt(),
		    items = sliders.get_items();

		// create slider widget

		var widget_box_id = 'ctrls-slider',
		    widget_val_id = widget_box_id+'-value',
		    widget_val_box_id = widget_box_id+'-value-container',
		    widget_id = widget_box_id+'-widget',
		    timestamp = '_'+new Date().getTime();

		var widget_box = $('<div/>', { 
			    'id': widget_box_id + timestamp,
			    'class': widget_box_id + ' ctrls-widget' 
		    }),
		    widget_val_box = $('<div/>', { 
			    'id': widget_val_box_id + timestamp,
			    'class': widget_val_box_id
		    }),
		    widget_val = $('<p/>', { 
			    'id': widget_val_id + timestamp,
			    'class': widget_val_id 
		    }),
		    widget = $('<div/>', { 
			    'id': widget_id + timestamp,
			    'class': widget_id 
		    });

		widget_box.update = function(value) {
			widget_val.text(value);
			widget.slider('value', value);
		};

		widget_val_box.append(widget_val);
		widget_box.append(widget_val_box);
		widget_box.append(widget);

		container.append(widget_box);	

		//	

		items.unbind('click');
		items.click( on_slider_select );
		items.button();

		var opt = $.extend( true, {}, 
				state.sliders.curr().opt );

		opt.value = state.sliders.curr().value;
		opt.slide = on_slider_slide;
		opt.change = on_slider_change;

		widget.slider(opt);

		var curr_value = widget.slider('value');
		widget_val.text( curr_value );

		return widget_box;

		function on_slider_select() {

			state.sliders.curr_id = $(this).attr('value');

			var curr = state.sliders.curr();

			widget_val.text( curr.value );
			widget.slider('option', curr.opt);
			widget.slider('value', curr.value);

			bt.find('.ui-button-text').text( curr.text );

			list.mouseleave();
		}

		function on_slider_slide(e, ui) {
			widget_val.text(ui.value);
			state.sliders.curr().value = ui.value;
			update_curr_slider('slide');
		}

		function on_slider_change(e, ui) {
			if ( !e.originalEvent )
				return;
			update_curr_slider('change');
		}

		function update_curr_slider(event_id) {
			var curr = state.sliders.curr();
			if ( curr.send_events[event_id] === false )
				return;
			_update_dispatch_slider(
				curr.id, 
				curr.value, 
				curr.b_make_request);
		}
	}	

	function _update_slider(id, value) {

		if ( !widgets.has('sliders') )
			return;

		var _state = state.sliders[id],
		    curr = state.sliders.curr();
		if ( id == curr.id ) {
			widgets.sliders_widget.update(value);	
		}
		_state.value = value;
	}

	// dict

	function make_dict(container) {	

		// create dict

		var id = 'ctrls-dict',
		    btid = id+'-bt',
		    listid = id+'-list',
		    itemid = id+'-list-item';

		var dict = $('<div/>', { 'class': id + ' ctrls-widget' }),
		    bt = $('<button/>', { 'class': btid }),
		    list = $('<div/>', { 'class': listid });

		bt.text('Dictionaries');	
		
		var _items = [
			'noun','verb','adjective','adverb','number','other'];

		var i, it, itid;
		for (i = 0; i < _items.length; i++) {
			it = _items[i];
			itid = itemid+'-'+it;
			list.append(
			'<div class="ui-widget">'+
				'<input type="checkbox" '+
					'id="'+itid+'" '+
					'title="'+it+'" '+
					'checked="checked">'+
				'<label for="'+itid+'" '+
					'class="'+itemid+'">'+it+'</label>'+
			'</div>');
		}

		dict.get_list = function() {
			return list;
		}

		init_dropup_menu(container, dict, list, bt);

		var items = list.find('input[type="checkbox"]');
		items.unbind('click');
		items.click(function() { 
			var dict_str = get_dict_str();
			_update_dispatch_dict( dict_str, true ); 
		});	

		return dict;
	}	

	function get_dict_str() {
		var dict_str = '',
		    items = widgets.dict.get_list().find(
				    'input[type="checkbox"]');
		items.each( function(i, elem) {
			var cb_part = elem.getAttribute('title');
			var checked = $(elem).attr('checked');
			var hide = checked ? '1' : '0';
			dict_str += cb_part.toUpperCase()+'|'+hide+",";
		});
		return dict_str.slice(0, dict_str.length-1);
	}

	function _update_dict(dict_str) {

		if ( !widgets.has('dict') )
			return;

		var dict_arr = dict_str.split(',');
		var items = widgets.dict.get_list().find(
				'input[type="checkbox"]');
		items.each( function(i, cb) {
			var cb_part = cb.getAttribute('title');
			$.each(dict_arr, function(j, d) {
				var d_data = d.split('|');
				var d_part = d_data[0];
				var d_checked = I.bool( d_data[1] );
				if ( d_part.toLowerCase() == 
					cb_part.toLowerCase() ) {
					$(cb).attr('checked', 
						d_checked ? 'checked' : '');
					return false;
				}
			}); 
		});
	}

	// groups

	function make_groups(container) {

		var id = 'ctrls-groups',
		    cbid = id+'-cb',
		    txt = 'Groups';

		var groups = $('<div/>', { 
			'class': id + ' ctrls-widget ui-widget'
		});
		groups.append(
			'<input type="checkbox" id="'+cbid+'">'+
			'<label for="'+cbid+'">'+txt+'</label>');

		container.append(groups);

		var checkbox = groups.find('input[type="checkbox"]');
		checkbox.attr('checked', state.groups);
		checkbox.unbind('click');
		checkbox.click( function() {
			var checked = checkbox.is(':checked');
			_update_dispatch_groups(checked, true);
		});

		return groups;
	}

	function _update_groups(b_groups) {

		if ( !widgets.has('groups') )
			return;

		var checkbox = widgets.groups.find('input[type="checkbox"]');
		checkbox.attr('checked', b_groups);
		state.groups = b_groups;
	}

	// dropup menu

	function init_dropup_menu(container, dropup, list, bt) {

		var speed = 'fast';

		dropup.addClass('ctrls-dropup');
		list.addClass('ctrls-dropup-list');
		bt.addClass('ctrls-dropup-bt');

		hide();

		bt.unbind('click');
		bt.click( function() {
			//if ( list.css('display') === 'none' ) {
			if ( list.hidden ) {
				fadein();
			}
			else {
				fadeout();
			}
			//list.fadeToggle('fast'); only since 1.4.4
		});
		bt.button({
			icons: {
				secondary: 'ui-icon-triangle-1-s'
			}
		});		

		list.unbind('mouseleave');
		list.mouseleave( fadeout );

		function hide() {
			list.hide();
			list.hidden = true;
		}

		function fadeout() {
			list.fadeOut(speed);
			list.hidden = true;
		}

		function fadein() {
			list.fadeIn(speed);
			list.hidden = false;
		}

		container.append(dropup);
		dropup.append(bt); 
		dropup.append(list);
	}

	function init_dropup_item($elem) {
		$elem.addClass('ctrls-dropup-list-item');
		css_border_radius($elem, '0px');
	}

	function css_border_radius($elem, radius) {
		//-moz-border-radius-topleft: 0px; 
		//-webkit-border-top-left-radius: 0px; 
		//-khtml-border-top-left-radius: 0px;
		$elem.css('border-top-left-radius', radius);
		$elem.css('border-top-right-radius', radius);
		$elem.css('border-bottom-left-radius', radius);
		$elem.css('border-bottom-right-radius', radius);
	}

	// private utils
	
	function _is_empty(str) {
		if ( !I.is_str(str) )
			return true;
		return str.replace(/\s/g,"") === "";
	}

	function _enter_key(e) {
		if ( e.type == 'keydown' && e.keyCode != '13')
			return false;
		e.preventDefault();
		return true;
	}
};

return CloudToolbar;

})(Infomous) );

