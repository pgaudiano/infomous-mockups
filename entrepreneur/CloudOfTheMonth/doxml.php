<?php

$days = array ("Mon","Tue","Wed","Thu","Fri","Sat","Sun"); 

for ($i=0; $i<30; $i++) {
print ('
<item>
        <title>The Top News of the Month, brought to you by GEICO</title>
        <link>http://www.infomous.com/site/client/USAT/CloudOfTheMonth/</link>
        <author>Anonymous</author>
        <pubDate>'.$days[$i%7].', '.($i+1).' Apr 13 10:55:05 +0000</pubDate>
</item>

');
}

?>