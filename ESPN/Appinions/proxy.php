<?php
$get = $_GET;
$post = $_POST;

$url = "http://localhost:8001/query?type=jodange&";

$url .= "baseUrl=" . rawurlencode('http://api.appinions.com/search/v2/opinions?appkey=xm4ubtmcstex2zcvjfgwphfy&sent=NCAA%20basketball&publisher_id=5316bd24-98cb-3323-90fa-ae7fd51bf623%2038ff8319-41d9-3750-832e-c1881a0eb6c9%2062ac3ee1-bada-3e61-9778-d0be5bc0441e%20a4d7496b-67a9-3274-8288-d18bdcf8f97d%2069a57d8f-8885-3619-88d7-22e0d05ac4ba%20e5afbb1e-a418-3057-a048-a4295263ab6b%2041e16f8a-e64f-3c8d-a844-b003b207d45a%2072080636-5624-32ca-8c50-5c9aebf9efe6%20063ef9df-afee-3c6f-982f-151f1c9ac666%20e76de84e-8a5b-32f0-8184-494c1094dcfb%209a21a119-3391-31c1-ba85-7fe88e4db576%2004f23bef-5ebe-3eee-8122-2c0df87f8faa%20817579fd-ceed-363a-95cd-8e54221c5d33%20b2290095-b75d-3afc-8593-5c2c61c7d033%209ed485ba-5425-3da9-b763-49b9ef676aa5%20a1973a76-67b0-3fca-b19d-c7e9fdf01d80%202421a214-ac3c-325e-890b-614e12bf7fda%2038ba8e5f-9ee0-3c6f-83cc-9936413df4b5') . "&";
$url .= "numOpinions=2500&";
$url .= "licensee=jodange&";
$url .= "blocked=quot&";
$url .= "style=oscars&";

#foreach($get as $key => $value){
  #$url .= $key ."=". $value . "&";
#}

foreach($get as $key => $value){
  if (!($key === "type")) {
  	$url .= $key ."=". $value . "&";
   }
}

$url .= "remote=" . $_SERVER['REMOTE_ADDR'] . "&";


# Strip last &
$url = substr($url, 0, -1);

# Deals with some browsers wrongly appending a / to the last parameter
$last_char = $url[strlen($url)-1];
if ($last_char === '/') {
  $url = substr($url, 0, -1);
}
$url .= "&"; 
$url = substr($url, 0, -1);

$xml = file_get_contents($url);

header('Content-Type: text/xml; charset=utf-8');

if (0) {
	print $xml;
}
else {
	$gzdata = gzencode($xml);
	header("Content-Encoding: gzip");
	header("Content-Length: " . strlen($gzdata));
	print $gzdata;
}


?>
