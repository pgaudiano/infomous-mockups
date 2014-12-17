(function() {
function ElementHider(tagName, overlapNode, ignoreList)
{
this.tagName = tagName;
this.overlapNode = overlapNode;
this.hiddenElements = [];
this.ignoreList = ignoreList;
}
ElementHider.prototype = {
hideElements: function()
{
var elementsToHide = mod._context.doc.getElementsByTagName(this.tagName); 
for (var i = 0; i < elementsToHide.length; i++)
{
var el = elementsToHide[i];
if(this._shouldHide(el))
{
el.style.visibility = 'hidden';
this.hiddenElements.push(el);
}
}
},
_shouldHide: function(el)
{
return !this._isElementInIgnoreList(el) && 
el.style.visibility != 'hidden' && 
mod._context.elementMod.compareLocations(el, this.overlapNode);
},
_isElementInIgnoreList: function(el)
{
for(var i = 0; i < this.ignoreList.length; i++)
{
if(this.ignoreList[i] == el)
return true;
}
return false;
},
showElements: function()
{
while(this.hiddenElements.length > 0)
{
var el = this.hiddenElements[0];
this.hiddenElements.shift();
el.style.visibility = 'visible'; 
} 
}
}
var mod = {
create: function(tagName, overlapNode, ignoreList) { return new ElementHider(tagName, overlapNode, ignoreList); },
entry: function(context) 
{
if(!this._context)
{
if(context)
this._context = context;
else 
this._context = {
elementMod: __AtlasRichMedia__.getModule('element_a4'),
doc: document
}
}
},
moduleId: 'ElementHider_a1'
}
__AtlasRichMedia__.addModule(mod);
})();
(function() {
function InterferingElements(AdParms, bustedIframe, clippingNode, ssIframe) {
this.bustedIframe = bustedIframe;
this.clippingNode = clippingNode;
this.selectElementHider = mod._context.ElementHider.create('select', clippingNode, []);
this.appletElementHider = mod._context.ElementHider.create('applet', clippingNode, []);
this.iframeElementHider = mod._context.ElementHider.create('iframe', clippingNode, this._createIframeIgnoreList(ssIframe));
this.hideSelectMap = {
"teaser": AdParms.paramhideselectteaser == "true",
"reminder": AdParms.paramhideselectreminder == "true",
"main": AdParms.paramhideselectmain == "true"
}
this.hideIframesMap = {
"teaser": AdParms.paramnoframesteaser == "true",
"reminder": AdParms.paramnoframesreminder == "true",
"main": AdParms.paramnoframesmain == "true"
}
}
InterferingElements.prototype = {
showAndHidePageObjects: function(phase, mouseOver) {
this._hideOtherElements(phase);
this._checkBustedIframe(mouseOver);
},
showAll: function() {
this.selectElementHider.showElements();
this.appletElementHider.showElements();
this.iframeElementHider.showElements();
}, 
_createIframeIgnoreList: function(ssIframe) {
var list = [];
list.add = function(o) {
if(o)
this.push(o);
}
list.add(this.bustedIframe);
list.add(ssIframe);
return list;
},
_hideOtherElements: function(phase) {
this.showAll();
if (this.hideSelectMap[phase]) {
this.selectElementHider.hideElements();
this.appletElementHider.hideElements();
}
if (this.hideIframesMap[phase])
this.iframeElementHider.hideElements();
},
_checkBustedIframe: function(mouseOver) {
if (this.bustedIframe && !mod._context.client.userAgent.isInternetExplorer()) {
if (mouseOver && mod._context.elementMod.compareLocations(this.bustedIframe, this.clippingNode))
this._hideBustedIframe();
else if (this.weHideBustedIframe)
this._showBustedIframe();
}
},
_hideBustedIframe: function() {
this.bustedIframe.style.visibility = 'hidden';
this.weHideBustedIframe = true;
},
_showBustedIframe: function() {
this.bustedIframe.style.visibility = 'visible';
this.weHideBustedIframe = false;
}
}
var mod = {
InterferingElements: InterferingElements,
entry: function(context) {
var mc = __AtlasRichMedia__;
if (!this._context) {
if (context)
this._context = context;
else
this._context = {
client: mc.getModule('client_a5'),
elementMod: mc.getModule('element_a4'),
ElementHider: mc.getModule('ElementHider_a1')
}
}
},
moduleId: 'InterferingElements_a5'
}
__AtlasRichMedia__.addModule(mod);
})();
(function() {
function reportEvent(url, eventReporterInstance)
{ 
if (window.testAtlasEvent)
testAtlasEvent(url);
var img = new Image();
img.src = url;
img.alt = '';
eventReporterInstance.rptImg[eventReporterInstance.rptImg.length] = img;
}
var EventReporter = function(adEnvParams, isInPat) {
this.adEnvParams = adEnvParams;
this.isInPat = isInPat;
this.eventCounter = {};
this.rptImg = [];
}
EventReporter.moduleId = 'EventReporter_a2';
EventReporter.entry = function(context) {
if (!context)
var context = {};
if (!context.reportEvent)
context.reportEvent = reportEvent;
if (!context.Date)
context.Date = Date;
this.context = context;
}
var Const = {
REPORT_FLASH: 'flash',
MAX_NUM_EXITS: 50,
MAX_TRACK_PER_EVENT: 50,
EventBrandExposure: "d",
EventMainDuration: "r",
EventTimeToMain: "s",
EventTimeToInteract: "t",
EventInitialRollover: "u",
EventRolloverDuration: "v"
}
EventReporter.Const = Const;
var proto = EventReporter.prototype;
proto.numofmain = 0;
proto.exitOrEventOccurred = false;
proto.tViewTime = null;
proto.startTimeOfMainPhase = null;
proto.numofmain = 0;
proto.bRolloverEventsEnabled = false;
proto.tRolloverTime = null;
proto.eventCounter = null;
proto.clicksCount = 0;
proto.getAdEnvironment = function() {
return this.adEnvParams;
}
proto.sendDebugCall = function(a1, a2, a3) {
sendDebugCall(a1, a2, a3);
}
proto.firstInteraction = function()
{
if(this.tViewTime) {
if (!this.exitOrEventOccurred)
{
this.exitOrEventOccurred = true;
this.EmitEvent(Const.EventTimeToInteract, this.tViewTime.getSeconds());
}
}
}
proto.startOfMainPhase = function()
{
if (this.tViewTime && !this.startTimeOfMainPhase) {
this.numofmain++;
this.startTimeOfMainPhase = new EventReporter.Timer();
if (this.numofmain == 1) {
this.EmitEvent(Const.EventTimeToMain, this.tViewTime.getSeconds());
this.firstInteraction();
}
}
}
proto.endOfMainPhase = function()
{
if (this.startTimeOfMainPhase)
{
this.EmitEvent(Const.EventMainDuration, this.startTimeOfMainPhase.getSeconds());
this.startTimeOfMainPhase = null;
}
}
proto.endOfAd = function()
{
if(this.tViewTime) {
if (!this.BXDReported)
{
this.EmitEvent(Const.EventBrandExposure, this.tViewTime.getSeconds());
EventReporter.pause(600);
this.BXDReported = true;
}
}
}
proto.startOfAd = function()
{
this.tViewTime = new EventReporter.Timer();
}
proto.startOfRollOver = function()
{
if (this.bRolloverEventsEnabled)
{
if (!this.tRollOverTime)
{
this.EmitEvent(Const.EventInitialRollover, this.tViewTime.getSeconds());
}
this.tRollOverTime = new EventReporter.Timer();
}
}
proto.endOfRollOver = function()
{
if (this.tRollOverTime)
{
this.EmitEvent(Const.EventRolloverDuration, this.tRollOverTime.getSeconds());
}
}
proto.EmitEvent = function(evt, duration)
{
if (this.isInPat)
{
if (evt != Const.EventBrandExposure)
{
sendDebugCall(evt + "=", duration, "");
}
}
else
{
var url = "http://" + this.adEnvParams.click_domain + "/go/" + this.adEnvParams.site_alias + "/" + this.adEnvParams.category + ";ai." + this.adEnvParams.ad_id + ";ct." + evt + ";ea." + duration + "/01/";
EventReporter.context.reportEvent(url, this);
}
}
proto.customEvent = function(mainValue, additionalInfo)
{
if(this.tViewTime) {
var startOfPeriod = this.tViewTime.getSeconds();
var eventCounterName = "e" + mainValue;
if (this.eventCounter[eventCounterName] == undefined)
{
this.eventCounter[eventCounterName] = 1;
}
else
{
this.eventCounter[eventCounterName]++;
}
if ((this.eventCounter[eventCounterName] <= Const.MAX_TRACK_PER_EVENT) || this.isInPat)
{
var event_url_t = "http://" + this.adEnvParams.click_domain + "/go/" + this.adEnvParams.site_alias + "/" + this.adEnvParams.category + ";ai." + this.adEnvParams.ad_id + ";ct.i";
if ( event_url_t != null && event_url_t != "")
{
var callURL = event_url_t + mainValue + ";ea." + startOfPeriod + "/01/";
}
if (this.isInPat)
{
this.sendDebugCall("event=" + mainValue, additionalInfo, "");
}
else
{
EventReporter.context.reportEvent(callURL, this);
}
}
}
}
proto.clickThruEvent = function(mainValue, additionalInfo, defaultURL, blockedByPopUp)
{
if(this.tViewTime) {
if (blockedByPopUp == -1)
{
blockedByPopUp = "";
}
else
{
blockedByPopUp = "blocked=";
}
if ((this.clicksCount < Const.MAX_NUM_EXITS) || this.isInPat)
{
var callURL = defaultURL;
try
{
var click_url_t = "http://" + this.adEnvParams.click_domain + "/go/" + this.adEnvParams.site_alias + "/" + this.adEnvParams.category + ";ai." + this.adEnvParams.ad_id + ";ct.";
if ((click_url_t != "") && (click_url_t != null) && (new String(click_url_t) != ""))
{
callURL = new String(click_url_t + mainValue + "/01/");
if (typeof(_objAdEvents) != 'undefined')
{
if (_objAdEvents != null)
{
callURL = new String(eval("_objAdEvents.exit"+mainValue));
}
}
if(window.testAtlasClickEvent)
testAtlasClickEvent(callURL);	
}
}
catch(e)
{
}
try
{
if ((additionalInfo == "") || (additionalInfo == "null") || (additionalInfo == null))
{
additionalInfo = "_blank";
}
if (this.isInPat)
{
sendDebugCall ("exit=" + mainValue, defaultURL, blockedByPopUp);
}
else
{
if (additionalInfo == "_none")
{
EventReporter.context.reportEvent(callURL, this);
}
else
{
window.open(callURL, additionalInfo);
}
}
this.clicksCount++;
}
catch(e)
{
}
try
{
var pub_click_url = this.adEnvParams.pub_click_url;
if ((pub_click_url != "") && (pub_click_url != null) )
{
if (!this.isInPat)
{
EventReporter.context.reportEvent(pub_click_url, this);
}
}
}
catch(e)
{
}
this.endOfAd();
}
}
}
EventReporter.Timer = function() {
this.startTime = new EventReporter.context.Date();
}
EventReporter.Timer.prototype.getSeconds = function() {
var currentTime = new EventReporter.context.Date();
return Math.round((currentTime - this.startTime) / 1000);
}
EventReporter.pause = function(milliseconds) {
var now = new Date();
var exitTime = now.getTime() + milliseconds;
while (true)
{
now = new Date();
if (now.getTime() > exitTime)
{
return;
}
} 
}
__AtlasRichMedia__.addModule(EventReporter);
})();
(function() {
function domainEntry(name, value) {
this.name = name;
this.value = value;
}
var mod = {
moduleId: 'zIndex_a1',
entry: function(context)
{
if (context)
this._context = context;
else
this._context = {
innerDebugMode: innerDebugMode,
document: document
}
},
SetExpandZindex: function(destObj)
{
this._change(destObj, destObj.expandZindex);
},
SetBannerZindex: function(destObj)
{
if (!this._context.innerDebugMode)
{
var bannerZindex = this._getBannerPhaseZindex(destObj);
this._change(destObj, bannerZindex);
}
},
_change: function(rmAd, value)
{
rmAd.nodes.getPositioningNode().style.zIndex = value + 1;
rmAd.nodes.getClippingNode().style.zIndex = value + 1;
if (rmAd.nodes.getRmObjectNode())
rmAd.nodes.getRmObjectNode().style.zIndex = value + 2;
else if (rmAd.nodes.getSafeServeIframe())
rmAd.nodes.getSafeServeIframe().style.zIndex = value + 2;
},
_getBannerPhaseZindex: function(destObj)
{
var map = this._bannerDomainMap;
for(var i = 0; i < map.length; i++) 
{
if(this._context.document.domain.indexOf(map[i].name) != -1)
return map[i].value;
}
return destObj.bannerZindex;
},
_bannerDomainMap: [
new domainEntry("aol.com", 50),
new domainEntry("vh1.com", 2050),
new domainEntry("winespectator.com", 950),
new domainEntry("myspace.com", 10001),
new domainEntry("forbes.com", 0),
new domainEntry("thegolfchannel.com", 50),
new domainEntry("cnnmoney.com", 50)
] 
}
__AtlasRichMedia__.addModule(mod);
})();
(function()
{
var mod = {
create: function(ad_id, site_alias, adProps) {
return new SurveyVendor(ad_id, site_alias, adProps);
},
entry: function(context) 
{
if(context)
SurveyVendor._context = context;
else
SurveyVendor._context = {
innerDebugMode: window.innerDebugMode,
scriptCreator: __AtlasRichMedia__.getModule('scriptCreator_a1'),
sendDebugCall: function() {}
}
},
moduleId: 'SurveyVendor_a1'
}
var SurveyVendor = function(ad_id, site_alias, adProps)
{
this.surveyVendorTagCalled = false;
this.ad_id = ad_id;
this.site_alias = site_alias;
this.paid = adProps.paid;
this.surveyVendorInfo = _createSurveyVendorInfo(adProps);
}
_createSurveyVendorInfo = function(adProps)
{
var phase = null;
var surveyVendorText = '';
var teaserStr = adProps.paramdynamiclogicteaser1 + adProps.paramdynamiclogicteaser2 + adProps.paramdynamiclogicteaser3 + adProps.paramdynamiclogicteaser4;
var reminderStr = adProps.paramdynamiclogicreminder1 + adProps.paramdynamiclogicreminder2 + adProps.paramdynamiclogicreminder3 + adProps.paramdynamiclogicreminder4;
var mainStr = adProps.paramdynamiclogicmain1 + adProps.paramdynamiclogicmain2 + adProps.paramdynamiclogicmain3 + adProps.paramdynamiclogicmain4;
if ( teaserStr != '')
phase = 'teaser';
else if ( reminderStr != '')
phase = 'reminder';
else if ( mainStr != '')
phase = 'main';
return {
phase : phase,
text : teaserStr + reminderStr + mainStr
};
}
SurveyVendor._replaceAliasesWithParams = function(sTextToReplace, ad_id, site_alias)
{
var returnString = sTextToReplace;
returnString = returnString.replace(/\%site_alias\%/g, site_alias);
returnString = returnString.replace(/\%ad_id\%/g, ad_id);
return returnString;
}
SurveyVendor._getScriptSourceOrContents = function(sScriptString)
{
var re = new RegExp("<script\\b[^>]*src\\s*=\\s*([\"'])(.*?)\\1[^>]*>.*</\script>","i");
var matchArray = sScriptString.match(re);
if (matchArray != null)
return new Array(matchArray[2], "src");
re = new RegExp("<script\\b.*>(.*?)</\script>","i");
matchArray = sScriptString.match(re);
if (matchArray != null)
return new Array(matchArray[1], "text");
return new Array(sScriptString, "text");
} 
SurveyVendor.prototype = {
call: function(currentPhase)
{
var surveyVendorText = this.surveyVendorInfo.text;
var surveyVendorPhase = this.surveyVendorInfo.phase;
if (!this.surveyVendorTagCalled && currentPhase == surveyVendorPhase && surveyVendorText != '')
{
surveyVendorText = SurveyVendor._replaceAliasesWithParams(surveyVendorText, this.ad_id, this.site_alias);
var oProcessedTag = SurveyVendor._getScriptSourceOrContents(surveyVendorText);
var processedTagText = new String(oProcessedTag[0]);
var sContentType = oProcessedTag[1];
if (!SurveyVendor._context.innerDebugMode)
{
var targetNode = document.getElementsByTagName("head")[0];
var scriptId = "arm_processedTagText_" + this.paid;
if (sContentType.toLowerCase() == "src")
{
SurveyVendor._context.scriptCreator.addExternalScript(targetNode, processedTagText, scriptId);
}
else if (sContentType.toLowerCase() == "text")
{
SurveyVendor._context.scriptCreator.addInlineScript(targetNode, processedTagText, scriptId);
}
}
SurveyVendor._context.sendDebugCall ("dl=1", processedTagText, "");
this.surveyVendorTagCalled = true;
} 
},
reset : function()
{
this.surveyVendorTagCalled = false;
}
}
__AtlasRichMedia__.addModule(mod);
})();
__AtlasRichMedia__.addModule({
moduleId: 'executionInterval_a1',
milliseconds: 700,
interval: null,
callbacks: [],
addCallback: function(callback) {
this.callbacks.push(callback);
},
entry: function() {
if(!this.interval) {
var module = this;
this.interval = window.setInterval(
function() { module.run(); },
this.milliseconds
);
}
},
removeCallback: function(callback) {
for(var i=0; i<this.callbacks.length; i++) {
if(this.callbacks[i] == callback)
this.callbacks.splice(i,1);
}
},
run: function() {
for(var i=0; i<this.callbacks.length; i++) {
this.callbacks[i]();
}
}
});
;
(function() 
{
var phasesNames = ["teaser", "reminder", "main"];
var locationParams = ["top","left","height","width", "size_method", "location_method", "altoverlay","anchor"];
var PhaseData = function(locationData)
{
this.phaseInfo = {};
for (var i = 0; i < phasesNames.length; i++)
{
var locInfo = {};
for (var j = 0; j < locationParams.length; j++)
{
var paramName = locationParams[j];
var value = locationData[0][(i * locationParams.length) + j];
if (paramName == "anchor")
locInfo[paramName] = value;
else
locInfo[paramName] = parseInt(value);
}
this.phaseInfo[phasesNames[i]] = locInfo;
} 
}
PhaseData.prototype.getDataByPhaseId = function(phaseId)
{
return this.phaseInfo[phaseId];
}
var mod = {
entry: function(context) {},
create: function(locationData) { return new PhaseData(locationData); },
moduleId: 'PhaseData_a1'
}
__AtlasRichMedia__.addModule(mod);
})();
__AtlasRichMedia__.addModule(
{
moduleId: "buildFlashString_a6",
entry: function(context) {
if (!this._context) {
if (context)
this._context = context;
else
this._context =
{
urlBuilder: __AtlasRichMedia__.getModule("urlBuilder_a4")
}
}
},
getAdHtml: function(adEnv, adProps, movieId, useDataAttribute) {
var childMovieString = this.makeChildMoviesString(adProps, adEnv);
var movieDir = this._context.urlBuilder.getEmptyMovieSrc(adEnv, adProps);
return this._makeRealMovieString(adEnv, adProps, movieId, childMovieString, movieDir, true, useDataAttribute) + this._makeCachedMovieString(adEnv, adProps, movieId, childMovieString);
},
getNonSwappingAdHtml: function(adEnv, adProps, movieId, useDataAttribute) {
var childMovieString = this.makeChildMoviesString(adProps, adEnv);
var movieDir = this._context.urlBuilder.getMovieSrc(adEnv, adProps);
return this._makeRealMovieString(adEnv, adProps, movieId, childMovieString, movieDir, false, useDataAttribute);
},
getExtension: function(path) {
return path.substring(path.lastIndexOf('.') + 1).toLowerCase();
},
buildChildMoviePath: function(pp_url, path, fileExt) {
var protoIdx = path.indexOf('://');
if ((protoIdx < 0) || (protoIdx > 10)) {
if (fileExt == "flv") {
path = path.substring(0, path.lastIndexOf("."))
}
return pp_url + path;
}
else {
if (fileExt == "flv") {
var lastIndexOfString = path.lastIndexOf("/") + 1;
var tempStr = path.substring(0, lastIndexOfString);
path = path.substr(lastIndexOfString);
return path.substring(0, path.lastIndexOf("."));
}
}
return path;
},
getExternalFlashStreamURL: function(adProps) {
var oChildMovies = adProps.childmovies;
var result = "";
if (oChildMovies) {
for (var p in oChildMovies) {
var protoIdx = oChildMovies[p].indexOf('://');
var ext = this.getExtension(oChildMovies[p]);
if (protoIdx >= 0 && protoIdx <= 10 && ext == 'flv' && oChildMovies[p].indexOf(" ") == -1) {
var lastIndexOfString = oChildMovies[p].lastIndexOf("/") + 1;
result = oChildMovies[p].substring(0, lastIndexOfString);
}
}
}
return result;
},
makeChildMoviesString: function(adProps, adEnv) {
var oChildMovies = adProps.childmovies;
if (!oChildMovies)
return '';
var rv = '';
for (var p in oChildMovies) {
var tempVar = new String(oChildMovies[p]);
if (tempVar.indexOf(" ") == -1) {
rv += '&';
var ext = this.getExtension(tempVar);
var url;
if (ext == 'flv')
url = this._context.urlBuilder.getChildMoviesPlayDir(adEnv);
else if (ext == 'swf')
url = this._context.urlBuilder.getChildSwfsDir(adEnv, adProps);
else
url = this._context.urlBuilder.getDefaultChildMoviesDir(adEnv);
var path = this.buildChildMoviePath(url, tempVar, ext);
rv += p.replace('movie', 'atlasm') + '=' + path;
}
}
return rv.substring(1);
},
getHostName: function() {
return location.hostname;
},
getAdMovieUrl: function(adProps, sMoviePath, adEnv, childMovieString, movieId) {
var click_url_t = "http://" + adEnv.click_domain + "/go/" + adEnv.site_alias + "/" + adEnv.category + ";ai." + adEnv.ad_id + ";ct.";
return sMoviePath + "?" +
"spd=" + adProps.version +
"&destdom=" + this.getHostName() +
"&ds_path=" + adEnv.image_path +
"&xsu=" + this.getExternalFlashStreamURL(adProps) +
"&su=" + this._context.urlBuilder.getStreamingUrl(adEnv) + '&' + childMovieString +
"&AtlasCTR=" + click_url_t + "1" +
"&MovieIndex=" + movieId;
},
_makeRealMovieString: function(adEnv, adProps, movieId, childMovieString, movieDir, isSwapping, useDataAttribute) {
var movieUrl = this.getAdMovieUrl(adProps, movieDir, adEnv, childMovieString, movieId);
var dataAttribute = useDataAttribute ? "data='" + movieUrl + "' " : "";
return "<OBJECT type='application/x-shockwave-flash' " + dataAttribute +
"ID='orange" + adProps.paid + "' " +
"name='orange" + adProps.paid + "' " +
"style='position:absolute; left:0; top:0; width:100%; height:100%; visibility:visible; z-index:999999;'> " +
"<PARAM NAME=movie VALUE='" + movieUrl + "'>" +
"<PARAM NAME=quality VALUE=high> " +
"<PARAM NAME=bgcolor VALUE=#FFFFFF> " +
"<PARAM NAME=wmode VALUE=transparent> " +
"<PARAM NAME=allowFullScreen VALUE=true>" +
"<PARAM NAME=AllowScriptAccess VALUE=always>" +
"<PARAM NAME=MENU VALUE=false>" +
(isSwapping ? "<PARAM NAME=PLAY VALUE=false>" : "") +
"</OBJECT>";
},
_makeCachedMovieString: function(adEnv, adProps, movieId, childMovieString) {
var movieDir = this._context.urlBuilder.getMovieSrc(adEnv, adProps);
var movieUrl = this.getAdMovieUrl(adProps, movieDir, adEnv, childMovieString, movieId);
return "<OBJECT type='application/x-shockwave-flash' data='" + movieUrl + "' " +
"ID='orange" + adProps.paid + "_temp' " +
"name='orange" + adProps.paid + "_temp' style='position:absolute; left:0; top:0; visibility:hidden;'>" +
"<PARAM NAME=movie VALUE='" + movieUrl + "'>" +
"<PARAM NAME=quality VALUE=high>" +
"<PARAM NAME=bgcolor VALUE=#FFFFFF>" +
"<PARAM NAME=wmode VALUE=transparent>" +
"<PARAM NAME=allowFullScreen VALUE=true>" +
"<PARAM NAME=AllowScriptAccess VALUE=never>" +
"<PARAM NAME=MENU VALUE=false>" +
"<PARAM NAME=PLAY VALUE=false>" +
"</OBJECT>";
},
_context: null
});
(function() {
var FlashObject = function(element)
{
if(!element || typeof(element) == "string") 
throw new Error('ARMLibrary.FlashObject : must pass in an HTML element');
this.m_oFlashObject = element;
}
FlashObject.prototype.GetMovieSrc = function()
{
if(this.m_oFlashObject.movie)
{
return this.m_oFlashObject.movie;
}
else if(this.m_oFlashObject.attributes['data'])
{
return this.m_oFlashObject.attributes['data'].value;
}
return null;
}
FlashObject.prototype.SetMovieSrc = function(strMovieSrc)
{
if(this.m_oFlashObject.movie)
{
this.m_oFlashObject.movie = strMovieSrc;
}
else if(this.m_oFlashObject.attributes['data'])
{
this.m_oFlashObject.attributes['data'].value = strMovieSrc;
}
}
FlashObject.prototype.PercentLoaded = function()
{
try
{
return this.m_oFlashObject.PercentLoaded();
}
catch(e)
{
return 0;
}
}
FlashObject.prototype.IsPlaying = function()
{
try {
var result = this.m_oFlashObject.IsPlaying();
} catch(e) {
var result = false;
}
return result;
}
FlashObject.prototype.Stop = function()
{
this.m_oFlashObject.StopPlay();
}
FlashObject.prototype.Play = function()
{
if (typeof (this.m_oFlashObject.Play) == "function")
{
this.m_oFlashObject.Play();
}	
}
FlashObject.prototype.SetVariable = function(sVar, sValue)
{
this.m_oFlashObject.SetVariable(sVar, sValue);
}
FlashObject.moduleId = "flashObject_a3";
__AtlasRichMedia__.addModule(FlashObject);
})();
(function() {
var Com = {
moduleId: 'InterWindowCommunicator_a5',
commIframeDocPath: "",
entry: function(context) {
if (context)
this._context = context;
else
this._context = {
currentWindow: window,
domEvents: __AtlasRichMedia__.getModule('domEvents_a3'),
comIframeFinder: __AtlasRichMedia__.getModule('comIframeFinder_a2'),
postMessage: window.postMessage
}
},
setCommIframeDocPath: function(path) {
this.commIframeDocPath = path;
},
createClient: function(targetWin, handler, uniqueId) {
if (this._context.postMessage)
return new this.Html5Mailman(targetWin, handler);
else
return new this.Html4Client(handler, uniqueId);
},
createHost: function(targetWin, handler, uniqueId, rootNode) {
if (this._context.postMessage)
return new this.Html5Mailman(targetWin, handler);
else
return new this.Html4Host(handler, uniqueId, rootNode);
}
}
Com.Html5Mailman = function(otherWin, handler) {
this.otherWin = otherWin;
this.handler = handler;
this._addEventHandler();
}
Com.Html5Mailman.prototype = {
sendMessage: function(message) {
this.otherWin.postMessage(message, "*");
},
_addEventHandler: function() {
var context = Com._context;
var t = this;
context.domEvents.add(context.currentWindow, 'message', function(e) {
t._handleEvent(e);
});
},
_handleEvent: function(e) {
if (!e)
e = Com._context.currentWindow.event;
if (e.source == this.otherWin) {
this.handler(e.data);
}
}
}
function addCommIframes(uniqueId, rootNode) {
return {
messageIframe: new CommIframe("msgIfr" + uniqueId, Com.commIframeDocPath, 0, rootNode),
reloadIframe: new CommIframe("reloadIfr" + uniqueId, Com.commIframeDocPath, 0, rootNode),
messageDeliveredReloadIframe: new CommIframe("msgDeliveredReloadIfr" + uniqueId, Com.commIframeDocPath, 0, rootNode),
resizeIframe: new CommIframe("resizeIfr" + uniqueId, Com.commIframeDocPath, 10, rootNode),
resizeMessageIframe: new CommIframe("resizeMessageIfr" + uniqueId, Com.commIframeDocPath, 10, rootNode)
};
}
function InvisibleIframe(doc,nm) {
if (document.all && nm) {
var ifr = doc.createElement('<iframe name="' + nm + '"></iframe>');
} else if(nm) {
var ifr = doc.createElement('iframe');
ifr.name = nm;
} else {
var ifr = doc.createElement('iframe');
}
ifr.scrolling = "no";
ifr.style.position = "absolute";
ifr.style.top = "0";
ifr.style.left = "0";
ifr.allowTransparency = true;
ifr.style.borderWidth = "0";
ifr.frameBorder = "no";
return ifr;
}
function CommIframe(nm, url, px, rootNode) {
this.ifr = new InvisibleIframe(rootNode.ownerDocument,nm);
this.ifr.src = url;
this.resize(px, px);
rootNode.appendChild(this.ifr);
this.contentWindow = this.ifr.contentWindow;
}
CommIframe.prototype.height = function() {
return parseInt(this.ifr.style.height) - 16;
}
CommIframe.prototype.width = function() {
return parseInt(this.ifr.style.width) - 16;
}
CommIframe.prototype.resize = function(wPx, hPx) {
this.ifr.style.width = (16 + wPx) + "px";
this.ifr.style.height = (16 + hPx) + "px";
}
CommIframe.prototype.onload = function(handler) {
Com._context.domEvents.add(this.ifr, 'load', handler);
}
Com.Html4Host = function(handler, uniqueId, rootNode) {
this.handler = handler;
this.iframes = addCommIframes(uniqueId, rootNode);
this.msgQueue = [];
this._init();
}
Com.Html4Host.prototype = {
sendMessage: function(msg) {
this.msgQueue.push(msg);
if (this.msgQueue.length == 1)
this._sendNextMsg();
},
_relayRecieved: function() {
var width = parseInt(this.iframes.resizeIframe.width()) == 10 ? 11 : 10;
this.iframes.resizeIframe.resize(width, this.iframes.resizeIframe.height());
},
_init: function() {
var t = this;
this.iframes.reloadIframe.onload(
function() { t._receiveMessage(); }
);
this.iframes.messageDeliveredReloadIframe.onload(
function() { t._lastMessageDelivered(); }
);
},
_sendNextMsg: function() {
var w = parseInt(this.msgQueue[0]);
var h = parseInt(this.iframes.resizeMessageIframe.height()) == 10 ? 11 : 10;
this.iframes.resizeMessageIframe.resize(w, h);
},
_receiveMessage: function() {
var msg = this.iframes.messageIframe.contentWindow.frames.length;
if (msg > 0) {
this.handler(msg.toString());
this._relayRecieved();
}
},
_lastMessageDelivered: function() {
this.msgQueue.shift();
if (this.msgQueue.length > 0) {
this._sendNextMsg();
}
}
}
Com.Html4Client = function(handler, uniqueId) {
this.handler = handler;
this.msgQueue = [];
var html4Client = this;
function setUpIframes() {
try {
var windows = Com._context.comIframeFinder.getIframes(uniqueId);
} catch (e) {
window.setTimeout(
function() {
setUpIframes();
},
100
);
return;
}
html4Client.windows = windows;
html4Client._init();
}
setUpIframes();
}
Com.Html4Client.prototype = {
sendMessage: function(msg) {
this.msgQueue.push(msg);
if (this.msgQueue.length == 1)
this._sendWhenReady();
},
_init: function() {
this.iframeList = [];
for (var i = 0; i < 8; i++)
this.iframeList.push(this._createIframe());
this._setupHostRecievedEvent();
this._setupRecievedMessageEvent();
},
_setupHostRecievedEvent: function() {
var t = this;
try {
Com._context.domEvents.addResizeHandler(this.windows.resizeWin, function() {
t._lastMessageDelivered();
});
this.resizeWinInitialized = true;
}
catch (e) {
window.setTimeout(function() { t._setupHostRecievedEvent(); }, 50);
}
},
_setupRecievedMessageEvent: function() {
var t = this;
try {
Com._context.domEvents.addResizeHandler(this.windows.resizeMessageWin, function() {
t._receiveMessage();
});
this.resizeMessageWinInitialized = true;
}
catch (e) {
window.setTimeout(function() { t._setupRecievedMessageEvent(); }, 50);
}
},
_isReadyToSend: function() {
return this.resizeWinInitialized && this.resizeMessageWinInitialized;
},
_sendWhenReady: function() {
if (this._isReadyToSend())
this._sendNextMsg();
else {
var t = this;
window.setTimeout(function() { t._sendWhenReady(); }, 50);
}
},
_sendNextMsg: function() {
this._cleanIframe();
for (var i = 0; i < parseInt(this.msgQueue[0]); i++) {
var ifr = this.iframeList[i] ? this.iframeList[i] : this._createIframe();
this.windows.messageWin.document.body.appendChild(ifr);
}
this._triggerSend();
},
_createIframe: function() {
return new InvisibleIframe(this.windows.messageWin.document);
},
_cleanIframe: function() {
var iframes = this.windows.messageWin.document.getElementsByTagName('iframe');
while (iframes.length > 0) {
var ifr = iframes[0];
ifr.parentNode.removeChild(ifr);
}
},
_triggerSend: function() {
this.windows.reloadWin.location = this.windows.reloadWin.location;
},
_relayReceived: function() {
this.windows.messageDeliveredReloadWin.location = this.windows.messageDeliveredReloadWin.location;
},
_lastMessageDelivered: function() {
this.msgQueue.shift();
if (this.msgQueue.length > 0) {
this._sendNextMsg();
}
},
_receiveMessage: function() {
var msg = this.windows.resizeMessageWin.document.documentElement.offsetWidth - 16;
this.handler(msg.toString());
this._relayReceived();
}
}
__AtlasRichMedia__.addModule(Com);
})();
(function() {
var Host = function(rmAd, destWin) {
this.rmAd = rmAd;
var host = this;
var handler = function(msg) { host.receiveMessage(msg); };
var adEnv = Host._context.adCollection.getByPaid(rmAd.paid).getEnvironment();
var adProp = Host._context.adCollection.getByPaid(rmAd.paid).getProperties();
Host._context.commLink.setCommIframeDocPath(Host._context.urlBuilder.getSafeServeLoader(adEnv, adProp));
this.communicator = Host._context.commLink.createHost(destWin, handler, rmAd.paid, rmAd.nodes.getPositioningNode());
}
Host.entry = function(context) {
if (context)
Host._context = context;
else {
var mc = __AtlasRichMedia__;
Host._context =
{
commLink: mc.getModule("InterWindowCommunicator_a5"),
adCollection: mc.getModule("adCollection_a3"),
pageLoadDetector: mc.getModule('pageLoadDetector_a2'),
urlBuilder: mc.getModule("urlBuilder_a4")
}
}
}
Host.moduleId = "sshost_a6";
Host.prototype =
{
receiveMessage: function(msg) {
var args = msg.split(":");
var func = this.map[args[0]];
if (func)
this[func](args[1]);
},
sendScriptMessage: function(msg, handler) {
this.scriptHandler = handler;
msg = "5:" + escape(msg);
this.communicator.sendMessage(msg);
},
_scriptMessage: function(args) {
this.scriptHandler(args);
},
_close: function() {
var adColl = Host._context.adCollection;
var ad = adColl.getByPaid(this.rmAd.paid);
adColl.remove(ad);
},
_teaserPhase: function() {
this.rmAd.positionToPhase('teaser');
},
_reminderPhase: function() {
this.rmAd.positionToPhase('reminder');
},
_mainPhase: function() {
this.rmAd.positionToPhase('main');
},
_bannerPhase: function() {
this.rmAd.positionToPhase('banner');
},
_expandPhase: function() {
this.rmAd.positionToPhase('expand');
},
_politeDownloadReady: function() {
var t = this;
if (Host._context.pageLoadDetector.AtlasPageLoaded)
this.communicator.sendMessage("8");
else
window.setTimeout(function() { t._politeDownloadReady(); }, 50);
},
map: {
"1": "_bannerPhase",
"2": "_expandPhase",
"3": "_teaserPhase",
"4": "_close",
"5": "_scriptMessage",
"6": "_reminderPhase",
"7": "_mainPhase",
"8": "_politeDownloadReady"
},
scriptHandler: function() { }
}
__AtlasRichMedia__.addModule(Host);
})();
__AtlasRichMedia__.addModule({
moduleId: "renderFlash_a8",
entry : function(context)
{
if (!this._context)
{
if (context)
this._context = context;
else
this._context = 
{
buildFlashString : __AtlasRichMedia__.getModule('buildFlashString_a6'),
FlashObject : __AtlasRichMedia__.getModule('flashObject_a3'),
element : __AtlasRichMedia__.getModule('element_a4'),
isInPaT: window.innerDebugMode
}
}
}, 
insertFlashString : function(containerElement, adEnv, adProps, movieId) {
var flashStr = this._context.buildFlashString.getAdHtml(adEnv, adProps, movieId, !this._context.isInPaT);
return this._insertString(containerElement, adEnv, adProps, movieId, flashStr);
},
insertNonSwappingFlashString : function(containerElement, adEnv, adProps, movieId)
{
var flashStr = this._context.buildFlashString.getNonSwappingAdHtml(adEnv, adProps, movieId, !this._context.isInPaT);
return this._insertString(containerElement, adEnv, adProps, movieId, flashStr);
},
_insertString : function(containerElement, adEnv, adProps, movieId, flashStr)
{
this._context.element.setInnerHtml(containerElement, flashStr);
return this._context.element.getElementByIdOffContainerElement(containerElement, 'object', 'orange' + adProps.paid);
},
setupTempSwfSwap : function(containerElement, paid, postSwfSwapFunc)
{
var realSwf = this._context.element.getElementByIdOffContainerElement(containerElement, 'object', 'orange' + paid);
var tempSwf = this._context.element.getElementByIdOffContainerElement(containerElement, 'object', 'orange' + paid + '_temp');
this._doTempSwfSwap(tempSwf, realSwf, postSwfSwapFunc);
},
_doTempSwfSwap : function(tempSwf, realSwf, postSwfSwapFunc)
{ 
var intervalId = null;
var FlashObject = this._context.FlashObject;
var swapFunction = function() 
{
var realSwfFlashObject = new FlashObject(realSwf);
var tempSwfFlashObject = new FlashObject(tempSwf);
if(tempSwfFlashObject.PercentLoaded() == 100)
{
var tempSwfSrc = tempSwfFlashObject.GetMovieSrc();
realSwfFlashObject.SetMovieSrc(tempSwfSrc);
tempSwf.parentNode.removeChild(tempSwf);
postSwfSwapFunc();
window.clearInterval(intervalId);
}
}
intervalId = window.setInterval(swapFunction, 50);
},
_context : null
});
(function()
{
var LOCATION_METHOD_RELATIVE	= 0;
var LOCATION_METHOD_ABSOLUTE	= 1;
var LOCATION_METHOD_ABSOLUTE_RELATIVE	= 2;
var SIZE_METHOD_ABSOLUTE	= 1;
var SIZE_METHOD_RELATIVE	= 0;
var ANCHOR_TOP_LEFT_CORNER	= 'TopLeftCorner';
var ANCHOR_TOP_RIGHT_CORNER	= 'TopRightCorner';
var ANCHOR_BOTTOM_LEFT_CORNER	= 'BottomLeftCorner';
var ANCHOR_BOTTOM_RIGHT_CORNER	= 'BottomRightCorner';
var ANCHOR_CENTER_SCREEN	= 'CenterOfScreen';
var ANCHOR_ALTERNATE = 'Alternate';
var mod = {
create: function(nodes, locationData, altPosition) { return new AdPositioner(nodes, locationData, altPosition); },
entry: function(context) { 
if(context)
this._context = context;
else
this._context = {
flashObject: __AtlasRichMedia__.getModule('flashObject_a3'),
client: __AtlasRichMedia__.getModule('client_a5'),
phaseData: __AtlasRichMedia__.getModule('PhaseData_a1'),
element: __AtlasRichMedia__.getModule('element_a4')
}
},
moduleId: 'AdPositioner_a7',
_context: null
}

var AdPositioner = function(nodes, locationData, altPosition)
{
this.nodes = nodes;
this.setLocationData(locationData);
this.altPosition = altPosition;
}
AdPositioner.prototype = {
changePhase: function(phaseId)
{ 
var phaseInfo = this.phaseData.getDataByPhaseId(phaseId);
this._modifyLocation(phaseInfo);
},
setLocationData : function(locationData)
{
this.phaseData = mod._context.phaseData.create(locationData);
},
_getAltOffsetPosition : function(altNode)
{
var altPosition = null;
if ( altNode.offsetWidth != 0 )
{
altPosition = {
w : altNode.offsetWidth,
h : altNode.offsetHeight
}
}
return altPosition;
},
getClippingNodePosition: function(phaseInfo) {
var clippingNode = this.nodes.getClippingNode();
var alternateNode = this.nodes.getAlternateNode();
var offset = this._computeRectCoords(phaseInfo);
var flashObjectSize = this._computeRectSize(phaseInfo);
if ( this._checkClipSpanToAlternate(phaseInfo) )
{
var clipSpanHeight, clipSpanWidth;
if(alternateNode)
{
var results = this._getAltOffsetPosition(alternateNode);
if ( results)
{
clipSpanWidth = results.w;
clipSpanHeight = results.h;
}
else 
{
return null;
}
}
else
{
clipSpanWidth = parseInt(this.altPosition.w);
clipSpanHeight = parseInt(this.altPosition.h);
}
var clippingNodePosition = {
top: offset.y - phaseInfo.top,
left: offset.x - phaseInfo.left,
width: clipSpanWidth,
height: clipSpanHeight
};
} else {
var clippingNodePosition = {
top: offset.y,
left: offset.x,
width: flashObjectSize.x,
height: flashObjectSize.y
};
}
var bottomBound = Math.max(mod._context.client.getHeight(), mod._context.client.getScrollHeight());
if(clippingNodePosition.top > bottomBound) clippingNodePosition.top = bottomBound;
if(clippingNodePosition.top + clippingNodePosition.height > bottomBound) clippingNodePosition.height = bottomBound - clippingNodePosition.top;
var rightBound = Math.max(mod._context.client.getWidth(), mod._context.client.getScrollWidth());
if(clippingNodePosition.left > rightBound) clippingNodePosition.left = rightBound;
if(clippingNodePosition.left + clippingNodePosition.width > rightBound) clippingNodePosition.width = rightBound - clippingNodePosition.left;
return clippingNodePosition;
},
getRmObjectPosition: function(phaseInfo) {
var flashObjectSize = this._computeRectSize(phaseInfo);
var rmObjectPosition = {
left: 0,
top: 0,
width: flashObjectSize.x,
height: flashObjectSize.y
};
if ( this._checkClipSpanToAlternate(phaseInfo) )
{
rmObjectPosition.top = phaseInfo.top;
rmObjectPosition.left = phaseInfo.left;
}
return rmObjectPosition;
},
getIframePosition: function (clippingNodePosition) {
return {
top: 0,
left: 0,
width: clippingNodePosition.width,
height: clippingNodePosition.height 
};
},
_modifyLocation: function(phaseInfo)
{
var t = this;
var modifyLocationLater = function(){window.setTimeout(function(){t._modifyLocation(phaseInfo);}, 500);}
var clippingNodePosition = this.getClippingNodePosition(phaseInfo);
if ( clippingNodePosition) {
this._updateObjectStyle(this.nodes.getClippingNode(),clippingNodePosition);
}
else {
modifyLocationLater();
}
var creativePos = this.getRmObjectPosition(phaseInfo);
var rmObjectNode = this.nodes.getRmObjectNode();
if(rmObjectNode)
this._updateObjectStyle(rmObjectNode,creativePos);
var ssIframe = this.nodes.getSafeServeIframe();
if(ssIframe)
this._updateObjectStyle(ssIframe,creativePos);
},
_computeRectSize: function(phaseInfo)
{
if (phaseInfo.size_method == SIZE_METHOD_RELATIVE)
{
return {
x: Math.round((phaseInfo.width * mod._context.client.getWidth()) / 100),
y: Math.round((phaseInfo.height * mod._context.client.getHeight()) / 100)
}
}
if (phaseInfo.size_method == SIZE_METHOD_ABSOLUTE)
{
return {
x: phaseInfo.width,
y: phaseInfo.height
};
}
},
_computeRectCoords: function(phaseInfo)
{ 
var a4eParent = this.nodes.getPositioningNode();
var a4eParentOffset = mod._context.element.getPosition(a4eParent);
if (phaseInfo.location_method == LOCATION_METHOD_RELATIVE)
{
return this._relativeLocation(phaseInfo, a4eParentOffset);
}
else if (phaseInfo.location_method == LOCATION_METHOD_ABSOLUTE)
{
return this._absoluteLocation(phaseInfo, a4eParentOffset);
}
else if (phaseInfo.location_method == LOCATION_METHOD_ABSOLUTE_RELATIVE)
{
return this._absoluteRelativeLocation(phaseInfo, a4eParentOffset);
}
},
_absoluteRelativeLocation: function(phaseInfo, a4eParentOffset)
{
var result = {
x: phaseInfo.left,
y: phaseInfo.top
};
var size = this._computeRectSize(phaseInfo);
switch (phaseInfo.anchor)
{
case ANCHOR_TOP_LEFT_CORNER:
break;
case ANCHOR_TOP_RIGHT_CORNER:
result.x += mod._context.client.getWidth() - size.x;
break;
case ANCHOR_BOTTOM_LEFT_CORNER:
result.y += mod._context.client.getHeight() - size.y;
break;
case ANCHOR_BOTTOM_RIGHT_CORNER:
result.x += mod._context.client.getWidth() - size.x;
result.y += mod._context.client.getHeight() - size.y;
break;
case ANCHOR_CENTER_SCREEN:
result.x += (mod._context.client.getWidth() / 2) - (size.x / 2);
result.y += (mod._context.client.getHeight() / 2) - (size.y / 2);
break;
case ANCHOR_ALTERNATE: 
return this._anchorAlternate(result);
break; 
default:
var obj = document.getElementById(phaseInfo.anchor);
result = this._computeAnchorElementPosition(obj, phaseInfo, mod._context.client);
}
result.x += mod._context.client.getScrollLeft()- a4eParentOffset.x;
result.y += mod._context.client.getScrollTop()- a4eParentOffset.y;
return result;
},
_anchorAlternate: function(result)
{
if(this.nodes.getBustedIframe())
{
result.x += parseInt(this.altPosition.x);
result.y += parseInt(this.altPosition.y);
}
return result;
},
_absoluteLocation: function(phaseInfo, a4eParentOffset)
{
var returnVal = {
x: phaseInfo.left,
y: phaseInfo.top
}
if (innerDebugMode && disregard_scroll_on_ad_not_scrollable)
{
returnVal.x += a4eParentOffset.x;
returnVal.y += a4eParentOffset.y;
}
else
{
returnVal.x += mod._context.client.getScrollLeft() - a4eParentOffset.x;
returnVal.y += mod._context.client.getScrollTop() - a4eParentOffset.y;
}
return returnVal;
},
_relativeLocation: function(phaseInfo, a4eParentOffset)
{
var returnVal = {
x: Math.round((phaseInfo.left * mod._context.client.getWidth()) / 100) - a4eParentOffset.x,
y: Math.round((phaseInfo.top * mod._context.client.getHeight()) / 100) - a4eParentOffset.y
}
if (!innerDebugMode || !disregard_scroll_on_ad_not_scrollable)
{ 
returnVal.x += mod._context.client.getScrollLeft();
returnVal.y += mod._context.client.getScrollTop();
}
return returnVal;
},
_computeAnchorElementPosition: function(anchorElement, phaseInfo)
{
var result = {};
if(anchorElement)
{ 
var anchorOffset = mod._context.element.getPosition(anchorElement);
result.x = parseInt(anchorOffset.x + phaseInfo.left - mod._context.client.getScrollLeft());	
result.y = parseInt(anchorOffset.y + phaseInfo.top - mod._context.client.getScrollTop());
}
else
{
if (innerDebugMode)
{
var size = this._computeRectSize(phaseInfo);
result.x = phaseInfo.left + (mod._context.client.getWidth() / 2) - (size.x / 2);
result.y = phaseInfo.top + (mod._context.client.getHeight() / 2) - (size.y / 2);
}
}
return result;
},
_checkClipSpanToAlternate: function(phaseInfo)
{ 
if(phaseInfo.altoverlay && phaseInfo.anchor == ANCHOR_ALTERNATE)
{
if(this.nodes.getAlternateNode() || this.nodes.getBustedIframe())
return true;
} 
return false;
},
_updateObjectStyle: function(node, sizeData)
{
node.style.top = "";
node.style.left = "";
node.style.height = "";
node.style.width = "";
node.style.top = sizeData.top + "px";
node.style.left = sizeData.left + "px";
node.style.height = sizeData.height + "px";
node.style.width = sizeData.width + "px";
}
}
__AtlasRichMedia__.addModule(mod);
})();
(function() {
var mod = {
create: function(nodes, locationData, altPosition, messengerPopup) { return new MessengerAdPositioner(nodes, locationData, altPosition, messengerPopup); },
entry: function(context) {
if (context)
this._context = context;
else
this._context = {
phaseData: __AtlasRichMedia__.getModule('PhaseData_a1'),
AdPositioner: __AtlasRichMedia__.getModule('AdPositioner_a7')
}
},
moduleId: 'MessengerAdPositioner_a6',
_context: null
}
var MessengerAdPositioner = function(nodes, locationData, altPosition, messengerPopup) {
this.nodes = nodes;
this.setLocationData(locationData);
this.messengerPopup = messengerPopup;
this.lastPhase = '';
this.bannerAdPositioner = mod._context.AdPositioner.create(nodes, locationData, altPosition);
}
MessengerAdPositioner.prototype = {
changePhase: function(phaseId) {
if(this.lastPhase != phaseId) {
this._doPhaseChange(phaseId);
this.lastPhase = phaseId;
}
},
_doPhaseChange: function(phaseId){
if (phaseId == 'main') {
var phaseInfo = this.phaseData.getDataByPhaseId(phaseId);
this.messengerPopup.showPopup(phaseInfo.left, phaseInfo.top, phaseInfo.width, phaseInfo.height, this.nodes.getClippingNode());
}
else {
if(phaseId == 'reminder') {
var rmObjectNode = this.nodes.getRmObjectNode();
rmObjectNode.TGotoLabel('/', 'banner');
rmObjectNode.Play();
this.messengerPopup.hidePopup();
}
this.bannerAdPositioner.changePhase(phaseId);
}
},
setLocationData: function(locationData) {
this.phaseData = mod._context.phaseData.create(locationData);
}
}
__AtlasRichMedia__.addModule(mod);
})();
(function() {
var State = function(movieIdToWatch, frameLabelMatchPhase, swfIdMatchValue, failureToGotoNextState) {
this.movieIdToWatch = movieIdToWatch
this.frameLabelMatchPhase = frameLabelMatchPhase;
this.swfIdMatchValue = swfIdMatchValue;
this.failureToGotoNextState = failureToGotoNextState;
}
State.prototype.shouldListenToSwf = function(movieId, command, args) {
var result = { nextState: false, value: false }
if (this.movieIdToWatch == movieId) {
if (this._frameLabelMatch(command, args))
result.nextState = true;
result.value = this.swfIdMatchValue;
}
return result;
}
State.prototype.startOfState = function() {
if (this.failureToGotoNextState) {
this.timeout = mod._context.setTimeout(this.failureToGotoNextState, 250);
}
}
State.prototype.endOfState = function() {
if (this.timeout)
mod._context.clearTimeout(this.timeout);
}
State.prototype._frameLabelMatch = function(command, args) {
return command.toLowerCase() == "framelabel" && args.toLowerCase() == this.frameLabelMatchPhase;
}
var MessengerSwfState = function(bannerSwfId, messengerSwfId, startOverFunc) {
var t = this;
var gotoFirstState = function() {
t._gotoState(0);
startOverFunc();
}
this.states = [
new State(bannerSwfId, "expand", true), 
new State(messengerSwfId, "expand", false, gotoFirstState), 
new State(messengerSwfId, "banner", true), 
new State(bannerSwfId, "banner", false, gotoFirstState) 
];
this.bannerSwfId = bannerSwfId;
this.messengerSwfId = messengerSwfId;
this.stateIndex = 0;
}
MessengerSwfState.prototype = {
shouldListenToSwf: function(movieId, command, args) {
var result = this.states[this.stateIndex].shouldListenToSwf(movieId, command, args);
if (result.nextState) {
this._gotoState(this.stateIndex + 1);
}
return result.value;
},
_gotoState: function(index) {
this.states[this.stateIndex].endOfState();
this.stateIndex = index >= this.states.length ? 0 : index;
this.states[this.stateIndex].startOfState();
}
}
var mod = {
create: function(bannerSwfId, messengerSwfId, startOverFunc) { return new MessengerSwfState(bannerSwfId, messengerSwfId, startOverFunc); },
entry: function(context) {
if (context)
this._context = context;
else
this._context = {
setTimeout: window.setTimeout,
clearTimeout: window.clearTimeout
}
},
moduleId: 'MessengerSwfState_a2'
}
__AtlasRichMedia__.addModule(mod);
})();
(function() {
var MessengerPopup = function(html, paid, movieId, mouseOffCallback) {
this.win = MessengerPopup.createPopupWindow(html);
this.mouseOffCallback = mouseOffCallback;
this.expandPhase = false;
this.movieId = movieId;
this.rmObjectNode = this.win.document.getElementsByTagName('object')[0];
this.headNode = this.win.document.getElementsByTagName('head')[0];
this._addMouseOverEvent();
this._attachScripts(paid, movieId);
}
MessengerPopup.createPopupWindow = function(html) {
var win = mod.context.createPopup();
win.document.body.innerHTML = html;
win.document.body.style.border = 'none';
win.document.body.style.backgroundColor = 'transparent';
return win;
}
MessengerPopup.prototype = {
_addMouseOverEvent: function() {
var t = this;
mod.context.domEvents.add(this.rmObjectNode, 'mouseover', function() { t.mouseOverHappened = true; });
this.mouseOverHappened = false;
},
_setupIntervals: function() {
var t = this;
this.checkWindowClosedIntervalId = mod.context.setInterval(function() { t.checkWindowClosed(); }, 100);
this.mouseOverTimeoutId = mod.context.setTimeout(function() { t.checkMouseOverHappened(); }, 2000);
},
_clearIntervals: function() {
mod.context.clearTimeout(this.mouseOverTimeoutId);
mod.context.clearInterval(this.checkWindowClosedIntervalId);
},
addMouseOutEvent: function(func) {
mod.context.domEvents.add(this.rmObjectNode, 'mouseout', func);
},
setMouseOver: function(mouseover) {
this.rmObjectNode.SetVariable('isMouseOver', mouseover.toString());
},
showPopup: function(left, top, width, height) {
this.mouseOverHappened = false;
this._setupIntervals();
this.popupOpen = true;
this._positionPopup(left, top, width, height);
this.setHtmlLoadedOnce();
this.rmObjectNode.TGotoLabel('/', 'expand');
this.rmObjectNode.Play();
},
_getCalculatedCoord: function(size, offset, screenSize, screenOffset) {
var calcOffset = screenOffset + offset;
var result = calcOffset;
if (calcOffset < 0)
result = 0;
else if (calcOffset + size > screenSize)
result = screenSize - size;
return result;
},
_positionPopup: function(left, top, width, height) {
var calcLeft = this._getCalculatedCoord(width, left, mod.context.screen.width, mod.context.getScreenLeft());
var calcTop = this._getCalculatedCoord(height, top, mod.context.screen.height, mod.context.getScreenTop());
this.win.show(calcLeft, calcTop, width, height);
},
checkMouseOverHappened: function() {
if (!this.mouseOverHappened) {
this._unexpectedWindowClose();
}
},
hidePopup: function() {
this._clearIntervals();
this.win.hide();
this.popupOpen = false;
},
checkWindowClosed: function() {
if (!this.win.isOpen && this.popupOpen) {
this.popupOpen = false;
this._unexpectedWindowClose();
}
},
_unexpectedWindowClose: function() {
this.mouseOffCallback();
mod.context.auto_orange_DoFSCommand('frameLabel', 'banner', this.movieId);
this.rmObjectNode.TGotoLabel('/', 'banner');
},
setHtmlLoadedOnce: function() {
if (!this.htmlLoadedCalled) {
this.htmlLoadedCalled = true;
this.rmObjectNode.SetVariable('html_loaded', 'true');
}
},
_attachScripts: function(paid, movieId) {
mod.context.scriptCreator.addInlineScript(
this.headNode,
"auto_orange_DoFSCommand = function(command, args, movieId) { window.parent.auto_orange_DoFSCommand(command, args, movieId); };",
"arm_FsCommand_Handler_" + paid,
this.win.document
);
mod.context.scriptCreator.addHtmlForAndEventInlineScript(
this.headNode,
"auto_orange_DoFSCommand(command, args, " + movieId + ")",
this.rmObjectNode.id,
"FSCommand(command,args)",
"arm_FsCommand_" + paid,
this.win.document
);
}
}
var mod = {
create: function(html, paid, movieId, mouseOffCallback) { return new MessengerPopup(html, paid, movieId, mouseOffCallback); },
entry: function(context) {
if (!context)
var context = {
auto_orange_DoFSCommand: auto_orange_DoFSCommand,
clearInterval: clearInterval,
clearTimeout: clearTimeout,
createPopup: window.createPopup,
domEvents: __AtlasRichMedia__.getModule('domEvents_a3'),
scriptCreator: __AtlasRichMedia__.getModule('scriptCreator_a1'),
setInterval: setInterval,
setTimeout: setTimeout,
getScreenTop: function() { return window.screenTop },
getScreenLeft: function() { return window.screenLeft },
screen: window.screen
};
this.context = context;
},
moduleId: 'MessengerPopup_a4'
}
__AtlasRichMedia__.addModule(mod);
})();
var ARMPreLib = function() {
var moduleId = "ARMPreLib_c1";
var movies = {
generateMovieId: function() {
var maxMovieIndex = -1;
for (var i = 0; i < a4eAdsArray.length; i++) {
if (a4eAdsArray[i].movieId > maxMovieIndex) {
maxMovieIndex = a4eAdsArray[i].movieId;
}
}
return maxMovieIndex + 1;
}
}
function RmAd(adParms) {
this.currentPhaseId = 'teaser';
this.movieId = movies.generateMovieId();
this.paid = adParms.paid;
this.SpanId = "OuterOrange" + this.paid;
this.SwfId = "orange" + this.paid;
this.adRootElement = adParms.adObjectAlt.adRootElement;
this.paramonload = adParms.paramonload == "true";
this.paramonscroll = adParms.paramonscroll == "true";
this.politeDownload = adParms.impoliteDownload == "true";
this.appletList = null;
this.selectList = null;
this.IframesList = null;
this.adEnd = false;
this.bFlashFileInitialized = false;
this.playStarted = 0;
this.bFlashFullyLoaded = false;
this.mouseIn = false;
this.init(adParms);
}
RmAd.prototype.init = function(adParms) {
var windowWrap = new (__AtlasRichMedia__.getModule('WindowWrap_a7'))(window);
var liveMessenger = windowWrap.isLiveMessenger();
var client = __AtlasRichMedia__.getModule("client_a5");
var safeServe = liveMessenger ? false : adParms.safeServe;
if (!client.supportsSafeServe())
safeServe = false;
this.setUpNodes(adParms, safeServe);
this._setupPositioner(adParms, liveMessenger);
var ssIframe = this.nodes.getSafeServeIframe();
var InterferingElements = __AtlasRichMedia__.getModule('InterferingElements_a5').InterferingElements;
this.elementHider = new InterferingElements(adParms, this.nodes.getBustedIframe(), this.nodes.getClippingNode(), ssIframe);
this.setupZindex(adParms);
var adMgr = __AtlasRichMedia__.getModule('adCollection_a3');
var adEnv = adMgr.getByPaid(this.paid).getEnvironment();
this.surveyVendor = __AtlasRichMedia__.getModule('SurveyVendor_a1').create(adEnv.ad_id, adEnv.site_alias, adParms);
this.setupEventReporter(adEnv, adParms);
if (client.userAgent.isInternetExplorer())
this.linkAdToFsCommand();
}
RmAd.prototype._setupPositioner = function(adParms, liveMessenger) {
var o = adParms.adObjectAlt.tplParams;
var altPosition = {
x: o.altPositionX,
y: o.altPositionY,
w: o.altWidth,
h: o.altHeight
};
if (liveMessenger) {
this._setupMessenger(altPosition, adParms);
}
else
this.adPositioner = __AtlasRichMedia__.getModule('AdPositioner_a7').create(this.nodes, adParms.locationdata, altPosition);
}
RmAd.prototype.linkAdToFsCommand = function() {
var targetNode = this.adRootElement ? this.adRootElement : document.getElementsByTagName("head")[0];
var scriptID = "arm_FsCommand_" + this.paid;
__AtlasRichMedia__.getModule('scriptCreator_a1').addHtmlForAndEventInlineScript(targetNode,
"auto_orange_DoFSCommand(command, args, " + this.movieId + ")",
this.SwfId, 'FSCommand(command,args)', scriptID);
}
RmAd.prototype.setupEventReporter = function(adEnv, adParms) {
var WindowWrap = __AtlasRichMedia__.getModule('WindowWrap_a7');
var isInPat = new WindowWrap(window).isInPat();
var EventReporter = __AtlasRichMedia__.getModule('EventReporter_a2');
this.eventReporter = new EventReporter(adEnv, isInPat);
}
RmAd.prototype.setupZindex = function(adParms) {
this.bannerZindex = (adParms.bannerZindex == ("!~!" + "bannerZindex" + "!~!")) ? 1150 : parseInt(adParms.bannerZindex);
this.expandZindex = (adParms.expandZindex == ("!~!" + "expandZindex" + "!~!")) ? 999997 : parseInt(adParms.expandZindex);
}
RmAd.prototype.setMouseOverOnSwf = function(mouseOver) {
var flashObject = new (__AtlasRichMedia__.getModule('flashObject_a3'))(this.nodes.getRmObjectNode());
if (!this.adEnd && this.bFlashFullyLoaded && flashObject) {
if (flashObject.PercentLoaded() == 100)
flashObject.SetVariable('isMouseOver', mouseOver.toString());
if (this.messengerPopup)
this.messengerPopup.setMouseOver(mouseOver);
}
}
RmAd.prototype.handleElementHiding = function() {
this.elementHider.showAndHidePageObjects(this.getCurrentPhaseId(), this.mouseIn);
}
RmAd.prototype.handleMouseEvent = function(mouseOver) {
this.mouseIn = mouseOver;
this.handleElementHiding();
this.setMouseOverOnSwf(mouseOver);
if (mouseOver) {
this.eventReporter.startOfRollOver();
}
else {
this.eventReporter.endOfRollOver();
}
}
RmAd.prototype.attachMouseEvents = function() {
var rmObjectNode = this.nodes.getRmObjectNode();
var t = this;
ARMRedirLib.Dom.AddEvent(rmObjectNode, 'mouseover', function() { t.handleMouseEvent(true); });
var mouseOutCallback = function() { t.handleMouseEvent(false); };
if (this.messengerPopup)
this.messengerPopup.addMouseOutEvent(mouseOutCallback);
else
ARMRedirLib.Dom.AddEvent(rmObjectNode, 'mouseout', mouseOutCallback);
}
RmAd.prototype.getAdRootElement = function() {
if (!this.adRootElement) {
this.adRootElement = document.getElementsByTagName("body")[0];
}
return this.adRootElement;
}
RmAd.prototype.setUpNodes = function(adParms, safeServe) {
this.bustedIframe = ARMRedirLib.Iframes.getBustedIframe(this.paid);
try {
if (this.bustedIframe) {
var alt = this.bustedIframe.contentWindow.document.getElementById('orange_alternate_' + this.paid);
} else {
var alt = document.getElementById('orange_alternate_' + this.paid);
}
} catch (e) {
var alt = null;
}
var altAnchor = alt ? alt.parentNode : null;
this.nodes = new RmAd.Nodes(
{
alternate: alt,
alternateAnchor: altAnchor,
bustedIframe: this.bustedIframe,
clippingNodeId: this.SpanId,
movieId: this.movieId,
paid: this.paid,
postSwfSwapFunc: this.postSwfSwapFunc(),
rmObjectNodeId: this.SwfId,
safeServe: safeServe,
leftAdjustment: adParms.leftAdjustment,
topAdjustment: adParms.topAdjustment
}
);
var cleanUpQueue = __AtlasRichMedia__.getModule('adCollection_a3').getByPaid(this.paid).cleanUpQueue;
var rmAd = this;
window.setTimeout(function() { new RmAd.NodesPositionUpdater(rmAd, cleanUpQueue); }, 0);
}
RmAd.NodesPositionUpdater = function(rmAd, cleanUpQueue) {
rmAd.nodes.updateRootPosition(function() {
if (rmAd.nodes.getSafeServeIframe()) {
var SSHost = __AtlasRichMedia__.getModule('sshost_a6');
rmAd.ssHost = new SSHost(rmAd, rmAd.nodes.getSafeServeIframe().contentWindow);
}
function updatePosition() {
rmAd.nodes.updateRootPosition();
}
var executionInterval = __AtlasRichMedia__.getModule('executionInterval_a1');
executionInterval.addCallback(updatePosition);
cleanUpQueue.queueCommand(function() {
executionInterval.removeCallback(updatePosition);
});
});
}
RmAd.prototype.isMovieIdRelevant = function(_movieId, command, args) {
if (this.messengerSwfState)
return this.messengerSwfState.shouldListenToSwf(_movieId, command, args);
return _movieId == this.movieId;
}
RmAd.prototype._setupMessenger = function(altPosition, adParms) {
var messengerMovieId = 10000 + this.movieId;
var ad = __AtlasRichMedia__.getModule('adCollection_a3').getByPaid(this.paid);
var html = __AtlasRichMedia__.getModule('buildFlashString_a6').getNonSwappingAdHtml(ad.getEnvironment(), ad.getProperties(), messengerMovieId)
var t = this;
var startOverFunc = function() {
t.adPositioner._doPhaseChange('reminder');
}
this.messengerSwfState = __AtlasRichMedia__.getModule('MessengerSwfState_a2').create(this.movieId, messengerMovieId, startOverFunc);
var mouseOffCallback = function() { t.handleMouseEvent(false); }
this.messengerPopup = __AtlasRichMedia__.getModule('MessengerPopup_a4').create(html, this.paid, messengerMovieId, mouseOffCallback);
this.adPositioner = __AtlasRichMedia__.getModule('MessengerAdPositioner_a6').create(this.nodes, adParms.locationdata, altPosition, this.messengerPopup);
}
RmAd.prototype.postSwfSwapFunc = function() {
var t = this;
var result = function() {
t.attachMouseEvents();
t.positionToPhase('teaser');
t.playStarted = 1;
sendDebugCall("adLoaded=1", "", "");
}
return result;
}
RmAd.prototype.changePhase = function(phaseLabel) {
this.currentPhaseId = phaseLabel;
}
RmAd.prototype.getCurrentPhaseId = function() {
return this.currentPhaseId;
}
RmAd.prototype.positionToPhase = function(phaseLabel) {
if (phaseLabel == 'expand') {
__AtlasRichMedia__.getModule('zIndex_a1').SetExpandZindex(this);
phaseLabel = 'main';
}
else if (phaseLabel == 'banner') {
__AtlasRichMedia__.getModule('zIndex_a1').SetBannerZindex(this);
phaseLabel = 'reminder';
}
this.changePhase(phaseLabel);
ARMLibrary.Position.modifyLocation(this);
ARMLibrary.Position.modifyLocation(this);
this.handleElementHiding();
ARMLibrary.FlashObjectUtil.setOverlappingSwfsToOpaque(this);
ARMLibrary.Position.enableHTMLbelowWithDelay(this);
}
RmAd.Nodes = function(options) {
var winWrap = new (__AtlasRichMedia__.getModule('WindowWrap_a7'))(window);
var nodes = null;
if (winWrap.isInRichMediaWizard())
nodes = new RmAd.RMWNodes(options);
else if (options.safeServe)
nodes = new RmAd.SafeServeNodes(options);
else
nodes = new RmAd.DefaultNodes(options);
nodes.render();
return nodes;
}
RmAd.DefaultNodes = function(options) {
this.options = options;
}
var p = RmAd.DefaultNodes.prototype;
p.getAlternateNode = function() {
return this.options.alternate;
}
p.getBustedIframe = function() {
return this.options.bustedIframe;
}
p.getClippingNode = function() {
return this.clippingNode;
}
p.getPositioningNode = function() {
return this.positioningNode;
}
p.getRootNode = function() {
return this.getPositioningNode();
}
p.getSafeServeIframe = function() {
return this.safeServeIframe;
}
p.getRmObjectNode = function() {
return this.rmObjectNode;
}
p._writeRmObjectNode = function() {
var options = this.options;
if (__AtlasRichMedia__.getModule("client_a5").userAgent.isInternetExplorer()) {
this.rmObjectNode = this.clippingNode.writeRmObjectNode(options.paid, options.movieId, options.postSwfSwapFunc);
}
else {
this.rmObjectNode = this.clippingNode.writeNonSwappingRmObjectNode(options.paid, options.movieId);
window.setTimeout(options.postSwfSwapFunc, 200);
}
}
p.render = function() {
this.positioningNode = new RmAd.Nodes.PositioningNode(this.options.paid);
this._appendClippingNodeToRootNode();
this._writeRmObjectNode();
}
p.updateRootPosition = function(onInsertion) {
if (this.options.bustedIframe) {
this.positioningNode.anchorToElement(this.options.bustedIframe, false, this.options.leftAdjustment, this.options.topAdjustment, onInsertion);
} else if (this.options.alternate) {
this.positioningNode.anchorToElement(this.options.alternate, true, this.options.leftAdjustment, this.options.topAdjustment, onInsertion);
} else {
this.positioningNode.anchorToBody(onInsertion);
}
}
p._appendClippingNodeToRootNode = function() {
var userAgent = __AtlasRichMedia__.getModule("client_a5").userAgent;
this.clippingNode = new RmAd.Nodes.ClippingNode(this.options.clippingNodeId);
this.positioningNode.appendChild(this.clippingNode);
}
RmAd.SafeServeNodes = function(options) {
RmAd.DefaultNodes.call(this, options);
}
var p = RmAd.SafeServeNodes.prototype = new RmAd.DefaultNodes();
p.render = function() {
var options = this.options;
var paid = options.paid;
this.positioningNode = new RmAd.Nodes.PositioningNode(options.paid);
this._appendClippingNodeToRootNode();
this.safeServeIframe = this.clippingNode.writeSafeServeIframe(paid);
}
RmAd.RMWNodes = function(options) {
RmAd.DefaultNodes.call(this, options);
}
var p = RmAd.RMWNodes.prototype = new RmAd.DefaultNodes();
p.getRmObjectNode = function() {
return document.getElementById(this.options.rmObjectNodeId);
}
p.render = function() {
var options = this.options;
this.positioningNode = new RmAd.Nodes.RMWPositioningNode(options.paid);
this._appendClippingNodeToRootNode();
this._writeRmObjectNode();
}
p.updateRootPosition = function(onInsertion) {
var anchorElement = document.getElementById("div_alt_" + this.options.paid);
if (anchorElement)
this.positioningNode.anchorToElement(anchorElement, onInsertion);
else
this.positioningNode.anchorToBody(onInsertion);
}
RmAd.Nodes.PositioningNode = function(paid) {
var span = document.createElement('span');
span.id = 'arm_positioningNode_' + paid;
span.style.zIndex = 999999;
var client = __AtlasRichMedia__.getModule('client_a5');
span.style.position = client.userAgent.isInternetExplorer() ? 'relative' : 'absolute';
span.style.verticalAlign = 'top';
span.anchorToElement = this.anchorToElement;
span.anchorToBody = this.anchorToBody;
return span;
}
RmAd.Nodes.RMWPositioningNode = function(paid) {
var node = new RmAd.Nodes.PositioningNode(paid);
node.anchorToElement = function(element) {
this.style.left = element.style.left;
this.style.top = element.style.top;
this.style.position = "absolute";
var insertBeforeElement = element.parentNode;
if (insertBeforeElement.previousSibling != this)
insertBeforeElement.parentNode.insertBefore(this, insertBeforeElement);
}
return node;
}
RmAd.Nodes.PositioningNode.prototype = {
anchorToBody: function(afterInsertion) {
if (!document.body || this.parentNode != document.body) {
var posNode = this;
ARMRedirLib.Dom.body.executeWhenReady(function() {
document.body.insertBefore(posNode, document.body.firstChild);
if (afterInsertion)
afterInsertion();
});
}
},
anchorToElement: function(element, writeToParent, leftTweakPx, topTweakPx, afterInsertion) {
topTweakPx = topTweakPx || 0;
leftTweakPx = leftTweakPx || 0;
var writePositionNode = (writeToParent ? element.parentNode : element);
if (writePositionNode.previousSibling != this) {
writePositionNode.parentNode.insertBefore(this, writePositionNode);
if (afterInsertion)
afterInsertion();
}
function getCommonOffsetParent(node1, node2) {
for (var op1 = node1.offsetParent; op1; op1 = op1.offsetParent) {
for (var op2 = node2.offsetParent; op2; op2 = op2.offsetParent) {
if (op1 == op2) {
return op1;
}
}
}
return null;
}
this.style.borderLeft = '0 solid black';
var commonOffsetParent = getCommonOffsetParent(writePositionNode, this);
function getOffset(node) {
var result = {
left: node.offsetLeft,
top: node.offsetTop
};
if (node.offsetParent != commonOffsetParent) {
var subresult = getOffset(node.offsetParent);
result.left += subresult.left;
result.top += subresult.top;
}
return result;
}
var offset = getOffset(element);
if ((offset.top + topTweakPx) != this.offsetTop || (offset.left + leftTweakPx) != this.offsetLeft) {
this.style.visibility = 'hidden';
this.style.left = '0';
this.style.top = '0';
this.style.top = new String(offset.top - this.offsetTop + topTweakPx) + 'px';
this.style.left = new String(offset.left - this.offsetLeft + leftTweakPx) + 'px';
this.style.visibility = 'visible';
}
}
}
RmAd.Nodes.ClippingNode = function(spanId) {
var span = document.createElement('span');
span.id = spanId;
span.name = spanId;
span.style.position = "absolute";
span.style.zIndex = 999998;
span.style.left = "0px";
span.style.top = "0px";
span.style.width = "20px";
span.style.height = "20px";
span.style.overflow = "hidden";
span.style.visibility = "visible";
span.writeSafeServeIframe = this.writeSafeServeIframe;
span.writeRmObjectNode = this.writeRmObjectNode;
span.writeNonSwappingRmObjectNode = this.writeNonSwappingRmObjectNode;
return span;
}
RmAd.Nodes.ClippingNode.prototype = {
writeSafeServeIframe: function(paid) {
var safeServeIframe = new RmAd.Nodes.SafeServeIframeNode(paid);
this.appendChild(safeServeIframe);
return safeServeIframe;
},
writeRmObjectNode: function(paid, movieId, postSwfSwapFunc) {
var ad = __AtlasRichMedia__.getModule('adCollection_a3').getByPaid(paid);
var renderFlash = __AtlasRichMedia__.getModule('renderFlash_a8');
var rmObjectNode = renderFlash.insertFlashString(this, ad.getEnvironment(), ad.getProperties(), movieId);
renderFlash.setupTempSwfSwap(this, paid, postSwfSwapFunc);
return rmObjectNode;
},
writeNonSwappingRmObjectNode: function(paid, movieId) {
var ad = __AtlasRichMedia__.getModule('adCollection_a3').getByPaid(paid);
var renderFlash = __AtlasRichMedia__.getModule('renderFlash_a8');
return renderFlash.insertNonSwappingFlashString(this, ad.getEnvironment(), ad.getProperties(), movieId);
}
}
RmAd.Nodes.SafeServeIframeNode = function(paid) {
var name = __AtlasRichMedia__.getModule('safeServeIframeDataSerializer_a4').serializeByPaid(paid);
var ad = __AtlasRichMedia__.getModule("adCollection_a3").getByPaid(paid);
var iframeSrc = __AtlasRichMedia__.getModule("urlBuilder_a4").getSafeServeDocument(ad.getEnvironment(), ad.getProperties());
if (__AtlasRichMedia__.getModule('client_a5').userAgent.isInternetExplorer()) {
var ifr = document.createElement('<iframe name="' + name.replace(/"/g,"&quot;") + '">');
}
else {
var ifr = document.createElement('iframe');
ifr.name = name;
}
ifr.id = 'armSafeServeIframe_' + paid;
ifr.src = iframeSrc;
ifr.frameBorder = "0";
ifr.scrolling = "no";
ifr.style.position = "absolute";
ifr.style.width = "1px";
ifr.style.height = "1px";
ifr.style.visibility = "visible";
ifr.allowTransparency = true;
return ifr;
}
Utility = {
getAdByRelevantMovieId: function(movieId, command, args) {
for (var i = 0; i < a4eAdsArray.length; i++) {
var rmAd = a4eAdsArray[i];
if (rmAd.isMovieIdRelevant(movieId, command, args))
return rmAd;
}
return null;
},
getAdByPaid: function(paid) {
return this._getAdById('paid', paid);
},
_getAdById: function(property, id) {
for (var i = 0; i < a4eAdsArray.length; i++) {
var rmAd = a4eAdsArray[i];
if (rmAd[property] == id)
return rmAd;
}
return null;
}
}
function EntryPoint() {
var moduleId = ARMPreLib.moduleId;
for (var index = 0; index < ARM_rtc.RmAdParms.length; index++) {
var parms = ARM_rtc.RmAdParms[index];
for (var i = 0; i < parms.mods.length; i++) {
if (parms.mods[i].moduleId == moduleId) {
var mod = parms.mods[i];
if (!mod.moduleObject)
mod.moduleObject = ARMPreLib;
if (!mod.moduleInitialized) {
mod.moduleInitialized = true;
a4eAdsArray[a4eAdsArray.length] = new ARMPreLib.RmAd(parms);
}
}
}
}
}
return {
moduleId: moduleId,
Movies: movies,
RmAd: RmAd,
Utility: Utility,
EntryPoint: EntryPoint
};
} ();
if (typeof(ARM_TestMode) == 'undefined')
{
if (typeof(a4eAdsArray) == 'undefined')
{
var a4eAdsArray = [];
}
if (typeof(innerDebugMode) == 'undefined')
var innerDebugMode = false;
}
var ARMLibrary = function()
{
return {
AdObject: {
updateParams: function(rmAd, phaseID)
{ 
rmAd.changePhase(phaseID.toLowerCase());
}
},
SurveyVendor: {
Reset: function(rmAd)
{
rmAd.surveyVendor.reset();
}
},
Position: {
showAndHidePageObjects: function(rmAd) {
rmAd.handleElementHiding();
},
enableHTMLbelowWithDelay: function(rmAd)
{
var layer = rmAd.nodes.getClippingNode();
if (layer)
{
layer.style.visibility = 'visible';
window.setTimeout(function () { ARMLibrary.Position.enableHTMLbelow(rmAd); },2500);
}
},
enableHTMLbelow: function(rmAd)
{
rmAd.nodes.getClippingNode().style.visibility = 'hidden'; 
}
},

FlashObjectUtil: {
SwfIsNotAtlasSwf: function(obj)
{
return (!obj.id || obj.id.indexOf("orange") != 0);
},
GetWmode: function(obj)
{
if(obj.wmode)
{
return obj.wmode.toLowerCase();
}
else if(obj.attributes['wmode'])
{
var wMode = obj.attributes['wmode'].value.toLowerCase();
return wMode == "transparent" || wMode == "opaque" ? wMode : "window";
}
return "window";
},
ObjectIsSWF: function(obj)
{
for (var j=0; j<obj.childNodes.length; j++)
{
var param = obj.childNodes[j];
if (param.nodeName.toLowerCase() == "param" && param['name'].toLowerCase() == 'movie' && param['value'].toLowerCase().indexOf(".swf") != -1)
return true;
}
return false;
},
setOverlappingSwfsToOpaque: function(obj) {
var objects = new Array();
var objectsCollection = document.getElementsByTagName('object');
for (var i=0; i<objectsCollection.length; i++)
{
objects[objects.length] = objectsCollection[i];
}
for (var i = 0; i < objects.length; i++)
{
var object = objects[i];
var embed = null;	
for (var k=0; k<object.childNodes.length; k++) {
var node = object.childNodes[k];
if (node.nodeName.toLowerCase() == "embed")
{
embed = node;
}
} 
var elemMod = __AtlasRichMedia__.getModule('element_a4');
var util = ARMLibrary.FlashObjectUtil;
if ( util.ObjectIsSWF(object) && util.SwfIsNotAtlasSwf(object) && ( elemMod.compareLocations(object, obj.nodes.getClippingNode()) || (embed && elemMod.compareLocations(embed, obj.nodes.getClippingNode()) )))
{
var wmode = embed ? util.GetWmode(embed) : util.GetWmode(object);
if (wmode != "opaque" && wmode != "transparent")
{
if(object.outerHTML) {
object.wmode = "opaque";
var outerhtml = object.outerHTML;
var innerhtml = "";
for (var j=0; j<object.childNodes.length; j++) {
var param = object.childNodes[j];
if (param.nodeName == "PARAM"){
if(param.getAttribute('name').toLowerCase() != 'wmode') 
innerhtml += param.outerHTML;
}
}
innerhtml += '<param name="wmode" value="opaque" />';
object.outerHTML = outerhtml.split(">")[0] + ">" + innerhtml + " </object>";
} else {
var param = document.createElement('param');
param.setAttribute('name','wmode');
param.setAttribute('value','opaque');
object.appendChild(param);
object.wmode = "opaque";
var placeHolder = document.createElement('span');
object.parentNode.replaceChild(placeHolder,object);
placeHolder.parentNode.replaceChild(object,placeHolder);
}
}
if (embed) {
var wmode = embed.getAttribute('wmode');
if (!wmode || (wmode.toLowerCase() != "opaque" && wmode.toLowerCase() != "transparent"))
embed.setAttribute('wmode','opaque');
}
}
}
}
},
BrowserEvent: {
attachScrollEvents: function()
{
ARMRedirLib.Dom.AddEvent(window, 'scroll', ARMLibrary.BrowserEvent.scrollA4EAd);
},
detachScrollEvents: function()
{
ARMRedirLib.Dom.RemoveEvent(window, 'scroll', ARMLibrary.BrowserEvent.scrollA4EAd);
},
attachResizeEvents: function()
{
ARMRedirLib.Dom.AddEvent(window, 'resize', ARMLibrary.BrowserEvent.resizeA4EAd);
},
detachResizeEvents: function()
{
ARMRedirLib.Dom.RemoveEvent(window, 'resize', ARMLibrary.BrowserEvent.resizeA4EAd);
},
scrollA4EAd: function()
{

if (window.a4eAdsArray)
{
for (var i = 0; i < a4eAdsArray.length; i++)
{
if (!a4eAdsArray[i].adEnd && !a4eAdsArray[i].paramonscroll)
{
ARMLibrary.Position.enableHTMLbelowWithDelay(a4eAdsArray[i]);
ARMLibrary.Position.modifyLocation(a4eAdsArray[i]);
}
a4eAdsArray[i].handleElementHiding();
}
}
},
resizeA4EAd: function()
{
if (window.a4eAdsArray)
{
for (var i=0;i < a4eAdsArray.length; i++)
{
if (!a4eAdsArray[i].adEnd)
ARMLibrary.Position.modifyLocation(a4eAdsArray[i]);
a4eAdsArray[i].handleElementHiding();
}
}
} 
} 
}
}();
function a4eunload()
{
try
{
sendDebugCall ("label=closead","", "");
if (window.a4eAdsArray)
{
for (var i=0;i < a4eAdsArray.length; i++)
{
a4eAdsArray[i].eventReporter.endOfMainPhase();
a4eAdsArray[i].eventReporter.endOfAd();
}
}
}
catch (e)
{
}
return true;
}
function handleError()
{
return true;
}
function sendDebugCall(eventExpandoInfo, originalInfo, blockedByPopUp)
{
if (!innerDebugMode)
{
return;
}
try
{
var eventObj = document.createEventObject();
blockedByPopUp = "&" + blockedByPopUp;
if (blockedByPopUp.length == 1)
{
blockedByPopUp = "";
}
eventObj.expando = eventExpandoInfo + "&" + originalInfo + blockedByPopUp;
document.all.TopLayerDebugObject.fireEvent("onchange",eventObj);
}
catch(e)
{
}
}
ARMLibrary.Position.modifyLocation = function (rmAd)
{
rmAd.adPositioner.changePhase(rmAd.getCurrentPhaseId());
}
function AdDisplayManager(){}
AdDisplayManager.getKeyCode = function(oEvent)
{
return oEvent.keyCode;
}
AdDisplayManager.handleAdditionalScrollEvents = function(oEvent)
{
var pressedKeyCode = AdDisplayManager.getKeyCode(oEvent);
if(((pressedKeyCode >= 32) && (pressedKeyCode <= 40)) || (pressedKeyCode == 0))
{
window.setTimeout(ARMLibrary.BrowserEvent.scrollA4EAd, 10);
}
}
if (typeof(playingAds) == 'undefined')
{
if (typeof(innerDebugMode) == 'undefined')
var innerDebugMode = false;
if (typeof(AtlasPaTTestTab) == 'undefined')
var AtlasPaTTestTab = false;
var hideElementsCap = 0;
var playingAds = 0;
if (typeof(ARM_TestMode) == 'undefined')
{
ARM_startTopLayer();
}
}
function ARM_startTopLayer()
{
beginAdHandler = null;
ARMLibrary.BrowserEvent.attachScrollEvents();
ARMRedirLib.Dom.AddEvent(window, 'error', handleError);
ARMRedirLib.Dom.AddEvent(window, 'unload', a4eunload);
ARMLibrary.BrowserEvent.attachResizeEvents();
}
function auto_orange_DoFSCommand(command, args, movieId)
{
var rmAd = ARMPreLib.Utility.getAdByRelevantMovieId(movieId, command, args);
if (rmAd && !rmAd.adEnd)
__AtlasRichMedia__.getModule('FSCommandDefault_a2').execute(command, args, rmAd);
}
function a4eload()
{
for (var i=0;i < a4eAdsArray.length; i++)
{
a4eAdsArray[i].paramonload = false;
}
}
function a4eloadObject(rmAd)
{
if (rmAd.playStarted == 0)
{
if (playingAds == 0)
ARMLibrary.FlashObjectUtil.setOverlappingSwfsToOpaque(rmAd);
rmAd.playStarted = 1;
}
rmAd.changePhase("teaser");
rmAd.eventReporter.startOfAd();
if (!innerDebugMode)
{
ARMLibrary.Position.modifyLocation(rmAd);
rmAd.nodes.getRmObjectNode().style.visibility='visible';
}
sendDebugCall ("beginPlay=", "", "");
rmAd.handleElementHiding();
ARMLibrary.Position.enableHTMLbelowWithDelay(rmAd);	
playingAds++;
}
function closeA4Ead(rmAd)
{
sendDebugCall ("label=closead","", "");
var rmObjectNode = rmAd.nodes.getRmObjectNode();
var flashAdObject = new (__AtlasRichMedia__.getModule('flashObject_a3'))(rmObjectNode)
if (rmAd.bFlashFullyLoaded)
{
flashAdObject.Stop();
}
rmObjectNode.style.visibility = 'hidden';
if (!innerDebugMode)
{
clearAtlasDivs(rmAd.nodes.getClippingNode());
rmAd.adEnd = true;
}
clearAtlasDivs(rmObjectNode);
rmAd.elementHider.showAll();
}
function clearAtlasDivs(objectToWorkOn)
{
if (objectToWorkOn != null)
{
objectToWorkOn.style.width = 0;
objectToWorkOn.style.height = 0;
objectToWorkOn.style.visibility='hidden';
objectToWorkOn.style.display='none';
}
}
function igniteAllTopLayer()
{
var destObj;
var FlashObject = __AtlasRichMedia__.getModule('flashObject_a3');
if (window.a4eAdsArray)
{
for (var i=0;i < a4eAdsArray.length; i++)
{
if (a4eAdsArray[i] != null)
{
if (typeof(a4eAdsArray[i]) == 'object')
{
destObj = a4eAdsArray[i];
if(destObj.playStarted == 1)
{
var swfObject = null;
try {
swfObject = new FlashObject(destObj.nodes.getRmObjectNode());
} 
catch(e) { }
if (swfObject)
{
if (!destObj.bFlashFileInitialized && destObj.bFlashFullyLoaded && isPoliteDownloadReady(destObj) && swfObject.PercentLoaded() == 100)
{
setHTML_LOADED();
destObj.bFlashFileInitialized = true;
}
}
}
if (hideElementsCap < 10)
{
ARMLibrary.FlashObjectUtil.setOverlappingSwfsToOpaque(destObj);
recheckHiddenElements(destObj);
}
}
}
}
}
}
function isPoliteDownloadReady(rmAd)
{
return (!rmAd.politeDownload || __AtlasRichMedia__.getModule('pageLoadDetector_a2').AtlasPageLoaded) && !rmAd.paramonload;
}
function recheckHiddenElements(a4eObject)
{
var reHide = false;
hideElementsCap ++;
var objectsCollection = document.getElementsByTagName('select');
if ((a4eObject.selectList != null) && (a4eObject.selectList != ''))
{
if (a4eObject.selectList.length != objectsCollection.length)
{
a4eObject.selectList = objectsCollection;
reHide = true
}
}
objectsCollection = document.getElementsByTagName('iframe');
if ((a4eObject.IframesList != null) && (a4eObject.IframesList != ''))
{
if ((a4eObject.IframesList.length != objectsCollection.length) && (a4eObject.IframesList.length+1 != objectsCollection.length) && (a4eObject.IframesList.length+2 != objectsCollection.length))
{
a4eObject.IframesList = objectsCollection;
reHide = true
}
}
objectsCollection = document.getElementsByTagName('applet');
if ((a4eObject.appletList != null) && (a4eObject.appletList != ''))
{
if (a4eObject.appletList.length != objectsCollection.length)
{
a4eObject.appletList = objectsCollection;
reHide = true
}
}
if (reHide)
ARMLibrary.BrowserEvent.scrollA4EAd();
}
function setHTML_LOADED()
{
for (var i=0; i < a4eAdsArray.length; i++)
{
if (a4eAdsArray[i] != null)
{
if (typeof(a4eAdsArray[i]) == 'object')
{
try
{
new (__AtlasRichMedia__.getModule('flashObject_a3'))(a4eAdsArray[i].nodes.getRmObjectNode()).SetVariable('html_loaded', 'true');
}
catch(e)
{
}
}
}
}
}
function attachAtlasEvents()
{
a4eAdsArray[0].attachMouseEvents();
}
(function() {
var mod = { 
_parseValue : function(origString, paramName) {
var tempVar = origString.indexOf(paramName);
var startIndex = origString.indexOf("=", tempVar);
if (startIndex == -1 || tempVar == -1) 
return "";
var endIndex = origString.indexOf("&", startIndex);
if (endIndex == -1)
return (origString.substring(startIndex + 1));
return (origString.substring(startIndex + 1, endIndex));
},
parseAdditionalInfo : function(arg) {
var additionalInfo = this._parseValue(arg, "additionalInfo");
var startPointBlockedFlag = additionalInfo.indexOf("AtlasBlocked");
if (startPointBlockedFlag == -1)
return additionalInfo;
return additionalInfo.substring(0, startPointBlockedFlag);
},
parseMainValue: function(arg) {
return this._parseValue(arg, "mainValue");
},
parseDefaultUrl: function(arg) {
return this._parseValue(arg, "default");
},
parseStartPointBlockedFlag: function(arg) {
var additionalInfo = this._parseValue(arg, "additionalInfo");
return additionalInfo.indexOf("AtlasBlocked");
},
moduleId: "FSCommandArgsDecoder_a1"
}
__AtlasRichMedia__.addModule(mod);
})();
(function() {
var strategies = {
alert: function(rmAd, args, baseContext) {
baseContext.alert(args);
},
a4eLoad: function(rmAd, args, baseContext) {
baseContext.a4eLoad(rmAd);
},
event: function(rmAd, args, baseContext) {
var decoder = baseContext.decoder;
var mainValue = decoder.parseMainValue(args);
var additionalInfo = decoder.parseAdditionalInfo(args);
rmAd.eventReporter.customEvent(mainValue, additionalInfo);
rmAd.eventReporter.firstInteraction();
},
exit: function(rmAd, args, baseContext) {
var decoder = baseContext.decoder;
var mainValue = decoder.parseMainValue(args);
var additionalInfo = decoder.parseAdditionalInfo(args);
var defaultURL = decoder.parseDefaultUrl(args);
var startPointBlockedFlag = decoder.parseStartPointBlockedFlag(args);
rmAd.eventReporter.clickThruEvent(mainValue, additionalInfo, defaultURL, startPointBlockedFlag);
rmAd.eventReporter.firstInteraction();
},
initialization: function(rmAd, args, baseContext) {
baseContext.initialization(rmAd, args);
},
loadMovie: function(rmAd, args, baseContext) {
var decoder = baseContext.decoder;
var mainValue = decoder.parseMainValue(args);
var additionalInfo = decoder.parseAdditionalInfo(args);
baseContext.debugCall("movie=" + mainValue, additionalInfo, "");
},

frameLabel: function(rmAd, args, baseContext) {
rmAd.frameLabelHappened = true;
var func = strategies.frameLabelStrategies[args.toLowerCase()];
if (func)
func(rmAd, args, baseContext);
},
teaser: function(rmAd, args, baseContext) {
baseContext.positionToPhase(rmAd, 'teaser');
baseContext.debugCall("label=" + args, "", "");
rmAd.eventReporter.endOfMainPhase();
rmAd.surveyVendor.call('teaser');
},
banner: function(rmAd, args, baseContext) {
strategies.reminder(rmAd, args, baseContext, 'banner');
},
reminder: function(rmAd, args, baseContext, label) {
if (!label)
var label = 'reminder';
baseContext.positionToPhase(rmAd, label);
baseContext.debugCall("label=" + args, "", "");
rmAd.eventReporter.endOfMainPhase();
rmAd.surveyVendor.call('reminder');
},
expand: function(rmAd, args, baseContext) {
strategies.main(rmAd, args, baseContext, 'expand');
},
main: function(rmAd, args, baseContext, label) {
if (!label)
var label = 'main';
baseContext.positionToPhase(rmAd, label);
baseContext.debugCall("label=" + args, "", "");
rmAd.eventReporter.startOfMainPhase();
rmAd.surveyVendor.call('main');
},
closeAd: function(rmAd, args, baseContext) {
baseContext.closeA4Ead(rmAd);
rmAd.eventReporter.endOfMainPhase();
rmAd.eventReporter.endOfAd();
}
}
strategies.frameLabelStrategies = {
'teaser': strategies.teaser,
'startmovie': strategies.teaser,
'banner': strategies.banner,
'reminder': strategies.reminder,
'expand': strategies.expand,
'main': strategies.main,
'maininteractive': strategies.main,
'closead': strategies.closeAd
}
var currentStrategies = {
'alert': strategies.alert,
'a4eplay': strategies.a4eLoad,
'a4estart': strategies.a4eLoad,
'a4eload': strategies.a4eLoad,
'event': strategies.event,
'exit': strategies.exit,
'framelabel': strategies.frameLabel,
'initialization': strategies.initialization,
'loadmovie': strategies.loadMovie
}
var FSCommandBase = {
execute: function(command, args, rmAd, baseContext) {
var strategy = currentStrategies[command.toLowerCase()];
if (strategy)
strategy(rmAd, args, baseContext);
},
moduleId: "FSCommandBase_a2"
}
__AtlasRichMedia__.addModule(FSCommandBase);
})();
(function() {
function initialization(rmAd, args) {
if (args.toLowerCase() == 'flash_loaded') {
rmAd.bFlashFullyLoaded = true;
a4eloadObject(rmAd);
}
}
function a4eLoad(rmAd) {
rmAd.paramonload = false;
}
function positionToPhase(rmAd, phaseId) {
rmAd.positionToPhase(phaseId);
}
var FSCommand = {
execute: function(command, args, rmAd) {
this._context.FSCommandBase.execute(command, args, rmAd, this.baseContext);
},
baseContext: {
a4eLoad: a4eLoad,
alert: alert,
closeA4Ead: closeA4Ead,
debugCall: sendDebugCall,
decoder: __AtlasRichMedia__.getModule('FSCommandArgsDecoder_a1'),
initialization: initialization,
positionToPhase: positionToPhase
},
entry: function(context) {
if (context)
this._context = context;
else
this._context = {
FSCommandBase : __AtlasRichMedia__.getModule("FSCommandBase_a2")
}
},
moduleId: "FSCommandDefault_a2"
}
__AtlasRichMedia__.addModule(FSCommand);
})();
if (typeof(ARM_TestMode) == 'undefined')
{
ARMPreLib.EntryPoint();
}
if (!window.beginAdHandler) {
window.beginAdHandler = true;
__AtlasRichMedia__.getModule('executionInterval_a1').addCallback(igniteAllTopLayer);
}
