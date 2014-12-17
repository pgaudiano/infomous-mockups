<?php
header ("Content-Type:text/xml");
ini_set('error_reporting', E_ALL);
error_reporting(-1);
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
   //$infile = file_get_html($_GET["src"]);
	$ch = curl_init();
	curl_setopt ($ch, CURLOPT_URL, $_GET["src"]);
	curl_setopt ($ch, CURLOPT_USERAGENT, "Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.6) Gecko/20070725 Firefox/2.0.0.6");
	curl_setopt ($ch, CURLOPT_RETURNTRANSFER, 1 );
	$html = curl_exec($ch);
	curl_close($ch);
	$infile = str_get_html($html);   
} else {
   print('Error: please include the URL of a LinkedIn with the call, e.g.:<br>
   <a href="http://www.infomous.com/site/mockups/F2F/index.php?src=http://www.linkedin.com/groups/Succeed-Small-Business-Network-Powered-4733823">http://www.infomous.com/site/mockups/F2F/ligroup.php?src=http://www.linkedin.com/groups/Succeed-Small-Business-Network-Powered-4733823</a>
   <p>Looks like we were invoked by '.PHP_SAPI);

   exit;
   }
   }

// Get the name, URL, and icon of the group
$groupname=substr($infile->find('.title',0)->plaintext,0,50)."...";
$groupurl=('http://www.linkedin.com'.$infile->find('div.group-icon a',0)->href);
$groupicon=$infile->find('div.group-icon img',0)->src;

dprint("The group name is: $groupname\n");
dprint("The group URL is: $groupurl\n");
dprint("The Icon for the group is at $groupicon\n");

print_RSS_Header($groupname,$groupurl,$groupname);

getComments($infile);

print_RSS_footer();


function getComments($html) {
    global $alltitles, $includePopItemComments;
    $n=sizeof($alltitles);
    $ndups=0;

    dprint("\n=== There are ".sizeof($html->find('div.comment'))." comments ===\n\n");

    foreach($html->find('div.comment') as $popitem)
    {

       $temp=$popitem->find('div.popular-content div.popular-article p.commenter',0);//->getAttribute('data-li-comment-text');
	$temp->find("a",0)->outertext = "";
	
	$temp = trim(str_replace("&bull;","",strip_tags($temp)));      
             if (!$temp) {
                dprint("\nCould not find a title for item ".($n+1).". Skipping...\n");
                continue;
                }
          $title_full = $temp;
	$title = substr($title_full,0,100)."...";
         
	if (in_array($title,$alltitles)) {
            $ndups++;
             dprint("\nSkipping duplicate item...\n\n");
             continue;
             }
         

         $url = $_GET["src"];
	 // Remove unnecessary parts of the URL
         if ($cut=strpos($url,'?')) { $url=substr($url,0,$cut); }
         $author=$popitem->find('div.popular-entity a img',0)->getAttribute('alt');
         $authorurl=html_entity_decode('http://www.linkedin.com'.$popitem->find('div.popular-entity a',0)->href);
         $description=$title_full;
         $authorAvatar = str_replace("80x80","40x40",(str_replace("80_80","40_40",$popitem->find('div.popular-entity a img',0)->src))); 
         dprint("\nPopular item ".++$n." title: $title\n");
         dprint("The thread URL is: $url\n"); 
         dprint("The thread author is: $author\n");
         dprint("The author's member feed is: $authorurl\n");
         print_RSS_item($title,$url,$description,$author,$authorAvatar,$authorurl,$n);

         }
    }

// Print RSS Header
function print_RSS_Header($channeltitle,$channelurl,$channeldescription) {
//header ("Content-Type:text/xml");  
$rssfeed = '<?xml version="1.0" encoding="ISO-8859-1"?>';
$rssfeed .= '<rss version="2.0">';
  
print($rssfeed."<channel>
  <title>$channeltitle</title>
  <link>".urldecode($channelurl)."</link>
  <description>$channeldescription</description>
");
}

// Print RSS item
function print_RSS_item($title,$url,$description,$author,$authorAvatar,$authorFeed,$pubDate) {
    print('
<item>
  <title>'.$title.'</title>
  <link>'.$url.'</link>
  <author>'.$author.'</author>
  <description>'.$description.'</description>
  <pubDate>Mon, 25 Mar 2013 16:08:'.(59-$pubDate).' EST</pubDate>
  <media:thumbnail url="'.$authorAvatar.'" xmlns:media="'.$authorAvatar.'"/>
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
