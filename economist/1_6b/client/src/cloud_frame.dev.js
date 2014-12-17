
/*!
 * Infomous Cloud Frame
 * http://www.infomous.com/
 *
 * @constructor
 * @param {Object} config
 */

Infomous.define('CloudFrame', (function(I) {

var CloudFrame = function(config) {

	if (!(this instanceof CloudFrame))
		return new CloudFrame(config);

	I.esc(config);
	I.events(this);

	config.title = config.title || 'Explore News Content';
	config.help = config.help || 'hover & click to explore';

	var self = this,
	    $ = I.$,
	    base_class = 'infomous-embed-frame',
	    $frame = make_frame(),
	    //$cloud = make_cloud_container(),
	    $header = make_header( config.title, config.help ),
	    $footer = make_footer();

	$frame.append( $header );
	//$frame.append( $cloud );
	$frame.append( $footer );

	this.add_to_dom = function( $target ) {
		
        if ($target.jquery === undefined)
            $target = $($target);

        $target.after( $frame );
		//$cloud.append( $target );
		$header.after( $target );
		//$target.wrap( $frame );
        
        $frame.css('height', this.css_size().frame.height );
	}

    this.css_size = function() {

        var _header = {
                height: $header.outerHeight(true)
            },
            _footer = {
                height: $footer.outerHeight(true)
            };

        var relative_h = !I.is_abs_size( config.height );

        var _cloud = {
                width: I.css_size( config.width ),
                height: relative_h ? config.height : ( Math.abs( parseInt( config.height ) - (_header.height + _footer.height) ) ) + 'px'
            },
            _frame = {
                width: I.css_size( config.width ),
                height: relative_h ? config.height : (_header.height + _footer.height + parseInt( _cloud.height ) ) + 'px'
            };

        return {
            frame: _frame,
            cloud: _cloud
        };
    }

    //this.height = function() {
        //return $header.outerHeight(true) + $footer.outerHeight(true);
    //}
	
	function make_frame() {
		var $el = $('<div/>', {
			'class': base_class 
		});
		$el.css({
			width: css_size(config.width)
		});
		return $el;
	}

	function make_cloud_container() {
		var $el = $('<div/>', {
			'class': base_class+'-cloud-container'
		});
		return $el;
	}

	function make_header( title, help ) {

		var $el = $('<div/>', {
                'class': base_class+'-header '+base_class+'-elem'
	 	    }),
            $title = $('<p/>', {
                'class': base_class+'-header-title'
            }),
			//$title = $('<img/>', {
                //'class': base_class+'-header-title '+
					//base_class+'-header-elem',
				//'src': I.base_path()+'img/frame/title.png' 
			//}),
		    $help = $('<p/>', {
                'class': base_class+'-header-help '+base_class+'-header-elem'
		    });

		$title.text( title );
		$help.text( help );

		$el.css({
			width: css_size(config.width)
		});
        $title.css({
			width: css_size(config.width - 120)
		});
	
		$el.append( $title );
		$el.append( $help );

		return $el;
	}

	function make_footer() {

		var $el = $('<div/>', {
			'class': base_class+'-footer '+base_class+'-elem'
		    }),
		    base_img_url = I.base_path()+'img/frame/',
		    $enlarge = make_bt('enlarge',
				    config.nid !== undefined ?
				    	I.base_root()+'node/'+config.nid :
					I.base_root(),
				    base_img_url+'enlarge.png', 
				    'left'),
		    $help = make_bt('help',
				    I.base_root()+'help/interact', 
				    base_img_url+'help.png', 
				    'left'),
		    $visit = make_bt('visit',
				    I.base_root(), 
				    base_img_url+'visit_infomous.png', 
				    'right');
		    
		$el.css({
			width: css_size(config.width)
		});

		$el.append( $enlarge );
		$el.append( $help );
		$el.append( $visit );

		function make_bt( id, link_url, img_url, side ) {
			var baseclas = base_class+'-footer-btn',
			    $bt = $('<div class="'+baseclas+' '+
					baseclas+'-'+id+' '+
					baseclas+'-'+side+'">'+
					'<p><a href="'+link_url+'" '+
					'target="_blank" '+
					'class="btn" '+
					'style="background-image:'+
					'url('+img_url+')">'+
					'</a></p></div>');
			$bt.click( function() {
				self.dispatch('click', {
					id: id,
					url: link_url
				});
			});
			return $bt;
		}

		return $el;
	}

	function css_size(num) {
        if (num === undefined) 
            return undefined;
        return parseInt(num)+'px';
		//var str = num.toString();
		//return str.indexOf('%') == -1 ? str+'px' : str;
	}
}

return CloudFrame;

})(Infomous) );

