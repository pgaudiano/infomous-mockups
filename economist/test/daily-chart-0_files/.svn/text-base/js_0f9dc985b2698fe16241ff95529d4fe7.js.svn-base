Drupal.behaviors.socialPlugins = function(context) {
  $.each(['//platform.twitter.com/widgets.js', '//apis.google.com/js/plusone.js', '//platform.linkedin.com/in.js'], function(index, value) {
    // createElement is faster than jQuery equivalent.
    var scr = document.createElement('script');
    scr.type = 'text/javascript';
    scr.async = true;
    scr.src = value;
    var g = $('script')[0];
    $(scr).insertBefore(g.parentNode);
  });
};
Drupal.behaviors.redditLink = function(context) {
  $('.share-inline-footer-reddit a', context).attr('href', 'javascript:;');
};
;
// $Id: google_cse.js,v 1.1.4.3 2008/07/01 21:31:14 mfb Exp $
$(function() {
  var googleCSEWatermark = function($id) {
    var f = document.getElementById($id);
    if (f && (f.query || f.q || f['edit-keys'])) {
      var q = f.query ? f.query : (f.q ? f.q : f['edit-keys']);
      var n = navigator;
      var l = location;
      if (n.platform == 'Win32') {
        q.style.cssText = 'border: 1px solid #7e9db9; padding: 2px;';
      }
      var b = function() {
        if (q.value == '') {
          q.style.background = '#FFFFFF url(http://www.google.com/coop/intl/' + Drupal.settings.googleCSE.language + '/images/google_custom_search_watermark.gif) left no-repeat';
        }
      };
      var f = function() {
        q.style.background = '#ffffff';
      };
      q.onfocus = f;
      q.onblur = b;
      if (!/[&?]query=[^&]/.test(l.search)) {
        b();
      }
    }
  };
  googleCSEWatermark('google-cse-searchbox-form');
  googleCSEWatermark('google-cse-results-searchbox-form');
  if (Drupal.settings.googleCSE.searchForm) {
    googleCSEWatermark('search-form');
  }
});
;
Drupal.settings.omniture = Drupal.settings.omniture || {};

var availableOmnitureVarsForDebug;

Drupal.behaviors.omniture = function(context) {
  var $context = $(context);
  // This section handles click tracking of forms, e.g. Post a comment.
  // Below is the format that it expects.
  // Drupal.settings.omniture.click_tracking[] = { selector: selector, event: event, name: name, ... }
  var trackingCode = Drupal.settings.omniture.click_tracking;

  if (trackingCode) {

    $.each(trackingCode, function(k, v) {

      // Append an onclick function to the button if form_id exists in the DOM.
      var ltData = this;
      var selector = ltData.selector;
      // Verify if we are using tracking via css selector or we are using the
      // HTML data- attribute instead.
      selector = (selector == "data-ec-omniture") ? selector = "[data-ec-omniture='" + this.name + "']" : selector;

      // Check if there is any tagged element on the page.
      if ($(selector).length) {
        availableOmnitureVarsForDebug = true;
      };
      if (Drupal.settings.omniture.debug == true) {
        // Add a class to any tagged element.
        $(selector).addClass('omniture-tagged');
        // Enable the inline tracking debug.
        Drupal.omniture.debugVars(selector, ltData.name, trackingCode[k]);
      }
      $context.find(selector).bind(ltData.event, function(e) {
        // Append tracking code to elements.
        Drupal.omniture.trackClick(this, ltData.name, trackingCode[k]);
     //   e.preventDefault();
      });

    });
  }
};

// Enable the omniture button for debugging/trace tracking code on page's elmts.
Drupal.behaviors.enableDebug = function(context) {
  if (Drupal.settings.omniture.debug == true && availableOmnitureVarsForDebug == true) {
    if (!$('.omiture-elements').length) {
      $('#page').prepend('<div class="omiture-elements">Omniture elements</div>');
    }
    $('.omiture-elements', context).click(function() {
      var activeText = $('.omiture-elements').text();
      $('.omiture-elements').toggleClass('omniture-elements-on').text(activeText == "Omniture elements" ? "Omniture elements on" : "Omniture elements");
      $('.omniture-tagged').toggleClass('omniture-tagged-on');
    });
  }
}

