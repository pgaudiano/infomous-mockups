// BK namespace
var BK = BK || {};
BK.menuNutritionModel = {};

BK.menuNutritionModel.HCCategoryID = {
        Breakfast: {
            "/en/us/": 201,
            "/es/us/": 263
        },
        LunchAndDinner: {
            "/en/us/": 202,
            "/es/us/": 264
        },
        Dessert: {
            "/en/us/": 203,
            "/es/us/": 265
        }
 };


// Nutirition sotals
BK.menuNutritionModel.nutritionTotals = function () {

//    this.Calories = 0;
//    this['Saturated Fat'] = 0;
//    this.Cholesterol = 0;
//    this.Sugar = 0;
//    this.Carbohydrates = 0;
//    this.Fat = 0;
//    this['Trans Fat'] = 0;
//    this.Protein = 0;
//    this.Sodium = 0;
//    
//    this.Weight = 0;
}

// Allergen
BK.menuNutritionModel.allergen = function (data) {
    this.id = data.attr('ID')
    this.displayTitle = data.children('MenuMetaData').children('DisplayTitle').text();
}

// Nutrition item
BK.menuNutritionModel.nutritionItem = function (data) {
    this.name = $.trim(data.children('Name').text());
    this.amount = parseFloat(data.children('Amount').text());
    this.measure;

    switch (data.children('Measure').text()) {
        case 'Grams':
            this.measure = 'g';
            break;
        case 'Milligrams':
            this.measure = 'mg';
            break;
        default:
            this.measure = '';
    }
}

// Ingredient
BK.menuNutritionModel.ingredient = function (data) {
    var ingredient = data.children('Ingredient');
    var metaData = ingredient.children('MenuMetaData');

    this.id = ingredient.attr('ID');
    this.iconOrder = ingredient.attr('IconOrder');
    this.isVisible = (ingredient.attr('IsVisible') == 'true');
    this.displayTitle = metaData.children('DisplayTitle').text();
    this.defaultQuantity = parseFloat(data.find('DefaultQuantity').text());
    this.minQuantity = parseFloat(data.find('MinQuantity').text());
    this.maxQuantity = parseFloat(data.find('MaxQuantity').text());
    this.currentQuantity = this.defaultQuantity;
    this.allergens = [];
    this.nutritionItems = {};

    var self = this;
    ingredient.children('Allergens').children('Allergen').each(function () {
        self.allergens.push(new BK.menuNutritionModel.allergen($(this)));
    });

    data.children('NutritionItems').children('NutritionItem').each(function () {
        var ni = new BK.menuNutritionModel.nutritionItem($(this));
        self.nutritionItems[ni.name] = ni;
    });
}

BK.menuNutritionModel.ingredient.prototype = {
    add: function () {
        if (this.currentQuantity < this.maxQuantity) {
            this.currentQuantity++;
        }
    },

    subtract: function () {
        if (this.currentQuantity > this.minQuantity) {
            this.currentQuantity--;
        }
    },

    reset: function () {
        this.currentQuantity = this.defaultQuantity;
    }
}

// Menu variation
BK.menuNutritionModel.variation = function (data) {
    this.title = data.attr('Title');
    this.abbreviation = data.attr('TitleAbbreviation');
    this.menuItemId = data.attr('MenuItemID');
}

// Menu item
BK.menuNutritionModel.CategoryItem = function (data) {
    this.id = data.attr('ID');
    this.title = data.children("DisplayTitle").text();
    this.detailsUrl = data.children("DetailsUrl").text();
    this.caloriesBadge = data.children("CaloriesBadge").text();
}

