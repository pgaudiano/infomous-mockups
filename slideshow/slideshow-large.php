<?php
$delay=30;
?>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<!--
Infomous slide show. Adapted from:
SlideShow v1.0
Troy Wolf <troy@troywolf.com>
Simply define your "slides" in the javascript slides[] array below.
-->
<html>
<head>
<title>Infomous Slide Show</title>
<meta http-equiv="content-type" content="text/html; charset=windows-1250">

<style>
/* Change body background-color to change fade out color. */
/* body.siteshow { margin:0; padding:0; background-color:#FFFFFF; }*/
body.siteshow { margin:0; padding:0; }
#menu
{
    font-family:Arial;
    font-size:18pt;
    display:none;
    opacity:0.00;
    -mozopacity:0.00;
    filter:alpha(opacity=0);
    position:absolute;
    top:10px;
    left:1710px;
    padding:5px;
    background-color:#AAAAAA;
    color:#FFFFFF;
    border:2px #999999;
}
#menu a { color:#ffffff; }
#menu a:hover { text-decoration:none; }
#title { font-size:11pt; font-weight:bold; letter-spacing:2; }
#slides { font-size:9pt; line-height:16pt; }
#slide1 { font-size:9pt; line-height:16pt; background-color:#99CC99; }
.button { width:60px; font-size:9pt; letter-spacing:1; }
</style>

<script type="text/javascript">
var current_idx = 0;
var slides = new Array();
var active_slide = "slide1";
var previous_slide = "slide1";
var active_bgcolor = "#99CC99";
var normal_bgcolor = "#AAAAAA";
var menuwin;
var show_timer;
var menu_timer;
var menu;
var content;
var loaded = true;

// Define your "slides". 3 values for each are:
//      1. Duration in seconds.
//      2. Title to be used in menu.
//      3. Source URL. Can be full URI or a relative URL.
var slnum = 1;
slides[slnum++] = new Array(<?php print(($_REQUEST['delay'])?$_REQUEST['delay']:$delay)?>, "EMC Big Data Blog", "http://www.infomous.com/site/mockups/slideshow/cloud-large.php?nid=24610");
slides[slnum++] = new Array(<?php print(($_REQUEST['delay'])?$_REQUEST['delay']:$delay)?>, "EMC on Twitter", "http://www.infomous.com/site/mockups/slideshow/cloud-large.php?nid=24620");
//slides[slnum++] = new Array(<?php print(($_REQUEST['delay'])?$_REQUEST['delay']:$delay)?>, "US Weekly", "http://www.infomous.com/site/mockups/slideshow/cloud-large.php?nid=13745");
slides[slnum++] = new Array(<?php print(($_REQUEST['delay'])?$_REQUEST['delay']:$delay)?>, "CNN Labels", "http://www.infomous.com/site/mockups/slideshow/cloud-large.php?nid=9979");
slides[slnum++] = new Array(<?php print(($_REQUEST['delay'])?$_REQUEST['delay']:$delay)?>, "TechCrunch", "http://www.infomous.com/site/mockups/slideshow/cloud-large.php?nid=11904");
slides[slnum++] = new Array(<?php print(($_REQUEST['delay'])?$_REQUEST['delay']:$delay)?>, "World News", "http://www.infomous.com/site/mockups/slideshow/cloud-large.php?nid=78");
slides[slnum++] = new Array(<?php print(($_REQUEST['delay'])?$_REQUEST['delay']:$delay)?>, "Sports News", "http://www.infomous.com/site/mockups/slideshow/cloud-large.php?nid=1248");

function MenuInit()
{
    var html = "";
    for(idx=1; idx<slides.length; idx++) {
        html += '<span id="slide'+idx+'"><a href="javascript:Navigate('+idx+')">' +
            slides[idx][1] + "</a></span><br />\n";
    }
    document.getElementById("slides").innerHTML = html;
    menu.style.display = "block";
}

function MenuShow()
{
    clearTimeout(menu_timer);
    opacity('menu', 0, 70, 100);
//    menu_timer = setTimeout("MenuHide()", 2000); // Note: disabling fade-out
				  
}

function MenuHide()
{
    opacity('menu', 50, 0, 300);
}

function Pause()
{
    clearTimeout(show_timer);
    document.getElementById('play').style.display = "block";
    document.getElementById('pause').style.display = "none";
}

