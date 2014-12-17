BK.en = BK.en || {};
BK.en.us = {

    'DATE_TIME': {
        'DAY_OF_WEEK_0': 'Sunday',
        'DAY_OF_WEEK_1': 'Monday',
        'DAY_OF_WEEK_2': 'Tuesday',
        'DAY_OF_WEEK_3': 'Wednesday',
        'DAY_OF_WEEK_4': 'Thursday',
        'DAY_OF_WEEK_5': 'Friday',
        'DAY_OF_WEEK_6': 'Saturday',
        'MONTH_OF_YEAR_0': 'January',
        'MONTH_OF_YEAR_1': 'February',
        'MONTH_OF_YEAR_2': 'March',
        'MONTH_OF_YEAR_3': 'April',
        'MONTH_OF_YEAR_4': 'May',
        'MONTH_OF_YEAR_5': 'June',
        'MONTH_OF_YEAR_6': 'July',
        'MONTH_OF_YEAR_7': 'August',
        'MONTH_OF_YEAR_8': 'September',
        'MONTH_OF_YEAR_9': 'October',
        'MONTH_OF_YEAR_10': 'November',
        'MONTH_OF_YEAR_11': 'December'
    },

    'IP_GEOLOCATOR': {
        'DEFAULT_COUNTRY': 'US',
        'DEFAULT_SEARCH_LOCATION': 'Miami FL US'
    },
    
    'RESTAURANT_LOCATOR': {
        'YOUR_BK': 'Your <i>BK</i><sup>&reg;</sup>',
        'DEFAULT_SEARCH_LOCATION': 'Miami FL US',
        'DEFAULT_COUNTRY_CODE': 'US',
        'DEFAULT_COUNTRY_GEOLOCATION_NAME': 'USA',
        'DEFAULT_COUNTRY': 'United States of America',
        'INSTRUCTION_BEGIN': 'Enter zip code, address, or city and state to find a',
        'INSTRUCTION_END': 'near you.',
        'RESULT_SUMMARY_BEGIN': 'Restaurants',
        'RESULT_SUMMARY_END': 'near',
        'NO_RESULTS_BEGIN': 'Your search for',
        'NO_RESULTS_END': 'produced 0 results. Please try again.',
        'NONE_FOUND_NEAR_BEGIN': 'No restaurants found near',
        'NONE_FOUND_NEAR_END': 'Please try again.',
        'STORE_DISTANCE': 'Distance',
        'STORE_MILES': 'miles',
        'STORE_WEEKDAY': 'M-F',
        'STORE_WEEKEND': 'Weekends',
        'STORE_NUMBER': 'Restaurant #',
        'DIRECTIONS': 'Directions',
        'DIRECTIONS_GET': 'Get Directions',
        'DIRECTIONS_TO': 'To Here',
        'DIRECTIONS_FROM': 'From Here',
        'DIRECTIONS_START': 'Start Address',
        'DIRECTIONS_END': 'End Address',
        'DIRECTIONS_SUCCESS': 'Success',
        'DIRECTIONS_ERROR_1': 'The address was either missing or had no value.',
        'DIRECTIONS_ERROR_2': 'No corresponding geographic location could be found for the specified address.',
        'DIRECTIONS_ERROR_3': 'The geocode for the given address cannot be returned due to legal or contractual reasons.',
        'DIRECTIONS_ERROR_4': 'The API key is either invalid or does not match the domain for which it was given.',
        'DIRECTIONS_ERROR_5': 'The daily geocoding quota for this site has been exceeded.',
        'DIRECTIONS_ERROR_6': 'The geocoding request could not be successfully processed.',
        'DIRECTIONS_ERROR_7': 'A directions request could not be successfully parsed.',
        'DIRECTIONS_ERROR_8': 'No query was specified in the input.',
        'DIRECTIONS_ERROR_9': 'The GDirections object could not compute directions between the points.',
        'ACCURACY_TO_LOW': 'Please be more specific, enter zip code, address, or city and state to find a BK® near you.',
        'locationHeader': function () {
            headerHTML = CONTENT.INSTRUCTION_BEGIN + ' BK&#174; ' + CONTENT.INSTRUCTION_END;
            return headerHTML;
        },
        'cityResults': function (parseIntCount, parseStrCity, parseStrStateProvince) {
            var htmlResults = '<p id="search_summary">' + parseIntCount + ' BURGER KING&#174; ' + CONTENT.RESULT_SUMMARY_BEGIN + ' <span>' + CONTENT.RESULT_SUMMARY_END + '</span> ' + parseStrCity + ', ' + parseStrStateProvince + '</p><ul>' + htmlResultHolder + '</ul>';
            return htmlResults;
        }
    },

    'SAMPLE_TRUCK_LOCATOR': {
        'DEFAULT_SEARCH_LOCATION': 'Miami FL US',
        'DEFAULT_COUNTRY_CODE': 'US',
        'DEFAULT_COUNTRY_GEOLOCATION_NAME': 'USA',
        'DEFAULT_COUNTRY': 'United States of America'
    },

    'MENU_NUTRITION': {
        'nutritionName': {
            'KEY_Calories': 'Calories',
            'KEY_Fat': 'Fat',
            'KEY_Saturated_Fat': 'Saturated Fat',
            'KEY_Trans_Fat': 'Trans Fat',
            'KEY_Cholesterol': 'Cholesterol',
            'KEY_Carbohydrates': 'Carbohydrates',
            'KEY_Sugar': 'Sugar',
            'KEY_Protein': 'Protein',
            'KEY_Sodium': 'Sodium',
            'KEY_Weight': 'Weight',
            'KEY_Fiber': 'Fiber',
            'KEY_Calcium': 'Calcium'
        },
        'nutritionNameNotShown': ["KEY_Weight","KEY_Fiber"],
        'MEAL_ITEMS': 'items',
        'MEAL_TOTAL': 'TOTAL',
        'MEAL_CAL': 'cal',
        'MEAL_INFO_MORE': 'More Info',
        'MEAL_INFO_LESS': 'Less Info',
        'MEAL_PRINT': 'Print Your Meal',
        'MEAL_INFO': 'MEAL INFO',
        'SANDWICH_INFO': 'SANDWICH INFO',
        'ITEM_G': 'g',
        'ITEM_MG': 'mg',
        'ITEM_ADD': 'Add',
        'ITEM_SUB': 'Subtract',
        'ITEM_REMOVE': 'Remove Item',
        'ITEM_MORE': 'More',
        'ITEM_COLLAPSE': 'Collapse',
        'MEAL_SHARE_HEADER': 'Enjoy Your Meal',
        'MEAL_SHARE_BUTTON': 'Build your own meal, and HAVE IT YOUR WAY&#174;',
        'MEAL_SHARE_TAG1': 'Or enjoy your dessert. Then your meal. It’s your order. HAVE IT YOUR WAY&#174;.',
        'MEAL_SHARE_TAG2': 'Use the restaurant locator to find a BK&#174; near you. (The real thing is so much more satisfying.)',
        'MEAL_SHARE_TAG3': 'Or go back and create another one. One with 5 patties. Or no buns. Whatever you like. ',
        'MEAL_SHARE_TAG4': 'Food is so much more delicious when you have it your way. Don’t you think?',
        'MEAL_SHARE_EMAIL_SUBJECT': 'I just created my dream meal at BK.com',
        'MEAL_SHARE_EMAIL_BODY1': 'I made-up my own sandwich from a long list of delicious BURGER KING® ingredients. Then I added sides. Check it out right here: ',
        'MEAL_SHARE_EMAIL_BODY2': ' And then use the Meal Builder to HAVE IT YOUR WAY®.',
        'MEAL_SHARE_TITLE': 'You really can HAVE IT YOUR WAY®. Check out my dream meal ',
        'annimationMenuItem': 1,
        'randomPatty': [2000, 11, 18, 26, 52, 116, 12, 133, 1002],
        'randomTopping': [1000, 1001, 1003, 3, 138, 41, 67, 81, 7, 86, 137, 118, 74, 126, 115, 76],
        'patternChanges': [300, 700, 350, 900, 250, 500, 650, 400, 350, 500, 600, 250, 550, 700],
        'removeUnusedIngredients': {
            30: { 'unused': [26, 74, 116, 118], 'operator': false, 'length': false },
            120: { 'unused': [26, 74, 116, 118], 'operator': false, 'length': false },
            149: { 'unused': [26, 74, 116, 118], 'operator': false, 'length': false },
            103: { 'unused': ['20:first', '10:first', '124:first', '61:first', '90:first', '112:first'], 'operator': '==', 'length': 12 },
            7: { 'unused': ['98:first', '1002:first', '41:first', '67:first', '81:first', '76:first', '74:first', '118:first', '86:first', '3:first', '1000:first', '1003:first', '1001:first', '7:first', '137:first', '11:first', '136:first', '2000:first', '18:first', '26:first', '116:first', '133:first', '12:first', '52:first', '138:first', '126:first', '115:first'], 'operator': '>', 'length': 50 },
            8: { 'unused': ['98:first', '1002:first', '41:first', '67:first', '81:first', '76:first', '74:first', '118:first', '86:first', '3:first', '1000:first', '1003:first', '1001:first', '7:first', '137:first', '11:first', '136:first', '2000:first', '18:first', '26:first', '116:first', '133:first', '12:first', '52:first', '138:first', '126:first', '115:first'], 'operator': '>', 'length': 50 }
        },
        'dollarBadge': {},
        'dollarBadgeSpecial': {}
        
    },
    'UTILS': {
        'LEAVING_SITE_COPY': 'You are now leaving the Burger King Corporation website. The policies including the privacy policy, on the website or websites you are going to may vary from Burger King Corporation\'s policies. Please be sure to review the policies of every website you visit as Burger King Corporation is not responsible for the policies and practices of other companies.',
        'LEAVING_SITE_CANCEL': 'CANCEL',
        'LEAVING_SITE_CONTINUE': 'CONTINUE',
        'LEAVING_SITE_OPEN_NEW_WINDOW' : 'OPEN IN A NEW WINDOW',
        'LEAVING_SITE_HEADER': 'You are now leaving BK.com'
    },
    'CORPORATE': {
        'CLOSE': 'close',
        /*
        'FDD': 'Burger King Corporation\'s Franchise Disclosure Document ("FDD") is available in electronic format as a PDF file or as a paper copy. If you would like to view the FDD in electronic form click download below. To view the FDD in electronic form you will need a computer that supports the program adobe acrobat. If you would like to receive a paper copy, please contact us at (305) 378-3588.',
        'CANCEL': 'cancel',
        'DOWNLOAD': 'download',
        'TRACK_LOAD_COMPLETE': ['Company Info', 'Timeline', 'Company Info - Timeline - Load Complete'],
        'TRACK_LEFT_ARROW': ['Company Info', 'Timeline', 'Company Info - Timeline - Left Arrow'],
        'TRACK_RIGHT_ARROW': ['Company Info', 'Timeline', 'Company Info - Timeline - Right Arrow'],
        'TRACK_DRAG_TO': ['Company Info', 'Timeline', 'Company Info - Timeline - Drag To '],
        */
        'REAL_ESTATE': '<div class="realestate_panel"><h3>Interested in discussing available sites?</h3>'
                       + '<div class="realestate_line"><div class="realestate_subpanel">Choose a region: <select id="ddlterritory" name="ddlterritory"></select>'
                       + '<div class="dataTop">Please contact:</div>'
                       + '<div id="realestate_contact"></div></div></div></div>'
    },
    'PAGINATION': {
        'NEXT': 'Next',
        'PREVIOUS': 'Previous',
        'INFO_FORMAT': '{items_from}-{items_to} of {items_total}'
    },
    'COMMON': {
        'SEE_MORE_VIDEOS': 'See More Videos',
        'CLOSE': 'close'
    }
};