BK.menuNutritionModel.menuItem = function (data) {
    this.xmlUrl;
    this.rawXml;
    this.id = data.attr('ID');
    this.title = data.attr('Title');
    this.displayTitle = data.find('DisplayTitle:first').text();
    this.description = data.attr('Description');
    this.isCustomizable = (data.attr('IsCustomizable') == "true");
    this.briefCaption = data.find('MenuMetaData BriefCaption:first').text();
    this.imagePath = data.find("MenuMetaData ImagePath:first").text();
    this.imagePathMobile = data.find("MenuMetaData ImagePathMobile:first").text();
    //    this.imagePath = data.find('MenuItemAltImagePath').text();
    this.defaultVariationMenuItemId = data.find('MenuItemVariations').attr('DefaultMenuItemID');
    this.defaultVariationMenuItemTitle = data.find('MenuItemVariations').attr('Title');
    this.ingredients = {};
    this.variations = [];
    this.LowerCalorieItemSuggestions = data.find('LowerCalorieItemSuggestions').text();
    this.LowerCalorieIngredientSuggestions = data.find('LowerCalorieIngredientSuggestions').text();
    this.isValueMeal = false;
    this.allergens = [];
    // Catid, SubcatId stored for, when click item in mymeal. 
    // Some menuitems exist in more than one category
    this.categoryId = "";
    this.subCategoryId = "";

    var self = this;
    var tmp = 0;
    data.children('Ingredients').children('IngredientPortion').each(function () {
        var ing = new BK.menuNutritionModel.ingredient($(this));
        self.ingredients[ing.id] = ing;
        //        self.ingredients[(++tmp) + '-' + ing.id] = ing;
    });

    data.children('MenuItemVariations').children('MenuItemVariation').each(function () {
        self.variations.push(new BK.menuNutritionModel.variation($(this)));
    });

    data.children('NonIngredientSpecificAllergens').children('Allergen').each(function () {
        self.allergens.push(new BK.menuNutritionModel.allergen($(this)));
    });
}

BK.menuNutritionModel.menuItem.prototype = {
    findVariationId: function (title) {
        // Find the varition with the given title
        for (var i = 0; i < this.variations.length; i++) {
            if (this.variations[i].title == title) {
                return this.variations[i].menuItemId;
            }
        }

        return 0;
    },
    getVariationId: function () {
        var result = [];
        for (var i = 0; i < this.variations.length; i++) {
            result.push(this.variations[i].menuItemId);
        }

        return result;
    },
    findMeasure: function (search_name) {
        var result = "";

        for (var i in this.ingredients) {
            var currentIng = this.ingredients[i];
            //print("currentIng.displayTitle",currentIng.displayTitle);
            for (var n in currentIng.nutritionItems) {
                //print("n.name",n.name);
                if (currentIng.nutritionItems[n].name == search_name) {
                    result = currentIng.nutritionItems[n].measure;
                    break;
                }
            }
        }

        //print("len", this.ingredients.length);

        return result;
    },

    // Get the allergens from menuItem itself, its ingredients and also customized ingredients.
    // Added using union method.
    getAllAllergens: function () {
        var result = "";

        // get from menuItems
        for (var i in this.allergens) {
            var currentAll = this.allergens[i];
            if (result.indexOf(currentAll.displayTitle) == -1)
                result = result + currentAll.displayTitle + ", ";
        }


        // get from ingredients
        for (var i in this.ingredients) {
            var currentIng = this.ingredients[i];
            if (currentIng.currentQuantity > 0) {
                for (var aller in currentIng.allergens) {
                    var currentAll = currentIng.allergens[aller];

                    if (result.indexOf(currentAll.displayTitle) == -1) {
                        var addedLine = "<br>Processed on shared equipment with peanuts and tree nuts</br>";

                        if (currentAll.displayTitle == addedLine) {
                            result = result.substring(0, result.length - 2);
                            result += currentAll.displayTitle + ", ";
                        }
                        else {
                            result = result + currentAll.displayTitle + ", ";
                        }
                    }
                }
            }
        }

        // remove last comma
        if (result.length >= 2)
            result = result.substring(0, result.length - 2);


        //print("result",result);
        return result;
    },
    getNutritionTotals: function () {
        var totals = new BK.menuNutritionModel.nutritionTotals();

        for (var i in this.ingredients) {
            var currentIng = this.ingredients[i];
            //            Impl isVisible .. Not included in the calculation
            //            if (!currentIng.isVisible)
            //                continue;
            for (var n in currentIng.nutritionItems) {
                if (totals[n]) {
                    // Fix the floating point number calculation bug in js
                    totals[n] = (totals[n] * 100) + (currentIng.nutritionItems[n].amount * currentIng.currentQuantity * 100);
                    totals[n] = totals[n] / 100;
                }
                else {
                    totals[n] = currentIng.nutritionItems[n].amount * currentIng.currentQuantity;
                }
            }
        }

        // Do round value here...
        for (var key in totals) {

            // getKeyByValue: common-lib.js , CONTENT.nutritionName: local.js
            var nutriKey = getKeyByValue(CONTENT.nutritionName, key);

            totals[key] = BK.menuNutritionModel.roundValue(nutriKey, totals[key]);
        }

        return totals;
    },

    updateIngredients: function (idArray, quantityArray) {
        for (var i = 0; i < idArray.length; i++) {
            for (var ing in this.ingredients) {
                currentIng = this.ingredients[ing];
                if (currentIng.id == idArray[i]) {
                    currentIng.currentQuantity = quantityArray[i];
                    break;
                }
            }
        }
    },
    resetAllIngredients: function () {
        for (var i in this.ingredients) {
            var currentIng = this.ingredients[i];
            currentIng.reset();
        }
        //        this.ingredients[ingredientId].reset();
    },
    addIngredient: function (ingredientId) {
        this.ingredients[ingredientId].add();
    },

    subtractIngredient: function (ingredientId) {
        this.ingredients[ingredientId].subtract();
    },
    getSortedIngredients: function () {
        var sorted = [];

        var strIds = [];
        // Prepare the dictionary in pair of <iconOrder>|<id>
        for (var ing in this.ingredients) {
            var currentIng = this.ingredients[ing];
            var str = currentIng.iconOrder + "|" + currentIng.id;
            strIds.push(str);
        }
        // Do custom sort
        strIds.sort(doSort);

        function doSort(a, b) {
            var order_a = parseInt(a.split("|")[0]);
            var order_b = parseInt(b.split("|")[0]);

            return order_a - order_b;

        }
        // Get the ingredient and add to result array
        for (var i = 0; i < strIds.length; i++) {
            var id = strIds[i].split("|")[1];
            var currentIng = this.ingredients[id];
            sorted.push(currentIng);
        }


        return sorted;

    }


}

