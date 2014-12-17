<?php

$who = 'http://cbn.globoradio.globo.com/';
$detect = '<div class="coluna" id="col3">';
$cloud_title = "O navegador do CBN";
$cloud_nid = 9568;

$page = file_get_contents($who);

$page = str_replace(
      '<head>',
      "<head><base href=\"$who\">",
      $page);

$elements = explode($detect,$page,2);

echo $elements[0];

echo $detect;

echo '
<!-- Infomous insertion -->

<div class="destaque fix" id="reporter_ouvinte">
	<div class="corner-top fl"></div>
	<div class="destaque-conteudo fl">
	<div class="tema cab-claro"><h2>O NAVEGADOR DE CBN<h2></div>
	
	<script type="text/javascript" src="http://infomous.com/cloud/get?nid='. $cloud_nid .'&width=268&height=268&caption=false&colBackground=0xE5E5E5"></script>
	
	<div class="infomous-caption" style="font-size:10px; font-family: Arial,sans-serif; color:#333; width: 262px;">
		Nuvem de navegação criada por <a href="http://www.infomous.com" target="_blank"> Infomous</a>.</br> Clique numa palavra para ver os links das postagens, clique duas vezes nela para focar/desfocar.
	</div>
	<div style="font-size:9px; font-family:Arial,sans-serif; text-transform: uppercase; margin-top: 4px;">
		<a href="javascript:nw=window.open(\'http://www.infomous.com/cloud/fullscreen/'. $cloud_nid .'\',\'_blank\',\'width=700,height=500,menubar=no,toolbar=no,location=no,resizable=yes,scrollbars=no\');void(0);">Abrir numa nova janela</a>
		&nbsp;|&nbsp;
		<a href="javascript:nw=window.open(\'http://dev3.infomous.com/site/mockups/oglobo/infohelp.html\',\'_blank\',\'width=600,height=450,menubar=no,toolbar=no,location=no,resizable=yes,scrollbars=no\');void(0);">Ajuda</a>
	</div>
	</div>
	<div class="corner-bottom fl"></div>
</div>
';

echo $detect;

echo $elements[1];


?>
