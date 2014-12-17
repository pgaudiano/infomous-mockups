String.prototype.startsWith = function (str) {
    return this.slice(0, str.length) == str;
};

String.prototype.endsWith = function (str) {
    return this.slice(-str.length) == str;
};

String.prototype.contains = function (str) {
    return this.indexOf(str) != -1;
};

function htmlEncode(value) {
    return $('<div/>').text(value).html();
}

function htmlDecode(value) {
    return $('<div/>').html(value).text();
}

function makeSameHeight(elems) {
    var maxHeight = 0;
    elems.each(function () { if (typeof ($.data(this, 'origheight')) == 'undefined') { $.data(this, 'origheight', this.style.height); } });
    elems.each(function () { this.style.height = $.data(this, 'origheight'); });
    elems.each(function () { maxHeight = Math.max(maxHeight, $(this).outerHeight()); });
    elems.each(function () { $(this).height($(this).height() + (maxHeight - $(this).outerHeight())); });
}

// Support deep copy with recursion
// Not support Date,Array data type
function cloneObject(obj) {
    
    var clone = {};
    for (var i in obj) {
        if (typeof (obj[i]) == "object")
            clone[i] = this.cloneObject(obj[i]);
        else
            clone[i] = obj[i];
    }
    return clone;
}

function doRoundDecimal (decValue, decNearest) {
    //var decRounded = decValue % decNearest;
    //return (decRounded < (decNearest / 2)) ? decValue - decRounded : decValue + (decNearest - decRounded);
    return Math.round(decValue * (1 / decNearest)) / (1 / decNearest);
}

// get the text dimension of text, with specify font style
function getTextDimension(fontFamily, fontSize, fontWeight, text) {
    var h = 0, w = 0;

    var div = document.createElement('div');
    document.body.appendChild(div);


    $(div).css({
        position: 'absolute',
        left: -1000,
        top: -1000,
        display: 'none'
    });

    $(div).css("font-family", fontFamily);
    $(div).css("font-size", fontSize);
    $(div).css("font-weight", fontWeight);

    $(div).html(text);



    h = $(div).height();
    w = $(div).width();

    $(div).remove();

    var ret = {
        height: h,
        width: w
    };

    return ret;
}

// get the smallest dimension of text, with specified font style
function roundTextDimension(fontFamily, fontSize, lineHeight, el, cat_id) {
    var h = 0, w = 0;

    var div = document.createElement('div');
    document.body.appendChild(div);
    //    $(div).css({
    //        position: 'absolute',
    //        left: -1000,
    //        top: -1000,
    //        display: 'none'
    //    });


        $(div).css({
            position: 'absolute',
            left: -1000,
            top: -1000,
            'word-wrap': 'break-word',
            display: 'none'
        });

    $(div).css("font-family", fontFamily);
    $(div).css("font-size", fontSize);
    $(div).css("line-height", lineHeight);
    $(div).html($(el).html());

//    h = $(div).outerHeight();
//    w = $(div).outerWidth();

    h = $(div).height();
    w = $(div).width();

    var count = 0;
    var prevH = 0;
    var text = $(el).text();

    var MaxTextLength = 12;
    switch (numLinesMode)
    {
        case CONST_SINGLE_LINE:
        {

        }
        break;
    case CONST_DOUBLE_LINE:
        {
            // SUBHC: Special case for Lunch and dinner menu ... 
            if (cat_id == 201) {
                MaxTextLength = 30;
            } else if (cat_id == 202) {
                MaxTextLength = 1;
            } else if (cat_id == 263) {
                MaxTextLength = 30;
            } else if (cat_id == 264) {
                MaxTextLength = 1;
            }

            while (true) {

                // dont round short strings, string that has no space
                if (text.length < MaxTextLength || text.indexOf(" ") == -1)
                    break;


                count++;
                $(div).css("width", w - count);

                if (count > 1)
                    prevH = h;

                h = $(div).height();
                //                    if (text.indexOf("Salad") != -1 || text.indexOf("Flame") != -1)
                //                        print("h", prevH + "|" + h + "|" + (w - count));

                // new line addition detected
                if (h != prevH && $.inArray(Math.abs(h - prevH), singleLineHArray) != -1) {
                    // get w at prevH
                    w = (w - count) + 1;
                    break;
                }

                // timeout case
                if (count > 200)
                    break;

            }
        }
        break;
    }

    var rawW = w;
    // SUBHC
    if (cat_id == 201) {
        w = w + 14;
    } else if (cat_id == 202) {

        if ($.browser.msie && $.browser.version == "7.0")
            w = w + 10;
        else
            w = w + 12;

    } else if (cat_id == 203) {
        // 10 + 10 .. left and right besides 'text' div
        w = w + 20;
    } else if (cat_id == 263) {
        w = w + 14;
    } else if (cat_id == 264) {

        if ($.browser.msie && $.browser.version == "7.0")
            w = w + 10;
        else
            w = w + 12;

    } else if (cat_id == 265) {

        w = w + 14;
    }
    
//    if (text == "Lunch &amp; Dinner Combo Meals")
//        print("val", text+"|"+w);

    $(div).remove();

    var ret = {
        height: h,
        width: w,
        rawWidth: rawW
    };

    return ret;
}

function getKeyByValue(arr, _value) {

    for (var key in arr) {
        var value = arr[key];
        if (value == _value)
            return key;
    }

    return "";
}

function toSeoFriendly(s) {

    s = s.toLowerCase();
    s = s.replace("&amp;", " and ").replace("&", " and ");
    s = s.replace(/<(?:.|\n)*?>/gm, ''); // strip html tag .displayTitle.replace(/<(.|\n)*?>/g, '');
    s = s.replace(/\W/g, "-");
    s = s.replace(/\-+/g, "-");
    s = trim_chars(s, "-");
    return s;

}

// Trim "-" of string
function trim_chars(str, ch) {

    while (str.substr(0, 1) == ch)
        str = str.substr(1);

    var nrt = str.length;
    while (str.substr(nrt - 1, 1) == ch) {
        str = str.substr(0, nrt - 1);
        nrt = str.length;
    }

    return str;
}

function stripHtml(s) {
    return s.replace(/<\/?[^>]+>/gi, '');
}
