/* Vermont 12.4.0-1203 (2011-04-19 22:06:07 UTC) */
rsinetsegs=['J08782_10044','J08782_10009','J08782_10012','J08782_10013','J08782_10016','J08782_10018','J08782_10019','J08782_10020','J08782_10021','J08782_10022','J08782_10023','J08782_10024','J08782_10025','J08782_10026','J08782_10034'];
var rsiExp=new Date((new Date()).getTime()+2419200000);
var rsiDom=location.hostname;
rsiDom=rsiDom.replace(/.*(\.[\w\-]+\.[a-zA-Z]{3}$)/,'$1');
rsiDom=rsiDom.replace(/.*(\.[\w\-]+\.\w+\.[a-zA-Z]{2}$)/,'$1');
rsiDom=rsiDom.replace(/.*(\.[\w\-]{3,}\.[a-zA-Z]{2}$)/,'$1');
var rsiSegs="";
var rsiPat=/.*_5.*/;
for(x=0;x<rsinetsegs.length;++x){if(!rsiPat.test(rsinetsegs[x]))rsiSegs+='|'+rsinetsegs[x];}
document.cookie="rsi_segs="+(rsiSegs.length>0?rsiSegs.substr(1):"")+";expires="+rsiExp.toGMTString()+";path=/;domain="+rsiDom;
if(typeof(DM_onSegsAvailable)=="function"){DM_onSegsAvailable(['J08782_10044','J08782_10009','J08782_10012','J08782_10013','J08782_10016','J08782_10018','J08782_10019','J08782_10020','J08782_10021','J08782_10022','J08782_10023','J08782_10024','J08782_10025','J08782_10026','J08782_10034'],'j08782');}