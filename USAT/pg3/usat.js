
(function() {

var I = Infomous;
var $ = Infomous.$;

I.log_enable( true );

I.log('*** usat', I.base_root(), I.base_path() );

var widget;
var $tab = $('.tab');

//TODO hardcoded frame titles...
var titles = {
  '909':'U.S. News from USA Today and NewsWhip',
  '875':'World news from USA Today and NewsWhip',
  '874':'World & USA headlines from USA Today and NewsWhip'
};

var opt = {

  width: 500,
  height: 475,

  //TODO hardcoded frame params...
  "setInterfaceType":"widget",
  "colFrame":"0x333333",
  "colFrameTitle":"0xffffff",
  "colBackground":"0xf4f4f4",
  "frameHelpURL":"http://www.infomous.com/site/newswhip/usat.php",
  "frameByURL":"http://www.infomous.com/site/newswhip/usat.php"

};


//TODO grab the first nid from the doc
update_cloud( '909' );


$tab.click( function() {

  var nid, i;

  var $selec = $(this);
  var clases = $selec.attr('class').split(' ');

  for ( i = 0; i < clases.length; i++ ) {
    if ( ! /nid/.test( clases[i] ) )
      continue;
    nid = clases[i].split('_')[1];
    break;
  }

  if ( ! nid )
    return;

  //update tabs css
  $tab.each( function( i, el ) {
    $(el).removeClass( 'active' );
  });
  $selec.addClass('active'); 


  update_cloud( nid ); 


});

function update_cloud( nid ) {

  // ::::: TODO widget.dispose() :::::
  //if ( cloud ) {
    //I.clouds.remove( cloud.id() );
    ////cloud.dispose();
  //}
  ////remove frame
  //$('.infomous-embed-frame').remove();
  //create infomous div
  //$('#infomous-container').append( 
    //'<div id="infomous" class="infomous"></div>' 
  //);
  // ::::: TODO widget.dispose() :::::

  if ( widget )
    widget.dispose();

  var _opt = I.extend( opt );
  _opt.id = 'nid'+nid;
  _opt.nid = nid;
  _opt.title = titles[nid];

  widget = new I.Widget( _opt );
  widget.init({

    ready: function( _cloud ) { 

      I.log('cloud ready', arguments); 

      //cloud = _cloud;

      //set frame title
      //$('.infomous-embed-frame-header-title')
        //.text( titles[nid] );

    },
    error: function() { 
      I.log('cloud error', arguments); 
    }
  });

  //cloud.set_var( 'nid', nid );
  //cloud.set_var( 'title', data[nid].title );
  //cloud.set_feeds( data[nid].feeds );
  //cloud.make_request();

}

//console.log('load config');
//var config_url = 'http://analyst2.infomous.com/cloud/config/875/widget?format=json&callback=configCallback';
//$.ajax({
  //url: 'http://analyst2.infomous.com/cloud/config/875/widget?format=json&callback=configCallback',
  //dataType: 'json',
  //jsonpCallback: 'configCallback',
  //success: function( data ) {
    //console.log( '--loaded', data );
  //}
//});

})();

