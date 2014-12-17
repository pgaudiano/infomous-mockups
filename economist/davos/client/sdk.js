/*!
 * Infomous JS SDK
 * http://www.infomous.com/
 */
(function(i,f,h,c){var j={};j.log=function(){if(!e||typeof console==="undefined"){return}if(j.device.ios()){console.log(["[infomous]"].concat(arguments).join(" "))}else{if(typeof console.log.apply==="function"){console.log.apply(console,["[infomous]"].concat(arguments))}}};j.log_enable=function(l){e=l};j.base_root=function(){var l=j.get_snippets()[0];if(l){return l.get_base_root()}var m=f.location;return/infomous\.com/.test(m.hostname)?m.protocol+"//"+m.hostname+"/":""};j.base_path=function(){var l=j.get_snippets()[0];if(l){return l.get_base_path()}return j.base_root()+"client/"};var a={_default:{get_urls:function(){return j.get_script_urls(/infomous\.com/)},get_base_path:function(l){return l.split("/",3).join("/")+"/client/"},get_base_root:function(l){return l.split("/",3).join("/")+"/"}},embed_js:{get_urls:function(){return j.get_script_urls(/(?=.*infomous\.com)(?=.*embed\.js)/)},get_base_path:function(l){return l.split("/").slice(0,-2).join("/")+"/client/"}},cloud_get:{get_urls:function(){return j.get_script_urls(/(?=.*infomous\.com)(?=.*cloud\/get)/)}},cloud_widget:{get_urls:function(){return j.get_script_urls(/(?=.*infomous\.com)(?=.*cloud_widget)/)}},cloud_fullscreen:{get_urls:function(){return j.get_script_urls(/(?=.*infomous\.com)(?=.*cloud\/fullscreen)/)}}};for(var d in a){if(d==="_default"){continue}for(var g in a._default){if(a[d][g]===c){a[d][g]=a._default[g]}}}delete a._default;j.get_snippets=function(){var o=[];for(var l in a){var p=a[l].get_urls();for(var n=0;n<p.length;n++){var m=p[n];o.push({id:l,url:m,get_base_path:function(){return a[this.id].get_base_path(m)},get_base_root:function(){return a[this.id].get_base_root(m)}})}}return o};j.get_script_urls=function(o){var l=h.getElementsByTagName("script"),n,q;var p=[];for(var m=0;m<l.length;m++){n=l[m];q=n.getAttribute?n.getAttribute("src"):n.src;if(q&&o.test(q)){p.push(q)}}return p};j.get_url_params=function(n,m){if(m===c&&j.is_str(n)&&n.length===1){m=n;n=c}n=n||j.href();m=m||"?";var q=n.split(m);if(q.length==1){return{}}q=q[1];var l=q.split("&"),o=l.length,r={};while(o--){if(j.is_empty(l[o])){continue}var p=l[o].split("=");r[p[0]]=p[1]}return r};j.href=function(){var l;try{l=f.top.location.href}catch(m){}return l||h.referrer};var k=(function(){var m=j.base_path();function l(n,q){var o=n.split(".");var r=q.split(".");for(var p=0;p<r.length;p++){if(parseInt(o[p])===parseInt(r[p])){continue}return parseInt(o[p])<parseInt(r[p])}return false}return{jquery:{files:[m+"lib/jquery.js"],on_loaded:function(){j.$=i.jQuery.noConflict()},is_loaded:function(){if(j.$){return true}if(!i.jQuery){return false}if(!l(i.jQuery.fn.jquery,"1.4.3")){j.$=i.jQuery.noConflict();return true}return false}},"jquery-ui":{files:["jquery-ui-1.8.16"],is_loaded:function(){try{return !!j.$.ui}catch(n){return false}}},"jquery-ui-1.8.16":{files:["jquery",m+"lib/jquery-ui-1.8.16.custom.css",m+"lib/jquery-ui-1.8.16.custom.min.js"],is_loaded:function(){try{return !l(j.$.ui.version,"1.8.16")}catch(n){return false}}},CloudJS:{files:["jquery",m+"infomous.css",m+"infomous.js"],is_loaded:function(){return !!j.CloudJS}},CloudToolbar:{files:["jquery-ui",m+"cloud_gui.css",m+"cloud_gui.js"],is_loaded:function(){return !!j.CloudToolbar}},CloudFrame:{files:["jquery",m+"cloud_frame.css",m+"cloud_frame.js"],is_loaded:function(){return !!j.CloudFrame}}}})();j.define=function(m,n){j[m]=n;var o=["CloudProxy","GAtracker"];for(var l in o){if(o[l]===m){i[m]=n}}};j.require=function(r,s){r=j.to_arr(r);var n=[],q=[];for(var p=0;p<r.length;p++){o(n,r[p])}function o(w,A){var v=k[A],u=v&&v.is_loaded();if(!v){return}var y,z=v.files,t=v.on_loaded;if(!u&&typeof t==="function"){q.push(t)}for(var x=0;x<z.length;x++){y=z[x];if(m(y)){o(w,y)}else{if(!u||!l(y)){w.push(y)}}}}function m(t){return !!k[t]}function l(t){return/\.js/.test(t)}j.load_files(n,function(){var t;for(var u=0;u<q.length;u++){t=q[u];if(typeof t==="function"){t()}}if(typeof s==="function"){s()}})};j.esc=function(n){if(j.is_obj(n)){for(var m in n){n[m]=l(n[m])}}else{return l(n)}function l(o){if(!j.is_str(o)){return o}return o.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}};j.object=function(m){function l(){}l.prototype=m;return new l()};j.events=function(l){return j.extend(l,new j.Events())};j.extend=function(n,m){if(m===c){m=n;n=c}n=n||{};for(var l in m){if(m.hasOwnProperty(l)){if(typeof m[l]==="object"){n[l]=j.is_arr(m[l])?[]:{};j.extend(n[l],m[l])}else{n[l]=m[l]}}else{n[l]=m[l]}}return n};j.freeze=function(n,l){if(typeof Object.freeze!=="function"){return}Object.freeze(n);if(!l){return}for(var m in n){if(!n.hasOwnProperty(m)||!(typeof n==="object")){continue}j.freeze(n[m])}};j.bind=function(m,l){if(!j.is_fn(m)){return c}l=l||{};return function(){return m.apply(l,[].slice.call(arguments))}};j.is_arr=function(l){return Object.prototype.toString.call(l)=="[object Array]"};j.is_obj=function(l){return Object.prototype.toString.call(l)=="[object Object]"};j.is_fn=function(l){return Object.prototype.toString.call(l)=="[object Function]"};j.is_str=function(l){return Object.prototype.toString.call(l)=="[object String]"};j.is_num=function(l){return Object.prototype.toString.call(l)=="[object Number]"};j.bool=function(l){return(/^true$/i).test(l)||(/^1$/i).test(l)};j.is_empty=function(m){if(m===null||m===c){return true}if(j.is_arr(m)){return m.length===0}if(j.is_str(m)){return m.replace(/\s/g,"")===""}if(j.is_num(m)){return false}for(var l in m){if(m.hasOwnProperty(l)){return false}}return true};j.to_arr=function(l){return j.is_arr(l)?l:[l]};j.contains=function(l,m){return j.indexof(l,m)!=-1};j.add_unique=function(l,m){if(j.contains(l,m)){return 0}return l.push(m)};j.remove=function(l,n){if(!j.is_arr(l)){return c}var m=j.indexof(l,n);if(m===-1){return c}return l.splice(m,1)[0]};j.indexof=function(l,n){if(!j.is_arr(l)){return -1}if(Array.prototype.indexOf){return l.indexOf(n)}var m=l.length;while(m--){if(l[m]===n){return m}}return -1};j.sequence=function(){var l=[].slice.call(arguments);var o=l.pop();var n;(function m(){if(l.length==0){if(typeof o==="function"){o()}return}n=l.shift();if(typeof n==="function"){n(m)}else{m()}})()};j.load_files=function(l,o){l=j.to_arr(l);l=l.slice(0);var m;(function n(){if(l.length==0){if(typeof o==="function"){o()}return}m=l.shift();j.load_file(m,n)})()};j.load_file=function(n,p){j.load_file.loading=j.load_file.loading||{};if(j.load_file.loading[n]==="complete"){p();return}if(j.load_file.loading[n]!==c){j.load_file.loading[n].push(p);return}j.load_file.loading[n]=[p];if(/\.js/.test(n)){l(n,m)}else{if(/\.css/.test(n)){o(n,m)}}function m(){var s,r=j.load_file.loading[n];for(var q=0;q<r.length;q++){s=r[q];if(typeof s==="function"){s()}}j.load_file.loading[n]="complete"}function l(r,t){var q=h.createElement("script");q.type="text/javascript";q.async=true;q.src=r;var s=h.getElementsByTagName("script")[0];s.parentNode.insertBefore(q,s);if(q.addEventListener){q.addEventListener("load",t,false)}else{q.attachEvent("onreadystatechange",readyHandler=function(){if(/complete|loaded/.test(q.readyState)){t();q.detachEvent("onreadystatechange",readyHandler)}})}}function o(r,w){var u,t,s,v;u=h.createElement("link");u.rel="stylesheet";u.type="text/css";u.href=r;t=h.getElementsByTagName("script")[0];t.parentNode.insertBefore(u,t);s=h.createElement("span");s.id="css-ready";t.parentNode.insertBefore(s,t);(function q(){if(f.getComputedStyle){v=h.defaultView.getComputedStyle(s,null).getPropertyValue("color")}else{if(s.currentStyle){v=s.currentStyle.color}}if(v&&v==="rgb(121, 121, 121)"||v==="#797979"){s.parentNode.removeChild(s);w()}else{setTimeout(q,100)}})()}};j.hex2rgb=function(m){m=m.replace("0x","#");var l=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(m);return l?{r:parseInt(l[1],16),g:parseInt(l[2],16),b:parseInt(l[3],16)}:null};j.rgb2hex=function(n,m,l){return"#"+((1<<24)+(n<<16)+(m<<8)+l).toString(16).slice(1)};var b={};j.clouds={add:function(l){var m=l.id();if(j.is_empty(m)){return}j.clouds.remove(m);b[m]=l},get:function(m){if(!m){for(var l in b){return b[l]}}return b[m]},remove:function(m){try{b[m].dispose()}catch(l){}b[m]=c;delete b[m]}};j.css={};j.css.get=function(s,p){var o=h.styleSheets,m,n,r,l,q;for(m=0;m<o.length;m++){n=o[m];if(!n.href||!n.href.indexOf(s)){continue}r=n.cssRules;if(!r){continue}for(l=0;l<r.length;l++){q=r[l];if(q.selectorText===p){return q.style}}}return null};j.css.size=function(l){return l?(j.css.is_abs_size(l)?parseInt(l)+"px":l):c};j.css.is_abs_size=function(l){return l.toString().indexOf("%")==-1};j.css.attach=function(l){l=j.esc(l);if(!j.is_str(l)){return}var m=h.createElement("div");m.innerHTML="<p></p><style>"+l+"</style>";h.getElementsByTagName("head")[0].appendChild(m.childNodes[1])};j.agg=(function(){function o(q){var t=m(q.getUTCHours()),u=m(q.getUTCMinutes()),s="00",r=q.getUTCFullYear().toString(),v=m(q.getUTCMonth()+1),p=m(q.getUTCDate());return r+v+p+"T"+t+u+s+"Z"}function n(u){if(!j.is_str(u)){return c}var v=10,w=parseInt(u.substr(6,2),v),q=parseInt(u.substr(4,2),v)-1,t=parseInt(u.substr(0,4),v),p=parseInt(u.substr(9,2),v),r=parseInt(u.substr(11,2),v),x=0;var s=new Date;s.setUTCDate(w);s.setUTCMonth(q);s.setUTCFullYear(t);s.setUTCHours(p);s.setUTCMinutes(r);s.setUTCSeconds(x);return s}function l(p,q){p=p||{};var q=q||new Date;return new Date(q.getFullYear()+(p.years||0),q.getMonth()+(p.months||0),q.getDate()+(p.days||0),q.getHours()+(p.hours||0),q.getMinutes()+(p.minutes||0),q.getSeconds()+(p.seconds||0),q.getMilliseconds()+(p.milliseconds||0))}function m(q){var p=q.toString();return q<10&&p.length===1?"0"+q:p}return{date2agg:o,agg2date:n}})();j.bus={flash:{},drupal:{}};j.device=(function(){var l=navigator.userAgent;return{android:function(){return/Android/i.test(l)},iphone:function(){return/iPhone/i.test(l)},ipod:function(){return/iPod/i.test(l)},ipad:function(){return/iPad/i.test(l)},ios:function(){return this.iphone()||this.ipod()||this.ipad()},blackberry:function(){return/BlackBerry/i.test(l)},mobile:function(){return/Mobile/i.test(l)},osx:function(){return/Mac OS X/i.test(l)},win:function(){return/Windows/i.test(l)},str:function(){for(var m in this){if(m!=="str"&&this[m]()){return m}}return"device-not-found"}}})();var e=/dev3|staging/.test(j.base_root());i.Infomous=j})(this,window,document,undefined);
/*!
 * Infomous Google Analytics Tracker
 * http://www.infomous.com/
 * 
 * @constructor
 * @param {string} name
 * @param {string} account id
 *
 * https://developers.google.com/analytics/devguides/collection/gajs/
 */