// These data are better placed in CMS, or the page where it is used.
// These data will be all the same among different language.
var territory = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Canada', 'Colorado', 'Connecticut', 'Georgia', 'Hawaii', ' Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky'
                ,'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Mexico', 'New York'
                ,'North Carolina', 'Northern Florida', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'South Florida', 'Tennessee', 'Texas', 'Utah'
                ,'Virginia', 'Washington', 'Washington DC', 'West Virginia', 'Wisconsin', 'Wyoming'];
var territoryData = [
  { name: 'Nancy B. Rodriguez', phone: '954-218-5090', email: 'nbrodriguez@whopper.com', additional: '(Orlando, Daytona, Ft. Myers, Naples)', territory: ['South Florida'] },
  { name: 'Arun Malvea', phone: '770-842-3828', email: 'amalvea@whopper.com', additional: '', territory: ['Alabama', 'Arkansas', 'Georgia', 'Mississippi', 'Northern Florida', 'Tennessee'] },
  { name: 'Gary Nauman', phone: '513-322-3398', email: 'gnauman@whopper.com', additional: '(Charlotte)', territory: ['North Carolina'] },
  { name: 'Gary Nauman', phone: '513-322-3398', email: 'gnauman@whopper.com', additional: '(Cincinnati)', territory: ['Ohio'] },
  { name: 'Gary Nauman', phone: '513-322-3398', email: 'gnauman@whopper.com', additional: '', territory: ['Kentucky', 'Michigan', 'South Carolina'] },
  { name: 'Gary Ford', phone: '917-501-4643', email: 'gford@whopper.com', additional: '', territory: ['Connecticut', 'Maine', 'Massachusetts', 'New Hampshire', 'New York', 'Rhode Island'] },
  { name: 'Rosi Delia', phone: '908-832-0237', email: 'rdelia@whopper.com', additional: '(Mannhattan)', territory: ['New York'] },
  { name: 'Rosi Delia', phone: '908-832-0237', email: 'rdelia@whopper.com', additional: '', territory: ['Maryland', 'Pennsylvania', 'Washington DC'] },
  { name: 'Mary Quinn', phone: '815-577-8852', email: 'mquinn@whopper.com', additional: '(Chicago, Peoria, Rockford)', territory: ['Illinois'] },
  { name: 'Mary Quinn', phone: '815-577-8852', email: 'mquinn@whopper.com', additional: '(Wasau, Rhinelander)', territory: ['Wisconsin'] },
  { name: 'Mary Quinn', phone: '815-577-8852', email: 'mquinn@whopper.com', additional: '', territory: ['Indiana'] },
  { name: 'Tony Scardino', phone: '817-468-8376', email: 'ascardino@whopper.com', additional: '', territory: ['Louisiana', 'Texas'] },
  { name: 'Jackie Graham', phone: '614-476-4637', email: 'jgraham@whopper.com', additional: '(Cleveland, Columbus)', territory: ['Ohio'] },
  { name: 'Jackie Graham', phone: '614-476-4637', email: 'jgraham@whopper.com', additional: '(Pittsburg, Johnston, Altoona)', territory: ['Pennsylvania'] },
  { name: 'Jackie Graham', phone: '614-476-4637', email: 'jgraham@whopper.com', additional: '', territory: ['North Carolina', 'Virginia', 'West Virginia'] },
  { name: 'Ed O\'Rourke', phone: '815-254-7534', email: 'eorourke@whopper.com', additional: '(Springfield)', territory: ['Illinois'] },
  { name: 'Ed O\'Rourke', phone: '815-254-7534', email: 'eorourke@whopper.com', additional: '', territory: ['Iowa', 'Kansas', 'Minnesota', 'Missouri', 'Nebraska', 'Oklahoma', 'South Dakota', 'Wisconsin'] },
  { name: 'Jamal Farha', phone: '801-712-6716', email: 'jfarha@whopper.com', additional: '(Northern)', territory: ['California'] },
  { name: 'Jamal Farha', phone: '801-712-6716', email: 'jfarha@whopper.com', additional: '', territory: ['Alaska', 'Hawaii', 'Idaho', 'Montana', 'Nevada', 'Oregon', 'Utah', 'Washington'] },
  { name: 'Sam Afandi', phone: '661-260-3443', email: 'safandi@whopper.com', additional: '(Southern)', territory: ['California'] },
  { name: 'Sam Afandi', phone: '661-260-3443', email: 'safandi@whopper.com', additional: '(Houston)', territory: ['Texas'] },
  { name: 'Sam Afandi', phone: '661-260-3443', email: 'safandi@whopper.com', additional: '', territory: ['Arizona', 'Colorado', 'New Mexico', 'Wyoming'] },
  { name: 'Mike Williams', phone: '416-626-7450', email: 'mwilliams@whopper.com', additional: '', territory: ['Canada'] },
  { name: 'Jackie McGregor', phone: '416-670-0056', email: 'jmcgregor@whopper.com', additional: '', territory: ['Canada'] }
];


