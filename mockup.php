<?php
/*
This script is used to generate mockups based on existing web sites.
Created by Paolo G. on 4/25/2011
*/

//If set to "yes" we can overwrite the directory.
$overwrite = "no";

//If set to "yes", the flashvars are added to config.txt
$createconfig = 'no';

// A couple of variables are best set globally here.
$originalURL = "http://bits.blogs.nytimes.com/author/john-markoff/";
$target = "<!-- MiddleRight position -->";
$cloudtitle = "The Bits Blog Navigator";

/* In the following sections we define groups of variables. Because
these variables are used repeatedly to create forms and to create
files, we create each variable as an array that contains three or four
fields: the name used in the html form, the descriptor shown in the
html form, and the default value. If a variable is also printed out as
a JS or flash variable to scripts, we include also the variable
name. These values are then checked against POST to make sure that if
someone fills out a form and there is an error, the values are
preserved. */

// Variables that control the overall script behavior
$scriptvars = array(
array('dirname','64','Mockup directory','test'),
array('title','64','Title',$cloudtitle),
array('originalURL','64','Original URL',$originalURL),
array('target','64','HTML target string',$target)
);
// Preserve user-modified values
set_variables($scriptvars);
$cloudtitle=$scriptvars[1][3];
$originalURL=$scriptvars[2][3];
$target=$scriptvars[3][3];

// Variables that modify both embed.js and popup.js
$genparams = array(
array('src','64','URL of infomous client','http://www.infomous.com/site/mockups/infomous2.swf'
,'src'),
array('bgcolor','12','Background color (#xxxxxx RGB)','#E4E8E9','bgcolor'),
);
set_variables($genparams);

// Parameters that modify only embed.js
$embedparams = array(
array('width','6','Embedded cloud width','362','width'),
array('height','6','Embedded cloud height','400','height'),
);
// Preserve user-modified values
set_variables($embedparams);

// Flash variables that modify embed.js
$embedvars = array(
array('maxwords','4','Max number of words','20','maxWords'),
array('panels','64','Panels (blobs,words,status,bottom,edit,branding,top_demo)','blobs,words,status,branding','setPanels'),
);
// Preserve user-modified values
set_variables($embedvars);

// Parameters that modify only popup.js
$popparams = array(
array('pwidth','6','Embedded cloud width','740','width'),
array('pheight','6','Embedded cloud height','560','height'),
);
// Preserve user-modified values
set_variables($popparams);

// Flash variables that modify popup.js
$popvars = array(
array('pmaxwords','4','Max number of words','40','maxWords'),
array('ppanels','64','Panels (blobs,words,status,bottom,edit,branding,top_demo)','blobs,words,status,bottom,branding','setPanels'),
array('pcontrols','64','Bottom bar controls (fontSlider,zoomSlider,wordsSlider,groups,dict,capture,fullscreen,embed,feedManager,focusSelect)','fontSlider,zoomSlider,wordsSlider,groups,fullscreen,feedManager,focusSelect','setControls'),
array('hidebar','6','Auto-hide the control bar','true','setHideControlBar')
);
// Preserve user-modified values
set_variables($popvars);

// User-specified Flash variables for both embed and popup
$flashvars = array(
array('feeds','64','Feeds (separate with |)','http%3A%2F%2Fbits.blogs.nytimes.com%2Ffeed','feeds'),
array('links','6','Show links between words','true','setShowLinks'),
array('reset','6','Enable reset button for focus/hide','true','setShowReset'),
array('textoption','24','Use TITLE_ONLY or TITLE_AND_DESCRIPTION?','TITLE_AND_DESCRIPTION','textOption'),
array('groups','6','Turn on groups (circles)','true','groups'),
array('hidden','64','Hidden words (comma separated)','no,do,probably,will,new,more,most,gets,up,did,after','hidden'),
array('focused','40','Focused words (comma separated)','','focused'),
);
// Preserve user-modified values
set_variables($flashvars);

/* Additional flash variables not exposed through php form. Moving
any of these up to $flashvars will automatically create a form entry
*/
$fixedflashvars = array(
);

/* Make sure we don't overwrite a directory */
$dirname = $scriptvars[0][3];
if (isset($_POST['dirname'])) {
if (file_exists($dirname) && ($overwrite != "yes")) { 
     echo "<b>Error: The directory $dirname exists. Please specify a different name</b><p>";
     generate_form();
     exit();
   } else {
     if ($dirname == "") {
         echo "Please specify a directory name.";
       } else {
         create_mockup();
	 create_index();
	 create_embed();
	 create_popup();
	 create_help();
	 echo "<p>Mockup created: <a href=\"$dirname\" target=\"_blank\">Check it out</a>\n";
       }
}
}

