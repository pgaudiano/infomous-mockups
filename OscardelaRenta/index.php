<?php
include("simple_html_dom.php");

// A few globals
$alltitles = array();
$includePopItemComments = 0;
$debug=0;
$imgsize=64;
$cat = array (
array("i" => 0, "cat" => "our-favorites", "label" => "Our Favorites"),
array("i" => 0, "cat" => "ready-to-wear", "label" => "Ready to Wear"),
array("i" => 0, "cat" => "accessories", "label" => "Accessories"),
array("i" => 0, "cat" => "children", "label" => "Children"),
array("i" => 0, "cat" => "fur", "label" => "Fur"),
);


ini_set('user_agent','PHP');

// Create DOM from default URL or local file
   if (PHP_SAPI === 'cli') { //Behave differently if invoked from command line
   $title = "Oscar de la Renta Sale: Our Favorites";
   $infile = file_get_html('http://www.oscardelarenta.com/sale/our-favorites/?p=0');
   } else {
   // Or GET the file...
   if (isset($_GET["c"])) {
   $title = "Oscar de la Renta Sale: ".$cat[$_GET["c"]]["label"];
   $infile = file_get_html("http://www.oscardelarenta.com/sale/".$cat[$_GET["c"]]["cat"]."/?p=0");
//   $infile = file_get_html("http://www.oscardelarenta.com/sale/".$_GET["cat"]."/?p=0");
   } else {
   $title = "Oscar de la Renta Sale: Our Favorites";
   $infile = file_get_html('http://www.oscardelarenta.com/sale/our-favorites/?p=0');
   }
   }

print_RSS_Header($title,"http://www.oscardelarenta.com/sale/our-favorites/","A feed of the Oscar de la Renta sales page");

// Go through the list of carousel items
getSaleItems($infile);

print_RSS_footer();

function getSaleItems($html) {
    global $allitems;
    $n=0;

    dprint("\n=== There are ".sizeof($html->find('ul.product-set li'))." sale items ===\n\n");

    foreach($html->find('ul.product-set li') as $popitem)
    {
    $title = $popitem->find('h2',0)->plaintext;
    $url = html_entity_decode('http://www.oscardelarenta.com'.$popitem->find('a',0)->href);
    $img = str_replace("216/287","64/00",$popitem->find('img',0)->src);
    dprint("Sale item ".++$n." title: $title\n");
    dprint("The URL is $url\n");
    dprint("The image URL is $img\n");
    print_RSS_item($title,$url,$title,$author,$img,$authorFeed,$n);
    
         }
    }

// Print RSS Header
function print_RSS_Header($channeltitle,$channelurl,$channeldescription) {

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
  <description>'.$description.'</description>
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
