<?php
$page = file_get_contents('http://www.economist.com/node/17361344/comments');

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
	'src="/',
    'src="http://www.economist.com/',
    $page
);

$page = preg_replace(
	'/(?<=\<div id="tagCloudPlaceholder">).*?(?=\<\/div>)/si',
	'<style type="text/css">
	<!--
	  #infomousCloud{
	    font-family: Verdana, Helvetica, Arial, sans-serif;
	    border: 1px solid #CDD9DA;
	    background-color: #F4F8FB;
	    margin-bottom: 25px;
	  }
      #cloudTitle{
      	font-weight: bold;
      	font-size: 1.1em;
      	margin: 5px 10px 12px 10px;
      }
	  #cloudPeriodBar{
          background-color: #E5ECF2;
          font-size: 11px;
          height: 20px;
          margin-bottom: 0;
      }
      #JDGTagCloudControlsDiv a {
          text-decoration: none;
      }
      #cloudContainer{
      	width: 300px;
      	margin: 0 auto;
      }
      #cloudFooter{
      	color:#08526D;
      	font-size:9px;
      	font-weight: bold;
      	margin: 10px;
      }
      .period {
      	color: #999;
      	font-weight: bold;
      	padding: 2px 10px;
      	float: left;
      }
      
      a.date {
          color: #26526F;
          display:block;
          float: left;
          height: 20px;
          border-left: 1px solid #CCC;
          background-color: #E5ECF2;
          text-decoration: none;
          padding: 0 5px;
      }
      a.date span{
      	position: relative;
          top: 2px;
      }
      a.date:hover {
      	background-color: #D4DBE1;
      }
      a.active {
      	color: #000;
      	font-weight: bold;
      	background-color: #FFF;
      }
      a.last{
          border-right: 1px solid #CCC;
      }
      /*span.sortSeparator {
          color: #989898;
          padding: 0 5px;
      }*/
	-->
	</style>
	<script language="javascript">
        <!--
        function openSnippet(){
        	window.open("full_cloud.html","_blank", "width=800,height=600,menubar=no,toolbar=no,resizable=no");
        }
        function thisMovie(movieName) {
             if (navigator.appName.indexOf("Microsoft") != -1) {
                 return window[movieName];
             } else {
                 return document[movieName];
             }
         }
              
        function setDate(elem, days){
        	thisMovie("infomous").setDate(days);
        	$("a.date").removeClass("active");
        	$(elem).addClass("active");
        }
        -->
      </script>
        
      <div id="infomousCloud">
		<div id="cloudTitle">
            Topics most commented on
        </div>
        <div id="cloudContainer">
          <div id="cloudPeriodBar">
              <span class="period">Period:</span> <a class="date" onclick="setDate(this, 1);" id="sortBy1" href="javascript:void(0);"><span>1 day</span></a><a class="date" onclick="setDate(this, 7);" id="sortBy7" href="javascript:void(0);"><span>1 week</span></a><a class="date" onclick="setDate(this, 14);" id="sortBy14" href="javascript:void(0);"><span>2 weeks</span></a><a class="date active last" onclick="setDate(this, 30);" id="sortBy30" href="javascript:void(0);"><span>30 days</span></a>
          </div>
  		<div id="movie"> </div>
  		<script type="text/javascript" src="http://dev.infomous.com/site/economist/test/swfobject.js"></script>
      	 <script type="text/javascript">
           // <![CDATA[
              var so = new SWFObject("http://dev.infomous.com/site/economist/test/infomous.swf", "infomous", "300", "600", "9", "#D9E4E6");
              so.addParam("allowScriptAccess", "always");
              so.addParam("allowFullScreen", "true");
              so.addVariable("loadAtStart", "true");
              so.addVariable("groups", "1");
              so.addVariable("maxWords", "40");
              so.addVariable("linkageThreshold", "1");
              so.addVariable("base_path", "http://dev.infomous.com/site/economist/test/");
              so.addVariable("interfaceClass", "widget");
              so.addVariable("skin", "economist");
  
              so.write("movie");
           // ]]>
          </script>
  		</div>
        <div id="cloudFooter">
        	<a href="javascript:openSnippet()">View full-size opinions cloud</a>
        </div>
        
	</div>',
    $page);
    

echo $page;
?>
