<?php 
$client_name='Yummly';
$client_logo='http://www.infomous.com/site/mockups/yummly/yummly_logo.png';
$client_link='http://www.yummly.com';
?>
<!DOCTYPE html>
<html>
<head>
  <title></title>
</head>
<body>
  <div style='background:#fff; width:700px; margin-top:20px; margin-left: auto; margin-right:auto;'>
    <table style="width:96%;  margin-left: 2%; margin-right: 2%">
      <tr>
        <td align=left>
          <a href="http://www.infomous.com"><img src="http://www.infomous.com/site/logos/logo_on_white.jpg" height="50"></a>
        </td>
        <td align=right>
          <?
            if (isset($client_logo) && isset($client_link)) print '<a href="'.$client_link.'"><img src="'.$client_logo.'" height="50"></a>';
          ?>
        </td>
      </tr>
    </table>
    <div style="font-family:Arial, Helvetica, sans-serif padding-top: 2%; padding-left: 2%; padding-right: 2%;">
      <h2 style="padding-top: 0;text-align:center"><a name="1" id="1"></a>The <? print $client_name ?> <em>Visual Explorer</em> by Infomous</h2>
      <p>
      The <? print $client_name ?> Visual Explorer is based on the <strong><a href="http://get.infomous.com" target="_blank">Infomous</a></strong>
      <em>Visual Exploration</em> technology. Type any food-related keyword (such as an ingredient or a recipe name) and click/tap the <span style="border:1px solid black;padding: 0 2px;"><code>Explore</code></span> button to create an Infomous interactive word cloud from that keyword. Use this Infomous cloud to explore recipes from <? print $client_name ?> based on the keyword(s) you entered.</p>

      <p>For this simple demo we used different colors to represent ingredients (black), courses (orange) and cuisine (green). Word size indicates how often that term occurs in the recipes. Related terms and concepts are linked together with lines.</p>

      <p>Click any word to show a list of links to related recipes on <? print $client_name ?>. Click any link to open that recipe in a new browser tab. </p>

      <p>Find out more at <a href="http://get.infomous.com" target="_blank">the Infomous web site</a></p>
    </div>
  </div>
</body>
</html>

