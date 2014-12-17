var BK = BK || {};

BK.FreshOffersModel = BK.FreshOffersModel || {};

BK.FreshOffersModel.PromotionItem = function (data) {
    var parseBKCmsDate = function (s) {
        if (s == "0001-01-01T00:00:00.000" || s == "0001-01-01") {
            return null;
        } else {
            // Fix 'yyyy-mm-dd' format doesnt work in safari, IE
            var dateComponents = s.split('-');

            if (dateComponents.length > 0)
                return new Date(dateComponents[0], dateComponents[1] - 1, dateComponents[2], 0, 0, 0, 0);
            else 
                return new Date();
            
        }
    };

    var isExternalUrl = function (url) {
        if (url == null || typeof (url) == 'undefined' || url == '')
            return false;
        else if (url.startsWith('http://' + window.location.hostname))
            return false;
        else if (url.startsWith('http://'))
            return true;
        else if (url.startsWith('https://'))
            return true;
        else if (url.startsWith('ftp://'))
            return true;
        else
            return false;
    };

    this.ID = data.attr('ID');
    this.Title = data.attr('Title');
    this.DisplayTitle = data.find('DisplayTitle:first').text();
    this.Description = data.attr('Description');
    this.BriefCaption = data.find('BriefCaption:first').text();
    this.ExpandedCaption = data.find('ExpandedCaption:first').text();
    this.FullContentHtml = data.find('FullContentHtml:first').text();
    this.ImagePath = data.find("ImagePath:first").text();
    this.IsNational = eval(data.find("IsNational:first").text());
    this.AvailableInDMAs = data.find("AvailableInDMAs:first").text().split(',');
    this.MobileImagePath = data.find("MobileImagePath:first").text();
    this.IsMobileFeatured = eval(data.find("IsMobileFeatured:first").text());
    this.IsMobilePromotion = eval(data.find("IsMobilePromotion:first").text());
    this.MobileFeaturedHtmlOverride = data.find("MobileFeaturedHtmlOverride:first").text();
    this.IsNavFeatured = eval(data.find("IsNavFeatured:first").text());
    this.NavFeaturedImagePath = data.find("NavFeaturedImagePath:first").text();
    this.NavFeaturedHtmlOverride = data.find("NavFeaturedHtmlOverride:first").text();
    this.IsFooterFeatured = eval(data.find("IsFooterFeatured:first").text());
    this.FooterFeaturedImagePath = data.find("FooterFeaturedImagePath:first").text();
    this.FooterFeaturedTitleText = data.find("FooterFeaturedTitleText:first").text();
    this.FooterFeaturedLinkText = data.find("FooterFeaturedLinkText:first").text();
    this.FooterFeaturedDisclaimerText = data.find("FooterFeaturedDisclaimerText:first").text();
    this.FooterFeaturedHtmlOverride = data.find("FooterFeaturedHtmlOverride:first").text();
    this.IsLocFeatured = eval(data.find("IsLocFeatured:first").text());
    this.LocFeaturedImagePath = data.find("LocFeaturedImagePath:first").text();
    this.LocFeaturedHtmlOverride = data.find("LocFeaturedHtmlOverride:first").text();
    this.IsSignupFeatured = eval(data.find("IsSignupFeatured:first").text());
    this.SignupFeaturedImagePath = data.find("SignupFeaturedImagePath:first").text();
    this.SignupFeaturedTitleText = data.find("SignupFeaturedTitleText:first").text();
    this.SignupFeaturedDescription = data.find("SignupFeaturedDescription:first").text();
    this.SignupFeaturedHtmlOverride = data.find("SignupFeaturedHtmlOverride:first").text();
    this.RefItemUrl = data.find("RefItemUrl:first").text();
    this.RefItemMobileUrl = data.find("RefItemMobileUrl:first").text();
    this.Ordinal = data.find("Ordinal:first").text();
    this.DatePublished = parseBKCmsDate(data.find("DatePublished:first").text());
    this.ExpirationDate = parseBKCmsDate(data.find("ExpirationDate:first").text());

    this.IsVisibleOnMobileSite = function () {
        return (trim(this.MobileImagePath) != "") && this.IsMobilePromotion;
    };
    this.IsAvailableAtRestaurant = function (objRestaurant) {
        if (!this.IsNational) {
            if (objRestaurant == null ||
                typeof (objRestaurant.ID) == 'undefined' ||
                $.inArray(objRestaurant.DMACode, this.AvailableInDMAs) < 0) {
                return false;
            }
        }

        return true;
    };
    this.IsAvailableAtThisTime = function () {
        var date = new Date();
        date.setHours(0, 0, 0, 0);

        if ((this.DatePublished != null && date < this.DatePublished) ||
            (this.ExpirationDate != null && date > this.ExpirationDate)) {
            return false;
        }

        return true;
    };
    this.GetItemUrl = function () {
        return 'http://' + window.location.hostname + CulturePrefix + 'fresh-offers/' + toSeoFriendly(stripHtml(this.DisplayTitle) + '-' + this.ID) + '.html';
    };
    this.GetRefItemUrl = function () {
        if (this.RefItemUrl != null && typeof (this.RefItemUrl) != 'undefined' && this.RefItemUrl != '') {
            return this.RefItemUrl;
        } else {
            return this.GetItemUrl();
        }
    };
    this.GetRefItemTarget = function () {
        return isExternalUrl(this.RefItemUrl) ? '_blank' : '_self';
    };
    this.GetItemMobileUrl = function () {
        return '';
    };
    this.GetRefItemMobileUrl = function () {
        if (this.RefItemMobileUrl != null && typeof (this.RefItemMobileUrl) != 'undefined' && this.RefItemMobileUrl != '') {
            return this.RefItemMobileUrl;
        } else {
            return this.GetItemMobileUrl();
        }
    };
    this.GetRefItemMobileTarget = function () {
        return isExternalUrl(this.RefItemMobileUrl) ? '_blank' : '_self';
    };
};