function getTerritoryDropdown() {
  for (var i = 0; i < territory.length; i++) {
    $("#ddlterritory").append("<option id=" + i + ">" + territory[i] + "</option>");
  }

  //set Alabama to as default
  $("#realestate_contact").append('<div class="data"><b>' + territoryData[1].name + '</b>&nbsp;&nbsp;' + territoryData[1].additional + '</div><div class="dataTop">' + territoryData[1].phone + '</div><div class="data"><a href="mailto:' + territoryData[1].email + '">' + territoryData[1].email + '</a></div>');
  
  $("#ddlterritory").change(function () {
    var territoryValue = $("#ddlterritory").val();
    var count = 0;
    $("#realestate_contact").html("");
    for (var j = 0; j < territoryData.length; j++) {
      if ($.inArray(territoryValue, territoryData[j].territory) > -1) {
        count++;
        if (count > 1) {
          $("#realestate_contact").append('<div class="dataTop">&nbsp;</div>');
          $(".modal_overlay").css("height", "350px");
        } else {
          $(".modal_overlay").css("height", "260px");
        }
        $("#realestate_contact").append('<div class="data"><b>' + territoryData[j].name + '</b>&nbsp;&nbsp;' + territoryData[j].additional + '</div><div class="dataTop">' + territoryData[j].phone + '</div><div class="data"><a href="mailto:' + territoryData[j].email + '">' + territoryData[j].email + '</a></div>');
      }
    }
  });

}

