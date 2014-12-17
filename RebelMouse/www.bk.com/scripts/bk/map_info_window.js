// MapInfoWindow implements a custom Overlay for a Google Map instance to display
// a popup info window that is skinnable for Maps V3.
//
// As the code requires prototypes, there is no way to place it inside the BK namespace
// elegantly so I have left it global.
//
// Note I have not commented a lot of this code as of now due to development deadline pressure.
// I will return and do it later.

function MapInfoWindow(options) {
    this.CONTAINER_BOUNDS_PADDING_LEFT = 20;
    this.CONTAINER_BOUNDS_PADDING_RIGHT = 20;
    this.CONTAINER_BOUNDS_PADDING_TOP = 20;
    this.CONTAINER_BOUNDS_PADDING_BOTTOM = 20;

    this.map_ = options["map"];
    this.marker_ = options["marker"];
    this.containerDivID_ = options["containerID"];
    this.visibleOnStart_ = (typeof options["visibleOnStart"] !== undefined) ? options["visibleOnStart"] : false;
    // Used for debugging
    this.arrBoundsMarkers_ = [];

    this.containerDiv_ = null;
    switch (options["orientation"]) {
        case "ne":
            this.containerPositionXCoefficient_ = 0;
            this.containerPositionYCoefficient_ = -1;
            break;
        case "nw":
            this.containerPositionXCoefficient_ = -1;
            this.containerPositionYCoefficient_ = -1;
            break;
        case "se":
            this.containerPositionXCoefficient_ = 0;
            this.containerPositionYCoefficient_ = 0;
            break;
        case "sw":
            this.containerPositionXCoefficient_ = -1;
            this.containerPositionYCoefficient_ = 0;
            break;
        default:
            this.containerPositionXCoefficient_ = 0;
            this.containerPositionYCoefficient_ = 0;
            break;
    }
    this.containerXOffset_ = options["containerXOffset"];
    this.containerYOffset_ = options["containerYOffset"];
    this.containerBounds_ = null;
    this.arrContainerIDSet_ = [];

    this.innerWindowContentsDiv_ = null;
    this.contents_ = "";

    this.setMap(this.map_);
}

MapInfoWindow.prototype = new google.maps.OverlayView();

MapInfoWindow.prototype.isVisible = function () {
    if (this.containerDiv_ && this.containerDiv_.style)
        return this.containerDiv_.style.visibility != "hidden";
    else
        return false;
}

MapInfoWindow.prototype.setPositionRelativeToMarker = function () {
    if (this.containerDiv_ != null) {
        var projection = this.getProjection();
        var markerPosition = projection.fromLatLngToDivPixel(this.marker_.getPosition());

        this.containerDiv_.style.left = (markerPosition.x + (this.containerDiv_.offsetWidth * this.containerPositionXCoefficient_) + this.containerXOffset_) + 'px';
        this.containerDiv_.style.top = (markerPosition.y + (this.containerDiv_.offsetHeight * this.containerPositionYCoefficient_) + this.containerYOffset_) + 'px';
    }
}

MapInfoWindow.prototype.cancelMouseEvent = function (mouseEvent) {
    if (mouseEvent.stopPropagation) {
        mouseEvent.stopPropagation();
    } else {
        // IE8 
        mouseEvent.cancelBubble = true;
        mouseEvent.returnValue = false;
    }
}

MapInfoWindow.prototype.onAdd = function () {
    var containerDiv = document.createElement('DIV');
    containerDiv.style.position = 'absolute';
    containerDiv.style.visibility = 'hidden';
    containerDiv.setAttribute("id", this.containerDivID_);
    containerDiv.className += 'info_window';

    var innerWindowTopDiv = document.createElement('DIV');
    innerWindowTopDiv.style.position = 'relative';
    innerWindowTopDiv.className += 'info_window_top';
    containerDiv.appendChild(innerWindowTopDiv);

    var innerWindowContentsDiv = document.createElement('DIV');
    innerWindowContentsDiv.style.position = 'relative';
    innerWindowContentsDiv.className += 'info_window_contents';
    innerWindowContentsDiv.innerHTML = this.contents_;
    containerDiv.appendChild(innerWindowContentsDiv);

    var innerWindowBottomDiv = document.createElement('DIV');
    innerWindowBottomDiv.style.position = 'relative';
    innerWindowBottomDiv.className += 'info_window_bottom';
    containerDiv.appendChild(innerWindowBottomDiv);

    this.containerDiv_ = containerDiv;
    this.innerWindowContentsDiv_ = innerWindowContentsDiv;

    var panes = this.getPanes();
    panes.floatPane.appendChild(containerDiv);

    google.maps.event.addDomListener(containerDiv, 'click', this.cancelMouseEvent);
    google.maps.event.addDomListener(containerDiv, 'dblclick', this.cancelMouseEvent);
    google.maps.event.addDomListener(containerDiv, 'mousedown', this.cancelMouseEvent);
    google.maps.event.addDomListener(containerDiv, 'mouseup', this.cancelMouseEvent);

    // Reposition window after zoom
    var infoWindowInstance = this;
    google.maps.event.addListener(this.map_, 'zoom_changed', function () {
        google.maps.event.addListenerOnce(infoWindowInstance.map_, 'tilesloaded', function () {
            isVisible = infoWindowInstance.isVisible();
            if (isVisible) {
                infoWindowInstance.hide();
            }
            infoWindowInstance.setPositionRelativeToMarker();
            if (isVisible) {
                infoWindowInstance.show();
            }
        });
    });
}

