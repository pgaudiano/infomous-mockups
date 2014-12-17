<?php
$vars = $_REQUEST;
$vars['licensee'] = 'drupal';
$vars['remote'] =  $_SERVER['REMOTE_ADDR'];

if (isset($vars['nolinks']) && $vars['nolinks']) {
    $nolinks = 1;
}
else {
    $nolinks = 0;
}

if (!(isset($vars['campaign']))) {
    $vars['campaign'] = 'economist-s';
    }

$url = "http://localhost:8001/query?";
$url .= http_build_query($vars);


$body = file_get_contents($url);

if ($body === false) {
    $http_response_string = print_r($http_response_header, 'true');
    $msg = 'Failed to file_get_contents url=' . $url . ' response_header=' . $http_response_string;
    error_log($msg);
    $body = $msg;
}

if(isset($vars['callback'])){
  header('Content-Type: application/json; charset=utf-8');
  $body = $vars['callback'] ."(". $body .");";
}else{
  header('Content-Type: text/xml; charset=utf-8');
}


if ($nolinks) {
    $body = preg_replace('/(<source.*url=")[^"]*(".*captionLink=")[^"]*("[^>]*>)/','$1$2$3',$body);
}


$plain=true;
if ($plain) {
    # plain
    header('X-Compression: plain'); # this is an internal header, for debugging. 
    $resultData = $body;
    }
else {
    # compressed
    $resultData = gzencode($body);
    header('X-Compression: gzip');
    header("Content-Encoding: gzip");
}

header("Content-Length: " . strlen($resultData));


if (! isset($_REQUEST['tracking']))  {
    $expires = 60*2;   # seconds
    header('Pragma: public');
    header('Cache-Control: public,max-age='.$expires);
    header('Last-modified: ' . gmdate('D, d M Y H:i:s', time()) . ' GMT');
    header('Expires: ' . gmdate('D, d M Y H:i:s', time()+$expires) . ' GMT');
}

#TODO clean 21/dec/2011
#$gzbody = gzencode($body);
#header("Content-Encoding: gzip");
#header("Content-Length: " . strlen($gzbody));
#print $gzbody;

print $resultData;

?>
