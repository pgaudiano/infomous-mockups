<!-- This script generates an Infomous cloud based on an existing NID on www.infomous.com
     
     Usage:  
     http://www.infomous.com/site/mockups/EmbedSamples/static.php?nid=NNN&width=WWW&height=HHH
     All parameters are optional

-->

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns:fb="http://ogp.me/ns/fb#" xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en" dir="ltr">
<head>
<title>Infomous Static Cloud Embedding Test</title>
</head>
<body>

<?php

/* Look for parameters passed in or set reasonable defaults. */
if (!isset($_GET["width"])) {
$width=600;
} else {
$width=$_GET["width"];
}

if (!isset($_GET["height"])) {
$height=400;
} else {
$height=$_GET["height"];
}

if (!isset($_GET["nid"])) {
$nid=44439;
} else {
$nid=$_GET["nid"];
}

/* Now generate the static embed */
print('
<h3>This is an Infomous cloud generated from <a href="http://www.infomous.com/node/'.$nid.'" target="_blank">NID'.$nid.'</a></h3>
<script type="text/javascript" async data-infomous-id="nid'.$nid.'" src="http://www.infomous.com/client2/?width='.$width.'&height='.$height.'"></script>
');

print('<p>You can modify this cloud by passing the following parameters:<br>
<ul>
  <li>width=xxx (xxx in pixels)</li>
  <li>height=xxx (xxx in pixels)</li>
  <li>nid=N (where N is a valid NID from a cloud created on infomous.com)</li>
</ul>

For example, try:
<a href="http://www.infomous.com/site/mockups/EmbedSamples/static.php?nid=1000&width=800&height=400">http://www.infomous.com/site/mockups/EmbedSamples/static.php?nid=1000&width=800&height=400</a>

<p>
You can view the source code for this file <a href="static.php.txt">here</a>.

');

?>

</body>
</html>