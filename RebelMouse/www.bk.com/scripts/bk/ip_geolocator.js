// BK namespace
var BK = BK || {};

// The object definition
BK.IPGeolocator = function () {
    var geocoder = new google.maps.Geocoder();

    var cityGeolocationWebServiceUrl = 'http://redesign.bk.com/ipgeolocationcity.json';
    var countryGeolocationWebServiceUrl = 'http://redesign.bk.com/ipgeolocationcountry.json';
    var cityLocation = null;
    var cityLocationCacheTimeout = null;
    var countryLocation = null;
    var countryLocationCacheTimeout = null;
    var strGeolocatedCountry = null;
    var strFormattedLocation = null;
    var objLatLng = null;
    var arrCityGeolocationResolutionCallbacks = [];
    var arrCountryGeolocationResolutionCallbacks = [];

    function initializeCityLocationFromCookie() {
        if ($.cookie("CityLocation") != null) {
            cityLocation = $.cookie("CityLocation");
        }
    }

    function initializeCountryLocationFromCookie() {
        if ($.cookie("CountryLocation") != null) {
            countryLocation = $.cookie("CountryLocation");
        }
    }

    function setCityLocationCacheTimeout(timeout) {
        cityLocationCacheTimeout = timeout;
    }

    function setCountryLocationCacheTimeout(timeout) {
        countryLocationCacheTimeout = timeout;
    }

    function setCityLocationAndGeolocateCity(strLocation) {
        var expiryDate = new Date();

        expiryDate.setMinutes(expiryDate.getMinutes() + ((cityLocationCacheTimeout == null) ? 60 : parseInt(cityLocationCacheTimeout)));
        $.cookie("CityLocation", strLocation, { expires: expiryDate, path: '/' });

        var arrSearchTerms = strLocation.split(' ');
        geocoder.geocode({ 'address': strLocation, 'region': BK.local.SAMPLE_TRUCK_LOCATOR.DEFAULT_COUNTRY_CODE },
                         function (response, status) {
                             if (status == google.maps.GeocoderStatus.OK) {
                                 strFormattedLocation = response[0].formatted_address;
                                 strGeolocatedCountry = arrSearchTerms[arrSearchTerms.length - 1];
                                 objLatLng = new google.maps.LatLng(response[0].geometry.location.lat(), response[0].geometry.location.lng());
                             }

                             triggerCityGeolocationResolutionCallbacks();
                         });
    }

    function triggerCityGeolocationResolutionCallbacks() {
        $.each(arrCityGeolocationResolutionCallbacks, function (index, callback) {
            callback();
        });
        arrCityGeolocationResolutionCallbacks.length = 0;
    }

    function triggerCountryGeolocationResolutionCallbacks() {
        $.each(arrCountryGeolocationResolutionCallbacks, function (index, callback) {
            callback(countryLocation);
        });
        arrCountryGeolocationResolutionCallbacks.length = 0;
    }

    function getCityGeolocationForMobileRewards() {
        $.ajax({
            url: cityGeolocationWebServiceUrl,
            type: 'GET',
            dataType: 'jsonp',
            jsonp: 'jsoncallback',
            success: function (data) {
                var strLocation = data.City + ' ' + data.State + ' ' + data.Country;
                OnSuccessgetCityGeolocationForMobileRewardsCall(strLocation);
                cityLocation = strLocation;
                return strLocation;
            },
            error: function () {
                return "";
            }
        });
    }

    function getCityGeolocationForRewards() {
        $.ajax({
            url: cityGeolocationWebServiceUrl,
            type: 'GET',
            dataType: 'jsonp',
            jsonp: 'jsoncallback',
            success: function (data) {
                var strLocation = data.City + ' ' + data.State + ' ' + data.Country;
                OnSuccessgetCityGeolocationForRewardsCall(strLocation);
                return strLocation;
            },
            error: function () {
                return "";
            }
        });
    }

    function getCityGeolocation() {
        initializeCityLocationFromCookie();

        if (cityLocation == null) {
            $.ajax({
                url: cityGeolocationWebServiceUrl,
                type: 'GET',
                dataType: 'jsonp',
                jsonp: 'jsoncallback',
                success: function (data) {
                    var strLocation = data.City + ' ' + data.State + ' ' + data.Country;
                    if ($.trim(strLocation) != '') {
                        setCityLocationAndGeolocateCity($.trim(strLocation));
                    } else {
                        setCityLocationAndGeolocateCity(BK.local.IP_GEOLOCATOR.DEFAULT_SEARCH_LOCATION);
                    }
                },
                error: function () {
                    setCityLocationAndGeolocateCity(BK.local.IP_GEOLOCATOR.DEFAULT_SEARCH_LOCATION);
                }
            });
        } else {
            if ($.trim(cityLocation) != '') {
                setCityLocationAndGeolocateCity($.trim(cityLocation));
            } else {
                setCityLocationAndGeolocateCity(BK.local.IP_GEOLOCATOR.DEFAULT_SEARCH_LOCATION);
            }
        }
    }

    function setCountryLocation(country) {
        var expiryDate = new Date();

        expiryDate.setMinutes(expiryDate.getMinutes() + ((cityLocationCacheTimeout == null) ? 180 : parseInt(cityLocationCacheTimeout)));
        $.cookie("CountryLocation", country, { expires: expiryDate, path: '/' });
        countryLocation = country;

        triggerCountryGeolocationResolutionCallbacks();
    }

    function getCountryGeolocation() {
        initializeCountryLocationFromCookie();

        if (countryLocation == null) {
            $.ajax({
                url: countryGeolocationWebServiceUrl,
                type: 'GET',
                dataType: 'jsonp',
                jsonp: 'jsoncallback',
                success: function (data) {
                    if ($.trim(data.Country) != '') {
                        setCountryLocation($.trim(data.Country));
                    } else {
                        setCountryLocation(BK.local.IP_GEOLOCATOR.DEFAULT_COUNTRY);
                    }
                },
                error: function () {
                    setCountryLocation(BK.local.IP_GEOLOCATOR.DEFAULT_COUNTRY);
                }
            });
        } else {
            if ($.trim(countryLocation) != '') {
                setCountryLocation($.trim(countryLocation));
            } else {
                setCountryLocation(BK.local.IP_GEOLOCATOR.DEFAULT_COUNTRY);
            }
        }
    }

    return {
        getCityGeolocation: function () {
            getCityGeolocation();
        },
        //Start: toshow Rewards tab for the configured cities
        getCityGeolocationForRewards: function () {
            return getCityGeolocationForRewards();
        },
        getCityGeolocationForMobileRewards: function () {
            return getCityGeolocationForMobileRewards();
        },
        //End of : toshow Rewards tab for the configured cities
        setCityGeolocationWebServiceUrl: function (url) {
            cityGeolocationWebServiceUrl = url;
        },
        getCountryGeolocation: function () {
            getCountryGeolocation();
        },
        setCountryGeolocationWebServiceUrl: function (url) {
            countryGeolocationWebServiceUrl = url;
        },
        setCityLocationCacheTimeout: function (timeout) {
            setCityLocationCacheTimeout(timeout);
        },
        setCountryLocationCacheTimeout: function (timeout) {
            setCountryLocationCacheTimeout(timeout);
        },
        registerCountryLocationResolutionCallback: function (callback) {
            if (countryLocation != null) {
                callback(countryLocation);
            }
            arrCountryGeolocationResolutionCallbacks.push(callback);
        },
        registerCityGeolocationResolutionCallback: function (callback) {
            // In case of race condition where IP Geolocation resolves before we register the callback.
            if (cityLocation != null && objLatLng != null) {
                callback(cityLocation);
            }
            arrCityGeolocationResolutionCallbacks.push(callback);
        },
        getFormattedLocation: function () {
            return strFormattedLocation;
        },
        getLatLng: function () {
            return objLatLng;
        },
        getGeolocatedCountry: function () {
            return strGeolocatedCountry;
        }
    }

} ();
