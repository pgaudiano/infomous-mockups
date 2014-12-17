
var BK = BK || {};
var CONTENT = BK.local.MENU_NUTRITION;

var CONST_SINGLE_LINE = 1;
var CONST_DOUBLE_LINE = 2;
var numLinesMode = undefined;

var CONST_LANDING_STATE = 1;
var CONST_PRODUCT_STATE = 2;

var singleLineHArray = [15, 16, 17, 18, 19, 20];
var liHeight = 50;
var maxWidth = 950;
var userAgent = navigator.userAgent.toLowerCase();
var commonMenuItem = undefined;
var isFirstInitTabs = true;
var isFirstInitFancyBox = true;

var currentURL = "";
var currentMenuTitle = "";

var shownIngredientsCount = 0;
var shownIngredientsCountWhenMinimized = 8;


// T: My Meal Item
// F: Regular Menu Item
var isUpdateMyMeal = false;
var removeAJAX = true;

$.browser = {
    version: (userAgent.match(/.+(?:rv|it|ra|ie|me)[\/: ]([\d.]+)/) || [])[1],
    chrome: /chrome/.test(userAgent),
    safari: /webkit/.test(userAgent) && !/chrome/.test(userAgent),
    opera: /opera/.test(userAgent),
    msie: /msie/.test(userAgent) && !/opera/.test(userAgent),
    mozilla: /mozilla/.test(userAgent) && !/(compatible|webkit)/.test(userAgent)
};

/////////////////////// SPACIAL CASE: Make Auto Fire funciton

var loopAutoFireCategories = 0;
var autoFireCategories = "";
var readyFireCategories = false;

function autoFireCategoriesScript(){
    if (loopAutoFireCategories++ > 30)
        return;

    if (readyFireCategories) {
        eval(autoFireCategories);
    } else {
        window.setTimeout(autoFireCategoriesScript, 500);  
    }
}

////////////////////// PAGE INIT: Called immediately when all doms are created //////////////////////////////////////

var updateMealFunc = function () {

    if (isUpdateMyMeal) { // Update Your Meal ..Click
        // Still, item selected from my meal
        //isUpdateMyMeal = false;


        BK.menuNutritionView.Html.disableUpdateButton();
        // Do update item
        BK.menuNutritionController.onUpdateItem(currMealItemIndex);
    }
    else { // Add to My Meal ..Click
        addToMyMeal();
    }
};

$(document).ready(function () {

    BK.menuNutritionView.Html.triggerUpdate();

    BK.menuNutritionController.onMenuItemSelect($("#variation-2710").attr('rel'), false);
   //   setDataIDs();
   //  initCookie();
    // initFancyBox();

  //  initPageState();

  //  initStateByParams();


    //bind click event to unborn node (dynamically created)
    $('#value-meal-variations li a').live('click', function () {
        BK.menuNutritionController.onResizeValueMeal($(this).attr('id').split('-')[1], $(this).attr('rel'));
        var newSize = $(this).find('span').text();
        BK.menuNutritionController.onLogChangeValueMealSize(newSize);

        // has href text on anchor
        return false;
    });


    $('#variation-list li.each-variation a').live("click", function (event) {

        //        if (addButton.hasClass('update-meal')) {//upd size/quantity controls
        //            controller.onMenuItemSelect($(this).attr('rel'), true);
        //        } else {
        //            controller.onMenuItemSelect($(this).attr('rel'));
        //        }
        //        controller.onMenuItemSelect();

        // trigger update, for the variation item selected from my meal
        if (isUpdateMyMeal)
            BK.menuNutritionView.Html.triggerUpdate();

        BK.menuNutritionController.onMenuItemSelect($(this).attr('rel'), false);
        return false;
    });

    var viewHtml = BK.menuNutritionView.Html;
    $('.add-wrap').live('click', function () {
        //        viewHtml.hideBreakfast();
        BK.menuNutritionController.onAddIngredient(viewHtml.getIngredientId($(this)));
        return false;
    });

    $('.subtract-wrap').live('click', function () {
        //        viewHtml.hideBreakfast();
        BK.menuNutritionController.onSubtractIngredient(viewHtml.getIngredientId($(this)));
        return false;
    });

    //    $("#ingredient-options a").live("click", function () {
    //        viewHtml.switchIngredientsOption();
    //        return false;
    //    });

    $("#ingredient-reset a").live("click", function () {
        BK.menuNutritionController.onResetAllIngredients();

        // trigger update, for the variation item selected from my meal
        if (isUpdateMyMeal) {
            BK.menuNutritionView.Html.triggerUpdate();
            BK.menuNutritionView.Html.checkUpdateFlag();
        }


        return false;
    });

    /* Save your meal trigger */
    //    $('a[rel=savemealprompt]').live("click", function () {
    //        if (BK.menuNutritionView.Html.getIsUpdated()) {
    //            var $this = $(this);
    //            var $thisHref = $this.attr('href');
    //            //console.log($thisHref);
    //            saveYourMealPrompt($thisHref);
    //            return false;
    //        }
    //        else
    //            return true;

    //    });

    // bindSaveMealPromptNav();

    $("a#inline").click(function () {

        $("a#lnkMymealCaller").click();
        return false;
    });

    //menu-btns-wrapper
    $("#menu-btns-wrapper div:first-child").css("margin-right", "9px");
    
});


function initPageState() {
    if ($.cookie('menu_menuitemid') != "") {
        MenuItemID = $.cookie('menu_menuitemid');        
    } else {
        $.cookie('menu_menuitemid', MenuItemID, { expires: 1, path: '/' });
    }

    if ($.cookie('menu_valuemealid') != "") {
        ValueMealID = $.cookie('menu_valuemealid');        
    } else {
        $.cookie('menu_valuemealid', ValueMealID, { expires: 1, path: '/' });
    }

    if ($.cookie('menu_subcategoryid') != "") {
        SubCategoryID = $.cookie('menu_subcategoryid');        
    } else {
        $.cookie('menu_subcategoryid', SubCategoryID, { expires: 1, path: '/' });
    }

    if ($.cookie('menu_categoryid') != "") {
        CategoryID = $.cookie('menu_categoryid');        
    } else {
        $.cookie('menu_categoryid', CategoryID, { expires: 1, path: '/' });
    }
}

function initStateByParams() {
    // Most of the logic are already handled in SeoFriendlyURLHandler.cs...    
    
    // menu item state
    if (MenuItemID != "") {

        activateMenuProductState(false, MenuItemID);
    }
    // value meal state
    else if (ValueMealID != "") {

        activateMenuProductState(true, ValueMealID);

    }
    // sub-category state
    else if (SubCategoryID != "") {    
        showMenuLandingState();
        initLandingState(true);
    }
    // category state
    else if (CategoryID != "") {
        showMenuLandingState();
        initLandingState(false);

        window.setTimeout(autoFireCategoriesScript, 500);

    }
    else {
    // no ids are set 
        setSelectedCategoryByLocalTime();

        window.setTimeout(autoFireCategoriesScript, 500);
    }
}


function setSelectedCategoryByLocalTime()
{
    var currentPeriod = getCurrentTimePeriod();
    var hcIDs = BK.menuNutritionModel.HCCategoryID;
    
    var id = undefined;
    switch (currentPeriod) {
        case "BF":
            id = hcIDs.Breakfast[CulturePrefix];
            break;
        case "LD": 
            id = hcIDs.LunchAndDinner[CulturePrefix];
            break;
        case "DS":
            id = hcIDs.Dessert[CulturePrefix];
            break;
        default:
            id = hcIDs.Breakfast[CulturePrefix];
            break;

        
    }

    $("#hid_selected_category").attr("value", id);

    // Get load for it.
    showMenuLandingState();

    // Set Category name for h1#category-header only when no subcat_id and cat_id
    getCategoryName(id, function (cat_name) {
        $("#category-header").html(cat_name);

    });

    initLandingState(false);
}

function getCurrentTimePeriod() {
    var now = new Date();
    var time = to2digits(now.getHours()) + ":" + to2digits(now.getMinutes());
    if (time >= "05:00" && time < "10:30") {
        return "BF"; // Breakfast time
    } else if (time >= "10:30" && time < "19:00") {
        return "LD"; // Lunch/Dinner time
    } else {
        return "DS"; // Dessert time
    }
}

function to2digits(d) {
    if (d < 10) {
        return "0" + d;
    }
    return d;
}

function setDataIDs() {
    //    var data = BK.menuNutritionModel.dataIds;

    $("#hid_selected_category").attr("value", CategoryID);
    $("#hid_selected_subcategory").attr("value", SubCategoryID);
    $("#hid_selected_menuitem").attr("value", MenuItemID);
    $("#hid_selected_valuemeal").attr("value", ValueMealID);

}


