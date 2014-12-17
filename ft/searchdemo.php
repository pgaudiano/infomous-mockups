<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Infomous Spotlighter from site: Mirror.co.uk</title>
<style type="text/css">
body{
font-family:"Lucida Grande", "Lucida Sans Unicode", Verdana, Arial, Helvetica, sans-serif;
font-size:12px;
}
p, h1, form, button{border:0; margin:0; padding:0;}
.spacer{clear:both; height:1px;}
/* ----------- My Form ----------- */
.myform{
margin:0 auto;
width:400px;
padding:5px;
}
#stylized{
border:solid 2px #b7ddf2;
background:#ebf4fb;
padding-bottom:10px;
}
#stylized h1 {
font-size:14px;
font-weight:bold;
margin-bottom:8px;
border-bottom:solid 1px #b7ddf2;
}
#stylized label{
display:block;
text-align:right;
width:140px;
padding-top:5px;
float:left;
}
#stylized .small{
color:#666666;
display:block;
font-size:11px;
font-weight:normal;
text-align:right;
width:140px;
}
#stylized input,#stylized select{
float:left;
font-size:12px;
padding:4px 2px;
border:solid 1px #aacfe4;
width:200px;
margin:2px 0 10px 5px;
}
.button
{
float:right;
cursor:pointer;
font-size:12px;
padding:4px 2px;
border:solid 1px #aacfe4;
width:200px;
margin:2px 0 15px 7px;
}
#stylized button{
clear:both;
margin-left:150px;
width:125px;
height:31px;
background:#666666;
text-align:center;
line-height:31px;
color:#FFFFFF;
font-size:11px;
font-weight:bold;
}
.infomous-embed-frame
{
margin: 10px auto;
}
</style>
</head>
<body>

<?php 
if($_POST["search"])$search=rawurlencode(str_replace("+"," ",$_POST["search"]));else $search= "premier%20league";
if($_POST["numResults"])$numResults=$_POST["numResults"];else $numResults=30;
$urlencoded="http://www.infomous.com/site/scripts/cloud-from-site/?search=$search&numResults=$numResults";
$ngrams="http://www.infomous.com/site/ngrams/arsenal.txt";
?>

<div id="stylized" class="myform">
	<form method="post">
		<h1>Spotlighter creator from Mirror.co.uk search</h1>
		<label>Search string</label>
		<input type="text" id="search" name="search" value="<?=($search)?urldecode($search):''?>">
		<label>Number of results</label>
		<input type="text" id="numResults" name="numResults" style="width: 50px" value="<?=($numResults)?$numResults:'';?>">
<!--		<label>Frame</label>
		<input type="checkbox" name="frame" <?=($_POST && !$_POST["frame"])?"":"checked"?> style="margin-top:7px;width: auto;"> -->

<? if($_POST && false) {?>
<label>URL to RSS Feed</label>
<input type="text" value="http://infomous.com/site/scripts/cloud-from-site/<?=$search?><?=($numResults)?"/".$numResults:""?>">
<? }?>
		<input type="submit" value="Generate Spotlighter" class="button" style="float: right;"/>
		<div class="spacer"></div>
	</form>
</div>



<!--  <div id="infomous" class="infomous" <?=(!$_POST["frame"])?"style=\"margin: 10px auto;border: 1px solid #000000\"":""?>></div> -->
<div id="infomous" class="infomous" style="margin:10px auto; border: 1px solid #000000"></div>
  <script type="text/javascript">
    var vars = {
      width: "600",
      height: "500",
      maxWords: 40,
<!--      <?=($_POST["frame"])?"setFrame: true,":""?> -->
      setInterfaceType: "widget",
      feeds: "<?=$urlencoded?>",
      ngramsSource: "<?=$ngrams?>",
      colLink: 0xeaeaea,
      skinMaxFontSize: 42,
      skinMinFontSize: 14,
      setFrame: true
   }
  </script>
	<script type="text/javascript" src="/client/embed.js"></script>

<div style="text-align:center; margin-top: 10px">
To create this spotlighter from a feed, use the following URL:<br>
<?=$urlencoded?>
</div>
</body>
</html>