/*
var globalSuggestionItems = [];
var globalSuggestionIngredients = [];

function updateItemNutritionTotals(currentItem) {
    var totals = currentItem.getNutritionTotals();
    if (!cookie650CaloriesOrLess() || (currentItem.isValueMeal || (currentItem.LowerCalorieItemSuggestions == "" && currentItem.LowerCalorieIngredientSuggestions == ""))) {
	    $('.current-item-nutrition').css("width", "460px");
            $('#Content #menu_selection #edit_menu .current-item-nutrition').html('<table cellspacing="0" cellpadding="0" border="0">' +
	    		'<tr><td class="nutritionValue column1">' + totals.Calories + '</td><td class="nutritionItem"> ' + CONTENT.ITEM_CAL + '</td><td class="nutritionValue column2">' + totals['Saturated Fat'] + CONTENT.ITEM_G + '</td><td class="nutritionItem"> ' + CONTENT.ITEM_SAT_FAT + '</td><td class="nutritionValue column3">' + totals.Cholesterol + CONTENT.ITEM_MG + '</td><td class="nutritionItem"> ' + CONTENT.ITEM_COL + '</td><td class="nutritionValue column4">' + totals.Sugar + CONTENT.ITEM_G + '</td><td class="nutritionItem"> ' + CONTENT.ITEM_SUGAR + '</td><td class="nutritionValue column5">' + totals.Carbohydrates + CONTENT.ITEM_G + '</td><td class="nutritionItem"> ' + CONTENT.ITEM_CARB + '</td></tr>' +
	    		'<tr><td class="nutritionValue">' + totals.Fat + CONTENT.ITEM_G + '</td><td class="nutritionItem"> ' + CONTENT.ITEM_FAT + '</td><td class="nutritionValue">' + totals['Trans Fat'] + CONTENT.ITEM_G + '</td><td class="nutritionItem"> ' + CONTENT.ITEM_TRANS_FAT + '</td><td class="nutritionValue">' + totals.Protein + CONTENT.ITEM_G + '</td><td class="nutritionItem"> ' + CONTENT.ITEM_PRO + '</td><td class="nutritionValue">' + totals.Sodium + CONTENT.ITEM_MG + '</td><td class="nutritionItem"> ' + CONTENT.ITEM_SOD + '</td><td></td><td></td></tr></table>');
    } else {
	// $('#nutrition-allergens-container').css("backgroundImage","none");
	    $('.current-item-nutrition').css("width", "331px");
	    $('#Content #menu_selection #edit_menu .current-item-nutrition')
        .html('<table cellspacing="0" cellpadding="0" border="0">' +
                '<tr>' +
                    '<td class="nutritionValue column1">' + totals.Calories + '</td>' +
                    '<td class="nutritionItem"> ' + CONTENT.ITEM_CAL + '</td>' + //calories
                    '<td class="nutritionValue column2">' + totals.Fat + CONTENT.ITEM_G + '</td>' +
                    '<td class="nutritionItem"> ' + CONTENT.ITEM_FAT + '</td>' + //total fat
                    '<td class="nutritionValue column3">' + totals['Saturated Fat'] + CONTENT.ITEM_G + '</td>' +
                    '<td class="nutritionItem"> ' + CONTENT.ITEM_SAT_FAT + '</td>' + //sat fat
                    '<td class="nutritionValue column6" rowspan="3"><a class="view-suggestions" href="#"></a></td>' +
                '</tr>' +
		        '<tr>' +
                    '<td class="nutritionValue">' + totals['Trans Fat'] + CONTENT.ITEM_G + '</td>' +
                    '<td class="nutritionItem"> ' + CONTENT.ITEM_TRANS_FAT + '</td>' + //trans fat
                    '<td class="nutritionValue">' + totals.Cholesterol + CONTENT.ITEM_MG + '</td>' +
                    '<td class="nutritionItem"> ' + CONTENT.ITEM_COL + '</td>' + //colesterol
                    '<td class="nutritionValue">' + totals.Sodium + CONTENT.ITEM_MG + '</td>' +
                    '<td class="nutritionItem"> ' + CONTENT.ITEM_SOD + '</td>' + //sodium
                '</tr>' +
                '<tr>' +
                    '<td class="nutritionValue">' + totals.Carbohydrates + CONTENT.ITEM_G + '</td>' +
                    '<td class="nutritionItem"> ' + CONTENT.ITEM_CARB + '</td>' + //carbs
                    '<td class="nutritionValue">' + totals.Sugar + CONTENT.ITEM_G + '</td>' +
                    '<td class="nutritionItem"> ' + CONTENT.ITEM_SUGAR + '</td>' + //sugar
                    '<td class="nutritionValue">' + totals.Protein + CONTENT.ITEM_G + '</td>' +
                    '<td class="nutritionItem"> ' + CONTENT.ITEM_PRO + '</td>' + //protein
                '</tr>' +
            '</table>');
	    $('#Content #menu_selection #edit_menu .current-item-nutrition a.view-suggestions').click(function () {
	        track_lower_calorie_suggestion("lower_calorie_suggest", "lower_calorie_suggest-" + currentItem.displayTitle);
	        //adjust top of nutritional info box (iouri)
	        if (parseInt($('#nutrition-allergens-container').css('top')) == 560) {
	            $('#nutrition-allergens-container').css('top', 575 + "px");
	        }
	        $('#info-headline').css("visibility", "hidden");
	        $(this).hide();
	        $('#LowerCalorieSuggestions').show();
	        $('#nutrition-allergens-container').css({ 'padding-bottom': '10px' });
	        $('#nutrition-allergens-container').css("background", "none");
	        $('#nutrition-allergens-container').css("z-index", "999");
	        $('#nutrition-allergens-container').css("width", "331px");
	        var suggestionItems;
	        //Fill ingredients Suggestion Table
	        if (currentItem.LowerCalorieIngredientSuggestions != "") {
	            var suggestionIngredientCount = 0;
	            suggestionItems = currentItem.LowerCalorieIngredientSuggestions.split(",");
	            for (var i = 0; i < suggestionItems.length; i++) {
	                for (var ing in currentItem.ingredients) {
	                    var currentIng = currentItem.ingredients[ing];
	                    if (parseInt(suggestionItems[i]) == parseInt(currentIng.id)) {
	                        globalSuggestionIngredients[currentIng.id] = [];
	                        globalSuggestionIngredients[currentIng.id]['title'] = currentIng.displayTitle;
	                        if (currentIng.currentQuantity > 0) {
	                            suggestionIngredientCount++;
	                            var charCount = 16;
	                            var itemTitle = "";
	                            //shorten title based on char count
	                            if (currentIng.displayTitle.length < charCount) {
	                                itemTitle = currentIng.displayTitle;
	                            } else {
	                                itemTitle = $.trim(currentIng.displayTitle.substring(0, charCount)) + "...";
	                            }
	                            $("#LowerCalorieSuggestions #suggestion-ing-table").append("<tr class='lcs-items'><td>" + itemTitle + "</td><td class='totals'>-" + Math.round(currentIng.nutritionItems['Calories'].amount).toString() + "</td><td class='totals'>-" + Math.round(currentIng.nutritionItems['Fat'].amount).toString() + "</td><td class='totals'>-" + Math.round(currentIng.nutritionItems['Sodium'].amount).toString() + "mg</td><td><input id='cal-option-check' type='checkbox'  name='lowerCalorieIng' value='Ing_" + currentIng.id.toString() + "' /></td></tr>");
	                            $("#LowerCalorieSuggestions table#suggestion-ing-table").find("tr:first").css("background-image", "none");
	                            $("#LowerCalorieSuggestions #suggestion-ing-table tr.lcs-items:odd")
                                .css({ "background": " url(/images/menu-nutrition/bkg.odd-row.jpg)", "height": "27px" });
	                            $("#LowerCalorieSuggestions #suggestion-ing-table tr.lcs-items:even")
                                .css({ "background": "url(/images/menu-nutrition/bkg.even-row.jpg)", "height": "25px" });
	                            $('input[type="checkbox"]').ezMark({ checkboxCls: 'ez-checkbox', checkedCls: 'ez-checked' });

	                        }
	                    }
	                }
	            }
	            //if suggestion ingredient table is empty show this message
	            if (suggestionIngredientCount == 0) {
	                $("#LowerCalorieSuggestions #suggestion-ing-table").append("<tr class='lcs-items'><td colspan='5' style='text-align:center;'>no ingredients to remove for this item</td></tr>");
	            }
	            $('#suggestions-modify-item').attr("href", "#modifyitem");
	            $('#suggestions-modify-item').bind('click', function () {

	                showIngredientSuggestion();
	                return false;
	            });
	            showIngredientSuggestion();
	        } else {
	            //Show Item Suggestion table and hide ingredient table as default
	            //Disable Lower Calorie Ingredient Suggestions button
	            $('#suggestions-modify-item').unbind('click');
	            $('#suggestions-modify-item').removeAttr("href");
	        }
	        //Fill Item Suggestion Table
	        if (currentItem.LowerCalorieItemSuggestions != "") {
	            suggestionItems = currentItem.LowerCalorieItemSuggestions.split(",");
	            for (var i = 0; i < suggestionItems.length; i++) {
	                getLowerCalorieItem(suggestionItems[i], currentItem);
	            }
	            $('#suggestions-change-menu').attr("href", "#changemenu");
	            $('#suggestions-change-menu').bind('click', function () {

	                $(this).addClass("active").removeClass("inactive");
	                $('#suggestions-modify-item').addClass("inactive").removeClass("active");
	                $("#LowerCalorieSuggestions #suggestion-ing-table").hide();
	                $("#LowerCalorieSuggestions #suggestion-item-table").show();
	                return false;
	            });
	        } else {
	            //Disable Lower Calorie Item Suggestions button
	            $('#suggestions-change-menu').unbind('click');
	            $('#suggestions-change-menu').removeAttr("href");
	        }
	        return false;
	    });
	    $('#LowerCalorieSuggestions .done').click(function () {
	        var item_value = $("#LowerCalorieSuggestions input[name='lowerCalorieItem']:checked").val();
	        if (item_value != null && item_value != "") {
	            //Replace current item
	            var value_arr = item_value.split("_");
	            loadSuggestionItem(value_arr[1]);
	            track_lower_calorie_suggestion("lower_calorie_switch", "lower_calorie_switch-" + globalSuggestionItems[value_arr[1]]['title']);
	        } else {//Substract Ingredients
	            $('#LowerCalorieSuggestions input[type=checkbox]:checked').each(function () {
	                var value_arr = $(this).val().split("_");
	                BK.menuNutritionView.Html.hideBreakfast();
	                track_lower_calorie_suggestion("remove_ingredient", "remove_ingredient-" + globalSuggestionIngredients[value_arr[1]]['title']);
	                BK.menuNutritionController.onSubtractIngredient(value_arr[1]);
	            });
	        }
	        hideLowerCalorieWindow();
	        return false;
	    });
	    $('#LowerCalorieSuggestions .close').click(function () {
	        $('#info-headline').css("visibility", "visible");
	        hideLowerCalorieWindow();
	        return false;
	    });
	}
	$('#value-meal-headline').html(updateCaloriesBadge(totals.Calories) + currentItem.displayTitle);
}
//Show ingredient suggestion table and hide items table as default
function showIngredientSuggestion() {
    $('#suggestions-modify-item').addClass("active").removeClass("inactive");
    $('a#suggestions-change-menu').addClass("inactive").removeClass("active");
    $("#LowerCalorieSuggestions #suggestion-ing-table").show();
    $("#LowerCalorieSuggestions #suggestion-item-table").hide();
}
function loadSuggestionItem(ItemID) {
    var DetailsUrl = "/cms" + CulturePrefix + "cms_out/menu_nutrition/menu_items/" + ItemID + ".xml";
    BK.menuNutritionController.onMenuItemSelect(DetailsUrl, false);
}
function getLowerCalorieItem(ItemID, currentItem) {
    var DetailsUrl = "/cms" + CulturePrefix + "cms_out/menu_nutrition/menu_items/" + ItemID + ".xml";
    var itemLoaded = function (menuItem) {
        appendLowerCalorieItemRow(menuItem, currentItem);
    };
    BK.menuNutritionModel.loadItem(DetailsUrl, itemLoaded);
}
function appendLowerCalorieItemRow(menuItem, currentItem) {
    globalSuggestionItems[menuItem.id] = [];
    globalSuggestionItems[menuItem.id]['title'] = menuItem.displayTitle;
    var currentItemTotals = currentItem.getNutritionTotals();
    var totals = menuItem.getNutritionTotals();
    var diffCalories = parseInt(currentItemTotals.Calories) - parseInt(totals.Calories);
    var diffFat = parseInt(currentItemTotals.Fat) - parseInt(totals.Fat);
    var diffSodium = parseInt(currentItemTotals.Sodium) - parseInt(totals.Sodium);
    var diffCaloriesSt = "";
    var diffFatSt = "";
    var diffSodiumSt = "";
    var charCount = 16;
    var itemTitle = "";
    //shorten title based on char count
    if (menuItem.displayTitle.length < charCount) {
        itemTitle = menuItem.displayTitle;
    } else {
        itemTitle = $.trim(menuItem.displayTitle.substring(0, charCount)) + "...";
    }
    if (diffCalories < 0) {
        diffCaloriesSt = diffCalories.toString().replace("-", "+");
    } else {
        diffCaloriesSt = "-" + diffCalories.toString();
    }
    if (diffFat < 0) {
        diffFatSt = diffFat.toString().replace("-", "+");
    } else {
        diffFatSt = "-" + diffFat.toString();
    }
    if (diffSodium < 0) {
        diffSodiumSt = diffSodium.toString().replace("-", "+");
    } else {
        diffSodiumSt = "-" + diffSodium.toString();
    }
    var lowerCalorieItemRow = "<tr class='lcs-items'><td>" + itemTitle + "</td><td class='totals'>" + diffCaloriesSt + "</td><td class='totals'>" + diffFatSt + "</td><td class='totals'>" + diffSodiumSt + "mg</td><td><input id='change-item-check' type='radio' name='lowerCalorieItem' value='Item_" + menuItem.id.toString() + "' /></td></tr>";
    $("#LowerCalorieSuggestions #suggestion-item-table").append(lowerCalorieItemRow);
    $("#LowerCalorieSuggestions table#suggestion-item-table").find("tr:first").css("background-image", "none");
    $("#LowerCalorieSuggestions #suggestion-item-table tr.lcs-items:odd")
                                .css({ "background": " url(/images/menu-nutrition/bkg.odd-row.jpg)", "height": "27px" });
    $("#LowerCalorieSuggestions #suggestion-item-table tr.lcs-items:even")
                                .css({ "background": "url(/images/menu-nutrition/bkg.even-row.jpg)", "height": "25px" });
    $('input[type="radio"]').ezMark({ checkboxCls: 'ez-checkbox', checkedCls: 'ez-checked' });
}
function hideLowerCalorieWindow() {
    $('#nutrition-allergens-container').css({ 'background-color': 'transparent', 'padding-bottom': '0px' });
    $('#Content #menu_selection #edit_menu .current-item-nutrition a.view-suggestions').show();
    $('#LowerCalorieSuggestions table tr.lcs-items').each(function () {
        $(this).remove();
    });
    $('#LowerCalorieSuggestions').hide();
}
function cookie650CaloriesOrLess() {
    var CaloriesCookie = $.cookie("cookie650CaloriesOrLess");
    if (CaloriesCookie != null && CaloriesCookie.toLowerCase() == "on") {
        return true;
    } else {
        return false;
    }
}

function updateCaloriesBadge(calories) {
    if (cookie650CaloriesOrLess()) {
        var badge = "";
        if (calories < 100) {
            badge = "under100";
        } else if (calories < 200) {
            badge = "under200";
        } else if (calories < 300) {
            badge = "under300";
        } else if (calories < 400) {
            badge = "under400";
        } else if (calories < 500) {
            badge = "under500";
        }
        return "<span class='" + badge + "'></span>";
    } else {
        return "";
    }
}
*/

