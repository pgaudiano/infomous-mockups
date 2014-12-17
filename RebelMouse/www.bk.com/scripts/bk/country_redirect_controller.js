// BK namespace
var BK = BK || {};

// The controller
BK.CountryRedirectController = function () {
    var checkCountryWebServiceUrlPrefix = 'http://redesign.bk.com/en/us/countryredirect/';
    var checkOpinionRedirectWebServiceUrlPrefix = 'http://redesign.bk.com/en/us/opinionredirect/';
    var arrCheckCountryResolutionCallbacks = [];
    var arrCheckOpinionRedirectResolutionCallbacks = [];
    var boolDefaultRedirect = false;
    var boolCheckPerformed = false;
    var boolOpinionCheckPerformed = false;
    var boolRedirect = false;
    var boolOpinionRedirect = false;
    var strCountryName = '';
    var strWebsiteURL = '';
    var strOpinionRedirectURL = '';

    function setStateOnCountryWebServiceResolution(data) {
        boolCheckPerformed = true;
        boolRedirect = (data.Redirect == "Yes") ? true : false;
        strCountryName = data.CountryName;
        strWebsiteURL = data.WebsiteURL;

        setCountryRedirectCookie();
        triggerCheckCountryResolutionCallbacks();
    }

    function setStateOnOpinionRedirectWebServiceResolution(data) {
        boolOpinionCheckPerformed = true;
        boolOpinionRedirect = (data.Redirect == "Yes") ? true : false;
        strCountryName = data.CountryName;
        strOpinionRedirectURL = data.OpinionURL;

        triggerCheckOpinionRedirectResolutionCallbacks();
    }

    function initializeCountryRedirectFromCookie() {
        if ($.cookie("CountryRedirect") != null) {
            var redirectArgs = $.cookie("CountryRedirect").split('&');

            if (redirectArgs.length == 4) {
                boolCheckPerformed = true;
                boolDefaultRedirect = redirectArgs[0].split('=')[1];
                boolRedirect = redirectArgs[1].split('=')[1];
                strWebsiteURL = redirectArgs[2].split('=')[1];
                strCountryName = redirectArgs[3].split('=')[1];

                setCountryRedirectCookie();
                triggerCheckCountryResolutionCallbacks();
            }
        }
    }

    function setCountryRedirectCookie() {
        $.cookie("CountryRedirect", 'p=' + boolDefaultRedirect + '&r=' + boolRedirect + '&u=' + strWebsiteURL + '&c=' + strCountryName, { expires: 0, path: '/' });
    }

    function checkCountryRedirect(strCountry) {
        if (!boolCheckPerformed) {
            $.ajax({
                url: checkCountryWebServiceUrlPrefix + strCountry + ".json",
                type: 'GET',
                dataType: 'jsonp',
                jsonp: 'jsoncallback',
                success: function (data) {
                    setStateOnCountryWebServiceResolution(data);
                },
                error: function () {
                    boolCheckPerformed = true;
                    triggerCheckCountryResolutionCallbacks();
                }
            });
        }
    }

    function checkOpinionRedirect(strCountry) {
        if (!boolOpinionCheckPerformed) {
            $.ajax({
                url: checkOpinionRedirectWebServiceUrlPrefix + strCountry + ".json",
                type: 'GET',
                dataType: 'jsonp',
                jsonp: 'jsoncallback',
                success: function (data) {
                    setStateOnOpinionRedirectWebServiceResolution(data);
                },
                error: function () {
                    boolOpinionCheckPerformed = true;
                    triggerCheckOpinionRedirectResolutionCallbacks();
                }
            });
        }
    }

    function triggerCheckCountryResolutionCallbacks() {
        for (i = 0; i < arrCheckCountryResolutionCallbacks.length; i++) {
            arrCheckCountryResolutionCallbacks[i](boolDefaultRedirect, boolRedirect, strWebsiteURL);
        }
        arrCheckCountryResolutionCallbacks.length = 0;
    }

    function triggerCheckOpinionRedirectResolutionCallbacks() {
        for (i = 0; i < arrCheckOpinionRedirectResolutionCallbacks.length; i++) {
            arrCheckOpinionRedirectResolutionCallbacks[i](boolOpinionRedirect, strOpinionRedirectURL);
        }
        arrCheckOpinionRedirectResolutionCallbacks.length = 0;
    }

    return {
        setCheckCountryWebServiceUrlPrefix: function (urlPrefix) {
            checkCountryWebServiceUrlPrefix = urlPrefix;
        },
        setCheckOpinionRedirectWebServiceUrlPrefix: function (urlPrefix) {
            checkOpinionRedirectWebServiceUrlPrefix = urlPrefix;
        },
        setDefaultRedirect: function (redirect) {
            setDefaultRedirect(redirect);
        },
        registerCheckCountryResolutionCallbackFn: function (callbackFn) {
            if (boolCheckPerformed) {
                callbackFn(boolDefaultRedirect, boolRedirect, strWebsiteURL);
            } else {
                arrCheckCountryResolutionCallbacks.push(callbackFn);
            }
        },
        registerCheckOpinionRedirectResolutionCallbackFn: function (callbackFn) {
            if (boolOpinionCheckPerformed) {
                callbackFn(boolOpinionRedirect, strOpinionRedirectURL);
            } else {
                arrCheckOpinionRedirectResolutionCallbacks.push(callbackFn);
            }
        },
        checkCountryRedirect: function (strCountry) {
            checkCountryRedirect(strCountry);
        },
        checkOpinionRedirect: function (strCountry) {
            checkOpinionRedirect(strCountry);
        },
        getCountryName: function () {
            return strCountryName;
        }
    }
} ();

// Globals that need to be called before the system is initialized

function checkCookieAndRedirectImmediately(timeout) {
    if ($.cookie("CountryRedirectException") == null || $.trim($.cookie("CountryRedirectException")) != "true") {
        if ($.cookie("CountryRedirect") != null) {
            redirectArgs = $.cookie("CountryRedirect").split('&');

            if (redirectArgs.length == 4) {
                defaultRedirectArgs = redirectArgs[0].split('=');
                boolRedirectArgs = redirectArgs[1].split('=');
                websiteURLArgs = redirectArgs[2].split('=')

                if (defaultRedirectArgs.length == 2 && websiteURLArgs.length == 2) {
                    if (($.trim(defaultRedirectArgs[1]) == "true") && ($.trim(boolRedirectArgs[1]) == "true")) {
                        var expiryDate = new Date();

                        expiryDate.setMinutes(expiryDate.getMinutes() + parseInt(timeout));
                        $.cookie("CountryRedirect", $.cookie("CountryRedirect"), { expires: expiryDate, path: '/' });
                        window.location = websiteURLArgs[1];
                    }
                }
            }
        }
    }
}