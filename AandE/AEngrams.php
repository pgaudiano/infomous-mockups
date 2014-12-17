<?php

$label = ($_REQUEST['label']) ? '['.$_REQUEST['label'].'] ' : '';
   

if ($_REQUEST['source']) {
$source=$_REQUEST['source'];
} else {
$source="http://rss.cnn.com/rss/money_latest.rss";
}

$page = file_get_contents($source);

$page = preg_replace('+<title>+','<title>'.$label,$page);

echo $page;

?>