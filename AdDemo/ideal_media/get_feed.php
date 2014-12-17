<?
header("Content-type: text/xml");
//header('content-type:text/html;charset=utf-8');
error_reporting(E_ALL);
ini_set('display_errors', '1');
date_default_timezone_set('America/New_York');

// sets zemanta's URL and AUTH_KEY, put on top for fast access

// sets default url if not supplied
if (!isset($_GET['link'])) $TOP_URL = 'http://news.idealmedia.com/data/js/76197.js?geo=1237';
else $TOP_URL = $_GET['link'];

// gets request and decode
$json_result = request($TOP_URL);
//utf8_encode($json_result);
//$json_result = str_replace(chr(160), chr(32), $json_result);
//preg_match('{"news": ',$json_result,$page);
$json_result = preg_replace('+NetBlock[0-9]*\((.*)\)+','$1',$json_result);

$list = json_decode($json_result);

$writer = new XMLWriter(); 

// Output directly to the user 
$writer->openURI('php://output'); 

$writer->startDocument('1.0'); 
$writer->setIndent(4); 

// declare it as an rss document 
$writer->startElement('rss'); 
$writer->writeAttribute('version', '2.0'); 
$writer->writeAttribute('xmlns:atom', 'http://www.w3.org/2005/Atom');
$writer->writeAttribute('xmlns:media', 'http://search.yahoo.com/mrss/');

$writer->startElement("channel"); 
$writer->writeElement('title', 'Content by Ideal Media'); 
$writer->writeElement('description', 'Content by Ideal Media'); 
$writer->writeElement('link', 'http://www.infomous.com'); 
$writer->startElement('atom:link'); 
	$writer->writeAttribute('href', 'http://www.infomous.com/site/mockups/AdDemo/ideal_media/get_feed.php'); // this needs to be changed if we moved the location
	$writer->writeAttribute('rel', 'self');
	$writer->writeAttribute('type', 'application/rss+xml');	
$writer->endElement(); // end atom:link

// loop through list and write elements - now only title and link, but there are a lot more elements that we can use

foreach($list->news as $x) {
	$writer->startElement("item");
		$writer->writeElement('title', $x->title); 
		$writer->writeElement('link', $x->url); 
		/*
		$pubDate= date("D, d M Y H:i:s T", strtotime($x->published_date)); //should i give an random date here?
		$writer->writeElement('pubDate', $pubDate);
		*/
		$writer->writeElement('description', $x->title);	
		
		$writer->startElement("media:thumbnail");
			$writer->writeAttribute('url', $x->img); 
			$writer->writeAttribute('width', 64); 
			$writer->writeAttribute('height', 64); 
		$writer->endElement(); // end media:thumbnail	
	$writer->endElement();	// End item
}

$writer->endElement();	// End channel 
$writer->endElement();	// End rss 
$writer->endDocument();
$writer->flush(); 

// reads url file into memory
function request($url) {
	return file_get_contents($url, false);
}
?>