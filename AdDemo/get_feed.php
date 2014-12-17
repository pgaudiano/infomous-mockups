<?
header("Content-type: text/xml");
//error_reporting(E_ALL);
//ini_set('display_errors', '1');
date_default_timezone_set('America/New_York');

// sets zemanta's URL and AUTH_KEY, put on top for fast access
$TOP_URL = 'http://rsapi.zemanta.com/api/get_recommendations/';
$AUTH_KEY = 's6hmOxtw0p+44/XTy1egpMZsDg8GXvkQzl4qVP0Jt2s';

// sets a default link if no referer, used for tracking purpose also for zemanta
if (!isset($_SERVER['HTTP_REFERER'])) $from = 'http://www.infomous.com/';
else $from = $_SERVER['HTTP_REFERER'];

// sets default keywords if not in link
if (!isset($_GET['keywords'])) $keywords = array("Obama", "Super Bowl", "Amanda Knox", "Boston", "Death Penalty");
else $keywords = explode(',', $_GET['keywords']);

if (!isset($_GET['amt'])) $amt = 20;
else $amt = $_GET['amt'];

// preps the data for Zemanta
$data = array( 
	"api_version" => 1,
	"date" => getTime(),
	"partner_id" => 6735435,
	"publisher_id" => 6540309,
	"context" => array(
		"url" => $from,
		'title' => "infomous",
		'keywords' => $keywords
		),// end of context
	'device' => array(
		"useragent" => "server",
		"ip_address" => "54.243.229.76"
		),// end of device
	'recommendations' => array(
		'amount' => $amt,
		'autoimpr' => 1,
		'display_post_excerpt' => true,
		'display_publish_date' => true
		)// end of recommendations
	);// end of data

// encodes into json and signs it
$jsonblob = json_encode($data);
$signature = sign($jsonblob, $AUTH_KEY);

// gets request and decode
$json_result = request($TOP_URL, $jsonblob, $signature);
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
$writer->writeElement('title', 'infomous promotional content.'); 
$writer->writeElement('description', 'infomous promotional content.'); 
$writer->writeElement('link', 'http://www.infomous.com'); 
$writer->startElement('atom:link'); 
	$writer->writeAttribute('href', 'http://www.infomous.com/site/mockups/AdDemo/get_feed.php'); // this needs to be changed if we moved the location
	$writer->writeAttribute('rel', 'self');
	$writer->writeAttribute('type', 'application/rss+xml');	
$writer->endElement(); // end atom:link

// loop through list and write elements - now only title and link, but there are a lot more elements that we can use
if ($list->status == 'ok') {
	foreach($list->data->results as $x) {
		$writer->startElement("item");
			$writer->writeElement('title', $x->title); 
			$writer->writeElement('link', $x->url); 
			$pubDate= date("D, d M Y H:i:s T", strtotime($x->published_date));
			$writer->writeElement('pubDate', $pubDate); 
			$writer->writeElement('description', $x->excerpt);	
			
			$writer->startElement("media:thumbnail");
				$writer->writeAttribute('url', $x->thumbnail_url); 
				$writer->writeAttribute('width', 150); 
				$writer->writeAttribute('height', 150); 
			$writer->endElement(); // end media:thumbnail	
		$writer->endElement();	// End item
	}
}

$writer->endElement();	// End channel 
$writer->endElement();	// End rss 
$writer->endDocument();
$writer->flush(); 

// gets current time in format that zemanta wants 
function getTime() {
	return date('Y-m-d-h-i-s', time());
}

// signs a message with our AUTH_KEY from Zemanta
function sign($message, $key) {
	return hash_hmac("sha256", $message, $key);
}

// sends a HTTP POST request to Zemanta with related params
function request($url, $jsonblob, $signature) {
	$data = array('jsonparams' => $jsonblob, 'signature' => $signature);

	$opts = array(
	  'http'=>array(
	    'method'=>"POST",
	    'content' => http_build_query($data)
	  )
	);
	$context  = stream_context_create($opts);

	return file_get_contents($url, false, $context);
}
?>