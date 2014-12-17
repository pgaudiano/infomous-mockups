#!/bin/bash

id='economist';
out='economist_cloud.js';

#html
cd client/deploy
perl jsPacker.pl -i ../../$id.html -o ../../$id.html.min
cd ../..
sed "s/'/\\\'/g" $id.html.min > tmp && mv tmp $id.html.min
/bin/echo -n "document.write('" | cat - $id.html.min > tmp && mv tmp $id.html.min
/bin/echo -n $(cat $id.html.min) > tmp && mv tmp $id.html.min
/bin/echo "');" >> $id.html.min

#css
java -jar client/deploy/yuicompressor-2.4.7.jar --type css -o $id.css.min $id.css
sed "s/'/\\\'/g" $id.css.min > tmp && mv tmp $id.css.min
#/bin/echo -n "document.write('<style type=text/css>" | cat - $id.css.min > tmp && mv tmp $id.css.min
/bin/echo -n "document.write('<script>(function() { var div = document.createElement(\'div\'); div.innerHTML = \'<p></p><style type=text/css>" | cat - $id.css.min > tmp && mv tmp $id.css.min
/bin/echo -n $(cat $id.css.min) > tmp && mv tmp $id.css.min
#/bin/echo "</style>');" >> $id.css.min
/bin/echo "</style>\'; document.getElementsByTagName(\'head\')[0].appendChild(div.childNodes[1]); })(); </script> ');" >> $id.css.min

#js
java -jar client/deploy/yuicompressor-2.4.7.jar --type js -o $id.js.min $id.js
sed "s/'/\\\'/g" $id.js.min > tmp && mv tmp $id.js.min
/bin/echo -n "document.write('<script>" | cat - $id.js.min > tmp && mv tmp $id.js.min
/bin/echo -n $(cat $id.js.min) > tmp && mv tmp $id.js.min
/bin/echo "</script>');" >> $id.js.min

#end
cat $id.css.min $id.html.min $id.js.min > $out
rm $id.css.min $id.html.min $id.js.min