BK.menuNutritionModel.menuItem.loadNonAjax = function (detailsUrl, cat_id, subcat_id, loadedCallback) {
    var mi;
    $.ajax({
        url: detailsUrl,
        datatype: 'xml',
        async: false,
        type: 'get',
        success: function (data) {
            mi = new BK.menuNutritionModel.menuItem($(data).find('MenuItem'));
            mi.categoryId = cat_id;
            mi.subCategoryId = subcat_id;
        },
        complete: function (xhr, status) {
            mi.rawXml = xhr.responseText;
            mi.xmlUrl = detailsUrl;
            loadedCallback(mi);
        }
    });
}

BK.menuNutritionModel.menuItem.load = function (detailsUrl, loadedCallback) {
    var mi;
    $.ajax({
        url: detailsUrl,
        datatype: 'xml',
		//async: false,
        type: 'get',
        success: function (data) {
            mi = new BK.menuNutritionModel.menuItem($(data).find('MenuItem'));
        },
        complete: function (xhr, status) {
            mi.rawXml = xhr.responseText;
            mi.xmlUrl = detailsUrl;
            loadedCallback(mi);
        }
    });
}

// Value meal
BK.menuNutritionModel.valueMeal = function (data, loadedCallback) {
    this.baseItemUrl = '/cms' + CulturePrefix + 'cms_out/menu_nutrition/menu_items/';
    this.rawXml = '';
    this.xmlUrl = '';
    this.id = data.attr('ID');
    this.title = data.attr('Title');
    this.displayTitle = data.find('DisplayTitle:first').text();
    this.description = data.attr('Description');
    this.imagePath = data.find("MenuMetaData ImagePath:first").text();
    this.imagePathMobile = data.find("MenuMetaData ImagePathMobile:first").text();
    this.briefCaption = data.find('MenuMetaData BriefCaption:first').text();
    this.sandwich = {};
    this.sideOptions = [];
    this.currentSide = 0;
    this.drinkOptions = [];
    this.currentDrink = 0;
    this.variations = [];
    this.LowerCalorieItemSuggestions = data.find('LowerCalorieItemSuggestions').text();
    this.LowerCalorieIngredientSuggestions = data.find('LowerCalorieIngredientSuggestions').text();

    var self = this;
    var sides = data.find('SideOptions Side');
    var drinks = data.find('DrinkOptions Drink');

    data.find('ValueMealVariations MenuItemVariation').each(function () {
        self.variations.push(new BK.menuNutritionModel.variation($(this)));
    });

    var completedItems = 0;
    var totalItems = sides.length + drinks.length + 1;

    var onItemLoaded = function () {
        completedItems++;
        if (completedItems == totalItems) {
            loadedCallback(self);
        }
    }

    BK.menuNutritionModel.menuItem.load(this.baseItemUrl + data.find('Sandwich').attr('MenuItemID') + '.xml', function (item) {
        item.isValueMeal = true;
        self.sandwich = item;
        onItemLoaded();
    });

    var defaultSideId = data.find('SideOptions').attr('DefaultMenuItemID');
    sides.each(function () {
        var id = $(this).attr('MenuItemID')
        BK.menuNutritionModel.menuItem.load(self.baseItemUrl + id + '.xml', function (item) {
            self.sideOptions[id] = item;

            if (id == defaultSideId) {
                self.currentSide = item;
            }

            onItemLoaded();
        });
    });

    var defaultDrinkId = data.find('DrinkOptions').attr('DefaultMenuItemID');
    drinks.each(function () {
        var id = $(this).attr('MenuItemID')
        BK.menuNutritionModel.menuItem.load(self.baseItemUrl + id + '.xml', function (item) {
            self.drinkOptions[id] = item;

            if (id == defaultDrinkId) {
                self.currentDrink = item;
            }

            onItemLoaded();
        });
    });
}