// Show nutrition in table style
function showItemNutritionOnly(currentItem) {

    $("#nutritabs-non-customize").show();


    $("#nutritabs-non-customize").empty();
    // add nutrition
    var totals = currentItem.getNutritionTotals();
    var index = 0;
    var itemsPerRow = 5;
    for (var key in totals) {

        
        var nutriKey = getKeyByValue(CONTENT.nutritionName, key);
        // Skip, if key are in nutritionNameNotShown
        if ($.inArray(nutriKey, CONTENT.nutritionNameNotShown) != -1)
            continue;

        //var newValue = BK.menuNutritionModel.roundValue(nutriKey, totals[key]);        

        var wrap = $("<div class='static-nutri-item'>");
        var name = $("<div class='static-nutri-name'>").html(key);
        var value = $("<div class='static-nutri-value'>").html(totals[key] + currentItem.findMeasure(key));

        if (index < itemsPerRow) {
            // first line
            wrap.addClass("nutri-firstline");
        }
        else {
            // second line
            wrap.addClass("nutri-secondline");
        }

        // last item of each line
        var positionInRow = index % itemsPerRow;
        if (positionInRow == itemsPerRow - 1) {
            wrap.css("border-right", "none");
        }

        wrap.append(name);
        wrap.append(value);

        // Apply badge
        if (nutriKey == "KEY_Calories") {

            var badge = $("<div class='nutri-badge'>");
            if (totals[key] < 100) {

                badge.addClass("under100");
                wrap.append(badge);
            }
            else if (totals[key] < 200) {

                badge.addClass("under200");
                wrap.append(badge);

            }
            else if (totals[key] < 300) {

                badge.addClass("under300");
                wrap.append(badge);
            }
            else if (totals[key] < 400) {

                badge.addClass("under400");
                wrap.append(badge);
            }
            else if (totals[key] < 500) {

                badge.addClass("under500");
                wrap.append(badge);
            }
            else if (totals[key] < 650) {

                badge.addClass("under650");
                wrap.append(badge);
            }

        }



        $("#nutritabs-non-customize").append(wrap);

        index++;

        //// ideal solution should be like below...
        // first line

        // set of middle lines

        // last line
    }

    $("#nutritabs-non-customize").append($("<div class='clear'>"));

    // add allergen
    var name = $(".allergens-data").html();
    //print("name", name);
    var allergenHTML = $("<div class='allergens'>").html("<strong>" + name + "</strong> " + currentItem.getAllAllergens());
    $("#nutritabs-non-customize").append(allergenHTML);
}

