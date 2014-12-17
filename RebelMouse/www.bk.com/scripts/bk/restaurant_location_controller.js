// BK namespace
var BK = BK || {};

// The controller
BK.restaurantLocationController = function () {
    var geocoder = new google.maps.Geocoder();
    var ipGeolocator = null;
    var myBKRestaurantID = null;
    var objRestaurant = null;
    var callbackHandleCount = 0;
    var arrCallbacks = {};

    function initializeFromCookie() {
        if ($.cookie("MyBKRestaurantID") != null) {
            myBKRestaurantID = $.cookie("MyBKRestaurantID");
        }
    }

    function locateAndSetRestaurantObject() {
        initializeFromCookie();

        getIPGeolocationAndSearchRestaurant(function () {
            if (myBKRestaurantID != null) {
                setRestaurantObjectFromMyBKRestaurantID();
            } else {
                triggerLocationCallbacks();
            }
        });
    }

    function getIPGeolocationAndSearchRestaurant(callbackFn) {
        if (ipGeolocator != null) {
            if (ipGeolocator.getFormattedLocation() != null) {
                callbackFn();
            } else {
                ipGeolocator.registerCityGeolocationResolutionCallback(function (strLocation) {
                    callbackFn();
                });
                ipGeolocator.getCityGeolocation();
            }
        } else {
            alert("Error: restaurantLocationController not provided with required ipGeolocator object at initialization.");
        }
    }

    function setRestaurantObjectFromMyBKRestaurantID() {
        $.ajax({
            type: 'GET',
            url: CulturePrefix + 'restaurants/' + ipGeolocator.getLatLng().lat() + '/' + ipGeolocator.getLatLng().lng() + '/' + myBKRestaurantID + '.xml',
            async: 'false',
            dataType: 'xml',
            success: function (xml) {
                var xmlRestaurant = $(xml).find('Restaurant');
                setRestaurantObjectFromXML(xmlRestaurant);
            }
        });
    }

    function setRestaurantObjectFromGeolocatedLatLng() {
        $.ajax({
            type: 'GET',
            url: CulturePrefix + 'restaurants/' + ipGeolocator.getLatLng().lat() + '/' + ipGeolocator.getLatLng().lng() + '/' + intRestaurantSearchRadius + '/' + 1 + '/restaurants.xml',
            async: 'false',
            dataType: 'xml',
            success: function (xml) {
                var xmlRestaurant = $(xml).find('Restaurant').first();
                setMyBKRestaurantID(xmlRestaurant.attr("ID"));
                setRestaurantObjectFromXML(xmlRestaurant);
            }
        });
    }

    function setMyBKRestaurantID(id) {
        myBKRestaurantID = id;
        $.cookie("MyBKRestaurantID", myBKRestaurantID, { expires: 18000, path: "/" });
        setRestaurantObjectFromMyBKRestaurantID();
    }

    function setRestaurantObjectFromXML(xmlRestaurant) {
        objRestaurant = new BK.restaurantLocationModel.restaurant(xmlRestaurant);
        triggerLocationCallbacks();
    }

    function triggerLocationCallbacks() {
        $.each(arrCallbacks, function (index, callback) {
            callback(objRestaurant, ipGeolocator.getLatLng());
        });
    }

    return {
        setIPGeolocator: function (objLocator) {
            ipGeolocator = objLocator;
        },
        locateRestaurant: function () {
            locateAndSetRestaurantObject();
        },
        registerLocationResolutionCallback: function (callback) {
            // In case of race condition where restaurant controller resolves before we register the callback.
            if (ipGeolocator.getLatLng() != null) {
                callback(objRestaurant, ipGeolocator.getLatLng());
            }
            arrCallbacks[callbackHandleCount++] = callback;
            return callbackHandleCount - 1;
        },
        removeLocationResolutionCallback: function (handle) {
            delete arrCallbacks[handle];
        },
        setMyBKRestaurantID: function (id) {
            setMyBKRestaurantID(id);
        },
        getIPGeolocatedLatLng: function () {
            return ipGeolocator.getLatLng();
        },
        getIPGeolocatedLocation: function () {
            return ipGeolocator.getFormattedLocation();
        },
        getIPGeolocatedCountry: function () {
            return ipGeolocator.getGeolocatedCountry();
        }
    }
} ();

