
(function() {

console.log('*** usat', 
  Infomous.base_root(),
  Infomous.base_path()
  );

var I = Infomous;
var $ = Infomous.$;

I.log_enable( true );

//var urlp = I.get_url_params('#');
//console.log( urlp );
//I.load_file( urlp.css || 'usat.css', init );

init();

function init() {

  console.log( 'init' );

  var cloud;

  var data = {

    '909': {
      title: 'U.S. News from USA Today and NewsWhip',
      feeds: 'http://rssfeeds.usatoday.com/UsatodaycomNation-TopStories|http://rss.newswhip.com/U.S.'
    },

    '875': {
      title: 'World news from USA Today and NewsWhip',
      feeds: 'http://rssfeeds.usatoday.com/UsatodaycomWorld-TopStories|http://rss.newswhip.com?count=150'
    },

    '874': {
      title: 'World & USA headlines from USA Today and NewsWhip',
      feeds: 'http://rssfeeds.usatoday.com/UsatodaycomNation-TopStories|http://rssfeeds.usatoday.com/UsatodaycomWorld-TopStories|http://rss.newswhip.com/U.S.|http://rss.newswhip.com?count=150'
    }
  };

  //var opt = {
    //nid: 909,
    //id: 'infomous_usat',
    //width: 500,
    //height: 475,
    //title: 'U.S. News from USA Today and NewsWhip'
  //};

  var opt = {

    "id": "nid909",
    "nid": "909",
    "title": data['909'].title, 

    "width":"500px",
    "height":"475px",
    "setInterfaceType":"widget",
    "colFrame":"0x333333",
    "colFrameTitle":"0xffffff",
    "colBackground":"0xf4f4f4",
    "frameHelpURL":"http://www.infomous.com/site/newswhip/usat.php",
    "frameByURL":"http://www.infomous.com/site/newswhip/usat.php"
  };

  new I.Widget( opt ).init({
    ready: function( _cloud ) { 
      I.log('cloud ready', arguments); 
      cloud = _cloud;
    },
    error: function() { 
      I.log('cloud error', arguments); 
    }
  });

  var $tab = $('.tab');
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

    //update tabs classes
    $tab.each( function( i, el ) {
      console.log(' update classes....', $(el) );
      $(el).removeClass( 'active' );
    });
    $selec.addClass('active');

    //set frame title
    $('.infomous-embed-frame-header-title')
      .text( data[nid].title );

    //set cloud data
    cloud.set_var( 'nid', nid );
//    cloud.set_var( 'title', data[nid].title );
//    cloud.set_feeds( data[nid].feeds );
    cloud.make_request();

  });

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

}; //end of init

})();

