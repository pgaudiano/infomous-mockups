var BK = BK || {};
var COMMON = BK[CultureLanguage][CultureCountry].COMMON;

(function () {

    $.fn.modalVideo = function (options) {
        var opts = $.extend({}, $.fn.modalVideo.defaults, options);
        return this.each(function () {
            var $this = $(this);
            var o = $.metadata ? $.extend({}, opts, $this.metadata()) : opts;
            var videoURL = $this.attr('rel');
            var mediaType;

            for (var media in $.fn.modalVideo.media) {
                if (videoURL.search($.fn.modalVideo.media[media].pattern) != -1) {
                    mediaType = media;
                } else { }
            }

            $this.click(function (e) {                            

                if (mediaType) {

                    if(o.width < 580) o.width = 580;
                    if(o.height < 326) o.height = 326;

                    e.preventDefault();
                    var $modalOverlay = o.container;
                    $modalOverlay.find(o.dismissButton).click(function () {
                        //garbageCleanup($modalOverlay, o);
                        $.fn.modalVideo.dismiss($modalOverlay, o);
                        return false;
                    });
                    $(o.scope).bind('keypress.dismissModalVideoOverlay', function (e) {
                        if (e.keyCode == 27) {
                            //garbageCleanup($modalOverlay, o);
                            $.fn.modalVideo.dismiss($modalOverlay, o);
                        }
                    });
                    $modalOverlay.find(o.caption).html($this.attr('title'));
                    
                    var videoid = $this.parents('li.pr_item').find('input.videoid').val()

                    var desc = $this.attr('data-desc');

                    if (desc == null || typeof(desc) == 'undefined' || desc.trim() == '') {
                        $modalOverlay.find(o.description).hide();
                    } else {
                        $modalOverlay.find(o.description).html(desc).show();
                    }

                    if (o.link_text) {
                        $modalOverlay.find(o.utility).html(o.link_text.replace("~", "'"));
                    }
                    /***else {
                    $modalOverlay.find(o.utility).html(COMMON.SEE_MORE_VIDEOS);
                    }***/
                    if (o.link_url) {
                        $modalOverlay.find(o.utility).attr('href', o.link_url);
                    }
                    else {
                        $modalOverlay.find(o.utility).attr('href', CulturePrefix + 'company-info/news-press/index.html');
                    }
                    if (o.link_target) {
                        $modalOverlay.find(o.utility).attr('target', o.link_target);
                    }
                    else {
                        $modalOverlay.find(o.utility).attr('target', '_self');
                    }

                    if (o.uiBlock) {
                        o.uiBlock.appendTo(o.scope).css({
                            display: 'block',
                            opacity: 0
                        }).animate({
                            opacity: 0.8
                        }, 'fast');
                    }

                    initOverlay($modalOverlay, o, function () {
                        $.fn.modalVideo.media[mediaType].execution($modalOverlay, videoURL, o, $this.attr('title'), desc, videoid);
                    });

                    if ($.browser.msie && $.browser.version < 7) {
                        var intContentHeight = parseInt(($('#Content').height() + 35), 10);
                        $('.UIBlock').css({ 'height': intContentHeight });
                    }

                }
            });

            /***if (BK.NewsItemID && $this.attr('id') == BK.NewsItemID) {
            $this.trigger('click');
            }***/
        });
    };

    function initOverlay(overlay, options, callback) {
        if (callback && typeof (callback) == 'function') {
            if ($.browser.msie && $.browser.version < 7) {
                $('#year').hide();
                $('#sort').hide();
                $('#narrow').hide();
            }
            overlay.css({
                width: parseInt(options.width, 10) + 70
            }).find(options.flashContent).css({
                width: parseInt(options.width, 10),
                height: parseInt(options.height, 10) + parseInt(options.controlHeight, 10)
            });
            overlay.appendTo(options.scope).css({
                display: 'block',
                opacity: 1
                //marginTop: (parseInt(options.height, 10) + parseInt(options.controlHeight, 10)) / -2,
                //marginLeft: parseInt(options.width, 10) / -2
            });
            overlay.appendTo(options.scope).css({
                marginTop: overlay.outerHeight(false) / -2,
                marginLeft: overlay.outerWidth(false) / -2
            });

            if ($('.border_topleft', overlay).length == 0) {
                // Border
                // - top left
                $(overlay).append("<div class='border_topleft'></div>");
                // - top center
                $(overlay).append("<div class='border_topcenter'></div>");
                // - top right
                $(overlay).append("<div class='border_topright'></div>");
                // - content left
                $(overlay).append("<div class='border_contentleft'></div>");
                // - content right
                $(overlay).append("<div class='border_contentright'></div>");
                // - bottom left
                $(overlay).append("<div class='border_bottomleft'></div>");
                // - bottom center
                $(overlay).append("<div class='border_bottomcenter'></div>");
                // - bottom right
                $(overlay).append("<div class='border_bottomright'></div>");
            }
            var cw = $('.content', overlay).outerWidth(false);
            var ch = $('.content', overlay).outerHeight(false);
            $('.border_topcenter', overlay).css('width', (cw) + 'px');
            $('.border_bottomcenter', overlay).css('width', (cw) + 'px');
            $('.border_contentleft', overlay).css('height', (ch + 1) + 'px');
            $('.border_contentright', overlay).css('height', (ch + 1) + 'px');

            overlay.animate({
                opacity: 1
            }, 'fast', function () {
                callback();
            });
        }
    }

    function garbageCleanup(overlay, options) {
        $(overlay).find(options.flashContent).attr('style', '');
    }

    $.fn.modalVideo.dismiss = function (overlay, options) {
        if ($.browser.msie && $.browser.version < 7) {
            $('#year').show();
            $('#sort').show();
            $('#narrow').show();
        }
        if (options.uiBlock) {
            options.uiBlock.fadeOut('fast', function () {
                $(this).remove();
            });
        }
        overlay.fadeOut('fast', function () {
            garbageCleanup(overlay, options);
            $(this).find(options.flashContent).html('');
            $(this).remove();

            // IE6 is touchy about this; detect the object and function 
            // sequentially before firing the pause function.			
            if (typeof videoElement === 'object') {
                if (typeof videoElement.pause === 'function') {
                    videoElement.pause();
                }
            }
        });
        $(options.scope).unbind('keypress.dismissModalVideoOverlay');
    };

    $.fn.modalVideo.media = {
        youtube: {
            pattern: new RegExp(/^http:\/\/www.youtube.com\/watch\?v=\w/),
            execution: function (overlay, videoURL, options) {
                var embedToken = videoURL.replace(/^http:\/\/www.youtube.com\/watch\?v=/, '');
                overlay.find(options.flashContent).html('<object width="' + options.width + '" height="' + options.height + '"><param name="movie" value="http://www.youtube.com/v/' + embedToken + '&hl=en&fs=1"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube.com/v/' + embedToken + '&h1=en&fs=1" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="' + options.width + '" height="' + options.height + '"></embed></object>');
            }
        },
        embedYoutube: {
            pattern: new RegExp(/^http:\/\/www.youtube.com\/embed\//),
            execution: function (overlay, videoURL, options) {
                overlay.find(options.flashContent).html('<iframe width="' + options.width + '" height="' + options.height + '" src="' + videoURL +'" frameborder="0" allowfullscreen></iframe>');
            }
        },
        hosted: {            

            pattern: new RegExp(/\/.{0,1000}[.]{1}(flv)\b/gi),
            execution: function (overlay, videoURL, options, title, desc, videoid) {

                var vidhtml = '';
                var mp4Link = videoURL.replace('flv', 'mp4');
                var oggLink = videoURL.replace('flv', 'ogg');
                var webmLink = videoURL.replace('flv', 'webm');

                vidhtml += '<div class="video-js-box">';
                vidhtml += '<input type="hidden" class="_videoid" value="'+ videoid +'"/> ';
                vidhtml += '<video class="video-js" width="' + options.width + '" height="' + options.height + '" preload title="'+ ((title)? title : '') +'" data-desc="' + ((desc)? desc : '') + '" >';
                vidhtml += '<source src="' + mp4Link + '" type=\'video/mp4; codecs="avc1.42E01E, mp4a.40.2"\'>';
                vidhtml += '<source src="' + oggLink + '" type=\'video/ogg; codecs="theora, vorbis"\'>';
                //vidhtml += '<source src="' + webmLink + '" type=\'video/webm; codecs="vp8, vorbis"\'>';
                vidhtml += '<embed width="' + options.width + '" height="' + (options.height + options.controlHeight) + '" bgcolor="#000000" ';
                vidhtml += 'allowfullscreen="true" allowscriptaccess="always" type="application/x-shockwave-flash" ';
                vidhtml += 'src="/page_templates/cultures' + CulturePrefix + 'flash/BKVideoPlayer.swf" pluginspage="http://www.adobe.com/go/getflashplayer" ';
                vidhtml += 'flashvars="videoType=progressive&amp;videoURL=' + videoURL + '&amp;width=' + options.width + '&amp;height=' + (options.height + options.controlHeight) + '">';
                vidhtml += '</embed>';
                vidhtml += '</video>';
                vidhtml += '<div class="replay"><span class="replayArrow"></span></div>';
                vidhtml += '</div>';

                overlay.find(options.flashContent).html('').html(vidhtml);
                VideoJS.setup();
                
                $('.replay').mouseover(function () { $('.vjs-controls').stop().css('bottom', '0px') });
                $('.replay').click(function () { videoElement.play(); });

                if (testFor.htmlvideo()) {
                    videoElement.play();                   
                };
            }
        },

        hostedImage: {

            pattern: new RegExp(/\/.{0,1000}[.]{1}(jpg|gif|png|jpeg)\b/gi),
            execution: function (overlay, imgURL, options) {

                var imghtml = '';

                imghtml += '<div class="video-js-box">';
                imghtml += '<img src="' + imgURL + '" alt="" width="' + options.width + '" height="' + options.height + '" />';
                imghtml += '</div>';

                overlay.find(options.flashContent).html('').html(imghtml);

            }
        }

    };

    $.fn.modalVideo.defaults = {
        container: $('<div class="modal_overlay video_player"><div class="content"><div class="modal_overlay_title"><h4 class="caption"></h4></div><div class="flash_content"></div><div class="modal_overlay_content"><div class="description"></div>' + /*'<p class="call_to_action"><a href="' + CulturePrefix + 'company-info/press/public-archive.html" class="utility" onclick="$(\'div.flash_content\').html(\'\');" target="_self">' + COMMON.SEE_MORE_VIDEOS + '</a></p>' +*/'</div><p class="dismiss"><a href="#">' + COMMON.CLOSE + '</a></p></div></div>'),
        uiBlock: $('<div class="UIBlock"></div>'),
        caption: '.caption',
        description: '.description',
        utility: '.utility',
        dismissButton: '.dismiss a',
        flashContent: 'div.flash_content',
        scope: 'body',
        width: 'auto',
        height: 'auto',
        controlHeight: 0,
        type: 'progressive'
    };

})(jQuery);

