<?php
include("simple_html_dom.php");

// A few globals
$alltitles = array();
$includePopItemComments = 0;
$debug=0;

// Create DOM from default URL or local file
   if (PHP_SAPI === 'cli') { //Behave differently if invoked from command line
   $infile = file_get_html('http://www.linkedin.com/groups/Women-In-Technology-sponsored-EMC-1001387');
   } else {
   // Or GET the file...
   if (isset($_GET["src"])) {
   $infile = file_get_html($_GET["src"]);
   } else {
   print('Error: please include the URL of a LinkedIn with the call, e.g.:<br>
   <a href="http://www.infomous.com/site/mockups/F2F/index.php?src=http://www.linkedin.com/groups/Succeed-Small-Business-Network-Powered-4733823">http://www.infomous.com/site/mockups/F2F/ligroup.php?src=http://www.linkedin.com/groups/Succeed-Small-Business-Network-Powered-4733823</a>
   <p>Looks like we were invoked by '.PHP_SAPI);

   exit;
   }
   }

// Get the name, URL, and icon of the group
$groupname=$infile->find('div.group-icon img',0)->alt;
$groupurl = ('http://www.linkedin.com'.$infile->find('div.group-icon a',0)->href);
$groupicon=$infile->find('div.group-icon img',0)->src;

dprint("The group name is: $groupname\n");
dprint("The group URL is: $groupurl\n");
dprint("The Icon for the group is at $groupicon\n");

print_RSS_Header($groupname,$groupurl,$groupname);

// Go through the list of carousel items
getCarouselItems($infile);

dprint("\n\n>>> There are now ".sizeof($alltitles)." titles in the array\n\n");
// Now go through the list of popular items
getPopularItems($infile);

print_RSS_footer();

function getCarouselItems($html) {
    global $alltitles;
    $n=0;

    dprint("\n=== There are ".sizeof($html->find('div.carousel-body ul li'))." carousel items ===\n\n");

    foreach($html->find('div.carousel-body ul li') as $popitem)
    {
        $title = $popitem->find('h3 a',0)->title;
         $alltitles[$n] = $title; // Store this so you can avoid dupes in the carousel
         $url = html_entity_decode('http://www.linkedin.com'.$popitem->find('h3 a',0)->href);
         // Remove unnecessary parts of the URL
         if ($cut=strpos($url,'?')) { $url=substr($url,0,$cut); }
         $description = $popitem->find('p.summary',0)->plaintext;
         $author = $popitem->find('a img',0)->alt; 
         $authorAvatar = str_replace("80_80","40_40",$popitem->find('a img',0)->src); 
         $authorFeed = html_entity_decode('http://www.linkedin.com'.$popitem->find('a',0)->href);
         dprint("Carousel item ".++$n." title: $title\n");
         dprint("The author is: $author\n");
         dprint("The author's avatar is: $authorAvatar\n");
         dprint("The author's feed URL is: $authorFeed\n");
         dprint("\n");
         print_RSS_item($title,$url,$description,$author,$authorAvatar,$authorFeed,$n);
         }
    }

function getPopularItems($html) {
    global $alltitles, $includePopItemComments;
    $n=sizeof($alltitles);
    $ndups=0;

    dprint("\n=== There are ".sizeof($html->find('div.popular-item'))." popular items ===\n\n");

    foreach($html->find('div.popular-item') as $popitem)
    {

         $temp=$popitem->find('div.user-contributed h3 a',0);
         if (!$temp) {
            $temp=$popitem->find('div.popular-referenced-item h4 a',0);
             if (!$temp) {
                dprint("\nCould not find a title for item ".($n+1).". Skipping...\n");
                continue;
                }
             }

          $title=$temp->plaintext;

         if (in_array($title,$alltitles)) {
            $ndups++;
             dprint("\nSkipping duplicate item...\n\n");
             continue;
             }
         

         $url=html_entity_decode('http://www.linkedin.com'.$temp->getAttribute('href'));
         // Remove unnecessary parts of the URL
         if ($cut=strpos($url,'?')) { $url=substr($url,0,$cut); }
         $author=$popitem->find('div.popular-entity a img',0)->getAttribute('alt');
         $authorurl=html_entity_decode('http://www.linkedin.com'.$popitem->find('div.popular-entity a',0)->href);
         $description=$title;
         $authorAvatar = str_replace("80_80","40_40",$popitem->find('div.popular-entity a img',0)->src); 
         dprint("\nPopular item ".++$n." title: $title\n");
         dprint("The thread URL is: $url\n"); 
         dprint("The thread author is: $author\n");
         dprint("The author's member feed is: $authorurl\n");
         print_RSS_item($title,$url,$description,$author,$authorAvatar,$authorurl,$n);
	 // Item with link to a new Cloud
	 print_RSS_item($title,"http://www.infomous.com/site/mockups/F2F/viewver.php?src=".urlencode($url),$description,"Infomous Inc.","http://www.infomous.com/site/mockups/F2F/infomous.png","",$n);

         // Optionally, pull out any comments included in the item.
         if ($includePopItemComments) {
            dprint('There are '.sizeof($popitem->find('div.popular-item-commenters a img'))." commenters:\n");

            foreach($popitem->find('div.popular-item-commenters a') as $commenters)
            {
                $user = $commenters->find('img',0);
                 $userlink = html_entity_decode('http://www.linkedin.com'.$commenters->href);
                 $comment = $user->getAttribute('data-li-comment');
                 dprint("  User $user->alt said: $comment\n");
                 dprint("  Member feed is at $userlink\n");
                 }
            dprint("\n");
            }
         }
    }

// Print RSS Header
function print_RSS_Header($channeltitle,$channelurl,$channeldescription) {
header ("Content-Type:text/xml");

    print('<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:media="http://search.yahoo.com/mrss/">'."
<channel>
  <title>$channeltitle</title>
  <link>".urldecode($channelurl)."</link>
  <description>$channeldescription
  </description>
");
}

// Print RSS item
function print_RSS_item($title,$url,$description,$author,$authorAvatar,$authorFeed,$pubDate) {
    print('
<item>
  <title>'.$title.'</title>
  <link>'.urldecode($url).'</link>
  <author>'.$author.'</author>
  <description>'.$description.'</description>
  <pubDate>Mon, 25 Mar 2013 16:08:'.(59-$pubDate).' EST</pubDate>
  <media:thumbnail url="'.$authorAvatar.'"  xmlns:media="'.$authorAvatar.'"/>
</item>
');
}
//  

// Print RSS Footer
function print_rss_footer() {
    print("</channel>\n</rss>\n");
}


// A simple cheat to control debugging printouts.
function dprint($stuff) {
        global $debug;
        if ($debug) print($stuff);
}


?>