// Show nutrition in single column on the left
function updateItemNutritionTotals(currentItem) {

    $("#nutritabs-customizable").show();

    var totals = currentItem.getNutritionTotals();

    var outerDiv = $("#nutritabs-customizable .nutri-data");
    outerDiv.empty();

    var count = 0;
    for (var key in totals) {

        var nutriKey = getKeyByValue(CONTENT.nutritionName, key);
        // Skip, if key are in nutritionNameNotShown
        if ($.inArray(nutriKey, CONTENT.nutritionNameNotShown) != -1)
            continue;

        // var newValue = BK.menuNutritionModel.roundValue(nutriKey, totals[key]);

        var wrap = $("<div class='static-nutri-item'>");
        var name = $("<div class='static-nutri-name'>").html(key);
        var nameWidth = getTextDimension("arial", "12px", "bold",  name.html()).width;
        

        var measure = "";
        if (currentItem.sandwich)
            measure = currentItem.sandwich.findMeasure(key);
        else
            measure = currentItem.findMeasure(key);

        var value = $("<div class='static-nutri-value'>");
//        if ($.browser.msie && $.browser.version == "7.0") {
//            value = $("<div class='static-nutri-value-ie7'>");
//        }
        value.html(totals[key] + measure);

        var valueWidth = getTextDimension("'Trade Gothic W01 Bold'", "18px", "normal", value.html()).width;

        var dots = $("<div class='static-nutri-dots'>");
        var clipStr = "rect(0px, " + (180 - nameWidth - valueWidth) + "px, 1px, 0px)";
        dots.css("left", nameWidth);
        dots.css("clip", clipStr);

        wrap.append(name);
        wrap.append(value);
        wrap.append(dots);

        
        // Apply badge
        if (nutriKey == "KEY_Calories") {

            var badge = $("<div class='nutri-badge'>");
            if (totals[key] < 100) {
                
                badge.addClass("under100");
                wrap.append(badge);
            }
            else if (totals[key] < 200) {

                badge.addClass("under200");
                wrap.append(badge);

            }
            else if (totals[key] < 300) {

                badge.addClass("under300");
                wrap.append(badge);
            }
            else if (totals[key] < 400) {

                badge.addClass("under400");
                wrap.append(badge);
            }
            else if (totals[key] < 500) {

                badge.addClass("under500");
                wrap.append(badge);
            }
            else if (totals[key] < 650) {

                badge.addClass("under650");
                wrap.append(badge);
            }

        }
        

        outerDiv.append(wrap);
        count++;
    }
    outerDiv.append($("<div class='clear'>"));

    // add allergen
    var name = $(".allergens-data").html();
    //print("name", name);
    var allergenHTML = $("<div class='allergens'>").html("<strong>" + name + "</strong> " + currentItem.getAllAllergens());
    outerDiv.append(allergenHTML);

    // Add Full menu notice
    var divFullMenuNotice = $("<div class='full-menu-notice'>").html($("#full-menu-notice-text").html());
    outerDiv.append(divFullMenuNotice);

}

