<?php

$depth=($_GET["d"])?$_GET["d"]:0;
$words=($_GET["n"])?$_GET["d"]:3;

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en" dir="ltr">

<head>
  <title>Word test</title>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

</head>

<body>
<h1>Infomous popularWordCutoff test</h1>

<script type="text/javascript">

   var words = <?=$words; ?>;
   var depth = <?=$depth; ?>;
   var myInfomousCloud = {
     api : "true",
     width: "600",
     height: "400",
     maxWords: "20",
     nid: "38474",
  }

  function infomous_ready(I){
   myCloud = I.clouds.get();
  }

</script>

<div style="height:400px">
<script type="text/javascript" async data-infomous-id="myInfomousCloud" src="https://www.infomous.com/client2"></script>
</div>

<p>The popular word cutoff (depth) is: <?=$depth?>

<p><a href="javascript:void(0);" onclick="myCloud.set_var('popularWordCutoff',<?=++$depth?>);myCloud.make_request();">
Increase depth</a></p>

<p><a href="javascript:void(0);" onclick="myCloud.set_var('popularWordCutoff',<?=--$depth?>);myCloud.make_request();">
Decrease depth</a></p>

</body>

</html>

