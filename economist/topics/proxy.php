<?php
$vars = $_REQUEST;

$url = "http://localhost:8001/query?"; 


foreach($vars as $key => $value){
  $url .= $key ."=". $value . "&";
}
$url = substr($url, 0, -1);


# Deals with some browsers wrongly appending a / to the last parameter
$last_char = $url[strlen($url)-1];
if ($last_char === '/') {
  $url = substr($url, 0, -1);
}

$body = file_get_contents($url);

if(isset($vars['callback'])){
  header('Content-Type: application/json; charset=utf-8');
  $body = $vars['callback'] ."(". $body .");";
}else{
  header('Content-Type: text/xml; charset=utf-8');
}

$gzdata = gzencode($body);

header("Content-Encoding: gzip");
header("Content-Length: " . strlen($gzdata));

if (! isset($_REQUEST['tracking']))  {
    $expires = 60*60*12;
    header('Pragma: public');
    header('Cache-control:no-cache');
    #header('Cache-Control: public,max-age='.$expires);
    #header('Last-modified: ' . gmdate('D, d M Y H:i:s', time()) . ' GMT');
    #header('Expires: ' . gmdate('D, d M Y H:i:s', time()+$expires) . ' GMT');
}

print $gzdata;



?>
