if(!window.__AtlasRichMedia__) window.__AtlasRichMedia__ = {
modules: {},
addModule: function(module) {
var modId = module.moduleId;
var mods = this.modules;
if(!mods[modId]) 
mods[modId] = module;
var mod = mods[modId];
if (mod.entry)
mod.entry();
return mod;
},
getModule: function(moduleId) {
return this.modules[moduleId];
}
};
__AtlasRichMedia__.addModule(
{
moduleId : "adEnvironment_a3",
createAdEnvironment : function(paid)
{
var ae = {};
var info = __atlas_ad_info[paid];
ae.ad_id = info.ad_id;
ae.buster_url = info.buster_url;
ae.click = info.pub_click_url;
var cu = info.click_url_t;
var si = 7;
ae.click_domain = cu.substr(si, cu.indexOf("/go/") - si);
si = cu.lastIndexOf("/") + 1;
ae.category = cu.substr(si, cu.indexOf(";ai.") - si);
ae.category_pc = /;pc\./.test(ae.category) ? ae.category.match(/;(pc\.[^;]*)/)[1] : null;
ae.http = info.TL_files_path.substr(0, info.TL_files_path.indexOf("://"));
ae.image_path = info.ds_path;
ae.placement_ad_id = paid;
ae.pub_click_url = info.pub_click_url;
ae.pub_view_url = info.pub_view_url;
ae.site_alias = info.site_alias;
var su = info.streaming_url;
ae.stream_path = su.substr(0, su.length - (info.advertiserID.length + 1));
if (!ae.stream_path)
ae.stream_path = "%stream_path%"; 
ae.stream_path_connect = info.stream_path_connect ? info.stream_path_connect : "%stream_path_connect%";
ae.stream_path_play = info.stream_path_play ? info.stream_path_play : "%stream_path_play%";
si = ae.http.length + 3;
var imageServerURL = info.TL_files_path.substr(0, info.TL_files_path.length - 33);
ae.toplayer_path = imageServerURL.substr(si, imageServerURL.length - (info.advertiserID.length + 1) - si);
var vu = info.atlas_view_url;
si = 7;
ae.view_domain = vu.substr(si, vu.indexOf("view/") - 2 - si);
if (vu.indexOf("/jview/") > 0)
ae.delivery_method = "javascript";
else if (vu.indexOf("/iview/") > 0)
ae.delivery_method = "iframe";
else
ae.delivery_method = "";
return ae;
}
});
(function() {
var CleanUpQueue = function() {
this.commands = [];
}
CleanUpQueue.moduleId = "CleanUpQueue_a1";
CleanUpQueue.prototype.queueCommand = function(commandFunc) {
this.commands.push(commandFunc);
}
CleanUpQueue.prototype.invoke = function() {
while(this.commands.length > 0) {
var command = this.commands[0];
this.commands.shift();
command();
}
}
CleanUpQueue.prototype.count = function() {
return this.commands.length;
}
__AtlasRichMedia__.addModule(CleanUpQueue);
})();
;
(function(){
var D = function(doc) {
for(var i = 0; i < D.instances.length; i++)
{
if(D.instances[i].doc == doc)
return D.instances[i];
}
this.doc = doc;
this.adCount = 0;
D.instances.push(this);
}
D.moduleId = 'Document_a1';
D.instances = [];
D.getWindow = function() {
return window;
}
D.prototype = {
constructor: D,
adCreated: function() {
this.adCount++;
if(this.adCount == 1)
this.prepare();
},
adDeleted: function() {
if(this.adCount > 0) {
if(this.adCount == 1)
this.unprepare();
this.adCount--;
}
},
getAdCount: function() {
return this.adCount;
},
prepare: function() {
var win = D.getWindow();
if(win.getComputedStyle && this.doc.body) {
var bodyStyle = win.getComputedStyle(this.doc.body,null);
var htmlStyle = win.getComputedStyle(this.doc.documentElement,null);
if(bodyStyle && bodyStyle.overflowY == 'hidden' && htmlStyle && htmlStyle.overflowY == 'hidden') {
this.previousOverflowY = htmlStyle.overflowY;
this.doc.documentElement.style.overflowY = 'visible';
}
}
},
unprepare: function() {
if(this.previousOverflowY) this.doc.documentElement.style.overflowY = this.previousOverflowY;
}
};
__AtlasRichMedia__.addModule(D);
})();
;(function(){
function Reporter(adEnv) {
this.adEnv = adEnv;
this.reportedEvents = {richMediaImpression: null};
}
Reporter.imgs = [];
Reporter.entry = function(context) {
if(!context)
context = {};
if(context.report)
this.prototype.report = context.report;
else
this.prototype.report = originalReport;
}
var originalReport = Reporter.prototype.report = function(url) {
var img = new Image();
try {
img.src = url;
} catch(e) {
}
img.alt = '';
Reporter.imgs.push(img);
}
Reporter.prototype.reportRichMediaImpression = function() {
if(!this.reportedEvents.richMediaImpression) {
var dm = this.adEnv.delivery_method == "javascript" ? "j" : this.adEnv.delivery_method == "iframe" ? "i" : "";
var viewUrl = "http://" + this.adEnv.view_domain + "/" + dm + "view/" + this.adEnv.site_alias + "/direct;" + (this.adEnv.category_pc ? this.adEnv.category_pc + ";" : "") + "ai." + this.adEnv.ad_id + ";vt.2/01/";
this.reportedEvents.richMediaImpression = viewUrl;
this.report(viewUrl);
var pub_view_url = this.adEnv.pub_view_url;
if (pub_view_url && pub_view_url != '%' + 'pub_view_url' + '%')
{
this.report(pub_view_url);
}
}
}
Reporter.prototype.richMediaImpressionReported = function() {
return this.reportedEvents.richMediaImpression != null;
}
Reporter.prototype.getReportedEvents = function() {
return this.reportedEvents;
}
Reporter.moduleId = 'AdInitEventReporter_a1';
__AtlasRichMedia__.addModule(Reporter);
})();
;(function() {
var CleanUpQueue = __AtlasRichMedia__.getModule('CleanUpQueue_a1');
var Reporter = __AtlasRichMedia__.getModule('AdInitEventReporter_a1');
function Ad(adEnv) {
this.env = adEnv;
this.cleanUpQueue = new CleanUpQueue();
var d = new (__AtlasRichMedia__.getModule('Document_a1'))(document);
d.adCreated();
this.cleanUpQueue.queueCommand(
function() {
d.adDeleted();
} 
);
this.reporter = new Reporter(adEnv);
}
Ad.prototype.getPaid = function() {
return this.env.placement_ad_id;
}
Ad.prototype.getEnvironment = function() {
return this.env;
}
Ad.prototype.getProperties = function() {
return this.props;
}
Ad.prototype.setProperties = function(adProps) {
this.props = adProps;
}
Ad.prototype.unload = function() {
this.cleanUpQueue.invoke();
}
Ad.moduleId = 'Ad_a4';
__AtlasRichMedia__.addModule(Ad);
})();
__AtlasRichMedia__.addModule(
{
moduleId: 'adCollection_a3',
ads: {},
add: function(ad) {
var oldAd = this.ads[ad.getPaid()];
if(oldAd)
this.remove(oldAd);
this.ads[ad.getPaid()] = ad;
},
enumerate: function(func) {
for(var paid in this.ads)
func(this.ads[paid]);
},
getByPaid: function(paid) {
return this.ads[paid];
},
remove: function(ad) {
if(ad == this.ads[ad.getPaid()]) {
ad.unload();
delete this.ads[ad.getPaid()];
}
}
}
);
;(function() {
var Ad = __AtlasRichMedia__.getModule('Ad_a4');
__AtlasRichMedia__.addModule(
{
moduleId: 'adFactory_a2',
create: function(adEnv) {
return new Ad(adEnv);
}
}
);
})();
__AtlasRichMedia__.addModule(
{
moduleId : "adPropertiesTransformation_a1",
adPropertiesTransform : function(adProps)
{
if ( this._propIsntSubstituted(adProps.flash_version) )
{
adProps.flash_version = adProps.blContent[0][8];
}
if ( this._propIsntSubstituted( adProps.movie_name) )
{
adProps.movie_name = adProps.blContent[0][0];
}
if ( this._propIsntSubstituted( adProps.alt_movie_name) )
{
adProps.alt_movie_name = adProps.blContent[0][13];
}
if ( this._propIsntSubstituted( adProps.is_alternate_contents_external) )
{
adProps.is_alternate_contents_external = adProps.blContent[0][17];
}
if ( this._propIsntSubstituted( adProps.is_alt_from_default_dir) )
{
adProps.is_alt_from_default_dir = adProps.blContent[0][14];
}
if ( this._propIsntSubstituted( adProps.alternate_movie_url) )
{
adProps.alternate_movie_url = adProps.blContent[0][18];
}
if ( this._propIsntSubstituted( adProps.is_from_default_dir) )
{
adProps.is_from_default_dir = adProps.blContent[0][1];
}
var phases = ["teaser","reminder","main"];
for (var i = 0; i < phases.length; i++)
{
for (var j = 1; j < 5; j++)
{
var property = "paramdynamiclogic" + phases[i] + j;
if (adProps[property])
{
var text = adProps[property];
var properties = text.match(/^<properties>(.*)<\/properties>(.*)$/);
if (properties)
{
if (properties.length > 2)
adProps[property] = properties[2];
if (properties.length > 1)
{
this._evaluateCustomProperties(properties[1], adProps);
}
}
}
}
}
},
_evaluateCustomProperties : function(customProperties, adProps)
{
eval("var tempProps = " + customProperties);
for ( var prop in tempProps )
{
adProps[prop] = tempProps[prop];
} 
},
_propIsntSubstituted : function (propertyValue)
{
return propertyValue.match(/!~!.*!~!/);
}
});
if(!window.ARMRedirLib) ARMRedirLib = {};
if(!ARMRedirLib.AdParms) {
ARMRedirLib.AdParms = function(parms) {
for(var name in parms) {
var value = parms[name];
switch(name) {
case 'blContent':
if(typeof(value) == "string" && !value.match(/!~!/)) {
this[name] = [];
eval(value);
} else {
this[name] = value;
}
break;
case 'childmovies':
if(value.match(/!~!/)) {
this.childmovies = null;
}
else
{
this.childmovies = [{}];
eval(value);
this.childmovies = this.childmovies[0];
}	
break;
case 'locationdatafirefox':
if(typeof(value) == "string" && !value.match(/!~!/)) {
this.locationdata = [];
eval(value);
} else {
this.locationdata = value;
}
break;
case 'safeServe':
this.safeServe = (value === "true" ? true : false);
break;
default:
this[name] = value;
break;
}
}
}
}
if(!window.__atlas_ad_info) __atlas_ad_info = {};
if(!window.ARM_rtc) ARM_rtc = {};
if(!ARM_rtc.RmAdParms) ARM_rtc.RmAdParms = [];
if(!ARM_rtc.AddRmAdParms) {
ARM_rtc.AddRmAdParms = function(adParms)
{
adParms.mods = [];
var modules = adParms.modules.split(",");
for (var j = 0; j < modules.length; j++)
{
adParms.mods[adParms.mods.length] = {moduleId:modules[j], moduleObject:null, moduleInitialized:false};
}
ARM_rtc.RmAdParms[ARM_rtc.RmAdParms.length] = adParms;
}
}
if(!ARM_rtc.getByPaid) {
ARM_rtc.getByPaid = function(paid)
{
for (var i = 0; i < ARM_rtc.RmAdParms.length; i++)
{
if (ARM_rtc.RmAdParms[i].paid == paid) return ARM_rtc.RmAdParms[i];
}
return null;
}
}
(function() {
if(!window.ARM_TestMode) {
var adProps =
{
bannerZindex: "!~!bannerZindex!~!",
blContent:"this.blContent[0]= new Array('4CSF1STUBSTU/Dynamic_Ads_Revised_2012/GEN_TCK_A_GEODynamic_300x250_2012_LG_parent.swf',true,'21476c1c03-7c71-477c-b559-6259f3e7f1d6',0,0,0,0,0,6,1,0,0,0,'4CSF1STUBSTU/Dynamic_Ads_Revised_2012/GEN_TCK_A2_GEODynamic_300x250_2012_LG.jpg',false,'21d50b02d9-ce2c-4f1e-85e5-2521ff486315',-1,false,'',1,0);",
childmovies:" this.childmovies[0]['movie1'] = 'Dynamic_Ads_Revised_2012/GEN_TCK_A_GEODynamic_300x250_2012_LG.swf'; this.childmovies[0]['movie2'] = 'Dynamic_Ads_Revised_2012/GEN_TCK_A_GEODynamic_300x250_2012_LG.xml';",
expandZindex: "!~!expandZindex!~!",
idCampaign:"6372270dc4d94138b16a15ee8fa24a1f",
impoliteDownload:"true",
locationdata: "this.locationdata[0] = new Array(0,0,250,300,1,2,'Alternate',0,0,250,300,1,2,'Alternate',0,0,250,300,1,2,'Alternate');",
locationdatafirefox:"this.locationdata[0] = new Array(0,0,250,300,1,2,1,'Alternate',0,0,250,300,1,2,1,'Alternate',0,0,250,300,1,2,0,'Alternate');",
modules:"ARMRedirLib_c1,ARMPreLib_c1",
paid:"e770ba9984b74756b013597932cf9c926372270dc4d94138b16a15ee8fa24a1f", 
paramdynamiclogicmain1:"",
paramdynamiclogicmain2:"",
paramdynamiclogicmain3:"",
paramdynamiclogicmain4:"",
paramdynamiclogicreminder1:"",
paramdynamiclogicreminder2:"",
paramdynamiclogicreminder3:"",
paramdynamiclogicreminder4:"",
paramdynamiclogicteaser1:"",
paramdynamiclogicteaser2:"",
paramdynamiclogicteaser3:"",
paramdynamiclogicteaser4:"",
paramhideselectmain:"true",
paramhideselectreminder:"false",
paramhideselectteaser:"false",
paramnoframesmain:"true",
paramnoframesreminder:"false",
paramnoframesteaser:"false",
paramonload:"false",
paramonscroll:"true",
paramres_1024x768:"false",
paramres_1152x864:"false",
paramres_1280x1024:"false",
paramres_1600x1200:"false",
paramres_640x480:"false",
paramres_800x600:"false",
safeServe : "!~!safeServe!~!",
showAnyResolution:"true",
TopLayerVersion:"v3q", 
ifbVersion:"10",
ssVersion:"v1k",
ssHtmlVersion:"v1d",
loadVersion:"v1f",
version:"3",
embed_wmode:"transparent",
flash_version:"!~!flash_version!~!",
movie_name:"!~!movie_name!~!",
alt_movie_name:"!~!alt_movie_name!~!",
is_alternate_contents_external:"!~!is_alternate_contents_external!~!",
is_alt_from_default_dir:"!~!is_alt_from_default_dir!~!",
alternate_movie_url : "!~!alternate_movie_url!~!",
is_from_default_dir : "!~!is_from_default_dir!~!"
};
var modMgr = __AtlasRichMedia__;
var adCollection = modMgr.getModule("adCollection_a3");
var adEnv = modMgr.getModule('adEnvironment_a3').createAdEnvironment(adProps.paid);
var ad = modMgr.getModule('adFactory_a2').create(adEnv);
adCollection.add(ad);
var adParms = new ARMRedirLib.AdParms(adProps);
modMgr.getModule("adPropertiesTransformation_a1").adPropertiesTransform(adParms);
ad.setProperties(adParms);
ARM_rtc.AddRmAdParms(adParms);
var url = adEnv.http + "://" + adEnv.toplayer_path + "load." + adParms.loadVersion + ".js"; 
writeToDocument(url, adParms.paid);
}
function writeToDocument(url, paid) {
if ( __atlas_ad_info[paid].bustedOut ) {
var el = document.createElement("script");
el.type = "text/javascript";
el.src = url;
document.body.appendChild(el);
}
else 
document.write("<scr" + "ipt type='text/javascript' " + "src='" + url + "'></scr" + "ipt>");
}
})();
