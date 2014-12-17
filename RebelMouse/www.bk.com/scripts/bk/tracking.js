// WebTrends tracking for print meal clicks

/** BEGIN : Fresh Offer Tracking **/
function track_fresh_offer_movingbox(strSite) {
  try {
    pageTracker._trackEvent(CulturePrefix + 'fresh_offer', 'fresh_offer_moving_box', 'fresh_offer/' + strSite);
  }
  catch (e) { }
  return true;
}
/** END : Fresh Offer Tracking **/

/** BEGIN : Share Tracking **/
function track_share(strSite) {
  try {
    pageTracker._trackEvent(CulturePrefix + 'share', 'share', 'share/' + strSite);
  }
  catch (e) { }
  return true;
}
/** END : Share Tracking **/

/** BEGIN : Menu And Nutrition Tracking **/
function track_print_meal() {
  try {
    //dcsMultiTrack('DCS.dcsuri', CulturePrefix + 'menu-nutrition/print-meal', 'WT.ti', 'BURGER KING® – Menu and Nutrition:print meal');
    pageTracker._trackEvent(CulturePrefix + 'build_meal', 'print_meal', 'bam/print_meal');
  }
  catch (e) { }
  return true;
}

// Tracking calls for meal view sharing
/*function track_meal_view_share(strSite) {
  try {
    pageTracker._trackEvent(CulturePrefix + 'build_meal', 'share_meal', 'bam/share_meal/' + strSite);
  }
  catch (e) { }
  return true;
}*/

// BKMAIN-262: Incrementing of the "select" number is required upon every selection
var int_MI_VM_SelectCount = 1;
// WebTrends tracking menu item selections
function track_menu_item_select(strMenuItemTitle) {
  strMenuItemTitle = remove_reg_tm(strMenuItemTitle);
  try {
    //dcsMultiTrack('DCS.dcsuri', CulturePrefix + 'menu-nutrition/select-an-item-' + intMenuItemSelectCount, 'WT.ti', 'BURGER KING – Menu and Nutrition:select an item-' + intMenuItemSelectCount, 'DCSext.menu_item', strMenuItemTitle);
    pageTracker._trackEvent(CulturePrefix + 'build_meal', 'select' + int_MI_VM_SelectCount, 'bam/select' + int_MI_VM_SelectCount + '/' + strMenuItemTitle);
  }
  catch (e) { }
  int_MI_VM_SelectCount++;
  return true;
}

// WebTrends tracking ingredient configuration
var intIngredientConfigCount = 1;

function track_ingredient_config(strMenuItemTitle, strIngredientTitle, strAddSub) {
  strMenuItemTitle = remove_reg_tm(strMenuItemTitle);
  strIngredientTitle = remove_reg_tm(strIngredientTitle);
  try {
    //dcsMultiTrack('DCS.dcsuri', CulturePrefix + 'menu-nutrition/customize-item-' + intIngredientConfigCount, 'WT.ti', 'BURGER KING – Menu and Nutrition:customize an item-' + intIngredientConfigCount, 'DCSext.menu_item', strMenuItemTitle + ' : ' + strIngredientTitle + ' : ' + strAddSub);
    pageTracker._trackEvent(CulturePrefix + 'build_meal', 'customize' + intIngredientConfigCount, 'bam/customize' + intIngredientConfigCount + '/' + strMenuItemTitle + ' : ' + strIngredientTitle + ' : ' + strAddSub);
  }
  catch (e) { }
  intIngredientConfigCount++;
  return true;
}

// WebTrends tracking more ingredient expanding
var intMoreExpandCount = 1;

function track_more_expand(strMenuItemTitle, strMoreLess) {
  strMenuItemTitle = remove_reg_tm(strMenuItemTitle);
  try {
    //dcsMultiTrack('DCS.dcsuri', CulturePrefix + 'menu-nutrition/customize-more-' + intMoreExpandCount, 'WT.ti', 'BURGER KING – Menu and Nutrition:customize more-' + intMoreExpandCount, 'DCSext.menu_item', strMenuItemTitle + ' : ' + strMoreLess);
    pageTracker._trackEvent(CulturePrefix + 'build_meal', 'customize-more' + intMoreExpandCount, 'bam/customize-more' + intMoreExpandCount + '/' + strMenuItemTitle + ' : ' + strMoreLess);
  }
  catch (e) { }
  intMoreExpandCount++;
  return true;
}

// value meal tracking
function track_select_value_meal(strValueMealName) {
  strValueMealName = remove_reg_tm(strValueMealName);
  try {
    pageTracker._trackEvent(CulturePrefix + 'build_meal', 'select' + int_MI_VM_SelectCount, 'bam/select' + int_MI_VM_SelectCount + '/valuemeal/' + strValueMealName);
  }
  catch (e) { }
  int_MI_VM_SelectCount++;
  return true;
}

