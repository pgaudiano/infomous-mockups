<?php

$page = file_get_contents('http://www.johnson.cornell.edu/Alumni.aspx');

$page = str_replace(
      '<head id="Head">',
      '<head id="Head">
      <base href="http://www.johnson.cornell.edu">
      ',
      $page);

$page = str_replace(
      '<h4>Order Yours Today</h4>',
      '<h4>Order Yours Today</h4>
      <img src="http://www.infomous.com/site/mockups/iFactory/Slides.png" border="0">',
      $page);

$page = str_replace(
      '<a href="http://www.johnson.cornell.edu/Alumni/Contact-Us.aspx">Contact Us</a>',
      '<a href="http://www.johnson.cornell.edu/Alumni/Contact-Us.aspx">Contact Us</a>
      </li>
      <li style="margin-left:5px">
	 <!-- Infomous insertion -->
	 <p>
	 <h4>The @JohnsonSchool Navigator</h4>
	 <script type="text/javascript" src="http://www.infomous.com/cloud_widget/5803?width=190&height=380&caption=false&setInteractionMode=click&colLink=0xCC2222&colLinkHover=0x222222&colWord=0xE6E6E6&colWordHover=0xA30B0B&colWordHoverLinked=0x111111&colWordFade=0xEEEEEE&colBlob=0xB31B1B&colBlobBorder=0x000000&colBlobHover=0xD33B3B&colBackground=0xD6D6D6"></script>
	 <script type="text/javascript" src="http://www.infomous.com/site/mockups/iFactory/embed2.js"></script>
',
	$page
);



echo $page;

?>