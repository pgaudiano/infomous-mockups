<?php

$max = isset($_GET['n']) ? $_GET['n'] : 20;
$file = $_GET['f'];

$doc = new DOMDocument();

$doc->load('articles.xml');

$xpath = new DOMXpath($doc);

$i = 0;
foreach($xpath->query('//item') as $node) {
  if ($i++ < $max) continue;
  $node->parentNode->removeChild($node);
  #echo "remove child\n";
}


echo $doc->saveXML();
?>