function initFancyBox() {
    // fix height for IE7
    if ($.browser.msie && $.browser.version == "7.0")
    {
        $("#menu-my-meal-fancybox, #tmp-menu-my-meal-fancybox").css("height", "635px");
    }    

    $("a#lnkMymealCaller, a#lnkMymeal").fancybox({
        'centerOnScroll': true,
        'onStart': function () {
            if (yourBKInfoBox)
                yourBKInfoBox.hide();

        },
        'onComplete': function () {

            $("#fancybox-content").css("border-width", "0px");
            var w = $("#fancybox-content").width();
            $("#fancybox-wrap").width(w);

            // Add round corner
            if (isFirstInitFancyBox) {
                //                isFirstInitFancyBox = false;
                $("#fancybox-outer").append($("<div class='round-top-left'>"));
                $("#fancybox-outer").append($("<div class='round-top-middle'>"));
                $("#fancybox-outer").append($("<div class='round-top-right'>"));
                $("#fancybox-outer").append($("<div class='round-bottom-left'>"));
                $("#fancybox-outer").append($("<div class='round-bottom-middle'>"));
                $("#fancybox-outer").append($("<div class='round-bottom-right'>"));
            }

        },
        'onCleanup': function () {

        }
        ,
        'onClosed': function () {
            $("#fancybox-outer .round-top-left").remove();
            $("#fancybox-outer .round-top-middle").remove();
            $("#fancybox-outer .round-top-right").remove();
            $("#fancybox-outer .round-bottom-left").remove();
            $("#fancybox-outer .round-bottom-middle").remove();
            $("#fancybox-outer .round-bottom-right").remove();
        }
    });

    //lnkSaveYourMealPrompt
    $("a#lnkSaveYourMealPrompt").fancybox({
        'centerOnScroll': true,
        'hideOnOverlayClick': false,
        'showCloseButton': false,
        'onComplete': function () {
            $("#fancybox-content").css("border-width", "0px");
            var w = $("#fancybox-content").width();
            $("#fancybox-wrap").width(w);

            $("#fancybox-outer").append($("<div class='round-top-left'>"));
            $("#fancybox-outer").append($("<div class='round-top-middle' style='width: 530px'>"));
            $("#fancybox-outer").append($("<div class='round-top-right'>"));
            $("#fancybox-outer").append($("<div class='round-bottom-left'>"));
            $("#fancybox-outer").append($("<div class='round-bottom-middle' style='width: 530px'>"));
            $("#fancybox-outer").append($("<div class='round-bottom-right'>"));

        },
        'onCleanup': function () {

        },
        'onClosed': function () {
            $("#fancybox-outer .round-top-left").remove();
            $("#fancybox-outer .round-top-middle").remove();
            $("#fancybox-outer .round-top-right").remove();
            $("#fancybox-outer .round-bottom-left").remove();
            $("#fancybox-outer .round-bottom-middle").remove();
            $("#fancybox-outer .round-bottom-right").remove();
        }

    });

    if ($.browser.msie)
        $("#menu-save-your-meal-prompt .add").parent().css("margin-right", "5px");
}


function getCategoryName(cat_id, fn) {

    $.ajax({
        url: '/cms' + CulturePrefix + 'cms_out/menu_nutrition/categories/all.xml',
        datatype: 'xml',
        type: 'get',
        success: function (data) {
            var pre_data = $(data).find('MenuCategory').filter("[ID = " + cat_id + "]");
            var result = $(pre_data).children('DisplayTitle').text();
            //alert(result);
            fn(result);
        }
    });


}

function getCategoryData_sync(cat_id) {

    var result = "";
    $.ajax({
        url: '/cms' + CulturePrefix + 'cms_out/menu_nutrition/categories/all.xml',
        datatype: 'xml',
        type: 'get',
        async: false,
        success: function (data) {
            var pre_data = $(data).find('MenuCategory').filter("[ID = " + cat_id + "]");
            var title = $(pre_data).children('DisplayTitle').text();

            result = title;
            //alert(result);

        }
    });



    return result;

}

function setSelectedLi(subcat_id, cat_id) {
    //// Remove selected style from others

    //alert(subcat_id);

    var selectedLi = $(".sub-categories .selected");
    if (selectedLi != undefined) {
        var id = selectedLi.attr("id");
        var left = $("#" + id + " .left").removeClass("subcat-selected-left");
        var middle = $("#" + id + " .middle").removeClass("subcat-selected-middle");
        var right = $("#" + id + " .right").removeClass("subcat-selected-right");
        $("#" + id + " .arrow").removeClass("subcat-arrow2");
        $("#" + id + " .text").removeClass("selected-text");
        // SUBHC
        if (cat_id == 202) {

            if ($.browser.msie && $.browser.version == "7.0")
                left.removeClass("left-202-ie7");
            else
                left.removeClass("left-202");

            middle.width(middle.width() - 12);
            right.removeClass("right-202");
        }
        else if (cat_id == 264) {

            if ($.browser.msie && $.browser.version == "7.0")
                left.removeClass("left-202-ie7");
            else
                left.removeClass("left-202");

            middle.width(middle.width() - 12);
            right.removeClass("right-202");
        }

        var sepNext = selectedLi.next();
        var sepPrev = selectedLi.prev();
        //print();
        if (sepNext != undefined) {
            sepNext.removeAttr("style");
        }
        if (sepPrev != undefined) {
            sepPrev.removeAttr("style");
        }

        selectedLi.removeClass("selected");
    }

    //// Set selected style to current one
    var currentLi = $("#li-subcat-" + subcat_id);

    currentLi.addClass("selected");

    var width = $("#li-subcat-" + subcat_id).width();
    var left  = $("#li-subcat-" + subcat_id + " .left").addClass("subcat-selected-left");
    var middle = $("#li-subcat-" + subcat_id + " .middle").addClass("subcat-selected-middle");
    var right = $("#li-subcat-" + subcat_id + " .right").addClass("subcat-selected-right");
    $("#li-subcat-" + subcat_id + " .arrow").addClass("subcat-arrow2");

    $("#li-subcat-" + subcat_id + " .text").addClass("selected-text");
    // widthOther = middleWidth + 7(L) + 7(R)
    var middleWidth = width - 14;
    $("#li-subcat-" + subcat_id + " .middle").width(middleWidth);
    ///$("#li-subcat-" + subcat_id + " .text").width(middleWidth + 7);
    var arrowPos = (width / 2) - ($("#li-subcat-" + subcat_id + " .arrow").width() / 2)
    // SUBHC
    if (cat_id == 202) {

        if ($.browser.msie && $.browser.version == "7.0")
            left.addClass("left-202-ie7");
        else
            left.addClass("left-202");

        middle.width(middle.width() + 8);
        right.addClass("right-202");


    }
    else if (cat_id == 264) {

        if ($.browser.msie && $.browser.version == "7.0")
            left.addClass("left-202-ie7");
        else
            left.addClass("left-202");

        middle.width(middle.width() + 8);
        right.addClass("right-202");

    }

    $("#li-subcat-" + subcat_id + " .arrow").css("left", arrowPos);

    // remove seperator class, add background:none;
    
    var sepNext = currentLi.next();
    var sepPrev = currentLi.prev();
    //print();
    if (sepNext != undefined) {
        sepNext.css("background", "none");
    }
    if (sepPrev != undefined) {
        sepPrev.css("background", "none");
    }
}

// Set the numLinesMode, 
// whether to show in 1 line or 2 line of subcategory name
function setNumLinesMode(arr, cat_id) {

    // SUBHC
    var w = 0;
    if (cat_id == 201) {
        w = 7
    } else if (cat_id == 202) {
        w = 6
    } else if (cat_id == 203) {
        // set to 7 for temp. (works.. ) 
        w = 7
    } else if (cat_id == 263) {
        w = 7
    } else if (cat_id == 264) {
        w = 6
    } else if (cat_id == 265) {
        // set to 7 for temp. (works.. ) 
        w = 7
    }

    var sumWidth = 0;
    arr.each(function (index, value) {
        var DisplayTitle = $(this).attr('Title');
        var ret = getTextDimension("'TradeGothicW01-BoldCn20 675334'", "16px", "normal",  DisplayTitle);

        // w : left:  w px

        // 3 : width of seperator
        var subcatWidth = ret.width + w + w + 3;
        sumWidth = sumWidth + subcatWidth;
    });

    if (sumWidth > maxWidth) {
        numLinesMode = CONST_DOUBLE_LINE;
    }

    else {
        numLinesMode = CONST_SINGLE_LINE;
    }

        
}



function setCustomVerticalAlign(divText, divTextHeight) {

    // set only if numLinesMode is singleLine
    var doAlign = false;
    // see margin-top of subcat-selected-middle css class
    var marginTopBg = -8;

    switch (numLinesMode) {

        case CONST_SINGLE_LINE:
        {
            doAlign = true;
        }
            break;
        case CONST_DOUBLE_LINE:
        {
            // Do when text is short enough, or no space in it
            if ($.inArray(divTextHeight, singleLineHArray) != -1) {
                doAlign = true;
            }
        }
            break;
    }

    if (doAlign) {
        // due to all bg image are set margin-top: -8px. This required text to be adjusted as well
        var top = ((liHeight - divTextHeight) / 2) + marginTopBg;
        divText.css("top", top);
    }
}

