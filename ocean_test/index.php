<?php

/* This script is used ot generate a cloud dynamically using a sed of Topic IDs (TIDs)
   from answers.com. If the script is called from the embed's enlarge button,
   it is passed the "full=1" parameter, which suppresses all printed information and
   sizes the cloud to fit in the enlarge popup. */

// Look for tids but if not passed use a default
if (!isset($_GET["tid"]))
{
$tids="2841,2851,2853";
// Alternatively try 2149,2293,5413 for world war II topics
// or 698,5758,5759 for Italian cars
// See http://wiki.answers.com/Q/FAQ for a full list of topics
}
else
{
$tids=$_GET["tid"];
}

// Look for width and height, or set reasonable defaults based on Answers.com site
if (!isset($_GET["width"])) {
$width=630;
} else {
$width=$_GET["width"];
}

if (!isset($_GET["height"])) {
$height=400;
} else {
$height=$_GET["height"];
}

// Put this in a string so it can be reused a few times.
$embedCode='<script id="infomous-embed-js" type="text/javascript" src="embed.js?tid='.$tids.'&width='.$width.'&height='.$height.$isfull.'"></script>';

print('
<html>
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
<body>
<h1>Answers.com dynamic cloud test</h1>
<div style="margin-bottom:20px;height=400px">
'.$embedCode.'
</div>
The cloud above was generated with the following embed code:
<pre>
'.htmlentities($embedCode).'
</pre>

</body>
</html>
');
?>
