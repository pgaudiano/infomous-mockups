<?php

$url = 'http://www.london2012.com/sport';
$curl = curl_init($url);
curl_setopt($curl,CURLOPT_USERAGENT,'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.7; rv:8.0.1) Gecko/20100101 Firefox/8.0.1');
curl_setopt($curl,CURLOPT_RETURNTRANSFER,true);
$page = curl_exec($curl);
curl_close($curl);


$page = str_replace(
      '</head>',
      '<base href="http://www.london2012.com/">
      </head>',
      $page);


$page = preg_replace(
      '+<div id="sports-icons-container">.*?<div id="AdditionalContent">+s',
      '
<!-- BEGIN Infomous insertion -->
<h1 style="background-color: #0098FE; color: #FFFFFF; margin-bottom: 0; padding: 5px; font-size: 1.5em;">The London2012 Interactive Sports Navigator</h1>
<div id="infomous-wrapper" style="background-image: url(http://www.infomous.com/site/mockups/London2012/ads/back_mcdonalds.jpg); border: 1px solid #999;">
<div id="infomous" class="infomous"></div>
</div>
<script type="text/javascript">
		var vars = {
      width: "458",
      height: "458",
      feeds: "http://www.infomous.com/site/mockups/London2012/6.xml",
      type: "api",
      linkageThreshold: 1.5,
      zoom: 0.2,
      groups: "false",
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
    var params = {
      wmode: "transparent",
      allowFullScreen: true,
      allowScriptAccess: "always"
    }
</script>
<script type="text/javascript" src="http://www.infomous.com/site/mockups/London2012/ads/embed.js"></script>
<div id="infomous-actions" style="font-size: 10px; margin-top: 8px;">
  <a onclick="window.open(\'http://www.infomous.com/site/mockups/London2012/infohelp.html\',\'_blank\',\'width=800,height=320,menubar=no,toolbar=no,location=no,resizable=yes,scrollbars=yes\'); void(0);">HELP</a>
  &nbsp;|&nbsp;
  <a onclick="window.open(\'http://www.infomous.com/site/mockups/London2012/ads/sports_mcdonalds_full.html\',\'_blank\',\'width=800,height=600,menubar=no,toolbar=no,location=no,resizable=yes,scrollbars=yes\'); void(0);">OPEN IN NEW WINDOW</a>
</div>
<!-- END Infomous insertion -->

</div><div id="AdditionalContent">

',
	$page
);


echo $page;

?>