function getProperCookieSuffix() {
    var result = CulturePrefix;
    result = result.substring(1, result.length - 1);
    result = result.replace("/", "_");

    return result;
}

function initCookie() {
    //COOKIES
    var linkArray = [];
    var quantityArray = [];
    var idsArray = [];

    //print("initCookie", "itemlink: " + $.cookie('itemlink'));
    if ($.cookie('itemlink_' + getProperCookieSuffix()) != null) {

        if ($.cookie('itemlink_' + getProperCookieSuffix()) != '') {
            linkArray = $.cookie('itemlink_' + getProperCookieSuffix()).split(',');
        }

        if ($.cookie('itemquantities_' + getProperCookieSuffix()) != '') {
            quantityArray = $.cookie('itemquantities_' + getProperCookieSuffix()).split(',');
            totalNumberOfItems = quantityArray.length;
        }

        if ($.cookie('itemids_' + getProperCookieSuffix()) != '') {
            idsArray = $.cookie('itemids_' + getProperCookieSuffix()).split(',');
        }

    }

    BK.menuNutritionController.onInit(linkArray, idsArray, quantityArray);

//    print("test", "initCookie done");
}

function initLandingState(clickSubcat) {

    // Remove first .. for isUpdateLandingState = true cases
    var $mainMenu = $('#list_items ul.sub-categories');
    var menuList = $('#list_menus ul.menus');
    $mainMenu.empty();
    menuList.empty();

    var cat_id = "202";//  $("#hid_selected_category").attr("value");

    

    $.ajax({
        url: '/cms' + CulturePrefix + 'cms_out/menu_nutrition/categories/' + cat_id + '.xml',
        datatype: 'xml',
        type: 'get',
        success: function (data) {

            var arr = $(data).find('SubCategory');
            var len = arr.length;
            //            var $mainMenu = $('#list_items ul.sub-categories');
            //            $mainMenu.empty();
            // custom
            //arr = arr.slice(0, 8);

            setNumLinesMode(arr, cat_id);
            // custom
            // numLinesMode = CONST_SINGLE_LINE;

            arr.each(function (index, value) {


                var DisplayTitle = $(this).attr('Title');
                var subcat_id = $(this).attr('ID');

                var li = $("<li class='item'>");
                li.attr("id", "li-subcat-" + subcat_id);

                var anchor = $("<a>").attr("href", "javascript:;").click(function () { eval("loadMenusBySubCategoryID(" + subcat_id + "," + cat_id + ")"); });

                // Bug#1242: select the first SubCategory, if SubCategory is not set
                if (autoFireCategories == "") {
                    autoFireCategories = "loadMenusBySubCategoryID(" + subcat_id + "," + cat_id + ")";
                    readyFireCategories = true;
                }


                var sep = $("<li class='separator'>");

                var divOuter = $("<div style='position:relative'>");

                var txtClassName = "text text-" + cat_id;

                if ($.browser.msie && $.browser.version == "7.0")
                    txtClassName += " text-" + cat_id + "-ie7";

                var divText = $("<div class='" + txtClassName + "'>").html(DisplayTitle);

                var result = roundTextDimension("'TradeGothicW01-BoldCn20 675334'", "16px", "17.5px", divText, cat_id);

                li.css("width", result.width);
                // Fix text overlapped on seperator, IE7
                divText.css("width", result.rawWidth);

                setCustomVerticalAlign(divText, result.height);

                divOuter.append($("<div class='left'>"));
                divOuter.append($("<div class='middle'>"));
                divOuter.append($("<div class='right'>"));
                divOuter.append($("<div class='clear'>"));
                divOuter.append($("<div class='arrow'>"));
                divOuter.append(divText);
                anchor.append(divOuter);
                li.append(anchor);

                $mainMenu.append(li);
                if (index < arr.length - 1)
                    $mainMenu.append(sep);

            });

            if (clickSubcat) {
                // click the subcat link
                //                var subcat_id = SubCategoryID == "" ? $("#hid_selected_subcategory").attr("value") : SubCategoryID;
                var subcat_id = $("#hid_selected_subcategory").attr("value");
                $("#list_items ul.sub-categories #li-subcat-" + subcat_id + " a").click();
            }


        }
    });

    // Adjust it again, in case if the font is not loaded in first time.
    // This is not called in IE7
    $(window).load(function () {

        var $mainMenu = $('#list_items ul.sub-categories');

        $(".item", $mainMenu).each(function () {
            var divText = $('.text', this);

            var result = roundTextDimension("'TradeGothicW01-BoldCn20 675334'", "16px", "17.5px", divText, cat_id);
            $(this).css("width", result.width);
            setCustomVerticalAlign(divText, result.height);
        });

        setSelectedLi($.cookie('menu_subcategoryid'), cat_id);
    });

}


function setCurrentValueMealItem(value_meal_id) {
    $("#hid_selected_valuemeal").attr("value", value_meal_id);

}


function setCurrentMenuItem(menu_item_id) {
    $("#hid_selected_menuitem").attr("value", menu_item_id);

}

function setCurrentSubCategory(subcat_id, title) {

    var currentSubcatID = $("#hid_selected_subcategory").attr("value");
//    if (currentSubcatID != subcat_id.toString())
//        isSubcategoryChanged = true;



    $("#hid_selected_subcategory").attr("value", subcat_id);
    $("#hid_selected_subcategory_title").attr("value", title);
}

function loadMenusBySubCategoryID(subcat_id, cat_id) {

    $.cookie('menu_subcategoryid', subcat_id, { expires: 1, path: '/' });
    $.cookie('menu_categoryid', cat_id, { expires: 1, path: '/' });

    setSelectedLi(subcat_id, cat_id);
    resetCarouselItemPosition(subcat_id);
    $.ajax({
        url: '/cms' + CulturePrefix + 'cms_out/menu_nutrition/categories/' + cat_id + '.xml',
        datatype: 'xml',
        type: 'get',
        success: function (data) {
            var pre_data = $(data).find('SubCategory').filter("[ID = " + subcat_id + "]");
            var title = pre_data.attr('Title');
            var metaTitle = pre_data.children('MetaDataTitle').text();

            setCurrentSubCategory(subcat_id, title);
            // convert string to boolean
            var isValueMeal = (pre_data.attr("IsValueMeal") == "true");
            var arr = undefined;
            if (isValueMeal)
                arr = $(pre_data).find('ValueMeal');
            else
                arr = $(pre_data).find('MenuItem');

            var len = arr.length;
            var $mainMenu = $('#list_menus ul.menus');
            var index_out = 0;
            var count = 0;
            $mainMenu.empty();

            arr.each(function (index, value) {

                var ItemId = $(this).attr('ID');
                var DisplayTitle = $(this).children('DisplayTitle').text();
                var thumbnailImg = $(this).children('ImagePathThumbnail').text();
                var isHidden = ($(this).attr("IsHidden") == "true");
                var newMarkerPath = $(this).children('NewMarkerImagePath').text();
                var isActive = $(this).attr("IsActive");

                // Has value and equal to 'false'
                if (isActive && isActive == "false")
                    return true;
                // continue;
                if (isHidden)
                    return true;

                var li = $("<li class='cat-menu-item'>");

                // SUBHC
                // if (!thumbnailImg)
                //     thumbnailImg = "/cms/en/us/cms_out/digital_assets/graphics/menu_nutrition/temp-menu-thumbnail.png";
                var img = $("<img>").attr("src", thumbnailImg);

                var anchor = $("<a>").attr("href", "#").click(function () {
                    eval("activateMenuProductState(" + isValueMeal + "," + ItemId + ")");

                    // console.log(ItemId);

                    if (isValueMeal) {
                        $.cookie('menu_valuemealid', ItemId, { expires: 1, path: '/' });
                        $.cookie('menu_menuitemid', null);
                    } else {
                        $.cookie('menu_menuitemid', ItemId, { expires: 1, path: '/' });
                        $.cookie('menu_valuemealid', null);
                    }

                });

                var newMarker = "";
                if (newMarkerPath)
                    newMarker = "<img class='new-marker' src='" + newMarkerPath + "' />"
                var div = $("<div class='menu-item-text'>").html(newMarker + DisplayTitle);

                if (removeAJAX) {
                    // Set link for each menu item
                    anchor.unbind('click');
                    var item_id = isValueMeal ? "v" + ItemId : "m" + ItemId;
                    var subcat_title = $("#hid_selected_subcategory_title").attr("value");
                    var cat_title = $("#menu-landing-state h1#category-header").html();
                    var menu = {
                        cat_id: cat_id,
                        cat_title: cat_title,
                        subcat_id: subcat_id,
                        subcat_title: subcat_title,
                        item_title: DisplayTitle,
                        item_id: item_id
                    };
                    var url = getMenuSEOUrl(menu);
                    anchor.attr("href", url);

                }



                // Find the 6th item of each row, set margin-right: 0px. Otherwise <li> exceeds the width of its parent div
                if ((count + 1) % 6 == 0)
                    $(li).css("margin-right", "0px");

                img.appendTo(anchor);
                div.appendTo(anchor);
                anchor.appendTo(li);
                $mainMenu.append(li);

                index_out = count;
                count++;
            });



            // Add 'Download Full Menu (pdf)'
            if (len > 0) {

                // Count itself
                index_out = index_out + 1;
                var li = $("<li class='cat-menu-item'>");
                var img = $("<img>").attr("src", "/cms" + CulturePrefix + "cms_out/digital_assets/graphics/menu_nutrition/download-full-menu.png").attr("style", "width: ; height: ;")
                var pdfSRC = $("ul#MainNavigation #niMenu ul#pdfdownload li.document a").attr("href");

                var anchor = $("<a>").attr("href", pdfSRC);
                anchor.attr("target", "_blank");

                var div = $("<div>")
                // Find the 6th item of each row, set margin-right: 0px. Otherwise <li> exceeds the width of its parent div
                if ((index_out + 1) % 6 == 0)
                    $(li).css("margin-right", "0px");

                img.appendTo(anchor);
                div.appendTo(anchor);
                anchor.appendTo(li);
                $mainMenu.append(li);

            }

            // Set title if changing Subcategory
            setCurrentTitleBySubCategory(metaTitle);

            setCurrentSubCatURL();
        },
        error: function (msg) {
            //alert("error: " + msg);
        }
    });
}

