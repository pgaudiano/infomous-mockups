#!/bin/bash

id='src/economist';
out='economist_cloud.js';
debug=false

#Process the arguments
while getopts d opt
do
    case "$opt" in
        d) 
        debug=true
        echo "building in debug mode..."
        ;;
    esac
done

#html
echo "compressing "$id".html"
cd client/deploy
perl jsPacker.pl -i ../../$id.html -o ../../$id.html.min
cd ../..
sed "s/'/\\\'/g" $id.html.min > tmp && mv tmp $id.html.min
/bin/echo -n "document.write('" | cat - $id.html.min > tmp && mv tmp $id.html.min
/bin/echo -n $(cat $id.html.min) > tmp && mv tmp $id.html.min
/bin/echo "');" >> $id.html.min

#css
echo "compressing "$id".css"
java -jar client/deploy/yuicompressor-2.4.7.jar --type css -o $id.css.min $id.css
/bin/echo -n "(function() { var style = document.createElement('style'), css_str = '" | cat - $id.css.min > tmp && mv tmp $id.css.min
/bin/echo -n $(cat $id.css.min) > tmp && mv tmp $id.css.min
/bin/echo "'; document.getElementsByTagName('head')[0].appendChild(style); if (style.styleSheet) style.styleSheet.cssText = css_str; else style.appendChild( document.createTextNode( css_str ) ); })();" >> $id.css.min

#js
if $debug; then
	echo "compressing "$id".js (debug mode)"
    cp $id.js $id.js.min
else
	echo "compressing js..."
    #cat $id"_init.js" $id"_app.js" > $id.js.cat
    java -jar client/deploy/yuicompressor-2.4.7.jar --type js -o $id.js.min $id.js
fi

#end
echo "building "$out
cat $id.css.min $id.html.min $id.js.min > $out
rm $id.css.min $id.html.min $id.js.min
echo "done"