MapInfoWindow.prototype.calculateAndSetContainerBounds = function () {
    var projection = this.getProjection();

    var infoWindowSW = projection.fromDivPixelToLatLng(new google.maps.Point(parseInt(this.containerDiv_.style.left) - this.CONTAINER_BOUNDS_PADDING_LEFT,
                                                                             parseInt(this.containerDiv_.style.top) + this.containerDiv_.offsetHeight + this.CONTAINER_BOUNDS_PADDING_BOTTOM));
    var infoWindowNE = projection.fromDivPixelToLatLng(new google.maps.Point(parseInt(this.containerDiv_.style.left) + this.containerDiv_.offsetWidth + this.CONTAINER_BOUNDS_PADDING_RIGHT,
                                                                             parseInt(this.containerDiv_.style.top) - this.CONTAINER_BOUNDS_PADDING_TOP));
    this.containerBounds_ = new google.maps.LatLngBounds(infoWindowSW, infoWindowNE);

    // Debugging code

    //    for (var i = 0; i < this.arrBoundsMarkers_.length; i++) {
    //        this.arrBoundsMarkers_[i].setMap(null);
    //    }
    //    this.arrBoundsMarkers_.length = 0;

    //    this.containerBounds_ = new google.maps.LatLngBounds(infoWindowSW, infoWindowNE);
    //    var nePositionMarker = new google.maps.Marker({
    //        map: this.map_,
    //        position: infoWindowNE,
    //        title: $(this.containerDiv_).attr("id") + ' ' + infoWindowNE.lat() + ' ne ' + markerPosition.y + ' ' +
    //                 (parseInt(this.containerDiv_.style.top) + this.containerDiv_.offsetHeight + this.CONTAINER_BOUNDS_PADDING_BOTTOM)
    //    });
    //    this.arrBoundsMarkers_.push(nePositionMarker);
    //    var swPositionMarker = new google.maps.Marker({
    //        map: this.map_,
    //        position: infoWindowSW,
    //        title: $(this.containerDiv_).attr("id") + ' ' + infoWindowSW.lat() + ' sw ' + markerPosition.y + ' ' +
    //                 (parseInt(this.containerDiv_.style.top) + this.containerDiv_.offsetHeight + this.CONTAINER_BOUNDS_PADDING_BOTTOM)
    //    });
    //    this.arrBoundsMarkers_.push(swPositionMarker);
}

MapInfoWindow.prototype.draw = function () {
}

MapInfoWindow.prototype.onRemove = function () {
    $(this.containerDiv_).empty();
    this.containerDiv_.parentNode.removeChild(this.containerDiv_);
    this.containerDiv_ = null;
}

MapInfoWindow.prototype.setContents = function (contents) {
    this.contents_ = contents;
}

MapInfoWindow.prototype.setContainerIDSet = function (arrContainerIDSet) {
    this.arrContainerIDSet_ = arrContainerIDSet;
}

MapInfoWindow.prototype.hide = function () {
    if (this.containerDiv_) {
        $(this.containerDiv_).css("visibility", "hidden");
    }
}

MapInfoWindow.prototype.show = function () {
    if (this.containerDiv_) {
        this.setPositionRelativeToMarker();
        this.calculateAndSetContainerBounds();
        // Set all info windows in this layer to be invisible
        if (this.arrContainerIDSet_.length > 0) {
            $.each(this.arrContainerIDSet_, function (index, value) {
                $("[id=" + value + "]").css("visibility", "hidden");
            });
        }
        $(this.containerDiv_).css("visibility", "visible");

        this.map_.panToBounds(this.containerBounds_);
    }
}

MapInfoWindow.prototype.toggle = function () {
    if (this.containerDiv_) {
        if ($(this.containerDiv_).css("visibility") == "hidden") {
            this.show();
        } else {
            this.hide();
        }
    }
}