function setMyMealPostion() {
    //top: -40 for
    var product_state = $("#menu-product-state").is(":visible");
    var landing_state = $("#menu-landing-state").is(":visible");

    if (product_state) {
        $(".my-meal").css("top", "60px");
        if ($.browser.msie && $.browser.version == "7.0") {
            $(".my-meal").css("top", "-130px");
        }
    }

    if (landing_state) {
        $(".my-meal").css("top", "-130px");
    }

    if (!$(".my-meal").is(":visible"))
        $(".my-meal").show();
}


function activateMenuProductState(isValueMeal, menu_id) {    

    $("#menu-product-state").show();
    $("#menu-landing-state").hide();
    setMyMealPostion();

    var xmlPath = undefined;
    if (isValueMeal)
        xmlPath = '/cms' + CulturePrefix + 'cms_out/menu_nutrition/value_meals/' + menu_id + '.xml';
    else
        xmlPath = '/cms' + CulturePrefix + 'cms_out/menu_nutrition/menu_items/' + menu_id + '.xml';

    // reset
    isUpdateMyMeal = false;

    BK.menuNutritionController.onMenuItemSelect(xmlPath, false);

}

function showMenuLandingState() {

    $("#menu-landing-state").show();
    $("#menu-product-state").hide();
    setMyMealPostion();

    // Avoid invalid argument error, when click see all to back to landing page
    // Can delete this in 1.1, because it is full postback when click see all
    $("#menu-info-social #menu-social").empty();
}

function addToMyMeal() {
    var cat_id = $("#hid_selected_category").attr("value");
    var subcat_id = $("#hid_selected_subcategory").attr("value");
    BK.menuNutritionController.onAddItemToMeal(cat_id, subcat_id);
}

BK.menuNutritionView = {};

