if (typeof(__atlas_ad_info)=="undefined") 
var __atlas_ad_info = new Object(); 
var PAID = "e770ba9984b74756b013597932cf9c926372270dc4d94138b16a15ee8fa24a1f";
var TopLayer_version = "3";
var A4E_DELIMITER = "a4edelim";
var pubClick = ("http://ad.doubleclick.net/click%3Bh%3Dv8/3d13/3/0/%2a/d%3B262020495%3B0-0%3B0%3B60859893%3B4307-300/250%3B50488615/50462228/1%3Bu%3Dswid%3D2246E08E-419F-4155-9F58-1D53A897D0CD|pgn%3Dsweetspot|pgtyp%3Dblog|sp%3Dmlb|col%3Dschoenfield_david%3B%7Esscs%3D%3f"!="") ? "http://ad.doubleclick.net/click%3Bh%3Dv8/3d13/3/0/%2a/d%3B262020495%3B0-0%3B0%3B60859893%3B4307-300/250%3B50488615/50462228/1%3Bu%3Dswid%3D2246E08E-419F-4155-9F58-1D53A897D0CD|pgn%3Dsweetspot|pgtyp%3Dblog|sp%3Dmlb|col%3Dschoenfield_david%3B%7Esscs%3D%3f" : "%pub_click_url%";
__atlas_ad_info["e770ba9984b74756b013597932cf9c926372270dc4d94138b16a15ee8fa24a1f"] = 
{site_alias: "417691838",
ad_id: "297102287",
atlas_view_url: "http://view.atdmt.com/jview/417691838/direct;ai.297102287;vt.2/01", 
click_url_t: "http://clk.atdmt.com/go/417691838/direct;vt.1;ai.297102287;ct.",
event_url_t: " http://clk.atdmt.com/go/417691838/direct;vt.1;ai.297102287;ct.i",
duration_url_t: "http://clk.atdmt.com/go/417691838/direct;vt.1;ai.297102287;ct.d;ea.",
report_suffix: "/01/",
pub_click_url: pubClick,
pub_view_url: "%pub_view_url%",
buster_url: "%buster_url%",
ds_path: "spe.atdmt.com/ds/4CSF1STUBSTU",
streaming_url: "undefined", 
advertiserID : "",
TL_files_path : ""
};
var sNullGUID = "00000000000000000000000000000000";
var sDir = PAID.substring(32);
var imageServerURL = "HTTP" + "://rmd.atdmt.com/tl/";
var checkObject = eval('__atlas_ad_info["'+PAID+'"]');
var startPoint = checkObject.ds_path.lastIndexOf("/");
if (startPoint != -1)
checkObject.advertiserID = checkObject.ds_path.substr(startPoint+1);
else
checkObject.advertiserID = "";	
imageServerURL = imageServerURL + checkObject.advertiserID + "/" ;
var sURL = imageServerURL + sDir + "/"+PAID+".js?ver=" + parseInt(TopLayer_version);
checkObject.TL_files_path = imageServerURL + sDir + "/";
sURL = sURL + "&atdmt=";
checkObject.streaming_url = checkObject.streaming_url + checkObject.advertiserID + "/" ;
if ((checkObject.pub_click_url != "") && (checkObject.pub_click_url.indexOf("pub_click_url") == -1)) sURL = sURL + "&a4eclickmacro=" + checkObject.pub_click_url + A4E_DELIMITER;
if ((checkObject.pub_view_url != "") && (checkObject.pub_view_url.indexOf("pub_view_url") == -1)) sURL = sURL + "&a4eviewmacro=" + checkObject.pub_view_url + A4E_DELIMITER;
if ((checkObject.buster_url != "") && (checkObject.buster_url.indexOf("buster_url") == -1)) sURL = sURL + "&a4ehtm=" + checkObject.buster_url + A4E_DELIMITER;
document.writeln("<scr" + "ipt language='javascript' " + "src='" + sURL + "'></scr" + "ipt>"); 