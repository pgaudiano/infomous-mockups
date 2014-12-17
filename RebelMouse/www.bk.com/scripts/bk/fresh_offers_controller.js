// BK namespace
var BK = BK || {};

// The controller
BK.FreshOffersController = function () {
    var arrLoadCallbacks = [];
    var promotionItems = null;

    function loadPromotionData() {
        if (promotionItems == null) {
            reloadPromotionData();
        }
    }

    function reloadPromotionData() {
        $.ajax({
            url: '/cms' + CulturePrefix + 'cms_out/promotion/promotion_full.xml',
            datatype: 'xml',
            type: 'get',
            success: function (data) {
                promotionItems =
                        $(data).find('PromotionItem')
                               .map(function () {
                                   return new BK.FreshOffersModel.PromotionItem($(this));
                               });

                triggerLoadCallbacks();
            }
        });
    }

    function triggerLoadCallbacks() {
        $.each(arrLoadCallbacks, function (index, callback) {
            callback(promotionItems);
        });
    }

    return {
        loadData: function () {
            loadPromotionData();
        },
        getData: function () {
            return promotionItems;
        },
        registerLoadCallback: function (callback) {
            if (promotionItems != null) {
                callback(promotionItems);
            }

            if ($.inArray(callback, arrLoadCallbacks) < 0) {
                arrLoadCallbacks.push(callback);
            }
        }
    }
} ();