BK.menuNutritionView.Html = function () {
    // To trigger the showDialog
    var isUpdated = false;

    /////////////////HELPER FUNCTIONS
    var getData = function () {
        var myWidth = 0, myHeight = 0;
        return 0;
    }

    return {

        addUpdateMealItem: function (meal) {
            isUpdated = false;
            this.updateMeal(meal);
        },
        getIsUpdated: function () {
            return isUpdated;
        },
        clearUpdated: function () {
            isUpdated = false;
        },
        triggerUpdate: function () {
            isUpdated = true;
        },
        showViewYourMealButton: function (meal) {

        },

        setUpdateItemState: function () {
            isUpdateMyMeal = true;


        },
        checkUpdateButton: function (isChangeable) {

            // If it is selected from my meal
            if (isUpdateMyMeal) {

                if (isChangeable)
                    this.checkUpdateFlag();
                else
                    this.disableUpdateButton();

                var text = $("#update-your-meal-text").html();
                $("#btn-add-to-meal").html(text);
            }
            else {
                // Make sure there's only one click binded
                $("#btn-add-to-meal").unbind("click");
                $("#btn-add-to-meal").click(updateMealFunc);

                var text = $("#add-to-meal-text").html();
                $("#btn-add-to-meal").html(text);
            }
        },
        disableUpdateButton: function () {
            // Set class disabled to btn
            var btn = $("#btn-add-to-meal");
            btn.parent().addClass("disabled");

            // remove the click event
            btn.unbind("click");

        },
        enableUpdateButton: function () {
            // Remove disabled class from btn
            var btn = $("#btn-add-to-meal");
            btn.parent().removeClass("disabled");

            // Rebind the click event if it doesn't exist
            btn.unbind("click");
            btn.click(updateMealFunc);

        },
        checkUpdateFlag: function () {
            if (isUpdated)
                this.enableUpdateButton();
            else
                this.disableUpdateButton();
        },
        displayMealLimitMessage: function (sandwich) {
            //var text = $("#sorry-cannotadd-text").html();
            //alert(text);

            if ($.browser.msie && $.browser.version == "7.0") {
                $("#dv-cannot-add-item").css('top', ($("#btn-add-to-meal").offset().top - 320) + 'px').toggle();
            }
            else {
                $("#dv-cannot-add-item").css('top', ($("#btn-add-to-meal").offset().top - 127) + 'px').toggle();
            }
        },

        getMealItemId: function (element) {
            return element.parent().parent().parent().parent().attr("id").substring(4);
        },

        updateMeal: function (meal, callback) {

            var linkArray = new Array();
            var quantityArray = new Array();
            var idArray = new Array();

            var data = meal.getItems();
            var mealCount = data.length;

            var tbody = $("#mymeal-grid #mymeal-table tbody");
            tbody.empty();

            var totalCal = 0;
            for (var i = 0; i < mealCount; i++) {
                var currentItem = data[i];


                var div = $("<div>");
                var anchorClose = $("<a>").attr("href", "javascript:;").click(function () {
                    var id = BK.menuNutritionView.Html.getMealItemId($(this));
                    BK.menuNutritionController.onRemoveItemFromMeal(id);
                });
                anchorClose.append($("<div>").addClass("delete-item"));

                var close = $("<div class='td-menu-remove'>").append(anchorClose);
                var anchorMenuName = $("<a>").css("font-weight", "bold").attr("href", "javascript:;").html(currentItem.displayTitle).click(function () {

                    var id = BK.menuNutritionView.Html.getMealItemId($(this));
                    currMealItemIndex = id;

                    var landing_state = $("#menu-landing-state").is(":visible");
                    if (landing_state) {

                        $("#menu-product-state").show();
                        $("#menu-landing-state").hide();
                        setMyMealPostion();
                    }

                    var hid_cat_id = $(this).find("#hid_ids").attr("value").split(';')
                    $("#hid_selected_category").attr("value", hid_cat_id[0]);

                    $("#hid_selected_subcategory").attr("value", hid_cat_id[1]);

                    BK.menuNutritionController.onMealItemSelect(id);
                    $.fancybox.close();

                });
                var hidden = $("<input type='hidden' id='hid_ids'>").attr("value", currentItem.categoryId + ";" + currentItem.subCategoryId)
                anchorMenuName.append(hidden);
                var menuName = $("<div class='td-menu-name'>").append(anchorMenuName);
                var clear = $("<div class='clear'>");

                div.append(close);
                div.append(menuName);
                div.append(clear);

                // nutrition 'calorie' comes in different words, up to localization
                var cal = currentItem.getNutritionTotals()[CONTENT.nutritionName["KEY_Calories"]];
                //var roundEachItem = BK.menuNutritionModel.roundValue("KEY_Calories", cal);
                totalCal += cal;

                var row = $("<tr>").attr("id", "item" + i)
                                .append($("<td style='border-left: none;' >").append(div))
                                .append($("<td style='border-right: none; vertical-align: top'>").html(cal));

                tbody.append(row);

                //// Save data in cookie
                var quantityString = '';
                var idString = '';
                var first = true;
                for (var ing in currentItem.ingredients) {
                    if (!first) {
                        quantityString += ';';
                        idString += ';';
                    }
                    else {
                        first = false;
                    }

                    quantityString += currentItem.ingredients[ing].currentQuantity;
                    idString += currentItem.ingredients[ing].id;
                }

                linkArray.push(currentItem.xmlUrl + ";" + currentItem.categoryId + ";" + currentItem.subCategoryId);
                quantityArray.push(quantityString);
                idArray.push(idString);

            } // end of for loop

            // Add total row
            var totalText = $("#total-text").html();

            var lastTDleft = $("<td style='font-weight:bold; text-align: right;color: #736357'>").css({
                "border-left": "none",
                "border-bottom": "none"
            }).append(totalText);

            // Round the sum of each item
            //totalCal = BK.menuNutritionModel.roundValue("KEY_Calories", totalCal);
            var lastTDright = $("<td style='font-weight:bold;'>").css({
                "border-right": "none",
                "border-bottom": "none"
            }).html(totalCal);

            var row = $("<tr>").append(lastTDleft).append(lastTDright);
            tbody.append(row);

            if (mealCount > 0) {
                $("#mymeal-total-nutrition").show();
                // local.js
                updateMealNutritionTotals(meal, data[0]);
            }
            else {
                $("#mymeal-total-nutrition").hide();
            }

            // Update number of items
            $(".my-meal a#inline #mymeal-numitems").html(mealCount);
            if ($.browser.msie && $.browser.version == "7.0") {
                $(".my-meal a#inline #mymeal-numitems").html(mealCount + " ");
            }



            //COOKIE, save cookie at domain 
            $.cookie('itemlink_' + getProperCookieSuffix(), linkArray, { path: '/' });
            $.cookie('itemquantities_' + getProperCookieSuffix(), quantityArray, { path: '/' });
            $.cookie('itemids_' + getProperCookieSuffix(), idArray, { path: '/' });

            // put in like this, to secure the cookie
            //            $.cookie('itemids', idArray, { path: '/', secure: true });


            if (callback)
                callback();

        },

        showNonCustomizableDiv: function (menuItem) {

            // local.js
            showItemNutritionOnly(menuItem);

            // Add full menu
            var divFullMenuNotice = $("<div class='full-menu-notice'>").html($("#full-menu-notice-text").html());
            $("#nutritabs-non-customize").append(divFullMenuNotice);

            // ie7 fixed
            if ($.browser.msie && $.browser.version == "7.0") {
                $("#menu-nutri-tabs .tabscontent").css("padding-top", "1px");
                $("#menu-nutri-tabs #nutritabs-non-customize").css("padding-top", "0px");
                $("#menu-nutri-tabs #nutritabs-non-customize").css("margin-top", "10px");

            }
        },
        updateIngredientIcon: function (ingredient, icon) {
            var quantity = ingredient.currentQuantity;

            icon.html(quantity);
            // Reset
            icon.siblings('div.add-wrap').removeClass("add-inactive");
            icon.siblings('div.add-wrap').removeClass("add-active");
            icon.siblings('div.add-wrap').removeClass("add-hover");
            icon.siblings('div.add-wrap').unbind('mouseenter mouseleave');
            icon.siblings('div.subtract-wrap').removeClass("subtract-inactive");
            icon.siblings('div.subtract-wrap').removeClass("subtract-active");
            icon.siblings('div.subtract-wrap').removeClass("subtract-hover");
            icon.siblings('div.subtract-wrap').unbind('mouseenter mouseleave');

            if (quantity == ingredient.maxQuantity) {
                icon.siblings('div.add-wrap').addClass("add-inactive");
            }
            else {
                icon.siblings('div.add-wrap').addClass("add-active");
                icon.siblings('div.add-wrap').hover(

                  function () { // mouse in
                      $(this).addClass("add-hover");
                  },

                  function () { // mouse out
                      $(this).removeClass("add-hover");
                  }
                );

            }

            if (quantity == ingredient.minQuantity) {
                icon.siblings('div.subtract-wrap').addClass("subtract-inactive");
            }
            else {
                icon.siblings('div.subtract-wrap').addClass("subtract-active");
                icon.siblings('div.subtract-wrap').hover(

                  function () { // mouse in
                      $(this).addClass("subtract-hover");
                  },

                  function () { // mouse out
                      $(this).removeClass("subtract-hover");
                  }
                );
            }
        },
        updateItemAllergens: function (ingredient) {
            //            for (var a in ingredient.allergens) {
            //                var currentAll = ingredient.allergens[a];
            //                var allergenID = currentAll.id;
            //                if (ingredient.currentQuantity > 0) {
            //                    if ($('#Allergen_' + allergenID).size() > 0) {
            //                        $('#Allergen_' + allergenID).attr('rel', parseInt($('#Allergen_' + allergenID).attr('rel'), 10) + 1);
            //                    } else {
            //                        $('<li id="Allergen_' + allergenID + '" rel="1">, ' + currentAll.displayTitle + '</li>').appendTo('ul.allergens');
            //                    }
            //                }
            //            }

            //            var firstAllergenLI = $('ul.allergens li:first').html();
            //            if (firstAllergenLI) {
            //                firstAllergenLI = firstAllergenLI.replace(/\,/, "");
            //                $('ul.allergens li:first').html(firstAllergenLI);
            //            }
        },
        updateAllIngredients: function (menuItem) {
            var currentItem = menuItem.sandwich ? menuItem.sandwich : menuItem;

            for (var i in currentItem.ingredients) {
                var ingredient = currentItem.ingredients[i];

                this.updateIngredientIcon(ingredient, $('#ingredient-id-' + ingredient.id));


            }

            updateItemNutritionTotals(menuItem);
        },
        updateIngredients: function (menuItem, ingredientId) {
            isUpdated = true;
            this.checkUpdateFlag();

            var currentItem = menuItem.sandwich ? menuItem.sandwich : menuItem;

            var addAllergen = true;
            var ingredient = currentItem.ingredients[ingredientId];
            this.updateIngredientIcon(ingredient, $('#ingredient-id-' + ingredientId));

            updateItemNutritionTotals(menuItem);

            //this.updateItemAllergens(ingredient);


        },
        showCustomizableDiv: function (menuItem) {

            var currentItem = menuItem.sandwich ? menuItem.sandwich : menuItem;

            var cat_id = $("#hid_selected_category").attr("value");
            var subcat_id = $("#hid_selected_subcategory").attr("value");

            // Add variation
            $("#variation-list").empty();
            for (var i in currentItem.variations) {
                var currentVar = currentItem.variations[i];
                $("#variation-list").append(this.createVariation(cat_id, subcat_id, currentItem.id, currentItem.defaultVariationMenuItemTitle, 'menu_items', currentVar.menuItemId, currentVar.abbreviation));

            }

            // Add Ingredients
            //            var numIngredients = currentItem.getAvailableIngredientsLength();
            //            var maxItemOnColLeft = Math.round(numIngredients / 2);
            var ingredientColLeft = $("#column-left");
            var ingredientColRight = $("#column-right");
            shownIngredientsCount = 0;
            ingredientColLeft.empty();
            ingredientColRight.empty();
            // SUBHC
            var ignoredList = ["Temporary fix"];
            var sorted = currentItem.getSortedIngredients();
            for (var i = 0; i < sorted.length; i++) {

                var currentIng = sorted[i];
                // SUBHC
                if ($.inArray(currentIng.displayTitle, ignoredList) != -1)
                    continue;

                // [Bug 1824] Remove "All Options" function on Menu Customization
                // Show only ingredients that is part of original one.
                if (currentIng.defaultQuantity == 0)
                    continue;

                var itemLi = $('<div class="each-ingredient" id="id' + currentIng.iconOrder + '"></div>');


                var btns = $('<div class="ingredient-btns">');
                var icon = $('<a class="icon" id="ingredient-id-' + currentIng.id + '"><span class="current-quantity"></span></a>');
                btns.append(icon);
                btns.append('<div class="subtract-wrap"><a class="subtractIngredient" href="#"></a></div>');
                btns.append('<div class="add-wrap"><a class="addIngredient" href="#"></div></a>');
                //                btns.append("<div class='clear'>");
                itemLi.append(btns);
                itemLi.append('<div class="ingredient-name">' + currentIng.displayTitle + '</div>');
                itemLi.append($("<div class='clear'>"));

                this.updateIngredientIcon(currentIng, icon);

                var ingredientId = currentIng.id;

                //assigning max min values...
                var minQty = parseInt(currentIng.minQuantity);
                var maxQty = parseInt(currentIng.maxQuantity);

                //  this.updateItemAllergens(currentIng);

                if (shownIngredientsCount % 2 == 0) {
                    // Add on left;
                    ingredientColLeft.append(itemLi);
                    shownIngredientsCount++;
                }
                else {
                    // Add on right
                    ingredientColRight.append(itemLi);
                    shownIngredientsCount++;
                }
                // Filling left first, and then right
                //                        if (count >= maxItemOnColLeft) {
                //                            // Add on right
                //                            ingredientColRight.append(itemLi);
                //                        }
                //                        else {
                //                            // Add on left;
                //                            ingredientColLeft.append(itemLi);
                //                        }

                //determine when to display the ingredient icons 
                //                if (minQty < maxQty) {
                //                    if ($(this).find('DefaultQuantity').text() != 0) {
                //                        //variationList.prepend(itemLi);
                //                    }
                //                    else {
                //                    }
                //                }

            }

            // Remove border bottom for last item for both columns
            var lastLeftVisible = ingredientColLeft.children(":last");
            if (lastLeftVisible)
                lastLeftVisible.addClass("remove-border-bottom");
            var lastRightVisible = ingredientColRight.children(":last");
            if (lastRightVisible)
                lastRightVisible.addClass("remove-border-bottom");

            // local.js
            updateItemNutritionTotals(menuItem);

        },
        setIngredientsOptionTextWidth: function (element, text) {
            var width = 0;

            var ret = getTextDimension("arial", "12px", "bold", text);
            // text.width + gap(6px) + arrow width
            width = ret.width + 6 + 5;
            element.width(width);
        },
        showIngredientOption: function (requestOption) {

            switch (requestOption) {
                case "8Options":
                    this.show8Options();
                    var text = $("#ingredient-options a.ingre-options-text").html();
                    this.setIngredientsOptionTextWidth($("#ingredient-options"), text);


                    //                    var text = $("#all-options-text").html();
                    //                    $("#ingredient-options a.ingre-options-text").html(text);
                    //                    this.setIngredientsOptionTextWidth(text);
                    break;
                case "AllOptions":
                    this.showAllOptions();

                    // Hide the link
                    $("#menu-custom-ingredients #ingredient-options").hide();

                    // Show reset ingredients, when current options are 'All Options'

                    this.showResetOptions();
                    //                    var text = $("#reset-options-text").html();
                    //                    $("#ingredient-options a.ingre-options-text").html(text);
                    //                    this.setIngredientsOptionTextWidth(text);
                    break;

            }

        },
        switchIngredientsOption: function () {
            var currentOption = $("#hid_current_ingredients_option").attr("value");
            // Do switch
            var newOption = currentOption == "8Options" ? "AllOptions" : "8Options";

            this.showIngredientOption(newOption);

            $("#hid_current_ingredients_option").attr("value", newOption);

        },
        showResetOptions: function () {
            var text = $("#ingredient-reset a.ingre-options-text").html();
            this.setIngredientsOptionTextWidth($("#ingredient-reset"), text);

            $("#menu-custom-ingredients #ingredient-reset").show();
        },
        show8Options: function () {
            // !element.is(":visible")
            var visibleText = ":visible";
            // For Init case.
            //            if ($("#column-left").children(":visible").length == 0)
            //                visibleText = ":hidden";

            var ingredientColLeft = $("#column-left");
            var ingredientColRight = $("#column-right");
            while (true) {

                var currentVisibleItems = ingredientColLeft.children(":visible").length + ingredientColRight.children(visibleText).length;
                if (currentVisibleItems <= shownIngredientsCountWhenMinimized)
                    break;
                // Get the last visible item for left column:
                var lastLeftVisible = ingredientColLeft.children(":visible" + ":last");
                if (lastLeftVisible)
                    lastLeftVisible.hide();


                // Get the last visible item for right column:
                var lastRightVisible = ingredientColRight.children(":visible" + ":last");
                if (lastRightVisible)
                    lastRightVisible.hide();
            }

            this.removeBorderBottom();
        },

        showAllOptions: function () {
            $("#column-left").children().each(function () {
                var ingreDiv = $(this);
                if (!ingreDiv.is(":visible"))
                    ingreDiv.show();

                if (ingreDiv.hasClass("remove-border-bottom"))
                    ingreDiv.removeClass("remove-border-bottom");

            });

            $("#column-right").children().each(function () {
                var ingreDiv = $(this);
                if (!ingreDiv.is(":visible"))
                    ingreDiv.show();

                if (ingreDiv.hasClass("remove-border-bottom"))
                    ingreDiv.removeClass("remove-border-bottom");

            });
            // remove the border of last item
            this.removeBorderBottom();


        },
        removeBorderBottom: function () {
            // Remove border bottom for last item for both columns
            var lastLeftVisible = $("#column-left").children(":visible:last");
            if (lastLeftVisible)
                lastLeftVisible.addClass("remove-border-bottom");
            var lastRightVisible = $("#column-right").children(":visible:last");
            if (lastRightVisible)
                lastRightVisible.addClass("remove-border-bottom");
        },
        displaySelectedItem: function (menuItem, ignoreCurrentCategory) {

            var isMeal = menuItem.sandwich;
            var currentItem = isMeal ? menuItem.sandwich : menuItem;

            var isCustomizable = currentItem.isCustomizable;
            var hasVariations = currentItem.variations.length > 0 ? true : false;

            if (isMeal)
                setCurrentValueMealItem(currentItem.id);
            else {
                setCurrentMenuItem(currentItem.id);

            }

            var menuDetails = getMenuDetailsFromCategoryFile(menuItem.id, ignoreCurrentCategory);

            // Reset
            $("#nutritabs-customizable #menu-variations").hide();
            $("#nutritabs-customizable #menu-custom-ingredients").hide();
            $("#nutritabs-customizable #build-a-meal").hide();
            //$("#menu-custom-ingredients #ingredient-options").hide();
            $("#menu-custom-ingredients #ingredient-reset").hide();


            // Set the text on btn-add-to-meal, according to the 'isUpdateMyMeal' flag
            var isChangeable = isCustomizable || hasVariations;
            this.checkUpdateButton(isChangeable);

            // Check is ValueMeal
            if (isMeal)
                $("#nutritabs-customizable #build-a-meal").show();

            ////// Check on either menuItem.sandwich or menuItem

            // Check Menu Variation
            if (hasVariations)
                $("#nutritabs-customizable #menu-variations").show();

            // Check menu ingredients
            if (isCustomizable)
                $("#nutritabs-customizable #menu-custom-ingredients").show();



            // set "On" the UI elements
            var elementsName = ["#menu-product-state .h-line",
                                "#menu-product-state #menu-info-social",
                                "#menu-product-state #menu-nutri-tabs",
                                "#menu-more-carousel"]

            for (var i = 0; i < elementsName.length; i++) {
                var element = $(elementsName[i]);
                if (element && !element.is(":visible")) {
                    element.show();
                }

            }


            // add menu head text
            //            var desc = menuItem.description;
            //            if (desc != undefined)
            //                $("#menu-header-group #menu-header-text").html(desc.toUpperCase());

            // Override description
            $("#menu-header-group #menu-header-text").html(menuDetails.item_description.toUpperCase());

            $("#menu-header-group").css("background", "url(" + menuItem.imagePath + ") top right no-repeat transparent");

            // Override display name, For Variation Menu , #1323 menuItem.displayTitle 
            //            var strTitle = obj.item_title != menuItem.displayTitle ? obj.item_title
            $("#menu-info-header").html(menuDetails.item_title);

            // Override briefCaption
            //$("#menu-info-desc").html(menuItem.briefCaption);
            $("#menu-info-desc").html(menuDetails.item_brief_caption);
            // utilities.js
            printCopyrightYear();

            $("#tabs").tabs({
                collapsible: true

            });



            //            $("#menu-nutri-tabs #tabs li a[href='#tabs-2']").attr("disabled", "");
            //            $("#menu-nutri-tabs #tabs li a[href='#tabs-3']").attr("disabled", "");

            //            var hasVideos = false;
            //            var hasBlogs = false;
            //            var toBeDisabled = [];

            //            if (!hasVideos)
            //                toBeDisabled.push(1);

            //            if (!hasBlogs)
            //                toBeDisabled.push(2);

            //            if (toBeDisabled.length > 0)
            //                $("#tabs").tabs("option", "disabled", toBeDisabled);


            $("#nutritabs-non-customize").hide();
            $("#nutritabs-customizable").hide();


            if ($.browser.msie && $.browser.version == "7.0") {
                $("#menu-nutri-tabs #tabs-1").css("margin-top", "-25px");

                // reset: ie7 fixed
                $("#menu-nutri-tabs .tabscontent").css("padding-top", "0px");
            }

            if (isMeal || hasVariations || isCustomizable) {
                // show customizable div
                this.showCustomizableDiv(menuItem);

                // Value meal options
                if (isMeal) {
                    this.updateValueMealOptions(menuItem);
                }

                if (isCustomizable) {
                    // [Bug 1824] Remove "All Options" function
                    //                    if (shownIngredientsCount > shownIngredientsCountWhenMinimized) {
                    //                        $("#menu-custom-ingredients #ingredient-options").show();

                    //                        // First time called, use value from hidden field
                    //                        var opt = $("#hid_current_ingredients_option").attr("value");
                    //                        this.showIngredientOption(opt);
                    //                    }
                    //                    else {
                    //                        // Show reset ingredients, when shown ingre are less than 8
                    //                        this.showResetOptions();
                    //                    }
                    this.showResetOptions();

                }
            }
            else {
                // show nutrition only
                this.showNonCustomizableDiv(menuItem);
            }

            //            this.checkIsCarouselItemsCreated();

            // Close all tabs by default
            if (isFirstInitTabs) {
                isFirstInitTabs = false;
                $("#tabs li.ui-tabs-selected a").click();

            }



            //            if (isSubcategoryChanged) {
            //                isSubcategoryChanged = false;
            //                this.addCarousel(menuItem, menuDetails);
            //            }
            this.addCarousel(menuItem, menuDetails);

            if (removeAJAX) {
                // Set link for 'See All'
                var link = $("#menu-more-carousel .carousel-see-all .link-see-all");
                var url = getSubCategorySEOUrlByData(menuDetails);

                link.unbind("click");
                link.attr("href", url);


            }

            setCurrentURL(menuDetails);

            // document.title is already set in server side, this should be removed...
            setCurrentTitleByMenu();
        },
        //        checkIsCarouselItemsCreated: function () {
        //            var length = $("#mycarousel").children().length;
        //            if (length == 0)
        //                isSubcategoryChanged = true;
        //        },
        getIngredientId: function (ingredientAction) {
            var idParts = ingredientAction.siblings("a.icon").attr('id').split('-');
            return idParts[2];
        },
        addCarousel: function (currentItem, menuDetails) {

            var title = $("#hid_selected_subcategory_title").attr("value");
            if (title == "") {
                title = menuDetails.subcat_title;
            }

            // add carousel header
            var str = $("#menu-more-carousel .subcat-data").html() + title;
            $("#menu-more-carousel .carousel-header .text").html(str);
            var ret = getTextDimension("Arial", "20px", "bold", str);


            // set width of carousel dynamiccally
            var newWidth = ret.width + $("#menu-more-carousel .carousel-header .carousel-see-all").width() + 25;

            $("#menu-more-carousel .carousel-header").width(newWidth);



            var cat_id = "202"; //$("#hid_selected_category").attr("value");
            var subcat_id = $("#hid_selected_subcategory").attr("value");
            var len = 0;
            $.ajax({
                url: '/cms' + CulturePrefix + 'cms_out/menu_nutrition/categories/' + cat_id + '.xml',
                datatype: 'xml',
                type: 'get',
                success: function (data) {

                    var pre_data = $(data).find('SubCategory').filter("[ID = " + subcat_id + "]");


                    // convert string to boolean
                    var isValueMeal = (pre_data.attr("IsValueMeal") == "true");
                    var arr = undefined;
                    if (isValueMeal)
                        arr = $(pre_data).find('ValueMeal');
                    else
                        arr = $(pre_data).find('MenuItem');

                    // other item in the same sub-category
                    len = arr.length - 1;

                    //<ul id="mycarousel" class="jcarousel-skin-tango">
                    $("#carousel").empty();
                    $("#carousel").append("<ul id='mycarousel' class='jcarousel-skin-tango'>");
                    var mainMenu = $('#mycarousel');
                    var count = 0;
                    var variationsId = currentItem.getVariationId();
                    //  print("carousel items", len);
                    arr.each(function (index, value) {

                        var ItemId = $(this).attr('ID');
                        var title = $(this).children('DisplayTitle').text();
                        var thumbnailImg = $(this).children('ImagePathThumbnail').text();
                        var isHidden = ($(this).attr("IsHidden") == "true");
                        var newMarkerPath = $(this).children('NewMarkerImagePath').text();
                        var isActive = $(this).attr("IsActive");

                        // Has value and equal to 'false'
                        if (isActive && isActive == "false")
                            return true;

                        // continue;
                        if (isHidden)
                            return true;

                        // remove current element
                        if (ItemId == currentItem.id) // like continue statement
                            return true;

                        if ($.inArray(ItemId, variationsId) != -1)
                            return true;

                        var li = $("<li>");
                        // SUBHC rel='savemealprompt'
                        //                        if (!thumbnailImg)
                        //                            thumbnailImg = "/cms/en/us/cms_out/digital_assets/graphics/menu_nutrition/temp-menu-thumbnail.png";
                        var img = $("<img>").attr("src", thumbnailImg);
                        var anchor = $("<a >").attr("href", "#").click(function () { eval("activateMenuProductState(" + isValueMeal + "," + ItemId + ")"); });
                        anchor.attr("rel", "savemealprompt");
                        if (removeAJAX) {
                            var item_id = isValueMeal ? "v" + ItemId : "m" + ItemId;
                            var menu = {
                                cat_id: menuDetails.cat_id,
                                cat_title: menuDetails.cat_title,
                                subcat_id: menuDetails.subcat_id,
                                subcat_title: menuDetails.subcat_title,
                                item_id: item_id,
                                item_title: title
                            };
                            // Set link for each menu item
                            var url = getMenuSEOUrl(menu);

                            anchor.unbind('click');
                            anchor.attr("href", url);

                        }

                        var newMarker = "";
                        if (newMarkerPath)
                            newMarker = "<img class='new-marker' src='" + newMarkerPath + "' />"
                        var div = $("<div class='menu-item-text'>").html(newMarker + title);

                        img.appendTo(anchor);
                        div.appendTo(anchor);
                        anchor.appendTo(li);
                        mainMenu.append(li);

                        count++;
                    });

                    var position = checkCarouselItemPosition();
                    // set carousel, after data are prepared completely
                    $('#mycarousel').jcarousel({
                        visible: 6,
                        animation: 'slow',
                        start: position,
                        itemFallbackDimension: 149,
                        itemFirstInCallback: mycarousel_itemFirstInCallback,
                        buttonNextHTML: "<div style='top:-10px; right:0px'></div>",
                        buttonPrevHTML: "<div style='left: 888px;top: -10px;'></div>"
                    });
                }
            });
        },

        updateValueMealOptions: function (valueMeal) {
            var badgeContent = "";

            var cat_id = $("#hid_selected_category").attr("value");
            var subcat_id = $("#hid_selected_subcategory").attr("value");

            // Value meal's Variation

            $('#value-meal-variations').empty();
            for (var i in valueMeal.variations) {
                var currentVar = valueMeal.variations[i];
                $('#value-meal-variations').append(this.createVariation(cat_id, subcat_id, valueMeal.id, '', 'value_meals', currentVar.menuItemId, currentVar.abbreviation));
            }


            var drinksWrapper = $('#value-meal-drinks-wrapper');
            drinksWrapper.empty();

            var drinks = $('<select id="value-meal-drinks"></select>');
            drinksWrapper.append(drinks);

            for (var d in valueMeal.drinkOptions) {
                var drink = valueMeal.drinkOptions[d];
                var o = $('<option value="' + drink.id + '">' + drink.displayTitle + '</option>');
                if (drink.id == valueMeal.currentDrink.id) {
                    o.attr('selected', 'selected');
                }

                drinks.append(o);
            }

            drinks.combobox({
                comboboxContainerClass: 'value-meal-combobox-container',
                comboboxValueContainerClass: 'value-meal-combobox-value-container',
                comboboxValueContentClass: 'value-meal-combobox-value-content-190',
                comboboxDropDownClass: 'combobox-dropdown-container-190',
                comboboxDropDownItemClass: 'combobox-dropdown-item',
                comboboxDropDownButtonClass: 'value-meal-combobox-button',
                width: 190,
                height: 30,
                onChange: function (text, value) {
                    // To hide the overflow text
                    $(".value-meal-combobox-value-content-190").html("<div style='width: 170px'>" + text + "</div>");

                    BK.menuNutritionController.onChangeValueMealDrink(value);
                }
            });

            var sidesWrapper = $('#value-meal-sides-wrapper');
            sidesWrapper.empty();

            var sides = $('<select id="value-meal-sides"></select>');
            sidesWrapper.append(sides);

            for (var s in valueMeal.sideOptions) {
                var side = valueMeal.sideOptions[s];
                var o = $('<option value="' + side.id + '">' + side.displayTitle + '</option>');
                if (side.id == valueMeal.currentSide.id) {
                    o.attr('selected', 'selected');
                }

                sides.append(o);
            }

            sides.combobox({
                comboboxContainerClass: 'value-meal-combobox-container',
                comboboxValueContainerClass: 'value-meal-combobox-value-container',
                comboboxValueContentClass: 'value-meal-combobox-value-content-225',
                comboboxDropDownClass: 'combobox-dropdown-container-225',
                comboboxDropDownItemClass: 'combobox-dropdown-item',
                comboboxDropDownButtonClass: 'value-meal-combobox-button',
                width: 225,
                height: 30,
                onChange: function (text, value) {
                    BK.menuNutritionController.onChangeValueMealSide(value);
                }
            });
        },
        createVariation: function (cat_id, subcat_id, currentMenuItemId, defaultText, variationFolder, variationMenuItemId, variationText) {
            var li = $('<li class="each-variation"></li>');

            var href = CulturePrefix + 'menu-nutrition/category' + cat_id + '/subcategory' + subcat_id + '/value-meal' + variationMenuItemId + '/index.html';
            href = "";
            var a = $('<a id="variation-' + variationMenuItemId + '" href="' + href + '" rel="/cms' + CulturePrefix + 'cms_out/menu_nutrition/' + variationFolder + '/' + variationMenuItemId + '.xml" title="' + defaultText + '"></a>');

            var div = $('<div class="variation"></div>');
            div.append('<span class="text">' + variationText + '</span>');

            if (currentMenuItemId == variationMenuItemId) {
                div.addClass('active');
            }

            a.append(div);
            li.append(a);

            return li;
        },
        // This method is called when resizing the value meal
        updateValueMealSize: function (valueMeal) {
            isUpdated = true;

            // displayTitle will not be updated when change size in value meal
            // A required logic for #1443
            // $("#menu-info-header").html(valueMeal.displayTitle);

            $("#menu-info-desc").html(valueMeal.briefCaption);

            $("#menu-header-group").css("background", "url(" + valueMeal.imagePath + ") top right no-repeat transparent");
            // utilities.js
            printCopyrightYear();


            this.updateValueMealOptions(valueMeal);


            // local.js
            updateItemNutritionTotals(valueMeal);
            var menuDetails = getMenuDetailsFromCategoryFile(valueMeal.id);
            setCurrentURL(menuDetails);

            // Set title if menu is changed
            setCurrentTitleByMenu();
        },
        updateValueMealSideDrink: function (valueMeal) {
            isUpdated = true;
            // local.js
            updateItemNutritionTotals(valueMeal);

        },
        hideViewYourMealButton: function () {

        },
        showDialog: function () {

        },
        getDate: function (menuItem, isUpdate) {
            return 0;
        }
    };
} ();

