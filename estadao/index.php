<?php

$who = 'http://www.estadao.com.br/';
$detect = '<div class="bnSeloHome">';
$cloud_title = "O navegador do Estadão";
$cloud_nid = 6752;

$page = file_get_contents($who);

$page = str_replace(
      '<head>',
      "<head><base href=\"$who\">",
      $page);

$elements = explode($detect,$page,2);

echo $elements[0];

echo '

<!-- Infomous insertion -->
<div style="background-color:#f8f8ff; ">
<span style="color: #0072BB;font-size: 120%;font-weight: bold;padding:8px;">' . $cloud_title .  '</span>

<script type="text/javascript" src="http://www.infomous.com/site/mockups/estadao/embed_portuguese.js"></script>
<a style="font-weight:bold"
href="javascript:nw=window.open(\'http://www.infomous.com/cloud/fullscreen/' . $cloud_nid .
'\',\'_blank\',\'width=600,height=500,menubar=no,toolbar=no,location=no,resizable=yes,scrollbars=no\');void(0);">[Abrir numa nova janela]</a> &nbsp; &nbsp;
<a style="font-weight:bold"
href="javascript:nw=window.open(\'http://www.infomous.com/site/mockups/estadao/infohelp.html\',\'_blank\',\'width=600,height=450,menubar=no,toolbar=no,location=no,resizable=yes,scrollbars=no\');void(0);">[Ajuda]</a> 
</div>

';

echo $detect;

echo $elements[1];


?>