var intValueMealCustomizationCount = 1;
function track_customize_meal_tab(strValueMealName) {
  strValueMealName = remove_reg_tm(strValueMealName);
  try {
    pageTracker._trackEvent(CulturePrefix + 'build_meal', 'customize' + intValueMealCustomizationCount, 'valuemeal: ' + strValueMealName + ': Customize Meal');
  }
  catch (e) { }
  intValueMealCustomizationCount++;
  return true;
}

// WebTrends tracking for add to meal clicks
function track_add_to_meal(strSandwichName) {
  //alert("tracking add to meal: "+ strSandwichName);
  strSandwichName = remove_reg_tm(strSandwichName);
  try {
    pageTracker._trackEvent(CulturePrefix + 'build_meal', 'add' + intValueMealCustomizationCount, 'bam/addintAddToMealCount/valuemeal/' + strSandwichName);
  }
  catch (e) { }
  return true;
}

function track_print_your_meal_vm() {
  try {
    pageTracker._trackEvent(CulturePrefix + 'build_meal', 'add' + intValueMealCustomizationCount, 'bam/print_meal/valuemeal');
  }
  catch (e) { }
  return true;
}

function track_customize_sandwich_tab(strSandwichName) {
  strSandwichName = remove_reg_tm(strSandwichName);
  try {
    pageTracker._trackEvent(CulturePrefix + 'build_meal', 'customize' + intValueMealCustomizationCount, 'valuemeal : ' + strSandwichName + ' : Customize Sandwich');
  }
  catch (e) { }
  intValueMealCustomizationCount++;
  return true;
}

function track_value_meal_change_size(strSandwichName, strMealSize) {
  strSandwichName = remove_reg_tm(strSandwichName);
  strMealSize = remove_reg_tm(strMealSize);
  try {
    pageTracker._trackEvent(CulturePrefix + 'build_meal', 'customize' + intValueMealCustomizationCount, 'valuemeal : ' + strSandwichName + ' : Size: ' + strMealSize);
  }
  catch (e) { }
  intValueMealCustomizationCount++;
  return true;
}

function track_value_meal_change_drink(strSandwichName, strDrinkName) {
  strSandwichName = remove_reg_tm(strSandwichName);
  strDrinkName = remove_reg_tm(strDrinkName);
  try {
    pageTracker._trackEvent(CulturePrefix + 'build_meal', 'customize' + intValueMealCustomizationCount, 'valuemeal : ' + strSandwichName + ' : Drink: ' + strDrinkName);
  }
  catch (e) { }
  intValueMealCustomizationCount++;
  return true;
}

function track_value_meal_change_side(strSandwichName, strSideName) {
  strSandwichName = remove_reg_tm(strSandwichName);
  strSideName = remove_reg_tm(strSideName);
  try {
    pageTracker._trackEvent(CulturePrefix + 'build_meal', 'customize' + intValueMealCustomizationCount, 'valuemeal : ' + strSandwichName + ' : Side : ' + strSideName);
  }
  catch (e) { }
  intValueMealCustomizationCount++;
  return true;
}

function track_value_meal_left_right_arrow_click(strSandwichName, strArrowDirection) {
  strSandwichName = remove_reg_tm(strSandwichName);
  try {
    pageTracker._trackEvent(CulturePrefix + 'build_meal', 'customize' + intValueMealCustomizationCount, 'bam/customize-more' + intValueMealCustomizationCount + '/valuemeal/' + strSandwichName + ' : ' + strArrowDirection);
  }
  catch (e) { }
  return true;
}

function track_value_meal_sandwich_add_ingredient(strSandwichName, strAddOrSubtract) {
  strSandwichName = remove_reg_tm(strSandwichName);
  //strIngredientName = remove_reg_tm(strIngredientName);
  try {
    pageTracker._trackEvent(CulturePrefix + 'build_meal', 'customize' + intValueMealCustomizationCount, 'bam/customize' + intValueMealCustomizationCount + '/valuemeal/' + strSandwichName + ' : ' + strAddOrSubtract);
  }
  catch (e) { }
  intValueMealCustomizationCount++;
  return true;
}

function track_value_meal_description_more_collapse(strSandwichName, strMoreCollapse) {
  strSandwichName = remove_reg_tm(strSandwichName);
  try {
    pageTracker._trackEvent(CulturePrefix + 'build_meal', 'customize' + intValueMealCustomizationCount, 'valuemeal : ' + strSandwichName + ' : Description: ' + strMoreCollapse);
  }
  catch (e) { }
  return true;
}

function track_lower_calorie_suggestion(actionEvent, actionDescription) {
  try {
    pageTracker._trackEvent(CulturePrefix + 'build_meal', actionEvent, actionDescription);
  }
  catch (e) { }
  return true;
}

/** END : Menu And Nutrition Tracking **/


function remove_reg_tm(strVal) {
  strVal = strVal.replace('®', '');
  strVal = strVal.replace('™', '');
  return strVal;
}