/* must not override native code
function print(type,msg) {      

    var alertFallback = true;
    if (typeof console === "undefined" || typeof console.log === "undefined") {
        console = {};
        if (alertFallback) {
            console.log = function (msg) {
                alert(type + ": " + msg);
            };
        } else {
            console.log = function () { };
        }
        //return;
    }

    console.log(type + ": " + msg);
}
*/

function setCurrentTitleByMenu() {
    if (document.title != currentMenuTitle) {
        document.title = currentMenuTitle;
    
    }

}

function setCurrentTitleBySubCategory(subcat_title) {
    if (document.title != subcat_title) {
        document.title = subcat_title;

    }

}

function setCurrentSubCatURL() {
    var url = getSubCategorySEOUrl();
    $(document).trigger('ItemUrlChanged', [url, document.title]);
}


function setCurrentURL(menu) {
    currentURL = getMenuSEOUrl(menu);
    $(document).trigger('ItemUrlChanged', [currentURL, currentMenuTitle]);
}

function getSubCategorySEOUrl() {
    var cat_title = $("h1#category-header").html();
    var cat_id = $("#hid_selected_category").attr("value");  

    var subcat_title = $("#hid_selected_subcategory_title").attr("value");
    var subcat_id = $("#hid_selected_subcategory").attr("value");

    var cat = "/" + toSeoFriendly(stripHtml(cat_title) + " " + cat_id);
    var subcat = "/" + toSeoFriendly(stripHtml(subcat_title) + " " + subcat_id);


    var url = window.location.toString();

    var nutriLen = "menu-nutrition".length;
    var index = url.indexOf("menu-nutrition");

    url = url.substring(0, index + nutriLen) + cat + subcat + "/index.html";

    return url;

}
function getSubCategorySEOUrlByData(menu) {


    var cat = "/" + toSeoFriendly(menu.cat_title + " " + menu.cat_id);
    var subcat = "/" + toSeoFriendly(menu.subcat_title + " " + menu.subcat_id);


    var url = window.location.toString();

    var nutriLen = "menu-nutrition".length;
    var index = url.indexOf("menu-nutrition");

    url = url.substring(0, index + nutriLen) + cat + subcat + "/index.html";

    return url;

}

