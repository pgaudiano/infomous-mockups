<?php
$page = file_get_contents('http://www.economist.com/');

#$hidden = file_get_contents('hidden.txt');
$hidden = split("\n", file_get_contents("hidden.txt"));



/*$page = str_replace(
	'<!--[if IE 8]>',
	'<link type="text/css" rel="stylesheet" media="all" href="http://www.jodange.com/publishers/cloud/styles/general.css" />
	<!--[if IE 8]>',
    $page);*/


$page = preg_replace(
		     '</head>',
		     '<base href="http://www.economist.com">
</head>',
		     $page);

$page = str_replace(
	'<div id="most-lists" class="block">',
	'<div style="border: 1px solid #CDDADD; background-color: #F4F8FA; margin-bottom: 15px; padding: 15px 0 0 0;">
    	<div class="title" style="font-size:1.3em; padding: 0 0 10px 10px;">
          <h3>The Economist BlogScope</h3>
        </div>
		<div id="movie"> </div>
		<script type="text/javascript" src="http://dev.infomous.com/site/economist/swfobject.js"></script>
    	 <script type="text/javascript">
         // <![CDATA[
            var so = new SWFObject("http://dev.infomous.com/site/economist/infomous.swf", "infomous", "348", "300", "9", "#D9E4E6");
            so.addParam("allowScriptAccess", "always");
            so.addParam("allowFullScreen", "true");
            so.addVariable("nid", "930");
            so.addVariable("title", "Economist+Home+Page");
            so.addVariable("loadAtStart", "true");
            so.addVariable("feeds", "http%3A%2F%2Fwww.economist.com%2Fblogs%2Ftheworldin2011%2Findex.xml|http%3A%2F%2Fwww.economist.com%2Fblogs%2Famericasview%2Findex.xml|http%3A%2F%2Fwww.economist.com%2Fblogs%2Fasiaview%2Findex.xml|http%3A%2F%2Fwww.economist.com%2Fblogs%2Fbabbage%2Findex.xml|http%3A%2F%2Fwww.economist.com%2Fblogs%2Fbagehot%2Findex.xml|http%3A%2F%2Fwww.economist.com%2Fblogs%2Fbanyan%2Findex.xml|http%3A%2F%2Fwww.economist.com%2Fblogs%2Fbaobab%2Findex.xml|http%3A%2F%2Fwww.economist.com%2Fblogs%2Fblighty%2Findex.xml|http%3A%2F%2Fwww.economist.com%2Fblogs%2Fbuttonwood%2Findex.xml|http%3A%2F%2Fwww.economist.com%2Fblogs%2Fcharlemagne%2Findex.xml|http%3A%2F%2Fwww.economist.com%2Fblogs%2Fdailychart%2Findex.xml|http%3A%2F%2Fwww.economist.com%2Fblogs%2Fdemocracyinamerica%2Findex.xml|http%3A%2F%2Fwww.economist.com%2Fblogs%2Feastern-approaches%2Findex.xml|http%3A%2F%2Fwww.economist.com%2Fblogs%2Ffreeexchange%2Findex.xml|http%3A%2F%2Fwww.economist.com%2Fblogs%2Fgulliver%2Findex.xml|http%3A%2F%2Fwww.economist.com%2Fblogs%2Fjohnson%2Findex.xml|http%3A%2F%2Fwww.economist.com%2Fblogs%2Flexington%2Findex.xml|http%3A%2F%2Fwww.economist.com%2Fblogs%2Fmultimedia%2Findex.xml|http%3A%2F%2Fwww.economist.com%2Fblogs%2Fnewsbook%2Findex.xml|http%3A%2F%2Fwww.economist.com%2Fblogs%2Fprospero%2Findex.xml|http%3A%2F%2Fwww.economist.com%2Fblogs%2Fschumpeter%2Findex.xml");
            so.addVariable("groups", "1");
            so.addVariable("fontScale", "1.3");
            so.addVariable("panels", "blobs,words,status");
            so.addVariable("zoom", "1");
            so.addVariable("maxWords", "26");
            so.addVariable("popularWordCutoff", "0");
            so.addVariable("linkageThreshold", "2.5");
            so.addVariable("dict", "NOUN|1,VERB|0,ADJECTIVE|0,ADVERB|0,NUMBER|0,OTHER|1"); 
            //so.addVariable("hidden", "will,do,more,economist,another,link,exchange,ahead,week,after,reading material,why,say,under,knife,mr,q%26a,still,no,other,over,up,better,reading,now,re,turn,difference,engine,been,see,being,much,might,may,does,here,way");	
            so.addVariable("hidden","' . $hidden[0] . '");
            
            so.addVariable("textOption", "TITLE_AND_DESCRIPTION");

            so.addVariable("base_path", "http://dev.infomous.com/site/economist/front/");
            so.addVariable("status", "1");
            so.addVariable("interfaceClass", "widget");
            so.addVariable("skin", "economist");
          
            so.write("movie");
            
            function openSnippet(){
            	window.open("full_cloud.html","_blank", "width=800,height=600,menubar=no,toolbar=no,resizable=no");
            }
         // ]]>
        </script>
		<div style="color:#26526F; font-size:10px; height:22px; padding-top: 6px;">
        	<a href="javascript:openSnippet()" style="font-weight: normal; margin-left: 10px;">View full size</a>
        </div>
	</div>

	<div id="most-lists" class="block">',
    $page);
    

echo $page;
?>
