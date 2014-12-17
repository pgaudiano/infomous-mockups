#!/bin/bash
#
# Refreshes the Apache caches for the four basic widgets, not including full cloud nor focused, etc. variants. 
# Nor of course the backend caches - restart the Java backend for that. 


refresh() {
wget -q -O - --header=Cache-control:no-cache "$1" | gunzip | tee data_$2.tmp | grep '<source' | wc -l
}

for i in 1 7 14 30
do
    echo -n Refreshing "$i day(s)..."
    url="http://www0.infomous.com/site/economist/proxy.php?type=rss&url=void&maxWords=24&linkageThreshold=1&textOption=TITLE_ONLY&fromDaysBack=${i}&toDaysBack=0"
    count=`refresh "$url" "$i"`
    echo " found $count sources."
    echo -n Refreshing "$i day(s), full cloud ... "
    url="http://www0.infomous.com/site/economist/proxy.php?type=rss&url=void&maxWords=50&linkageThreshold=1&textOption=TITLE_ONLY&dict=NOUN|1,VERB|1,ADJECTIVE|0,ADVERB|0,NUMBER|0,OTHER|1&fromDaysBack=${i}&toDaysBack=0"
    count=`refresh "$url" "$i-full"`
    echo " found $count sources."
done


