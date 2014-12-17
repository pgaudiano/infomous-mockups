<?php
$vars = $_REQUEST;
$vars['licensee'] = 'jodange';
$vars['remote'] =  $_SERVER['REMOTE_ADDR'];
#unset($vars['campaign']);

$url = "http://localhost:8001/query?"; 

$baseDir=dirname(__FILE__);

$defaults = array( 
    'numOpinions' => '2500',
    'ngramsSource' => 'file://' . $baseDir . '/../../files/composite_words.txt',
    'blockedSource' => 'file://' . $baseDir . '/../../files/blocked_words.txt',
     );    
    
foreach ($defaults as $key => $value) {
      if (!(isset($vars[$key]))) {
          $vars[$key] = $value;
	  }
      }
    
$hard_space = ' '; # you can't see it but this is a Unicode 0xa0 (hard space)

if (isset($vars['focused'])) {
    $vars['focused'] = str_replace($hard_space,' ',$vars['focused']);
    if ($vars['focused'] === '') { 
	unset($vars['focused']);
	}
    }    

if (isset($vars['hidden'])) {
    $vars['hidden'] = str_replace($hard_space,' ',$vars['hidden']);
    }    

$url .= http_build_query($vars);
  
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