// This function sends the link_name to both the Custom Link Tracking and
// to the Omniture var associated with the form.
Drupal.omniture = {};
Drupal.omniture.trackClick = function(obj, name, options) {
  if (typeof s_gi == "function") {
    var options = options || {};
    var edge_server = options.edge_server || Drupal.settings.omniture.edge_server;
    var s = s_gi(edge_server);
    s.linkTrackVars = options.link_track_vars;
    s.linkTrackEvents = options.events ? options.events : 'None';
    s.prop5 =  options.prop5 ? options.prop5 : '';
    s.prop13 = options.prop13 ? options.prop13 : '';
    s.prop18 = options.prop18 ? options.prop18 : '';
    s.prop45 = options.prop45 ? options.prop45 : '';
    s.eVar13 = options.eVar13 ? options.eVar13 : '';
    s.eVar18 = options.eVar18 ? options.eVar18 : '';
    s.eVar24 = options.eVar24 ? options.eVar24 : '';
    s.eVar31 = options.eVar31 ? options.eVar31 : '';
    s.eVar43 = options.eVar43 ? options.eVar43 : '';
    s.events = options.events ? options.events : '';
    s.link_track_vars = name;
    s.tl(options.skipDelay ? true : obj, 'o', name);
  }
};

// This function is used to display omniture variables attached to elements to
// facilitate the debugging and maintainance process.
Drupal.omniture.debugVars = function(selector, name, omniVars) {
  // Add the debugging functionality.
  $(selector).mouseover(function() {
    var elm = $(this);
    var top = elm.offset().top;
    var height = (elm.height() == 0) ? 20 : elm.height();
    var left = elm.offset().left;
    if (elm.hasClass('omniture-tagged-on')) {
      if (!$('.omniture-wrapper').length) {
        var omniList = "<ul class='omniture-display'>";
        for (var vars in omniVars) {
          omniList += "<li>" + vars + "= " + omniVars[vars] + "</li>";
        }
        omniList += "</ul>";
        $('body').append(omniList);
        $('.omniture-display').css({'top': + (top + height), 'left': + left});
      }
    }
  }).mouseout(function(){$('.omniture-display').remove()});
}

Drupal.behaviors.socialButtons = function(){
  // Add the callback function for when the user clicks on the twttr btn.
  if (typeof twttr != "undefined") {
    twttr.events.bind('click', clickEventToAnalytics);
  }
  // Initiate the Facebook like button, then provide a callback function when the
  // user clicks it.
  if (typeof FB != "undefined") {
    FB.Event.subscribe('edge.create', function(href, widget) {
      clickEventToAnalytics(widget);
    });
  }
  // Provide the debug functionality for the social buttons.
  $("[data-ec-omniture-frame]").each(function(){
    availableOmnitureVarsForDebug = true;
    var $this = $(this);
    var thisElm = $this.attr('data-ec-omniture-frame');
    $this.addClass('omniture-tagged');
    var trackingCode = Drupal.settings.omniture['click_tracking_' + thisElm];
    Drupal.omniture.debugVars($this, trackingCode.name, trackingCode[0]);
  });
}

// This functions takes care of tracking clicks coming from Twitter and Facebook
// buttons via callback functions.
function clickEventToAnalytics(intent_event) {
  var trackingCode;
  var elmValue;
  if (intent_event.state) {
    if (intent_event.state == 'off') {return false};
    trackingCode = Drupal.settings.omniture['click_tracking_footer_plusone'];
    elmValue = 'footer_plusone';

  } else {
    var elmToTrack = (intent_event.target) ? intent_event.target : intent_event.dom;
    elmToTrack = elmToTrack.parentNode.attributes['data-ec-omniture-frame'];
    trackingCode = Drupal.settings.omniture['click_tracking_' + elmToTrack.value];
    elmValue = elmToTrack.value;
  }
  Drupal.omniture.trackClick(this, elmValue, trackingCode[0]);
}
;
if ($('#rolling_eco').length) {
  var banner = new js_rolling('rolling_eco');
  banner.set_direction(4);
  banner.move_gap = 10;
  banner.time_dealy = 3;
  banner.time_dealy_pause = 5000;
  banner.start();
}

;
