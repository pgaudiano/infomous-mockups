<?php

$page = file_get_contents('http://www.economist.com/content/global_debt_clock');

$page = preg_replace(
	'/(?<=\<div id="ec-fullWidth" class="clearfix">).*?(?=\<\/div>)/si',
	'<div id="flash"> </div>
	<script type="text/javascript">
     // <![CDATA[
        var so = new SWFObject("infomous.swf", "infomous", "961", "653", "9", "#D9E4E6");
        so.addParam("allowScriptAccess", "always");
        so.addParam("allowFullScreen", "true");
        so.addVariable("loadAtStart", "true");
        so.addVariable("groups", "1");
        so.addVariable("fontScale", "1");
        so.addVariable("zoom", "1");
        so.addVariable("maxWords", "50");
        so.addVariable("linkageThreshold", "1");
        so.addVariable("dict", "NOUN|1,VERB|1,ADJECTIVE|0,ADVERB|0,NUMBER|0,OTHER|1");
        so.addVariable("bottomBarControls", "fontSlider,zoomSlider,wordsSlider,groups");
        so.addVariable("base_path", "http://dev.infomous.com/site/economist/");
        so.addVariable("interfaceClass", "viewer");
		so.addVariable("skin", "economist");
		
        so.write("flash");
     // ]]>
    </script>',
    $page
);


echo $page;
?>