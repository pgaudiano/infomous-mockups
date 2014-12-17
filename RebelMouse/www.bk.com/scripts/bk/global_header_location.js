// BK namespace
var BK = BK || {};

BK.globalHeaderLocation = function () {
    var map = null;
    var mapCenterMarker = null;
    var restaurantMarker = null;
    var infoWindow = null;

    var CONTENT = BK.local.RESTAURANT_LOCATOR;

    function centerMapOnLocation(latlng, zoom) {
        if (map != null) {
            map.setCenter(latlng);
            map.setZoom(zoom);
        }
    }

    function updateMapAndYourBKTextWithRestaurant(objRestaurant, objIPGeolocatedLatLng) {
        if (objRestaurant != null) {
            var objRestaurantLatLng = new google.maps.LatLng(objRestaurant.Latitude, objRestaurant.Longitude);

            if (mapCenterMarker != null) {
                mapCenterMarker.setMap(null);
            }
            if (restaurantMarker != null) {
                restaurantMarker.setMap(null);
            }
            if (infoWindow != null) {
                infoWindow.setMap(null);
            }

            // Add restaurant marker once the map has repositioned
            var strInfoWindowHtml = '<h2>' + CONTENT.YOUR_BK + '</h2>';
            strInfoWindowHtml += '<h3>' + objRestaurant.Address1 + '</h3>' +
                            '<p>' + objRestaurant.City + ', ' + objRestaurant.StateProvince + ' ' + objRestaurant.PostalCode + '<br />' +
                            objRestaurant.PhoneNumber + '</p>';

            createRestaurantMarker(objRestaurantLatLng, strInfoWindowHtml, CulturePrefix);
            centerMapOnLocation(objRestaurantLatLng, 13);

            // Set name on header to Address1 field
            $("#yourBKName").html(objRestaurant.Address1);
            $("#mainNavBKTitle .element-ie7").show();
            $("#mainNavBKTitleText").click(function () {
                $('#mainNavBKTitle').submit();
            });
            $("#mainNavBKTitleText").hover(
				function () {
				    $(this).css("cursor", "pointer");
				},
				function () {
				    $(this).css("cursor", "default");
				}
			);


            // $("#mainNavBKTitle").show();

        } else {
            var objLocationLatLng = objIPGeolocatedLatLng;

            // Hide Your BK display
            //$("#mainNavBKTitle").hide();

            $("#mainNavBKTitle .element-ie7").hide();
            $("#mainNavBKTitleText").unbind("click");
            $('#mainNavBKTitleText').unbind('mouseenter mouseleave');


            centerMapOnLocation(objLocationLatLng, 13);

            mapCenterMarker = new google.maps.Marker({
                position: objLocationLatLng,
                map: map,
                icon: '/images/locations/pin_search_location_main.png',
                shape: { coord: [0, 0, 44, 0, 44, 50, 0, 50], type: 'poly' }
            });
        }
    }

    function createRestaurantMarker(objLatLng, strInfoWindowHtml, strCulturePrefix) {
        restaurantMarker = new google.maps.Marker({
            position: objLatLng,
            map: map,
            icon: '/images/locations/pin_my_bk_star.png',
            shape: { coord: [0, 0, 44, 0, 44, 50, 0, 50], type: 'poly' }
        });

        infoWindow = new MapInfoWindow({
            'map': map,
            'marker': restaurantMarker,
            'containerID': 'globalHeaderInfoWindow',
            'orientation': 'nw',
            'containerXOffset': 0,
            'containerYOffset': -40
        });
        infoWindow.setContents(strInfoWindowHtml);
        google.maps.event.addListener(restaurantMarker, 'click', function (mouseEvent) {
            infoWindow.toggle();
            mouseEvent.stop();
        });
    }

    function initializeMap() {
        map = new google.maps.Map(document.getElementById("headerMap"),
                                   {
                                       zoom: 13,
                                       center: new google.maps.LatLng(39.828175, -98.579500),
                                       disableDefaultUI: true,
                                       scrollwheel: false,
                                       mapTypeId: google.maps.MapTypeId.ROADMAP
                                   });
    }

    function onLocationResolution(objRestaurant, objIPGeolocatedLatLng) {
        updateMapAndYourBKTextWithRestaurant(objRestaurant, objIPGeolocatedLatLng);
    }

    return {
        initialize: function () {
            //initializeMap();
            restaurantController.registerLocationResolutionCallback(onLocationResolution);
        },
        getMap: function () {
            return map;
        },
        mapInitializeMap: function () {
            initializeMap();
            restaurantController.registerLocationResolutionCallback(onLocationResolution);
        }
    }

} ()

