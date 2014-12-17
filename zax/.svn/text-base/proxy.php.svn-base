<?php
$get = $_GET;
$post = $_POST;

$url = "http://localhost:8001/query?";

foreach($get as $key => $value){
  $url .= $key ."=". $value . "&";
}
foreach($post as $key => $value){
  $url .= $key ."=". $value . "&";
}
$url = substr($url, 0, -1);

$xml = file_get_contents($url);

header('Content-Type: text/xml; charset=utf-8');
print $xml;

?>