function getMenuDetailsFromCategoryFile(menuID, ignoreCurrentCategory) {
    var item_id = "";

    var cat_title = "";
    var subcat_title = "";
    var item_title = "";
    var cat_id = "";
    var subcat_id = "";
    var item_description = "";
    var item_brief_caption = "";

//    if (!ignoreCurrentCategory) {
    if(true) {
        cat_id = "202";// $("#hid_selected_category").attr("value");
        if (cat_id == null || typeof (cat_id) == "undefined")
            cat_id = "";


        subcat_id = $("#hid_selected_subcategory").attr("value");
        if (subcat_id == null || typeof (subcat_id) == "undefined")
            subcat_id = "";
    }

    var catIDs;
    if (cat_id != "") {
        catIDs = [cat_id];
    } else {
        catIDs = [201, 202, 203];
    }

    for (var i = 0; i < catIDs.length; i++) {
        var id = catIDs[i];
        $.ajax({
            url: '/cms' + CulturePrefix + 'cms_out/menu_nutrition/categories/' + id + '.xml',
            datatype: 'xml',
            type: 'get',
            async: false,
            success: function (data) {

                var arrSubCat = $(data).find('SubCategory');
                if (subcat_id != "") {
                    var tmp = arrSubCat.filter('[ID=' + subcat_id + ']');
                    if (tmp.length > 0)
                        arrSubCat = tmp;
                }

                arrSubCat.each(function (index, value) {

                    var arrItem;
                    arrItem = $(this).find('ValueMeal[ID=' + menuID + ']');
                    if (arrItem.length == 0) {
                        arrItem = $(this).find('MenuItem[ID=' + menuID + ']');
                    }

                    if (arrItem.length > 0) {
                        var item = arrItem.first();
                        item_id = (item[0].tagName == 'ValueMeal' ? 'v' : 'm') + menuID;
                        item_title = item.children('DisplayTitle').text();

                        subcat_title = $(this).attr('Title');
                        subcat_id = $(this).attr('ID');

                        cat_id = id;
                        cat_title = getCategoryData_sync(cat_id);
                        currentMenuTitle = item.children('MetaDataTitle').text();

                        item_description = item.children('Description').text();
                        item_brief_caption = item.children('BriefCaption').text();
                        return false; // break the loop
                    }
                }); // end of arrSubCat
            }
        });

        // IF those has been set, break the loop
        if (subcat_id != "" && item_id != "")
            break;
    }

    var ret = {
        item_id: item_id,
        item_title: item_title,
        item_description: item_description,
        item_brief_caption: item_brief_caption,
        subcat_id: subcat_id,
        subcat_title: subcat_title,
        cat_id: cat_id,
        cat_title: cat_title,
        currentMenuTitle: currentMenuTitle
    };


        $("#hid_selected_category").attr("value", ret.cat_id);
        $("#hid_selected_subcategory").attr("value", ret.subcat_id);
        $("#hid_selected_subcategory_title").attr("value", ret.subcat_title);

    return ret;
}

