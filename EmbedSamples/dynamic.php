<!-- This script generates an Infomous cloud dynamically based on a valid RSS or Atom feed URL
     
     Usage:  
     http://www.infomous.com/site/mockups/EmbedSamples/dynamic.php?feedurl=http://foo.com/feed.xml&width=WWW&height=HHH&title=My%20sample%20title

     All parameters are optional

-->

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns:fb="http://ogp.me/ns/fb#" xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en" dir="ltr">
<head>
<title>Infomous Dynamic Cloud Embedding Test </title>
</head>
<body>

<?php

/* This script looks for certain GET parameters and uses them to create an
   Infomous cloud on-the-fly
*/

// Look for GET params but if not passed use a default
if (!isset($_GET["feedurl"]))
{
$feedurl="http://blogs.hbr.org/feed/";
}
else
{
$feedurl=$_GET["feedurl"];
}

if (!isset($_GET["title"]))
{
$title="Explore the HBR Blog Network";
}
else
{
$title=$_GET["title"];
}

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

/* Now generate the dynamic embed */
print('
<h3>This is an Infomous cloud generated dynamically from '.$feedurl.'</h3>
<script type="text/javascript" src="http://www.infomous.com/site/mockups/EmbedSamples/embed.js?feedurl='.$feedurl.'&width='.$width.'&height='.$height.'&title='.$title.'"></script>
');

print('<p>You can modify this cloud by passing the following parameters:<br>
<ul>
  <li>width=xxx (xxx in pixels)</li>
  <li>height=xxx (xxx in pixels)</li>
  <li>title=blah ("blah" should be URL encoded)</li>
  <li>feedurl=url (url may need to be encoded if it includes certain characters)</li>
</ul>

For example, try:
<a href="http://www.infomous.com/site/mockups/EmbedSamples/dynamic.php?feedurl=http://www.icosystem.com/feed&title=Explore%20my%20blog&width=800&height=400">http://www.infomous.com/site/mockups/EmbedSamples/dynamic.php?feedurl=http://www.icosystem.com/feed&title=Explore%20my%20blog&width=800&height=400</a>

<p>
You can view the source code for this file <a href="dynamic.php.txt">here</a>, and the JavaScript embed file <a href="embed.js.txt">here</a>.

');

?>

</body>
</html>