(function(a){var b=function(c){b.load();var d=c.account||b.def_acct();this.nid=c.nid;this.set_account(c.name,d)};b.def_acct=function(){return"UA-18489566-1"};b.load=function(){if(window._gaq){return}_gaq=window._gaq||[];(function(){var d=document.createElement("script");d.type="text/javascript";d.async=true;d.src=("https:"==document.location.protocol?"https://ssl":"http://www")+".google-analytics.com/ga.js";var c=document.getElementsByTagName("script")[0];c.parentNode.insertBefore(d,c)})()};b.prototype={constructor:b,set_account:function(c,d){this.name=c;this.account=d;_gaq.push([c+"._setAccount",d])},track_event:function(e){var c=e.link_url||{};var f=[{name:"nid",value:e.nid||this.nid},{name:c.name,value:c.value}];this.set_custom_vars(f);var d=a.href();_gaq.push([this.name+"._trackEvent",d,e.action,e.label]);a.log("[GAtracker]","track event",this.name,"url",d,"opt",e,"cvars",f);this.del_custom_vars(f)},track_page:function(c){if(!c){try{var e=window.top.location;c=e.protocol+"//"+e.host+e.pathname+e.hash}catch(d){c=document.referrer}}_gaq.push([this.name+"._trackPageview",c])},set_custom_vars:function(d){if(d===undefined){return}d=a.to_arr(d);var c=d.length;while(c--){if(d[c]===undefined){continue}_gaq.push([this.name+"._setCustomVar",d[c].index||(c+1),d[c].name,d[c].value,d[c].opt_scope])}},del_custom_vars:function(d){if(d===undefined){return}d=a.to_arr(d);var c=d.length;while(c--){if(d[c]===undefined){continue}_gaq.push([this.name+"._deleteCustomVar",d[c].index||(c+1)])}}};a.define("GAtracker",b)})(Infomous);
/*!
 * Infomous Events
 * http://www.infomous.com/
 * 
 * @constructor
 */