function setBgSpecial(count, name, value) {

    if (count == 0) {
        name.css("background-color", "#F2E9D9");
        value.css("background-color", "#F2E9D9");
    }

    if (count == 1) {
        name.css("background-color", "#F5ECDD");
        value.css("background-color", "#F5ECDD");
    }

}
function updateMealNutritionTotals(meal, menuItem)
{
    // Add totalNutrition
    var totals = meal.getMealNutritionTotals();

    var nutritionData = $("#mymeal-total-nutrition #total-nutrition-data");
    nutritionData.empty();
    //var length = Object.keys(totals).length;
    var length = ($.map(totals, function (value, index) { return index; })).length;
    var count = 0;

    for (var key in totals) {

        var nutriKey = getKeyByValue(CONTENT.nutritionName, key);
        // Skip, if key are in nutritionNameNotShown
        if ($.inArray(nutriKey, CONTENT.nutritionNameNotShown) != -1)
            continue;

        // Convert the localized key, to regular key using CONTENT.nutritionName[key]
        //var newValue = BK.menuNutritionModel.roundValue(nutriKey, totals[key]);

        var wrap = $("<div class='static-nutri-item'>");
        var name = $("<div class='static-nutri-name'>").html(key);
        var value = $("<div class='static-nutri-value'>").html(totals[key] + menuItem.findMeasure(key));

        wrap.append(name);
        wrap.append(value);

        // Apply badge
        if (nutriKey == "KEY_Calories") {

            var badge = $("<div class='nutri-badge'>");
            if (totals[key] < 100) {

                badge.addClass("under100");
                wrap.append(badge);
            }
            else if (totals[key] < 200) {

                badge.addClass("under200");
                wrap.append(badge);

            }
            else if (totals[key] < 300) {

                badge.addClass("under300");
                wrap.append(badge);
            }
            else if (totals[key] < 400) {

                badge.addClass("under400");
                wrap.append(badge);
            }
            else if (totals[key] < 500) {

                badge.addClass("under500");
                wrap.append(badge);
            }
            else if (totals[key] < 650) {

                badge.addClass("under650");
                wrap.append(badge);
            }

        }

        nutritionData.append(wrap);
        count++;
    }

    //  Set css
    nutritionData.children(":nth-child(odd)").addClass("nutri-left");
    nutritionData.children(":nth-child(even)").addClass("nutri-right");

    // Set css for last element, remove the border bottom
    var length = nutritionData.children().length;
    if (length % 2 == 0) // Even
    {
        nutritionData.children(":nth-child(" + length + ")").css("border-bottom", "none");
        nutritionData.children(":nth-child(" + (length - 1) + ")").css("border-bottom", "none");
    }
    else {// Odd
        nutritionData.children(":nth-child(" + length + ")").css("border-bottom", "none");
    }

    // add div clear
    nutritionData.append($("<div>").addClass("clear"));

    var allergensData = $("#mymeal-total-nutrition #total-allergens-data");
    allergensData.empty();
    var name = $(".allergens-data").html();

    var allergenHTML = $("<div class='allergens'>").html("<strong>" + name + "</strong> " + meal.getAllergenTotals());
    allergensData.append(allergenHTML);

}