function Navigate(slide_idx)
{
    clearTimeout(show_timer);
    if (current_idx == 0) {
        if (!slide_idx) { slide_idx = 1; }
        current_idx = slide_idx;
        active_slide = 'slide1';
        content.src = slides[current_idx][2];
        document.getElementById('play').style.display = "none";
        document.getElementById('pause').style.display = "block";
        show_timer = setTimeout("Navigate()", slides[current_idx][0]*1000);
        return;
    }

    if (slide_idx) {
        current_idx = slide_idx;
        content.src = slides[current_idx][2];
        document.getElementById(previous_slide).style.backgroundColor=normal_bgcolor;
        active_slide = 'slide'+current_idx;
        document.getElementById(active_slide).style.backgroundColor=active_bgcolor;
        previous_slide = active_slide;
        document.getElementById('play').style.display = "block";
        document.getElementById('pause').style.display = "none";
        return;
    }

    loaded = false;
    current_idx++;
    active_slide = 'slide'+current_idx;

    if ( current_idx == slides.length) { current_idx = 1; active_slide = 'slide1'; }
    opacity('content', 100, 0, 200);
    document.getElementById('play').style.display = "none";
    document.getElementById('pause').style.display = "block";
    document.getElementById(active_slide).style.backgroundColor=active_bgcolor;
    document.getElementById(previous_slide).style.backgroundColor=normal_bgcolor;
    previous_slide = active_slide;
    show_timer = setTimeout("Navigate()", slides[current_idx][0]*1000);
    return;   
}

function opacity(id, opacStart, opacEnd, millisec)
{
    //speed for each frame
    var speed = Math.round(millisec / 100);
    var timer = 0;

    //determine the direction for the blending, if start and end are the same nothing happens
    if(opacStart > opacEnd) {
        for(i = opacStart; i >= opacEnd; i--) {
            setTimeout("changeOpac(" + i + ",'" + id + "')",(timer * speed));
            timer++;
        }
        if (opacEnd == 0) { setTimeout("FadeOutTrigger('"+id+"')",((timer-1) * speed));; }
        //if (opacEnd == 0) { FadeOutTrigger(id); }
    } else if(opacStart < opacEnd) {
        if (opacStart == 0) { FadeInTrigger(id); }
        for(i = opacStart; i <= opacEnd; i++)
            {
            setTimeout("changeOpac(" + i + ",'" + id + "')",(timer * speed));
            timer++;
        }
    }
}

//change the opacity for different browsers
function changeOpac(opacity, id)
{
    var object = document.getElementById(id).style;
    object.opacity = (opacity / 100);
    object.MozOpacity = (opacity / 100);
    object.KhtmlOpacity = (opacity / 100);
    object.filter = "alpha(opacity=" + opacity + ")";
}

function FadeOutTrigger(id)
{
    //alert('FadeOut: '+id);
    switch(id) {
    case "menu":
        document.getElementById(id).style.display = "none";
        break;
    case "content":
        content.src = slides[current_idx][2];
        //setTimeout("opacity('content', 0, 100, 200)", 1000);
        break;
    default:
        break;
    }
}

function FadeInTrigger(id)
{
    //alert('FadeIn: '+id);
    switch(id) {
   case "menu":
        document.getElementById(id).style.display = "block";
        break;
    case "content":
        //opacity('content', 0, 100, 200);
        break;
    default:
        break;
    }
}

function FadeInContent()
{
    if (!loaded) {
        opacity('content', 0, 100, 200);
        loaded = true;
    }
}

function LoadTrigger()
{
    //self.resizeTo(1366,768);
    menu = document.getElementById('menu');
    content = document.getElementById('content');
    Navigate();
    MenuInit();
    MenuShow();
}

window.onload = LoadTrigger;

</script>

</head>
<body class="siteshow">
<iframe id="content" name="content" style="width:100%; height:100%;" frameborder="no" scrolling="auto" src="" onload="FadeInContent();" ></iframe>
<div id="menu">
    <div id="title">SlideShow Menu</div>
    <div id="slides">
    </div>
    <p>
        <input id="pause" class="button" style="display:block;" type="button" value="pause" onclick="Pause()" />
        <input id="play" class="button" style="display:none;" type="button" value="play" onclick="Navigate()" />
    </p>
</div>
</body>
</html>
