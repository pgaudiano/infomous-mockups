document.write('<!-- Template Id = 13,901 Template Name = Banner Creative (Flash) -  In Page Multiples - [DFA] -->\n<!-- Copyright 2006 DoubleClick Inc., All rights reserved. -->\n');

function DCFlash(id,pVM){
var swf = "http://s0.2mdn.net/2584283/BBC America_Standard_Paywall_300x250_Flash_0.swf";
var gif = "http://s0.2mdn.net/2584283/BBC America_Standard_Paywall_300x250_Static_0.jpeg";
var minV = 6;
var FWH = ' width="300" height="250" ';
var url = escape("http://ad.doubleclick.net/click%3Bh%3Dv8/3af1/3/0/%2a/x%3B239898822%3B0-0%3B0%3B62525995%3B4307-300/250%3B41661912/41679699/1%3B%3B%7Eokv%3D%3Bpc%3DDFP239628427%3B%3B%7Efdr%3D239628427%3B0-0%3B1%3B59875002%3B4307-300/250%3B41666478/41684265/1%3B%3B%7Esscs%3D%3fhttp://www.bbc.com/news/?OCID=spring2011b");
var wmode = "opaque";
var bg = "same as SWF";
var dcallowscriptaccess = "never";

var openWindow = "false";
var winW = 600;
var winH = 400;
var winL = 0;
var winT = 0;

var moviePath=swf.substring(0,swf.lastIndexOf("/"));
var sm=new Array();
sm[1] = "";
sm[2] = "";
sm[3] = "";
sm[4] = "";
sm[5] = "";

var ct=new Array();
ct[0]="";if(ct[0].substr(0,4)!="http"){ct[0]="";}         
ct[1] = "";
ct[2] = "";
ct[3] = "";
ct[4] = "";
ct[5] = "";
ct[6] = "";
ct[7] = "";
ct[8] = "";
ct[9] = "";
ct[10] = "";

var fv='"clickTag='+url+'&clickTAG='+url+'&clicktag='+url+'&moviePath='+moviePath+'/'+'&moviepath='+moviePath+'/';
for(i=1;i<sm.length;i++){if(sm[i]!=""){fv+="&submovie"+i+"="+escape(sm[i]);}}
for(i=1;i<ct.length;i++){if(ct[i]!=""){if(ct[i].indexOf("http")==0){x=escape("http://ad.doubleclick.net/click%3Bh%3Dv8/3af1/3/0/%2a/x%3B239898822%3B0-0%3B0%3B62525995%3B4307-300/250%3B41661912/41679699/1%3B%3B%7Eokv%3D%3Bpc%3DDFP239628427%3B%3B%7Efdr%3D239628427%3B0-0%3B1%3B59875002%3B4307-300/250%3B41666478/41684265/1%3B%3B%7Esscs%3D%3f"+ct[i]);}else{x=escape(ct[i]);}fv+="&clickTag"+i+"="+x+"&clickTAG"+i+"="+x+"&clicktag"+i+"="+x;}}
fv+='"';
var bgo=(bg=="same as SWF")?"":'<param name="bgcolor" value="#'+bg+'">';
var bge=(bg=="same as SWF")?"":' bgcolor="#'+bg+'"';
function FSWin(){if((openWindow=="false")&&(id=="DCF0"))alert('openWindow is wrong.');if((openWindow=="center")&&window.screen){winL=Math.floor((screen.availWidth-winW)/2);winT=Math.floor((screen.availHeight-winH)/2);}window.open(unescape(url),id,"width="+winW+",height="+winH+",top="+winT+",left="+winL+",status=no,toolbar=no,menubar=no,location=no");}this.FSWin = FSWin;
ua=navigator.userAgent;
if(minV<=pVM&&(openWindow=="false"||(ua.indexOf("Mac")<0&&ua.indexOf("Opera")<0))){
	var adcode='<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" id="'+id+'"'+FWH+'>'+
		'<param name="movie" value="'+swf+'"><param name="flashvars" value='+fv+'><param name="quality" value="high"><param name="wmode" value="'+wmode+'"><param name="base" value="'+swf.substring(0,swf.lastIndexOf("/"))+'"><PARAM NAME="AllowScriptAccess" VALUE="'+dcallowscriptaccess+'">'+bgo+
		'<embed src="'+swf+'" flashvars='+fv+bge+FWH+' type="application/x-shockwave-flash" quality="high" swliveconnect="true" wmode="'+wmode+'" name="'+id+'" base="'+swf.substring(0,swf.lastIndexOf("/"))+'" AllowScriptAccess="'+dcallowscriptaccess+'"></embed></object>';
  document.write(adcode);
}else{
	document.write('<a target="_blank" href="'+unescape(url)+'"><img src="'+gif+'"'+FWH+'border="0" alt="" galleryimg="no"></a>');
}}
var pVM=0;var DCid=(isNaN("239898822"))?"DCF2":"DCF239898822";
if(navigator.plugins && navigator.mimeTypes.length){
  var x=navigator.plugins["Shockwave Flash"];if(x && x.description){var pVF=x.description;var y=pVF.indexOf("Flash ")+6;pVM=pVF.substring(y,pVF.indexOf(".",y));}}
else if (window.ActiveXObject && window.execScript){
  window.execScript('on error resume next\npVM=2\ndo\npVM=pVM+1\nset swControl = CreateObject("ShockwaveFlash.ShockwaveFlash."&pVM)\nloop while Err = 0\nOn Error Resume Next\npVM=pVM-1\nSub '+DCid+'_FSCommand(ByVal command, ByVal args)\nCall '+DCid+'_DoFSCommand(command, args)\nEnd Sub\n',"VBScript");}
eval("function "+DCid+"_DoFSCommand(c,a){if(c=='openWindow')o"+DCid+".FSWin();}o"+DCid+"=new DCFlash('"+DCid+"',pVM);");
//-->

document.write('\n<noscript><a target=\"_blank\" href=\"http://ad.doubleclick.net/click%3Bh%3Dv8/3af1/3/0/%2a/x%3B239898822%3B0-0%3B0%3B62525995%3B4307-300/250%3B41661912/41679699/1%3B%3B%7Eokv%3D%3Bpc%3DDFP239628427%3B%3B%7Efdr%3D239628427%3B0-0%3B1%3B59875002%3B4307-300/250%3B41666478/41684265/1%3B%3B%7Esscs%3D%3fhttp://www.bbc.com/news/?OCID=spring2011b\"><img src=\"http://s0.2mdn.net/2584283/BBC America_Standard_Paywall_300x250_Static_0.jpeg\" width=\"300\" height=\"250\" border=\"0\" alt=\"\" galleryimg=\"no\"></a></noscript>\n');
