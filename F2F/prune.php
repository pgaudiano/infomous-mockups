
<?php

$max = isset($_GET['n']) ? $_GET['n'] : 20;
$src = $_GET['src'];

$doc = new DOMDocument();

try {
$doc->load($src);
$xpath = new DOMXpath($doc);
}
catch(Exception $e) {
echo 'Error reading $src\n';
print_r($e);
}


$i = 0;
foreach($xpath->query('//item') as $node) {
  if ($i++ < $max) continue;
  $node->parentNode->removeChild($node);
  #echo "remove child\n";
}


echo $doc->saveXML();
?>