BK.menuNutritionModel.valueMeal.prototype = {
    getAllAllergens: function () {
        var mealTotals = ""

        function addTotals(data) {

            if (data.length > 0) {

                var arr = data.split(",");
                for (var i = 0; i < arr.length; i++) {
                    var item = $.trim(arr[i]);
                    if(mealTotals.indexOf(item) == -1)
                        mealTotals = mealTotals + item + ", ";
                }
            }


        }

        //"aa, bb, cc, dd"
        addTotals(this.sandwich.getAllAllergens());
        addTotals(this.currentDrink.getAllAllergens());
        addTotals(this.currentSide.getAllAllergens());


        // remove last comma
        if (mealTotals.length >= 2)
            mealTotals = mealTotals.substring(0, mealTotals.length - 2);

        return mealTotals;




    },
    getVariationId: function () {
        var result = [];
        for (var i = 0; i < this.variations.length; i++) {
            result.push(this.variations[i].menuItemId);
        }

        return result;
    },
    getNutritionTotals: function () {
        var mealTotals = new BK.menuNutritionModel.nutritionTotals();

        function addTotals(itemTotals) {
            for (var n in itemTotals) {
                if (mealTotals[n]) {
                    // Fix the floating point number calculation bug in js
                    mealTotals[n] = (mealTotals[n] * 100) + (itemTotals[n] * 100);
                    mealTotals[n] = mealTotals[n] / 100;
                }
                else {
                    mealTotals[n] = itemTotals[n];
                }
            }
        }

        addTotals(this.sandwich.getNutritionTotals());
        addTotals(this.currentDrink.getNutritionTotals());
        addTotals(this.currentSide.getNutritionTotals());

        return mealTotals;
    },

    addIngredient: function (ingredientId) {
        this.sandwich.addIngredient(ingredientId);
    },

    subtractIngredient: function (ingredientId) {
        this.sandwich.subtractIngredient(ingredientId);
    },
    resetAllIngredients: function () {
        for (var i in this.sandwich.ingredients) {
            var currentIng = this.sandwich.ingredients[i];
            currentIng.reset();
        }

    },
    changeSide: function (sideId) {
        this.currentSide = this.sideOptions[sideId];
    },

    changeDrink: function (drinkId) {
        this.currentDrink = this.drinkOptions[drinkId];
    },

    resize: function (valueMealId, detailsUrl, loadedCallback) {
        var title = 0;
        for (var i = 0; i < this.variations.length; i++) {
            if (this.variations[i].menuItemId == valueMealId) {
                title = this.variations[i].title;
                break;
            }
        }

        if (title) {
            var self = this;

            var sideVariationId = this.currentSide.findVariationId(title);
            if (!sideVariationId) {
                sideVariationId = this.currentSide.id;
            }

            var drinkVariationId = this.currentDrink.findVariationId(title);
            if (!drinkVariationId) {
                drinkVariationId = this.currentDrink.id;
            }

            $.ajax({
                url: detailsUrl,
                datatype: 'xml',
                type: 'get',
                success: function (data) {
                    var dataDoc = $(data);

                    self.id = dataDoc.find('ValueMealItem').attr('ID');
                    self.displayTitle = dataDoc.find('DisplayTitle:first').text();
                    self.imagePath = dataDoc.find("MenuMetaData ImagePath:first").text();
                    self.briefCaption = dataDoc.find('MenuMetaData BriefCaption:first').text();

                    var sides = dataDoc.find('SideOptions Side');
                    var drinks = dataDoc.find('DrinkOptions Drink');

                    var completedItems = 0;
                    var totalItems = sides.length + drinks.length;

                    var onItemLoaded = function () {
                        completedItems++;
                        if (completedItems == totalItems) {
                            loadedCallback(self);
                        }
                    }

                    delete self.sideOptions;
                    delete self.drinkOptions;

                    self.sideOptions = [];
                    self.drinkOptions = [];

                    sides.each(function () {
                        var id = $(this).attr('MenuItemID')
                        BK.menuNutritionModel.menuItem.load(self.baseItemUrl + id + '.xml', function (item) {
                            self.sideOptions[id] = item;

                            if (id == sideVariationId) {
                                self.currentSide = item;
                            }

                            onItemLoaded();
                        });
                    });

                    drinks.each(function () {
                        var id = $(this).attr('MenuItemID')
                        BK.menuNutritionModel.menuItem.load(self.baseItemUrl + id + '.xml', function (item) {
                            self.drinkOptions[id] = item;

                            if (id == drinkVariationId) {
                                self.currentDrink = item;
                            }

                            onItemLoaded();
                        });
                    });
                },
                complete: function (xhr, status) {
                    this.rawXml = xhr.responseText;
                    this.xmlUrl = detailsUrl;
                }
            });
        }
    }
}