generate_form();

/* Generate the html form. This function generates an html form
automatically using the variable arrays defined earlier. */
function generate_form() {
	 global $scriptvars, $genparams, $embedparams, $popparams, $embedvars, $popvars, $flashvars;
	 //Get the script name
	 $url_script_name = $_SERVER["SCRIPT_NAME"];

	 // Start the form
	 $form = "<p><form action=\"$url_script_name\" method=\"post\" >\n";

	 /* General script and embed parameters */
	 $form .= "\n<h4>General Parameters</h4>\n";
	 foreach ($scriptvars as $vname => $value) {
	 	 $form .= "<p>$value[2]: <input type=\"text\" name=\"$value[0]\" value=\"$value[3]\" size=\"$value[1]\" />\n";
	 }

	 foreach ($genparams as $vname => $value) {
	 	 $form .= "<p>$value[2]: <input type=\"text\" name=\"$value[0]\" value=\"$value[3]\" size=\"$value[1]\" />\n";
	 }

	 /* Shared flashvars*/
	 $form .= "\n<h4>General flash variables (both embed and popup)</h4>\n";
	 foreach ($flashvars as $vname => $value) {
	 	 $form .= "<p>$value[2]: <input type=\"text\" name=\"$value[0]\" value=\"$value[3]\" size=\"$value[1]\" />\n";
	 }

	 /* Embed-specific parameters and flashvars */
	 $form .= "\n<h4>Embedded Cloud Properties</h4>\n";
	 foreach ($embedparams as $vname => $value) {
	 	 $form .= "<p>$value[2]: <input type=\"text\" name=\"$value[0]\" value=\"$value[3]\" size=\"$value[1]\" />\n";
	 }
	 foreach ($embedvars as $vname => $value) {
	 	 $form .= "<p>$value[2]: <input type=\"text\" name=\"$value[0]\" value=\"$value[3]\" size=\"$value[1]\" />\n";
	 }

	 /* Popup-specific parameters and flashvars */
	 $form .= "\n<h4>Pop-up Cloud Properties</h4>\n";
	 foreach ($popparams as $vname => $value) {
	 	 $form .= "<p>$value[2]: <input type=\"text\" name=\"$value[0]\" value=\"$value[3]\" size=\"$value[1]\" />\n";
	 }
	 foreach ($popvars as $vname => $value) {
	 	 $form .= "<p>$value[2]: <input type=\"text\" name=\"$value[0]\" value=\"$value[3]\" size=\"$value[1]\" />\n";
	 }

	 $form .= "<p> <input type=\"submit\" value=\"Create Mockup\"/>\n</form>";
	 echo $form; 
}

/* Create mockup directory with all necessary files */
function create_mockup() {
   global $dirname;

   // Make sure there is a trailing slash
   if (substr($dirname,-1) != "/") {
          $dirname .= "/";
   }

      // Make the directory and copy some default files
      if (!file_exists($dirname)) {
      $old_umask = umask(0);
      mkdir($dirname,0777);
      umask($old_umask);
      }
      shell_exec("cp templates/* $dirname");

}

/* Create the index.php file */
function create_index() {
	 global $dirname, $originalURL, $target, $cloudtitle;

	 $outfile = fopen($dirname."index.php","w");
	 $content =<<<INDEX
<?php
\$page = file_get_contents('$originalURL');

\$page = str_replace(
		    '$target',
		    '
        <!-- Infomous Insertion -->
	<script language="javascript">
          <!--
          function openSnippet(){
          	window.open("popup.html","_blank", "width=700,height=550,menubar=no,toolbar=no,resizable=no");
          }
          function openHelp(){
          	window.open("infohelp.html","_blank", "width=800,height=400,menubar=no,toolbar=no,resizable=no");
          }
--></script>

		    <div style="padding: 5px; margin: 0 0 10px 0;">
                <div style="font-size: 14px; margin: 0 0 10px 0; font-weight: bold;">$cloudtitle</div>
		<script type="text/javascript" src="embed.js"></script>
                <a href="javascript:openHelp()"><img src="help_on_big.png"></a>
		<a href="javascript:openSnippet()"><img src="popup_on_big.png"></a>
                </div>

$target',
	\$page
);


echo \$page;

?>
INDEX;
	fwrite($outfile,$content);
	fclose($outfile);
}

