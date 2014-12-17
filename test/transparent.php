<?php

$nid = (isset($_GET["nid"])) ? 'nid'.$_GET["nid"] : 'nid54330';

?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns:fb="http://ogp.me/ns/fb#" xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en" dir="ltr">
<head>
<title>Sample Infomous Visual Exploration</title>
<style>
body, html {
   margin: auto;
}
</style>

</head>
<body style="background: #ffffff url('http://www.infomous.com/site/client/NFL/NFLbkg.jpg') repeat">

<script>
var ww=window.innerWidth;

var <?print $nid;?> = {
   "colBackground": "transparent",
   "wmode": "transparent",
   "setFrame": "0",
};
</script>

<div style="margin: auto;">
<script type="text/javascript" async data-infomous-id="<?print $nid;?>" src="http://www.infomous.com/client2/?width=100%25&height=100%25"></script>
</div>

</body>
</html>
