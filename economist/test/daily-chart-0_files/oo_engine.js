/*   OnlineOpinion v5.4.4 Released: 9/23/2011. Compiled 09/23/2011 11:45:46 AM -0500 Branch: (no branch) 28e9303c70a0285af66e165a05583c84446a3e6a Components: Full The following code is Copyright 1998-2011 Opinionlab, Inc.  All rights reserved. Unauthorized use is prohibited. This product and other products of OpinionLab, Inc. are protected by U.S. Patent No. 6606581, 6421724, 6785717 B1 and other patents pending. http://www.opinionlab.com    */var OOo={Browser:(function(){var a=navigator.userAgent,b=Object.prototype.toString.call(window.opera)==='[object Opera]',c={IE:!!window.attachEvent&&!b,Opera:b,WebKit:a.indexOf('AppleWebKit/')>-1,Chrome:a.indexOf('Chrome')>-1,Gecko:a.indexOf('Gecko')>-1&&a.indexOf('KHTML')===-1,MobileSafari:/Apple.*Mobile.*Safari/.test(a),PalmPre:a.indexOf('Pre/')>-1,BlackBerry:a.indexOf('BlackBerry')>-1,Fennec:a.indexOf('Fennec')>-1,IEMobile:a.indexOf('IEMobile')>-1,OperaMobile:a.search(/Opera (?:Mobi|Mini)/)>-1},d=false;c.isMobile=(c.MobileSafari||c.PalmPre||c.BlackBerry||c.Fennec||c.IEMobile||c.OperaMobile);return c}())};OOo.Cache={};OOo.instanceCount=0;var OnlineOpinion=OnlineOpinion||OOo;(function(){function g(a){return document.getElementById(a)}function h(a,b){var c;for(c in b){if(b.hasOwnProperty(c)){a[c]=b[c]}}return a}function i(a,b,c,d){if(a.addEventListener){a.addEventListener(b,c,d)}else if(a.attachEvent){a.attachEvent('on'+b,c)}}function j(a,b,c,d){if(a.removeEventListener){a.removeEventListener(b,c,d)}else if(a.detachEvent){a.detachEvent('on'+b,c)}}function l(a){var b=[],c;for(c in a){if(a.hasOwnProperty(c)){b.push(c+'='+(encodeURIComponent(a[c])||''))}}return b.join('&')}function k(a){var b=l(a.metrics);b+='&custom_var='+a.tealeafId+'|'+a.clickTalePID+'/'+a.clickTaleUID+'/'+a.clickTaleSID;if(a.legacyVariables){b+="|"+encodeURIComponent(a.legacyVariables)}if(a.metrics.type==='OnPage'){b+='|iframe'}if(a.asm){b+='&asm=1'}b+="&_"+'rev=2';if(a.customVariables){b+='&customVars='+encodeURIComponent(OOo.serialize(a.customVariables))}return b}function p(a,b){var c=document,d=c.createElement('form'),e=c.createElement('input');d.style.display='none';d.method='post';d.target=b||'OnlineOpinion';d.action=a.onPageCard?'https://secure.opinionlab.com/ccc01/comment_card_json_4_0_b.asp?r='+location.href:'https://secure.opinionlab.com/ccc01/comment_card_d.asp';if(a.commentCardUrl){d.action=a.commentCardUrl;if(a.onPageCard){d.action+='?r='+location.href}}e.name='params';e.value=k(a);d.appendChild(e);c.body.appendChild(d);return d}function q(){return{width:screen.width,height:screen.height,referer:location.href,prev:document.referrer,time1:(new Date()).getTime(),time2:null,currentURL:location.href,ocodeVersion:'5.4.4'}}function t(a,b){a=a||{};return a.override?a.vars:b+(a.vars?'|'+a.vars:'')}function m(a,b){if(!b){b=location}return a.searchPattern?b.href.replace(a.searchPattern,a.replacePattern):a.replacePattern}var r=(function(){var a=document.body,b,c,d,e,f;if(document.createElement&&a&&a.appendChild&&a.removeChild){b=document.createElement('div');if(!b.getBoundingClientRect){return null}b.innerHTML='x';b.style.cssText='position:fixed;top:100px;';a.appendChild(b);c=a.style.height;d=a.scrollTop;a.style.height='3000px';a.scrollTop=500;e=b.getBoundingClientRect().top;a.style.height=c;f=(e===100);a.removeChild(b);a.scrollTop=d;return f}return null}()),u=(function(){var a=document.body,b,c;if(document.createElement&&a&&a.appendChild&&a.removeChild){b=document.createElement('iframe');c=false;b.setAttribute('name','oo_test');b.style.display='none';a.appendChild(b);c=!!!document.getElementsByName('oo_test')[0];a.removeChild(b);return c}else{return null}}());h(OOo,{extend:h,toQueryString:l,addEventListener:i,$:g,appendOOForm:p,removeEventListener:j,createMetrics:q,createLegacyVars:t,POSITION_FIXED_SUPPORTED:r,DYNAMIC_FRAME_NAME_IS_BUGGY:u,getFormParams:k,referrerRewrite:m})}());(function(){function f(a){if(!a){return null}switch(typeof a){case'number':case'boolean':case'function':return a;case'string':return'\''+a+'\'';case'object':var b,c,d,e;if(a.constructor===Array||typeof a.callee!=='undefined'){b='[';d=a.length;for(c=0;c<d-1;c+=1){b+=f(a[c])+','}b+=f(a[c])+']'}else{b='{';for(e in a){if(a.hasOwnProperty(e)){b+=e+':'+f(a[e])+','}}b=b.replace(/\,$/,'')+'}'}return b;default:return null}}OOo.extend(OOo,{serialize:f})}());(function(){function e(a,b,c){var d;if(a.search(b[0])!==-1){OOo.createCookie(c,0);return false}else if(OOo.readCookie(c)){d=parseInt(OOo.readCookie(c),10);if((a.search(b[d+1])!==-1)&&(d+1!==b.length-1)){OOo.createCookie(c,d+1);return false}else if(a.search(b[d])!==-1){return false}else if(d+1===b.length-1&&a.search(b.pop())!==-1){OOo.eraseCookie(c);return true}else{OOo.eraseCookie(c);return false}}else{return false}}OOo.extend(OOo,{checkTunnel:e})}());(function(){function r(a){var b="",c;for(c=7;c>=0;c-=1){b+='0123456789abcdef'.charAt((a>>(c*4))&0x0F)}return b}function u(a){var b=((a.length+8)>>6)+1,c=new Array(b*16),d;for(d=0;d<b*16;d+=1){c[d]=0}for(d=0;d<a.length;d+=1){c[d>>2]|=a.charCodeAt(d)<<(24-(d%4)*8)}c[d>>2]|=0x80<<(24-(d%4)*8);c[b*16-1]=a.length*8;return c}function n(a,b){var c=(a&0xFFFF)+(b&0xFFFF),d=(a>>16)+(b>>16)+(c>>16);return(d<<16)|(c&0xFFFF)}function o(a,b){return(a<<b)|(a>>>(32-b))}function s(a,b,c,d){if(a<20){return(b&c)|((~b)&d)}if(a<40){return b^c^d}if(a<60){return(b&c)|(b&d)|(c&d)}return b^c^d}function w(a){return(a<20)?1518500249:(a<40)?1859775393:(a<60)?-1894007588:-899497514}function v(a){var b=u(a),c=new Array(80),d=1732584193,e=-271733879,f=-1732584194,g=271733878,h=-1009589776,i,j,l,k,p,q,t,m;for(t=0;t<b.length;t+=16){i=d;j=e;l=f;k=g;p=h;for(m=0;m<80;m+=1){if(m<16){c[m]=b[t+m]}else{c[m]=o(c[m-3]^c[m-8]^c[m-14]^c[m-16],1)}q=n(n(o(d,5),s(m,e,f,g)),n(n(h,c[m]),w(m)));h=g;g=f;f=o(e,30);e=d;d=q}d=n(d,i);e=n(e,j);f=n(f,l);g=n(g,k);h=n(h,p)}return r(d)+r(e)+r(f)+r(g)+r(h)}OOo.extend(OOo,{sha1:v})}());(function(){function h(a,b){if(!b){b=location}var c=a.cookieName||'oo_abandon',d=OOo.readCookie(c),e=a.startPage,f=a.endPage,g=a.middle;if(!d){if(b.pathname.indexOf(e)!==-1){OOo.createCookie(c)}return false}else if(b.pathname.indexOf(f)!==-1){OOo.eraseCookie(c);return false}else if(b.pathname.search(g)!==-1){return false}else{OOo.eraseCookie(c);return true}}OOo.extend(OOo,{checkAbandonment:h})}());(function(){function d(a){var b,c;for(b=a.length-1;b>=0;b-=1){if(a[b].read){c=OOo.readCookie(a[b].name);if(!!c&&c===a[b].value){return true}else if(typeof a[b].value==='undefined'&&!!OOo.readCookie(a[b].name)){return true}}}return false}function e(a){var b;for(b=a.length-1;b>=0;b-=1){if(a[b].set){OOo.createCookie(a[b].name,a[b].value,a[b].expiration)}}}OOo.extend(OOo,{checkThirdPartyCookies:d,setThirdPartyCookies:e})}());OOo.extend(Function.prototype,(function(){if(typeof window.Prototype!=="undefined"){return}var e=Array.prototype.slice;function f(a,b){var c=a.length,d=b.length;while(d){d-=1;a[c+d]=b[d]}return a}function g(a,b){a=e.call(a,0);return f(a,b)}function h(b){if(arguments.length<2&&typeof b==="undefined"){return this}var c=this,d=e.call(arguments,1);return function(){var a=g(d,arguments);return c.apply(b,a)}}return{bind:h}}()));(function(){function f(a){if(!a){a=location}var b;if(a.host.search(/\.[a-z]+/)!==-1){b=a.host.split('.').reverse();if(b.length>3){return a.host}b='.'+b[1]+'.'+b[0]}else{b=a.host}return b}function g(a,b,c){var d='',e='';if(c){d=new Date();d.setTime(d.getTime()+(c*1000));e="; expires="+d.toGMTString()}if(location.host!==f()){document.cookie=a+"="+b+e+"; path=/; domain="+f()+";"}else{document.cookie=a+"="+b+e+"; path=/;"}}function h(a){var b=a+"=",c=document.cookie.split(';'),d,e;for(e=0;e<c.length;e+=1){d=c[e];while(d.charAt(0)===' '){d=d.substring(1,d.length)}if(d.indexOf(b)===0){return d.substring(b.length,d.length)}}return null}function i(a){g(a,"",-1)}OOo.extend(OOo,{getCookieDomain:f,createCookie:g,readCookie:h,eraseCookie:i})}());OOo.Ocode=function(a){var b=OOo.Browser,c,d;if(a.disableMobile&&b.isMobile){return}if(a.disableNoniOS&&(navigator.userAgent.search('Android')!==-1||b.PalmPre||b.IEMobile||b.OperaMobile||b.Fennec)){return}OOo.instanceCount+=1;this.options={tealeafCookieName:'TLTSID'};OOo.extend(this.options,a);c=this.options;d=c.referrerRewrite;c.metrics=OOo.createMetrics();this.frameName=c.onPageCard?'OnlineOpinion'+OOo.instanceCount:'OnlineOpinion';if(c.cookie&&OOo.Ocode.matchUrl(location,c.cookie)){return}if(c.thirdPartyCookies&&OOo.checkThirdPartyCookies(c.thirdPartyCookies)){return}if(c.abandonment&&!OOo.checkAbandonment(c.abandonment)){return}if(c.tunnel&&!OOo.checkTunnel(location.pathname,c.tunnel.path,c.tunnel.cookieName)){return}if(c.events&&c.events.onSingleClick){this.singProbability=Math.random()<1-c.events.onSingleClick/100}c.tealeafId=OOo.readCookie(c.tealeafCookieName)||OOo.readCookie(c.sessionCookieName);if(d){c.metrics.referer=OOo.referrerRewrite(d)}if(c.events){this.setupEvents();if(c.events.disableLinks||c.events.disableFormElements){this.setupDisableElements()}}if(c.floating){this.floating()}else if(c.bar){this.bar()}else if(c.tab){this.tab()}};OOo.Ocode.prototype={show:function(a,b){if(a==='Tab'&&b&&b.preventDefault){b.preventDefault()}if(this.onPageCardVisible){return}var c=this.options,d;if(this.interruptShow){return}if(!this.floatingLogo&&c.cookie&&OOo.Ocode.matchUrl(c.cookie)){return}if(!c.floating&&c.events&&this.singProbability){return}if(c.events&&c.events.onSingleClick){this.singProbability=true}if(c.cookie){OOo.Ocode.tagUrl(c.cookie)}if(c.thirdPartyCookies){if(OOo.checkThirdPartyCookies(c.thirdPartyCookies)){return}OOo.setThirdPartyCookies(c.thirdPartyCookies)}if(this.floatingLogo){this.floatingLogo.children[0].blur()}if(this.floatingLogo&&c.disappearOnClick){this.floatingLogo.style.display='none'}if(a){c.metrics.trigger=a}if(c.clickTalePID&&typeof window.ClickTale==='function'){c.clickTaleUID=window.ClickTaleGetUID();c.clickTaleSID=window.ClickTaleGetSID()}if(c.onPageCard){this.setupOnPageCC()}else{this.launchOOPopup()}d=c.floating||c.tab||c.bar;if(d&&typeof d.onClickCallback==='function'){d.onClickCallback()}if(OOo.Browser.IE){return false}}};OOo.extend(OOo.Ocode,{tagUrl:function(a,b){if(!b){b=location}var c=a.name||'oo_r',d=a.type==='page'?b.href:b.hostname,e=OOo.readCookie(c)||'';if(OOo.Ocode.matchUrl(a,b)){return}OOo.createCookie(c,e+OOo.sha1(d),a.expiration)},matchUrl:function(a,b){if(!b){b=location}var c=OOo.readCookie(a.name||'oo_r'),d;if(!c){return false}d=a.type==='page'?b.href:b.hostname;return c.search(OOo.sha1(d))!==-1}});(function(){function g(){var a=this.options,b=a.newWindowSize||[545,325],c=[parseInt((a.metrics.height-b[1])/2,10),parseInt((a.metrics.width-b[0])/2,10)],d,e,f=OOo.Browser.IE&&navigator.userAgent.search('MSIE 7')!==-1;a.metrics.time2=(new Date()).getTime();a.metrics.type='Popup';d=OOo.appendOOForm(a);e=window.open(f?a.commentCardUrl||'https://secure.opinionlab.com/ccc01/comment_card_d.asp?'+d.children[0].value:'','OnlineOpinion','location=no,status=no,width='+b[0]+',height='+b[1]+',top='+c[0]+',left='+c[1]);if(e&&!f){d.submit()}}OOo.extend(OOo.Ocode.prototype,{launchOOPopup:g})}());(function(){function j(){var a=this.options.events,b=[false,false],c=['onExit','onEntry'],d=OOo.Browser.Opera?'unload':'beforeunload',e,f,g,h,i;for(g=c.length-1;g>=0;g-=1){e=c[g];if(a[e]instanceof Array){h=a[e];i=h.length;while(i&&!b[g]){i-=1;if(window.location.href.search(h[i].url)!==-1&&Math.random()>=1-h[i].p/100){b[g]=true}}}else if(a[e]&&Math.random()>=1-a[e]/100){b[g]=true}}if(b[0]){OOo.addEventListener(window,d,this.show.bind(this,'onExit'),false)}if(b[1]){if(a.delayEntry){window.setTimeout(function(){this.show()}.bind(this,'onEntry'),a.delayEntry*1000)}else{this.show('onEntry')}}}function l(a){var b=a||window.event,c=a.target||a.srcElement,d=this.options.events,e=c.parentNode,f=5,g=0;while(e&&(c.nodeName!=='A'||c.nodeName!=='INPUT')&&g!==f){if(e.nodeName==='A'){c=e}e=e.parentNode;g+=1}if(d.disableFormElements&&c.tagName==="INPUT"&&(c.type==='submit'||c.type==='image')){this.interruptShow=true}if(d.disableLinks&&c.nodeName==='A'&&c.href.substr(0,4)==='http'&&c.href.search(d.disableLinks)!==-1){this.interruptShow=true}}function k(a){this.interruptShow=true}function p(){OOo.addEventListener(document.body,'mousedown',l.bind(this));if(!this.options.events.disableFormElements){return}var a=document.getElementsByTagName('form'),b;for(b=a.length-1;b>=0;b-=1){OOo.addEventListener(a[b],'submit',k.bind(this))}}OOo.extend(OOo.Ocode.prototype,{setupEvents:j,setupDisableElements:p})}());OOo.extend(OOo.Ocode.prototype,{floating:function(){var d=document,e=this.floatingLogo=document.createElement('div'),f=d.createElement('div'),g=d.createElement('div'),h=d.createElement('div'),i=d.createElement('span'),j=this.options.floating,l=OOo.$(j.contentId),k='10px',p=j.id,q=d.createElement('span'),t,m,r,u,n,o;function s(a){return a.offsetLeft+a.offsetWidth}function w(a){u.style.left=s(l)+'px'}q.innerHTML="Screen reader users: Please switch to forms mode for this link.";q.className="screenReader";if(p){e.id=p}e.className='oo_feedback_float';g.className='oo_transparent';f.className='olUp';h.className='olOver';f.tabIndex=0;f.onkeyup=function(a){t=a||window.event;if(t.keyCode!==13){return}this.show()}.bind(this);f.innerHTML=j.caption||'Feedback';e.appendChild(q);e.appendChild(f);i.innerHTML=j.hoverCaption||'Click here to<br>rate this page';h.appendChild(i);e.appendChild(h);e.appendChild(g);function v(a){var b=d.documentElement.scrollTop||d.body.scrollTop,c=d.documentElement.clientHeight||document.body.clientHeight;e.style.top=(b+c-e.clientHeight)+'px'}if(!OOo.POSITION_FIXED_SUPPORTED){e.style.position='absolute';e.style.bottom='';OOo.addEventListener(window,'scroll',v,false);OOo.addEventListener(window,'resize',v,false);if(d.compatMode==="BackCompat"){e.style.background="white"}}else if(OOo.Browser.MobileSafari){m=window.innerHeight;e.style.bottom=null;e.style.top=(window.pageYOffset+window.innerHeight-60)+'px';OOo.addEventListener(window,'scroll',function(a){r=window.pageYOffset-(m-window.innerHeight);e.style.webkitTransform='translateY('+r+'px)'},false)}if(j.position&&j.position.search(/Content/)&&l){u=this.spacer=d.createElement('div');n=OOo.Browser.WebKit?d.body:d.documentElement;u.id='oo_feedback_fl_spacer';u.style.left=s(l)+'px';d.body.appendChild(u);switch(j.position){case'rightOfContent':o=function(a){e.style.left=(s(l)-n.scrollLeft)+'px';if(!OOo.POSITION_FIXED_SUPPORTED){o=null}};break;case'fixedPreserveContent':o=function(a){var b=OOo.Browser.IE?d.body.clientWidth:window.innerWidth,c=OOo.POSITION_FIXED_SUPPORTED?n.scrollLeft:0;if(b<=s(l)+e.offsetWidth+parseInt(k,10)){e.style.left=(s(l)-c)+'px'}else{e.style.left='';e.style.right=k}};break;case'fixedContentMax':o=function(a){var b=OOo.Browser.IE?d.body.clientWidth:window.innerWidth;if(b<=s(l)+e.offsetWidth+parseInt(k,10)){e.style.left='';e.style.right=k;if(!OOo.POSITION_FIXED_SUPPORTED&&a&&a.type==='scroll'){e.style.left=(d.body.clientWidth+d.body.scrollLeft-105)+'px'}}else{e.style.left=(s(l)-n.scrollLeft)+'px';e.style.right=''}};break}o();OOo.addEventListener(window,'scroll',o,false);OOo.addEventListener(window,'resize',o,false);OOo.addEventListener(window,'resize',w,false)}else{e.style.right=k}OOo.addEventListener(e,'click',this.show.bind(this,'Floating'),false);OOo.addEventListener(e,'touchstart',this.show.bind(this,'Floating'),false);d.body.appendChild(e);if(!OOo.POSITION_FIXED_SUPPORTED){e.style.top=((d.documentElement.clientHeight||d.body.clientHeight)-e.clientHeight)+'px';g.style.height=e.clientHeight+'px';setTimeout(v,100)}},removeFloatingLogo:function(){document.body.removeChild(this.floatingLogo);if(this.spacer){document.body.removeChild(this.spacer)}}});OOo.extend(OOo.Ocode.prototype,{bar:function(){var c=document,d=this.floatingLogo=c.createElement('div'),e=c.createElement('span'),f,g,h;d.id='oo_bar';e.innerHTML=this.options.bar.caption||'Feedback';d.appendChild(e);d.tabIndex=0;d.onkeyup=function(a){var b=a||window.event;if(b.keyCode!==13){return}this.show()}.bind(this);OOo.addEventListener(d,'click',this.show.bind(this,'Bar'));document.body.className+=document.body.className<1?'oo_bar':' oo_bar';document.body.appendChild(d);if(OOo.Browser.IE){if(c.compatMode==='CSS1Compat'){f=function(a){if(a&&a.type==='resize'){setTimeout(f,50)}d.style.top=(c.documentElement.scrollTop+document.documentElement.clientHeight-d.clientHeight-1)+'px';d.style.width=(Math.max(c.documentElement.clientWidth,c.body.offsetWidth))+'px'}}else{f=function(a){d.style.top=(c.body.scrollTop+document.body.clientHeight-d.clientHeight-1)+'px';d.style.width=(Math.max(c.documentElement.clientWidth,c.body.offsetWidth)-22)+'px'}}d.style.position='absolute';OOo.addEventListener(window,'scroll',f,false);OOo.addEventListener(window,'resize',f,false);f()}else if(OOo.Browser.MobileSafari){g=window.innerHeight;d.style.bottom=null;d.style.top=(window.pageYOffset+window.innerHeight-22)+'px';OOo.addEventListener(window,'scroll',function(a){h=window.pageYOffset-(g-window.innerHeight);d.style.webkitTransform='translateY('+h+'px)'},false)}}});OOo.extend(OOo.Ocode.prototype,{tab:function(){var c=document,d=this.floatingLogo=c.createElement('div'),e=c.createElement('a'),f=c.createElement('span'),g=this.options.tab;d.id='oo_tab';d.className='oo_tab_'+(g.position||'right');if(!OOo.POSITION_FIXED_SUPPORTED){d.style.position='absolute';if(g.position==='right'){d.className+=' oo_tab_ie_right'}}else if(OOo.Browser.MobileSafari){d.style.top=(window.pageYOffset+window.innerHeight/2)+'px';OOo.addEventListener(window,'scroll',function(a){d.style.top=(window.pageYOffset+window.innerHeight/2)+'px'},false)}e.href="#";e.title=g.title||'Feedback';d.tabIndex=0;d.onkeyup=function(a){var b=a||window.event;if(b.keyCode!==13){return}this.show()}.bind(this);e.appendChild(f);d.appendChild(e);OOo.addEventListener(d,'click',this.show.bind(this,'Tab'),false);c.body.appendChild(d)}});OOo.extend(OOo.Ocode.prototype,{setupOnPageCC:function(){var e=document,f=OOo.Cache.overlay||e.createElement('div'),g=this.wrapper=e.createElement('div'),h=e.createElement('a'),i=e.createElement('div'),j=e.createElement('span'),l=this.frameName,k=e.createElement(OOo.DYNAMIC_FRAME_NAME_IS_BUGGY?'<iframe name="'+l+'">':'iframe'),p=e.createDocumentFragment(),q=this.options,t=q.onPageCard,m='https://secure.opinionlab.com/ccc01/comment_card_json_4_0_b.asp',r,u,n,o=false,s=this,w,v,A,x,y,B;function z(a){if(a&&a.preventDefault){a.preventDefault()}document.body.focus();k.tabIndex=-1;k.title="empty";k['aria-hidden']='true';f.style.display='none';f.className='';e.body.removeChild(g);if(window.postMessage){OOo.removeEventListener(window,'message',y)}else{window.clearInterval(u)}o=false;s.onPageCardVisible=false;return false}y=OOo.Ocode.postMessageHandler(function(a){var b=parseInt(a,10),c,d;if(b>0){if(o){return}o=true;c=window.innerHeight||e.documentElement.clientHeight||e.body.clientHeight;d=b;if(d>c){d=c-40;k.style.width='555px'}k.style.height=d+'px';g.style.visibility='visible';if(j.clientHeight<20){j.style.height=g.offsetHeight+'px'}f.className="no_loading";s.onPageCardVisible=true}else if(a==='submitted'){z()}if(OOo.Browser.IE&&e.compatMode==="BackCompat"){window.scrollTo(0,0)}},s.options.commentCardUrl);q.metrics.type='OnPage';OOo.Cache.overlay=f;f.id='oo_overlay';f.style.display='block';f.className='';i.className='iwrapper';g.className='oo_cc_wrapper';h.className='oo_cc_close';h.href="#";h.title=t.closeTitle||"Close Feedback Card";g.style.visibility='hidden';if(OOo.Browser.IE){if(!window.XMLHttpRequest||e.compatMode==="BackCompat"){B=Math.max(e.documentElement.clientWidth,e.body.offsetWidth);f.style.position='absolute';f.style.width=e.compatMode==="BackCompat"?(B-21)+'px':B+'px';f.style.height=Math.max(e.documentElement.clientHeight,e.body.offsetHeight)+'px';g.style.position='absolute';OOo.addEventListener(window,'scroll',function(){f.style.top=(e.body.scrollTop+document.body.clientHeight-f.clientHeight)+'px';g.style.top=(e.body.scrollTop+25)+'px'})}else{w=e.createElement("div");v=e.createElement("div");A=e.createElement("div");x=e.createElement("div");x.className="oo_shadows";w.className='oo_body';v.className='oo_top';A.className='oo_bottom';x.appendChild(w);x.appendChild(v);x.appendChild(A);i.appendChild(x)}}OOo.addEventListener(h,'click',z);if(t.closeWithOverlay&&!OOo.Browser.isMobile){g.appendChild(j);j.onclick=z;f.onclick=z}k.name=l;i.appendChild(h);i.appendChild(k);g.appendChild(i);p.appendChild(g);p.appendChild(f);e.body.appendChild(p);if(window.postMessage){OOo.addEventListener(window,"message",y)}else{u=setInterval(y,500)}q.metrics.time2=(new Date()).getTime();r=OOo.appendOOForm(q,l);r.submit()}});OOo.extend(OOo.Ocode,{postMessageHandler:function(d,e,f){return function(a){var b='https://secure.opinionlab.com',c;if(!f){f=location}if(e){e=e.match(/(https?:\/\/.*?)\/|$/)[1]}if((a&&!(a.origin===b||a.origin===e))||(!a&&f.hash.search('OL=')===-1)){return false}c=a?a.data:f.hash.split('=').pop();if(!a&&location.hash){location.hash=''}d(c);return c}}});OOo.Invitation=function(a){if(OOo.Browser.isMobile){return}this.options={tunnelCookie:'oo_inv_tunnel',repromptTime:604800,responseRate:50,repromptCookie:'oo_inv_reprompt',promptMarkup:'oo_inv_prompt.html',promptStyles:'oo_inverstitial_style.css',percentageCookie:'oo_inv_percent',pagesHitCookie:'oo_inv_hit',popupType:'popunder',promptDelay:0,neverShowAgainButton:false,loadPopupInBackground:false,tealeafCookieName:'TLTSID',monitorWindow:'oo_inv_monitor.html'};this.popupShown=false;OOo.extend(this.options,a);var b=this.options,c=parseInt(OOo.readCookie(b.pagesHitCookie),10)||0;OOo.Invitation.friendlyDomains=b.friendlyDomains||null;if(location.search.search('evs')!==-1){b.loadPopupInBackground=true;this.launchPopup();OOo.createCookie(b.repromptCookie,1,b.repromptTime===-1?0:b.repromptTime)}setTimeout(function(){if(!window.oo_inv_monitor){return}if(b.area&&location.href.search(b.area)===-1){this.options.popupType='popup';this.launchPopup()}else if(b.goal&&location.href.search(b.goal)!==-1){window.oo_inv_monitor.close()}}.bind(this),1000);if(OOo.readCookie(b.repromptCookie)){return}if(b.thirdPartyCookies&&OOo.checkThirdPartyCookies(b.thirdPartyCookies)){return}if(!OOo.readCookie(b.percentageCookie)){OOo.createCookie(b.percentageCookie,(Math.random()>1-(b.responseRate/100))?"1":"0")}if(typeof b.promptTrigger!=='undefined'){if(b.promptTrigger instanceof RegExp){if(!window.location.href.match(b.promptTrigger)){return}}else if(b.promptTrigger instanceof Array){if(!OOo.checkTunnel(location.pathname,b.promptTrigger,b.tunnelCookie)){return}}}c+=1;OOo.createCookie(b.pagesHitCookie,c);if(b.pagesHit&&c<b.pagesHit){return}OOo.eraseCookie(b.tunnelCookie);if(OOo.readCookie(b.percentageCookie)==='1'){window.setTimeout(function(){OOo.createCookie(b.repromptCookie,1,b.repromptTime);this.getPrompt()}.bind(this),b.promptDelay*1000)}};OOo.Invitation.prototype={getPrompt:function(){var a=window.XMLHttpRequest?new XMLHttpRequest():new window.ActiveXObject("Microsoft.XMLHTTP"),b=this,c=document.createElement('link'),d;a.onreadystatechange=function(){if(a.readyState!==4){return}b.showPrompt(a.responseText)};a.open("GET",this.options.pathToAssets+this.options.promptMarkup,true);a.send(null)},showPrompt:function(a){var b=document,c=b.createElement('div'),d=OOo.Cache.overlay||b.createElement('div'),e,f,g=this.options,h;d.id='oo_overlay';c.id='oo_container';c.style.visibility='hidden';c.innerHTML=a;c.appendChild(d);b.body.appendChild(c);h=OOo.$('oo_launch_prompt');if(g.companyLogo){e=new Image();e.src=g.companyLogo;OOo.$('oo_company_logo').appendChild(e)}OOo.addEventListener(h,'click',this.launchPopup.bind(this),false);if(g.clickCallbacks){if(typeof g.clickCallbacks.yes==='function'){OOo.addEventListener(h,'click',function(){g.clickCallbacks.yes()},false)}if(typeof g.clickCallbacks.no==='function'){OOo.addEventListener(OOo.$('oo_no_thanks'),'click',function(){g.clickCallbacks.no()},false)}}if(g.neverShowAgainButton){f=OOo.$('oo_never_show');f.style.visibility='visible';OOo.addEventListener(f,'click',this.killPrompt.bind(this),false)}if(OOo.Browser.IE&&!window.XMLHttpRequest){d.style.position='absolute';d.style.width=Math.max(document.documentElement.clientWidth,document.body.offsetWidth)+'px';d.style.height=Math.max(document.documentElement.clientHeight,document.body.offsetHeight)+'px';c.style.position='absolute'}c.style.visibility='visible';d.className='no_loading'},launchPopup:function(){if(this.popupShown){return}this.popupShown=true;var b=this.options,c=window.location.href,d=b.popupType==='popup'?'https://secure.opinionlab.com/ccc01/comment_card.asp?':b.pathToAssets+b.monitorWindow+'?'+(new Date()).getTime()+'&',e,f=[],g=b.asm?[555,500]:[545,200],h,i=OOo.createMetrics(),j=OOo.readCookie(b.teleafId);if(b.clickTalePID&&window.ClickTaleGetUID&&window.ClickTaleGetSID){j+='|'+[b.clickTalePID,window.ClickTaleGetUID(),window.ClickTaleGetSID()].join('/')}g=b.newWindowSize||g;if(b.referrerRewrite){i.referer=OOo.referrerRewrite(b.referrerRewrite)}if(b.thirdPartyCookies){OOo.setThirdPartyCookies(b.thirdPartyCookies)}e=OOo.toQueryString(i)+'&type=Invitation';if(b.customVariables){e+='&customVars='+encodeURIComponent(OOo.serialize(b.customVariables))}e+='&custom_var='+OOo.createLegacyVars(b.legacyVariables,j);h=window.open(d+e,'OnlineOpinionInvitation','location=no,status=no,width='+g[0]+',height='+g[1]);if(!b.loadPopupInBackground&&OOo.$('oo_container')){OOo.Invitation.hidePrompt()}if(b.popupType==='popunder'){if(!OOo.Browser.Chrome){h.blur();window.focus()}else{if(!b.loadPopupInBackground){window.alert(b.chromeMainWinPrompt||'Please fill out the form behind this window when you are finished.')}if(b.chromeSurveyPrompt){setTimeout(function(a){h.postMessage(b.chromeSurveyPrompt,"*")},500)}}}else if(window.oo_inv_monitor){window.blur();h.focus()}},killPrompt:function(){if(this.options.clickCallbacks&&typeof this.options.clickCallbacks.no==='function'){this.options.clickCallbacks.no()}OOo.createCookie(this.options.repromptCookie,1,1825);OOo.Invitation.hidePrompt()}};OOo.extend(OOo.Invitation,{hidePrompt:function(){OOo.$('oo_container').style.display='none'},navigateToFriendlyDomain:function(a){location.href=a}});