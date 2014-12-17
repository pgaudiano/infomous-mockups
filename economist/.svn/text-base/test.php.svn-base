<?php
$serverName = 'http://' . $_SERVER['SERVER_NAME'];

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
    	font-size: 13px;
    	margin: 20px 10px 5px 15px;
    }
	  #cloudPeriodBar{
      background-color: #E5ECF2;
      font-size: 11px;
      height: 25px;
      margin-bottom: 0;
      border-bottom: 2px solid #598a9e;
    }
    #cloudContainer{
    	margin: 0;
    }
    #infomousMovie {
    	border-bottom: 1px solid #598a9e;
    	padding: 0;
    	line-height: 0;
    }
    #cloudFooter{
    	color:#08526D;
    	font-size:11px;
    	font-weight: bold;
    	margin: 10px 15px;
    }
    .cloudCaption{
    	margin: 5px 0 10px 15px;
    }
    #cloudPeriodBar .period {
    	color: #999;
    	font-weight: bold;
    	padding: 4px 10px 0 15px;
    	float: left;
    }
    #cloudPeriodBar a.date {
        color: #26526F;
        display:block;
        float: left;
        height: 25px;
        border-left: 1px solid #CCC;
        background-color: #E5ECF2;
        text-decoration: none;
        padding: 0 5px;
    }
    #cloudPeriodBar a.date span{
    	position: relative;
        top: 4px;
    }
    #cloudPeriodBar a.date:hover {
    	background-color: #D4DBE1;
    }
    #cloudPeriodBar a.activeDate {
    	color: #FFF;
    	font-weight: bold;
    	background-color: #598a9e;
    }
    #cloudPeriodBar a.last{
        border-right: 1px solid #CCC;
    }
	-->
	</style>
	
    <div id="infomousCloud">
	    <div id="cloudTitle">
          Topics most commented on
      </div>
      <p class="cloudCaption">Read comments on the site\'s most popular topics</p>
      <div id="cloudContainer">
        <div id="cloudPeriodBar">
            <span class="period">Period:</span> <a class="date" onclick="setDate(this, 1);" id="sortBy1" href="javascript:void(0);"><span>1 day</span></a><a class="date" onclick="setDate(this, 7);" id="sortBy7" href="javascript:void(0);"><span>1 week</span></a><a class="date" onclick="setDate(this, 14);" id="sortBy14" href="javascript:void(0);"><span>2 weeks</span></a><a class="date activeDate last" onclick="setDate(this, 30);" id="sortBy30" href="javascript:void(0);"><span>30 days</span></a>
        </div>
    		<div id="infomousMovie">
    		  <script type="text/javascript" src="http://dev.infomous.com/site/economist/economist_embed_test.js"></script>
    		</div>
  		</div>
      <div id="cloudFooter">
      	<a id="popup-link" href="' . $serverName . '/site/economist/full_cloud.html?days=30">View full-size opinions cloud &raquo;</a>
      </div>
	</div>',
    $page);
    

echo $page;
?>
