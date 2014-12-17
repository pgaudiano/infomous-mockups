<?php
$get = $_REQUEST;

$url = "http://localhost:8001/query?type=api&"; # test

#foreach($get as $key => $value){
  #$url .= $key ."=". $value . "&";
#}

# if($get['fromDaysBack']==1) {
    # $get['fromDaysBack']=5;
# }

$feeds = rawurldecode($get['url']);
$feeds = explode('|',$feeds);
$feed = $feeds[0];
$get['url'] = rawurlencode($feed);

foreach($get as $key => $value){
  if (!($key === "type")) {
  	$url .= $key ."=". $value . "&";
   }
}

# Strip last &
$url = substr($url, 0, -1);

# Deals with some browsers wrongly appending a / to the last parameter
$last_char = $url[strlen($url)-1];
if ($last_char === '/') {
  $url = substr($url, 0, -1);
}
$url .= "&"; 

$url .= "ttl=0&";
$url .= "licensee=exempt&";
$url .= "remote=" . $_SERVER['REMOTE_ADDR'] . "&";

$url = substr($url, 0, -1);

$xml = file_get_contents($url);

#$xml = str_replace("Barack Obama","Barack\nObama",$xml);
//$xml = preg_replace('/text="([^"]*) ([^"]*)"/','text="$1'."\n".'$2"',$xml);

#$gzdata = gzencode($xml);
$gzdata = $xml;

#header("Content-Encoding: gzip");
header("Content-Length: " . strlen($gzdata));
header('Content-Type: text/xml; charset=utf-8');

if (! isset($_REQUEST['tracking']))  {
    $expires = 60*60*12;
    header('Pragma: public');
    header('Cache-Control: public,max-age='.$expires);
    header('Last-modified: ' . gmdate('D, d M Y H:i:s', time()) . ' GMT');
    header('Expires: ' . gmdate('D, d M Y H:i:s', time()+$expires) . ' GMT');
}

print $gzdata;



?>
