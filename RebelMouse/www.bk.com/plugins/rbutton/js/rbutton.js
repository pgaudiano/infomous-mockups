$(function () {
    $.support.borderRadius = false;
    $.each(['BorderRadius', 'MozBorderRadius', 'WebkitBorderRadius', 'OBorderRadius', 'KhtmlBorderRadius'], function () {
        if (document.body.style[this] !== undefined) $.support.borderRadius = true;
        return (!$.support.borderRadius);
    });
});

$.fn.rbutton = function (options) {
    var opts = $.extend({}, $.fn.rbutton.defaults, options);
    return this.each(function (index) {
        $(this).addClass('rbutton');
        if (!$(this).parent().hasClass('rbuttonwrap')) {
            $(this).wrap('<div class="rbuttonwrap"></div>')
                   .before('<div class="left"></div>')
                   .after('<div class="right"></div>');

            $(this).parent().hover(
                function () { $(this).addClass('hover'); },
                function () { $(this).removeClass('hover'); }
            );
        }

        if (opts.extra_cssclass) {
            $(this).parent().addClass(opts.extra_cssclass);
        }

        if ($(this).hasClass('tiny')) {
          $(this).parent().addClass('tiny');
          $(this).removeClass('tiny');
        }
        if ($(this).hasClass('small')) {
          $(this).parent().addClass('small');
          $(this).removeClass('small');
        }
        if ($(this).hasClass('large')) {
          $(this).parent().addClass('large');
          $(this).removeClass('large');
        }
      });
};
$.fn.rbutton.defaults = {
    extra_cssclass: ''
};

$(document).ready(function () {
    /*
    if (!$.support.borderRadius) {
        $('.rbutton').each(function () {
            $(this).wrap('<div class="rbuttonwrap"></div>')
                   .before('<div class="corner tl"></div><div class="corner tr"></div>')
                   .after('<div class="corner bl"></div><div class="corner br"></div>');
        });
    }
    */
    $('.rbutton').each(function () {
        $(this).rbutton();
        /*
        if (!$(this).parent().hasClass('rbuttonwrap')) {
            $(this).wrap('<div class="rbuttonwrap"></div>')
                   .before('<div class="left"></div>')
                   .after('<div class="right"></div>');
        }
        */
    });
});
