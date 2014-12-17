BK.mymeal = {

    jsonData: null,

    Save: function (callback) {

        data = {
            'items': [],
            'itemsCount': 0,
            'nutritionTotals': null,
            'allergenTotals': null,
            'measure': []
        };

        items = BK.menuNutritionModel.meal.getItems();
        data.itemsCount = items.length;
        data.nutritionTotals = BK.menuNutritionModel.meal.getMealNutritionTotals();
        data.allergenTotals = BK.menuNutritionModel.meal.getAllergenTotals();

        if (items.length <= 0 || !items || typeof items == 'undefined') {
            //console.log("not have item");
            return;
        }

        for (i = 0; i < items.length; i++) {
            data.items.push({
                'name': encodeURI(items[i].displayTitle),
                'calories': items[i].getNutritionTotals()[CONTENT.nutritionName["KEY_Calories"]]
            });
        }

        for (key in CONTENT.nutritionName) {
            var measure = '{ "' + CONTENT.nutritionName[key] + '" : "' + items[0].findMeasure(CONTENT.nutritionName[key]) + '" }';
            data.measure.push($.parseJSON(measure));
        }


        /*
        $.getJSON('/mymeal.json', { 'mealdata': JSON.stringify(data) }, function (json) {
        if (callback)
        callback(json);
        });
        */

        //console.log(JSON.stringify(data));

        $.ajax({
            type: 'POST',
            url: '/mymeal.json',
            dataType: 'json',
            success: function (json) {
                if (callback)
                    callback(json);
            },
            data: { 'mealdata': JSON.stringify(data) },
            async: false
        });
    },

    Generate: function () {

        var json = BK.mymeal.jsonData;

        $("#menu-my-meal-fancybox").clone().prependTo("#tmp-menu-my-meal-fancybox").each(function () {

            // hide header
            $(this).find("#mymeal-print").hide();
            $(this).find("#mymeal-social").hide();

            // query items                    
            var tbody = $(this).find("#mymeal-table tbody");
            tbody.empty();

            var row = "";
            var totalCal = 0;
            for (i = 0; i < json.itemsCount; i++) {


                var itemName = $("<div style='float:left; font-weight: bold; padding-left: 10px;'>").append(decodeURI(json.items[i].name));
                var clear = $("<div class='clear'>");
                var div = $("<div>");
                div.append(itemName);
                div.append(clear);

                var cal = BK.menuNutritionModel.roundValue("KEY_Calories", json.items[i].calories);
                totalCal += cal;

                row = $("<tr>").attr("id", "item" + i)
                            .append($("<td>").css("border-left", "none").append(div))
                            .append($("<td>").css("border-right", "none").html(cal));

                tbody.append(row);
            }

            var totalText = $("#total-text").html();

            var lastTDleft = $("<td style='font-weight:bold; text-align: right; color: #736357'>").css({
                "border-left": "none",
                "border-bottom": "none"
            }).append(totalText);

            var lastTDright = $("<td style='font-weight:bold;'>").css({
                "border-right": "none",
                "border-bottom": "none"
            }).html(totalCal);

            row = $("<tr>").append(lastTDleft).append(lastTDright);
            tbody.append(row);

            //query total nutrition
            var nutritionData = $(this).find("#total-nutrition-data");
            nutritionData.empty();
            var count = 0;
            for (key in json.nutritionTotals) {
                var nutriKey = getKeyByValue(CONTENT.nutritionName, key);
                if ($.inArray(nutriKey, CONTENT.nutritionNameNotShown) != -1)
                    continue;

                var newValue = BK.menuNutritionModel.roundValue(nutriKey, json.nutritionTotals[key]);

                keyMeasure = "";

                for (o in json.measure) {
                    tempKey = eval('json.measure[o]["' + key + '"]');
                    if (tempKey)
                        keyMeasure = tempKey;
                }


                var wrap = $("<div class='static-nutri-item'>");
                var name = $("<div class='static-nutri-name'>").html(key);
                var value = $("<div class='static-nutri-value'>").html(newValue + "" + keyMeasure);


                wrap.append(name);
                wrap.append(value);

                if (nutriKey == "KEY_Calories" && newValue < 650) {
                    wrap.append($("<div>").attr("id", "under650calories"));
                }

                nutritionData.append(wrap);
                count++;
            }

            nutritionData.children(":nth-child(odd)").addClass("nutri-left");
            nutritionData.children(":nth-child(even)").addClass("nutri-right");
            var length = nutritionData.children().length;
            if (length % 2 == 0) {
                nutritionData.children(":nth-child(" + length + ")").css("border-bottom", "none");
                nutritionData.children(":nth-child(" + (length - 1) + ")").css("border-bottom", "none");
            } else {
                nutritionData.children(":nth-child(" + length + ")").css("border-bottom", "none");
            }
            nutritionData.append($("<div>").addClass("clear"));

            //allergens data
            var allergensData = $(this).find("#total-allergens-data");
            allergensData.empty();

            var allergensName = $(".allergens-data").html();

            var allergenHTML = $("<div class='allergens'>").html("<strong>" + allergensName + "</strong> " + json.allergenTotals);
            allergensData.append(allergenHTML);

            $(this).find("#mymeal-total-nutrition").show();

        });
    },

    Load: function (id, callback) {
        if (!id)
            return;

        //console.log(id);

        $.getJSON('/mymeal.json', { 'mymeal': id }, function (json) {
            BK.mymeal.jsonData = json;
            BK.mymeal.Generate();

            //console.log("gen");

            if (json.itemsCount && json.itemsCount > 0) {
                if (callback)
                    callback();
            }
        });
    },

    Init: function () {
        var mymeal = getParameterByName("mymeal");
        BK.mymeal.Load(mymeal, function () {
            $('a#lnkMymeal').trigger('click');
        });
    }
}