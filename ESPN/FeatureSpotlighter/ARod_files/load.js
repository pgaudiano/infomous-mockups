__AtlasRichMedia__.addModule(
{
moduleId: "urlBuilder_a4",
_getRedirectScriptSource: function(directoryAndPaid) {
var scr = document.getElementsByTagName("script");
var src = "";
for (var i = 0; i < scr.length; i++) {
if (scr[i].src.indexOf(directoryAndPaid) > -1)
src = new String(scr[i].src);
}
return src;
},
_getProtocol: function(adEnv) {
var res = adEnv.http;
if (res != "")
res += "://";
return res;
},
_getAdvertiserID: function(adEnv) {
var startPoint = adEnv.image_path.lastIndexOf("/");
if (startPoint != -1)
return adEnv.image_path.substr(startPoint + 1);
else
return "";
},
getTopLayer: function(adEnv, adProps) {
return this._getProtocol(adEnv) + adEnv.toplayer_path + "TopLayer." + adProps.TopLayerVersion + ".js";
},
getRedirectBustout: function(adEnv, adProps) {
var redirVars = "";
var redirSrc = adProps.idCampaign + "/" + adProps.paid + ".js";
var redirSrcInDom = this._getRedirectScriptSource(redirSrc);
redirSrcInDom = redirSrcInDom.split(".js?");
for (var i = 1; i < redirSrcInDom.length; i++) {
redirVars = redirVars + redirSrcInDom[i];
}
if (redirVars.indexOf("atdmt=") != -1)
redirVars = redirVars.substr(redirVars.indexOf("atdmt=") + 6);
var startPt = adEnv.image_path.lastIndexOf("/");
var adID; 
if (startPt != -1)
adID = adEnv.image_path.substr(startPt + 1);
return this._getProtocol(adEnv) + adEnv.toplayer_path + adID + "/" + redirSrc + "?spd=" + adProps.version + "&atdmt=" + redirVars + "a4eflag&fn=dia4edelim";
},
getEmptyMovieSrc: function(adEnv, adProps) {
var ver = 5;
var reqVer = adProps.flash_version;
if (reqVer > 3 && reqVer < 9)
ver = reqVer;
var emptyMovie = "emptyA4E.ver" + ver + ".swf";
return this._getProtocol(adEnv) + adEnv.toplayer_path + emptyMovie;
},
getMovieSrc: function(adEnv, adProps) {
return this._getProtocol(adEnv) + adEnv.toplayer_path + adProps.movie_name;
},
getAlt: function(adEnv, adProps) {
var altMovieURL;
if (adProps.is_alternate_contents_external) {
altMovieURL = this._getProtocol(adEnv) + adProps.alternate_movie_url + adProps.alt_movie_name;
}
else {
if (adProps.is_alt_from_default_dir) {
altMovieURL = this._getProtocol(adEnv) + adEnv.toplayer_path + adProps.alt_movie_name;
}
else {
var path = adEnv.image_path;
var i = path.lastIndexOf("/");
var ds_path = path.substr(0, i);
altMovieURL = this._getProtocol(adEnv) + ds_path + "/" + adProps.alt_movie_name;
}
}
return altMovieURL + "?spd=" + adProps.version;
},
getSafeServeLoader: function(adEnv, adProps) {
return this._getProtocol(adEnv) + adEnv.toplayer_path + "atlas_ss." + adProps.ssHtmlVersion + ".html";
},
getSafeServeDocument: function(adEnv, adProps) {
return this.getSafeServeLoader(adEnv, adProps) + "?ssIframeScript." + adProps.ssVersion + ".js";
},
getStreamingUrl: function(adEnv) {
if (typeof (adEnv.stream_path_connect) != "undefined" && adEnv.stream_path_connect != "%stream_path_connect%")
return adEnv.stream_path_connect;
else {
var startPt = adEnv.image_path.lastIndexOf("/");
var adID = ""; 
if (startPt != -1)
adID = adEnv.image_path.substr(startPt + 1);
return adEnv.stream_path + adID + "/";
}
},
getChildSwfsDir: function(adEnv, adProps) {
if (!adProps.is_from_default_dir)
return this.getDefaultChildMoviesDir(adEnv);
else
return this._getProtocol(adEnv) + adEnv.toplayer_path + this._getAdvertiserID(adEnv) + "/";
},
getDefaultChildMoviesDir: function(adEnv) {
return this._getProtocol(adEnv) + adEnv.image_path + "/";
},
getChildMoviesPlayDir: function(adEnv) {
if (typeof (adEnv.stream_path_play) != "undefined" && adEnv.stream_path_play != "%stream_path_play%")
return adEnv.stream_path_play + this._getAdvertiserID(adEnv) + "/";
else
return "";
}
});
__AtlasRichMedia__.addModule({
moduleId: 'element_a4',
getPosition: function(el) {
var coord = { x:0, y:0 };
while (el)
{
coord.x += el.offsetLeft;
coord.y += el.offsetTop;
var leftBorderWidth = "NaN";
var topBorderWidth = "NaN";
if(el.currentStyle)
{
if (el.currentStyle.borderLeftWidth)
{
leftBorderWidth = parseInt(el.currentStyle.borderLeftWidth);
}
if (el.currentStyle.borderTopWidth)
{
topBorderWidth = parseInt(el.currentStyle.borderTopWidth);
}
}
else if(el.style)
{
if(el.style.borderLeftWidth)
{
leftBorderWidth = parseInt(el.style.borderLeftWidth);
}
if(el.style.borderTopWidth)
{
topBorderWidth = parseInt(el.style.borderTopWidth);
}
}
if(!isNaN(leftBorderWidth))
{
coord.x += leftBorderWidth;
}
if(!isNaN(topBorderWidth))
{
coord.y += topBorderWidth;
}
try 
{
el = el.offsetParent;
}
catch (e)
{
el = null;
}
} 
return coord;
},
compareLocations: function (node1, node2)
{
var node1Pos = this.getPosition(node1);
var node2Pos = this.getPosition(node2);
if (node2Pos.y > node1Pos.y + parseInt(node1.offsetHeight) ||
node1Pos.y > node2Pos.y + parseInt(node2.offsetHeight) ||
node2Pos.x > node1Pos.x + parseInt(node1.offsetWidth) ||
node1Pos.x > node2Pos.x + parseInt(node2.offsetWidth))
return false;
return true;
},
setInnerHtml : function(trgNode, html)
{
trgNode.innerHTML = '';
var tmpPar = document.createElement('div');
tmpPar.innerHTML = html;
this.insertChildrenAfterBegin(trgNode, tmpPar); 
},
insertChildrenAfterBegin : function(targetNode,oldParent)
{
if(targetNode.childNodes.length == 0)
{
while(oldParent.childNodes[0])
targetNode.appendChild(oldParent.childNodes[0]);
}
else
{
var prevFirst = targetNode.childNodes[0];
while(oldParent.childNodes[0])
targetNode.insertBefore( oldParent.childNodes[0], prevFirst );
} 
},
insertHtmlAfterBegin : function(trgNode, htmlText)
{
if(trgNode.insertAdjacentHTML) 
trgNode.insertAdjacentHTML('afterBegin', htmlText);
else 
{
var divContainer = document.createElement("DIV");
divContainer.innerHTML = htmlText;
this.insertChildrenAfterBegin(trgNode,divContainer);
divContainer = undefined;
}
},
getComputedStyle : function(element,property) {
var win = this.getWindow(element);
if(win.getComputedStyle)
return win.getComputedStyle(element,null)[property];
else {
return element.currentStyle[property];
}
},
getElementByIdOffContainerElement : function(containerElement, tagName, id)
{
var elements = containerElement.getElementsByTagName(tagName);
for(var i = 0; i < elements.length; i++)
{
if(elements[i].id == id)
return elements[i];
}
return null;
},
getWindow: function(element) {
return window;
}
});
__AtlasRichMedia__.addModule({
moduleId: 'domEvents_a3',
add: function(obj,type,handler) {
if(obj.addEventListener)
obj.addEventListener(type,handler,false);
else
obj.attachEvent('on' + type,handler);
},
addWindowUnload: function(win,handler) {
var fired = false;
var p = win.parent;
function fire() {
if(!fired) {
fired = true;
win.clearInterval(intrvl);
handler();
}
}
this.add(win,'unload',fire);
var intrvl = win.setInterval(
function() {
if(win.parent != p)
fire();
},
100
);
},
addResizeHandler: function(win,handler) {
function getCurrentSize() {
return {
h: win.document.body.offsetHeight,
w: win.document.body.offsetWidth
};
}
var previousSize = getCurrentSize();
if(document.all) {
var intrvl = win.setInterval(
function() {
reportAnyResize();
},
200
);
}
win.onresize = function() {
if(intrvl)
win.clearInterval(intrvl);
intrvl = null;
reportAnyResize();
}
function reportAnyResize() {
var currentSize = getCurrentSize();
if(previousSize.h != currentSize.h || previousSize.w != currentSize.w) {
previousSize = currentSize;
handler();
}
}
}
});
__AtlasRichMedia__.addModule(
{
moduleId: 'client_a5',
entry : function(context)
{
if (!this._context)
{
if (context)
this._context = context;
else
this._context = 
{
userAgent : window.navigator.userAgent,
platform : window.navigator.platform
}
}
this.parseInfo();
}, 
parseInfo : function() {
this.platform.parse(this._context.platform);
this.userAgent.parse(this._context.userAgent);
},
isGenerallySupported: function() {
if(this.userAgent.isInternetExplorer() && this.platform.isOSX()) 
return false;
return (this.userAgent.isSupported() && this.platform.isSupported());
},
userAgent: {
name: null,
version: {
major: null,
minor: null
},
getVersion: function() {
return this.version;
},
isFirefox: function()
{
return this.name == "Firefox";
},
isInternetExplorer: function()
{
return this.name == "Internet Explorer" || this.isLiveMessenger();
},
isOpera: function()
{
return this.name == "Opera";
},
isSafari: function()
{
return this.name == "Safari";
},
isAvant: function()
{
return this.name == "Avant Browser";
},
isGoogleChrome: function()
{
return this.name == "Google Chrome";
},
isLiveMessenger: function() 
{
return this.name == "Live Messenger";
},
isAOLMailClient: function() 
{
return this.name == "AOL Mail Client";
},
isSupported: function() {
var ver = this.getVersion();
if(this.isFirefox()) 
return ((ver.major == 1 && ver.minor >= 5) || ver.major > 1);
if(this.isInternetExplorer())
return ((ver.major >= 5 && ver.minor >= 5) || ver.major > 5);
if(this.isSafari())
return (ver.major >= 3);
if(this.isGoogleChrome())
return true;
return false;
},
parse: function(str) {
this.name = null;
this.version = {major: null, minor: null};
for (var brName in this.matches) {
var match = str.match(this.matches[brName]);
if (match) {
if (brName == "Safari")
{
match[3] = match[2];
match[2] = match[1];
match[1] = brName;
}
this.name = brName;
if (match[2])
this.version.major = parseInt(match[2]);
if (match[3])
this.version.minor = parseInt(match[3]);
return;
}
}
},
matches: {
"AOL Mail Client": /.*(MSIE|Microsoft\sInternet\sExplorer)[\s\/]([0-9]+)\.([0-9]+).*AOLBuild/i,
"Google Chrome": /.*(Chrome\/)([0-9]+)\.([0-9]+)/i,
"Avant Browser": /.*(Advanced\sBrowser|Avant\sBrowser).*/i,
"Netscape": /.*(Netscape)[^\/]*\/([0-9]+)\.([0-9]+)/i,
"Opera": /.*(Opera)\s*\/*\s*([0-9]+)\.([0-9]+)/i,
"Safari": /.*Version\/([0-9]+)\.([0-9]+)\.?[0-9]*\s(Safari)/i,
"Firefox": /.*(Firefox|BonEcho|Minefield)[\s|\/]*([0-9]+)\.([0-9]+)[\.]*([^\s]*)/i,
"Live Messenger": /.*(MSIE|Microsoft\sInternet\sExplorer)[\s\/]([0-9]+)\.([0-9]+).*Windows Live Messenger/i,
"Internet Explorer": /.*(MSIE|Microsoft\sInternet\sExplorer)[\s\/]([0-9]+)\.([0-9]+)/i
}
},
platform: {
os: null,
isSupported: function() {
return (this.isWindows() || this.isOSX());
},
isOSX: function() {
return this.os == "OSX";
},
isWindows: function() {
return this.os == "Windows";
},
parse: function(str) {
this.os = null;
if(str.match(/^win/i)) 
this.os = "Windows"; 
else if(str.match(/^mac/i)) 
this.os = "OSX"; 
}
},
supportsRichMediaAd: function(rmAdAlt) {
if(rmAdAlt.playWindow.isMsnHotmail() && (!this.os.isWindows() || !this.platform.isInternetExplorer() )) 
return false;
if(!ARMRedirLib.FlashPlayer.IsVersionSupported(rmAdAlt.flash_version)) 
return false;
return this.isGenerallySupported();
},
scrollbarWidth: 16,
getViewportElement: function()
{
return document.compatMode == "CSS1Compat" ? document.documentElement : document.body;
},
getHeight: function() {
if(window.innerHeight || window.innerHeight == 0) {
if(window.innerHeight >= this.scrollbarWidth) return window.innerHeight - this.scrollbarWidth;
return window.innerHeight;
}
var ve = this.getViewportElement();
if(ve.clientHeight || ve.clientHeight == 0) return ve.clientHeight;
return null;
},
getWidth: function() {
if(window.innerWidth || window.innerWidth == 0) {
if(window.innerWidth >= this.scrollbarWidth) return window.innerWidth - this.scrollbarWidth;
return window.innerWidth;
}
var ve = this.getViewportElement();
if(ve.clientWidth || ve.clientWidth == 0) return ve.clientWidth;
return null;
},
getScrollHeight: function() {
return this.getViewportElement().scrollHeight;
},
getScrollWidth: function() {
return this.getViewportElement().scrollWidth;
},
getScrollLeft: function() {
return this.getViewportElement().scrollLeft;
},
getScrollTop: function() {
return this.getViewportElement().scrollTop;
},
supportsSafeServe: function()
{
return true;
}
}
);
__AtlasRichMedia__.addModule({
entry: function(context) {
if (context)
this._context = context;
else
this._context = {
client: __AtlasRichMedia__.getModule('client_a5'),
Date: Date,
inPaT: function() { return innerDebugMode == true; },
doc: document
}
},
_getAlternateAdHtml: function(src, isCompatibleClient, pub_click_url, click_url_t, paid) {
var timeStamp = (new this._context.Date()).getTime();
var visibility = (!isCompatibleClient || this._context.inPaT() ? "visible" : "hidden");
var report = this._getReportCall(timeStamp, pub_click_url, click_url_t, paid);
var id = 'orange_alternate_' + paid;
return "" +
"<a href='javascript:" + report + "'>" +
"<img alt='' onclick='" + report + "' " +
"usemap=\"#AtlasAltMap_" + paid + "\" " +
"style='visibility:" + visibility + "' " +
"border=0 name='" + id + "' " +
"id='" + id + "' " +
"src='" + src + "'" +
">" +
"</a>" +
"<map name=\"AtlasAltMap_" + paid + "\">" +
"<area href='javascript:" + report + "' shape='default'></map>";
},
_getReportCall: function(timeStamp, pub_click_url, click_url_t, paid) {
return "ARMRedirLib.reportA4EBannerActivity(\"" +
pub_click_url +
"\",\"orange_alternate_" +
paid +
"_rep\", \"" +
click_url_t +
"1\", " +
timeStamp +
")";
},
renderAlt: function(altPath, pub_click_url, click_url_t, pub_view_url, paid, isCompatibleClient) {
if (this._matchesExtension(altPath)) {
var altTxt = this._getAlternateAdHtml(altPath, isCompatibleClient, pub_click_url, click_url_t, paid);
if (pub_view_url)
altTxt += "<div style='visibility:hidden;position:absolute;height:0;width:0;top:0;left:0;'><IMG alt='' style='visibility:hidden;position:absolute;top:0;left:0;' name='AtlasPubReportImage' id='AtlasPubReportImage' border=0 width=1 height=1 src='" + pub_view_url + "'></div>";
if (this._addBreak())
altTxt += "<BR>";
this._context.doc.write(altTxt);
this._changeAlternatePositionToRelative(paid);
}
},
_matchesExtension: function(altPath) {
var matches = altPath.match(/\.(gif|jpg|jpeg)/i);
if (matches && matches[matches.length - 1])
return true;
return false;
},
_addBreak: function() {
var d = this._context.doc.domain;
if ((d.indexOf("ultimateavmag.com") > 0 && d.indexOf("ultimateavmag.com") < 10) ||
(d.indexOf("weather.com") > 0 && d.indexOf("weather.com") < 10))
return true;
return false;
},
_changeAlternatePositionToRelative: function(paid) {
if (this._context.client.userAgent.isFirefox()) {
var alt = this._context.doc.getElementById("orange_alternate_" + paid);
var el = alt;
if (el) {
while (el.offsetParent) {
el = el.offsetParent;
if (el.tagName.toLowerCase() == "table" && el.style.display == "inline") {
alt.style.position = 'relative';
break;
}
}
}
}
},
moduleId: "renderAlternate_a3"
});
(function() {
var WindowWrap = function(win) {
this.win = win;
try {
this.document = this.win.document;
this.frames = this.win.frames;
} catch (e) {
this.document = null;
this.frames = null;
}
}
WindowWrap.entry = function(context) {
if (!context)
var context = {};
if (!context.client)
context.client = __AtlasRichMedia__.getModule('client_a5');
if (!context.messengerOverride)
context.messengerOverride = false;
this._context = context;
}
var p = WindowWrap.prototype;
p.inIframe = function() {
if (this.win.frameElement && this.win.frameElement.tagName == "IFRAME") return true;
return false;
}
p.inFriendlyIframe = function() {
if (!this._canTestItsParentSafely()) return false;
return this.inIframe();
}
p._canTestItsParentSafely = function() {
try {
this.win.document.location && this.win.parent.document.location;
return true;
} catch (e) {
return false;
}
}
p.inAjaxDynamicIframe = function() {
return (this._inMsnAjaxDynamicIframe() || this._inAOLAjaxDynamicIframe() || this._inYahooAjaxDynamicIframe());
}
p.inDynamicIframe = function() {
return (this._inMsnDynamicIframe() || this._inAOLDynamicIframe() || this._inYahooDynamicIframe() || this.inAjaxDynamicIframe());
}
p._inMsnDynamicIframe = function() {
return this.win.inDapIF;
}
p._inMsnAjaxDynamicIframe = function() {
return this.win.inDapMgrIf;
}
p._inAOLDynamicIframe = function() {
return this.win.inFIF;
}
p._inAOLAjaxDynamicIframe = function() {
if (this.win.inFIF && this.win.parent.adsAJAX)
return true;
return false;
}
p._inYahooDynamicIframe = function() {
return this.win.inFIF;
}
p._inYahooAjaxDynamicIframe = function() {
return ((this._inYahooDynamicIframe() && this.win.isAJAX) ||
(this._inYahooAjaxDynIframeKPartnerImpl()));
}
p._inYahooAjaxDynIframeKPartnerImpl = function() {
try {
var mainwindow = this.win;
while (mainwindow != this.win.top) {
if (mainwindow.kPartner && mainwindow.kPartner.emim && mainwindow.kPartner.emim.indexOf('ajax_cert_expandable') > -1)
return true;
mainwindow = mainwindow.parent;
}
}
catch (e)
{ }
return false;
}
p.isMsnHotmail = function() {
if (this.win.document.referrer && this.win.document.referrer.indexOf("mail.live.com") > -1)
return true;
return false;
}
p.inMsnHotmailOnNonWindowsOs = function() {
return (this.isMsnHotmail() && !WindowWrap._context.client.platform.isWindows());
}
p.findPlayWindow = function() {
if (this._inMsnAjaxDynamicIframe() &&
this.win.parent.frameElement &&
this.win.parent.frameElement.tagName == "IFRAME" &&
this.win.parent.frameElement.id &&
this.win.parent.frameElement.id.indexOf("dapIf") == 0)
return this.win.parent.parent;
else
return this.win.parent;
}
p.isInPat = function() {
return this.win.innerDebugMode === true;
}
p.isInDemoLinks = function() {
return this.win.a4eStopError != undefined;
}
p.isInRichMediaWizard = function() {
return this.isInPat() || this.isInDemoLinks();
}
p.isLiveMessenger = function() {
if (this._isMessengerOverridden() || ( this._isCorrectMessengerSize() && (WindowWrap._context.client.userAgent.isLiveMessenger() || this._isMessengerHostDefined())))
return true;
return false;
}
p._isMessengerOverridden = function() {
var c = WindowWrap._context;
return c.messengerOverride && c.client.userAgent.isInternetExplorer();
}
p._isCorrectMessengerSize = function() {
var d = this.document;
return d && d.body && d.body.scrollHeight < 200;
}
p._isMessengerHostDefined = function() {
try {
return WindowWrap._context.client.userAgent.isInternetExplorer() && this.win.external && this.win.external.MsgrHost;
}
catch (e) {
return false; 
}
}
WindowWrap.moduleId = 'WindowWrap_a7';
__AtlasRichMedia__.addModule(WindowWrap);
})();

__AtlasRichMedia__.addModule({
moduleId: 'scriptCreator_a1',
entry: function(context) {
if (context)
this._context = context;
else
this._context = {
doc: document
}
},
addExternalScript: function(targetNode, scriptSrc, scriptID, docOverride) {
this._addScript(targetNode, scriptSrc, false, scriptID, docOverride);
},
addInlineScript: function(targetNode, scriptText, scriptID, docOverride) {
this._addScript(targetNode, scriptText, true, scriptID, docOverride);
},
addHtmlForAndEventInlineScript: function(trgNode, scrTxt, htmlFor, evtAttr, scrID, docOverride) {
if (!docOverride)
docOverride = this._context.doc;
var scr = docOverride.createElement("SCRIPT");
scr.type = "text/javascript";
scr.text = scrTxt;
scr.id = scrID;
scr.htmlFor = htmlFor;
scr.event = evtAttr;
trgNode.appendChild(scr);
},
_addScript: function(targetNode, data, isInline, scriptID, docOverride) {
if (!docOverride)
docOverride = this._context.doc;
var scr = docOverride.createElement("SCRIPT");
scr.type = "text/javascript";
if (isInline)
scr.text = data;
else
scr.src = data;
scr.id = scriptID;
targetNode.appendChild(scr);
}
});
__AtlasRichMedia__.addModule(
{
moduleId: 'dataSerializer_a3',
serialize: function(prms) {
return this._serialize(prms, []);
},
_serialize: function(prms, stack) {
var res = '{';
var isFirst = true;
for (var prmName in prms) {
if (!isFirst) res += ",";
isFirst = false;
res += this._serializeSingleValue(prmName, prms[prmName], stack);
}
res += "}";
return res;
},
_quotify: function(str) {
return "\"" + str.replace(/"/g,"\\\"") + "\"";
},
_serializeSingleValue: function(prmName, value, stack) {
var result = this._quotify(prmName) + ":";
if(value === null) {
result += "null";
} else if(value === undefined) {
result += "undefined";
} else if(this._isNestedData(value)) {
if (!this._isAlreadySerialized(stack, value)) {
stack.push(value);
result += this._serialize(value, stack);
} else {
result += "{}";
}
} else if(typeof(value) == "string") {
result += this._quotify(value);
} else {
result += value;
}
return result;
},
_isNestedData: function(data) {
var ctor = data.constructor;
return !(ctor == String || ctor == Number || ctor == Boolean);
},
_isAlreadySerialized: function(stack, value) {
for (var i = 0; i < stack.length; i++) {
if (stack[i] === value)
return true;
}
return false;
},
unserialize: function(str) {
try {
eval('var result = ' + str);
return result;
} catch(e) {
var result = {};
}
return result;
}
});
__AtlasRichMedia__.addModule(
{
moduleId : 'helperIframeDataSerializer_a3',
serializer: __AtlasRichMedia__.getModule('dataSerializer_a3'),
serializeByPaid: function(paid)
{
var tplPrms = __atlas_ad_info[paid];
tplPrms.paid = paid;
return this.serializer.serialize(tplPrms);
},
unserialize: function(serializedString) {
var tplPrms = this.serializer.unserialize(serializedString);
if(!window.__atlas_ad_info)
window.__atlas_ad_info = {};
__atlas_ad_info[tplPrms.paid] = tplPrms;
}
});
__AtlasRichMedia__.addModule(
{
moduleId : 'safeServeIframeDataSerializer_a4',
entry: function(context) {
if(context)
this._context = context;
else
{
this._context = {
adMgr: __AtlasRichMedia__.getModule('adCollection_a3'),
dataSerializer: __AtlasRichMedia__.getModule('dataSerializer_a3')
}
}
},
getRelevantAdParamsByPaid: function(adProps) {
var result = {};
for ( var adPropName in adProps)
{
var value = adProps[adPropName];
if ( (value || value == '') && this.isRelevantParam(adPropName))
result[adPropName] = adProps[adPropName]; 
}
return result;
},
isRelevantParam : function(adPropName)
{
return adPropName != 'adObject' && adPropName != 'adObjectAlt' && adPropName != 'mods';
},
serializeByPaid: function(paid)
{
var ad = this._context.adMgr.getByPaid(paid);
var relevantAdProps = this.getRelevantAdParamsByPaid(ad.getProperties());
var objToSerialize = {
paid: paid,
adEnv: ad.getEnvironment(),
adProps: relevantAdProps
}
return this._context.dataSerializer.serialize(objToSerialize);
},
_context : null
});
;(function() {
function RmAdAlt(adParms, tplParams) {
this.adParms = adParms;
adParms.adObjectAlt = this;
this.tplParms = this.tplParams = tplParams;
this.handleAdParamsDefaultValues(this.tplParams);
this.idCampaign = adParms.idCampaign;
this.paid = adParms.paid;
this.blContent = adParms.blContent;
this.flash_version = adParms.flash_version;
this.Version = adParms.version;
this.alternateExists = true;
this.bustingOut = false;
this.TopLayerAdURL = "";
this.dynamicIframe = false;
this.oIframeTag = typeof (a4eIframe) != 'undefined';
var WindowWrap = __AtlasRichMedia__.getModule('WindowWrap_a7');
if (WindowWrap) {
var thisWindow = new WindowWrap(window);
if (this.isBustedOut()) {
this.loadWindow = null;
this.playWindow = thisWindow;
} else {
this.loadWindow = thisWindow;
if (this.loadWindow.inFriendlyIframe()) {
this.playWindow = new WindowWrap(this.loadWindow.findPlayWindow());
} else {
this.playWindow = thisWindow;
}
}
}
this.running = false;
}
RmAdAlt.prototype = {
constructor: RmAdAlt,
isBustedOut: function() {
return ((this.tplParams != undefined && this.tplParams != null) && (this.tplParams.paid != undefined && this.tplParams.paid != null));
},
handleAdParamsDefaultValues: function(prm) {
if (prm != null) {
if (prm.pub_click_url != null && (prm.pub_click_url).indexOf('pub_click_url') != -1)
prm.pub_click_url = '';
if (prm.pub_view_url != null && (prm.pub_view_url).indexOf('pub_view_url') != -1)
prm.pub_view_url = '';
if (prm.buster_url != null && (prm.buster_url).indexOf('buster_url') != -1)
prm.buster_url = '';
}
},
runAlternateAd: function(isCompatibleClient) {
if (!this.alternateExists || this.running)
return;
this.running = true;
var ad = __AtlasRichMedia__.getModule("adCollection_a3").getByPaid(this.paid);
ad.reporter.reportRichMediaImpression();
var altPath = __AtlasRichMedia__.getModule('urlBuilder_a4').getAlt(ad.getEnvironment(), ad.getProperties());
__AtlasRichMedia__.getModule('renderAlternate_a3').renderAlt(altPath, this.tplParams.pub_click_url, this.tplParams.click_url_t, this.tplParams.pub_view_url, this.paid, isCompatibleClient);
},
documentIsReady: function(w) {
return (w.document.readyState === undefined || w.document.readyState == "loaded" || w.document.readyState == "complete");
},
insertAdElementsInParentWindow: function() {
if (this.documentIsReady(this.playWindow.win)) {
var tpl = this.tplParams;
tpl.paid = this.paid;
tpl.bustedOut = true;
tpl.loadWindow = this.loadWindow.win;
tpl.playWindow = this.playWindow.win;
tpl.isAjaxScenario = this.loadWindow.inAjaxDynamicIframe();
this.playWindow.win.PAID = this.paid;
if (!this.playWindow.win.__atlas_ad_info)
this.playWindow.win.__atlas_ad_info = {};
this.playWindow.win.__atlas_ad_info[this.paid] = tpl;
this.writeRedirectScript();
}
else {
var obj = this;
window.setTimeout(function() { obj.insertAdElementsInParentWindow() }, 250);
}
},
writeRedirectScript: function() {
var ad = __AtlasRichMedia__.getModule("adCollection_a3").getByPaid(this.paid);
var url = __AtlasRichMedia__.getModule("urlBuilder_a4").getRedirectBustout(ad.getEnvironment(), ad.getProperties());
var scr = this.playWindow.win.document.createElement('script');
scr.type = 'text/javascript';
scr.id = 'ad4everscript2' + this.paid;
scr.src = url;
this.containerElement.appendChild(scr);
}
}
RmAdAlt.moduleId = "RmAdAlt_a1";
RmAdAlt = __AtlasRichMedia__.addModule(RmAdAlt);
})();
if(!window.ARMRedirLib) ARMRedirLib = {};
if (typeof(innerDebugMode) == 'undefined')
{
if (typeof(toplayer_debug_mode) == 'undefined')
innerDebugMode = false;
else
innerDebugMode = toplayer_debug_mode;
}
if(!ARMRedirLib.reportA4EBannerActivity) {
ARMRedirLib.reportA4EBannerActivity = function(externalPubClickURL, A4EReportIMGName , callURLstring , A4EBannerShowTimeStamp)
{
var newWin
if (callURLstring != '')
{
if (innerDebugMode == false)
{
if ((callURLstring.indexOf("http://") != 0) && (callURLstring.indexOf('https') != 0))
newWin = ARMRedirLib.reportA4EBannerActivity.openWindow("http://" + callURLstring);
else
newWin = ARMRedirLib.reportA4EBannerActivity.openWindow(callURLstring);
if (newWin != null)
{
if (document.layers)
{
document["AtlasPubReportImage"].src=externalPubClickURL;
}
else
{
ARMRedirLib.reportA4EBannerActivity.sendImageRequest(externalPubClickURL);
}
}
}
else
{
var eventObj = document.createEventObject();
eventObj.expando = 'exit=1&[No data Available]';
document.all.TopLayerDebugObject.fireEvent("onchange",eventObj);
event.cancelBubble = false;
}
}
elapsedShowtime = (new Date()).getTime() - A4EBannerShowTimeStamp;
}
ARMRedirLib.reportA4EBannerActivity.openWindow = function(url)
{
return window.open(url);
}
ARMRedirLib.reportA4EBannerActivity.sendImageRequest = function(url)
{
var img = new Image();
img.src = url;
}
}
(function() {
if(!__AtlasRichMedia__.getModule('client_a5').isGenerallySupported())
{
for(var paid in __atlas_ad_info)
{
var adprms = ARM_rtc.getByPaid(paid);
if(adprms && !adprms.altIsRunning)
{
adprms.altIsRunning = true;
var rmAdAlt = new (__AtlasRichMedia__.getModule('RmAdAlt_a1'))(adprms,__atlas_ad_info[paid]);
rmAdAlt.runAlternateAd();
}
}
} else {
var altProto = __AtlasRichMedia__.getModule('RmAdAlt_a1').prototype;
altProto.inIframe = function()
{
return (window.self != window.top);
}
altProto.checkIfInDynamicIframe = function()
{
var lw = this.loadWindow;
return (lw && lw.inFriendlyIframe() && ( ARMRedirLib.Iframes.isSelfLocationSameAsTopLocation() || lw.inDynamicIframe()));
} 
altProto.setUpDynamicIframe = function() {
if ( this.checkIfInDynamicIframe() ) 
{
this.dynamicIframe = true;
if(this.loadWindow.inAjaxDynamicIframe())
{
var r = ARMRedirLib.AdRootElement;
r.setAdRootElement(this);
var elem = this.getAdRootElement();
r.setDivsOverflowToVisible(elem);
}
}
}
altProto.setBaseLinkTarget = function() {
if (this.alternateExists && !this.playWindow.document.layers)
{
var baseElements = this.playWindow.document.getElementsByTagName('BASE');
if (baseElements[0]) baseElements[0].target = "_self";
}
}
ARMRedirLib.Alternate = {
Exists: function(destObj)
{
var sAlternateAdName = destObj.blContent[0][13];
if (sAlternateAdName == '' || sAlternateAdName == null || sAlternateAdName == 'null' ||
sAlternateAdName == -1 || sAlternateAdName == '-1')
return false;
else
return true;
} 
}
ARMRedirLib.Iframes = 
{
isSelfLocationSameAsTopLocation: function()
{
return (top.location.href == self.location.href);
},
getDocumentReferrer: function()
{
return document.referrer;
},
getIframeBusterUrl: function(sIfrBusterUrl)
{
var docReferrer = "";
var ifrBusterPath = "atlas/atlas_rm.htm"; 
try
{
docReferrer = ARMRedirLib.Iframes.getDocumentReferrer();
}
catch(e)
{
}
if (docReferrer == "")
{
return sIfrBusterUrl;
}
var regExpRefDomain = new RegExp("([http[s]*[\:\/\/]*]*[^\/]*\/).*","i");
var sReferrerDomain = docReferrer.match(regExpRefDomain)[1];
if (sIfrBusterUrl != "")
{
var regExpIfrBusterPath = new RegExp("(http[s]?\:\/\/[^\/]+[\/]|[^\.]+[\.]+[^\/]+[\/])*(.*)" ,"i");
ifrBusterPath = sIfrBusterUrl.match(regExpIfrBusterPath)[2];
}
if (sReferrerDomain.length > 0 && sReferrerDomain.substr(sReferrerDomain.length - 1) == "/"
&& ifrBusterPath.length > 0 && ifrBusterPath.substr(0, 1) == "/")
{
ifrBusterPath = ifrBusterPath.substr(1);
}
return sReferrerDomain + ifrBusterPath;
},
getBustedIframe: function(paid)
{
var loadWin = __atlas_ad_info[paid].loadWindow || window;
var playWin = __atlas_ad_info[paid].playWindow || window;
if(loadWin == playWin) 
return null;
var iframes = playWin.document.getElementsByTagName('iframe');
for(var i=0; i<iframes.length; i++) {
if(iframes[i].contentWindow == loadWin) 
return iframes[i];
}
return null;
}
}
ARMRedirLib.Dom = 
{
__addEvent : function (obj, evt, func, bubbling) {
if(obj.addEventListener)
obj.addEventListener(evt,func,bubbling);
else if(obj.attachEvent)
obj.attachEvent('on' + evt,func);
},
__removeEvent : function (obj, evt, func, bubbling) {
if(obj.removeEventListener)
obj.removeEventListener(evt,func,bubbling);
else if(obj.detachEvent)
obj.detachEvent('on' + evt,func);
},
__bodyExists : function()
{
return (document.body != undefined && document.body != null);
}, 

AddEvent : function (obj, evt, func, capturing)
{
if(evt == "load") 
{
this.addOnloadEvent(obj, func, capturing);
return;
}
if(!capturing)
capturing = false;
if(obj.addEventListener)
obj.addEventListener(evt, func, capturing);
else if(obj.attachEvent)
obj.attachEvent("on" + evt, func);
},
addOnloadEvent : function(obj, func, capturing) 
{
if(!capturing) 
capturing = false;
var fired = false;
var handler = function() 
{
if(!fired) 
func();
fired = true;
}
if(obj.addEventListener) 
obj.addEventListener('load', handler, capturing);
else if(obj.attachEvent) 
obj.attachEvent('onload', handler);
},
addUnloadEventToWindow: function(win, func) {
var fired = false;
var iframe = win.frameElement;
var handler = function() {
if(!fired) {
fired = true;
ARMRedirLib.Dom.__removeEvent(win,'unload',handler,false);
win.parent.clearInterval(interval);
func();
}
}
this.__addEvent(win,'unload',handler,false);
var interval = win.parent.setInterval(
function() {
if(!ARMRedirLib.Dom.isInDocument(iframe)) {
handler();
}
},
100
);
},
RemoveEvent : function(obj, evt, func)
{
if (obj.removeEventListener)
obj.removeEventListener(evt, func, false);
else if (obj.detachEvent)
obj.detachEvent("on" + evt, func);
},
insertAfter : function(nodeToInsert, nodeToInsertAfter)
{
if(nodeToInsertAfter.nextSibling)
nodeToInsertAfter.parentNode.insertBefore(nodeToInsert,nodeToInsertAfter.nextSibling);
else
nodeToInsertAfter.parentNode.appendChild(nodeToInsert);
},
isInDocument: function(node)
{
if(__AtlasRichMedia__.getModule('client_a5').userAgent.isInternetExplorer()) 
return (node.parentNode != null && node.parentNode.parentNode != null);
else
return (node.parentNode != null); 
},
body: {
executeWhenReady: function(callback) {
if(ARMRedirLib.Dom.__bodyExists()) {
callback();
} else {
window.setTimeout(
function() { ARMRedirLib.Dom.body.executeWhenReady(callback); },
100
);
}
},
insertNodeWhenReady: {
asFirstChild: function(node) 
{	
ARMRedirLib.Dom.body.executeWhenReady(
function()
{
if(document.body.childNodes[0])
{
document.body.insertBefore(node, document.body.childNodes[0]);
}
else
{
document.body.appendChild(node);
}
}
);
}
}
}
};
ARMRedirLib.FlashPlayer = function () {}
ARMRedirLib.FlashPlayer.IsVersionSupported = function(reqVer)
{
var instVer = 0; 
if (navigator.plugins && navigator.plugins.length > 0)
{
var plugin = navigator.plugins["Shockwave Flash"];
if (plugin)
{
if (plugin.description)
{
var re = new RegExp("-?[0-9]+\.[0-9]+");
instVer = parseInt(plugin.description.match(re)[0]);
}
}
}
else
{
try
{
var obj = new ActiveXObject("ShockwaveFlash.ShockwaveFlash." + reqVer);
if (typeof(obj) != 'undefined')
{
instVer = reqVer;
}
}
catch(e)
{
}
}
return instVer >= reqVer;
}
ARMRedirLib.ClientCapabilities = {
screenResolutionSupported: function(adParms)
{
if (adParms.showAnyResolution == "true")
return true;
var screen = this.getScreen();
return adParms["paramres_" + String(screen.width) + "x" + String(screen.height)] == "true";
},
getScreen: function()
{
return screen;
}
}
ARMRedirLib.AdRootElement = function () {}
ARMRedirLib.AdRootElement.setAdRootElement = function(adObjAlt)
{
adObjAlt.adRootElement = null;
for (var iwin = window;
iwin != window.top && iwin.frameElement.tagName != "FRAME" && adObjAlt.adRootElement == null;
iwin = iwin.parent)
{
var frames = iwin.parent.document.getElementsByTagName("iframe");
for (var i = 0; i < frames.length; i++)
{
var el = frames[i];
if (el == iwin.frameElement)
{
var rootEl = el.parentNode;
if (rootEl.tagName != "BODY")
{
adObjAlt.adRootElement = rootEl;
}
break;
}
}
}
}
ARMRedirLib.AdRootElement.setDivsOverflowToVisible = function(adRootElem)
{
if(adRootElem)
{
adRootElem.style.overflow = "visible";
if(adRootElem.parentNode)
{
adRootElem.parentNode.style.overflow = "visible";
}
}
}
ARMRedirLib.moduleId = "ARMRedirLib_c1";
ARMRedirLib.getElementOffsetSize = function (el)
{
var offSize = { offsetWidth:0, offsetHeight:0 };
if ( el)
{
offSize.offsetWidth = el.offsetWidth;
offSize.offsetHeight = el.offsetHeight;
}
return offSize;
}
ARMRedirLib.loadTopLayer = function (destObj, topLayerURL)
{
var scrId = "arm_toplayer_" + destObj.paid;
if (!destObj.oIframeTag)
{
document.write('<scr'+'ipt id=' + scrId + ' src='+topLayerURL+'></scr'+'ipt>');
}
else
{
__AtlasRichMedia__.getModule('scriptCreator_a1').addExternalScript(destObj.getAdRootElement(), topLayerURL, scrId);
} 
}
ARMRedirLib.CleanRMAdElements = function (destObj)
{
var el = destObj.getAdRootElement();
for(var i=el.childNodes.length-1; i>=0 ; i--)
{
var node = el.childNodes[i];
if(node.tagName != "IFRAME")
{
if(node.id && node.id.indexOf(destObj.paid)!= -1)
{	
el.removeChild(node);
} 
}
}
}
ARMRedirLib.onunloadIframe = function(paid)
{ 
if (window.ARM_rtc)
{
for (var i = 0; i < ARM_rtc.RmAdParms.length; i++)
{
if (ARM_rtc.RmAdParms[i].paid == paid)
{
ARM_rtc.RmAdParms.splice(i,1);
break;
}
}
}
if (window.a4eAdsArray)
{
for (var i = 0; i < a4eAdsArray.length; i++)
{
var adObj = a4eAdsArray[i];
if (adObj.paid == paid)
{
adObj.eventReporter.endOfMainPhase();
adObj.eventReporter.endOfAd();
a4eAdsArray.splice(i,1);
break;
}
}
}
}
ARMRedirLib = __AtlasRichMedia__.addModule(ARMRedirLib);
}
if (typeof(ARM_rtc) == "undefined")
{
ARM_rtc = {}; 
}
if (!ARM_rtc.AdLoad)
{
ARM_rtc.AdLoad = function(AdModule)
{
AdModule.Run();
}
}
if (!ARM_rtc.AddModule)
{
ARM_rtc.AddModule = function(module)
{
var modId = module.moduleId;
for (var i = 0; i < ARM_rtc.RmAdParms.length; i++)
{
var parms = ARM_rtc.RmAdParms[i];
for (var j = 0; j < parms.mods.length; j++)
{
var mod = parms.mods[j];
if (mod.moduleId == modId)
{
if (!mod.moduleObject)
mod.moduleObject = module;
if (!mod.moduleInitialized)
{
mod.moduleInitialized = true;
var adObjAlt = new ARM_AdObjAltConstructor(parms, __atlas_ad_info[parms.paid]);
ARM_rtc.AdLoad(adObjAlt);
}
}
}
}
}
}
})();
__AtlasRichMedia__.addModule(
{
moduleId :'pageLoadDetector_a2',
AtlasPageLoaded : false,
entry : function(context)
{
if(context)
this._context = context;
else 
this._context = {
doc: document,
win: window
}
this.startUp();
},
startUp: function()
{
if (this._context.doc.readyState == "complete")
this.AtlasPageLoaded = true;
else
this._attachEvents();
},
_attachEvents: function()
{
var t = this;
var func = function() { t.AtlasPageLoaded = true;};
var win = this._context.win;
if(win.attachEvent)
win.attachEvent("onload", func);
else
this._context.doc.addEventListener("load", func, false);
this._context.win.setTimeout(func, 3000);
}
});
if(__AtlasRichMedia__.getModule('client_a5').isGenerallySupported()) {
function runAlternateAd(destObj, isCompatibleClient)
{
destObj.runAlternateAd(isCompatibleClient);
destObj.setBaseLinkTarget();
}
function ARM_AdObjAltConstructor(parms,tplParams)
{
if (parms.customCode && parms.customCode != "%" + "customCode" + "%")
{
var fbody = 'var client = __AtlasRichMedia__.getModule(\'client_a5\'); ';
fbody += parms.customCode;
(new Function(fbody)).call(parms);
}
var Alt = __AtlasRichMedia__.getModule('RmAdAlt_a1');
var obj = new Alt(parms,tplParams);
obj.adRootElement = null;
obj.Run = function()
{
if (__AtlasRichMedia__.getModule('client_a5').userAgent.isFirefox() && this.loadWindow && this.loadWindow.inMsnHotmailOnNonWindowsOs())
{
runAlternateAd(obj, false);
}
else
{
generalSetup(this);
if (!this.nonCompliantClient)
{
var ad = __AtlasRichMedia__.getModule('adCollection_a3').getByPaid(this.paid);
ad.cleanUpQueue.queueCommand( function() {ARMRedirLib.CleanRMAdElements(obj); } );
ad.cleanUpQueue.queueCommand( function() {ARMRedirLib.onunloadIframe(obj.paid); } );
this.setUpDynamicIframe();
generalValidation(this);
}
}
}
obj.altImagePositionReady = function()
{
this.writeBusterHtml();
}
obj.checkAltPositionAfterIframeLoad = function()
{
var altPosition = __AtlasRichMedia__.getModule('element_a4').getPosition(document.getElementById("orange_alternate_" + this.paid)); 
if ( __atlas_ad_info[this.paid].altPositionX != altPosition.x)
__atlas_ad_info[this.paid].altPositionX = altPosition.x;
if ( __atlas_ad_info[this.paid].altPositionY != altPosition.y)
__atlas_ad_info[this.paid].altPositionY = altPosition.y; 
}
obj.writeBusterHtml = function()
{
if (this.bustingOut)
{
var altElement = document.getElementById("orange_alternate_" + this.paid);
var altPosition = __AtlasRichMedia__.getModule('element_a4').getPosition(altElement);
var ad = __atlas_ad_info[this.paid];
ad.altPositionX = altPosition.x;
ad.altPositionY = altPosition.y;
var altOffsetSize = ARMRedirLib.getElementOffsetSize(altElement);
ad.altHeight = altOffsetSize.offsetHeight;
ad.altWidth = altOffsetSize.offsetWidth;
if (!this.dynamicIframe)
{
var busterIframeHtml = getBusterIframeHtml(this, this.buster, this.uniqueA4EIdForTag2, this.innerTempTopLayerAdURL, this.imageServerURL);
if(this.writeBusterHtml.documentIsReady(document))
{
__AtlasRichMedia__.getModule('element_a4').insertHtmlAfterBegin(this.getAdRootElement(), busterIframeHtml);
}
else
{
document.write(busterIframeHtml);
document.close();
}
}
else
{
this.playWindow.win.a4eIframe = true; 
if ( this.getAdRootElement().tagName.toLowerCase() == "body")
this.containerElement = this.playWindow.win.document.body;
else
this.containerElement = this.getAdRootElement();
this.insertAdElementsInParentWindow(); 
}
}
}
obj.writeBusterHtml.documentIsReady = function(doc)
{
var ua = __AtlasRichMedia__.getModule('client_a5').userAgent;
if(doc.body && (!ua.isInternetExplorer() || doc.readyState == "complete" || doc.readyState == "interactive"))
return true;
return false;
}
obj.getAdRootElement = function()
{
if (!this.adRootElement)
this.adRootElement = document.getElementsByTagName("body")[0];
return this.adRootElement;
}
obj.runAlt = function()
{
var altObj = document.getElementById("orange_alternate_" + this.paid);
if (altObj)
altObj.style.visibility = 'visible';
}
return obj;
}
function generalSetup(destObj)
{
destObj.alternateExists = ARMRedirLib.Alternate.Exists(destObj);	
populateAtlasAdObject(destObj);
destObj.nonCompliantClient = false;
if(!__AtlasRichMedia__.getModule('client_a5').userAgent.isSupported()) 
destObj.nonCompliantClient = true;
if (!ARMRedirLib.FlashPlayer.IsVersionSupported(destObj.flash_version))
destObj.nonCompliantClient = true;
if (!innerDebugMode && !ARMRedirLib.ClientCapabilities.screenResolutionSupported(destObj.adParms))
destObj.nonCompliantClient = true;
if (destObj.nonCompliantClient)
runAlternateAd(destObj, !destObj.nonCompliantClient);
}
function generalValidation(destObj)
{
var newTopLayerAdURL;
var innerTempTopLayerAdURL = "";
var uniqueA4EIdForTag2 = new String (destObj.idCampaign + "\/" + destObj.paid + ".js");
var varStr = getRedirectScriptSource(uniqueA4EIdForTag2); 
destObj.TopLayerAdURL = destObj.tempTopLayerAdURL + "?spd=" + destObj.Version + "&atdmt=";
newTopLayerAdURL = destObj.TopLayerAdURL;
window.onerror = null;
if ((varStr != null) && (varStr.length != 0))
{
varStr = varStr.split(".js?");
for (var i=1;i<varStr.length;i++)
{
innerTempTopLayerAdURL = innerTempTopLayerAdURL + varStr[i];
}
innerTempTopLayerAdURL = innerTempTopLayerAdURL.substr(innerTempTopLayerAdURL.indexOf("atdmt=")+6);
newTopLayerAdURL = destObj.TopLayerAdURL + innerTempTopLayerAdURL;
}
if (destObj.inIframe())
destObj.bustingOut = true;
checkIfBusted(destObj, newTopLayerAdURL,innerTempTopLayerAdURL);
if (!destObj.isBusted)
{
__AtlasRichMedia__.getModule('adCollection_a3').getByPaid(destObj.paid).reporter.reportRichMediaImpression();
}
if (destObj.bustingOut)
{
if (destObj.alternateExists)
setOnloadHandlerForAltImageLoaded(destObj);
var buster = '';
if ( destObj.tplParms.buster_url != '')
buster = ARMRedirLib.Iframes.getIframeBusterUrl(destObj.tplParms.buster_url);
else
{
if (!destObj.dynamicIframe)
destObj.bustingOut = false;
}
}
if (destObj.bustingOut)
{	
if (destObj.alternateExists && !document.layers)
{
var oBaseColl = document.getElementsByTagName("BASE");
if (oBaseColl.length > 0)
oBaseColl[0].target = "_self";
}
if (destObj.adRootElement)
destObj.tplParams.adRootElementId = destObj.adRootElement.id;
destObj.innerTempTopLayerAdURL = innerTempTopLayerAdURL;
destObj.imageServerURL = imageServerURL;
destObj.uniqueA4EIdForTag2 = uniqueA4EIdForTag2;
destObj.buster = buster;
if (!destObj.alternateExists)
destObj.writeBusterHtml();
else
runAltAsync(destObj, 6000);
}
else
{
if (typeof(a4eIframe) != 'undefined')
destObj.oIframeTag = a4eIframe;
var ad = __AtlasRichMedia__.getModule("adCollection_a3").getByPaid(destObj.paid);
ARMRedirLib.loadTopLayer(destObj,__AtlasRichMedia__.getModule('urlBuilder_a4').getTopLayer(ad.getEnvironment(), ad.getProperties()));
}
}
function getRedirectScriptSource(directoryAndPaid)
{
var scripts=document.getElementsByTagName("script");
var src = "";
for (var i=0;i<scripts.length;i++)
{
if (scripts[i].src.indexOf(directoryAndPaid) >-1)
src = new String(scripts[i].src);
}
return src;
}
function checkIfBusted(destObj, newTopLayerAdURL,innerTempTopLayerAdURL )
{
if (newTopLayerAdURL.indexOf("a4eflag") != -1)
{
destObj.bustingOut = false;
destObj.isBusted = true;
}
else
{
runAlternateAd(destObj, !destObj.nonCompliantClient);
}
}
function getBusterIframeHtml(destObj, a4eHTM, uniqueA4EIdForTag2, innerTempTopLayerAdURL, imageServerURL)
{
var serializedTplParams = __AtlasRichMedia__.getModule('helperIframeDataSerializer_a3').serializeByPaid(destObj.paid);
return "<iframe name='" + serializedTplParams + 
"' id='" + serializedTplParams + 
"' height=0 width=0 style='visibility:hidden; border:none;' src=\"" +
a4eHTM + "?" +
uniqueA4EIdForTag2 +
"?spd=" + destObj.Version + "&atdmt=" +
innerTempTopLayerAdURL + "a4eflag&fn=" +
(destObj.dynamicIframe ? "di" : "") + "a4edelim" +
(destObj.dynamicIframe && destObj.tplParams.adRootElementId ? "&adRootElemId=" + destObj.tplParams.adRootElementId + "a4edelim" : "") +
"&imgSrv=" + imageServerURL + "a4edelim" +
"&armver=ifb." + destObj.adParms.ifbVersion + 
"\"> <\/iframe>";
}
function setOnloadHandlerForAltImageLoaded(destObj)
{
ARMRedirLib.Dom.addOnloadEvent(document.getElementById("orange_alternate_" + destObj.paid), function() {destObj.altImagePositionReady();} ); 
ARMRedirLib.Dom.addOnloadEvent(window, function() {destObj.checkAltPositionAfterIframeLoad();}, false);
}
function populateAtlasAdObject(destObj)
{
destObj.adRootElement = null;
if(destObj.tplParams.adRootElementId && destObj.tplParams.adRootElementId != "")
{
destObj.adRootElement = document.getElementById(destObj.tplParams.adRootElementId);
}
else if(destObj.isBustedOut() && destObj.tplParams.isAjaxScenario && destObj.tplParams.adRootElementId == "")
{
destObj.adRootElement = ARMRedirLib.Iframes.getBustedIframe(destObj.paid).parentNode;
}	
destObj.tempTopLayerAdURL = destObj.tplParams.TL_files_path + destObj.paid + "a.js";
}
function runAltAsync(destObj, delay)
{
window.setTimeout(function(){destObj.runAlt();}, delay);
}
if (typeof(ARM_TestMode) == 'undefined')
{
ARM_rtc.AddModule(ARMRedirLib);
}
}
__AtlasRichMedia__.addModule({
moduleId: 'buster_a5',
getLoadWindow: function(ad) {
var result = __atlas_ad_info[ad.getPaid()].loadWindow || window;
return result;
},
isFriendlyBusted: function(ad) {
if(this.getLoadWindow(ad) != window) {
var WindowWrap = __AtlasRichMedia__.getModule('WindowWrap_a7');
var w = new WindowWrap(this.getLoadWindow(ad));
return w.inFriendlyIframe();
}
return false;
}
});
__AtlasRichMedia__.addModule({
moduleId: 'windowUnloadManager_a5',
ads: {},
entry: function() {
var adCol = __AtlasRichMedia__.getModule('adCollection_a3');
var unloadMgr = this;
adCol.enumerate(function(ad) {
if(unloadMgr.ads[ad.getPaid()] != ad) {
unloadMgr.ads[ad.getPaid()] = ad;
unloadMgr.addAd(ad);
}
});
},
addAd: function(ad) {
var buster = __AtlasRichMedia__.getModule('buster_a5');
if(buster.isFriendlyBusted(ad)) {
ARMRedirLib.Dom.addUnloadEventToWindow(
buster.getLoadWindow(ad),
function() {
ad.unload();
}
);
}
}
});
