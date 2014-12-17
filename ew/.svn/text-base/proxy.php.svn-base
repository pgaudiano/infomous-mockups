<?php
$get = $_GET;
$post = $_POST;

$url = "http://localhost:8001/query?type=jodange&";
$query = 'sent=' . rawurlencode('emmy');
$query .= '&publisher_id=' .rawurlencode('(382ba3f3-8fe5-35fb-be9e-0636446c5c94 OR f7a0ffd8-6251-397c-9b7f-f6924b251a61 OR c50ffdb9-5a05-319d-a0cb-2d2ea56f7a04 OR 799b95d2-5a0e-3ef4-a263-d5f0828c54cc OR 1588ca61-2fb0-3339-9886-a54fb6ed2663 OR 3bd47111-af38-3266-b8ef-dbec03198605 OR c1b1d5f1-9edb-3b23-bec9-02a191e79bf4 OR b532ac93-5005-34f7-aaf9-37d857d4464a OR caa87974-0189-3423-a589-c0ea15a621d9 OR 6c889775-c9af-3eb6-878d-b4b4aa940266 OR 76be20ea-1c97-3afc-99f4-c1dfe4b98379 OR c99b53cb-a4d1-3136-adda-382566af6daa OR 520deddc-29b3-32a1-ba3d-9f5e75e05076 OR 76b1f1cc-ecc5-3dc7-a408-bbf56caa76a9 OR 27f5ffe9-90e8-366d-87ff-e78009de328b OR d86e3c0f-9608-3b4b-a1a6-1e502be6f551)');
$url .= "baseUrl=" . rawurlencode('http://api.appinions.com/search/v2/opinions?appkey=xm4ubtmcstex2zcvjfgwphfy&' . $query ) ."&" ;
$url .= "numOpinions=1000&";
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
