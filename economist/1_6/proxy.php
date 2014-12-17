<?php
$vars = $_REQUEST;
unset($vars['type']);

$url = "http://localhost:8001/query?type=jodange&"; 


$hard_space = ' '; # you can't see it but this is a Unicode 0xa0 (hard space)

if (isset($vars['focused'])) {
    $vars['focused'] = rawurldecode($vars['focused']);
    $vars['focused'] = str_replace($hard_space,' ',$vars['focused']);
    $vars['focused'] = rawurlencode($vars['focused']);
    if ($vars['focused'] === '') { 
	unset($vars['focused']);
	}
    }    

if (isset($vars['hidden'])) {
    $vars['hidden'] = rawurldecode($vars['hidden']);
    $vars['hidden'] = str_replace($hard_space,' ',$vars['hidden']);
    $vars['hidden'] = rawurlencode($vars['hidden']);
    }    

foreach($vars as $key => $value){
  $url .= $key ."=". $value . "&";
}
$url = substr($url, 0, -1);


# Deals with some browsers wrongly appending a / to the last parameter
$last_char = $url[strlen($url)-1];
if ($last_char === '/') {
  $url = substr($url, 0, -1);
}

$url .= "&"; 
$url .= "numOpinions=2500&";
$url .= "licensee=jodange&";
$url .= "blocked=Polish,Russian,American,European,Libyan,French,Indian,Chinese,German,Turkish,Japanese,British,Nepali,Canadian&";
$url .= "remote=" . $_SERVER['REMOTE_ADDR'] . "&";

$url = substr($url, 0, -1);

$body = file_get_contents($url);

if(isset($vars['callback'])){
  header('Content-Type: application/json; charset=utf-8');
  $body = preg_replace('/("text":"[^"]*) ([^"]*")/','$1' . $hard_space . '$2',$body);  # you can't see it but between $1 and $2 there is a Unicode 0xa0 (hard space)
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
    #header('Cache-control:no-cache');
    header('Cache-Control: public,max-age='.$expires);
    header('Last-modified: ' . gmdate('D, d M Y H:i:s', time()) . ' GMT');
    header('Expires: ' . gmdate('D, d M Y H:i:s', time()+$expires) . ' GMT');
}

print $gzdata;



?>