function showMobileItemNutrition(currentItem) {

    // Called polymorph ... .menuItem or .valueMeal
    var totals = currentItem.getNutritionTotals();
    var item = currentItem.sandwich ? currentItem.sandwich : currentItem;

    for (var key in totals) {


        var nutriKey = getKeyByValue(CONTENT.nutritionName, key);
        // Skip, if key are in nutritionNameNotShown
        if ($.inArray(nutriKey, CONTENT.nutritionNameNotShown) != -1)
            continue;

        //var newValue = BK.menuNutritionModel.roundValue(nutriKey, totals[key]);

        var wrap = $("<div class='static-nutri-item'>");
        var name = $("<div class='static-nutri-name'>").html(key);
        var value = $("<div class='static-nutri-value'>").html(totals[key] + item.findMeasure(key));

        wrap.append(name);
        wrap.append(value);

//        if (nutriKey == "KEY_Calories" && totals[key] < 650) {

//            var badge = $("<div class='nutri-badge'>");
//            var bgPath = '/cms' + CulturePrefix + 'cms_out/digital_assets/graphics/pages/mobile-badge-under-650.png'
//            badge.css("background", "url('" + bgPath + "') no-repeat scroll  transparent center top");

//            wrap.append(badge);
//        }
        // Apply badge
        if (nutriKey == "KEY_Calories") {

            var badge = $("<div class='nutri-badge'>");
            if (totals[key] < 100) {

                badge.addClass("mobile-under100");
                wrap.append(badge);
            }
            else if (totals[key] < 200) {

                badge.addClass("mobile-under200");
                wrap.append(badge);

            }
            else if (totals[key] < 300) {

                badge.addClass("mobile-under300");
                wrap.append(badge);
            }
            else if (totals[key] < 400) {

                badge.addClass("mobile-under400");
                wrap.append(badge);
            }
            else if (totals[key] < 500) {

                badge.addClass("mobile-under500");
                wrap.append(badge);
            }
            else if (totals[key] < 650) {

                badge.addClass("mobile-under650");
                wrap.append(badge);
            }

        }
        $("#mobile-menu-nutrition").append(wrap);

    }


    // add allergen
    var name = $("#mobile-allergens-text").html();
    //print("name", name);
    var allergenHTML = $("<div class='allergens'>").html("<strong>" + name + "</strong> " + currentItem.getAllAllergens());
    $("#mobile-menu-allergens").append(allergenHTML);
}