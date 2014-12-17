#!/bin/bash
#
# Refreshes the Apache caches for the four basic widgets, not including full cloud nor focused, etc. variants. 
# Nor of course the backend caches - restart the Java backend for that. 

case "x$1" in 
    x) 
	echo "Usage: $0 my-hostname" 1>&2
	echo "Example: $0 ec2-107-22-126-82.compute-1.amazonaws.com" 1>&2
	exit 1;;
esac

refresh() {
wget -q -O - "$1" | gunzip | grep '<word ' | sed 's/^.*text="//' | sed 's/".*$//' | sort > /tmp/new
if test -f /tmp/compare
then 
    echo "---($2)--- $1"
    comm -13 /tmp/compare /tmp/new
    if diff -q /tmp/compare /tmp/new > /dev/null
    then 
	echo "WARNING! dup at $2 days" 
    fi
fi
cp /tmp/new tmps_$2.tmp
cp /tmp/new /tmp/compare
#awk '{x = x " " $0} END {print x}' /tmp/new
}

echo 'Compare clouds: You should see at least one word under each of the labels 7, 14 & 30. 
The words shown are words appearing in n-day cloud that do not appear in the previous cloud, meaning they are different'

export host="$1"
rm /tmp/compare
for i in 1 7 14 30
do
    #url="http://www0.infomous.com/site/economist/proxy.php?type=rss&url=void&maxWords=24&linkageThreshold=1&textOption=TITLE_ONLY&fromDaysBack=${i}&toDaysBack=0"
    url="http://$host/site/economist/proxy.php?maxWords=24&textOption=TITLE%5FONLY&type=rss&linkageThreshold=1&dict=NOUN%7C1%2CVERB%7C1%2CADJECTIVE%7C1%2CADVERB%7C1%2CNUMBER%7C1%2COTHER%7C1&fromDaysBack=${i}&clientVersion=52359&toDaysBack=0"
    refresh "$url" "$i"
done


