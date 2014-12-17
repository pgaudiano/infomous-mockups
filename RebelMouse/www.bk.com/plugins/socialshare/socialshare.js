var socialshare = socialshare || {};

socialshare = {

    url: {
        fb: "http://www.facebook.com/sharer.php?s=100",
        //&p[title]={{title}}&p[summary]={{desc}}&p[url]={{url}}&p[images][0]={{image}}&p[message]=test",
        gp: "https://plus.google.com/share?"
    },

    toolbox: function (_target, options) {

        var target = $(_target);
        if (!options)
            return;

        target.find('a').each(function (k, v) {
            var a = $(v);
            if (a.hasClass("socialshare")) {
                a.prop('title', socialshare.GetTitle(a));
                if (socialshare.IsFacebook(a)) {
                    url = socialshare.url.fb;

                    if (options.url) {

                        url += "&p[url]=" + encodeURIComponent(options.url);

                    } else if (window.location) {
                        url += "&p[url]=" + encodeURIComponent(window.location.href);

                    } else {
                        url += "&p[url]=http://bk.com";
                    }

                    if (options.title)
                        url += "&p[title]=" + encodeURIComponent(options.title);
                    if (options.description)
                        url += "&p[summary]=" + encodeURIComponent(options.description);
                    if (options.image)
                        url += "&p[images][0]=" + encodeURIComponent(options.image);

                    a.prop("href", url);
                    a.prop("target", "_blank");
                } else if (socialshare.IsGooglePlus(a)) {
                    url = socialshare.url.gp;
                    if (options.url) {
                        url += "url=" + options.url;
                    } else if (window.location) {
                        url += "url=" + window.location.href;
                    } else {
                        url += "url=http://bk.com";
                    }

                    if (options.title)
                        url += "&t=" + options.title;

                    a.prop("href", url);
                    a.prop("target", "_blank");
                }
            }
        });
    },

    IsFacebook: function (target) {
        return target.hasClass('fb');
    },

    IsGooglePlus: function (target) {
        return target.hasClass('gp');
    },

    GetTitle: function (target) {
        if (this.IsFacebook(target)) {
            return "Facebook Share";
        } else if (this.IsGooglePlus(target)) {
            return "Google Plus Share";
        }
    }
}