// Get the current menu URL.
// Search in Category file <20x>.xml by using menuID
function getMenuSEOUrl(menu) {

    var url = "";
    if (menu.subcat_id != "" && menu.item_id != "") {

        var cat = "/" + toSeoFriendly(stripHtml(menu.cat_title) + " " + menu.cat_id);
        var subcat = "/" + toSeoFriendly(stripHtml(menu.subcat_title) + " " + menu.subcat_id);
        var item = "/" + toSeoFriendly(stripHtml(menu.item_title) + " " + menu.item_id);

        url = window.location.toString();

        var nutriLen = "menu-nutrition".length;
        var index = url.indexOf("menu-nutrition");

        url = url.substring(0, index + nutriLen) + cat + subcat + item + "/index.html";
       
    }
    return url;
}

function resetCarouselItemPosition(subcat_id) {

    var doReset = false;
    var positionData = $.cookie('menu_carousel_item_position');
    if (positionData && positionData != "") {
        var subcat_id_ck = positionData.split(':')[0];

        if (subcat_id_ck != subcat_id) {
            doReset = true;
        }
    }


    if (doReset) {
        var idx = 1;
        var position = subcat_id + ":" + idx;
        $.cookie('menu_carousel_item_position', position, { path: '/' });

    }



}
// OnScrolled
function mycarousel_itemFirstInCallback(carousel, item, idx, state) {

    var position = $("#hid_selected_subcategory").attr("value") + ":" + idx;
    $.cookie('menu_carousel_item_position', position, { path: '/' });
};

function checkCarouselItemPosition() {
    var result = 1;
    var positionData = $.cookie('menu_carousel_item_position');
    if (positionData && positionData != "") {
        var subcat_id = positionData.split(':')[0];
        var pos = parseInt(positionData.split(':')[1]);

        // if it is the same subcategory .. use its position
        if (subcat_id == $("#hid_selected_subcategory").attr("value"))
            result = pos;

        // else ... reset

    }

    return result;
}