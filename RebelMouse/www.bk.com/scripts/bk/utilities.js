//init local bk settings
var BK = BK || {};
var UTILS = BK[CultureLanguage][CultureCountry].UTILS;

splitURLVars = function (url) {
    var getData = new Array();

    var vars = url.split('?')[1];
    if (vars) {
        vars = vars.substr(0);

        var pairs = vars.split("&");

        for (var i = 0; i < pairs.length; i++) {
            var formData = pairs[i].split("=");

            var name = formData[0];
            var value = formData[1];
            getData[name] = value;
        }
    }

    return getData;
};

var bk;

function printCopyrightYear()
{
	var year = new Date().getFullYear();
	$("span.year-copyright").text(year);
}

function getSwfId(strSwfId) {
    if (navigator.appName.indexOf("Microsoft") != -1) {
        bk = window[strSwfId];
    } else {
        bk = document[strSwfId];
    }
}

function commJsAs(arrUrlData) {
    bk.onChange(arrUrlData);
}

function generalCallJsAs(arrUrlData) {
    bk.onChange(prompt(arrUrlData));
}

function turnFlashTextOn() {
    var strUrl = new String(document.location);
    var arrUrlData = strUrl.split('?');

    if (arrUrlData[1] == undefined) {
        return false;
    } else if (arrUrlData[1].length < 1) {
        return false;
    }

    return true;
}

var boolFlashReady = false;

function flashReady() {
    boolFlashReady = true;
}

function getBlacklist() {
    //if a flash tile points to one of the following domains, it will trigger the "you are now leaving this site" modal
    return ["twitter.com", "facebook.com", "tumblr.com"];
}

function leavingSitePrompt(href) {
    $('body').append('<div class="UIBlock"></div>');
    $('body').append('<div class="modal_overlay overlay_prompt leave-site"><div class="leave-site-close"></div><h2 class="leave-site-header">' + UTILS.LEAVING_SITE_HEADER + '</h2><p>' + UTILS.LEAVING_SITE_COPY + '</p><div style="padding-left:36px; padding-top: 10px;">'
                      + '<a class="rbutton cancel">' + UTILS.LEAVING_SITE_CANCEL + '</a>&nbsp;'
                      + '<a class="rbutton continue">' + UTILS.LEAVING_SITE_CONTINUE + '</a>&nbsp;'
                      + '<a class="rbutton opennewwindow">' + UTILS.LEAVING_SITE_OPEN_NEW_WINDOW + '</a></div></div>');
    $('.overlay_prompt.leave-site .rbutton').rbutton();
    $('.UIBlock').css({
        display: 'block',
        opacity: 0
    }).animate({
        opacity: 0.8
    }, 'fast');

    if ($.browser.msie && $.browser.version < 7) {
        var intContentHeight = parseInt(($('#Content').height() + 35), 10);
        $('.UIBlock').css({ 'height': intContentHeight });
    }

    $('.overlay_prompt.leave-site').css('left', ($('body').width() - $('.overlay_prompt.leave-site').width()) / 2);
    
    $('div.overlay_prompt .leave-site-close').click(function () {
        $('.UIBlock').remove();
        $('.modal_overlay').remove();

        return false;
    });

    $('div.overlay_prompt .cancel').click(function () {
        $('.UIBlock').remove();
        $('.modal_overlay').remove();

        return false;
      });

    $('div.overlay_prompt .continue').click(function () {
        $('.UIBlock').remove();
        $('.modal_overlay').remove();

        window.location = href;

        return false;
    });

    $('div.overlay_prompt .opennewwindow').click(function () {
        $('.UIBlock').remove();
        $('.modal_overlay').remove();

        window.open(href);

        return false;
    });

  /*function leavingSitePrompt(href) {
    $('body').append('<div class="UIBlock"></div>');
    $('body').append('<div class="modal_overlay overlay_prompt"><p>'
    + UTILS.LEAVING_SITE_COPY + '</p><ul><li class="cancel"><a href="#">'
    + UTILS.LEAVING_SITE_CANCEL + '</a></li><li class="continue"><a href="#">' 
    + UTILS.LEAVING_SITE_CONTINUE + '</a></li></ul></div>');
    $('.UIBlock').css({
    display: 'block',
    opacity: 0
    }).animate({
    opacity: 0.8
    }, 'fast');

    if ($.browser.msie && $.browser.version < 7) {
    var intContentHeight = parseInt(($('#Content').height() + 35), 10);
    $('.UIBlock').css({ 'height': intContentHeight });
    }

    $('div.overlay_prompt ul li.cancel a').click(function () {
    $('.UIBlock').remove();
    $('.modal_overlay').remove();

    return false;
    });

    $('div.overlay_prompt ul li.continue a').click(function () {
    $('.UIBlock').remove();
    $('.modal_overlay').remove();

    window.open(href);

    return false;
  });*/
  
}