// Meal
BK.menuNutritionModel.meal = function () {
    var lastIndexAdded = -1;
    var currentItemId = -1;
    var currentItem = {};
    var items = [];

    return {
        canAddItem: function () {
            // Maximum items are 10. 
            if (currentItem.sandwich) {
                return items.length < 8;
            }
            else {
                return items.length < 10;
            }
        },

        addCurrentItem: function (cat_id, subcat_id) {

            if (currentItem.sandwich) {
                currentItem.sandwich.categoryId = cat_id;
                currentItem.currentSide.categoryId = cat_id;
                currentItem.currentDrink.categoryId = cat_id;

                var newSandwich = $.extend(true, {}, currentItem.sandwich);
                newSandwich.ingredients = cloneObject(newSandwich.ingredients);
                this.addMenuItem(newSandwich);

                var newSide = $.extend(true, {}, currentItem.currentSide);
                newSide.ingredients = cloneObject(newSide.ingredients);
                this.addMenuItem(newSide);

                var newDrink = $.extend(true, {}, currentItem.currentDrink);
                newDrink.ingredients = cloneObject(newDrink.ingredients);
                this.addMenuItem(newDrink);

                lastIndexAdded = items.length - 3;
            }
            else {
                currentItem.categoryId = cat_id;
                currentItem.subCategoryId = subcat_id;

                var newItem = $.extend(true, {}, currentItem);
                newItem.ingredients = cloneObject(newItem.ingredients);
                this.addMenuItem(newItem);

                lastIndexAdded = items.length - 1;
            }
        },

        addMenuItem: function (menuItem) {
            items.push(menuItem);
        },

        getCurrentItem: function () {
            return currentItem;
        },

        setCurrentItem: function (item) {
            if (typeof item == 'object') {
                currentItemId = -1;
                currentItem = $.extend(true, {}, item);
            }
            else {
                currentItemId = item;
                currentItem = $.extend(true, {}, items[item]);
            }
        },

        updateCurrentItem: function () {
            delete items[currentItemId];
            items[currentItemId] = $.extend(true, {}, currentItem);
        },
        updateCurrentItemByIndex: function (index) {
            delete items[index];
            items[index] = $.extend(true, {}, currentItem);
        },

        removeItem: function (itemId) {
            items.splice(itemId, 1);

            if (currentItemId > itemId) {
                currentItemId--;
            }

            if (lastIndexAdded > itemId) {
                lastIndexAdded--;
            }
        },

        getLastIndexAdded: function () {
            return lastIndexAdded;
        },

        clearLastIndexAdded: function () {
            lastIndexAdded = -1;
        },

        isCurrentItem: function (itemId) {
            return itemId == currentItemId;
        },

        getItems: function () {
            return items;
        },

        getItemsXml: function () {
            var menuItemList = '<flashMenuItemCombos>';
            for (var j = 0; j < items.length; j++) {
                var itm = items[j];

                // Build ingredient Xml
                var ingQtys = '<ingredientQtys>';
                for (var id in itm.ingredients) {
                    ingQtys += '<ingredient Id="' + id + '" qty="' + itm.ingredients[id].currentQuantity + '"/>';
                }
                ingQtys += '</ingredientQtys>';

                menuItemList += '<flashMenuItemCombo><rawMenuItem>'
									+ itm.rawXml.replace('<?xml version="1.0" encoding="utf-8"?>', '')
									+ '</rawMenuItem>' + ingQtys + '</flashMenuItemCombo>';
            }

            menuItemList += '</flashMenuItemCombos>';

            return menuItemList;
        },
        getAllergenTotals: function () {
            var result = "";

            // Loop over menuItem
            for (var i in items) {
                var itemTotals = items[i].getAllAllergens();

                if (itemTotals.length > 0) {
                    var arr = itemTotals.split(",");
                    for (var i = 0; i < arr.length; i++) {
                        var item = $.trim(arr[i]);
                        if (result.indexOf(item) == -1)
                            result = result + item + ", ";

                    }
                }



            }
            // remove last comma
            if (result.length >= 2)
                result = result.substring(0, result.length - 2);


            return result;
        },

        getMealNutritionTotals: function () {
            var mealTotals = new BK.menuNutritionModel.nutritionTotals();

            for (var i in items) {
                var itemTotals = items[i].getNutritionTotals();
                for (var n in itemTotals) {
                    if (mealTotals[n]) {
                        // Fix the floating point number calculation bug in js
                        mealTotals[n] = (mealTotals[n] * 100) + (itemTotals[n] * 100);
                        mealTotals[n] = mealTotals[n] / 100;
                    }
                    else {
                        mealTotals[n] = itemTotals[n];
                    }
                }
            }

            return mealTotals;
        }

    }
} ();

