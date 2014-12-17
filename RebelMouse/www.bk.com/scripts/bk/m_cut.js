//
// Distilled Modernizr
//

var testFor = testFor || {};

var mod = 'modernizr';
var modTestElem = document.createElement(mod);
var m_style = modTestElem.style;

var testFor = {
	
	htmlvideo : function() {
        var elem = document.createElement('video'),
            bool = !!elem['canPlayType'];
        
        if (bool){  
            bool      = new Boolean(bool);  
            bool.ogg  = elem['canPlayType']('video/ogg; codecs="theora"');
            bool.h264 = elem['canPlayType']('video/mp4; codecs="avc1.42E01E"');
            bool.webm = elem['canPlayType']('video/webm; codecs="vp8, vorbis"');
        }
        return bool;
    },


    htmlaudio : function() {
        var elem = document.createElement('audio'),
            bool = !!elem.canPlayType;
        
        if (bool){  
            bool      = new Boolean(bool);  
            bool.ogg  = elem.canPlayType('audio/ogg; codecs="vorbis"');
            bool.mp3  = elem.canPlayType('audio/mpeg;');
            
            // Mimetypes accepted: 
            //   https://developer.mozilla.org/En/Media_formats_supported_by_the_audio_and_video_elements
            //   http://bit.ly/iphoneoscodecs
            bool.wav  = elem.canPlayType('audio/wav; codecs="1"');
            bool.m4a  = elem.canPlayType('audio/x-m4a;') || elem.canPlayType('audio/aac;');
        }
        return bool;
    },
	
	csstransforms : function() {
        return !!testFor.test_props([ 'transformProperty', 'WebkitTransform', 'MozTransform', 'OTransform', 'msTransform' ]);
    },
	
	csstransitions : function() {
	    return testFor.test_props_all( 'transitionProperty' );
	},
	
	test_props_all : function ( prop ) {
	
	    var uc_prop = prop.charAt(0).toUpperCase() + prop.substr(1),
	    props = [
	        prop,
	        'Webkit' + uc_prop,
	        'Moz' + uc_prop,
	        'O' + uc_prop,
	        'ms' + uc_prop,
	        'Khtml' + uc_prop
	    ];
	
	    return !!testFor.test_props( props );
	},
	
	test_props : function ( props ) {
	    for ( var i in props ) {
	        if ( m_style[ props[i] ] !== undefined ) {
	            return true;
	        }
	    }
	}
}