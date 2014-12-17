// BK namespace
var BK = BK || {};
BK.restaurantLocationModel = {};

// Encapsulation of restaurant location model
BK.restaurantLocationModel.restaurant = function (data) {

    this.ID = data.attr("ID");
    this.Title = data.find('Title').text();
    this.Description = data.find('Description').text();
    this.Address1 = data.find('Address1').text();
    this.Address2 = data.find('Address2').text();
    this.Address3 = data.find('Address3').text();
    this.Address4 = data.find('Address4').text();
    this.City = data.find('City').text();
    this.StateProvince = data.find('StateProvince').text();
    this.PostalCode = data.find('PostalCode').text();
    this.Country = data.find('Country').text();
    this.PhoneNumber = data.find('PhoneNumber').text();
    this.RestaurantType = data.find('RestaurantType').text();
    this.FranchiseID = data.find('FranchiseID').text(); ;
    this.FranchiseName = data.find('FranchiseName').text();
    this.DMACode = data.find('DMACode').text();
    this.VenueID = data.find('VenueID').text();
    this.OperHrsEarlyBreakfast = data.find('OperHrsEarlyBreakfast').text();
    this.OperHrs24hrs = data.find('OperHrs24hrs').text();
    this.OperHrsLateNight = data.find('OperHrsLateNight').text();
    this.DriveThru = data.find('DriveThru').text();
    this.PlaygroundOnSite = data.find('PlaygroundOnSite').text() == "false" ? "No" : "Yes";
    this.CrownCardSupported = data.find('CrownCardSupported').text() == "false" ? "No" : "Yes";
    this.Email = data.find('Email').text();
    this.WeekdayStoreHours = data.find('WeekdayStoreHours').text();
    this.WeekendStoreHours = data.find('WeekendStoreHours').text();
    this.Latitude = data.find('Latitude').text();
    this.Longitude = data.find('Longitude').text();
    this.UTCOffset = data.find('UTCOffset').text();
    this.HasDST = data.find('HasDST').text();
    this.DistanceFromSearchOrigin = data.find('DistanceFromSearchOrigin').text();

}

function RestaurantIsCurrentlyDST(objRestaurant) {
    if (objRestaurant.HasDST == false) {
        return false;
    } else {
        var currentTime = new Date();
        currentTime.setMinutes(currentTime.getMinutes() + 1 * objRestaurant.UTCOffset);
        var dstStart = new Date(currentTime.getFullYear(), 2, 14, 2, 0, 0, 0);
        var dstEnd = new Date(currentTime.getFullYear(), 10, 7, 2, 0, 0, 0);
        var dstStartDayOfWeek = dstStart.getDay();
        var dstEndDayOfWeek = dstEnd.getDay();

        dstStart.setDate(14 - dstStartDayOfWeek);
        dstEnd.setDate(7 - dstEndDayOfWeek);

        if (dstStart < currentTime && currentTime < dstEnd) {
            return true;
        } else {
            return false;
        }
    }
}

function RestaurantIsOpen(objRestaurant) {
    if (objRestaurant.OperHrs24hrs == "All week") {
        return true;
    }

    var currentTime = new Date();
    var isDST = RestaurantIsCurrentlyDST(objRestaurant);
    var localUTCOffset = currentTime.getTimezoneOffset();
    var restaurantOffsetFromLocal = 1 * localUTCOffset + 1 * objRestaurant.UTCOffset + 1 * ((objRestaurant.HasDST == 'true' && RestaurantIsCurrentlyDST(objRestaurant)) ? 60 : 0);
    var timeAtRestaurant = currentTime;

    timeAtRestaurant.setMinutes(timeAtRestaurant.getMinutes() + restaurantOffsetFromLocal);

    if ((objRestaurant.OperHrs24hrs == "Partial week") &&
        ((timeAtRestaurant.getDay() == 5 && timeAtRestaurant.getHours() >= 6) ||
         timeAtRestaurant.getDay() == 6 ||
         (timeAtRestaurant.getDay() == 0 && timeAtRestaurant.getHours() < 23))) {
        return true;
    }

    switch (timeAtRestaurant.getDay()) {
        case 1:
        case 2:
        case 3:
        case 4:
            if (timeAtRestaurant.getHours() >= 6 && timeAtRestaurant.getHours() < 23) {
                return true;
            } else {
                return false;
            }
        case 5:
            if (timeAtRestaurant.getHours() >= 6) {
                return true;
            } else {
                return false;
            }
        case 6:
            if (timeAtRestaurant.getHours() >= 6 || timeAtRestaurant.getHours() < 1) {
                return true;
            } else {
                return false;
            }
        case 0:
            if (timeAtRestaurant.getHours() < 1 ||
                (timeAtRestaurant.getHours() >= 6 && timeAtRestaurant.getHours() < 23)) {
                return true;
            } else {
                return false;
            }
    }
}

 