(function(b){var a=function(){this.listeners={all:[]}};a.prototype={constructor:a,on:function(f,h,e){var c=this.listeners;if(b.contains(c,h)){return false}f=b.to_arr(f);var g,d=f.length;while(d--){g=f[d];c[g]=c[g]||[];c[g].push({fn:h,context:e||this})}return true},off:function(g,k,f){g=b.to_arr(g);if(!b.contains(g,"all")){g=g.concat("all")}var h,e=g.length;var l,c,d;while(e--){h=g[e];l=this.listeners[h];c=l?l.length:0;for(d=0;d<c;d++){if(l[d].fn===k&&l[d].context===f){l.splice(d,1)}}}},dispatch:function(h,c){h=b.to_arr(h);var g=this.listeners,l,n=h.length;var k,m,e;for(var f=0;f<n;f++){l=h[f];k=g.all.concat(g[l]);e=k.length;for(var d=0;d<e;d++){m=k[d];if(m===undefined){continue}m.fn.call(m.context,c||{})}}}};Infomous.define("Events",a)})(Infomous);
/*!
 * Infomous Cloud Flash
 * http://www.infomous.com/
 *
 * @constructor
 * @param {Object} config
 */
(function(b){var c=function(e){var d=b.extend(e);this.config=function(){return d}};c.required_version=function(){return"10.0.0"};c.supported=function(){return swfobject.hasFlashPlayerVersion(c.required_version())};c.prototype.add_to_dom=function(o,n,l){var q=this;q.id=function(){return o};q.dispose=function(){};function g(k){if(typeof k==="function"){k()}}function d(k){(k?g(n):g(l));delete b.bus.flash.load}var j=this.config();if(j.platform==="js"||!c.supported()){d(false);return}b.bus.flash.load=function(){d(true)};a(j.trackGAAccount);var e=b.base_path();var m=c.required_version();var i=window.params||{allowFullScreen:true,allowScriptAccess:"always",bgcolor:typeof(j.colBackground)=="undefined"?"#FAFAFA":j.colBackground.replace("0x","#")};var f={};for(var h in j){f[h]=encodeURIComponent(j[h])}delete f.width;delete f.height;b.require("jquery",function(){var k=q.id()+"-flash-cloud";var r=b.$('<div id="'+k+'"/>');b.$("#"+q.id()).append(r);swfobject.embedSWF(e+"infomous2.swf",k,j.width,j.height,m,false,f,i,null,function(s){if(s.success){p(document.getElementById(k))}else{d(false)}})});function p(k){b.log("[CloudFlash]","init",k);q.get_var=function(r){return k.getVar(r)};q.set_var=function(r,s){k.setVar(r,s)};q.set_vars=function(r){k.setVars(r)};q.set_feeds=function(r){k.setFeeds(r);if(b.is_empty(r)){q.empty_cloud()}};q.make_request=function(){k.makeRequest()};q.kill_current_request=function(){k.killRequest()};q.empty_cloud=function(){k.killRequest();k.emptyCloud()};q.get_save_state=function(){return k.jsGetCloudState()}}};function a(e){e=e||b.GAtracker.def_acct();b.GAtracker.load();var d="as3";_gaq.push([d+"._setAccount",e]);b.bus.flash.tracker={trackEvent:function(g,h,f){_gaq.push([d+"._trackEvent",g,h,f])},setCustomVar:function(h,f,g){_gaq.push([d+"._setCustomVar",h,f,g])},deleteCustomVar:function(f){_gaq.push([d+"._deleteCustomVar",f])}}}b.define("CloudFlash",c)})(Infomous);
/*!
 * Infomous Cloud Proxy
 * http://www.infomous.com/
 *
 * @constructor
 * @param {string} 'js' | 'flash'
 * @param {Object} config
 */
