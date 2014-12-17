<?php

$curl = curl_init('http://www.london2012.com/news/');
curl_setopt($curl,CURLOPT_USERAGENT,'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.7; rv:8.0.1) Gecko/20100101 Firefox/8.0.1');
curl_setopt($curl,CURLOPT_RETURNTRANSFER,true);
$page = curl_exec($curl);
curl_close($curl);

$page = str_replace(
      '<head>',
      '<head>
      <base href="http://www.london2012.com/">
      ',
      $page);


$page = str_replace(
      '<ul id="news-articles-2012">',
      '<ul id="news-articles-2012">

<!-- BEGIN Infomous insertion -->
<li>
<div class="newsHeader">
<h1><a href="#">The London2012 News Navigator</a></h1>
</div>
<div class="infomous-wrapper" style="border: 1px solid #CCC;">
  <div id="infomous" class="infomous"></div>
</div> 
<script type="text/javascript">
    var vars = {
      width: "444",
      height: "260",
      nid: 8860,
      setInterfaceType: "widget",
      caption: "false",
      maxWords: 30,
      zoom: 0.2,
      colWord: "0x007BCC",
      colWordHover: "0xDF0094",
      colWordFade: "0x33AEFF",
      colWordHoverLinked: "0xDF0094",
      colLink: "0xBBBBBB",
      colLinkHover: "0x999999",
      colBlobBorder: "0x05DFF7",
      colBlobHover: "0xB4ECF7",
      skinMaxFontSize: 26,
      skinMinFontSize: 13
    }
</script>
<script type="text/javascript" src="http://infomous.com/client/embed.js"></script>
<div id="infomous-actions" style="font-size: 10px; margin-top: 8px;">
  <a onclick="window.open(\'http://www.infomous.com/site/mockups/London2012/infohelp.html\',\'_blank\',\'width=800,height=320,menubar=no,toolbar=no,location=no,resizable=yes,scrollbars=yes\'); void(0);">HELP</a>
  &nbsp;|&nbsp;
  <a onclick="window.open(\'http://www.infomous.com/site/mockups/London2012/index_full.html\',\'_blank\',\'width=800,height=600,menubar=no,toolbar=no,location=no,resizable=yes,scrollbars=yes\'); void(0);">OPEN IN NEW WINDOW</a>
</div>
<br/><br/>

<!-- END Infomous insertion -->

',
	$page
);



echo $page;

?>