/* Create the embed.js file */
function create_embed() {
	 global $dirname, $createconfig, $genparams, $embedparams, $embedvars, $flashvars;

	 $outfile = fopen($dirname."embed.js","w");

/* Start with some fixed header information */
	 $content =<<<HEADER
// JavaScript Document
document.write('<div class="infomous_cloud">');
document.write('<embed type="application/x-shockwave-flash"\\
id="infomous"\\
name="infomous"\\
quality="high"\\
allowscriptaccess="always"\\

HEADER;

// Now write out the general and embed-specific parameters
	foreach ($genparams as $jname => $value) {
		$content .= "$value[4]=\"$value[3]\"\\\n";
	}
	foreach ($embedparams as $jname => $value) {
		$content .= "$value[4]=\"$value[3]\"\\\n";
	}

// Start the general and embed-specific flashvars
	$content .= "flashvars=\"loadAtStart=true\\\n";

// Add flashvars
        if ($createconfig == 'no') {
	   foreach ($embedvars as $jname => $value) {
		$content .= "&amp;$value[4]=$value[3]\\\n";
	   }
	   foreach ($flashvars as $jname => $value) {
	   if ($value[3] != '') {
		$content .= "&amp;$value[4]=$value[3]\\\n";
		}
	   }
	} else {
	   $configname = $dirname."config-embed.txt";
	   $content .= "&amp;setConfigURL=\"$configname\"\\\n";
	   $configfile = fopen($configname,"w");
	   foreach ($embedvars as $jname => $value) {
		fwrite($configfile,"$value[4]=$value[3]\n");
	      }
	   foreach ($flashvars as $jname => $value) {
	   if ($value[3] != '') {
		fwrite($configfile,"$value[4]=$value[3]\n");
		}
	      }
	   fclose($configfile);
	}

// Close it out
	$content .="\"');\ndocument.write('</div>');\n";

	fwrite($outfile,$content);
	fclose($outfile);

}

/* Create the popup.html and popup.js files */
function create_popup() {
	 global $dirname, $genparams, $popparams, $popvars, $flashvars, $createconfig;

	 $outfile = fopen($dirname."popup.js","w");

/* Start with some fixed header information */
	 $content =<<<HEADER
// JavaScript Document
document.write('<div class="infomous_cloud">');
document.write('<embed type="application/x-shockwave-flash"\\
id="infomous"\\
name="infomous"\\
quality="high"\\
allowscriptaccess="always"\\

HEADER;

// Now write out the general and popup-specific parameters
	foreach ($genparams as $jname => $value) {
		$content .= "$value[4]=\"$value[3]\"\\\n";
	}
	foreach ($popparams as $jname => $value) {
		$content .= "$value[4]=\"$value[3]\"\\\n";
	}

// Start the general and popup-specific flashvars
	$content .= "flashvars=\"loadAtStart=true\\\n";

// Add flashvars
        if ($createconfig == 'no') {
	   foreach ($popvars as $jname => $value) {
		$content .= "&amp;$value[4]=$value[3]\\\n";
	   }
	   foreach ($flashvars as $jname => $value) {
	   if ($value[3] != '') {
		$content .= "&amp;$value[4]=$value[3]\\\n";
		}
	   }
	} else {
	   $configname = $dirname."config-popup.txt";
	   $content .= "&amp;setConfigURL=\"$configname\"\\\n";
	   $configfile = fopen($configname,"w");
	   foreach ($popvars as $jname => $value) {
		fwrite($configfile,"$value[4]=$value[3]\n");
	      }
	   foreach ($flashvars as $jname => $value) {
	   if ($value[3] != '') {
		fwrite($configfile,"$value[4]=$value[3]\n");
		}
	      }
	   fclose($configfile);
	}

// Close it out
	$content .="\"');\ndocument.write('</div>');\n";

	fwrite($outfile,$content);
	fclose($outfile);

}

/* Create the help file */
function create_help() {
	 global $dirname, $cloudtitle;

	 $content = file_get_contents('infohead.html');
	 $content = str_replace('CLOUDTITLE',$cloudtitle,$content);

	 $outfile = fopen($dirname."infohelp.html","w");
	 fwrite($outfile,$content);
	 fclose($outfile);
}


/* This function checks to see if any values were already set through
a POST, in which case they override the default values. This is done
to avoid someone making lots of changes and losing them all because,
e.g., the directory already existed.*/
function set_variables(&$vararray) {
  foreach ($vararray as $vname => $value) {
   if (isset($_POST[$value[0]]) && ($value[3] != $_POST[$value[0]])) {
         $vararray[$vname][3] = $_POST[$value[0]];
      }
   }
}


?>