(function(b){var c=function(d,g,f){if(!(this instanceof c)){return new c(d,g,f)}b.events(this);d=d||"flash";f=f||"cloud_proxy_"+new Date().getTime();this.id=function(){return f};this.config=g||{};var e=a[d](this);e.init();this.get_var=function(h){return e.get_var(h)};this.set_var=function(h,i){i=b.esc(i);b.log("[CloudProxy]",this.id(),"set_var",h,i);this.dispatch(h,{key:h,value:i});this.config[h]=i;return e.set_var(h,i)};this.set_vars=function(i){b.esc(i);b.log("[CloudProxy]",this.id(),"set_vars",i);for(var h in i){this.dispatch(h,{key:h,value:i[h]});this.config[h]=i[h]}return e.set_vars(i)};this.make_request=function(){b.log("[CloudProxy]",this.id(),"make_request");return e.make_request()};this.set_feeds=function(h){b.log("[CloudProxy]",this.id(),"set_feeds",h);this.set_var("feeds",h);return e.set_feeds(h)};this.empty_cloud=function(){b.log("[CloudProxy]",this.id(),"empty_cloud");return e.empty_cloud()};this.kill_current_request=function(){b.log("[CloudProxy]",this.id(),"kill_current_request");return e.kill_current_request()};this.get_save_state=function(){b.log("[CloudProxy]",this.id(),"get_save_state");return e.get_save_state()};this.has_feeds=function(h){h=h||(this.get_var("feeds")||"");return h.replace(/\s/g,"")!==""}};var a={};a.js=function(e){var d;return{init:function(){b.log("[CloudProxy]",e.id(),"init js");d=b.clouds.get();d.plug_toolbar(e);d.on("hide",function(h){f("hidden",h.word)});d.on("focus",function(h){f("focused",h.word)});d.on("unfocus",function(h){g("focused",h.word)});d.on("unfocus_all",function(h){if(b.is_empty(e.get_var("focused"))){return}e.set_var("focused","");e.make_request()});function f(h,l){var j=(e.get_var(h)||"").trim();var k=j===""?[]:j.split(",");var i=b.add_unique(k,l);e.set_var(h,k.join());if(i){e.make_request()}}function g(h,l){var i=(e.get_var(h)||"").trim();if(i===""){return}var k=i.split(",");var j=b.remove(k,l);e.set_var(h,k.join());if(j){e.make_request()}}},get_var:function(f){return d.get_var(f)},set_var:function(f,g){d.set_var(f,g)},set_vars:function(f){d.set_vars(f)},set_feeds:function(f){if(b.is_empty(f)){e.empty_cloud();d.add_cloud_feedback("Please add some content to the cloud")}else{d.remove_cloud_feedback()}},make_request:function(){d.make_request()},kill_current_request:function(){d.kill_current_request()},empty_cloud:function(){d.kill_current_request();d.render(undefined)},get_save_state:function(){var f=e.config;var h={};var g=f.feeds;h.type=f.type;h.text_option=f.textOption;h.feeds=g;h.nid=b.bool(f.cloned)?0:f.nid;h.title=f.title;h.description=f.description;h.groups=b.bool(f.groups)?1:0;h.font_size=f.fontScale;h.zoom=f.zoom;h.max_words=Math.round(f.maxWords);h.word_cutoff=Math.round(f.popularWordCutoff);h.linkage_threshold=f.linkageThreshold;h.dict=f.dict;h.focused=f.focused;h.hidden=f.hidden;h.tags=f.tags;h.isPublic=b.bool(f.isPublic)?1:0;return h}}};a.flash=function(e){var d;return{init:function(){b.log("[CloudProxy]",e.id(),"init flash");d=b.clouds.get()},get_var:function(f){return d.get_var(f)},set_var:function(f,g){d.set_var(f,g)},set_vars:function(f){d.set_vars(f)},make_request:function(){d.make_request()},set_feeds:function(f){d.set_feeds(f)},empty_cloud:function(){d.empty_cloud()},kill_current_request:function(){d.kill_current_request()},get_save_state:function(){return d.get_save_state()}}};b.define("CloudProxy",c)})(Infomous);