// Load method
BK.menuNutritionModel.loadItem = function (detailsUrl, loadedCallback) {
    var item;
    var isValueMeal = false;
    $.ajax({
        url: detailsUrl,
        datatype: 'xml',
        type: 'get',
        success: function (data) {
            var dataDoc = $(data);
            if (dataDoc.find('ValueMealItem').length > 0) {
                isValueMeal = true;
                item = new BK.menuNutritionModel.valueMeal(dataDoc.find('ValueMealItem'), loadedCallback);
            }
            else {
                item = new BK.menuNutritionModel.menuItem(dataDoc.find('MenuItem'));
            }
        },
        complete: function (xhr, status) {
            item.rawXml = xhr.responseText;
            item.xmlUrl = detailsUrl;

            if (!isValueMeal) {
                loadedCallback(item);
            }
        }
    });
}

BK.menuNutritionModel.roundValue = function (key, value) {

    var RoundDecimal = function (decValue, decNearest) {
        //var decRounded = decValue % decNearest;
        //return (decRounded < (decNearest / 2)) ? decValue - decRounded : decValue + (decNearest - decRounded);
        return Math.round(decValue * (1 / decNearest)) / (1 / decNearest);
    }

    //var result = undefined;

    switch (key) {

        case "KEY_Weight":
            value = Math.round(value);
            break;
        case "KEY_Calories":
            // Round the totals
            /* CALORIES
            < 5 cal - express as 0
            ≤50 cal - express to nearest 5 cal increment
            > 50 cal - express to nearest 10 cal increment
            */

            if (value < 5) {
                value = 0;
            }
            else if (value <= 50) {
                value = RoundDecimal(value, 5);
            }
            else {
                value = RoundDecimal(value, 10);
            }
            break;
        case "KEY_Fat":
            /* FAT
            < .5 g - express as 0
            < 5 g - express to nearest .5g increment
            ≥5 g - express to nearest 1 g increment
            */
            if (value < .5) {
                value = 0;
            }
            else if (value < 5) {
                value = RoundDecimal(value, .5);
            }
            else {
                value = RoundDecimal(value, 1);
            }

            break;
        case "KEY_Saturated_Fat":
            /* SATURATED FAT
            < .5 g - express as 0
            < 5 g - express to nearest .5g increment
            ≥5 g - express to nearest 1 g increment
            */
            if (value < .5) {
                value = 0;
            }
            else if (value < 5) {
                value = RoundDecimal(value, .5);
            }
            else {
                value = RoundDecimal(value, 1);
            }

            break;
        case "KEY_Trans_Fat":
            /* TRANS FAT
            < .5 g - express as 0
            < 5 g - express to nearest .5g increment
            ≥5 g - express to nearest 1 g increment
            */
            if (value < .5) {
                value = 0;
            }
            else if (value < 5) {
                value = RoundDecimal(value, .5);
            }
            else {
                value = RoundDecimal(value, 1);
            }

            break;
        case "KEY_Cholesterol":
            /* CHOLESTEROL
            < 2 mg - express as 0
            2 - 5 mg - express as "less than 5 mg"
            > 5 mg - express to nearest 5 mg increment
            */
            if (value < 2) {
                value = 0;
            }
            else if (value >= 2 && value <= 5) {
                value = RoundDecimal(value, 1);
            }
            else {
                value = RoundDecimal(value, 5);
            }

            break;
        case "KEY_Sodium":
            /* SODIUM
            < 5 mg - express as 0
            5 - 140 mg - express to nearest 5 mg increment
            > 140 mg - express to nearest 10 mg increment
            */
            if (value < 5) {
                value = 0;
            }
            else if (value >= 5 && value <= 140) {
                value = RoundDecimal(value, 5);
            }
            else {
                value = RoundDecimal(value, 10);
            }

            break;
        case "KEY_Carbohydrates":
            /* CARBS
            < .5 g - express as 0
            < 1 g - express as "Contains less than 1 g" or "less than 1 g"
            ≥1 g - express to nearest 1 g increment
            */
            if (value < .5) {
                value = 0;
            }
            else if (value < 1) {
                value = RoundDecimal(value, .1);
            }
            else {
                value = RoundDecimal(value, 1);
            }

            break;
        case "KEY_Sugar":
            /* SUGAR
            < .5 g - express as 0 
            < 1 g - express as "Contains less than 1 g" or "less than 1 g"
            ≥1 g - express to nearest 1 g increment
            */
            if (value < .5) {
                value = 0;
            }
            else if (value < 1) {
                value = RoundDecimal(value, .1);
            } else {
                value = RoundDecimal(value, 1);
            }

            break;
        case "KEY_Protein":
            /* PROTEIN
            < .5 g - express as 0 
            < 1 g - express as "Contains less than 1 g" or "less than 1 g" or to 1 g if .5 g to < 1 g
            ≥1 g - express to nearest 1 g increment
            */
            if (value < .5) {
                value = 0;
            }
            else if (value < 1) {
                value = RoundDecimal(value, .1);
            }
            else {
                value = RoundDecimal(value, 1);
            }

            break;
    }

    return value;
    //    return result;
}