document.write('\n<!-- Copyright DoubleClick Inc., All rights reserved. -->\n<!-- This code was autogenerated @ Wed Aug 17 10:23:02 EDT 2011 -->\n<script src=\"http://s0.2mdn.net/879366/flashwrite_1_2.js\"><\/script>');document.write('\n  \n');

 
var clickThroughOverlayApplied = 'false';
var dcallowscriptaccess = 'never';
var plugin = false;
var advurl = 'http://www.economist.com';
var alttext = '';
var dcgif = 'http://s0.2mdn.net/2073642/BRIC_728x90.jpg';
var dccreativewidth = '728';
var dcwmode = 'opaque';
var imgurl = 'http://www.economist.com';
var target = '_blank';
var dcbgcolor = '';
var dcswf = 'http://s0.2mdn.net/2073642/BRIC_728x90.swf';
var dcminversion = '10';
var dccreativeheight = '90';

var clickTag = encodeURIComponent('http://ad.doubleclick.net/click%3Bh%3Dv8/3bd8/3/0/%2a/j%3B245024071%3B0-0%3B0%3B41934750%3B3454-728/90%3B43595327/43613114/1%3B%3B%7Esscs%3D%3fhttp://www.economist.com');
function checkFlash(v){ 
var y, x, s="Shockwave", f="Flash", o="object", u="undefined", np=navigator.plugins, nm=navigator.mimeTypes, nmd="application/x-shockwave-flash"; 
v = Math.max(Math.floor(v) || 0, 6); // check if v is a number and use Flash Player 6 as the minimum player version 
if(typeof np!=u&&typeof np[s+" "+f]==o&&(x=np[s+" "+f].description)&&!(typeof nm!=u&&nm[nmd]&&!nm[nmd].enabledPlugin)){ 
if(v<=x.match(/Shockwave Flash (\d+)/)[1])return true;} 
else if(typeof window.ActiveXObject!=u){ 
for(y=16;y>=v;y--){ 
try{x=new ActiveXObject(s+f+"."+s+f+"."+y);if((x!=null)&&(typeof x==o))return true;}catch(e){}} 
} 
return false;}

if ( checkFlash(dcminversion) )  {  
adcode = '<OBJECT classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+
' ID=FLASH_AD WIDTH="'+ dccreativewidth +'" HEIGHT="'+ dccreativeheight +'">'+
'<PARAM NAME=movie VALUE="' + dcswf  +'"><PARAM NAME="FlashVars" VALUE="' +
'clickTag='+clickTag+'"><PARAM NAME=quality VALUE=high><PARAM NAME=bgcolor VALUE=#'+ dcbgcolor +'><PARAM NAME=wmode VALUE='+ dcwmode +'><PARAM NAME="AllowScriptAccess" VALUE="'+dcallowscriptaccess+'">'+
 '<EMBED src="' + dcswf  +'" flashvars="' +
'clickTag='+clickTag+'" quality=high wmode='+dcwmode+
' swLiveConnect=TRUE WIDTH="'+ dccreativewidth +'" HEIGHT="'+ dccreativeheight +'" bgcolor=#'+ dcbgcolor+
' TYPE="application/x-shockwave-flash" AllowScriptAccess="'+dcallowscriptaccess+'"></EMBED></OBJECT>';
if(('j'!="j")&&(typeof dclkFlashWrite!="undefined")){dclkFlashWrite(adcode);}else{document.write(adcode);} 
} else { 
document.write('<A TARGET="_blank" HREF="http://ad.doubleclick.net/click%3Bh%3Dv8/3bd8/3/0/%2a/j%3B245024071%3B0-0%3B0%3B41934750%3B3454-728/90%3B43595327/43613114/1%3B%3B%7Esscs%3D%3fhttp://www.economist.com"><IMG SRC="' + dcgif + '" alt="" BORDER=0></A>');
}
//-->  

document.write('\n<NOSCRIPT><a target=\"_blank\" href=\"http://ad.doubleclick.net/click%3Bh%3Dv8/3bd8/3/0/%2a/j%3B245024071%3B0-0%3B0%3B41934750%3B3454-728/90%3B43595327/43613114/1%3B%3B%7Esscs%3D%3fhttp://www.economist.com\"><img src=\"http://s0.2mdn.net/2073642/BRIC_728x90.jpg\"  border=\"0\" alt=\"\" ></a></NOSCRIPT>');
