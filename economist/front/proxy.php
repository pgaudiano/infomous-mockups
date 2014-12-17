<?php
$get = $_GET;
$post = $_POST;

$url = "http://localhost:8001/query?";

foreach($get as $key => $value){
  $url .= $key ."=". $value . "&";
}

foreach($get as $key => $value){
  $url .= $key ."=". $value . "&";
}



# Strip last &
$url = substr($url, 0, -1);

# Deals with some browsers wrongly appending a / to the last parameter
$last_char = $url[strlen($url)-1];
if ($last_char === '/') {
  $url = substr($url, 0, -1);
}
$url .= "&"; 
$url .= "licensee=jodange&";
$url .= "remote=" . $_SERVER['REMOTE_ADDR'] . "&";

$url = substr($url, 0, -1);

$xml = file_get_contents($url);

header('Content-Type: text/xml; charset=utf-8');
$xml = preg_replace('/\/index.xml/','',$xml);

print $xml;


?>
