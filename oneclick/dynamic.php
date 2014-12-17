<!-- This script generates an Infomous cloud either from an existing NID or dynamically
     from an RSS feed. The script is designed to work with WordPress blogs, and it assumes
     that the feed URL will always be of the form http://www.myblog.com/feed
     
     The script is designed to use the core embed.js. It accepts the same parameters and 
     passes them to embed.js largely untouched.

-->

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns:fb="http://ogp.me/ns/fb#" xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en" dir="ltr">
<head>
<title>Infomous Cloud Embedding Test</title>
</head>
<body>
<h1>Test page for the cloud embed generator</h1>

<?php

/* Look for parameters passed in or set reasonable defaults. */
if (!isset($_GET["cloud_type"])) {
$cloud_type="dynamic";
} else {
$cloud_type=$_GET["cloud_type"];
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

if (!isset($_GET["nid"])) {
$nid=44439;
} else {
$nid=$_GET["nid"];
}

if (!isset($_GET["url"]))
{
$feedurl="http://blogs.hbr.org";
}
else
{
$feedurl=$_GET["url"];
}

if (!isset($_GET["use_comments"]))
{
$usecomments="no";
}
else
{
$usecomments=$_GET["use_comments"];
}

if (!isset($_GET["title"]))
{
//if ($cloud_type == 'dynamic') $title="Explore this dynamic cloud";
}
else
{
$title=$_GET["title"];
}

// The following parameters are OK even if they are blank
$maxwords=$_GET["max_words"];
$colframe=$_GET["col_frame"];
$colframetitle=$_GET["col_frame_title"];

/* Now generate the embed */
/* First, the static version */
if ($cloud_type == 'static') {
print('
<p><b>This is a '.$cloud_type.' Infomous cloud generated from <a href="http://www.infomous.com/node/'.$nid.'" target="_blank">NID'.$nid.'</a></b>
');

// Manufacture a string with the properly formatted embed parameters
$embedparams = 'nid='.$nid.'&width='.$width.'&height='.$height.
(($title)?'&title='.rawurlencode($title):'').
(($maxwords)?'&max_words='.$maxwords:'').
(($colframe)?'&col_frame='.$colframe:'').
(($colframetitle)?'&col_frame_title='.$colframetitle:'');

// Now invoke the script that will craft the embed code.
print('
<script type="text/javascript" src="http://www.infomous.com/site/plugins/wp/static.js?'.$embedparams.'"></script>
');

} else {  // Now do the dynamic version
print('
<p><b>This is a '.$cloud_type.' Infomous cloud generated from the URL '.$feedurl.(!strcmp($usecomments,"yes")?" (with comments)":"").'</b>
');

// Manufacture a string with the properly formatted embed parameters
$embedparams = 'url='.$feedurl.'&width='.$width.'&height='.$height.
(!strcmp($usecomments,"yes")?'&use_comments=yes':'').
(($title)?'&title='.rawurlencode($title):'').
(($maxwords)?'&max_words='.$maxwords:'').
(($colframe)?'&col_frame='.$colframe:'').
(($colframetitle)?'&col_frame_title='.$colframetitle:'');

// Now invoke the script that will craft the embed code.
print('
<script type="text/javascript" src="http://www.infomous.com/site/mockups/oneclick/dynamic.js?'.$embedparams.'&a=3"></script>
');
}

?>
<p id="output"></p>


</body>
</html>
