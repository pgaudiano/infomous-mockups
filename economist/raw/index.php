<?php
$page = file_get_contents('http://www.economist.com/node/17361344/comments');

/*$page = str_replace(
	'<!--[if IE 8]>',
	'<link type="text/css" rel="stylesheet" media="all" href="http://www.jodange.com/publishers/cloud/styles/general.css" />
	<!--[if IE 8]>',
    $page);*/

$page = preg_replace(
	'/(?<=\<div id="tagCloudPlaceholder">).*?(?=\<\/div>)/si',
	'<div style="font-family: Verdana, Helvetica, Arial, sans-serif; font-size 11px; border: 1px solid #CDD9DA; background-color: #F4F8FB; margin-bottom: 25px;">
		<style type="text/css">
		<!--
        #JDGTagCloudControlsDiv{
            background-color: #E5ECF2; font-size: 11px; height: 22px; margin-bottom: 0; padding: 5px 0 0 10px;
        }
        #JDGTagCloudControlsDiv a {
            text-decoration: none;
        }
        .sort {
            color: #26526F;
        }
        span.sortSeparator {
            color: #989898;
            padding: 0 5px;
        }
        .active {
        	color: #000;
        	font-weight: bold;
        }
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
          	$("a.sort").removeClass("active");
          	$(elem).addClass("active");
          }
          -->
        </script>
		<div style="margin-top: 25px;  padding: 0 10px;">
            <strong style="font-size: 13px;">Topics most commented on</strong><!--span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span-->
            <div style="border-bottom:1px solid #000000; clear:both; font-size:4px; width:80%;">&nbsp;</div>
            <div style="margin-top:10px; padding-bottom:10px;">Discover Reader comments on the current most popular topics from across the entire site</div>
        </div>
        <div id="JDGTagCloudControlsDiv">
            <span id="JDGTagCloudTagsSorter" class="controller" style="display: block;">
                <strong style="color: #989699;">Period:</strong> <a class="sort" onclick="setDate(this, 1);" id="sortBy1" href="javascript:void(0);">1 day</a><span class="sortSeparator">|</span><a class="sort" onclick="setDate(this, 7);" id="sortBy7" href="javascript:void(0);">1 week</a><span class="sortSeparator">|</span><a class="sort" onclick="setDate(this, 14);" id="sortBy14" href="javascript:void(0);">2 weeks</a><span class="sortSeparator">|</span><a class="sort active" onclick="setDate(this, 30);" id="sortBy30" href="javascript:void(0);">30 days</a>
            </span>
        </div>
		<script type="text/javascript" src="economist_embed.js"></script>
		
        <div style="background-color:#E5ECF2; color:#26526F; font-size:10px; height:22px; padding-top: 6px;">
        	<a href="javascript:openSnippet()" style="font-weight: normal; margin-left: 10px;">View full-size opinions cloud</a>
        </div>
	</div>',
    $page);
    

echo $page;
?>