function formatIntegerForLocale(input) {
    var formattedNumber = '';

    if (input == 0) {
        formattedNumber = '0';
    } else {
        while (input > 0) {
            formattedNumber = input % 1000 + ((formattedNumber == '') ? '' : ',') + formattedNumber;
            input = Math.floor(input / 1000);
        }
    }

    return formattedNumber;
}

function getDayNameForDayOfWeek(dayOfWeek) {
    return BK.local.DATE_TIME['DAY_OF_WEEK_' + dayOfWeek];
}

function getMonthNameForMonthOfYear(monthOfYear) {
    return BK.local.DATE_TIME['MONTH_OF_YEAR_' + monthOfYear];
}

$(document).ready(function () {
  var strUrl = new String(document.location);
  var arrUrl = splitURLVars(strUrl);
  var strFlashLoaderPath = '/flash/main_navLoader.swf';
  var strFlashMainPath = '/flash/main_nav.swf';
  var boolMainNavSound = true;

  $('#global_share_toggle').click(function () {
    $('#global_share').toggleClass('expanded');
    return false;
  });

  $('#page_share_toggle').click(function () {
    $('#page_share').toggleClass('expanded');
    return false;
  });

  $('#sound_toggle').click(function () {
    if ($(this).hasClass('off')) {
      if (typeof $('#navigation_tiles')[0] != 'undefined') {
        $('#navigation_tiles')[0].soundToggle('on');
      }
    } else {
      if (typeof $('#navigation_tiles')[0] != 'undefined') {
        $('#navigation_tiles')[0].soundToggle('off');
      }
    }

    $(this).toggleClass('off');

    return false;
  });
  if (PageHasSound) {
    boolMainNavSound = false;
    $('#sound_toggle').toggleClass('off');
  }

  $('#PageWrapper, #GlobalHeader').click(function () {
    $('.share').removeClass('expanded');
    return true;
  });

  if (arrUrl['prototype'] == 'sound') {
    strFlashMainPath = '/flash' + CulturePrefix + 'main_nav_prototype_sound.swf';
  }
  else if (arrUrl['prototype'] == 'grid') {
    strFlashMainPath = '/flash' + CulturePrefix + 'main_nav_prototype_grid.swf';
  }

  var flashvars = {};
  flashvars.slidersXMLPath = '/cms' + CulturePrefix + 'cms_in/home_tile_arch.xml';
  flashvars.tilesXMLPath = '/cms' + CulturePrefix + 'cms_out/info_arch/home_tiles_full.xml';
  flashvars.targetPath = '';
  flashvars.mainNavPath = strFlashMainPath;
  flashvars.soundEnabled = boolMainNavSound;
  var params = {};
  params.quality = 'high';
  params.wmode = 'transparent';
  params.allowscriptaccess = 'always';
  params.allowFullScreen = true;
  var attributes = {};
  attributes.id = 'navigation_tiles';
  //    swfobject.embedSWF(strFlashLoaderPath, 'TilesNoFlash', '860', '557', '9.0.115', '/flash/expressInstall.swf', flashvars, params, attributes, function (e) {
  //        if (!e.success) {
  //            BK.jsGUtils.init();
  //        } else {
  //            $('#TilesFlash').addClass('flash-replaced');
  //        }
  //    });

  $(document).unload(
		getSwfId('main_nav')
	);

  $('input[type=text], textarea').each(function () {
    $(this).focus(function () {
      if ($(this).val() == this.defaultValue) $(this).val('');
    });
    $(this).blur(function () {
      if ($(this).val() == '') $(this).val(this.defaultValue);
    });
  });

  $('#pdf_downloads .select_wrapper select').change(function () {
    window.open($(this).val());
    return false;
  });



  /* DIALOG MODAL OVERLAY */
  $('a[rel=noprompt]').click(function (e) {
    var $this = $(this);
    window.open($this.attr('href'));
    return false;
  });

  $('#PageWrapper:not(.Mobile)').find('a[target=_blank]:not(a[rel=noprompt],a[rel=nomodify]),a[rel=prompt]').click(function (e) {
    var $this = $(this);
    var $thisHref = $this.attr('href');
    //console.log($thisHref);
    leavingSitePrompt($thisHref);
    return false;
  });
  
});

String.prototype.trim = function () {
    return this.replace(/^\s*/, "").replace(/\s*$/, "");
}
