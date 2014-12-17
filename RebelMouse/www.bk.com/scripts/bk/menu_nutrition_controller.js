// BK namespace
var BK = BK || {};

// The controller
BK.menuNutritionController = function () {
    var meal = BK.menuNutritionModel.meal;
    var html = BK.menuNutritionView.Html;


    var moreLessValue = false;

    function displayItem(menuItem, ignoreCurrentCategory) {
        meal.setCurrentItem(menuItem);
        meal.clearLastIndexAdded();
        html.displaySelectedItem(meal.getCurrentItem(), ignoreCurrentCategory);
        //        if (!meal.canAddItem() && !isInMeal) {
        //            html.displayMealLimitMessage(meal.getCurrentItem().sandwich);
        //        }
    }

    return {
        onInit: function (linkArray, itemArray, quantityArray) {
            var loadedCount = 0;

            var mymealRequest = function () {
                if (BK.mymeal) {
                    BK.mymeal.Init();
                }
            }

            var itemLoaded = function (menuItem) {

                var idArray = itemArray[loadedCount].split(';');
                var qtyArray = quantityArray[loadedCount].split(';');

                menuItem.updateIngredients(idArray, qtyArray);
                meal.addMenuItem(menuItem);

                loadedCount++;

                if (loadedCount == linkArray.length) {
                    html.updateMeal(meal, function () {
                        mymealRequest();
                    });

                    //                    if (!BK.menuNutritionView.Flash.mealBuilder()) {
                    //                        BK.menuNutritionView.Html.hideViewYourMealButton();
                    //                    }
                    //                    else {
                    //                        BK.menuNutritionView.Html.showViewYourMealButton();
                    //                    }
                }
            };

            if (linkArray.length > 0) {
                for (var i = 0; i < linkArray.length; i++) {
                    if (linkArray[i] != "") {
                        var link = linkArray[i].split(';')[0];
                        var cat_id = linkArray[i].split(';')[1];
                        var subcat_id = linkArray[i].split(';')[2];

                        BK.menuNutritionModel.menuItem.loadNonAjax(link, cat_id, subcat_id, itemLoaded);
                    }
                }
                html.showDialog();
            } else {
                html.hideViewYourMealButton();
                html.updateMeal(meal);
                mymealRequest();
            }
        },

        onUpdateMeal: function () {


            html.updateMeal(meal);
        },

        onMenuItemSelect: function (xmlLink, isupdate) {
            var itemLoaded = function (menuItem) {

                //              if (isupdate) {//upd size/quantity controls
                //                  displayItem(menuItem, false);
                //              } else {
                //                  displayItem(menuItem);
                //              }

                displayItem(menuItem, false);

                var currentItem = meal.getCurrentItem();
                if (currentItem.sandwich)
                    track_select_value_meal(currentItem.displayTitle);
                else
                    track_menu_item_select(currentItem.displayTitle)

            };

            BK.menuNutritionModel.loadItem(xmlLink, itemLoaded);
        },

        onPageLoadAddBurgerBuilder: function (xmlLink) {

        },

        onMealItemSelect: function (itemId) {

            html.setUpdateItemState();
            html.clearUpdated();

            // For unmatch category.. among current cat, and seleted item in my meal
            displayItem(itemId, false);



        },

        onAddIngredient: function (ingredientId) {


            var currentItem = meal.getCurrentItem();
            currentItem.addIngredient(ingredientId);

            html.updateIngredients(currentItem, ingredientId);



            if (currentItem) {
                if (currentItem.sandwich) {
                    track_value_meal_sandwich_add_ingredient(currentItem.sandwich.ingredients[ingredientId].displayTitle, 'Add');
                } else {
                    track_value_meal_sandwich_add_ingredient(currentItem.ingredients[ingredientId].displayTitle, 'Add');
                }
            }

        },
        onResetAllIngredients: function () {
            var currentItem = meal.getCurrentItem();
            currentItem.resetAllIngredients();
            html.updateAllIngredients(currentItem);
        },
        onSubtractIngredient: function (ingredientId) {

            var currentItem = meal.getCurrentItem();
            currentItem.subtractIngredient(ingredientId);

            html.updateIngredients(currentItem, ingredientId);

            if (currentItem) {
                if (currentItem.sandwich) {
                    track_value_meal_sandwich_add_ingredient(currentItem.sandwich.ingredients[ingredientId].displayTitle, 'Subtract');
                } else {
                    track_value_meal_sandwich_add_ingredient(currentItem.ingredients[ingredientId].displayTitle, 'Subtract');
                }
            }

        },

        onAddItemToMeal: function (cat_id, subcat_id) {
            var currentItem = meal.getCurrentItem();
            //alert("select currentItem: " + currentItem.id + "|" + currentItem.displayTitle);

            if (meal.canAddItem()) {

                meal.addCurrentItem(cat_id, subcat_id);

                html.addUpdateMealItem(meal);
                html.showViewYourMealButton();

                if (currentItem.sandwich)
                    track_add_to_meal(currentItem.sandwich.displayTitle);
                else
                    track_add_to_meal(currentItem.displayTitle);

            }
            else {
                html.displayMealLimitMessage(currentItem.sandwich);
            }
        },

        onShowMyMeal: function (itemLoaded) {

            // itemLoaded(meal.getItems());
        },

        onRemoveItemFromMeal: function (itemId) {
            html.clearUpdated();

            meal.removeItem(itemId);
            html.updateMeal(meal);
        },

        onUpdateItem: function (index) {
            //            meal.currentItemId = index;
            meal.updateCurrentItemByIndex(index);
            html.addUpdateMealItem(meal);
        },

        onMealValueMealOptionsSelect: function () {
            var currentItem = meal.getCurrentItem();
            if (currentItem) {
                if (currentItem.sandwich) {
                    track_customize_meal_tab(currentItem.displayTitle);
                }
            }
        },

        onMealValueMealSandwichSelect: function () {
            var currentItem = meal.getCurrentItem();
            if (currentItem) {
                if (currentItem.sandwich) {
                    track_customize_sandwich_tab(currentItem.sandwich.displayTitle);
                }
            }
        },

        onResizeValueMeal: function (valueMealId, detailsUrl) {

            var resized = function (valueMeal) {
                html.updateValueMealSize(valueMeal);

            };

            meal.getCurrentItem().resize(valueMealId, detailsUrl, resized);
        },

        onChangeValueMealSide: function (sideId) {

            var currentItem = meal.getCurrentItem();
            currentItem.changeSide(sideId);
            html.updateValueMealSideDrink(currentItem);

            track_value_meal_change_side(currentItem.sandwich.displayTitle, currentItem.currentSide.displayTitle);
        },

        onChangeValueMealDrink: function (drinkId) {

            var currentItem = meal.getCurrentItem();
            currentItem.changeDrink(drinkId);
            html.updateValueMealSideDrink(currentItem);

            track_value_meal_change_drink(currentItem.sandwich.displayTitle, currentItem.currentDrink.displayTitle);
        },

        onValueMealMoreLessClick: function (moreLess) {
            var currentItem = meal.getCurrentItem();
            if (currentItem.sandwich) {
                track_value_meal_description_more_collapse(currentItem.sandwich.displayTitle, moreLess);
            }
        },

        onPrintMeal: function () {
            var currentItem = meal.getCurrentItem();
            if (currentItem.sandwich) {
                track_print_your_meal_vm();
            }
            else {
                track_print_meal();
            }
        },

        onLogChangeValueMealSize: function (newSize) {
            var currentItem = meal.getCurrentItem();
            if (currentItem.sandwich) {
                track_value_meal_change_size(currentItem.sandwich.displayTitle, newSize);
            }
        },

        onValueMealCarouselClick: function (direction) {
            var currentItem = meal.getCurrentItem();
            if (currentItem.sandwich) {
                track_value_meal_left_right_arrow_click(currentItem.sandwich.displayTitle, direction);
            }
        },

        onLoadViewMyMeal: function () {

        },

        onRemoveMenuItemInFocus: function () {

        },

        getCurrentMenuItem: function () {
            return meal.getCurrentItem();
        }
    }
} ();

