<?php 
//$client_name='USA TODAY';
//$client_logo='http://www.infomous.com/site/client/USAT/Weekend/USATLogo.png';
//$client_link='http://www.usatoday.com';
?>
<!DOCTYPE html>
<html>
<head>
  <title></title>
</head>
<body>
  <div style='background:#fff; width:700px; margin-top:20px;'>
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
      This is a demonstration of including sponsored elements within an Infomous cloud. This example includes a background logo, a sponsored keyword, and a variety of ad formats (to see them, click some of the words, including the sponsored "brought to you by geico").</p>

      <p>Word size indicates how often that word occurs in the articles. Related terms and concepts are linked together with lines.</p>

      <p>Click any word to show a list of links to relevant stories. Click any link to open that article in a new browser tab. </p>

      <p>Find out more at <a href="http://get.infomous.com" target="_blank">the Infomous web site</a></p>
    </div>
  </div>
</body>
</html>

