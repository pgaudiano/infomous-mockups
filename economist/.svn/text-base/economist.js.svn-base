/*
 * jQuery JavaScript Library v1.3.2
 * http://jquery.com/
 *
 * Copyright (c) 2009 John Resig
 * Dual licensed under the MIT and GPL licenses.
 * http://docs.jquery.com/License
 *
 * Date: 2009-02-19 17:34:21 -0500 (Thu, 19 Feb 2009)
 * Revision: 6246
 */
(function(){var l=this,g,y=l.jQuery,p=l.$,o=l.jQuery=l.$=function(E,F){return new o.fn.init(E,F)},D=/^[^<]*(<(.|\s)+>)[^>]*$|^#([\w-]+)$/,f=/^.[^:#\[\.,]*$/;o.fn=o.prototype={init:function(E,H){E=E||document;if(E.nodeType){this[0]=E;this.length=1;this.context=E;return this}if(typeof E==="string"){var G=D.exec(E);if(G&&(G[1]||!H)){if(G[1]){E=o.clean([G[1]],H)}else{var I=document.getElementById(G[3]);if(I&&I.id!=G[3]){return o().find(E)}var F=o(I||[]);F.context=document;F.selector=E;return F}}else{return o(H).find(E)}}else{if(o.isFunction(E)){return o(document).ready(E)}}if(E.selector&&E.context){this.selector=E.selector;this.context=E.context}return this.setArray(o.isArray(E)?E:o.makeArray(E))},selector:"",jquery:"1.3.2",size:function(){return this.length},get:function(E){return E===g?Array.prototype.slice.call(this):this[E]},pushStack:function(F,H,E){var G=o(F);G.prevObject=this;G.context=this.context;if(H==="find"){G.selector=this.selector+(this.selector?" ":"")+E}else{if(H){G.selector=this.selector+"."+H+"("+E+")"}}return G},setArray:function(E){this.length=0;Array.prototype.push.apply(this,E);return this},each:function(F,E){return o.each(this,F,E)},index:function(E){return o.inArray(E&&E.jquery?E[0]:E,this)},attr:function(F,H,G){var E=F;if(typeof F==="string"){if(H===g){return this[0]&&o[G||"attr"](this[0],F)}else{E={};E[F]=H}}return this.each(function(I){for(F in E){o.attr(G?this.style:this,F,o.prop(this,E[F],G,I,F))}})},css:function(E,F){if((E=="width"||E=="height")&&parseFloat(F)<0){F=g}return this.attr(E,F,"curCSS")},text:function(F){if(typeof F!=="object"&&F!=null){return this.empty().append((this[0]&&this[0].ownerDocument||document).createTextNode(F))}var E="";o.each(F||this,function(){o.each(this.childNodes,function(){if(this.nodeType!=8){E+=this.nodeType!=1?this.nodeValue:o.fn.text([this])}})});return E},wrapAll:function(E){if(this[0]){var F=o(E,this[0].ownerDocument).clone();if(this[0].parentNode){F.insertBefore(this[0])}F.map(function(){var G=this;while(G.firstChild){G=G.firstChild}return G}).append(this)}return this},wrapInner:function(E){return this.each(function(){o(this).contents().wrapAll(E)})},wrap:function(E){return this.each(function(){o(this).wrapAll(E)})},append:function(){return this.domManip(arguments,true,function(E){if(this.nodeType==1){this.appendChild(E)}})},prepend:function(){return this.domManip(arguments,true,function(E){if(this.nodeType==1){this.insertBefore(E,this.firstChild)}})},before:function(){return this.domManip(arguments,false,function(E){this.parentNode.insertBefore(E,this)})},after:function(){return this.domManip(arguments,false,function(E){this.parentNode.insertBefore(E,this.nextSibling)})},end:function(){return this.prevObject||o([])},push:[].push,sort:[].sort,splice:[].splice,find:function(E){if(this.length===1){var F=this.pushStack([],"find",E);F.length=0;o.find(E,this[0],F);return F}else{return this.pushStack(o.unique(o.map(this,function(G){return o.find(E,G)})),"find",E)}},clone:function(G){var E=this.map(function(){if(!o.support.noCloneEvent&&!o.isXMLDoc(this)){var I=this.outerHTML;if(!I){var J=this.ownerDocument.createElement("div");J.appendChild(this.cloneNode(true));I=J.innerHTML}return o.clean([I.replace(/ jQuery\d+="(?:\d+|null)"/g,"").replace(/^\s*/,"")])[0]}else{return this.cloneNode(true)}});if(G===true){var H=this.find("*").andSelf(),F=0;E.find("*").andSelf().each(function(){if(this.nodeName!==H[F].nodeName){return}var I=o.data(H[F],"events");for(var K in I){for(var J in I[K]){o.event.add(this,K,I[K][J],I[K][J].data)}}F++})}return E},filter:function(E){return this.pushStack(o.isFunction(E)&&o.grep(this,function(G,F){return E.call(G,F)})||o.multiFilter(E,o.grep(this,function(F){return F.nodeType===1})),"filter",E)},closest:function(E){var G=o.expr.match.POS.test(E)?o(E):null,F=0;return this.map(function(){var H=this;while(H&&H.ownerDocument){if(G?G.index(H)>-1:o(H).is(E)){o.data(H,"closest",F);return H}H=H.parentNode;F++}})},not:function(E){if(typeof E==="string"){if(f.test(E)){return this.pushStack(o.multiFilter(E,this,true),"not",E)}else{E=o.multiFilter(E,this)}}var F=E.length&&E[E.length-1]!==g&&!E.nodeType;return this.filter(function(){return F?o.inArray(this,E)<0:this!=E})},add:function(E){return this.pushStack(o.unique(o.merge(this.get(),typeof E==="string"?o(E):o.makeArray(E))))},is:function(E){return !!E&&o.multiFilter(E,this).length>0},hasClass:function(E){return !!E&&this.is("."+E)},val:function(K){if(K===g){var E=this[0];if(E){if(o.nodeName(E,"option")){return(E.attributes.value||{}).specified?E.value:E.text}if(o.nodeName(E,"select")){var I=E.selectedIndex,L=[],M=E.options,H=E.type=="select-one";if(I<0){return null}for(var F=H?I:0,J=H?I+1:M.length;F<J;F++){var G=M[F];if(G.selected){K=o(G).val();if(H){return K}L.push(K)}}return L}return(E.value||"").replace(/\r/g,"")}return g}if(typeof K==="number"){K+=""}return this.each(function(){if(this.nodeType!=1){return}if(o.isArray(K)&&/radio|checkbox/.test(this.type)){this.checked=(o.inArray(this.value,K)>=0||o.inArray(this.name,K)>=0)}else{if(o.nodeName(this,"select")){var N=o.makeArray(K);o("option",this).each(function(){this.selected=(o.inArray(this.value,N)>=0||o.inArray(this.text,N)>=0)});if(!N.length){this.selectedIndex=-1}}else{this.value=K}}})},html:function(E){return E===g?(this[0]?this[0].innerHTML.replace(/ jQuery\d+="(?:\d+|null)"/g,""):null):this.empty().append(E)},replaceWith:function(E){return this.after(E).remove()},eq:function(E){return this.slice(E,+E+1)},slice:function(){return this.pushStack(Array.prototype.slice.apply(this,arguments),"slice",Array.prototype.slice.call(arguments).join(","))},map:function(E){return this.pushStack(o.map(this,function(G,F){return E.call(G,F,G)}))},andSelf:function(){return this.add(this.prevObject)},domManip:function(J,M,L){if(this[0]){var I=(this[0].ownerDocument||this[0]).createDocumentFragment(),F=o.clean(J,(this[0].ownerDocument||this[0]),I),H=I.firstChild;if(H){for(var G=0,E=this.length;G<E;G++){L.call(K(this[G],H),this.length>1||G>0?I.cloneNode(true):I)}}if(F){o.each(F,z)}}return this;function K(N,O){return M&&o.nodeName(N,"table")&&o.nodeName(O,"tr")?(N.getElementsByTagName("tbody")[0]||N.appendChild(N.ownerDocument.createElement("tbody"))):N}}};o.fn.init.prototype=o.fn;function z(E,F){if(F.src){o.ajax({url:F.src,async:false,dataType:"script"})}else{o.globalEval(F.text||F.textContent||F.innerHTML||"")}if(F.parentNode){F.parentNode.removeChild(F)}}function e(){return +new Date}o.extend=o.fn.extend=function(){var J=arguments[0]||{},H=1,I=arguments.length,E=false,G;if(typeof J==="boolean"){E=J;J=arguments[1]||{};H=2}if(typeof J!=="object"&&!o.isFunction(J)){J={}}if(I==H){J=this;--H}for(;H<I;H++){if((G=arguments[H])!=null){for(var F in G){var K=J[F],L=G[F];if(J===L){continue}if(E&&L&&typeof L==="object"&&!L.nodeType){J[F]=o.extend(E,K||(L.length!=null?[]:{}),L)}else{if(L!==g){J[F]=L}}}}}return J};var b=/z-?index|font-?weight|opacity|zoom|line-?height/i,q=document.defaultView||{},s=Object.prototype.toString;o.extend({noConflict:function(E){l.$=p;if(E){l.jQuery=y}return o},isFunction:function(E){return s.call(E)==="[object Function]"},isArray:function(E){return s.call(E)==="[object Array]"},isXMLDoc:function(E){return E.nodeType===9&&E.documentElement.nodeName!=="HTML"||!!E.ownerDocument&&o.isXMLDoc(E.ownerDocument)},globalEval:function(G){if(G&&/\S/.test(G)){var F=document.getElementsByTagName("head")[0]||document.documentElement,E=document.createElement("script");E.type="text/javascript";if(o.support.scriptEval){E.appendChild(document.createTextNode(G))}else{E.text=G}F.insertBefore(E,F.firstChild);F.removeChild(E)}},nodeName:function(F,E){return F.nodeName&&F.nodeName.toUpperCase()==E.toUpperCase()},each:function(G,K,F){var E,H=0,I=G.length;if(F){if(I===g){for(E in G){if(K.apply(G[E],F)===false){break}}}else{for(;H<I;){if(K.apply(G[H++],F)===false){break}}}}else{if(I===g){for(E in G){if(K.call(G[E],E,G[E])===false){break}}}else{for(var J=G[0];H<I&&K.call(J,H,J)!==false;J=G[++H]){}}}return G},prop:function(H,I,G,F,E){if(o.isFunction(I)){I=I.call(H,F)}return typeof I==="number"&&G=="curCSS"&&!b.test(E)?I+"px":I},className:{add:function(E,F){o.each((F||"").split(/\s+/),function(G,H){if(E.nodeType==1&&!o.className.has(E.className,H)){E.className+=(E.className?" ":"")+H}})},remove:function(E,F){if(E.nodeType==1){E.className=F!==g?o.grep(E.className.split(/\s+/),function(G){return !o.className.has(F,G)}).join(" "):""}},has:function(F,E){return F&&o.inArray(E,(F.className||F).toString().split(/\s+/))>-1}},swap:function(H,G,I){var E={};for(var F in G){E[F]=H.style[F];H.style[F]=G[F]}I.call(H);for(var F in G){H.style[F]=E[F]}},css:function(H,F,J,E){if(F=="width"||F=="height"){var L,G={position:"absolute",visibility:"hidden",display:"block"},K=F=="width"?["Left","Right"]:["Top","Bottom"];function I(){L=F=="width"?H.offsetWidth:H.offsetHeight;if(E==="border"){return}o.each(K,function(){if(!E){L-=parseFloat(o.curCSS(H,"padding"+this,true))||0}if(E==="margin"){L+=parseFloat(o.curCSS(H,"margin"+this,true))||0}else{L-=parseFloat(o.curCSS(H,"border"+this+"Width",true))||0}})}if(H.offsetWidth!==0){I()}else{o.swap(H,G,I)}return Math.max(0,Math.round(L))}return o.curCSS(H,F,J)},curCSS:function(I,F,G){var L,E=I.style;if(F=="opacity"&&!o.support.opacity){L=o.attr(E,"opacity");return L==""?"1":L}if(F.match(/float/i)){F=w}if(!G&&E&&E[F]){L=E[F]}else{if(q.getComputedStyle){if(F.match(/float/i)){F="float"}F=F.replace(/([A-Z])/g,"-$1").toLowerCase();var M=q.getComputedStyle(I,null);if(M){L=M.getPropertyValue(F)}if(F=="opacity"&&L==""){L="1"}}else{if(I.currentStyle){var J=F.replace(/\-(\w)/g,function(N,O){return O.toUpperCase()});L=I.currentStyle[F]||I.currentStyle[J];if(!/^\d+(px)?$/i.test(L)&&/^\d/.test(L)){var H=E.left,K=I.runtimeStyle.left;I.runtimeStyle.left=I.currentStyle.left;E.left=L||0;L=E.pixelLeft+"px";E.left=H;I.runtimeStyle.left=K}}}}return L},clean:function(F,K,I){K=K||document;if(typeof K.createElement==="undefined"){K=K.ownerDocument||K[0]&&K[0].ownerDocument||document}if(!I&&F.length===1&&typeof F[0]==="string"){var H=/^<(\w+)\s*\/?>$/.exec(F[0]);if(H){return[K.createElement(H[1])]}}var G=[],E=[],L=K.createElement("div");o.each(F,function(P,S){if(typeof S==="number"){S+=""}if(!S){return}if(typeof S==="string"){S=S.replace(/(<(\w+)[^>]*?)\/>/g,function(U,V,T){return T.match(/^(abbr|br|col|img|input|link|meta|param|hr|area|embed)$/i)?U:V+"></"+T+">"});var O=S.replace(/^\s+/,"").substring(0,10).toLowerCase();var Q=!O.indexOf("<opt")&&[1,"<select multiple='multiple'>","</select>"]||!O.indexOf("<leg")&&[1,"<fieldset>","</fieldset>"]||O.match(/^<(thead|tbody|tfoot|colg|cap)/)&&[1,"<table>","</table>"]||!O.indexOf("<tr")&&[2,"<table><tbody>","</tbody></table>"]||(!O.indexOf("<td")||!O.indexOf("<th"))&&[3,"<table><tbody><tr>","</tr></tbody></table>"]||!O.indexOf("<col")&&[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"]||!o.support.htmlSerialize&&[1,"div<div>","</div>"]||[0,"",""];L.innerHTML=Q[1]+S+Q[2];while(Q[0]--){L=L.lastChild}if(!o.support.tbody){var R=/<tbody/i.test(S),N=!O.indexOf("<table")&&!R?L.firstChild&&L.firstChild.childNodes:Q[1]=="<table>"&&!R?L.childNodes:[];for(var M=N.length-1;M>=0;--M){if(o.nodeName(N[M],"tbody")&&!N[M].childNodes.length){N[M].parentNode.removeChild(N[M])}}}if(!o.support.leadingWhitespace&&/^\s/.test(S)){L.insertBefore(K.createTextNode(S.match(/^\s*/)[0]),L.firstChild)}S=o.makeArray(L.childNodes)}if(S.nodeType){G.push(S)}else{G=o.merge(G,S)}});if(I){for(var J=0;G[J];J++){if(o.nodeName(G[J],"script")&&(!G[J].type||G[J].type.toLowerCase()==="text/javascript")){E.push(G[J].parentNode?G[J].parentNode.removeChild(G[J]):G[J])}else{if(G[J].nodeType===1){G.splice.apply(G,[J+1,0].concat(o.makeArray(G[J].getElementsByTagName("script"))))}I.appendChild(G[J])}}return E}return G},attr:function(J,G,K){if(!J||J.nodeType==3||J.nodeType==8){return g}var H=!o.isXMLDoc(J),L=K!==g;G=H&&o.props[G]||G;if(J.tagName){var F=/href|src|style/.test(G);if(G=="selected"&&J.parentNode){J.parentNode.selectedIndex}if(G in J&&H&&!F){if(L){if(G=="type"&&o.nodeName(J,"input")&&J.parentNode){throw"type property can't be changed"}J[G]=K}if(o.nodeName(J,"form")&&J.getAttributeNode(G)){return J.getAttributeNode(G).nodeValue}if(G=="tabIndex"){var I=J.getAttributeNode("tabIndex");return I&&I.specified?I.value:J.nodeName.match(/(button|input|object|select|textarea)/i)?0:J.nodeName.match(/^(a|area)$/i)&&J.href?0:g}return J[G]}if(!o.support.style&&H&&G=="style"){return o.attr(J.style,"cssText",K)}if(L){J.setAttribute(G,""+K)}var E=!o.support.hrefNormalized&&H&&F?J.getAttribute(G,2):J.getAttribute(G);return E===null?g:E}if(!o.support.opacity&&G=="opacity"){if(L){J.zoom=1;J.filter=(J.filter||"").replace(/alpha\([^)]*\)/,"")+(parseInt(K)+""=="NaN"?"":"alpha(opacity="+K*100+")")}return J.filter&&J.filter.indexOf("opacity=")>=0?(parseFloat(J.filter.match(/opacity=([^)]*)/)[1])/100)+"":""}G=G.replace(/-([a-z])/ig,function(M,N){return N.toUpperCase()});if(L){J[G]=K}return J[G]},trim:function(E){return(E||"").replace(/^\s+|\s+$/g,"")},makeArray:function(G){var E=[];if(G!=null){var F=G.length;if(F==null||typeof G==="string"||o.isFunction(G)||G.setInterval){E[0]=G}else{while(F){E[--F]=G[F]}}}return E},inArray:function(G,H){for(var E=0,F=H.length;E<F;E++){if(H[E]===G){return E}}return -1},merge:function(H,E){var F=0,G,I=H.length;if(!o.support.getAll){while((G=E[F++])!=null){if(G.nodeType!=8){H[I++]=G}}}else{while((G=E[F++])!=null){H[I++]=G}}return H},unique:function(K){var F=[],E={};try{for(var G=0,H=K.length;G<H;G++){var J=o.data(K[G]);if(!E[J]){E[J]=true;F.push(K[G])}}}catch(I){F=K}return F},grep:function(F,J,E){var G=[];for(var H=0,I=F.length;H<I;H++){if(!E!=!J(F[H],H)){G.push(F[H])}}return G},map:function(E,J){var F=[];for(var G=0,H=E.length;G<H;G++){var I=J(E[G],G);if(I!=null){F[F.length]=I}}return F.concat.apply([],F)}});var C=navigator.userAgent.toLowerCase();o.browser={version:(C.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/)||[0,"0"])[1],safari:/webkit/.test(C),opera:/opera/.test(C),msie:/msie/.test(C)&&!/opera/.test(C),mozilla:/mozilla/.test(C)&&!/(compatible|webkit)/.test(C)};o.each({parent:function(E){return E.parentNode},parents:function(E){return o.dir(E,"parentNode")},next:function(E){return o.nth(E,2,"nextSibling")},prev:function(E){return o.nth(E,2,"previousSibling")},nextAll:function(E){return o.dir(E,"nextSibling")},prevAll:function(E){return o.dir(E,"previousSibling")},siblings:function(E){return o.sibling(E.parentNode.firstChild,E)},children:function(E){return o.sibling(E.firstChild)},contents:function(E){return o.nodeName(E,"iframe")?E.contentDocument||E.contentWindow.document:o.makeArray(E.childNodes)}},function(E,F){o.fn[E]=function(G){var H=o.map(this,F);if(G&&typeof G=="string"){H=o.multiFilter(G,H)}return this.pushStack(o.unique(H),E,G)}});o.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(E,F){o.fn[E]=function(G){var J=[],L=o(G);for(var K=0,H=L.length;K<H;K++){var I=(K>0?this.clone(true):this).get();o.fn[F].apply(o(L[K]),I);J=J.concat(I)}return this.pushStack(J,E,G)}});o.each({removeAttr:function(E){o.attr(this,E,"");if(this.nodeType==1){this.removeAttribute(E)}},addClass:function(E){o.className.add(this,E)},removeClass:function(E){o.className.remove(this,E)},toggleClass:function(F,E){if(typeof E!=="boolean"){E=!o.className.has(this,F)}o.className[E?"add":"remove"](this,F)},remove:function(E){if(!E||o.filter(E,[this]).length){o("*",this).add([this]).each(function(){o.event.remove(this);o.removeData(this)});if(this.parentNode){this.parentNode.removeChild(this)}}},empty:function(){o(this).children().remove();while(this.firstChild){this.removeChild(this.firstChild)}}},function(E,F){o.fn[E]=function(){return this.each(F,arguments)}});function j(E,F){return E[0]&&parseInt(o.curCSS(E[0],F,true),10)||0}var h="jQuery"+e(),v=0,A={};o.extend({cache:{},data:function(F,E,G){F=F==l?A:F;var H=F[h];if(!H){H=F[h]=++v}if(E&&!o.cache[H]){o.cache[H]={}}if(G!==g){o.cache[H][E]=G}return E?o.cache[H][E]:H},removeData:function(F,E){F=F==l?A:F;var H=F[h];if(E){if(o.cache[H]){delete o.cache[H][E];E="";for(E in o.cache[H]){break}if(!E){o.removeData(F)}}}else{try{delete F[h]}catch(G){if(F.removeAttribute){F.removeAttribute(h)}}delete o.cache[H]}},queue:function(F,E,H){if(F){E=(E||"fx")+"queue";var G=o.data(F,E);if(!G||o.isArray(H)){G=o.data(F,E,o.makeArray(H))}else{if(H){G.push(H)}}}return G},dequeue:function(H,G){var E=o.queue(H,G),F=E.shift();if(!G||G==="fx"){F=E[0]}if(F!==g){F.call(H)}}});o.fn.extend({data:function(E,G){var H=E.split(".");H[1]=H[1]?"."+H[1]:"";if(G===g){var F=this.triggerHandler("getData"+H[1]+"!",[H[0]]);if(F===g&&this.length){F=o.data(this[0],E)}return F===g&&H[1]?this.data(H[0]):F}else{return this.trigger("setData"+H[1]+"!",[H[0],G]).each(function(){o.data(this,E,G)})}},removeData:function(E){return this.each(function(){o.removeData(this,E)})},queue:function(E,F){if(typeof E!=="string"){F=E;E="fx"}if(F===g){return o.queue(this[0],E)}return this.each(function(){var G=o.queue(this,E,F);if(E=="fx"&&G.length==1){G[0].call(this)}})},dequeue:function(E){return this.each(function(){o.dequeue(this,E)})}});
/*
 * Sizzle CSS Selector Engine - v0.9.3
 *  Copyright 2009, The Dojo Foundation
 *  Released under the MIT, BSD, and GPL Licenses.
 *  More information: http://sizzlejs.com/
 */
(function(){var R=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?/g,L=0,H=Object.prototype.toString;var F=function(Y,U,ab,ac){ab=ab||[];U=U||document;if(U.nodeType!==1&&U.nodeType!==9){return[]}if(!Y||typeof Y!=="string"){return ab}var Z=[],W,af,ai,T,ad,V,X=true;R.lastIndex=0;while((W=R.exec(Y))!==null){Z.push(W[1]);if(W[2]){V=RegExp.rightContext;break}}if(Z.length>1&&M.exec(Y)){if(Z.length===2&&I.relative[Z[0]]){af=J(Z[0]+Z[1],U)}else{af=I.relative[Z[0]]?[U]:F(Z.shift(),U);while(Z.length){Y=Z.shift();if(I.relative[Y]){Y+=Z.shift()}af=J(Y,af)}}}else{var ae=ac?{expr:Z.pop(),set:E(ac)}:F.find(Z.pop(),Z.length===1&&U.parentNode?U.parentNode:U,Q(U));af=F.filter(ae.expr,ae.set);if(Z.length>0){ai=E(af)}else{X=false}while(Z.length){var ah=Z.pop(),ag=ah;if(!I.relative[ah]){ah=""}else{ag=Z.pop()}if(ag==null){ag=U}I.relative[ah](ai,ag,Q(U))}}if(!ai){ai=af}if(!ai){throw"Syntax error, unrecognized expression: "+(ah||Y)}if(H.call(ai)==="[object Array]"){if(!X){ab.push.apply(ab,ai)}else{if(U.nodeType===1){for(var aa=0;ai[aa]!=null;aa++){if(ai[aa]&&(ai[aa]===true||ai[aa].nodeType===1&&K(U,ai[aa]))){ab.push(af[aa])}}}else{for(var aa=0;ai[aa]!=null;aa++){if(ai[aa]&&ai[aa].nodeType===1){ab.push(af[aa])}}}}}else{E(ai,ab)}if(V){F(V,U,ab,ac);if(G){hasDuplicate=false;ab.sort(G);if(hasDuplicate){for(var aa=1;aa<ab.length;aa++){if(ab[aa]===ab[aa-1]){ab.splice(aa--,1)}}}}}return ab};F.matches=function(T,U){return F(T,null,null,U)};F.find=function(aa,T,ab){var Z,X;if(!aa){return[]}for(var W=0,V=I.order.length;W<V;W++){var Y=I.order[W],X;if((X=I.match[Y].exec(aa))){var U=RegExp.leftContext;if(U.substr(U.length-1)!=="\\"){X[1]=(X[1]||"").replace(/\\/g,"");Z=I.find[Y](X,T,ab);if(Z!=null){aa=aa.replace(I.match[Y],"");break}}}}if(!Z){Z=T.getElementsByTagName("*")}return{set:Z,expr:aa}};F.filter=function(ad,ac,ag,W){var V=ad,ai=[],aa=ac,Y,T,Z=ac&&ac[0]&&Q(ac[0]);while(ad&&ac.length){for(var ab in I.filter){if((Y=I.match[ab].exec(ad))!=null){var U=I.filter[ab],ah,af;T=false;if(aa==ai){ai=[]}if(I.preFilter[ab]){Y=I.preFilter[ab](Y,aa,ag,ai,W,Z);if(!Y){T=ah=true}else{if(Y===true){continue}}}if(Y){for(var X=0;(af=aa[X])!=null;X++){if(af){ah=U(af,Y,X,aa);var ae=W^!!ah;if(ag&&ah!=null){if(ae){T=true}else{aa[X]=false}}else{if(ae){ai.push(af);T=true}}}}}if(ah!==g){if(!ag){aa=ai}ad=ad.replace(I.match[ab],"");if(!T){return[]}break}}}if(ad==V){if(T==null){throw"Syntax error, unrecognized expression: "+ad}else{break}}V=ad}return aa};var I=F.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF_-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF_-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF_-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF_-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*_-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\((even|odd|[\dn+-]*)\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF_-]|\\.)+)(?:\((['"]*)((?:\([^\)]+\)|[^\2\(\)]*)+)\2\))?/},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(T){return T.getAttribute("href")}},relative:{"+":function(aa,T,Z){var X=typeof T==="string",ab=X&&!/\W/.test(T),Y=X&&!ab;if(ab&&!Z){T=T.toUpperCase()}for(var W=0,V=aa.length,U;W<V;W++){if((U=aa[W])){while((U=U.previousSibling)&&U.nodeType!==1){}aa[W]=Y||U&&U.nodeName===T?U||false:U===T}}if(Y){F.filter(T,aa,true)}},">":function(Z,U,aa){var X=typeof U==="string";if(X&&!/\W/.test(U)){U=aa?U:U.toUpperCase();for(var V=0,T=Z.length;V<T;V++){var Y=Z[V];if(Y){var W=Y.parentNode;Z[V]=W.nodeName===U?W:false}}}else{for(var V=0,T=Z.length;V<T;V++){var Y=Z[V];if(Y){Z[V]=X?Y.parentNode:Y.parentNode===U}}if(X){F.filter(U,Z,true)}}},"":function(W,U,Y){var V=L++,T=S;if(!U.match(/\W/)){var X=U=Y?U:U.toUpperCase();T=P}T("parentNode",U,V,W,X,Y)},"~":function(W,U,Y){var V=L++,T=S;if(typeof U==="string"&&!U.match(/\W/)){var X=U=Y?U:U.toUpperCase();T=P}T("previousSibling",U,V,W,X,Y)}},find:{ID:function(U,V,W){if(typeof V.getElementById!=="undefined"&&!W){var T=V.getElementById(U[1]);return T?[T]:[]}},NAME:function(V,Y,Z){if(typeof Y.getElementsByName!=="undefined"){var U=[],X=Y.getElementsByName(V[1]);for(var W=0,T=X.length;W<T;W++){if(X[W].getAttribute("name")===V[1]){U.push(X[W])}}return U.length===0?null:U}},TAG:function(T,U){return U.getElementsByTagName(T[1])}},preFilter:{CLASS:function(W,U,V,T,Z,aa){W=" "+W[1].replace(/\\/g,"")+" ";if(aa){return W}for(var X=0,Y;(Y=U[X])!=null;X++){if(Y){if(Z^(Y.className&&(" "+Y.className+" ").indexOf(W)>=0)){if(!V){T.push(Y)}}else{if(V){U[X]=false}}}}return false},ID:function(T){return T[1].replace(/\\/g,"")},TAG:function(U,T){for(var V=0;T[V]===false;V++){}return T[V]&&Q(T[V])?U[1]:U[1].toUpperCase()},CHILD:function(T){if(T[1]=="nth"){var U=/(-?)(\d*)n((?:\+|-)?\d*)/.exec(T[2]=="even"&&"2n"||T[2]=="odd"&&"2n+1"||!/\D/.test(T[2])&&"0n+"+T[2]||T[2]);T[2]=(U[1]+(U[2]||1))-0;T[3]=U[3]-0}T[0]=L++;return T},ATTR:function(X,U,V,T,Y,Z){var W=X[1].replace(/\\/g,"");if(!Z&&I.attrMap[W]){X[1]=I.attrMap[W]}if(X[2]==="~="){X[4]=" "+X[4]+" "}return X},PSEUDO:function(X,U,V,T,Y){if(X[1]==="not"){if(X[3].match(R).length>1||/^\w/.test(X[3])){X[3]=F(X[3],null,null,U)}else{var W=F.filter(X[3],U,V,true^Y);if(!V){T.push.apply(T,W)}return false}}else{if(I.match.POS.test(X[0])||I.match.CHILD.test(X[0])){return true}}return X},POS:function(T){T.unshift(true);return T}},filters:{enabled:function(T){return T.disabled===false&&T.type!=="hidden"},disabled:function(T){return T.disabled===true},checked:function(T){return T.checked===true},selected:function(T){T.parentNode.selectedIndex;return T.selected===true},parent:function(T){return !!T.firstChild},empty:function(T){return !T.firstChild},has:function(V,U,T){return !!F(T[3],V).length},header:function(T){return/h\d/i.test(T.nodeName)},text:function(T){return"text"===T.type},radio:function(T){return"radio"===T.type},checkbox:function(T){return"checkbox"===T.type},file:function(T){return"file"===T.type},password:function(T){return"password"===T.type},submit:function(T){return"submit"===T.type},image:function(T){return"image"===T.type},reset:function(T){return"reset"===T.type},button:function(T){return"button"===T.type||T.nodeName.toUpperCase()==="BUTTON"},input:function(T){return/input|select|textarea|button/i.test(T.nodeName)}},setFilters:{first:function(U,T){return T===0},last:function(V,U,T,W){return U===W.length-1},even:function(U,T){return T%2===0},odd:function(U,T){return T%2===1},lt:function(V,U,T){return U<T[3]-0},gt:function(V,U,T){return U>T[3]-0},nth:function(V,U,T){return T[3]-0==U},eq:function(V,U,T){return T[3]-0==U}},filter:{PSEUDO:function(Z,V,W,aa){var U=V[1],X=I.filters[U];if(X){return X(Z,W,V,aa)}else{if(U==="contains"){return(Z.textContent||Z.innerText||"").indexOf(V[3])>=0}else{if(U==="not"){var Y=V[3];for(var W=0,T=Y.length;W<T;W++){if(Y[W]===Z){return false}}return true}}}},CHILD:function(T,W){var Z=W[1],U=T;switch(Z){case"only":case"first":while(U=U.previousSibling){if(U.nodeType===1){return false}}if(Z=="first"){return true}U=T;case"last":while(U=U.nextSibling){if(U.nodeType===1){return false}}return true;case"nth":var V=W[2],ac=W[3];if(V==1&&ac==0){return true}var Y=W[0],ab=T.parentNode;if(ab&&(ab.sizcache!==Y||!T.nodeIndex)){var X=0;for(U=ab.firstChild;U;U=U.nextSibling){if(U.nodeType===1){U.nodeIndex=++X}}ab.sizcache=Y}var aa=T.nodeIndex-ac;if(V==0){return aa==0}else{return(aa%V==0&&aa/V>=0)}}},ID:function(U,T){return U.nodeType===1&&U.getAttribute("id")===T},TAG:function(U,T){return(T==="*"&&U.nodeType===1)||U.nodeName===T},CLASS:function(U,T){return(" "+(U.className||U.getAttribute("class"))+" ").indexOf(T)>-1},ATTR:function(Y,W){var V=W[1],T=I.attrHandle[V]?I.attrHandle[V](Y):Y[V]!=null?Y[V]:Y.getAttribute(V),Z=T+"",X=W[2],U=W[4];return T==null?X==="!=":X==="="?Z===U:X==="*="?Z.indexOf(U)>=0:X==="~="?(" "+Z+" ").indexOf(U)>=0:!U?Z&&T!==false:X==="!="?Z!=U:X==="^="?Z.indexOf(U)===0:X==="$="?Z.substr(Z.length-U.length)===U:X==="|="?Z===U||Z.substr(0,U.length+1)===U+"-":false},POS:function(X,U,V,Y){var T=U[2],W=I.setFilters[T];if(W){return W(X,V,U,Y)}}}};var M=I.match.POS;for(var O in I.match){I.match[O]=RegExp(I.match[O].source+/(?![^\[]*\])(?![^\(]*\))/.source)}var E=function(U,T){U=Array.prototype.slice.call(U);if(T){T.push.apply(T,U);return T}return U};try{Array.prototype.slice.call(document.documentElement.childNodes)}catch(N){E=function(X,W){var U=W||[];if(H.call(X)==="[object Array]"){Array.prototype.push.apply(U,X)}else{if(typeof X.length==="number"){for(var V=0,T=X.length;V<T;V++){U.push(X[V])}}else{for(var V=0;X[V];V++){U.push(X[V])}}}return U}}var G;if(document.documentElement.compareDocumentPosition){G=function(U,T){var V=U.compareDocumentPosition(T)&4?-1:U===T?0:1;if(V===0){hasDuplicate=true}return V}}else{if("sourceIndex" in document.documentElement){G=function(U,T){var V=U.sourceIndex-T.sourceIndex;if(V===0){hasDuplicate=true}return V}}else{if(document.createRange){G=function(W,U){var V=W.ownerDocument.createRange(),T=U.ownerDocument.createRange();V.selectNode(W);V.collapse(true);T.selectNode(U);T.collapse(true);var X=V.compareBoundaryPoints(Range.START_TO_END,T);if(X===0){hasDuplicate=true}return X}}}}(function(){var U=document.createElement("form"),V="script"+(new Date).getTime();U.innerHTML="<input name='"+V+"'/>";var T=document.documentElement;T.insertBefore(U,T.firstChild);if(!!document.getElementById(V)){I.find.ID=function(X,Y,Z){if(typeof Y.getElementById!=="undefined"&&!Z){var W=Y.getElementById(X[1]);return W?W.id===X[1]||typeof W.getAttributeNode!=="undefined"&&W.getAttributeNode("id").nodeValue===X[1]?[W]:g:[]}};I.filter.ID=function(Y,W){var X=typeof Y.getAttributeNode!=="undefined"&&Y.getAttributeNode("id");return Y.nodeType===1&&X&&X.nodeValue===W}}T.removeChild(U)})();(function(){var T=document.createElement("div");T.appendChild(document.createComment(""));if(T.getElementsByTagName("*").length>0){I.find.TAG=function(U,Y){var X=Y.getElementsByTagName(U[1]);if(U[1]==="*"){var W=[];for(var V=0;X[V];V++){if(X[V].nodeType===1){W.push(X[V])}}X=W}return X}}T.innerHTML="<a href='#'></a>";if(T.firstChild&&typeof T.firstChild.getAttribute!=="undefined"&&T.firstChild.getAttribute("href")!=="#"){I.attrHandle.href=function(U){return U.getAttribute("href",2)}}})();if(document.querySelectorAll){(function(){var T=F,U=document.createElement("div");U.innerHTML="<p class='TEST'></p>";if(U.querySelectorAll&&U.querySelectorAll(".TEST").length===0){return}F=function(Y,X,V,W){X=X||document;if(!W&&X.nodeType===9&&!Q(X)){try{return E(X.querySelectorAll(Y),V)}catch(Z){}}return T(Y,X,V,W)};F.find=T.find;F.filter=T.filter;F.selectors=T.selectors;F.matches=T.matches})()}if(document.getElementsByClassName&&document.documentElement.getElementsByClassName){(function(){var T=document.createElement("div");T.innerHTML="<div class='test e'></div><div class='test'></div>";if(T.getElementsByClassName("e").length===0){return}T.lastChild.className="e";if(T.getElementsByClassName("e").length===1){return}I.order.splice(1,0,"CLASS");I.find.CLASS=function(U,V,W){if(typeof V.getElementsByClassName!=="undefined"&&!W){return V.getElementsByClassName(U[1])}}})()}function P(U,Z,Y,ad,aa,ac){var ab=U=="previousSibling"&&!ac;for(var W=0,V=ad.length;W<V;W++){var T=ad[W];if(T){if(ab&&T.nodeType===1){T.sizcache=Y;T.sizset=W}T=T[U];var X=false;while(T){if(T.sizcache===Y){X=ad[T.sizset];break}if(T.nodeType===1&&!ac){T.sizcache=Y;T.sizset=W}if(T.nodeName===Z){X=T;break}T=T[U]}ad[W]=X}}}function S(U,Z,Y,ad,aa,ac){var ab=U=="previousSibling"&&!ac;for(var W=0,V=ad.length;W<V;W++){var T=ad[W];if(T){if(ab&&T.nodeType===1){T.sizcache=Y;T.sizset=W}T=T[U];var X=false;while(T){if(T.sizcache===Y){X=ad[T.sizset];break}if(T.nodeType===1){if(!ac){T.sizcache=Y;T.sizset=W}if(typeof Z!=="string"){if(T===Z){X=true;break}}else{if(F.filter(Z,[T]).length>0){X=T;break}}}T=T[U]}ad[W]=X}}}var K=document.compareDocumentPosition?function(U,T){return U.compareDocumentPosition(T)&16}:function(U,T){return U!==T&&(U.contains?U.contains(T):true)};var Q=function(T){return T.nodeType===9&&T.documentElement.nodeName!=="HTML"||!!T.ownerDocument&&Q(T.ownerDocument)};var J=function(T,aa){var W=[],X="",Y,V=aa.nodeType?[aa]:aa;while((Y=I.match.PSEUDO.exec(T))){X+=Y[0];T=T.replace(I.match.PSEUDO,"")}T=I.relative[T]?T+"*":T;for(var Z=0,U=V.length;Z<U;Z++){F(T,V[Z],W)}return F.filter(X,W)};o.find=F;o.filter=F.filter;o.expr=F.selectors;o.expr[":"]=o.expr.filters;F.selectors.filters.hidden=function(T){return T.offsetWidth===0||T.offsetHeight===0};F.selectors.filters.visible=function(T){return T.offsetWidth>0||T.offsetHeight>0};F.selectors.filters.animated=function(T){return o.grep(o.timers,function(U){return T===U.elem}).length};o.multiFilter=function(V,T,U){if(U){V=":not("+V+")"}return F.matches(V,T)};o.dir=function(V,U){var T=[],W=V[U];while(W&&W!=document){if(W.nodeType==1){T.push(W)}W=W[U]}return T};o.nth=function(X,T,V,W){T=T||1;var U=0;for(;X;X=X[V]){if(X.nodeType==1&&++U==T){break}}return X};o.sibling=function(V,U){var T=[];for(;V;V=V.nextSibling){if(V.nodeType==1&&V!=U){T.push(V)}}return T};return;l.Sizzle=F})();o.event={add:function(I,F,H,K){if(I.nodeType==3||I.nodeType==8){return}if(I.setInterval&&I!=l){I=l}if(!H.guid){H.guid=this.guid++}if(K!==g){var G=H;H=this.proxy(G);H.data=K}var E=o.data(I,"events")||o.data(I,"events",{}),J=o.data(I,"handle")||o.data(I,"handle",function(){return typeof o!=="undefined"&&!o.event.triggered?o.event.handle.apply(arguments.callee.elem,arguments):g});J.elem=I;o.each(F.split(/\s+/),function(M,N){var O=N.split(".");N=O.shift();H.type=O.slice().sort().join(".");var L=E[N];if(o.event.specialAll[N]){o.event.specialAll[N].setup.call(I,K,O)}if(!L){L=E[N]={};if(!o.event.special[N]||o.event.special[N].setup.call(I,K,O)===false){if(I.addEventListener){I.addEventListener(N,J,false)}else{if(I.attachEvent){I.attachEvent("on"+N,J)}}}}L[H.guid]=H;o.event.global[N]=true});I=null},guid:1,global:{},remove:function(K,H,J){if(K.nodeType==3||K.nodeType==8){return}var G=o.data(K,"events"),F,E;if(G){if(H===g||(typeof H==="string"&&H.charAt(0)==".")){for(var I in G){this.remove(K,I+(H||""))}}else{if(H.type){J=H.handler;H=H.type}o.each(H.split(/\s+/),function(M,O){var Q=O.split(".");O=Q.shift();var N=RegExp("(^|\\.)"+Q.slice().sort().join(".*\\.")+"(\\.|$)");if(G[O]){if(J){delete G[O][J.guid]}else{for(var P in G[O]){if(N.test(G[O][P].type)){delete G[O][P]}}}if(o.event.specialAll[O]){o.event.specialAll[O].teardown.call(K,Q)}for(F in G[O]){break}if(!F){if(!o.event.special[O]||o.event.special[O].teardown.call(K,Q)===false){if(K.removeEventListener){K.removeEventListener(O,o.data(K,"handle"),false)}else{if(K.detachEvent){K.detachEvent("on"+O,o.data(K,"handle"))}}}F=null;delete G[O]}}})}for(F in G){break}if(!F){var L=o.data(K,"handle");if(L){L.elem=null}o.removeData(K,"events");o.removeData(K,"handle")}}},trigger:function(I,K,H,E){var G=I.type||I;if(!E){I=typeof I==="object"?I[h]?I:o.extend(o.Event(G),I):o.Event(G);if(G.indexOf("!")>=0){I.type=G=G.slice(0,-1);I.exclusive=true}if(!H){I.stopPropagation();if(this.global[G]){o.each(o.cache,function(){if(this.events&&this.events[G]){o.event.trigger(I,K,this.handle.elem)}})}}if(!H||H.nodeType==3||H.nodeType==8){return g}I.result=g;I.target=H;K=o.makeArray(K);K.unshift(I)}I.currentTarget=H;var J=o.data(H,"handle");if(J){J.apply(H,K)}if((!H[G]||(o.nodeName(H,"a")&&G=="click"))&&H["on"+G]&&H["on"+G].apply(H,K)===false){I.result=false}if(!E&&H[G]&&!I.isDefaultPrevented()&&!(o.nodeName(H,"a")&&G=="click")){this.triggered=true;try{H[G]()}catch(L){}}this.triggered=false;if(!I.isPropagationStopped()){var F=H.parentNode||H.ownerDocument;if(F){o.event.trigger(I,K,F,true)}}},handle:function(K){var J,E;K=arguments[0]=o.event.fix(K||l.event);K.currentTarget=this;var L=K.type.split(".");K.type=L.shift();J=!L.length&&!K.exclusive;var I=RegExp("(^|\\.)"+L.slice().sort().join(".*\\.")+"(\\.|$)");E=(o.data(this,"events")||{})[K.type];for(var G in E){var H=E[G];if(J||I.test(H.type)){K.handler=H;K.data=H.data;var F=H.apply(this,arguments);if(F!==g){K.result=F;if(F===false){K.preventDefault();K.stopPropagation()}}if(K.isImmediatePropagationStopped()){break}}}},props:"altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode metaKey newValue originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),fix:function(H){if(H[h]){return H}var F=H;H=o.Event(F);for(var G=this.props.length,J;G;){J=this.props[--G];H[J]=F[J]}if(!H.target){H.target=H.srcElement||document}if(H.target.nodeType==3){H.target=H.target.parentNode}if(!H.relatedTarget&&H.fromElement){H.relatedTarget=H.fromElement==H.target?H.toElement:H.fromElement}if(H.pageX==null&&H.clientX!=null){var I=document.documentElement,E=document.body;H.pageX=H.clientX+(I&&I.scrollLeft||E&&E.scrollLeft||0)-(I.clientLeft||0);H.pageY=H.clientY+(I&&I.scrollTop||E&&E.scrollTop||0)-(I.clientTop||0)}if(!H.which&&((H.charCode||H.charCode===0)?H.charCode:H.keyCode)){H.which=H.charCode||H.keyCode}if(!H.metaKey&&H.ctrlKey){H.metaKey=H.ctrlKey}if(!H.which&&H.button){H.which=(H.button&1?1:(H.button&2?3:(H.button&4?2:0)))}return H},proxy:function(F,E){E=E||function(){return F.apply(this,arguments)};E.guid=F.guid=F.guid||E.guid||this.guid++;return E},special:{ready:{setup:B,teardown:function(){}}},specialAll:{live:{setup:function(E,F){o.event.add(this,F[0],c)},teardown:function(G){if(G.length){var E=0,F=RegExp("(^|\\.)"+G[0]+"(\\.|$)");o.each((o.data(this,"events").live||{}),function(){if(F.test(this.type)){E++}});if(E<1){o.event.remove(this,G[0],c)}}}}}};o.Event=function(E){if(!this.preventDefault){return new o.Event(E)}if(E&&E.type){this.originalEvent=E;this.type=E.type}else{this.type=E}this.timeStamp=e();this[h]=true};function k(){return false}function u(){return true}o.Event.prototype={preventDefault:function(){this.isDefaultPrevented=u;var E=this.originalEvent;if(!E){return}if(E.preventDefault){E.preventDefault()}E.returnValue=false},stopPropagation:function(){this.isPropagationStopped=u;var E=this.originalEvent;if(!E){return}if(E.stopPropagation){E.stopPropagation()}E.cancelBubble=true},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=u;this.stopPropagation()},isDefaultPrevented:k,isPropagationStopped:k,isImmediatePropagationStopped:k};var a=function(F){var E=F.relatedTarget;while(E&&E!=this){try{E=E.parentNode}catch(G){E=this}}if(E!=this){F.type=F.data;o.event.handle.apply(this,arguments)}};o.each({mouseover:"mouseenter",mouseout:"mouseleave"},function(F,E){o.event.special[E]={setup:function(){o.event.add(this,F,a,E)},teardown:function(){o.event.remove(this,F,a)}}});o.fn.extend({bind:function(F,G,E){return F=="unload"?this.one(F,G,E):this.each(function(){o.event.add(this,F,E||G,E&&G)})},one:function(G,H,F){var E=o.event.proxy(F||H,function(I){o(this).unbind(I,E);return(F||H).apply(this,arguments)});return this.each(function(){o.event.add(this,G,E,F&&H)})},unbind:function(F,E){return this.each(function(){o.event.remove(this,F,E)})},trigger:function(E,F){return this.each(function(){o.event.trigger(E,F,this)})},triggerHandler:function(E,G){if(this[0]){var F=o.Event(E);F.preventDefault();F.stopPropagation();o.event.trigger(F,G,this[0]);return F.result}},toggle:function(G){var E=arguments,F=1;while(F<E.length){o.event.proxy(G,E[F++])}return this.click(o.event.proxy(G,function(H){this.lastToggle=(this.lastToggle||0)%F;H.preventDefault();return E[this.lastToggle++].apply(this,arguments)||false}))},hover:function(E,F){return this.mouseenter(E).mouseleave(F)},ready:function(E){B();if(o.isReady){E.call(document,o)}else{o.readyList.push(E)}return this},live:function(G,F){var E=o.event.proxy(F);E.guid+=this.selector+G;o(document).bind(i(G,this.selector),this.selector,E);return this},die:function(F,E){o(document).unbind(i(F,this.selector),E?{guid:E.guid+this.selector+F}:null);return this}});function c(H){var E=RegExp("(^|\\.)"+H.type+"(\\.|$)"),G=true,F=[];o.each(o.data(this,"events").live||[],function(I,J){if(E.test(J.type)){var K=o(H.target).closest(J.data)[0];if(K){F.push({elem:K,fn:J})}}});F.sort(function(J,I){return o.data(J.elem,"closest")-o.data(I.elem,"closest")});o.each(F,function(){if(this.fn.call(this.elem,H,this.fn.data)===false){return(G=false)}});return G}function i(F,E){return["live",F,E.replace(/\./g,"`").replace(/ /g,"|")].join(".")}o.extend({isReady:false,readyList:[],ready:function(){if(!o.isReady){o.isReady=true;if(o.readyList){o.each(o.readyList,function(){this.call(document,o)});o.readyList=null}o(document).triggerHandler("ready")}}});var x=false;function B(){if(x){return}x=true;if(document.addEventListener){document.addEventListener("DOMContentLoaded",function(){document.removeEventListener("DOMContentLoaded",arguments.callee,false);o.ready()},false)}else{if(document.attachEvent){document.attachEvent("onreadystatechange",function(){if(document.readyState==="complete"){document.detachEvent("onreadystatechange",arguments.callee);o.ready()}});if(document.documentElement.doScroll&&l==l.top){(function(){if(o.isReady){return}try{document.documentElement.doScroll("left")}catch(E){setTimeout(arguments.callee,0);return}o.ready()})()}}}o.event.add(l,"load",o.ready)}o.each(("blur,focus,load,resize,scroll,unload,click,dblclick,mousedown,mouseup,mousemove,mouseover,mouseout,mouseenter,mouseleave,change,select,submit,keydown,keypress,keyup,error").split(","),function(F,E){o.fn[E]=function(G){return G?this.bind(E,G):this.trigger(E)}});o(l).bind("unload",function(){for(var E in o.cache){if(E!=1&&o.cache[E].handle){o.event.remove(o.cache[E].handle.elem)}}});(function(){o.support={};var F=document.documentElement,G=document.createElement("script"),K=document.createElement("div"),J="script"+(new Date).getTime();K.style.display="none";K.innerHTML='   <link/><table></table><a href="/a" style="color:red;float:left;opacity:.5;">a</a><select><option>text</option></select><object><param/></object>';var H=K.getElementsByTagName("*"),E=K.getElementsByTagName("a")[0];if(!H||!H.length||!E){return}o.support={leadingWhitespace:K.firstChild.nodeType==3,tbody:!K.getElementsByTagName("tbody").length,objectAll:!!K.getElementsByTagName("object")[0].getElementsByTagName("*").length,htmlSerialize:!!K.getElementsByTagName("link").length,style:/red/.test(E.getAttribute("style")),hrefNormalized:E.getAttribute("href")==="/a",opacity:E.style.opacity==="0.5",cssFloat:!!E.style.cssFloat,scriptEval:false,noCloneEvent:true,boxModel:null};G.type="text/javascript";try{G.appendChild(document.createTextNode("window."+J+"=1;"))}catch(I){}F.insertBefore(G,F.firstChild);if(l[J]){o.support.scriptEval=true;delete l[J]}F.removeChild(G);if(K.attachEvent&&K.fireEvent){K.attachEvent("onclick",function(){o.support.noCloneEvent=false;K.detachEvent("onclick",arguments.callee)});K.cloneNode(true).fireEvent("onclick")}o(function(){var L=document.createElement("div");L.style.width=L.style.paddingLeft="1px";document.body.appendChild(L);o.boxModel=o.support.boxModel=L.offsetWidth===2;document.body.removeChild(L).style.display="none"})})();var w=o.support.cssFloat?"cssFloat":"styleFloat";o.props={"for":"htmlFor","class":"className","float":w,cssFloat:w,styleFloat:w,readonly:"readOnly",maxlength:"maxLength",cellspacing:"cellSpacing",rowspan:"rowSpan",tabindex:"tabIndex"};o.fn.extend({_load:o.fn.load,load:function(G,J,K){if(typeof G!=="string"){return this._load(G)}var I=G.indexOf(" ");if(I>=0){var E=G.slice(I,G.length);G=G.slice(0,I)}var H="GET";if(J){if(o.isFunction(J)){K=J;J=null}else{if(typeof J==="object"){J=o.param(J);H="POST"}}}var F=this;o.ajax({url:G,type:H,dataType:"html",data:J,complete:function(M,L){if(L=="success"||L=="notmodified"){F.html(E?o("<div/>").append(M.responseText.replace(/<script(.|\s)*?\/script>/g,"")).find(E):M.responseText)}if(K){F.each(K,[M.responseText,L,M])}}});return this},serialize:function(){return o.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?o.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||/select|textarea/i.test(this.nodeName)||/text|hidden|password|search/i.test(this.type))}).map(function(E,F){var G=o(this).val();return G==null?null:o.isArray(G)?o.map(G,function(I,H){return{name:F.name,value:I}}):{name:F.name,value:G}}).get()}});o.each("ajaxStart,ajaxStop,ajaxComplete,ajaxError,ajaxSuccess,ajaxSend".split(","),function(E,F){o.fn[F]=function(G){return this.bind(F,G)}});var r=e();o.extend({get:function(E,G,H,F){if(o.isFunction(G)){H=G;G=null}return o.ajax({type:"GET",url:E,data:G,success:H,dataType:F})},getScript:function(E,F){return o.get(E,null,F,"script")},getJSON:function(E,F,G){return o.get(E,F,G,"json")},post:function(E,G,H,F){if(o.isFunction(G)){H=G;G={}}return o.ajax({type:"POST",url:E,data:G,success:H,dataType:F})},ajaxSetup:function(E){o.extend(o.ajaxSettings,E)},ajaxSettings:{url:location.href,global:true,type:"GET",contentType:"application/x-www-form-urlencoded",processData:true,async:true,xhr:function(){return l.ActiveXObject?new ActiveXObject("Microsoft.XMLHTTP"):new XMLHttpRequest()},accepts:{xml:"application/xml, text/xml",html:"text/html",script:"text/javascript, application/javascript",json:"application/json, text/javascript",text:"text/plain",_default:"*/*"}},lastModified:{},ajax:function(M){M=o.extend(true,M,o.extend(true,{},o.ajaxSettings,M));var W,F=/=\?(&|$)/g,R,V,G=M.type.toUpperCase();if(M.data&&M.processData&&typeof M.data!=="string"){M.data=o.param(M.data)}if(M.dataType=="jsonp"){if(G=="GET"){if(!M.url.match(F)){M.url+=(M.url.match(/\?/)?"&":"?")+(M.jsonp||"callback")+"=?"}}else{if(!M.data||!M.data.match(F)){M.data=(M.data?M.data+"&":"")+(M.jsonp||"callback")+"=?"}}M.dataType="json"}if(M.dataType=="json"&&(M.data&&M.data.match(F)||M.url.match(F))){W="jsonp"+r++;if(M.data){M.data=(M.data+"").replace(F,"="+W+"$1")}M.url=M.url.replace(F,"="+W+"$1");M.dataType="script";l[W]=function(X){V=X;I();L();l[W]=g;try{delete l[W]}catch(Y){}if(H){H.removeChild(T)}}}if(M.dataType=="script"&&M.cache==null){M.cache=false}if(M.cache===false&&G=="GET"){var E=e();var U=M.url.replace(/(\?|&)_=.*?(&|$)/,"$1_="+E+"$2");M.url=U+((U==M.url)?(M.url.match(/\?/)?"&":"?")+"_="+E:"")}if(M.data&&G=="GET"){M.url+=(M.url.match(/\?/)?"&":"?")+M.data;M.data=null}if(M.global&&!o.active++){o.event.trigger("ajaxStart")}var Q=/^(\w+:)?\/\/([^\/?#]+)/.exec(M.url);if(M.dataType=="script"&&G=="GET"&&Q&&(Q[1]&&Q[1]!=location.protocol||Q[2]!=location.host)){var H=document.getElementsByTagName("head")[0];var T=document.createElement("script");T.src=M.url;if(M.scriptCharset){T.charset=M.scriptCharset}if(!W){var O=false;T.onload=T.onreadystatechange=function(){if(!O&&(!this.readyState||this.readyState=="loaded"||this.readyState=="complete")){O=true;I();L();T.onload=T.onreadystatechange=null;H.removeChild(T)}}}H.appendChild(T);return g}var K=false;var J=M.xhr();if(M.username){J.open(G,M.url,M.async,M.username,M.password)}else{J.open(G,M.url,M.async)}try{if(M.data){J.setRequestHeader("Content-Type",M.contentType)}if(M.ifModified){J.setRequestHeader("If-Modified-Since",o.lastModified[M.url]||"Thu, 01 Jan 1970 00:00:00 GMT")}J.setRequestHeader("X-Requested-With","XMLHttpRequest");J.setRequestHeader("Accept",M.dataType&&M.accepts[M.dataType]?M.accepts[M.dataType]+", */*":M.accepts._default)}catch(S){}if(M.beforeSend&&M.beforeSend(J,M)===false){if(M.global&&!--o.active){o.event.trigger("ajaxStop")}J.abort();return false}if(M.global){o.event.trigger("ajaxSend",[J,M])}var N=function(X){if(J.readyState==0){if(P){clearInterval(P);P=null;if(M.global&&!--o.active){o.event.trigger("ajaxStop")}}}else{if(!K&&J&&(J.readyState==4||X=="timeout")){K=true;if(P){clearInterval(P);P=null}R=X=="timeout"?"timeout":!o.httpSuccess(J)?"error":M.ifModified&&o.httpNotModified(J,M.url)?"notmodified":"success";if(R=="success"){try{V=o.httpData(J,M.dataType,M)}catch(Z){R="parsererror"}}if(R=="success"){var Y;try{Y=J.getResponseHeader("Last-Modified")}catch(Z){}if(M.ifModified&&Y){o.lastModified[M.url]=Y}if(!W){I()}}else{o.handleError(M,J,R)}L();if(X){J.abort()}if(M.async){J=null}}}};if(M.async){var P=setInterval(N,13);if(M.timeout>0){setTimeout(function(){if(J&&!K){N("timeout")}},M.timeout)}}try{J.send(M.data)}catch(S){o.handleError(M,J,null,S)}if(!M.async){N()}function I(){if(M.success){M.success(V,R)}if(M.global){o.event.trigger("ajaxSuccess",[J,M])}}function L(){if(M.complete){M.complete(J,R)}if(M.global){o.event.trigger("ajaxComplete",[J,M])}if(M.global&&!--o.active){o.event.trigger("ajaxStop")}}return J},handleError:function(F,H,E,G){if(F.error){F.error(H,E,G)}if(F.global){o.event.trigger("ajaxError",[H,F,G])}},active:0,httpSuccess:function(F){try{return !F.status&&location.protocol=="file:"||(F.status>=200&&F.status<300)||F.status==304||F.status==1223}catch(E){}return false},httpNotModified:function(G,E){try{var H=G.getResponseHeader("Last-Modified");return G.status==304||H==o.lastModified[E]}catch(F){}return false},httpData:function(J,H,G){var F=J.getResponseHeader("content-type"),E=H=="xml"||!H&&F&&F.indexOf("xml")>=0,I=E?J.responseXML:J.responseText;if(E&&I.documentElement.tagName=="parsererror"){throw"parsererror"}if(G&&G.dataFilter){I=G.dataFilter(I,H)}if(typeof I==="string"){if(H=="script"){o.globalEval(I)}if(H=="json"){I=l["eval"]("("+I+")")}}return I},param:function(E){var G=[];function H(I,J){G[G.length]=encodeURIComponent(I)+"="+encodeURIComponent(J)}if(o.isArray(E)||E.jquery){o.each(E,function(){H(this.name,this.value)})}else{for(var F in E){if(o.isArray(E[F])){o.each(E[F],function(){H(F,this)})}else{H(F,o.isFunction(E[F])?E[F]():E[F])}}}return G.join("&").replace(/%20/g,"+")}});var m={},n,d=[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]];function t(F,E){var G={};o.each(d.concat.apply([],d.slice(0,E)),function(){G[this]=F});return G}o.fn.extend({show:function(J,L){if(J){return this.animate(t("show",3),J,L)}else{for(var H=0,F=this.length;H<F;H++){var E=o.data(this[H],"olddisplay");this[H].style.display=E||"";if(o.css(this[H],"display")==="none"){var G=this[H].tagName,K;if(m[G]){K=m[G]}else{var I=o("<"+G+" />").appendTo("body");K=I.css("display");if(K==="none"){K="block"}I.remove();m[G]=K}o.data(this[H],"olddisplay",K)}}for(var H=0,F=this.length;H<F;H++){this[H].style.display=o.data(this[H],"olddisplay")||""}return this}},hide:function(H,I){if(H){return this.animate(t("hide",3),H,I)}else{for(var G=0,F=this.length;G<F;G++){var E=o.data(this[G],"olddisplay");if(!E&&E!=="none"){o.data(this[G],"olddisplay",o.css(this[G],"display"))}}for(var G=0,F=this.length;G<F;G++){this[G].style.display="none"}return this}},_toggle:o.fn.toggle,toggle:function(G,F){var E=typeof G==="boolean";return o.isFunction(G)&&o.isFunction(F)?this._toggle.apply(this,arguments):G==null||E?this.each(function(){var H=E?G:o(this).is(":hidden");o(this)[H?"show":"hide"]()}):this.animate(t("toggle",3),G,F)},fadeTo:function(E,G,F){return this.animate({opacity:G},E,F)},animate:function(I,F,H,G){var E=o.speed(F,H,G);return this[E.queue===false?"each":"queue"](function(){var K=o.extend({},E),M,L=this.nodeType==1&&o(this).is(":hidden"),J=this;for(M in I){if(I[M]=="hide"&&L||I[M]=="show"&&!L){return K.complete.call(this)}if((M=="height"||M=="width")&&this.style){K.display=o.css(this,"display");K.overflow=this.style.overflow}}if(K.overflow!=null){this.style.overflow="hidden"}K.curAnim=o.extend({},I);o.each(I,function(O,S){var R=new o.fx(J,K,O);if(/toggle|show|hide/.test(S)){R[S=="toggle"?L?"show":"hide":S](I)}else{var Q=S.toString().match(/^([+-]=)?([\d+-.]+)(.*)$/),T=R.cur(true)||0;if(Q){var N=parseFloat(Q[2]),P=Q[3]||"px";if(P!="px"){J.style[O]=(N||1)+P;T=((N||1)/R.cur(true))*T;J.style[O]=T+P}if(Q[1]){N=((Q[1]=="-="?-1:1)*N)+T}R.custom(T,N,P)}else{R.custom(T,S,"")}}});return true})},stop:function(F,E){var G=o.timers;if(F){this.queue([])}this.each(function(){for(var H=G.length-1;H>=0;H--){if(G[H].elem==this){if(E){G[H](true)}G.splice(H,1)}}});if(!E){this.dequeue()}return this}});o.each({slideDown:t("show",1),slideUp:t("hide",1),slideToggle:t("toggle",1),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"}},function(E,F){o.fn[E]=function(G,H){return this.animate(F,G,H)}});o.extend({speed:function(G,H,F){var E=typeof G==="object"?G:{complete:F||!F&&H||o.isFunction(G)&&G,duration:G,easing:F&&H||H&&!o.isFunction(H)&&H};E.duration=o.fx.off?0:typeof E.duration==="number"?E.duration:o.fx.speeds[E.duration]||o.fx.speeds._default;E.old=E.complete;E.complete=function(){if(E.queue!==false){o(this).dequeue()}if(o.isFunction(E.old)){E.old.call(this)}};return E},easing:{linear:function(G,H,E,F){return E+F*G},swing:function(G,H,E,F){return((-Math.cos(G*Math.PI)/2)+0.5)*F+E}},timers:[],fx:function(F,E,G){this.options=E;this.elem=F;this.prop=G;if(!E.orig){E.orig={}}}});o.fx.prototype={update:function(){if(this.options.step){this.options.step.call(this.elem,this.now,this)}(o.fx.step[this.prop]||o.fx.step._default)(this);if((this.prop=="height"||this.prop=="width")&&this.elem.style){this.elem.style.display="block"}},cur:function(F){if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==null)){return this.elem[this.prop]}var E=parseFloat(o.css(this.elem,this.prop,F));return E&&E>-10000?E:parseFloat(o.curCSS(this.elem,this.prop))||0},custom:function(I,H,G){this.startTime=e();this.start=I;this.end=H;this.unit=G||this.unit||"px";this.now=this.start;this.pos=this.state=0;var E=this;function F(J){return E.step(J)}F.elem=this.elem;if(F()&&o.timers.push(F)&&!n){n=setInterval(function(){var K=o.timers;for(var J=0;J<K.length;J++){if(!K[J]()){K.splice(J--,1)}}if(!K.length){clearInterval(n);n=g}},13)}},show:function(){this.options.orig[this.prop]=o.attr(this.elem.style,this.prop);this.options.show=true;this.custom(this.prop=="width"||this.prop=="height"?1:0,this.cur());o(this.elem).show()},hide:function(){this.options.orig[this.prop]=o.attr(this.elem.style,this.prop);this.options.hide=true;this.custom(this.cur(),0)},step:function(H){var G=e();if(H||G>=this.options.duration+this.startTime){this.now=this.end;this.pos=this.state=1;this.update();this.options.curAnim[this.prop]=true;var E=true;for(var F in this.options.curAnim){if(this.options.curAnim[F]!==true){E=false}}if(E){if(this.options.display!=null){this.elem.style.overflow=this.options.overflow;this.elem.style.display=this.options.display;if(o.css(this.elem,"display")=="none"){this.elem.style.display="block"}}if(this.options.hide){o(this.elem).hide()}if(this.options.hide||this.options.show){for(var I in this.options.curAnim){o.attr(this.elem.style,I,this.options.orig[I])}}this.options.complete.call(this.elem)}return false}else{var J=G-this.startTime;this.state=J/this.options.duration;this.pos=o.easing[this.options.easing||(o.easing.swing?"swing":"linear")](this.state,J,0,1,this.options.duration);this.now=this.start+((this.end-this.start)*this.pos);this.update()}return true}};o.extend(o.fx,{speeds:{slow:600,fast:200,_default:400},step:{opacity:function(E){o.attr(E.elem.style,"opacity",E.now)},_default:function(E){if(E.elem.style&&E.elem.style[E.prop]!=null){E.elem.style[E.prop]=E.now+E.unit}else{E.elem[E.prop]=E.now}}}});if(document.documentElement.getBoundingClientRect){o.fn.offset=function(){if(!this[0]){return{top:0,left:0}}if(this[0]===this[0].ownerDocument.body){return o.offset.bodyOffset(this[0])}var G=this[0].getBoundingClientRect(),J=this[0].ownerDocument,F=J.body,E=J.documentElement,L=E.clientTop||F.clientTop||0,K=E.clientLeft||F.clientLeft||0,I=G.top+(self.pageYOffset||o.boxModel&&E.scrollTop||F.scrollTop)-L,H=G.left+(self.pageXOffset||o.boxModel&&E.scrollLeft||F.scrollLeft)-K;return{top:I,left:H}}}else{o.fn.offset=function(){if(!this[0]){return{top:0,left:0}}if(this[0]===this[0].ownerDocument.body){return o.offset.bodyOffset(this[0])}o.offset.initialized||o.offset.initialize();var J=this[0],G=J.offsetParent,F=J,O=J.ownerDocument,M,H=O.documentElement,K=O.body,L=O.defaultView,E=L.getComputedStyle(J,null),N=J.offsetTop,I=J.offsetLeft;while((J=J.parentNode)&&J!==K&&J!==H){M=L.getComputedStyle(J,null);N-=J.scrollTop,I-=J.scrollLeft;if(J===G){N+=J.offsetTop,I+=J.offsetLeft;if(o.offset.doesNotAddBorder&&!(o.offset.doesAddBorderForTableAndCells&&/^t(able|d|h)$/i.test(J.tagName))){N+=parseInt(M.borderTopWidth,10)||0,I+=parseInt(M.borderLeftWidth,10)||0}F=G,G=J.offsetParent}if(o.offset.subtractsBorderForOverflowNotVisible&&M.overflow!=="visible"){N+=parseInt(M.borderTopWidth,10)||0,I+=parseInt(M.borderLeftWidth,10)||0}E=M}if(E.position==="relative"||E.position==="static"){N+=K.offsetTop,I+=K.offsetLeft}if(E.position==="fixed"){N+=Math.max(H.scrollTop,K.scrollTop),I+=Math.max(H.scrollLeft,K.scrollLeft)}return{top:N,left:I}}}o.offset={initialize:function(){if(this.initialized){return}var L=document.body,F=document.createElement("div"),H,G,N,I,M,E,J=L.style.marginTop,K='<div style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;"><div></div></div><table style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;" cellpadding="0" cellspacing="0"><tr><td></td></tr></table>';M={position:"absolute",top:0,left:0,margin:0,border:0,width:"1px",height:"1px",visibility:"hidden"};for(E in M){F.style[E]=M[E]}F.innerHTML=K;L.insertBefore(F,L.firstChild);H=F.firstChild,G=H.firstChild,I=H.nextSibling.firstChild.firstChild;this.doesNotAddBorder=(G.offsetTop!==5);this.doesAddBorderForTableAndCells=(I.offsetTop===5);H.style.overflow="hidden",H.style.position="relative";this.subtractsBorderForOverflowNotVisible=(G.offsetTop===-5);L.style.marginTop="1px";this.doesNotIncludeMarginInBodyOffset=(L.offsetTop===0);L.style.marginTop=J;L.removeChild(F);this.initialized=true},bodyOffset:function(E){o.offset.initialized||o.offset.initialize();var G=E.offsetTop,F=E.offsetLeft;if(o.offset.doesNotIncludeMarginInBodyOffset){G+=parseInt(o.curCSS(E,"marginTop",true),10)||0,F+=parseInt(o.curCSS(E,"marginLeft",true),10)||0}return{top:G,left:F}}};o.fn.extend({position:function(){var I=0,H=0,F;if(this[0]){var G=this.offsetParent(),J=this.offset(),E=/^body|html$/i.test(G[0].tagName)?{top:0,left:0}:G.offset();J.top-=j(this,"marginTop");J.left-=j(this,"marginLeft");E.top+=j(G,"borderTopWidth");E.left+=j(G,"borderLeftWidth");F={top:J.top-E.top,left:J.left-E.left}}return F},offsetParent:function(){var E=this[0].offsetParent||document.body;while(E&&(!/^body|html$/i.test(E.tagName)&&o.css(E,"position")=="static")){E=E.offsetParent}return o(E)}});o.each(["Left","Top"],function(F,E){var G="scroll"+E;o.fn[G]=function(H){if(!this[0]){return null}return H!==g?this.each(function(){this==l||this==document?l.scrollTo(!F?H:o(l).scrollLeft(),F?H:o(l).scrollTop()):this[G]=H}):this[0]==l||this[0]==document?self[F?"pageYOffset":"pageXOffset"]||o.boxModel&&document.documentElement[G]||document.body[G]:this[0][G]}});o.each(["Height","Width"],function(I,G){var E=I?"Left":"Top",H=I?"Right":"Bottom",F=G.toLowerCase();o.fn["inner"+G]=function(){return this[0]?o.css(this[0],F,false,"padding"):null};o.fn["outer"+G]=function(K){return this[0]?o.css(this[0],F,false,K?"margin":"border"):null};var J=G.toLowerCase();o.fn[J]=function(K){return this[0]==l?document.compatMode=="CSS1Compat"&&document.documentElement["client"+G]||document.body["client"+G]:this[0]==document?Math.max(document.documentElement["client"+G],document.body["scroll"+G],document.documentElement["scroll"+G],document.body["offset"+G],document.documentElement["offset"+G]):K===g?(this.length?o.css(this[0],J):null):this.css(J,typeof K==="string"?K:K+"px")}})})();;
// $Id: drupal.js,v 1.41.2.4 2009/07/21 08:59:10 goba Exp $

var Drupal = Drupal || { 'settings': {}, 'behaviors': {}, 'themes': {}, 'locale': {} };

/**
 * Set the variable that indicates if JavaScript behaviors should be applied
 */
Drupal.jsEnabled = true;

/**
 * Attach all registered behaviors to a page element.
 *
 * Behaviors are event-triggered actions that attach to page elements, enhancing
 * default non-Javascript UIs. Behaviors are registered in the Drupal.behaviors
 * object as follows:
 * @code
 *    Drupal.behaviors.behaviorName = function () {
 *      ...
 *    };
 * @endcode
 *
 * Drupal.attachBehaviors is added below to the jQuery ready event and so
 * runs on initial page load. Developers implementing AHAH/AJAX in their
 * solutions should also call this function after new page content has been
 * loaded, feeding in an element to be processed, in order to attach all
 * behaviors to the new content.
 *
 * Behaviors should use a class in the form behaviorName-processed to ensure
 * the behavior is attached only once to a given element. (Doing so enables
 * the reprocessing of given elements, which may be needed on occasion despite
 * the ability to limit behavior attachment to a particular element.)
 *
 * @param context
 *   An element to attach behaviors to. If none is given, the document element
 *   is used.
 */
Drupal.attachBehaviors = function(context) {
  context = context || document;
  // Execute all of them.
  jQuery.each(Drupal.behaviors, function() {
    this(context);
  });
};

/**
 * Encode special characters in a plain-text string for display as HTML.
 */
Drupal.checkPlain = function(str) {
  str = String(str);
  var replace = { '&': '&amp;', '"': '&quot;', '<': '&lt;', '>': '&gt;' };
  for (var character in replace) {
    var regex = new RegExp(character, 'g');
    str = str.replace(regex, replace[character]);
  }
  return str;
};

/**
 * Translate strings to the page language or a given language.
 *
 * See the documentation of the server-side t() function for further details.
 *
 * @param str
 *   A string containing the English string to translate.
 * @param args
 *   An object of replacements pairs to make after translation. Incidences
 *   of any key in this array are replaced with the corresponding value.
 *   Based on the first character of the key, the value is escaped and/or themed:
 *    - !variable: inserted as is
 *    - @variable: escape plain text to HTML (Drupal.checkPlain)
 *    - %variable: escape text and theme as a placeholder for user-submitted
 *      content (checkPlain + Drupal.theme('placeholder'))
 * @return
 *   The translated string.
 */
Drupal.t = function(str, args) {
  // Fetch the localized version of the string.
  if (Drupal.locale.strings && Drupal.locale.strings[str]) {
    str = Drupal.locale.strings[str];
  }

  if (args) {
    // Transform arguments before inserting them
    for (var key in args) {
      switch (key.charAt(0)) {
        // Escaped only
        case '@':
          args[key] = Drupal.checkPlain(args[key]);
        break;
        // Pass-through
        case '!':
          break;
        // Escaped and placeholder
        case '%':
        default:
          args[key] = Drupal.theme('placeholder', args[key]);
          break;
      }
      str = str.replace(key, args[key]);
    }
  }
  return str;
};

/**
 * Format a string containing a count of items.
 *
 * This function ensures that the string is pluralized correctly. Since Drupal.t() is
 * called by this function, make sure not to pass already-localized strings to it.
 *
 * See the documentation of the server-side format_plural() function for further details.
 *
 * @param count
 *   The item count to display.
 * @param singular
 *   The string for the singular case. Please make sure it is clear this is
 *   singular, to ease translation (e.g. use "1 new comment" instead of "1 new").
 *   Do not use @count in the singular string.
 * @param plural
 *   The string for the plural case. Please make sure it is clear this is plural,
 *   to ease translation. Use @count in place of the item count, as in "@count
 *   new comments".
 * @param args
 *   An object of replacements pairs to make after translation. Incidences
 *   of any key in this array are replaced with the corresponding value.
 *   Based on the first character of the key, the value is escaped and/or themed:
 *    - !variable: inserted as is
 *    - @variable: escape plain text to HTML (Drupal.checkPlain)
 *    - %variable: escape text and theme as a placeholder for user-submitted
 *      content (checkPlain + Drupal.theme('placeholder'))
 *   Note that you do not need to include @count in this array.
 *   This replacement is done automatically for the plural case.
 * @return
 *   A translated string.
 */
Drupal.formatPlural = function(count, singular, plural, args) {
  var args = args || {};
  args['@count'] = count;
  // Determine the index of the plural form.
  var index = Drupal.locale.pluralFormula ? Drupal.locale.pluralFormula(args['@count']) : ((args['@count'] == 1) ? 0 : 1);

  if (index == 0) {
    return Drupal.t(singular, args);
  }
  else if (index == 1) {
    return Drupal.t(plural, args);
  }
  else {
    args['@count['+ index +']'] = args['@count'];
    delete args['@count'];
    return Drupal.t(plural.replace('@count', '@count['+ index +']'));
  }
};

/**
 * Generate the themed representation of a Drupal object.
 *
 * All requests for themed output must go through this function. It examines
 * the request and routes it to the appropriate theme function. If the current
 * theme does not provide an override function, the generic theme function is
 * called.
 *
 * For example, to retrieve the HTML that is output by theme_placeholder(text),
 * call Drupal.theme('placeholder', text).
 *
 * @param func
 *   The name of the theme function to call.
 * @param ...
 *   Additional arguments to pass along to the theme function.
 * @return
 *   Any data the theme function returns. This could be a plain HTML string,
 *   but also a complex object.
 */
Drupal.theme = function(func) {
  for (var i = 1, args = []; i < arguments.length; i++) {
    args.push(arguments[i]);
  }

  return (Drupal.theme[func] || Drupal.theme.prototype[func]).apply(this, args);
};

/**
 * Parse a JSON response.
 *
 * The result is either the JSON object, or an object with 'status' 0 and 'data' an error message.
 */
Drupal.parseJson = function (data) {
  if ((data.substring(0, 1) != '{') && (data.substring(0, 1) != '[')) {
    return { status: 0, data: data.length ? data : Drupal.t('Unspecified error') };
  }
  return eval('(' + data + ');');
};

/**
 * Freeze the current body height (as minimum height). Used to prevent
 * unnecessary upwards scrolling when doing DOM manipulations.
 */
Drupal.freezeHeight = function () {
  Drupal.unfreezeHeight();
  var div = document.createElement('div');
  $(div).css({
    position: 'absolute',
    top: '0px',
    left: '0px',
    width: '1px',
    height: $('body').css('height')
  }).attr('id', 'freeze-height');
  $('body').append(div);
};

/**
 * Unfreeze the body height
 */
Drupal.unfreezeHeight = function () {
  $('#freeze-height').remove();
};

/**
 * Wrapper around encodeURIComponent() which avoids Apache quirks (equivalent of
 * drupal_urlencode() in PHP). This function should only be used on paths, not
 * on query string arguments.
 */
Drupal.encodeURIComponent = function (item, uri) {
  uri = uri || location.href;
  item = encodeURIComponent(item).replace(/%2F/g, '/');
  return (uri.indexOf('?q=') != -1) ? item : item.replace(/%26/g, '%2526').replace(/%23/g, '%2523').replace(/\/\//g, '/%252F');
};

/**
 * Get the text selection in a textarea.
 */
Drupal.getSelection = function (element) {
  if (typeof(element.selectionStart) != 'number' && document.selection) {
    // The current selection
    var range1 = document.selection.createRange();
    var range2 = range1.duplicate();
    // Select all text.
    range2.moveToElementText(element);
    // Now move 'dummy' end point to end point of original range.
    range2.setEndPoint('EndToEnd', range1);
    // Now we can calculate start and end points.
    var start = range2.text.length - range1.text.length;
    var end = start + range1.text.length;
    return { 'start': start, 'end': end };
  }
  return { 'start': element.selectionStart, 'end': element.selectionEnd };
};

/**
 * Build an error message from ahah response.
 */
Drupal.ahahError = function(xmlhttp, uri) {
  if (xmlhttp.status == 200) {
    if (jQuery.trim(xmlhttp.responseText)) {
      var message = Drupal.t("An error occurred. \n@uri\n@text", {'@uri': uri, '@text': xmlhttp.responseText });
    }
    else {
      var message = Drupal.t("An error occurred. \n@uri\n(no information available).", {'@uri': uri });
    }
  }
  else {
    var message = Drupal.t("An HTTP error @status occurred. \n@uri", {'@uri': uri, '@status': xmlhttp.status });
  }
  return message.replace(/\n/g, '<br />');
}

// Global Killswitch on the <html> element
$(document.documentElement).addClass('js');
// Attach all behaviors.
$(document).ready(function() {
  Drupal.attachBehaviors(this);
});

/**
 * The default themes.
 */
Drupal.theme.prototype = {

  /**
   * Formats text for emphasized display in a placeholder inside a sentence.
   *
   * @param str
   *   The text to format (plain-text).
   * @return
   *   The formatted text (html).
   */
  placeholder: function(str) {
    return '<em>' + Drupal.checkPlain(str) + '</em>';
  }
};
;
Drupal.settings.omniture = Drupal.settings.omniture || {};

Drupal.behaviors.omniture = function (context) {
  var $context = $(context);
  
  // This section handles click tracking of forms, e.g. Post a comment.
  // Below is the format that it expects.
  //   Drupal.settings.omniture.click_tracking[] = { selector: selector, event: event, name: name, ... }
  if (Drupal.settings.omniture.click_tracking) {
    $.each(Drupal.settings.omniture.click_tracking, function(k, v) {
      // Append an onclick function to the button if form_id exists in the DOM
      var ltData = this;
      $context.find(ltData.selector).bind(ltData.event, function() {
        Drupal.omniture.trackClick(this, ltData.name, {
          edge_server:     ltData.edge_server,
          link_track_vars: ltData.link_track_vars
        });
      });
    });
  }
  
  /**
   * This section handles click tracking for elements with 
   * the data-omniture attribute.
   *
   * Example: <a href="/foo/bar" data-ec-omniture="foo|bar">Foo bar</a>
   */
  $context.find('*[data-ec-omniture]').click(function() {
    Drupal.omniture.trackClick(this, $(this).attr('data-ec-omniture'));
  });
};

// This function sends the link_name to both the Custom Link Tracking and
// to the Omniture var associated with the form.
Drupal.omniture = {};
Drupal.omniture.trackClick = function(obj, name, options) {
  if (typeof s_gi == "function") {
    var options = options || {};
    var edge_server = options.edge_server || Drupal.settings.omniture.edge_server;
    var s = s_gi(edge_server);

    s.linkTrackVars = options.link_track_vars;
    s.linkTrackEvents = options.link_track_events? options.link_track_events: 'None';
    s.link_track_vars = name;
    
    s.tl(options.skipDelay ? true : obj, 'o', name);
  }
};

;
/**
 * Report abuse behaviors.
 */
Drupal.behaviors.ec_vote = function(context) {
  // Attach the reportAbuseForm to the report links.
  $(".report-anchor").each(function(index) {
    this.abuseReportObj = new Econ.reportAbuseLink(this, $(this.parentNode).attr("id").replace("abuse-cid-", ""));
  });

  // RECOMMEND A COMMENT: Add ajax recommend functionality.
  $("div.recommend a").click(function(e) {
    e.preventDefault();
    var commentId = $(this.parentNode).attr("id").replace("recommend-cid-", "");
    var rec_url = $(this).attr("href") + '&mode=ajax';
    $.ajax({
      type: "GET",
      url: rec_url,
      beforeSend: function() {
        $('#recommend-cid-' + commentId + ' a').css("background-image","url(/sites/all/themes/econfinal/images/icons/ajax-loader.gif)");
      },
      success: function(data) {
        if (data) {
          $('#recommend-cid-' + commentId).html('<span class="recommended">Recommended (' + data +') </span>');
        } else {
          $('#recommend-cid-' + commentId + ' a').css("background-image","url(/sites/all/themes/econfinal/images/icons/icon-recommend.gif)");
        }
      }
    });
  });
}

var Econ = Econ || {};

/**
 * Prototype functions for the report abuse link.
 */
Econ.reportAbuseLink = function(elm, cid) {
  this.cid = cid;
  this.elm = elm;
  this.recommend = '#recommend-cid-' + cid;
  this.permalink = '#permalink-cid-' + cid;
  this.abuselink = '#abuse-cid-'  + cid;
  
  // Wire the report abuse links up.
  var obj = this;
  $(elm).click(function(e) {
    return obj.handleClick(e);
  });
}

Econ.reportAbuseLink.prototype.handleClick = function(e) {
  // We want to append after our element.
  this.getAbuseForm();
  return false;
}

Econ.reportAbuseLink.prototype.getAbuseForm = function() {
  // we should only have one active form at a time;
  if (Econ.reportAbuseLink.activeObj && Econ.reportAbuseLink.activeObj != this) {
    Econ.reportAbuseLink.activeObj.removeAbuseForm();
  }
  Econ.reportAbuseLink.activeObj = this;

  // This is a quick little throbber for the retrieving of the form.
  $(this.recommend).addClass("hide");
  $(this.permalink).addClass("hide");
  $(this.abuselink).addClass("hide");
  var throbber = $('<div class="report-box"><div class="getting-form"><span class="spin">Getting Abuse Form...</span></div></div>');
  $(this.elm).parent().after(throbber);
  
  var obj = this;
  $.getJSON(Drupal.settings.basePath + Drupal.settings.ec_vote.reportAbuseURL + '/' + this.cid, function(data) {
    throbber.remove();
    obj.displayAbuseForm(data);
    return false;
  });
}

Econ.reportAbuseLink.prototype.displayAbuseForm = function (data) {
  // Create the form.
  this.form = $('<div class="report-box"><div class="report-close">Close</div>' + data.form + '</div>');
  // Hide the recommend and report abuse links.
  $(this.recommend).addClass("hide");
  $(this.permalink).addClass("hide");
  $(this.abuselink).addClass("hide");
  // Place the form on the DOM.
  $(this.elm).parent().after(this.form);
  
  // Display any errors on the form.
  if (data.messages.error && data.messages.error.length != 0) {
    for (var i = 0; i < data.messages.error.length; i++) {
      $('.reason-wrapper', this.form).before('<p class="abuse-error">' + data.messages.error[i] + '</p>');
    }
  }
  
  var obj = this;
  // Attach to the close button.
  // Close the report abuse box by clicking the close link.
  $('div.report-close').click(function(e){
    obj.removeAbuseForm();
  });
  
  // Attach to the submit button.
  $('form', this.form).ajaxForm({
    beforeSubmit: function(arr, $form, options) { 
      // The array of form data takes the following form: 
      // [ { name: 'username', value: 'jresig' }, { name: 'password', value: 'secret' } ] 
      // Validate data.
      var errors = [];
      
      if (errors.length > 0) {
        for (var i = 0; i < errors.length; i++) {
          $('.reason-wrapper', obj.form).before('<p class="abuse-error">' + errors[i] + '</p>');
        }
      }
      // Add trobber.
      $(obj.form).html("<div class='reporting'><span class='spin'>Reporting...</span></div>");
      // Return false to cancel submit.
      return true;
    },
    dataType: 'json',
    success: function(data){
      obj.removeAbuseForm();
      // On failure, redisplay the form.
      if (data.messages.error && data.messages.error.length != 0) {
        obj.displayAbuseForm(data);
      }
      // On success, remove the form and show the buttons with the report abuse
      // button switched out with "reported" text.
      else {
        // Show the links again, but replace last one with Reported message.
        $(obj.abuselink).html('<span class="reported">Reported</span>');
      }
    }
  });
  
  // Attach some textarea handling functions to the text area.
  // Remove the instructional text from the textarea when user focuses.
  var textareaDefaultValue = 'Add an optional description (up to 500 characters)';
  if ($('textarea', this.form).val() == textareaDefaultValue) {
    $('textarea', this.form).addClass('abuse-textarea-default');
  }
  $('textarea', this.form)
    .focus(function() {
      if ($(this).val() == textareaDefaultValue) {
        $(this).val("");
        $(this).removeClass('abuse-textarea-default');
      }
    });
   
  // Wire up the policy box links.
  $("a.report-policy-link", this.form).click(function(){
    if (!$("div.report-policybox").length){
      // Show policy box.
      var policybox = $(Drupal.theme('policyBox', ''));
      $('.report-policybox-close', policybox).click(function(e) {
        $(this).parent().remove();
        return false;
      });
      $('.reason-wrapper', this.form).before(policybox);
    }
    return false;
  });
   
  // Validate string length.
  textareaMaxlength($('textarea', this.form), 500);
}

Econ.reportAbuseLink.prototype.removeAbuseForm = function() {
  $(this.recommend).removeClass('hide');
  $(this.permalink).removeClass('hide');
  $(this.abuselink).removeClass('hide');
  $(this.form).remove();
}


function textareaMaxlength(element, maxlength){
  var errorElementId = element.attr('id') + '-error';

  $(element).keyup(function() {
    if (this.val().length > maxlength) {
      // Display an error if you type more than maxlength characters.
      if (!$("p#" + errorElementId).length) {
        $(this).before('<p id="' + errorElementId + '" class="txtlength-error">You have exceeded ' + maxlength + ' characters.</p>');
        $(this).parents('form').find('input[type=submit]').attr('disabled', 'disabled');
      }
    } else {
      // Remove the error (if exists) when the number of chars is less then maxlength.
      if ($("p#" + errorElementId).length) {
        $("p#" +errorElementId).remove();
        $(this).parents('form').find('input[type=submit]').removeAttr('disabled');
      }
    }
  });
}

Drupal.theme.prototype.policyBox = function (caller) {
  var policy = '';
  policy += '<div class="report-policybox ' + caller + '">';
  policy += '<div class="report-policybox-close ' + caller + '"><a href="#">Close</a></div>';
  policy += '<p><strong>Comments Policy</strong></p>';
  policy += '<p>You are solely responsible for all content you post to the site. Libel, copyright and trade mark infringement, links to commercial websites, products, or sales materials, and offensive or threatening language are not permitted and may be removed based on our comments policy (for more information, please review our <a href="/about/terms_and_conditions.cfm">terms and conditions</a>).</p>';
  policy += '<p>Your pen name will appear alongside any comments that you post.</p>';
  policy += '</div>';
  
  return policy
}
;
// $Id: googleanalytics.js,v 1.9.2.4 2010/09/19 11:39:20 hass Exp $

$(document).ready(function() {

  // Attach onclick event to document only and catch clicks on all elements.
  $(document.body).click(function(event) {
    // Catch only the first parent link of a clicked element.
    $(event.target).parents("a:first,area:first").andSelf().filter("a,area").each(function() {

      var ga = Drupal.settings.googleanalytics;
      // Expression to check for absolute internal links.
      var isInternal = new RegExp("^(https?):\/\/" + window.location.host, "i");
      // Expression to check for special links like gotwo.module /go/* links.
      var isInternalSpecial = new RegExp("(\/go\/.*)$", "i");
      // Expression to check for download links.
      var isDownload = new RegExp("\\.(" + ga.trackDownloadExtensions + ")$", "i");

      // Is the clicked URL internal?
      if (isInternal.test(this.href)) {
        // Is download tracking activated and the file extension configured for download tracking?
        if (ga.trackDownload && isDownload.test(this.href)) {
          // Download link clicked.
          var extension = isDownload.exec(this.href);
          _gaq.push(["_trackEvent", "Downloads", extension[1].toUpperCase(), this.href.replace(isInternal, '')]);
        }
        else if (isInternalSpecial.test(this.href)) {
          // Keep the internal URL for Google Analytics website overlay intact.
          _gaq.push(["_trackPageview", this.href.replace(isInternal, '')]);
        }
      }
      else {
        if (ga.trackMailto && $(this).is("a[href^=mailto:],area[href^=mailto:]")) {
          // Mailto link clicked.
          _gaq.push(["_trackEvent", "Mails", "Click", this.href.substring(7)]);
        }
        else if (ga.trackOutgoing && this.href) {
          // External link clicked.
          _gaq.push(["_trackEvent", "Outgoing links", "Click", this.href]);
        }
      }

    });
  });
});
;
/**
 *  Hovertip - easy and elegant tooltips
 *  
 *  By Dave Cohen <http://dave-cohen.com>
 *  With ideas and and javascript code borrowed from many folks.
 *  (See URLS in the comments)
 *  
 *  Licensed under GPL. 
 *  Requires jQuery.js.  <http://jquery.com>, 
 *  which may be distributed under a different licence.
 *  
 *  $Date: 2008/05/09 21:52:18 $
 *  $Rev: $
 *  $Id: hovertip.js,v 1.4 2008/05/09 21:52:18 yogadex Exp $
 *  
 *  This plugin helps you create tooltips.  It supports:
 *  
 *  hovertips - these appear under the mouse when mouse is over the target
 *  element.
 *  
 *  clicktips - these appear in the document when the target element is
 *  clicked.
 *  
 *  You may define behaviors for additional types of tooltips.
 *  
 *  There are a variety of ways to add tooltips.  Each of the following is
 *  supported:
 *  
 *  <p>blah blah blah 
 *  <span>important term</span>
 *  <span class="hovertip">text that appears.</span> 
 *  blah blah blah</p>
 *  
 *  or,
 *  
 *  <p>blah blah blah 
 *  <span hovertip="termdefinition">important term</span>
 *  blah blah blah</p>
 *  <div id="termdefinition" class="hovertip"><h1>term definition</h1><p>the term means...</p></div>
 *  
 *  or, 
 *  
 *  <p>blah blah blah 
 *  <span id="term">important term</span>
 *  blah blah blah</p>
 *  <div target="term" class="hovertip"><h1>term definition</h1><p>the term means...</p></div>
 *  
 *  
 *  Hooks are available to customize both the behavior of activated tooltips,
 *  and the syntax used to mark them up.
 *  
 */


//// mouse events ////
/**
 * To make hovertips appear correctly we need the exact mouse position.
 * These functions make that possible.
 */

// use globals to track mouse position
var hovertipMouseX;
var hovertipMouseY;
function hovertipMouseUpdate(e) {
  var mouse = hovertipMouseXY(e);
  hovertipMouseX = mouse[0];
  hovertipMouseY = mouse[1];
};

// http://www.howtocreate.co.uk/tutorials/javascript/eventinfo
function hovertipMouseXY(e) {
  if( !e ) {
    if( window.event ) {
      //Internet Explorer
      e = window.event;
    } else {
      //total failure, we have no way of referencing the event
      return;
    }
  }
  if( typeof( e.pageX ) == 'number' ) {
    //most browsers
    var xcoord = e.pageX;
    var ycoord = e.pageY;
  } else if( typeof( e.clientX ) == 'number' ) {
    //Internet Explorer and older browsers
    //other browsers provide this, but follow the pageX/Y branch
    var xcoord = e.clientX;
    var ycoord = e.clientY;
    var badOldBrowser = ( window.navigator.userAgent.indexOf( 'Opera' ) + 1 ) ||
      ( window.ScriptEngine && ScriptEngine().indexOf( 'InScript' ) + 1 ) ||
      ( navigator.vendor == 'KDE' );
    if( !badOldBrowser ) {
      if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ) {
        //IE 4, 5 & 6 (in non-standards compliant mode)
        xcoord += document.body.scrollLeft;
        ycoord += document.body.scrollTop;
      } else if( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) {
        //IE 6 (in standards compliant mode)
        xcoord += document.documentElement.scrollLeft;
        ycoord += document.documentElement.scrollTop;
      }
    }
  } else {
    //total failure, we have no way of obtaining the mouse coordinates
    return;
  }
  return [xcoord, ycoord];
};



//// target selectors ////

/**
 * These selectors find the targets for a given tooltip element.  
 * Several methods are supported.  
 * 
 * You may write your own selector functions to customize.
 */

/**
 * For this model:
 * <span hovertip="ht1">target term</span>...
 * <div class="hovertip" id="ht1">tooltip text</div>
 */
targetSelectById = function(el, config) {
  var id;
  var selector;
  if (id = el.getAttribute('id')) {
    selector = '*[@'+config.attribute+'=\''+id+'\']';
    return $(selector);
  }
};

/**
 * For this model:
 * <span id="ht1">target term</span>...
 * <div class="hovertip" target="ht1">tooltip text</div>
 */
targetSelectByTargetAttribute = function(el, config) {
  target_list = el.getAttribute('target');
  if (target_list) {
    // use for attribute to specify targets
    target_ids = target_list.split(' ');
    var selector = '#' + target_ids.join(',#');
    return $(selector);
  }
};

/**
 * For this model:
 * <span>target term</span><span class="hovertip">tooltip text</span>
 */
targetSelectByPrevious = function(el, config) {
  sibling = el.previousSibling;
  // If the previous sibling is not an element, keep looking
  while (sibling && sibling.nodeType != 1)
    sibling = sibling.previousSibling;
    
  return $(sibling);
};

/**
 * Make all siblings targets.  Experimental.
 */
targetSelectBySiblings = function(el, config) {
  return $(el).siblings();
};

//// prepare tip elements ////

/**
 * The tooltip element needs special preparation.  You may define your own
 * prepare functions to customize the behavior.
 */

// adds a close link to clicktips
clicktipPrepareWithCloseLink = function(o, config) {
  return o.append("<a class='clicktip_close'><span>close</span></a>")
  .find('a.clicktip_close').click(function(e) {
      o.hide();
      return false;
    }).end(); 
};

// ensure that hovertips do not disappear when the mouse is over them.
// also position the hovertip as an absolutely positioned child of body.
hovertipPrepare = function(o, config) {
  return o.hover(function() {
      hovertipHideCancel(this);
    }, function() {
      hovertipHideLater(this);
    }).css('position', 'absolute').each(hovertipPosition);
};

// do not modify tooltips when preparing
hovertipPrepareNoOp = function(o, config) {
  return o;
};


//// manipulate tip elements /////
/**
 * A variety of functions to modify tooltip elements
 */

// move tooltips to body, so they are not descended from other absolutely
// positioned elements.
hovertipPosition = function(i) {
  document.body.appendChild(this);
};


hovertipIsVisible = function(el) {
  return (jQuery.css(el, 'display') != 'none');
};


// show the tooltip under the mouse.
// Introduce a delay, so tip appears only if cursor rests on target for more than an instant.
hovertipShowUnderMouse = function(el) {
  hovertipHideCancel(el);
  if (!hovertipIsVisible(el)) {
    el.ht.showing = // keep reference to timer
      window.setTimeout(function() {
          el.ht.tip.css({
              'position':'absolute',
                'z-index': '99',
                'top': hovertipMouseY + 'px',
                'left': hovertipMouseX + 'px'})
            .show();
        }, el.ht.config.showDelay);
  }
};

// do not hide
hovertipHideCancel = function(el) {
  if (el.ht.hiding) {
    window.clearTimeout(el.ht.hiding);
    el.ht.hiding = null;
  }  
};

// Hide a tooltip, but only after a delay.
// The delay allow the tip to remain when user moves mouse from target to tooltip
hovertipHideLater = function(el) {
  if (el.ht.showing) {
    window.clearTimeout(el.ht.showing);
    el.ht.showing = null;
  }
  if (el.ht.hiding) {
    window.clearTimeout(el.ht.hiding);
    el.ht.hiding = null;
  }
  el.ht.hiding = 
  window.setTimeout(function() {
      if (el.ht.hiding) {
        // fadeOut, slideUp do not work on Konqueror
        el.ht.tip.hide();
      }
    }, el.ht.config.hideDelay);
};


//// prepare target elements ////
/**
 * As we prepared the tooltip elements, the targets also need preparation.
 * 
 * You may define your own custom behavior.
 */

// when clicked on target, toggle visibilty of tooltip
clicktipTargetPrepare = function(o, el, config) {
  return o.addClass(config.attribute + '_target')
  .click(function() {
      el.ht.tip.toggle();
      return false;
    });
};

// when hover over target, make tooltip appear
hovertipTargetPrepare = function(o, el, config) {
  return o.addClass(config.attribute + '_target')
  .hover(function() {
      // show tip when mouse over target
      hovertipShowUnderMouse(el);
    },
    function() {
      // hide the tip
      // add a delay so user can move mouse from the target to the tip
      hovertipHideLater(el);
    });
};


/**
 * hovertipActivate() is our jQuery plugin function.  It turns on hovertip or
 * clicktip behavior for a set of elements.
 * 
 * @param config 
 * controls aspects of tooltip behavior.  Be sure to define
 * 'attribute', 'showDelay' and 'hideDelay'.
 * 
 * @param targetSelect
 * function finds the targets of a given tooltip element.
 * 
 * @param tipPrepare
 * function alters the tooltip to display and behave properly
 * 
 * @param targetPrepare
 * function alters the target to display and behave properly.
 */
jQuery.fn.hovertipActivate = function(config, targetSelect, tipPrepare, targetPrepare) {
  //alert('activating ' + this.size());
  // unhide so jquery show/hide will work.
  return this.css('display', 'block')
  .hide() // don't show it until click
  .each(function() {
      if (!this.ht)
        this.ht = new Object();
      this.ht.config = config;
      
      // find our targets
      var targets = targetSelect(this, config);
      if (targets && targets.size()) {
        if (!this.ht.targets)
          this.ht.targets = targetPrepare(targets, this, config);
        else
          this.ht.targets.add(targetPrepare(targets, this, config));
        
        // listen to mouse move events so we know exatly where to place hovetips
        targets.mousemove(hovertipMouseUpdate);
        
        // prepare the tooltip element
        // is it bad form to call $(this) here?
        if (!this.ht.tip)
          this.ht.tip = tipPrepare($(this), config);
      }
      
    })
  ;
};

/**
 * Here's an example ready function which shows how to enable tooltips.
 * 
 * You can make this considerably shorter by choosing only the markup style(s)
 * you will use.
 * 
 * You may also remove the code that wraps hovertips to produce drop-shadow FX
 * 
 * Invoke this function or one like it from your $(document).ready(). 
 *  
 *  Here, we break the action up into several timout callbacks, to avoid
 *  locking up browsers.
 */
function hovertipInit() {
  // specify the attribute name we use for our clicktips
  var clicktipConfig = {'attribute':'clicktip'};
  
  /**
   * To enable this style of markup (id on tooltip):
   * <span clicktip="foo">target</span>...
   * <div id="foo" class="clicktip">blah blah</div>
   */
  window.setTimeout(function() {
    $('.clicktip').hovertipActivate(clicktipConfig,
                                    targetSelectById,
                                    clicktipPrepareWithCloseLink,
                                    clicktipTargetPrepare);
  }, 0);
  
  /**
   * To enable this style of markup (id on target):
   * <span id="foo">target</span>...
   * <div target="foo" class="clicktip">blah blah</div>
   */
  window.setTimeout(function() {
    $('.clicktip').hovertipActivate(clicktipConfig,
                                    targetSelectByTargetAttribute,
                                    clicktipPrepareWithCloseLink,
                                    clicktipTargetPrepare);
  }, 0);
  
  // specify our configuration for hovertips, including delay times (millisec)
  var hovertipConfig = {'attribute':'hovertip',
                        'showDelay': 300,
                        'hideDelay': 700};
  
  // use <div class='hovertip'>blah blah</div>
  var hovertipSelect = 'div.hovertip';
  
  // OPTIONAL: here we wrap each hovertip to apply special effect. (i.e. drop shadow):
  $(hovertipSelect).css('display', 'block').addClass('hovertip_wrap3').
    wrap("<div class='hovertip_wrap0'><div class='hovertip_wrap1'><div class='hovertip_wrap2'>" + 
         "</div></div></div>").each(function() {
           // fix class and attributes for newly wrapped elements
           var tooltip = this.parentNode.parentNode.parentNode;
           if (this.getAttribute('target'))
             tooltip.setAttribute('target', this.getAttribute('target'));
           if (this.getAttribute('id')) {
             var id = this.getAttribute('id');
             this.removeAttribute('id');
             tooltip.setAttribute('id', id);
           }
         });
  hovertipSelect = 'div.hovertip_wrap0';
  
  // end optional FX section
  
  if (1) { // enable some of the following methods, but not all
    /**
     * To enable this style of markup (id on tooltip):
     * <span hovertip="foo">target</span>...
     * <div id="foo" class="hovertip">blah blah</div>
     */
    window.setTimeout(function() {
        $(hovertipSelect).hovertipActivate(hovertipConfig,
                                           targetSelectById,
                                           hovertipPrepare,
                                           hovertipTargetPrepare);
      }, 0);
    
    /**
     * To enable this style of markup (id on target):
     * <span id="foo">target</span>...
     * <div target="foo" class="hovertip">blah blah</div>
     */
    window.setTimeout(function() {
        $(hovertipSelect).hovertipActivate(hovertipConfig,
                                           targetSelectByTargetAttribute,
                                           hovertipPrepare,
                                           hovertipTargetPrepare);
      }, 0);
  } else {
    /**
     * To enable this style of markup (id on target):
     * <span>target</span>...
     * <div class="hovertip">blah blah</div>
     * 
     * Note that your should enable either this method, or preceeding (target
     * attribute) method.  Not both, as the div with class=hovertip will be
     * associated with more than one target.  
     */
    window.setTimeout(function() {
        $(hovertipSelect).hovertipActivate(hovertipConfig,
                                           targetSelectByPrevious,
                                           hovertipPrepare,
                                           hovertipTargetPrepare);
      }, 0);
  }

  hovertipSpanInit();
};


/**
 * This simplified alternative to hovertipInit supports markup like this:
 * 
 * <span>this is the text that always appears</span><span class=hovertip>this is the text that appears on mouse hover.</span>
 */
function hovertipSpanInit() {
  // specify our configuration for hovertips, including delay times (millisec)
  var hovertipConfig = {'attribute':'hovertip',
                        'showDelay': 300,
                        'hideDelay': 700};
  var hovertipSpanSelect = 'span.hovertip';
  // activate hovertips with wrappers for FX (drop shadow):
  $(hovertipSpanSelect).css('display', 'block').addClass('hovertip_wrap3').
    wrap("<span class='hovertip_wrap0'><span class='hovertip_wrap1'><span class='hovertip_wrap2'>" + 
         "</span></span></span>").each(function() {
             // fix class and attributes for newly wrapped elements
             var tooltip = this.parentNode.parentNode.parentNode;
             if (this.getAttribute('target'))
               tooltip.setAttribute('target', this.getAttribute('target'));
             if (this.getAttribute('id')) {
               var id = this.getAttribute('id');
               this.removeAttribute('id');
               tooltip.setAttribute('id', id);
             }
           });
  hovertipSpanSelect = 'span.hovertip_wrap0';
  
  window.setTimeout(function() {
      $(hovertipSpanSelect)
        .hovertipActivate(hovertipConfig,
                          targetSelectByPrevious,
                          hovertipPrepare,
                          hovertipTargetPrepare);
    }, 0);
};


/**
 * This simplified alternative to hovertipInit supports markup like this:
 * 
 * this is the text that always appears<span class=hoverinfo>this is the text that appears on mouse hover.</span>
 * 
 * In this case the text that always appeared will be followed by an icon inicating more information is available.
 */
function hoverinfoDivInit() {
  // specify our configuration for hovertips, including delay times (millisec)
  var hovertipConfig = {'attribute':'hovertip',
                        'showDelay': 300,
                        'hideDelay': 700};
  var select = '.hoverinfo';
  // activate hovertips with wrappers for FX (drop shadow):
  $(select).css('display', 'block').addClass('hovertip_wrap3').
    wrap("<div class='hovertip_wrap0'><div class='hovertip_wrap1'><div class='hovertip_wrap2'>" + 
         "</div></div></div>");
  hovertipSpanSelect = 'div.hovertip_wrap0';
  
  window.setTimeout(function() {
      $(hovertipSpanSelect)
        .before('<span class=hoverinfo_target><span></span></span>')
        .hovertipActivate(hovertipConfig,
                          targetSelectByPrevious,
                          hovertipPrepare,
                          hovertipTargetPrepare);
    }, 0);
};
;
(function(){var g=1;var h=2;var i=3;var j=4;var k=true;var l=function(b,c,d){var e=b[c];var f;if(d.type==g)f=function(){var a=e.apply(this,arguments);return d.value.apply(this,[a,c])};else if(d.type==h)f=function(){d.value.apply(this,[arguments,c]);return e.apply(this,arguments)};else if(d.type==j)f=function(){return d.value.apply(this,arguments)};else if(d.type==i){f=function(){var a={object:this,args:arguments};return d.value.apply(a.object,[{arguments:a.args,method:c,proceed:function(){return e.apply(a.object,a.args)}}])}}f.unweave=function(){b[c]=e;pointcut=b=f=e=null};b[c]=f;return f};var m=function(a,b){var c=(typeof(a.target.prototype)!='undefined')?a.target.prototype:a.target;var d=[];if(b.type!=j&&typeof(c[a.method])=='undefined'){for(var e in c){if(c[e]!=null&&c[e]instanceof Function&&e.match(a.method)){d[d.length]=l(c,e,b)}}if(d.length==0)throw'No method: '+a.method;}else{d[0]=l(c,a.method,b)}return k?d:d[0]};jQuery.aop={after:function(a,b){return m(a,{type:g,value:b})},before:function(a,b){return m(a,{type:h,value:b})},around:function(a,b){return m(a,{type:i,value:b})},introduction:function(a,b){return m(a,{type:j,value:b})},setup:function(a){k=a.regexMatch}}})();;
(function($, Drupal) {

Drupal.jsonify = {

  /**
   * Performs an AJAX GET request on the URL returning
   * the results as JSON.  If a callback is supplied, the 
   * request is asynchronous. If not, the request is synchronous.
   */
  get: function(url, callback) {
    if (typeof callback == "function") {
      $.ajax({
        type: "GET",
        url: url,
        success: function(data) {
          callback(data);
        },
        error: function() {
          callback(false);
        },
        dataType: "json"
      });
    }
    else {
      var result;
      
      $.ajax({
        async: false,
        type: "GET",
        url: url,
        success: function(data) {
          result = data;
        },
        error: function(data) {
          result = false;
        },
        dataType: "json"
      });
      
      return result;
    }
  },
  
  load: function(type, id, callback) {
    var urls = {
      node: Drupal.settings.basePath + "jsonify/node/" + id,
      comment: Drupal.settings.basePath + "jsonify/comment/" + id
    };
    
    if (type in urls) {
      return Drupal.jsonify.get(urls[type], callback);
    }
    else {
      throw Drupal.t("Jsonify Error: Unsupported type: @type. Supported types: node, comment.", {'@type': type});
    }
  }
};

})(jQuery, Drupal);
;
/* $Id: lightbox.js,v 1.5.2.6.2.136 2010/09/24 08:39:40 snpower Exp $ */

/**
 * jQuery Lightbox
 * @author
 *   Stella Power, <http://drupal.org/user/66894>
 *
 * Based on Lightbox v2.03.3 by Lokesh Dhakar
 * <http://www.huddletogether.com/projects/lightbox2/>
 * Also partially based on the jQuery Lightbox by Warren Krewenki
 *   <http://warren.mesozen.com>
 *
 * Permission has been granted to Mark Ashmead & other Drupal Lightbox2 module
 * maintainers to distribute this file via Drupal.org
 * Under GPL license.
 *
 * Slideshow, iframe and video functionality added by Stella Power.
 */

var Lightbox = {
  auto_modal : false,
  overlayOpacity : 0.8, // Controls transparency of shadow overlay.
  overlayColor : '000', // Controls colour of shadow overlay.
  disableCloseClick : true,
  // Controls the order of the lightbox resizing animation sequence.
  resizeSequence: 0, // 0: simultaneous, 1: width then height, 2: height then width.
  resizeSpeed: 'normal', // Controls the speed of the lightbox resizing animation.
  fadeInSpeed: 'normal', // Controls the speed of the image appearance.
  slideDownSpeed: 'slow', // Controls the speed of the image details appearance.
  minWidth: 240,
  borderSize : 10,
  boxColor : 'fff',
  fontColor : '000',
  topPosition : '',
  infoHeight: 20,
  alternative_layout : false,
  imageArray : [],
  imageNum : null,
  total : 0,
  activeImage : null,
  inprogress : false,
  disableResize : false,
  disableZoom : false,
  isZoomedIn : false,
  rtl : false,
  loopItems : false,
  keysClose : ['c', 'x', 27],
  keysPrevious : ['p', 37],
  keysNext : ['n', 39],
  keysZoom : ['z'],
  keysPlayPause : [32],

  // Slideshow options.
  slideInterval : 5000, // In milliseconds.
  showPlayPause : true,
  autoStart : true,
  autoExit : true,
  pauseOnNextClick : false, // True to pause the slideshow when the "Next" button is clicked.
  pauseOnPrevClick : true, // True to pause the slideshow when the "Prev" button is clicked.
  slideIdArray : [],
  slideIdCount : 0,
  isSlideshow : false,
  isPaused : false,
  loopSlides : false,

  // Iframe options.
  isLightframe : false,
  iframe_width : 600,
  iframe_height : 400,
  iframe_border : 1,

  // Video and modal options.
  enableVideo : false,
  flvPlayer : '/flvplayer.swf',
  flvFlashvars : '',
  isModal : false,
  isVideo : false,
  videoId : false,
  modalWidth : 400,
  modalHeight : 400,
  modalHTML : null,


  // initialize()
  // Constructor runs on completion of the DOM loading.
  // The function inserts html at the bottom of the page which is used
  // to display the shadow overlay and the image container.
  initialize: function() {

    var s = Drupal.settings.lightbox2;
    Lightbox.overlayOpacity = s.overlay_opacity;
    Lightbox.overlayColor = s.overlay_color;
    Lightbox.disableCloseClick = s.disable_close_click;
    Lightbox.resizeSequence = s.resize_sequence;
    Lightbox.resizeSpeed = s.resize_speed;
    Lightbox.fadeInSpeed = s.fade_in_speed;
    Lightbox.slideDownSpeed = s.slide_down_speed;
    Lightbox.borderSize = s.border_size;
    Lightbox.boxColor = s.box_color;
    Lightbox.fontColor = s.font_color;
    Lightbox.topPosition = s.top_position;
    Lightbox.rtl = s.rtl;
    Lightbox.loopItems = s.loop_items;
    Lightbox.keysClose = s.keys_close.split(" ");
    Lightbox.keysPrevious = s.keys_previous.split(" ");
    Lightbox.keysNext = s.keys_next.split(" ");
    Lightbox.keysZoom = s.keys_zoom.split(" ");
    Lightbox.keysPlayPause = s.keys_play_pause.split(" ");
    Lightbox.disableResize = s.disable_resize;
    Lightbox.disableZoom = s.disable_zoom;
    Lightbox.slideInterval = s.slideshow_interval;
    Lightbox.showPlayPause = s.show_play_pause;
    Lightbox.showCaption = s.show_caption;
    Lightbox.autoStart = s.slideshow_automatic_start;
    Lightbox.autoExit = s.slideshow_automatic_exit;
    Lightbox.pauseOnNextClick = s.pause_on_next_click;
    Lightbox.pauseOnPrevClick = s.pause_on_previous_click;
    Lightbox.loopSlides = s.loop_slides;
    Lightbox.alternative_layout = s.use_alt_layout;
    Lightbox.iframe_width = s.iframe_width;
    Lightbox.iframe_height = s.iframe_height;
    Lightbox.iframe_border = s.iframe_border;
    Lightbox.enableVideo = s.enable_video;
    if (s.enable_video) {
      Lightbox.flvPlayer = s.flvPlayer;
      Lightbox.flvFlashvars = s.flvFlashvars;
    }

    // Make the lightbox divs.
    var layout_class = (s.use_alt_layout ? 'lightbox2-alt-layout' : 'lightbox2-orig-layout');
    var output = '<div id="lightbox2-overlay" style="display: none;"></div>\
      <div id="lightbox" style="display: none;" class="' + layout_class + '">\
        <div id="outerImageContainer"></div>\
        <div id="imageDataContainer" class="clearfix">\
          <div id="imageData"></div>\
        </div>\
      </div>';
    var loading = '<div id="loading"><a href="#" id="loadingLink"></a></div>';
    var modal = '<div id="modalContainer" style="display: none;"></div>';
    var frame = '<div id="frameContainer" style="display: none;"></div>';
    var imageContainer = '<div id="imageContainer" style="display: none;"></div>';
    var details = '<div id="imageDetails"></div>';
    var bottomNav = '<div id="bottomNav"></div>';
    var image = '<img id="lightboxImage" alt="" />';
    var hoverNav = '<div id="hoverNav"><a id="prevLink" href="#"></a><a id="nextLink" href="#"></a></div>';
    var frameNav = '<div id="frameHoverNav"><a id="framePrevLink" href="#"></a><a id="frameNextLink" href="#"></a></div>';
    var hoverNav = '<div id="hoverNav"><a id="prevLink" title="' + Drupal.t('Previous') + '" href="#"></a><a id="nextLink" title="' + Drupal.t('Next') + '" href="#"></a></div>';
    var frameNav = '<div id="frameHoverNav"><a id="framePrevLink" title="' + Drupal.t('Previous') + '" href="#"></a><a id="frameNextLink" title="' + Drupal.t('Next') + '" href="#"></a></div>';
    var caption = '<span id="caption"></span>';
    var numberDisplay = '<span id="numberDisplay"></span>';
    var close = '<a id="bottomNavClose" title="' + Drupal.t('Close') + '" href="#"></a>';
    var zoom = '<a id="bottomNavZoom" href="#"></a>';
    var zoomOut = '<a id="bottomNavZoomOut" href="#"></a>';
    var pause = '<a id="lightshowPause" title="' + Drupal.t('Pause Slideshow') + '" href="#" style="display: none;"></a>';
    var play = '<a id="lightshowPlay" title="' + Drupal.t('Play Slideshow') + '" href="#" style="display: none;"></a>';

    $("body").append(output);
    $('#outerImageContainer').append(modal + frame + imageContainer + loading);
    if (!s.use_alt_layout) {
      $('#imageContainer').append(image + hoverNav);
      $('#imageData').append(details + bottomNav);
      $('#imageDetails').append(caption + numberDisplay);
      $('#bottomNav').append(frameNav + close + zoom + zoomOut + pause + play);
    }
    else {
      $('#outerImageContainer').append(bottomNav);
      $('#imageContainer').append(image);
      $('#bottomNav').append(close + zoom + zoomOut);
      $('#imageData').append(hoverNav + details);
      $('#imageDetails').append(caption + numberDisplay + pause + play);
    }

    // Setup onclick handlers.
    if (Lightbox.disableCloseClick) {
      $('#lightbox2-overlay').click(function() { Lightbox.end(); return false; } ).hide();
    }
    $('#loadingLink, #bottomNavClose').click(function() { Lightbox.end('forceClose'); return false; } );
    $('#prevLink, #framePrevLink').click(function() { Lightbox.changeData(Lightbox.activeImage - 1); return false; } );
    $('#nextLink, #frameNextLink').click(function() { Lightbox.changeData(Lightbox.activeImage + 1); return false; } );
    $('#bottomNavZoom').click(function() { Lightbox.changeData(Lightbox.activeImage, true); return false; } );
    $('#bottomNavZoomOut').click(function() { Lightbox.changeData(Lightbox.activeImage, false); return false; } );
    $('#lightshowPause').click(function() { Lightbox.togglePlayPause("lightshowPause", "lightshowPlay"); return false; } );
    $('#lightshowPlay').click(function() { Lightbox.togglePlayPause("lightshowPlay", "lightshowPause"); return false; } );

    // Fix positioning.
    $('#prevLink, #nextLink, #framePrevLink, #frameNextLink').css({ 'paddingTop': Lightbox.borderSize + 'px'});
    $('#imageContainer, #frameContainer, #modalContainer').css({ 'padding': Lightbox.borderSize + 'px'});
    $('#outerImageContainer, #imageDataContainer, #bottomNavClose').css({'backgroundColor': '#' + Lightbox.boxColor, 'color': '#'+Lightbox.fontColor});
    if (Lightbox.alternative_layout) {
      $('#bottomNavZoom, #bottomNavZoomOut').css({'bottom': Lightbox.borderSize + 'px', 'right': Lightbox.borderSize + 'px'});
    }
    else if (Lightbox.rtl == 1 && $.browser.msie) {
      $('#bottomNavZoom, #bottomNavZoomOut').css({'left': '0px'});
    }

    // Force navigation links to always be displayed
    if (s.force_show_nav) {
      $('#prevLink, #nextLink').addClass("force_show_nav");
    }

  },

  // initList()
  // Loops through anchor tags looking for 'lightbox', 'lightshow' and
  // 'lightframe', etc, references and applies onclick events to appropriate
  // links. You can rerun after dynamically adding images w/ajax.
  initList : function(context) {

    if (context == undefined || context == null) {
      context = document;
    }

    // Attach lightbox to any links with rel 'lightbox', 'lightshow' or
    // 'lightframe', etc.
    $("a[rel^='lightbox']:not(.lightbox-processed), area[rel^='lightbox']:not(.lightbox-processed)", context).addClass('lightbox-processed').click(function(e) {
      if (Lightbox.disableCloseClick) {
        $('#lightbox').unbind('click');
        $('#lightbox').click(function() { Lightbox.end('forceClose'); } );
      }
      Lightbox.start(this, false, false, false, false);
      if (e.preventDefault) { e.preventDefault(); }
      return false;
    });
    $("a[rel^='lightshow']:not(.lightbox-processed), area[rel^='lightshow']:not(.lightbox-processed)", context).addClass('lightbox-processed').click(function(e) {
      if (Lightbox.disableCloseClick) {
        $('#lightbox').unbind('click');
        $('#lightbox').click(function() { Lightbox.end('forceClose'); } );
      }
      Lightbox.start(this, true, false, false, false);
      if (e.preventDefault) { e.preventDefault(); }
      return false;
    });
    $("a[rel^='lightframe']:not(.lightbox-processed), area[rel^='lightframe']:not(.lightbox-processed)", context).addClass('lightbox-processed').click(function(e) {
      if (Lightbox.disableCloseClick) {
        $('#lightbox').unbind('click');
        $('#lightbox').click(function() { Lightbox.end('forceClose'); } );
      }
      Lightbox.start(this, false, true, false, false);
      if (e.preventDefault) { e.preventDefault(); }
      return false;
    });
    if (Lightbox.enableVideo) {
      $("a[rel^='lightvideo']:not(.lightbox-processed), area[rel^='lightvideo']:not(.lightbox-processed)", context).addClass('lightbox-processed').click(function(e) {
        if (Lightbox.disableCloseClick) {
          $('#lightbox').unbind('click');
          $('#lightbox').click(function() { Lightbox.end('forceClose'); } );
        }
        Lightbox.start(this, false, false, true, false);
        if (e.preventDefault) { e.preventDefault(); }
        return false;
      });
    }
    $("a[rel^='lightmodal']:not(.lightbox-processed), area[rel^='lightmodal']:not(.lightbox-processed)", context).addClass('lightbox-processed').click(function(e) {
      $('#lightbox').unbind('click');
      // Add classes from the link to the lightbox div - don't include lightbox-processed
      $('#lightbox').addClass($(this).attr('class'));
      $('#lightbox').removeClass('lightbox-processed');
      Lightbox.start(this, false, false, false, true);
      if (e.preventDefault) { e.preventDefault(); }
      return false;
    });
    $("#lightboxAutoModal:not(.lightbox-processed)", context).addClass('lightbox-processed').click(function(e) {
      Lightbox.auto_modal = true;
      $('#lightbox').unbind('click');
      Lightbox.start(this, false, false, false, true);
      if (e.preventDefault) { e.preventDefault(); }
      return false;
    });
  },

  // start()
  // Display overlay and lightbox. If image is part of a set, add siblings to
  // imageArray.
  start: function(imageLink, slideshow, lightframe, lightvideo, lightmodal) {

    Lightbox.isPaused = !Lightbox.autoStart;

    // Replaces hideSelectBoxes() and hideFlash() calls in original lightbox2.
    Lightbox.toggleSelectsFlash('hide');

    // Stretch overlay to fill page and fade in.
    var arrayPageSize = Lightbox.getPageSize();
    $("#lightbox2-overlay").hide().css({
      'width': '100%',
      'zIndex': '10090',
      'height': arrayPageSize[1] + 'px',
      'backgroundColor' : '#' + Lightbox.overlayColor
    });
    // Detect OS X FF2 opacity + flash issue.
    if (lightvideo && this.detectMacFF2()) {
      $("#lightbox2-overlay").removeClass("overlay_default");
      $("#lightbox2-overlay").addClass("overlay_macff2");
      $("#lightbox2-overlay").css({'opacity' : null});
    }
    else {
      $("#lightbox2-overlay").removeClass("overlay_macff2");
      $("#lightbox2-overlay").addClass("overlay_default");
      $("#lightbox2-overlay").css({'opacity' : Lightbox.overlayOpacity});
    }
    $("#lightbox2-overlay").fadeIn(Lightbox.fadeInSpeed);


    Lightbox.isSlideshow = slideshow;
    Lightbox.isLightframe = lightframe;
    Lightbox.isVideo = lightvideo;
    Lightbox.isModal = lightmodal;
    Lightbox.imageArray = [];
    Lightbox.imageNum = 0;

    var anchors = $(imageLink.tagName);
    var anchor = null;
    var rel_parts = Lightbox.parseRel(imageLink);
    var rel = rel_parts["rel"];
    var rel_group = rel_parts["group"];
    var title = (rel_parts["title"] ? rel_parts["title"] : imageLink.title);
    var rel_style = null;
    var i = 0;

    if (rel_parts["flashvars"]) {
      Lightbox.flvFlashvars = Lightbox.flvFlashvars + '&' + rel_parts["flashvars"];
    }

    // Set the title for image alternative text.
    var alt = imageLink.title;
    if (!alt) {
      var img = $(imageLink).find("img");
      if (img && $(img).attr("alt")) {
        alt = $(img).attr("alt");
      }
      else {
        alt = title;
      }
    }

    if ($(imageLink).attr('id') == 'lightboxAutoModal') {
      rel_style = rel_parts["style"];
      Lightbox.imageArray.push(['#lightboxAutoModal > *', title, alt, rel_style, 1]);
    }
    else {
      // Handle lightbox images with no grouping.
      if ((rel == 'lightbox' || rel == 'lightshow') && !rel_group) {
        Lightbox.imageArray.push([imageLink.href, title, alt]);
      }

      // Handle other items with no grouping.
      else if (!rel_group) {
        rel_style = rel_parts["style"];
        Lightbox.imageArray.push([imageLink.href, title, alt, rel_style]);
      }

      // Handle grouped items.
      else {

        // Loop through anchors and add them to imageArray.
        for (i = 0; i < anchors.length; i++) {
          anchor = anchors[i];
          if (anchor.href && typeof(anchor.href) == "string" && $(anchor).attr('rel')) {
            var rel_data = Lightbox.parseRel(anchor);
            var anchor_title = (rel_data["title"] ? rel_data["title"] : anchor.title);
            img_alt = anchor.title;
            if (!img_alt) {
              var anchor_img = $(anchor).find("img");
              if (anchor_img && $(anchor_img).attr("alt")) {
                img_alt = $(anchor_img).attr("alt");
              }
              else {
                img_alt = title;
              }
            }
            if (rel_data["rel"] == rel) {
              if (rel_data["group"] == rel_group) {
                if (Lightbox.isLightframe || Lightbox.isModal || Lightbox.isVideo) {
                  rel_style = rel_data["style"];
                }
                Lightbox.imageArray.push([anchor.href, anchor_title, img_alt, rel_style]);
              }
            }
          }
        }

        // Remove duplicates.
        for (i = 0; i < Lightbox.imageArray.length; i++) {
          for (j = Lightbox.imageArray.length-1; j > i; j--) {
            if (Lightbox.imageArray[i][0] == Lightbox.imageArray[j][0]) {
              Lightbox.imageArray.splice(j,1);
            }
          }
        }
        while (Lightbox.imageArray[Lightbox.imageNum][0] != imageLink.href) {
          Lightbox.imageNum++;
        }
      }
    }

    if (Lightbox.isSlideshow && Lightbox.showPlayPause && Lightbox.isPaused) {
      $('#lightshowPlay').show();
      $('#lightshowPause').hide();
    }

    // Calculate top and left offset for the lightbox.
    var arrayPageScroll = Lightbox.getPageScroll();
    var lightboxTop = arrayPageScroll[1] + (Lightbox.topPosition == '' ? (arrayPageSize[3] / 10) : Lightbox.topPosition) * 1;
    var lightboxLeft = arrayPageScroll[0];
    $('#frameContainer, #modalContainer, #lightboxImage').hide();
    $('#hoverNav, #prevLink, #nextLink, #frameHoverNav, #framePrevLink, #frameNextLink').hide();
    $('#imageDataContainer, #numberDisplay, #bottomNavZoom, #bottomNavZoomOut').hide();
    $('#outerImageContainer').css({'width': '250px', 'height': '250px'});
    $('#lightbox').css({
      'zIndex': '10500',
      'top': lightboxTop + 'px',
      'left': lightboxLeft + 'px'
    }).show();

    Lightbox.total = Lightbox.imageArray.length;
    Lightbox.changeData(Lightbox.imageNum);
  },

  // changeData()
  // Hide most elements and preload image in preparation for resizing image
  // container.
  changeData: function(imageNum, zoomIn) {

    if (Lightbox.inprogress === false) {
      if (Lightbox.total > 1 && ((Lightbox.isSlideshow && Lightbox.loopSlides) || (!Lightbox.isSlideshow && Lightbox.loopItems))) {
        if (imageNum >= Lightbox.total) imageNum = 0;
        if (imageNum < 0) imageNum = Lightbox.total - 1;
      }

      if (Lightbox.isSlideshow) {
        for (var i = 0; i < Lightbox.slideIdCount; i++) {
          window.clearTimeout(Lightbox.slideIdArray[i]);
        }
      }
      Lightbox.inprogress = true;
      Lightbox.activeImage = imageNum;

      if (Lightbox.disableResize && !Lightbox.isSlideshow) {
        zoomIn = true;
      }
      Lightbox.isZoomedIn = zoomIn;


      // Hide elements during transition.
      $('#loading').css({'zIndex': '10500'}).show();
      if (!Lightbox.alternative_layout) {
        $('#imageContainer').hide();
      }
      $('#frameContainer, #modalContainer, #lightboxImage').hide();
      $('#hoverNav, #prevLink, #nextLink, #frameHoverNav, #framePrevLink, #frameNextLink').hide();
      $('#imageDataContainer, #numberDisplay, #bottomNavZoom, #bottomNavZoomOut').hide();

      // Preload image content, but not iframe pages.
      if (!Lightbox.isLightframe && !Lightbox.isVideo && !Lightbox.isModal) {
        $("#lightbox #imageDataContainer").removeClass('lightbox2-alt-layout-data');
        imgPreloader = new Image();
        imgPreloader.onerror = function() { Lightbox.imgNodeLoadingError(this); };

        imgPreloader.onload = function() {
          var photo = document.getElementById('lightboxImage');
          photo.src = Lightbox.imageArray[Lightbox.activeImage][0];
          photo.alt = Lightbox.imageArray[Lightbox.activeImage][2];

          var imageWidth = imgPreloader.width;
          var imageHeight = imgPreloader.height;

          // Resize code.
          var arrayPageSize = Lightbox.getPageSize();
          var targ = { w:arrayPageSize[2] - (Lightbox.borderSize * 2), h:arrayPageSize[3] - (Lightbox.borderSize * 6) - (Lightbox.infoHeight * 4) - (arrayPageSize[3] / 10) };
          var orig = { w:imgPreloader.width, h:imgPreloader.height };

          // Image is very large, so show a smaller version of the larger image
          // with zoom button.
          if (zoomIn !== true) {
            var ratio = 1.0; // Shrink image with the same aspect.
            $('#bottomNavZoomOut, #bottomNavZoom').hide();
            if ((orig.w >= targ.w || orig.h >= targ.h) && orig.h && orig.w) {
              ratio = ((targ.w / orig.w) < (targ.h / orig.h)) ? targ.w / orig.w : targ.h / orig.h;
              if (!Lightbox.disableZoom && !Lightbox.isSlideshow) {
                $('#bottomNavZoom').css({'zIndex': '10500'}).show();
              }
            }

            imageWidth  = Math.floor(orig.w * ratio);
            imageHeight = Math.floor(orig.h * ratio);
          }

          else {
            $('#bottomNavZoom').hide();
            // Only display zoom out button if the image is zoomed in already.
            if ((orig.w >= targ.w || orig.h >= targ.h) && orig.h && orig.w) {
              // Only display zoom out button if not a slideshow and if the
              // buttons aren't disabled.
              if (!Lightbox.disableResize && Lightbox.isSlideshow === false && !Lightbox.disableZoom) {
                $('#bottomNavZoomOut').css({'zIndex': '10500'}).show();
              }
            }
          }

          photo.style.width = (imageWidth) + 'px';
          photo.style.height = (imageHeight) + 'px';
          Lightbox.resizeContainer(imageWidth, imageHeight);

          // Clear onLoad, IE behaves irratically with animated gifs otherwise.
          imgPreloader.onload = function() {};
        };

        imgPreloader.src = Lightbox.imageArray[Lightbox.activeImage][0];
        imgPreloader.alt = Lightbox.imageArray[Lightbox.activeImage][2];
      }

      // Set up frame size, etc.
      else if (Lightbox.isLightframe) {
        $("#lightbox #imageDataContainer").addClass('lightbox2-alt-layout-data');
        var src = Lightbox.imageArray[Lightbox.activeImage][0];
        $('#frameContainer').html('<iframe id="lightboxFrame" style="display: none;" src="'+src+'"></iframe>');

        // Enable swf support in Gecko browsers.
        if ($.browser.mozilla && src.indexOf('.swf') != -1) {
          setTimeout(function () {
            document.getElementById("lightboxFrame").src = Lightbox.imageArray[Lightbox.activeImage][0];
          }, 1000);
        }

        if (!Lightbox.iframe_border) {
          $('#lightboxFrame').css({'border': 'none'});
          $('#lightboxFrame').attr('frameborder', '0');
        }
        var iframe = document.getElementById('lightboxFrame');
        var iframeStyles = Lightbox.imageArray[Lightbox.activeImage][3];
        iframe = Lightbox.setStyles(iframe, iframeStyles);
        Lightbox.resizeContainer(parseInt(iframe.width, 10), parseInt(iframe.height, 10));
      }
      else if (Lightbox.isVideo || Lightbox.isModal) {
        $("#lightbox #imageDataContainer").addClass('lightbox2-alt-layout-data');
        var container = document.getElementById('modalContainer');
        var modalStyles = Lightbox.imageArray[Lightbox.activeImage][3];
        container = Lightbox.setStyles(container, modalStyles);
        if (Lightbox.isVideo) {
          Lightbox.modalHeight =  parseInt(container.height, 10) - 10;
          Lightbox.modalWidth =  parseInt(container.width, 10) - 10;
          Lightvideo.startVideo(Lightbox.imageArray[Lightbox.activeImage][0]);
        }
        Lightbox.resizeContainer(parseInt(container.width, 10), parseInt(container.height, 10));
      }
    }
  },

  // imgNodeLoadingError()
  imgNodeLoadingError: function(image) {
    var s = Drupal.settings.lightbox2;
    var original_image = Lightbox.imageArray[Lightbox.activeImage][0];
    if (s.display_image_size !== "") {
      original_image = original_image.replace(new RegExp("."+s.display_image_size), "");
    }
    Lightbox.imageArray[Lightbox.activeImage][0] = original_image;
    image.onerror = function() { Lightbox.imgLoadingError(image); };
    image.src = original_image;
  },

  // imgLoadingError()
  imgLoadingError: function(image) {
    var s = Drupal.settings.lightbox2;
    Lightbox.imageArray[Lightbox.activeImage][0] = s.default_image;
    image.src = s.default_image;
  },

  // resizeContainer()
  resizeContainer: function(imgWidth, imgHeight) {

    imgWidth = (imgWidth < Lightbox.minWidth ? Lightbox.minWidth : imgWidth);

    this.widthCurrent = $('#outerImageContainer').width();
    this.heightCurrent = $('#outerImageContainer').height();

    var widthNew = (imgWidth  + (Lightbox.borderSize * 2));
    var heightNew = (imgHeight  + (Lightbox.borderSize * 2));

    // Scalars based on change from old to new.
    this.xScale = ( widthNew / this.widthCurrent) * 100;
    this.yScale = ( heightNew / this.heightCurrent) * 100;

    // Calculate size difference between new and old image, and resize if
    // necessary.
    wDiff = this.widthCurrent - widthNew;
    hDiff = this.heightCurrent - heightNew;

    $('#modalContainer').css({'width': imgWidth, 'height': imgHeight});
    // Detect animation sequence.
    if (Lightbox.resizeSequence) {
      var animate1 = {width: widthNew};
      var animate2 = {height: heightNew};
      if (Lightbox.resizeSequence == 2) {
        animate1 = {height: heightNew};
        animate2 = {width: widthNew};
      }
      $('#outerImageContainer').animate(animate1, Lightbox.resizeSpeed).animate(animate2, Lightbox.resizeSpeed, 'linear', function() { Lightbox.showData(); });
    }
    // Simultaneous.
    else {
      $('#outerImageContainer').animate({'width': widthNew, 'height': heightNew}, Lightbox.resizeSpeed, 'linear', function() { Lightbox.showData(); });
    }

    // If new and old image are same size and no scaling transition is necessary
    // do a quick pause to prevent image flicker.
    if ((hDiff === 0) && (wDiff === 0)) {
      if ($.browser.msie) {
        Lightbox.pause(250);
      }
      else {
        Lightbox.pause(100);
      }
    }

    var s = Drupal.settings.lightbox2;
    if (!s.use_alt_layout) {
      $('#prevLink, #nextLink').css({'height': imgHeight + 'px'});
    }
    $('#imageDataContainer').css({'width': widthNew + 'px'});
  },

  // showData()
  // Display image and begin preloading neighbors.
  showData: function() {
    $('#loading').hide();

    if (Lightbox.isLightframe || Lightbox.isVideo || Lightbox.isModal) {
      Lightbox.updateDetails();
      if (Lightbox.isLightframe) {
        $('#frameContainer').show();
        if ($.browser.safari || Lightbox.fadeInSpeed === 0) {
          $('#lightboxFrame').css({'zIndex': '10500'}).show();
        }
        else {
          $('#lightboxFrame').css({'zIndex': '10500'}).fadeIn(Lightbox.fadeInSpeed);
        }
      }
      else {
        if (Lightbox.isVideo) {
          $("#modalContainer").html(Lightbox.modalHTML).click(function(){return false;}).css('zIndex', '10500').show();
        }
        else {
          var src = unescape(Lightbox.imageArray[Lightbox.activeImage][0]);
          if (Lightbox.imageArray[Lightbox.activeImage][4]) {
            $(src).appendTo("#modalContainer");
            $('#modalContainer').css({'zIndex': '10500'}).show();
          }
          else {
            // Use a callback to show the new image, otherwise you get flicker.
            $("#modalContainer").hide().load(src, function () {$('#modalContainer').css({'zIndex': '10500'}).show();});
          }
          $('#modalContainer').unbind('click');
        }
        // This might be needed in the Lightframe section above.
        //$('#modalContainer').css({'zIndex': '10500'}).show();
      }
    }

    // Handle display of image content.
    else {
      $('#imageContainer').show();
      if ($.browser.safari || Lightbox.fadeInSpeed === 0) {
        $('#lightboxImage').css({'zIndex': '10500'}).show();
      }
      else {
        $('#lightboxImage').css({'zIndex': '10500'}).fadeIn(Lightbox.fadeInSpeed);
      }
      Lightbox.updateDetails();
      this.preloadNeighborImages();
    }
    Lightbox.inprogress = false;

    // Slideshow specific stuff.
    if (Lightbox.isSlideshow) {
      if (!Lightbox.loopSlides && Lightbox.activeImage == (Lightbox.total - 1)) {
        if (Lightbox.autoExit) {
          Lightbox.slideIdArray[Lightbox.slideIdCount++] = setTimeout(function () {Lightbox.end('slideshow');}, Lightbox.slideInterval);
        }
      }
      else {
        if (!Lightbox.isPaused && Lightbox.total > 1) {
          Lightbox.slideIdArray[Lightbox.slideIdCount++] = setTimeout(function () {Lightbox.changeData(Lightbox.activeImage + 1);}, Lightbox.slideInterval);
        }
      }
      if (Lightbox.showPlayPause && Lightbox.total > 1 && !Lightbox.isPaused) {
        $('#lightshowPause').show();
        $('#lightshowPlay').hide();
      }
      else if (Lightbox.showPlayPause && Lightbox.total > 1) {
        $('#lightshowPause').hide();
        $('#lightshowPlay').show();
      }
    }

    // Adjust the page overlay size.
    var arrayPageSize = Lightbox.getPageSize();
    var arrayPageScroll = Lightbox.getPageScroll();
    var pageHeight = arrayPageSize[1];
    if (Lightbox.isZoomedIn && arrayPageSize[1] > arrayPageSize[3]) {
      var lightboxTop = (Lightbox.topPosition == '' ? (arrayPageSize[3] / 10) : Lightbox.topPosition) * 1;
      pageHeight = pageHeight + arrayPageScroll[1] + lightboxTop;
    }
    $('#lightbox2-overlay').css({'height': pageHeight + 'px', 'width': arrayPageSize[0] + 'px'});

    // Gecko browsers (e.g. Firefox, SeaMonkey, etc) don't handle pdfs as
    // expected.
    if ($.browser.mozilla) {
      if (Lightbox.imageArray[Lightbox.activeImage][0].indexOf(".pdf") != -1) {
        setTimeout(function () {
          document.getElementById("lightboxFrame").src = Lightbox.imageArray[Lightbox.activeImage][0];
        }, 1000);
      }
    }
  },

  // updateDetails()
  // Display caption, image number, and bottom nav.
  updateDetails: function() {

    $("#imageDataContainer").hide();

    var s = Drupal.settings.lightbox2;

    if (s.show_caption) {
      var caption = Lightbox.filterXSS(Lightbox.imageArray[Lightbox.activeImage][1]);
      if (!caption) caption = '';
      $('#caption').html(caption).css({'zIndex': '10500'}).show();
    }

    // If image is part of set display 'Image x of x'.
    var numberDisplay = null;
    if (s.image_count && Lightbox.total > 1) {
      var currentImage = Lightbox.activeImage + 1;
      if (!Lightbox.isLightframe && !Lightbox.isModal && !Lightbox.isVideo) {
        numberDisplay = s.image_count.replace(/\!current/, currentImage).replace(/\!total/, Lightbox.total);
      }
      else if (Lightbox.isVideo) {
        numberDisplay = s.video_count.replace(/\!current/, currentImage).replace(/\!total/, Lightbox.total);
      }
      else {
        numberDisplay = s.page_count.replace(/\!current/, currentImage).replace(/\!total/, Lightbox.total);
      }
      $('#numberDisplay').html(numberDisplay).css({'zIndex': '10500'}).show();
    }
    else {
      $('#numberDisplay').hide();
    }

    $("#imageDataContainer").hide().slideDown(Lightbox.slideDownSpeed, function() {
      $("#bottomNav").show();
    });
    if (Lightbox.rtl == 1) {
      $("#bottomNav").css({'float': 'left'});
    }
    Lightbox.updateNav();
  },

  // updateNav()
  // Display appropriate previous and next hover navigation.
  updateNav: function() {

    $('#hoverNav').css({'zIndex': '10500'}).show();
    var prevLink = '#prevLink';
    var nextLink = '#nextLink';

    // Slideshow is separated as we need to show play / pause button.
    if (Lightbox.isSlideshow) {
      if ((Lightbox.total > 1 && Lightbox.loopSlides) || Lightbox.activeImage !== 0) {
        $(prevLink).css({'zIndex': '10500'}).show().click(function() {
          if (Lightbox.pauseOnPrevClick) {
            Lightbox.togglePlayPause("lightshowPause", "lightshowPlay");
          }
          Lightbox.changeData(Lightbox.activeImage - 1); return false;
        });
      }
      else {
        $(prevLink).hide();
      }

      // If not last image in set, display next image button.
      if ((Lightbox.total > 1 && Lightbox.loopSlides) || Lightbox.activeImage != (Lightbox.total - 1)) {
        $(nextLink).css({'zIndex': '10500'}).show().click(function() {
          if (Lightbox.pauseOnNextClick) {
            Lightbox.togglePlayPause("lightshowPause", "lightshowPlay");
          }
          Lightbox.changeData(Lightbox.activeImage + 1); return false;
        });
      }
      // Safari browsers need to have hide() called again.
      else {
        $(nextLink).hide();
      }
    }

    // All other types of content.
    else {

      if ((Lightbox.isLightframe || Lightbox.isModal || Lightbox.isVideo) && !Lightbox.alternative_layout) {
        $('#frameHoverNav').css({'zIndex': '10500'}).show();
        $('#hoverNav').css({'zIndex': '10500'}).hide();
        prevLink = '#framePrevLink';
        nextLink = '#frameNextLink';
      }

      // If not first image in set, display prev image button.
      if ((Lightbox.total > 1 && Lightbox.loopItems) || Lightbox.activeImage !== 0) {
        // Unbind any other click handlers, otherwise this adds a new click handler
        // each time the arrow is clicked.
        $(prevLink).css({'zIndex': '10500'}).show().unbind().click(function() {
          Lightbox.changeData(Lightbox.activeImage - 1); return false;
        });
      }
      // Safari browsers need to have hide() called again.
      else {
        $(prevLink).hide();
      }

      // If not last image in set, display next image button.
      if ((Lightbox.total > 1 && Lightbox.loopItems) || Lightbox.activeImage != (Lightbox.total - 1)) {
        // Unbind any other click handlers, otherwise this adds a new click handler
        // each time the arrow is clicked.
        $(nextLink).css({'zIndex': '10500'}).show().unbind().click(function() {
          Lightbox.changeData(Lightbox.activeImage + 1); return false;
        });
      }
      // Safari browsers need to have hide() called again.
      else {
        $(nextLink).hide();
      }
    }

    // Don't enable keyboard shortcuts so forms will work.
    if (!Lightbox.isModal) {
      this.enableKeyboardNav();
    }
  },


  // enableKeyboardNav()
  enableKeyboardNav: function() {
    $(document).bind("keydown", this.keyboardAction);
  },

  // disableKeyboardNav()
  disableKeyboardNav: function() {
    $(document).unbind("keydown", this.keyboardAction);
  },

  // keyboardAction()
  keyboardAction: function(e) {
    if (e === null) { // IE.
      keycode = event.keyCode;
      escapeKey = 27;
    }
    else { // Mozilla.
      keycode = e.keyCode;
      escapeKey = e.DOM_VK_ESCAPE;
    }

    key = String.fromCharCode(keycode).toLowerCase();

    // Close lightbox.
    if (Lightbox.checkKey(Lightbox.keysClose, key, keycode)) {
      Lightbox.end('forceClose');
    }
    // Display previous image (p, <-).
    else if (Lightbox.checkKey(Lightbox.keysPrevious, key, keycode)) {
      if ((Lightbox.total > 1 && ((Lightbox.isSlideshow && Lightbox.loopSlides) || (!Lightbox.isSlideshow && Lightbox.loopItems))) || Lightbox.activeImage !== 0) {
        Lightbox.changeData(Lightbox.activeImage - 1);
      }

    }
    // Display next image (n, ->).
    else if (Lightbox.checkKey(Lightbox.keysNext, key, keycode)) {
      if ((Lightbox.total > 1 && ((Lightbox.isSlideshow && Lightbox.loopSlides) || (!Lightbox.isSlideshow && Lightbox.loopItems))) || Lightbox.activeImage != (Lightbox.total - 1)) {
        Lightbox.changeData(Lightbox.activeImage + 1);
      }
    }
    // Zoom in.
    else if (Lightbox.checkKey(Lightbox.keysZoom, key, keycode) && !Lightbox.disableResize && !Lightbox.disableZoom && !Lightbox.isSlideshow && !Lightbox.isLightframe) {
      if (Lightbox.isZoomedIn) {
        Lightbox.changeData(Lightbox.activeImage, false);
      }
      else if (!Lightbox.isZoomedIn) {
        Lightbox.changeData(Lightbox.activeImage, true);
      }
      return false;
    }
    // Toggle play / pause (space).
    else if (Lightbox.checkKey(Lightbox.keysPlayPause, key, keycode) && Lightbox.isSlideshow) {

      if (Lightbox.isPaused) {
        Lightbox.togglePlayPause("lightshowPlay", "lightshowPause");
      }
      else {
        Lightbox.togglePlayPause("lightshowPause", "lightshowPlay");
      }
      return false;
    }
  },

  preloadNeighborImages: function() {

    if ((Lightbox.total - 1) > Lightbox.activeImage) {
      preloadNextImage = new Image();
      preloadNextImage.src = Lightbox.imageArray[Lightbox.activeImage + 1][0];
    }
    if (Lightbox.activeImage > 0) {
      preloadPrevImage = new Image();
      preloadPrevImage.src = Lightbox.imageArray[Lightbox.activeImage - 1][0];
    }

  },

  end: function(caller) {
    var closeClick = (caller == 'slideshow' ? false : true);
    if (Lightbox.isSlideshow && Lightbox.isPaused && !closeClick) {
      return;
    }
    // To prevent double clicks on navigation links.
    if (Lightbox.inprogress === true && caller != 'forceClose') {
      return;
    }
    Lightbox.disableKeyboardNav();
    $('#lightbox').hide();
    $("#lightbox2-overlay").fadeOut();
    Lightbox.isPaused = true;
    Lightbox.inprogress = false;
    // Replaces calls to showSelectBoxes() and showFlash() in original
    // lightbox2.
    Lightbox.toggleSelectsFlash('visible');
    if (Lightbox.isSlideshow) {
      for (var i = 0; i < Lightbox.slideIdCount; i++) {
        window.clearTimeout(Lightbox.slideIdArray[i]);
      }
      $('#lightshowPause, #lightshowPlay').hide();
    }
    else if (Lightbox.isLightframe) {
      $('#frameContainer').empty().hide();
    }
    else if (Lightbox.isVideo || Lightbox.isModal) {
      if (!Lightbox.auto_modal) {
        $('#modalContainer').hide().html("");
      }
      Lightbox.auto_modal = false;
    }
  },


  // getPageScroll()
  // Returns array with x,y page scroll values.
  // Core code from - quirksmode.com.
  getPageScroll : function() {

    var xScroll, yScroll;

    if (self.pageYOffset || self.pageXOffset) {
      yScroll = self.pageYOffset;
      xScroll = self.pageXOffset;
    }
    else if (document.documentElement && (document.documentElement.scrollTop || document.documentElement.scrollLeft)) {  // Explorer 6 Strict.
      yScroll = document.documentElement.scrollTop;
      xScroll = document.documentElement.scrollLeft;
    }
    else if (document.body) {// All other Explorers.
      yScroll = document.body.scrollTop;
      xScroll = document.body.scrollLeft;
    }

    arrayPageScroll = [xScroll,yScroll];
    return arrayPageScroll;
  },

  // getPageSize()
  // Returns array with page width, height and window width, height.
  // Core code from - quirksmode.com.
  // Edit for Firefox by pHaez.

  getPageSize : function() {

    var xScroll, yScroll;

    if (window.innerHeight && window.scrollMaxY) {
      xScroll = window.innerWidth + window.scrollMaxX;
      yScroll = window.innerHeight + window.scrollMaxY;
    }
    else if (document.body.scrollHeight > document.body.offsetHeight) { // All but Explorer Mac.
      xScroll = document.body.scrollWidth;
      yScroll = document.body.scrollHeight;
    }
    else { // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari.
      xScroll = document.body.offsetWidth;
      yScroll = document.body.offsetHeight;
    }

    var windowWidth, windowHeight;

    if (self.innerHeight) { // All except Explorer.
      if (document.documentElement.clientWidth) {
        windowWidth = document.documentElement.clientWidth;
      }
      else {
        windowWidth = self.innerWidth;
      }
      windowHeight = self.innerHeight;
    }
    else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode.
      windowWidth = document.documentElement.clientWidth;
      windowHeight = document.documentElement.clientHeight;
    }
    else if (document.body) { // Other Explorers.
      windowWidth = document.body.clientWidth;
      windowHeight = document.body.clientHeight;
    }
    // For small pages with total height less than height of the viewport.
    if (yScroll < windowHeight) {
      pageHeight = windowHeight;
    }
    else {
      pageHeight = yScroll;
    }
    // For small pages with total width less than width of the viewport.
    if (xScroll < windowWidth) {
      pageWidth = xScroll;
    }
    else {
      pageWidth = windowWidth;
    }
    arrayPageSize = new Array(pageWidth,pageHeight,windowWidth,windowHeight);
    return arrayPageSize;
  },


  // pause(numberMillis)
  pause : function(ms) {
    var date = new Date();
    var curDate = null;
    do { curDate = new Date(); }
    while (curDate - date < ms);
  },


  // toggleSelectsFlash()
  // Hide / unhide select lists and flash objects as they appear above the
  // lightbox in some browsers.
  toggleSelectsFlash: function (state) {
    if (state == 'visible') {
      $("select.lightbox_hidden, embed.lightbox_hidden, object.lightbox_hidden").show();
    }
    else if (state == 'hide') {
      $("select:visible, embed:visible, object:visible").not('#lightboxAutoModal select, #lightboxAutoModal embed, #lightboxAutoModal object').addClass("lightbox_hidden");
      $("select.lightbox_hidden, embed.lightbox_hidden, object.lightbox_hidden").hide();
    }
  },


  // parseRel()
  parseRel: function (link) {
    var parts = [];
    parts["rel"] = parts["title"] = parts["group"] = parts["style"] = parts["flashvars"] = null;
    if (!$(link).attr('rel')) return parts;
    parts["rel"] = $(link).attr('rel').match(/\w+/)[0];

    if ($(link).attr('rel').match(/\[(.*)\]/)) {
      var info = $(link).attr('rel').match(/\[(.*?)\]/)[1].split('|');
      parts["group"] = info[0];
      parts["style"] = info[1];
      if (parts["style"] != undefined && parts["style"].match(/flashvars:\s?(.*?);/)) {
        parts["flashvars"] = parts["style"].match(/flashvars:\s?(.*?);/)[1];
      }
    }
    if ($(link).attr('rel').match(/\[.*\]\[(.*)\]/)) {
      parts["title"] = $(link).attr('rel').match(/\[.*\]\[(.*)\]/)[1];
    }
    return parts;
  },

  // setStyles()
  setStyles: function(item, styles) {
    item.width = Lightbox.iframe_width;
    item.height = Lightbox.iframe_height;
    item.scrolling = "auto";

    if (!styles) return item;
    var stylesArray = styles.split(';');
    for (var i = 0; i< stylesArray.length; i++) {
      if (stylesArray[i].indexOf('width:') >= 0) {
        var w = stylesArray[i].replace('width:', '');
        item.width = jQuery.trim(w);
      }
      else if (stylesArray[i].indexOf('height:') >= 0) {
        var h = stylesArray[i].replace('height:', '');
        item.height = jQuery.trim(h);
      }
      else if (stylesArray[i].indexOf('scrolling:') >= 0) {
        var scrolling = stylesArray[i].replace('scrolling:', '');
        item.scrolling = jQuery.trim(scrolling);
      }
      else if (stylesArray[i].indexOf('overflow:') >= 0) {
        var overflow = stylesArray[i].replace('overflow:', '');
        item.overflow = jQuery.trim(overflow);
      }
    }
    return item;
  },


  // togglePlayPause()
  // Hide the pause / play button as appropriate.  If pausing the slideshow also
  // clear the timers, otherwise move onto the next image.
  togglePlayPause: function(hideId, showId) {
    if (Lightbox.isSlideshow && hideId == "lightshowPause") {
      for (var i = 0; i < Lightbox.slideIdCount; i++) {
        window.clearTimeout(Lightbox.slideIdArray[i]);
      }
    }
    $('#' + hideId).hide();
    $('#' + showId).show();

    if (hideId == "lightshowPlay") {
      Lightbox.isPaused = false;
      if (!Lightbox.loopSlides && Lightbox.activeImage == (Lightbox.total - 1)) {
        Lightbox.end();
      }
      else if (Lightbox.total > 1) {
        Lightbox.changeData(Lightbox.activeImage + 1);
      }
    }
    else {
      Lightbox.isPaused = true;
    }
  },

  triggerLightbox: function (rel_type, rel_group) {
    if (rel_type.length) {
      if (rel_group && rel_group.length) {
        $("a[rel^='" + rel_type +"\[" + rel_group + "\]'], area[rel^='" + rel_type +"\[" + rel_group + "\]']").eq(0).trigger("click");
      }
      else {
        $("a[rel^='" + rel_type +"'], area[rel^='" + rel_type +"']").eq(0).trigger("click");
      }
    }
  },

  detectMacFF2: function() {
    var ua = navigator.userAgent.toLowerCase();
    if (/firefox[\/\s](\d+\.\d+)/.test(ua)) {
      var ffversion = new Number(RegExp.$1);
      if (ffversion < 3 && ua.indexOf('mac') != -1) {
        return true;
      }
    }
    return false;
  },

  checkKey: function(keys, key, code) {
    return (jQuery.inArray(key, keys) != -1 || jQuery.inArray(String(code), keys) != -1);
  },

  filterXSS: function(str, allowed_tags) {
    var output = "";
    $.ajax({
      url: Drupal.settings.basePath + 'system/lightbox2/filter-xss',
      data: {
        'string' : str,
        'allowed_tags' : allowed_tags
      },
      type: "POST",
      async: false,
      dataType:  "json",
      success: function(data) {
        output = data;
      }
    });
    return output;
  }

};

// Initialize the lightbox.
Drupal.behaviors.initLightbox = function (context) {
  $('body:not(.lightbox-processed)', context).addClass('lightbox-processed').each(function() {
    Lightbox.initialize();
    return false; // Break the each loop.
  });

  // Attach lightbox to any links with lightbox rels.
  Lightbox.initList(context);
  $('#lightboxAutoModal', context).triggerHandler('click');
};

;
// $Id: mollom.js,v 1.2.2.13 2010/08/07 02:49:44 dries Exp $
(function ($) {

/**
 * Open Mollom privacy policy link in a new window.
 *
 * Required for valid XHTML Strict markup.
 */
Drupal.behaviors.mollomPrivacy = function (context) {
  $('.mollom-privacy a', context).click(function () {
    this.target = '_blank';
  });
};

/**
 * Attach click event handlers for CAPTCHA links.
 */
Drupal.behaviors.mollomCaptcha = function (context) {
  $('a.mollom-switch-captcha', context).click(getMollomCaptcha);
};

/**
 * Fetch a Mollom CAPTCHA and output the image or audio into the form.
 */
function getMollomCaptcha() {
  // Get the current requested CAPTCHA type from the clicked link.
  var newCaptchaType = $(this).hasClass('mollom-audio-captcha') ? 'audio' : 'image';

  var context = $(this).parents('form');

  // Extract the Mollom session id from the form.
  var mollomSessionId = $('input.mollom-session-id', context).val();

  // Retrieve a CAPTCHA:
  $.getJSON(Drupal.settings.basePath + 'mollom/captcha/' + newCaptchaType + '/' + mollomSessionId,
    function (data) {
      if (!(data && data.content)) {
        return;
      }
      // Inject new CAPTCHA.
      $('.mollom-captcha-content', context).parent().html(data.content);
      // Update session id.
      $('input.mollom-session-id', context).val(data.session_id);
      // Add an onclick-event handler for the new link.
      Drupal.attachBehaviors(context);
      // Focus on the CATPCHA input.
      $('input[name="mollom[captcha]"]', context).focus();
    }
  );
  return false;
}

})(jQuery);
;
if (Drupal.jsEnabled) {
  $(document).ready(function() {
    if($('#edit-base-data').val() == 'comments') {
      $("#edit-abuse-reason-wrapper").slideUp('fast');
    }

    $("#edit-base-data").change(function() {
        $("#edit-base-data option:selected").each(function () {
          if ($(this).text() == 'Abuse reports') {
            $("#edit-abuse-reason-wrapper").slideDown('fast');
            $("#edit-abuse-reason").removeAttr("disabled");
          }
          else {
            $("#edit-abuse-reason").attr("disabled","disabled");
            $("#edit-abuse-reason-wrapper").slideUp('fast');
          }
        });
    });
    
    // Add an error message if there are more then 5,000 chars in the comment on comment textarea    
    commentMaxlength("edit-comment", 5000, "#comment-form-buttons", "commentform");
  });

  function commentMaxlength(element_id, maxlength, insBeforeElmt, caller) {
    var element      = $('#' + element_id);
    var element_form = element.parents('form');
    var submit_btn   = element_form.find('#edit-submit');
    var preview_btn  = element_form.find('#edit-preview');
    var error_div    = 0;

    // If there is nothing in the element, disable the form.
    if (element.val() == '') {
      submit_btn.attr('disabled', 'disabled');
      preview_btn.attr('disabled', 'disabled');
    }

    // Check for keypresses, and see if we can re-enable it.
    element.bind('keyup', function() {
      if (element.val().length > maxlength) {
        // The following line of code will truncate the entered text at the maxlength, removing
        // $("#" + element_id).val($("#" + element_id).val().substr(0,maxlength));
        if (error_div == 0) {
          var error_msg = 'You have exceeded ' + numberFormat(maxlength) + ' characters.';
          error_div = $('<div id="' + element_id + '_error" class="form-error">' + error_msg + '</div>');
          $(insBeforeElmt).before(error_div);
        }
        // Only disable the comment form when the maxlength is passed.
        if (caller == 'commentform') {
          submit_btn.attr('disabled', 'disabled');
          preview_btn.attr('disabled', 'disabled');
        }
      } else if (caller == 'commentform' && $.trim(element.val()) == "") {
         if (error_div != 0) {
           error_div.remove();
           error_div = 0;
         }
         submit_btn.attr('disabled', 'disabled');
         preview_btn.attr('disabled', 'disabled');
      } else {
        // Remove the error (if exists) when the number of chars is less or equal to the maxlength
        if (error_div != 0) {
           error_div.remove();
           error_div = 0;
        }
        submit_btn.removeAttr('disabled');
        preview_btn.removeAttr('disabled');
      }
    });
  }
  
  //This function formats numbers by adding commas
  function numberFormat(nStr){
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1))
      x1 = x1.replace(rgx, '$1' + ',' + '$2');
    return x1 + x2;
  }
}
;
var winStatus = 1;
var downtimer = null;
var nextStatus = null;
var hoverStatus = false;
// $.cookie("popupState", null); // NOTE: uncomment this for debugging to clear cookies on reload

function setupButton() {
    $("div#hide_btn").click(function(){
      $(".pop_up").stop();
      hoverStatus = false;
      clearTimeout(downtimer);
      nextStatus = 0;
      $(".pop_up").animate({bottom:-180},2000,'swing',function(){
        winStatus = nextStatus;
        nextStatus = null;
      });
      $.cookie("popupState", -1, {expires: 1});
    });

    $("div#up_arrow").click(function(){
        $(".pop_up").stop();
        if(winStatus == 0){
        nextStatus = 1;
        $(".pop_up").animate({bottom:90},1500,'swing',function(){
          $("div#up_arrow").hide();
          $("div#down_arrow").show();
          winStatus = nextStatus;
          nextStatus = null;
        });
        $.cookie("popupState", 1, {expires: 1});
      }

    });

    $("div#down_arrow").click(function(){
        $(".pop_up").stop();
        if(winStatus > 0){
        nextStatus = 0;
        $(".pop_up").animate({bottom:-102},1500,'swing',function(){
          $("div#up_arrow").show();
          $("div#down_arrow").hide();
          winStatus = nextStatus;
          nextStatus = null;
        });
        $.cookie("popupState", 0, {expires: 1});
      }
    });


    $("div#top_main").click(function(){
        $(".pop_up").stop();
        if(winStatus > 0){
        nextStatus = 0;
        $(".pop_up").animate({bottom:-102},1500,'swing',function(){
          $("div#up_arrow").show();
          $("div#down_arrow").hide();
          winStatus = nextStatus;
          nextStatus = null;
        });
        $.cookie("popupState", 0, {expires: 1});
      } else if(winStatus == 0){
          nextStatus = 1;
          $(".pop_up").animate({bottom:90},1500,'swing',function(){
            $("div#up_arrow").hide();
            $("div#down_arrow").show();
            winStatus = nextStatus;
            nextStatus = null;
          });
          $.cookie("popupState", 1, {expires: 1});
        }


    });
	}


function startPopUp(){
    if ($.cookie("popupState") == 1 || $.cookie("popupState") == null){
        nextStatus = 1;
		$("div#down_arrow").hide();//AR
      $(".pop_up").animate({bottom:90},2000,'swing',function(){
        $("div#up_arrow").hide();
        $("div#form_bg").hide();
        $("div.form_holder").hide();
		$("div#down_arrow").show();//AR
        $("div#submit_btn").hide();
        downtimer = setTimeout(autoDown, 5000);
        hoverStatus = true;
        winStatus = nextStatus;
        nextStatus = null;
        setupButton();});
    }

    if ($.cookie("popupState") == 0){
      $("div#up_arrow").show();
      $("div#down_arrow").hide();
      $("div#form_bg").hide();
      $("div.form_holder").hide();
      $("div#submit_btn").hide();
        nextStatus = 0;
      $(".pop_up").animate({bottom:-102},0,'swing',function(){
        setupButton();
        winStatus = nextStatus;
        nextStatus = null;
      });

    }

       $("div#main, div#top_main").hover(function(){
         if (hoverStatus){
               clearTimeout(downtimer);
         }
       },function(){
         if(hoverStatus){
               downtimer = setTimeout(autoDown, 5000);
         }
       });
}


$(document).ready(function(){
  setTimeout(startPopUp, 10000);
  var clearMePrevious = '';
  $('.clearMeFocus').focus(function(){
    if($(this).val()==$(this).attr('title')){
      clearMePrevious = $(this).val();
      $(this).val('');
    }
  });
  $('.clearMeFocus').blur(function(){
    if($(this).val()==''){
      $(this).val(clearMePrevious);
    }
  });
});


function autoDown(){
    nextStatus = 0;
    $(".pop_up").animate({bottom:-102},1000,'swing',function(){
      $("div#up_arrow").show();
      $("div#down_arrow").hide();
      hoverStatus = false;
      winStatus = nextStatus;
      nextStatus = null;
      setupButton();});
    $.cookie("popupState", 0, {expires: 1});
}

function launchPage(theURL)
{
  $.cookie("popupState", -1, {expires: 1});
  window.location = theURL;
};
var iPhone = false;
var iPad = false;


jQuery(window).load(function(){


	//Change these three variables to direct to appropriate pages
	var iPhoneLink = "itms://itunes.apple.com/us/app/the-economist-on-iphone/id400658551?mt=8";
	var iPadLink = "itms://itunes.apple.com/us/app/the-economist-on-ipad/id400660644?mt=8";
	var defaultLink = "http://www.economist.com/apps";


	var link = defaultLink;

	//detect platform
	if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i))) {
		iPhone = true;
		link = iPhoneLink;
	}

	if((navigator.userAgent.match(/iPad/i))){
		iPad = true;
		link = iPadLink;
	}


	//hide and disable the ad if the close button is clicked
	$(".overlay_close").click(function(event){
		$(".overlay_ad").css("visibility","hidden");
		$(".overlay_blackout").css("visibility","hidden")
	});

	//hide and disable the ad if the user tries to click the website below the
	//black background
	$(".overlay_blackout").click(function(event){
		$(".overlay_ad").css("visibility","hidden");
		$(".overlay_blackout").css("visibility","hidden")
	});

	//force the height of the semi- transparent black background.
	//this is to get around the 100% height problem
	$(".overlay_blackout").css("height",$(document).height());
	$(".overlay_blackout").css("width",$(document).width());



	$(".overlay_inner").click(function(event){
		window.location.href = link;
	});


 });


window.onorientationchange = function() {
  	$(".overlay_blackout").css("height",$(document).height());
	$(".overlay_blackout").css("width",$(document).width());
};
/* $Id: oo_engine_c.js,v 1.1 2009/11/16 13:41:04 cytefx Exp $ */
/* OnlineOpinion v4.1.7 */
/* This product and other products of OpinionLab, Inc. are protected by U.S. Patent No. 6606581, 6421724, 6785717 B1 and other patents pending. */
var OnlineOpinion=new Object();OnlineOpinion.util={SafeAddOnLoadEvent:function(func){if(!document.getElementById|!document.getElementsByTagName)return;var oldonload=window.onload;if(typeof window.onload!='function'){window.onload=func}else{window.onload=function(){oldonload();func()}}},SafeAddOnUnLoadEvent:function(func){if(!document.getElementById|!document.getElementsByTagName)return;var oldonunload=window.onunload;if(typeof window.onunload!='function'){window.onunload=func}else{window.onunload=function(){func();oldonunload()}}},popup:function(url,wname,wfeatures){var wpopup=window.open(url,wname,wfeatures);if(typeof wpopup=='undefined'){if(document.all){document.getElementById("test").href=url;document.getElementById("test").click()}else{var newWindow=window.open(url,'_g');newWindow.focus()}};return false},walkAnchors:function(node,depth,internal_links_re,ooObj){var MAX_NODES=1000;var count=0;while(node&&depth>0){count++;if(count>=MAX_NODES){var handler=function(){OnlineOpinion.util.walkAnchors(node,depth,internal_links_re,ooObj)};setTimeout(handler,50);return}if(node.tagName=="A"||node.tagName=="AREA"){if(internal_links_re.test(node.href)){node.onmousedown=function(){ooObj.Preferences.Plugins.Events.poX=0}}}if(node.tagName=="INPUT"){if(node.type=="submit"||node.type=="image"){node.onmousedown=function(){ooObj.Preferences.Plugins.Events.poX=0}}}if(node.tagName=="FORM"){if(typeof node.onsubmit!='function'){node.onsubmit=function(){ooObj.Preferences.Plugins.Events.poX=0}}else{var oldonsubmit=node.onsubmit;node.onsubmit=function(){ooObj.Preferences.Plugins.Events.poX=0;oldonsubmit()}}}if(node.nodeType==1){var skipre=/^(script|style|textarea)/i;if(!skipre.test(node.tagName)&&node.childNodes.length>0){node=node.childNodes[0];depth++;continue}}if(node.nextSibling){node=node.nextSibling}else{while(depth>0){node=node.parentNode;depth--;if(node==null)break;if(node.nextSibling){node=node.nextSibling;break}}}}},change_parent_url:function(url){document.location=url}};OnlineOpinion.cookie=function(){this.cookie_name='oo_r';this.expiration=24*60*60*1000;this.rhex=function(num){var hex_chr='0123456789abcdef',_3='';for(var j=0;j<=3;j++)_3+=hex_chr.charAt((num>>(j*8+4))&0x0F)+hex_chr.charAt((num>>(j*8))&0x0F);return _3};this.str2blks_MD5=function(_3){var nblk=((_3.length+8)>>6)+1,blks=new Array(nblk*16);var i=0;for(;i<nblk*16;i++)blks[i]=0;for(i=0;i<_3.length;i++)blks[i>>2]|=_3.charCodeAt(i)<<((i%4)*8);blks[i>>2]|=0x80<<((i%4)*8);blks[nblk*16-2]=_3.length*8;return blks};this._4=function(x,y){var lsw=(x&0xFFFF)+(y&0xFFFF),msw=(x>>16)+(y>>16)+(lsw>>16);return(msw<<16)|(lsw&0xFFFF)};this.rol=function(num,cnt){return(num<<cnt)|(num>>>(32-cnt))};this.cmn=function(q,a,b,x,s,t){return this._4(this.rol(this._4(this._4(a,q),this._4(x,t)),s),b)};this._0=function(a,b,c,d,x,s){return this.cmn((b&c)|((~b)&d),a,0,x,s,0)};this._1=function(a,b,c,d,x,s){return this.cmn((b&c)|(b&d)|(c&d),a,0,x,s,1518500249)};this._2=function(a,b,c,d,x,s){return this.cmn(b^c^d,a,0,x,s,1859775393)};this._6=function(_3){var x=this.str2blks_MD5(_3),a=1732584193,b=-271733879,c=-1732584194,d=271733878;for(var i=0;i<x.length;i+=16){var olda=a,oldb=b,oldc=c,oldd=d;a=this._0(a,b,c,d,x[i+0],3);d=this._0(d,a,b,c,x[i+1],7);c=this._0(c,d,a,b,x[i+2],11);b=this._0(b,c,d,a,x[i+3],19);a=this._0(a,b,c,d,x[i+4],3);d=this._0(d,a,b,c,x[i+5],7);c=this._0(c,d,a,b,x[i+6],11);b=this._0(b,c,d,a,x[i+7],19);a=this._0(a,b,c,d,x[i+8],3);d=this._0(d,a,b,c,x[i+9],7);c=this._0(c,d,a,b,x[i+10],11);b=this._0(b,c,d,a,x[i+11],19);a=this._0(a,b,c,d,x[i+12],3);d=this._0(d,a,b,c,x[i+13],7);c=this._0(c,d,a,b,x[i+14],11);b=this._0(b,c,d,a,x[i+15],19);a=this._1(a,b,c,d,x[i+0],3);d=this._1(d,a,b,c,x[i+4],5);c=this._1(c,d,a,b,x[i+8],9);b=this._1(b,c,d,a,x[i+12],13);a=this._1(a,b,c,d,x[i+1],3);d=this._1(d,a,b,c,x[i+5],5);c=this._1(c,d,a,b,x[i+9],9);b=this._1(b,c,d,a,x[i+13],13);a=this._1(a,b,c,d,x[i+2],3);d=this._1(d,a,b,c,x[i+6],5);c=this._1(c,d,a,b,x[i+10],9);b=this._1(b,c,d,a,x[i+14],13);a=this._1(a,b,c,d,x[i+3],3);d=this._1(d,a,b,c,x[i+7],5);c=this._1(c,d,a,b,x[i+11],9);b=this._1(b,c,d,a,x[i+15],13);a=this._2(a,b,c,d,x[i+0],3);d=this._2(d,a,b,c,x[i+8],9);c=this._2(c,d,a,b,x[i+4],11);b=this._2(b,c,d,a,x[i+12],15);a=this._2(a,b,c,d,x[i+2],3);d=this._2(d,a,b,c,x[i+10],9);c=this._2(c,d,a,b,x[i+6],11);b=this._2(b,c,d,a,x[i+14],15);a=this._2(a,b,c,d,x[i+1],3);d=this._2(d,a,b,c,x[i+9],9);c=this._2(c,d,a,b,x[i+5],11);b=this._2(b,c,d,a,x[i+13],15);a=this._2(a,b,c,d,x[i+3],3);d=this._2(d,a,b,c,x[i+11],9);c=this._2(c,d,a,b,x[i+7],11);b=this._2(b,c,d,a,x[i+15],15);a=this._4(a,olda);b=this._4(b,oldb);c=this._4(c,oldc);d=this._4(d,oldd)}return this.rhex(a)+this.rhex(b)+this.rhex(c)+this.rhex(d)};this.read=function(n){var neq=n+"=";var ca=document.cookie.split(';');for(var i=0;i<ca.length;i++){var c=ca[i];while(c.charAt(0)==' ')c=c.substring(1,c.length);if(c.indexOf(neq)==0)return unescape(c.substring(neq.length,c.length))}return null};this.write=function(n,v){document.cookie=n+'='+v+';path=/;expires='+(new Date((new Date()).getTime()+this.expiration)).toGMTString()};this.matchurl=function(u,type){var i=0,c=this.read(this.cookie_name);if(type=='domain')u=window.location.hostname;n=this._6(u);if(c==null)return false;while(i<c.length){j=i+n.length;if(c.substring(i,j)==n){return(unescape(c.substring(j+1,j+2))==1)}i++}return false};this.tagurl=function(u,type){if(type=='domain')u=window.location.hostname;var prev_val="";if(this.read(this.cookie_name)!=null){prev_val=this.read(this.cookie_name).replace(eval('/'+escape(this._6(u))+'~1:/g'),'')}this.write(this.cookie_name,prev_val+(prev_val!=''?':':'')+escape(this._6(u))+'~1')}};function unescapeHTML(str){var div=document.createElement('div'),acc='';div.innerHTML=str.replace(/<\w+(\s+("[^"]*"|'[^']*'|[^>])+)?>|<\/\w+>/gi,'');for(var i=0;i<div.childNodes.length;i++){acc=acc+div.childNodes[i].nodeValue}return acc};OnlineOpinion.tleaf={get_session:function(c_name){if(document.cookie.length>0){c_start=document.cookie.indexOf(c_name+"=");if(c_start!=-1){c_start=c_start+c_name.length+1;c_end=document.cookie.indexOf(";",c_start);if(c_end==-1)c_end=document.cookie.length;return unescape(document.cookie.substring(c_start,c_end))}}return""}};OnlineOpinion.onPageCCSubmitted=false;OnlineOpinion.instanceCount=0;OnlineOpinion.renderOnPageCC=function(iframe_id,div_id,json_id){var oIframe=document.getElementById(iframe_id),oDoc=oIframe.contentDocument||oIframe.contentWindow.document;oDoc.open();oDoc.write(unescapeHTML(cc_html).replace("resize(_c('_d'));",''));var intervalID=window.setInterval(function(){if(oDoc.body){if(!window.opera)oDoc.close();window.clearInterval(intervalID);var innerBody=oDoc.body,innerDoc=oDoc||frames[iframe_id].document,onPageCCDiv=document.getElementById(div_id),innerHeight=window.innerHeight||document.documentElement.clientHeight,scrollBars=(innerBody.scrollHeight+1)>innerHeight,frameHeight=scrollBars?innerHeight-40:innerBody.scrollHeight+1;oIframe.style.height=frameHeight+'px';if(scrollBars)oIframe.style.width='555px';innerBody.style.border="none";onPageCCDiv.style.display='block';onPageCCDiv.style.visibility='visible';innerDoc.getElementById('CommentCard').onsubmit=function(){var form_elements=this.elements,form_data=[],jsonp=document.createElement('script');for(var i=form_elements.length-1;i>=0;i--){switch(form_elements[i].type){case'checkbox':case'radio':if(form_elements[i].checked)form_data.push(form_elements[i].name+'='+encodeURIComponent(form_elements[i].value));break;case'submit':break;default:form_data.push(form_elements[i].name+'='+encodeURIComponent(form_elements[i].value))}};if(innerDoc.getElementsByName('thank_you')[0].value!='1'){document.getElementById('onlineopinion_cc_overlay').style.display='none'}document.body.appendChild(jsonp);jsonp.src='https://secure.opinionlab.com/rate36_json.asp?'+form_data.join('&')+'&jsonp=OnlineOpinion.renderThankYou';onPageCCDiv.style.display='none';OnlineOpinion.onPageCCSubmitted=true;document.body.removeChild(document.getElementById(json_id));oIframe.id='';onPageCCDiv.id='';return false}}},1000)};OnlineOpinion.renderThankYou=function(markup){if(markup=='Thank you')return;var temp_markup=markup.replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,"'").replace(/&amp;/g,'&').replace("resize(_c('_d'))",'');var iframe=document.createElement('iframe'),cc_div=document.createElement('div'),close_link=document.createElement('a');iframe.className='onlineopinion_cc_frame';cc_div.className='onlineopinion_cc_div';cc_div.appendChild(iframe);document.body.appendChild(cc_div);cc_div.style.display='block';cc_div.style.visibility='hidden';var oDoc=iframe.contentDocument||iframe.contentWindow.document;oDoc.open();oDoc.write(temp_markup);var intervalID=window.setInterval(function(){if(oDoc.body){if(!window.opera)oDoc.close();window.clearInterval(intervalID);var innerBody=oDoc.body,innerDoc=oDoc||iframe.document;innerBody.style.border="none";var wWidth=window.innerWidth||document.body.clientWidth;if(!window.XMLHttpRequest)cc_div.style.position='absolute';cc_div.style.left=((wWidth-535)/2)+'px';iframe.style.height=(oDoc.body.scrollHeight+1)+'px';oDoc.getElementById('closeLink').getElementsByTagName('a')[0].onclick=function(){cc_div.style.display='none';document.getElementById('onlineopinion_cc_overlay').style.display='none'};close_link.onclick=function(){cc_div.style.display='none';document.getElementById('onlineopinion_cc_overlay').style.display='none'};close_link.href="javascript:void(0)";close_link.className="onlineopinion_cc_closelink";cc_div.insertBefore(close_link,iframe);if(navigator.userAgent.match(/(msie\s*([7-9]|\d{2}))|opera/i)){var onPageCCShadow=document.createElement("div"),onPageCCShadowTop=document.createElement("div"),onPageCCShadowBottom=document.createElement("div"),tempFrag=document.createDocumentFragment();onPageCCShadow.className='onlineopinion_cc_shadow';onPageCCShadowTop.className='onlineopinion_cc_shadow_top';onPageCCShadowBottom.className='onlineopinion_cc_shadow_bottom';tempFrag.appendChild(onPageCCShadow);tempFrag.appendChild(onPageCCShadowTop);tempFrag.appendChild(onPageCCShadowBottom);cc_div.appendChild(tempFrag)}cc_div.style.visibility='visible'}},1000)};OnlineOpinion.ocode=function(name){this.name=name;OnlineOpinion.instanceCount++;this.instanceNum=OnlineOpinion.instanceCount;function rematch(val,restr){var re=new RegExp(restr);var m=re.exec(val);if(m==null||m==''){return''}else{var s="";for(i=0;i<m.length;i++){s=s+m[i]}return s}};this._h=function(_7){_e=this._i+',\\/,\\.,-,_,'+this._j+',%2F,%2E,%2D,%5F';_8=_e.split(',');for(i=0;i<5;i++){eval('_7=_7.replace(/'+_8[i]+'/g,_8[i+5])')}return _7};this._9=function(){this.engine=null;this.version=null;var useragent=navigator.userAgent.toLowerCase();if(window.ActiveXObject){this.engine='ie';this.version=rematch(useragent,"msie\\s[0-9]\.[0-9]+").replace('msie ','')}else{if(window.opera){this.engine='opera';this.version=rematch(useragent,"opera.[0-9]\.[0-9]+").replace('opera','').replace('/','')}else{if(document.childNodes&&!document.all&&!navigator.taintEnabled){if(rematch(useragent,"applewebkit\/[0-9]+")!=null){this.engine='webkit';this.version=rematch(useragent,"applewebkit\/[0-9]+").replace('applewebkit/','')}else{this.engine='khtml';this.version=rematch(useragent,"khtml\/[0-9]\.[0-9]\.[0-9]+").replace('khtml/','')}}else if(document.getBoxObjectFor!=null){this.engine='gecko';this.version=rematch(useragent,"gecko/[0-9]+").replace('gecko/','')}else if(useragent.match('firefox')){this.engine='firefox';this.version=useragent.match(/firefox\/([0-9]\.[0-9])/)[1]}}}};this.serialize=function(obj,option){var str_out='',inc=0;for(var i in obj){if(typeof obj[i]!='function'&&typeof obj[i]!='undefined'&&obj[i]!=null&&obj[i]!=''){if(option==0){str_out+=(inc==0?'':'&')+i+'='+escape(obj[i])}else{if(option==1){str_out+=(inc==0?'':'|')+escape(obj[i])}}inc++}}return str_out};this._a=false;this.Preferences=new Object();this.Preferences.Persistence={enabled:true,cookie_type:'page',cookie_name:'oo_r',expiration:24*60*60*1000};this.Preferences.Render={type:'floating',main_div_id:'oo_feedback_float',img_path:'onlineopinion/oo_black.gif',feedback_html:'FEEDBACK',click_html:'Click here to<br>rate this page',ty_html:'',float_style:'fixed'};this.Metrics=new Object();this.Metrics.core={'width':screen.width,'height':screen.height,'referer':window.location.href,'prev':document.referrer,'time1':(new Date()).getTime(),'time2':null};this.Metrics.custom=new Object();this.Preferences.Plugins=new Object();this.Preferences.Plugins.Events={poE:0.0,onEntryDelay:0,poX:0.0,poC:{id:'',value:0.0},clickDelay:0,poWC:0.0};this.onEntry=function(){this._5();if(Math.random()>=1.0-this.Preferences.Plugins.Events.poE){if(this.Preferences.Plugins.Events.onEntryDelay){thisObj=this;setTimeout(function(){thisObj.show()},this.Preferences.Plugins.Events.onEntryDelay*1000)}else{this.show()}this.Preferences.Plugins.Events.poX=0.0}};this.onExit=function(){this._5();if(Math.random()>=1.0-this.Preferences.Plugins.Events.poX)this.show()};this.OnClick=function(){this._5();if(this.Preferences.Render.type=='inline'){this.show()}else if(Math.random()>=1.0-this.Preferences.Plugins.Events.poC){if(this.Preferences.Plugins.Events.clickDelay){thisObj=this;setTimeout(function(){thisObj.show()},this.Preferences.Plugins.Events.clickDelay*1000)}else{this.show()}this.Preferences.Plugins.Events.poX=0.0;this.Preferences.Plugins.Events.poC=0.0}};this.Preferences.Plugins.URLRewrite={active:false,full_url_rewrite:null,regex_search_pattern:'',regex_replace_pattern:''};this.Preferences.Plugins.CardOnPage={enabled:false};this._5=function(){if(this._a)return true;this._a=true;this.resetReferer();if(typeof OnlineOpinion.cookie!='undefined'&&this.Preferences.Persistence.cookie_type!=null){this.Cookie=new OnlineOpinion.cookie();if(typeof this.Preferences.Persistence.cookie_name!='undefined')this.Cookie.cookie_name=this.Preferences.Persistence.cookie_name;this.Cookie.expiration=1000*this.Preferences.Persistence.expiration;if(this.Cookie.matchurl(this.Metrics.core.referer,this.Preferences.Persistence.cookie_type)==1&&this.Preferences.Plugins.Events){this.Preferences.Plugins.Events.poX=0;this.Preferences.Plugins.Events.poE=0;return false}}else{this.Cookie=null}return true};this.render=function(onclick_func){this._5();this.Preferences.Render.main_div_id=this.Preferences.Render.main_div_id||'oo_feedback_'+this.instanceNum;var b=new this._9(),d=document,de=d.documentElement,db=d.body,w=window,divID=this.Preferences.Render.main_div_id,bVersion=parseFloat(b.version),compliant=d.compatMode=='CSS1Compat',sObj=compliant?de:db,tempContainer=document.createDocumentFragment();if(b.engine=="webkit"){sObj=db}if(b.engine==null||b.version==null||isNaN(parseInt(b.version,10))||(b.engine=='ie'&&parseFloat(b.version)<6)||(b.engine=='opera'&&parseInt(b.version,10)<8)||(b.engine=='gecko'&&parseInt(b.version,10)<20041107))return false;var mainDivObj=d.getElementById(divID);if(mainDivObj==null){if(this.Preferences.Render.type=='floating'){mainDivObj=d.createElement("div");mainDivObj.id=divID;mainDivObj.className='oo_feedback_float'}}if(mainDivObj.childNodes.length==0){if(this.Preferences.Render.type=='floating'){if(this.Preferences.Persistence.enabled&&this.Preferences.Persistence.cookie_type!=null){if(this.Cookie.matchurl(this.Metrics.core.referer,this.Preferences.Persistence.cookie_type)==1)return false}db.appendChild(mainDivObj);var olUpObj=tempContainer.appendChild(d.createElement("div"));olUpObj.className='olUp';olUpObj.tabIndex=0;olUpObj.onkeyup=function(e){e=e||window.event;if(e.keyCode!=13)return;onclick_func()};var olOverObj=tempContainer.appendChild(d.createElement("div"));olOverObj.className='olOver';if((b.engine=='ie'&&b.version<7||!compliant)&&this.Preferences.Render.click_html&&!this.Preferences.Render.disable_rollover){olUpObj.onmouseover=(function(olUpObj,olOverObj){return function(){olOverObj.style.display='block';olUpObj.style.display='none'}})(olUpObj,olOverObj);olOverObj.onmouseout=(function(olUpObj,olOverObj){return function(){olUpObj.style.display='block';olOverObj.style.display='none'}})(olUpObj,olOverObj)}if(this.Preferences.Render.img_path){var ooImg=olUpObj.appendChild(d.createElement("img"));ooImg.src=this.Preferences.Render.img_path}var fbText=olUpObj.appendChild(d.createElement("span"));fbText.className='fbText';fbText.innerHTML=this.Preferences.Render.feedback_html;if(this.Preferences.Render.transparent_background){var op_bg=olUpObj.appendChild(d.createElement("div"));op_bg.className='oo_transparent'}var feedback_text=null;if(this.Preferences.Render.div_alt_text){feedback_text=this.Preferences.Render.div_alt_text}else{if(document.all){feedback_text=fbText.innerText}else{feedback_text=fbText.textContent}}mainDivObj.alt=feedback_text;mainDivObj.title=feedback_text;olOverObj.innerHTML=this.Preferences.Render.click_html}if(this.Preferences.Render.type=='static'){mainDivObj.innerHTML=this.Preferences.Render.main_html}}mainDivObj.appendChild(tempContainer);if(this.Preferences.Render.type=='floating'){if(!this.Preferences.Render.float_style)this.Preferences.Render.float_style='fixed';var mdoStyle=mainDivObj.style,_b=this,floatStyle=this.Preferences.Render.float_style;if(floatStyle.match(/Content/)){var contentDiv=d.getElementById(_b.Preferences.Render.main_content_id||"content");if(contentDiv==null){floatStyle=this.Preferences.Render.float_style='fixed'}function getRightOfContent(){return contentDiv.offsetWidth+contentDiv.offsetLeft+1}function fixBackground(){if(_b.Preferences.Render.fix_background){db.style.backgroundAttachment="scroll";var margin=null;if(document.defaultView&&document.defaultView.getComputedStyle){margin=parseInt(document.defaultView.getComputedStyle(contentDiv,null).getPropertyValue("margin-left"),10)}else{margin=parseInt(contentDiv.currentStyle.marginLeft,10)}if(isNaN(margin)||margin==0){margin=contentDiv.offsetLeft||0}db.style.backgroundPosition=(Math.floor(contentDiv.scrollWidth*-0.5)-2+margin)+'px 0'}}}var handleIEQuirks=function(e){if(floatStyle.match(/^fixed/)){var newLeft=sObj.scrollLeft+sObj.clientWidth-mainDivObj.clientWidth;if(floatStyle=="fixedPreserveContent"&&newLeft<getRightOfContent()){newLeft=getRightOfContent()+'px'}else if(floatStyle=="fixedContentMax"&&(contentDiv.offsetWidth+mainDivObj.clientWidth)<sObj.clientWidth){newLeft=getRightOfContent()+'px'}mdoStyle.left=newLeft}else if(floatStyle=="rightOfContent"){mdoStyle.left=getRightOfContent()+'px'}mdoStyle.top=sObj.scrollTop+sObj.clientHeight-mainDivObj.clientHeight;var nullOrLoad=e==null||e.type=='load';if(nullOrLoad)mdoStyle.visibility='visible';if(nullOrLoad||e.type=='resize')fixBackground()};if(b.engine=='ie'&&(bVersion<7||!compliant)){mdoStyle.position='absolute';function mapEvents(target,events){for(var idx=0;idx<events.length;idx++){var curevent=events[idx];target.attachEvent("on"+curevent,handleIEQuirks)}};mapEvents(mainDivObj,["mouseover","mouseout"]);mapEvents(w,["resize","scroll"]);handleIEQuirks()}else{mdoStyle.position='fixed';var resizeMove=null;if(floatStyle.match(/^fixed/)){mdoStyle.right='0px';mdoStyle.bottom='0px';if(floatStyle=="fixedContentMax"){var maxContentWidth=contentDiv.offsetWidth+mainDivObj.offsetWidth;resizeMove=function(e){if(sObj.clientWidth>maxContentWidth){mdoStyle.left=getRightOfContent()-sObj.scrollLeft+'px';mdoStyle.right=null}else{mdoStyle.left=null;mdoStyle.right='0px'}}}}else if(floatStyle=="rightOfContent"){var rightOfContent=getRightOfContent()-sObj.scrollLeft+'px';mdoStyle.bottom='0px';mdoStyle.left=rightOfContent}if(floatStyle.match(/Content$/)){var preserve=floatStyle=="fixedPreserveContent";var gutter=d.createElement("div");db.replaceChild(gutter,mainDivObj);gutter.appendChild(mainDivObj);gutter.style.position="absolute";gutter.style.width=mainDivObj.offsetWidth+'px';gutter.style.right='0px';gutter.style.top='0px';gutter.style.height=sObj.scrollHeight+'px';resizeMove=function(e){var right=getRightOfContent();var runFix=false;if(preserve){var left=sObj.offsetWidth-mainDivObj.offsetWidth;if(left<=right)runFix=true}else{runFix=true}if(runFix){mdoStyle.left=right-sObj.scrollLeft+'px';if(e==null||e.type=='resize'){gutter.style.left=right+'px';fixBackground()}}else{gutter.style.right='0px';gutter.style.left=null;mdoStyle.right="0px";mdoStyle.left=null}}}if(resizeMove){if(b.engine=='ie'){w.attachEvent("onresize",resizeMove);w.attachEvent("onscroll",resizeMove)}else{w.addEventListener("resize",resizeMove,false);w.addEventListener("scroll",resizeMove,false)}resizeMove()}mainDivObj.style.visibility='visible'}}mainDivObj.onclick=onclick_func;return true};this.launchCC=function(){if(this.Cookie.matchurl(this.Metrics.core.referer,this.Preferences.Persistence.cookie_type)!=1){if(this.Preferences.Plugins.CardOnPage.enabled==true){if(this.Preferences.Plugins.CardOnPage.shown&&!OnlineOpinion.onPageCCSubmitted){var temp1=document.getElementById('onlineopinion_cc_div_'+this.instanceNum).style.display='block';var temp2=document.getElementById('onlineopinion_cc_overlay').style.display='block';temp2.onclick=this.hideCC(temp1,temp2)}else{var b=new this._9(),bVersion=parseFloat(b.version),d=document,db=document.body,de=d.documentElement,w=window,onPageCCdiv=db.appendChild(d.createElement("div")),onPageCCiframe=onPageCCdiv.appendChild(d.createElement("iframe")),onPageCCdivOverlay=d.getElementById("onlineopinion_cc_overlay")||db.appendChild(d.createElement("div")),close_link=d.createElement("a"),JSONP2=document.createElement("script");OnlineOpinion.CCcount++;onPageCCdivOverlay.id="onlineopinion_cc_overlay";onPageCCdiv.id='onlineopinion_cc_div_'+this.instanceNum;onPageCCdiv.className='onlineopinion_cc_div';onPageCCiframe.id='onlineopinion_iframe_'+this.instanceNum;onPageCCiframe.className='onlineopinion_cc_frame';onPageCCiframe.setAttribute("frameborder","0");if((b.engine=='ie'&&bVersion>=7)||b.engine=='opera'){var onPageCCShadow=d.createElement("div"),onPageCCShadowTop=d.createElement("div"),onPageCCShadowBottom=d.createElement("div"),tempFrag=d.createDocumentFragment();onPageCCShadow.className='onlineopinion_cc_shadow';onPageCCShadowTop.className='onlineopinion_cc_shadow_top';onPageCCShadowBottom.className='onlineopinion_cc_shadow_bottom';tempFrag.appendChild(onPageCCShadow);tempFrag.appendChild(onPageCCShadowTop);tempFrag.appendChild(onPageCCShadowBottom);onPageCCdiv.appendChild(tempFrag)}close_link.id='onlineopinion_cc_close_link_'+this.instanceNum;close_link.onclick=this.hideCC(onPageCCdiv,onPageCCdivOverlay);if(this.Preferences.Plugins.CardOnPage.overlay_close)onPageCCdivOverlay.onclick=this.hideCC(onPageCCdiv,onPageCCdivOverlay);close_link.href="javascript:void(0)";close_link.className="onlineopinion_cc_closelink";close_link.title=this.Preferences.Plugins.CardOnPage.close_link;onPageCCdiv.insertBefore(close_link,onPageCCiframe);var W=(b.engine=='webkit')?w.innerWidth:(b.engine=='opera'?db.clientWidth:de.clientWidth),H=(b.engine=='webkit')?w.innerHeight:(b.engine=='opera'?db.clientHeight:de.clientHeight),wx=535;onPageCCdiv.style.left=parseInt((W-wx)/2,10)+'px';if(this.Preferences.Plugins.CardOnPage.loader_path)onPageCCdivOverlay.style.backgroundImage='url('+this.Preferences.Plugins.CardOnPage.loader_path+')';JSONP2.id='onlineopinion_cc_jsonp_'+this.instanceNum;document.body.appendChild(JSONP2);if(!window.XMLHttpRequest){var blah=this;var interval=window.setInterval(function(){if(typeof(cc_html)!='undefined')window.clearInterval(interval);JSONP2.src='https://secure.opinionlab.com/ccc01/comment_card_json.asp?'+(blah.Preferences.Render.type=='asm'?'asm=1&':'')+blah.serialize(blah.Metrics.core,0)+'&custom_var='+blah.serialize(blah.Metrics.custom,1)+'&jsonp='+escape('OnlineOpinion.renderOnPageCC("'+onPageCCiframe.id+'","'+onPageCCdiv.id+'","'+JSONP2.id+'")')},1000)}JSONP2.src='https://secure.opinionlab.com/ccc01/comment_card_json.asp?'+(this.Preferences.Render.type=='asm'?'asm=1&':'')+this.serialize(this.Metrics.core,0)+'&custom_var='+this.serialize(this.Metrics.custom,1)+'&jsonp='+escape('OnlineOpinion.renderOnPageCC("'+onPageCCiframe.id+'","'+onPageCCdiv.id+'","'+JSONP2.id+'")');if(b.engine=='ie'&&bVersion<7){onPageCCdiv.style.position='absolute';onPageCCdivOverlay.style.position='absolute';onPageCCdivOverlay.style.height=document.documentElement.clientHeight+'px';onPageCCdivOverlay.style.width=document.documentElement.clientWidth+'px'}onPageCCdiv.style.visibility='hidden';onPageCCdiv.style.display='block';onPageCCdivOverlay.style.display='block';this.Preferences.Plugins.CardOnPage.shown=true;OnlineOpinion.onPageCCSubmitted=false}}else{var omtr_obj=typeof omtr_survey=='object'?this.serialize(omtr_survey,0):'';OnlineOpinion.util.popup('https://secure.opinionlab.com/ccc01/comment_card.asp?'+(this.Preferences.Render.type=='asm'?'asm=1&':'')+this.serialize(this.Metrics.core,0)+'&custom_var='+this.serialize(this.Metrics.custom,1)+omtr_obj,'OnlineOpinion','resizable=yes,copyhistory=yes,scrollbars='+(this.Preferences.Render.type=='asm'?'yes':'no')+',location=no,status=no,fullscreen=no,width=545,height=200,top='+parseInt((this.Metrics.core.height-200)/2,10)+',left='+parseInt((this.Metrics.core.width-545)/2,10))}}};this.hideCC=function(onPageCCdiv,onPageCCOverlay){return function(){var divs=typeof(document.getElementsByClassName)!='undefined'?document.getElementsByClassName('onlineopinion_cc_div'):getElementsByClass('onlineopinion_cc_div',null,null);for(var i=divs.length-1;i>=0;i--){divs[i].style.display='none'};onPageCCOverlay.style.display='none'};function getElementsByClass(searchClass,node,tag){var classElements=new Array();if(node==null)node=document;if(tag==null)tag='*';var els=node.getElementsByTagName(tag);var elsLen=els.length;var pattern=new RegExp("(^|\\s)"+searchClass+"(\\s|$)");for(i=0,j=0;i<elsLen;i++){if(pattern.test(els[i].className)){classElements[j]=els[i];j++}}return classElements}};this.show=function(){this._5();this.Metrics.core.time2=(new Date()).getTime();this.launchCC();if(this.Preferences.Persistence.enabled){var mdivid=document.getElementById(this.Preferences.Render.main_div_id);if(mdivid)mdivid.style.display='none'}if(this.Cookie!=null&&this.Preferences.Persistence.cookie_type!=null){this.Cookie.tagurl(this.Metrics.core.referer,this.Preferences.Persistence.cookie_type)}this.resetReferer()};this.resetReferer=function(alt_referer){var location=window.location.href;if(alt_referer)location=alt_referer;var rewriter=this.Preferences.Plugins.URLRewrite;if(rewriter&&rewriter.active==true){this.Metrics.core.referer=this.Preferences.Plugins.URLRewrite.full_url_rewrite||location.replace(rewriter.regex_search_pattern,rewriter.regex_replace_pattern)}else{this.Metrics.core.referer=location}};this.post=function(){this.Metrics.core.time2=(new Date()).getTime();var mainDivObj=document.getElementById(this.Preferences.Render.main_div_id);var JSONP=mainDivObj.appendChild(document.createElement("script"));var odata=this.serialize(this.Metrics.core,0)+'&custom_var='+this.serialize(this.Metrics.custom,1);var elements=document.forms[this.Preferences.Render.main_div_id+'_f'].elements;var formdata=[];for(idx=0;idx<elements.length;idx++){var curElement=elements[idx];try{var name=curElement.name;if(name!=undefined&&curElement.value!=undefined){switch(curElement.type){case"radio":if(curElement.checked)formdata.push(curElement.name+'='+encodeURIComponent(curElement.value));break;case"checkbox":if(curElement.checked)formdata.push(curElement.name+'='+encodeURIComponent(curElement.value));break;default:formdata.push(curElement.name+'='+encodeURIComponent(curElement.value))}}}catch(e){}}var cdata=formdata.join('&');var osignature=this.Cookie!=null?this.Cookie._6(odata):"";JSONP.src="https://secure.opinionlab.com/rate36s.asp?"+odata+"&"+cdata+"&signature="+osignature;if(this.Preferences.Persistence.enabled){var mainFormDiv=document.getElementById(this.Preferences.Render.main_div_id+"_f");mainFormDiv.style.display='none'}if(this.Preferences.Render.ty_html!=''){var TYDivObj=document.getElementById(this.Preferences.Render.ty_div_id);TYDivObj.innerHTML=this.Preferences.Render.ty_html;TYDivObj.style.display='block'}if(this.Cookie!=null&&this.Preferences.Persistence.cookie_type!=null){this.Cookie.tagurl(this.Metrics.core.referer,this.Preferences.Persistence.cookie_type)}this.resetReferer()}};
;
var random_ad_nr = generateRandomNumber();

function generateRandomNumber(){
  var random_num=Math.floor(Math.random()*999999999);
  return random_num;
}

Drupal.behaviors.ecAdsRemoveEmptyAds = function(context) {
  $('div.ec-ads-remove-if-empty', context).each(function() {
    var blankLink = $('a', this);
    var blankImg  = $('> img', blankLink);
    
    // All the below have to pass for this to be considered a "blank" ad.
    var blankAd = true;
    blankAd = blankAd && blankLink.length > 0; // Ad contains a link.
    blankAd = blankAd && blankLink.attr('href').indexOf('doubleclick') > -1; // It is a doubleclick link.
    blankAd = blankAd && blankImg.length == 1; // That link contains one image.
    blankAd = blankAd && blankImg.attr('src').indexOf('grey.gif') > -1; // The name of that image contains "grey.gif".
    blankAd = blankAd && (blankImg.width() == 1 && blankImg.height() == 1); // And, that gif is one by one.
    
    // Remove wrapper div around grey.gif images i.e. blank ads.
    if (blankAd) {
      $(this).remove();
    }
  });
};

Drupal.homepage = Drupal.homepage || {};

/**
 * Defines regions, selectors for finding those regions,
 * and a callback to generate Omniture data for links
 * within those regions
 */
Drupal.homepage.links = {
  highlights: {
    selector: ".homepage-highlight",
    callback: function(elem, i) {
      return 'home|highlight|' + i;
    }
  },
  hero: {
    selector: "#hero li",
    callback: function(elem, i) {
      return 'home|hero|' + i;
    }
  },
  touts: {
    selector: ".tout",
    callback: function(elem, i) {
      return 'home|touts|' + i;
    }
  },
  cover: {
    selector: ".tout-issue",
    callback: function(elem, i) {
      return 'home|cover|' + i;
    }
  },
  newspackages: {
    selector: ".homepage-package",
    callback: function(elem, i) {
      return 'home|newspackage|' + i;
    }
  },
  productsevents: {
    selector: "#product-events a",
    callback: function(elem, i) {
      return "home|productsevents|" + i;
    }
  },
  minimap: {
    selector: "#footer-index",
    callback: function(elem, i) {
      return "home|minimap|" + Drupal.homepage.sanitize(elem.text());
    }
  }
}

/**
 * Replace all non-word characters with an underscore
 */
Drupal.homepage.sanitize = function(str) {
  return str.replace(/[^\w]/ig, "_");
}

/**
 * Set the correct src for the cover image based on region
 */
Drupal.homepage.setRegionalCover = function(region) {
  // Get the correct image url
  var src = (region && region in Drupal.settings.regional_covers)
    ? Drupal.settings.regional_covers[region]
    : Drupal.settings.regional_covers['default'];
  
  // Set the cover image
  $("#cover-image").html($('<img />').attr({
    alt: Drupal.t('The Economist print cover'),
    title: Drupal.t('The Economist print cover'),
    src: src 
  }));
}

/**
 * Apply link tracking to all regions defined in Drupal.homepage.links
 */
Drupal.behaviors.homepageLinkTracking = function() {
  // We are proxying to the ec_omniture module.
  if (typeof Drupal.omniture.trackClick == "undefined") return;

  for (region in Drupal.homepage.links) {
    $(Drupal.homepage.links[region].selector).each(function(index) {
      var $this = $(this);
      // If the selector doesn't target links directly, find all links
      // that are children of the selector.
      var $links = $this.is('a') ? $this : $this.find('a');
      $links.each(function() {
        var $link = $(this);
        // Use the region callback to generate the correct data to send to Omniture.
        var data = Drupal.homepage.links[region].callback($link, index);
        // Track link.
        $link.click(function() {
          Drupal.omniture.trackClick(this, data, { link_track_vars: 'prop15' });
        });
      });
    });
  }
};

/**
 * Set the regional cover based on the user's geoip cookie.
 *
 * If the user gets a reverse proxy cached version of the page,
 * the geoip cookie will not have been set.  So we test for the
 * cookie here, and if it isn't set, we make a call to PHP
 * to set the correct cookie using the GeoIP database.
 */
Drupal.behaviors.homepageRegionalCover = function() {
  if (!$.cookie) {
    return;
  }
  
  var geoip = $.cookie('geoip');
  if (!geoip) {
    $.getJSON(Drupal.settings.basePath + "homepage/geoip", function(data) {
      var now = new Date;
      $.cookie('geoip', data.geoip, {
        expires: new Date(now.getFullYear() + 1, now.getMonth(), now.getDate())
      });
      Drupal.homepage.setRegionalCover(data.geoip);
    });
  }
  else {
    Drupal.homepage.setRegionalCover(geoip);
  }
}
;
/* OnlineOpinion (S3tS,1424b) */
/* This product and other products of OpinionLab, Inc. are protected by U.S. Patent No. 6606581, 6421724, 6785717 B1 and other patents pending. */
var custom_var,_sp='%3A\\/\\/',_rp='%3A//',_poE=0.0, _poX=0.0,_sH=screen.height,_d=document,_w=window,_ht=escape(_w.location.href),_hr=_d.referrer,_tm=(new Date()).getTime(),_kp=0,_sW=screen.width;_d.onkeypress=_fK;function _fK(_e){if(!_e)_e=_w.event;var _k=(typeof _e.which=='number')?_e.which:_e.keyCode;if((_kp==15&&_k==12))_w.open('https://dashboard.opinionlab.com/pv_controlboard.html?url='+_fC(_ht),'PageViewer','height=529,width=705,screenX='+((_sW-705)/2)+',screenY='+((_sH-529)/2)+',top='+((_sH-529)/2)+',left='+((_sW-705)/2)+',status=yes,toolbar=no,menubar=no,location=no,resizable=yes');_kp=_k};function _fC(_u){_aT=_sp+',\\/,\\.,-,_,'+_rp+',%2F,%2E,%2D,%5F';_aA=_aT.split(',');for(i=0;i<5;i++){eval('_u=_u.replace(/'+_aA[i]+'/g,_aA[i+5])')}return _u};function O_LC(){_w.open('https://secure.opinionlab.com/ccc01/comment_card.asp?time1='+_tm+'&time2='+(new Date()).getTime()+'&prev='+_fC(escape(_hr))+'&referer='+_fC(_ht)+'&height='+_sH+'&width='+_sW+'&custom_var='+custom_var,'comments','width=535,height=192,screenX='+((_sW-535)/2)+',screenY='+((_sH-192)/2)+',top='+((_sH-192)/2)+',left='+((_sW-535)/2)+',resizable=yes,copyhistory=yes,scrollbars=no')};function _fPe(){if(Math.random()>=1.0-_poE){O_LC();_poX=0.0}};function _fPx(){if(Math.random()>=1.0-_poX)O_LC()};window.onunload=_fPx;function O_GoT(_p){_d.write('<a href=\'javascript:O_LC()\'>'+_p+'</a>');_fPe()};
$(document).ready(function() {
  /* new masthead */
  

  $('div.close').click(function() {
    $('div.login-wrapper-open').addClass('login-wrapper-close').removeClass('login-wrapper-open');
  });

  $('li.log-in a').click(function(e) {
   e.preventDefault();
   if ($('div.login-wrapper-close').length) {
     $('div.login-wrapper-close').addClass('login-wrapper-open').removeClass('login-wrapper-close');
   }else{
     $('div.login-wrapper-open').addClass('login-wrapper-close').removeClass('login-wrapper-open');
   }
  });
  if (!Modernizr.input.placeholder) {
    var placheholder = $('#header-search input#qr').attr('placeholder');
    $('#header-search input#qr').val(placheholder);
    $('#header-search input#qr').focus(function() {
      if ($(this).val() == placheholder) {
        $(this).val('');
      }
    });
    $('#header-search input#qr').blur(function() {
      if (!$(this).val().length) {
        $(this).val(placheholder);
      }
    });
  }
});
;
$(document).ready(function(){
  
  /* for poor, ancient IE6 */
  $("ul#header-navigation-main li.non-drop:not('.active')").hover(function(){
    $(this).css('background-color', '#476E7E');
  },
  function(){
    $(this).css('background-color', 'transparent');
  });
  
  /* ditto */
  $('#header-navigation-main li ul.subnav li').hover(function(){
    $(this).css('background-color', '#e6ecee');
    $(this).css('cursor', 'pointer');
  },
  function(){
    $(this).css('background-color', 'transparent');
  });

  /* Remove non-js class from main navigation so css hover doesn't fire */
  $('ul#header-navigation-main.non-js').removeClass('non-js');
  
  function toggleSubNavOn() {
    /* Close any active subnavs before opening a new one. */
    $('#header-navigation-main li.highlighted').children('ul').hide();
    $('#header-navigation-main li.highlighted').removeClass('highlighted');
    
    if (!$(this).hasClass('active')) {
      $(this).children('ul').show();
      $(this).addClass('highlighted');
    }
  }

  function toggleSubNavOff() {
    if (!$(this).hasClass('active')) {
      $(this).children('ul').hide();
      $(this).removeClass('highlighted');
    }
  }

  /* Config options for hoverIntent. */
  var config = {
     over: toggleSubNavOn,
     timeout: 500,
     out: toggleSubNavOff
  };
  /* Target the top-level nav items. */
  $('body.world-menu li.world, body.business-menu li.business-finance, body.economics-menu li.economics').hoverIntent(config);
});
;

Drupal.behaviors.printerfriendly = function() {
  // If there is no printer friendly functionality for the specific node, disable
  // the link and display the browser print pop up.
  var defaultVersion = Drupal.settings.defaultversion;
  if (defaultVersion) {
    $("ul.ec-page-tools li.pt-print a").click(function(e){
      e.preventDefault();
      window.print();
    });
  }
};

Drupal.behaviors.emailAFriend = function(){

  // SHARE: Display the share-links by clicking on share
  $("li.pt-share a.pt-share-anchor").click(function(e){  
    e.preventDefault();
    $(this).parent().addClass("pt-share-changeico")
    $(this).next().addClass("pt-share-show");
  });
  $("ul.pt-share").mouseover(function(){  
    $(this).addClass("pt-share-show");
  });
  $("li.pt-share").mouseout(function(){  
    $("ul", this).removeClass("pt-share-show");
  });
  
  // RECOMMEND: Add ajax recommend functionality
  $("ul li.pt-recommend a").click(function(e){
    e.preventDefault();
    // Check if there are both the compact and expanded page tools on the page
    // if yes syncronize the recommend functionality so that by clicking on one it 
    // enables the other too.
    if (($("ul.ec-pt-compact").length) && ($("ul.ec-pt-expanded").length)) {
      elm = $("ul li.pt-recommend a");
    }
    else {
      elm = $(this);
    }
    rec_url = elm.attr("href") + '/ajax';
    $.ajax({
      type: "GET",
      url: rec_url,
      beforeSend: function(){elm.addClass('ajax-loader');},
      success: function(rec_nr){
        elmParent= elm.parent();
        elm.remove();
        elmParent.addClass("recommended").append("<span>Recommended (" + rec_nr + ")</span>");
      }
    });
  });  
  
  // RIGHTS & REPRINTS: add "in beta" pop over message
  $("ul li.pt-randr-grey").mouseover(function(e){
    if (!$("span.randr-na").length){
      $("#page").before("<span class='randr-na'>Not available on the beta site</span>"); 
      $("span.randr-na").css("left", e.pageX).css("top", e.pageY - 30);
    } 
  });
  $("ul li.pt-randr-grey").mouseout(function(){
   $("span.randr-na").remove();
  });
	// EMAIL A FRIEND: Display the email a friend form for the compact page-tools component 
  $("ul.ec-pt-compact li.pt-email a").click(function(e){
    e.preventDefault();
    // Remove the compact email a friend if it exists (like clicking on the close buttons)
    if ($("div.eaf-compact").length) {
      $("div.eaf-compact").remove();
    }
    else{
      if ($("div.eaf-expanded").length) {
        $("div.eaf-expanded").remove();
      }
      // Load the compact email a friend 
      $("ul.ec-pt-compact").after("<div class='ec-email-a-friend eaf-compact'></div>");    
      $(this).addClass("ajax-loader");
      $("div.eaf-compact").load($("ul.ec-page-tools li.pt-email a").attr("href") + "/ajax", function(){eaf_form_functionality('compact')});
    }
  });  
  // Display the email a friend form for the expanded page-tools component in node view
  $("ul.ec-pt-expanded li.pt-email a").not('ul.ec-pt-expanded-teaser li.pt-email a').click(function(e){
    e.preventDefault();
    // Remove the compact email a friend if it exists (like clicking on the close buttons)
     if ($("div.eaf-expanded").length) {
      $("div.eaf-expanded").remove();
    }
    else{
      if ($("div.eaf-compact").length) {
        $("div.eaf-compact").remove();
      }
      // Load the expanded email a friend 
      $("ul.ec-pt-expanded").after("<div class='ec-email-a-friend eaf-expanded eaf-expanded-node'></div>");    
      $(this).addClass("ajax-loader");
      $("div.eaf-expanded").load($(this).attr("href") +  "/ajax", function(){eaf_form_functionality('expanded')});    
    }
  });  
  // Display the email a friend form for the expanded page-tools component in teaser view
  $("ul.ec-pt-expanded-teaser li.pt-email a").click(function(e){
    e.preventDefault();
    // Remove the compact email a friend if it exists (like clicking on the close buttons)
     if ($("div.eaf-expanded-teaser").length) {
      $("div.eaf-expanded-teaser").remove();
      }
      // Load the expanded email a friend    
      $(this).parent().parent().after("<div class='ec-email-a-friend eaf-expanded eaf-expanded-teaser'></div>");    
      $(this).addClass("ajax-loader");
      $("div.eaf-expanded-teaser").load($(this).attr("href") +  "/ajax", function(){eaf_form_functionality('expanded')});
  });  
};
// EMAIL A FRIEND
function eaf_form_functionality(form) {
  if ($('div.ec-email-a-friend p.eaf-thanks').length) {
    // After 4 seconds, slowly fadeout and then remove the confirmation.
    setTimeout(function() {
      $('div.ec-email-a-friend p.eaf-thanks').fadeOut('slow', function() {
        $("div.ec-email-a-friend").remove();
      });
    }, 4000);
  }
  $("div.eaf-" + form + " div.eaf-close").click(function(){
    $("div.eaf-" + form).remove();
  });
  $("ul li.pt-email a").removeClass("ajax-loader");
  $("div.eaf-" + form + " input.eaf_submit_btn").click(function(e){   
    e.preventDefault();
    ec_eaf_submit(form);
  });
  if ($("input.error").length) {    
	  $("input.eaf_submit_btn").after("<div class='eaf-warning'><em>Some of the information you supplied appears to be incorrect.</em></div>");
  }
}
// EMAIL A FRIEND: ajax functionality
function ec_eaf_submit(form) {
  var url_eaf = $("form#ec-components-eaf").attr("action");
  
  // create the ajax submit functionality
  $.ajax({
    type: "POST",
    data: $("form#ec-components-eaf").serialize(),
    url: url_eaf,
    beforeSend: function(){
      if ($("div.eaf-warning").length) {
        $("div.eaf-warning").remove();
      }
      if (!$("span.ajax-working").length) {
        $("input.eaf_submit_btn").after("<span class='ajax-working'>Working...</span>");
      }
    },  
    success: function(html, XMLHttpRequest){    
      $("div.eaf-" + form + " form").remove();
      $("div.eaf-" + form).append(html);
      eaf_form_functionality(form);      
    }  
  });
}

// function for the rights and syndication functionality
function showRightsPopup(rl_url, title, pubdate, rights_content_id, type_id, dev, srTitle){
    var publication = 'economist';
    var titleText = title;
    var pubdate = pubdate;
    var contentid  = rights_content_id;
    var typeId = type_id;
    var orderBeanReset = dev;
    
    var linkurl = rl_url + "?publisherName=economist"
        + "&publication=" + publication
        + "&title=" + titleText
        + "&publicationDate=" + pubdate
        + "&contentID=" + contentid
        + "&type=" + typeId
        + "&orderBeanReset=" + orderBeanReset;

    if (typeId == "SR"){
      linkurl = linkurl + "&srTitle=" + srTitle;
    }

    rightsPopup = window.open(linkurl,"Rightslink","location=no,toolbar=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=650,height=550")
  };
$(document).ready(function(){  
  
  // POLL VOTE: Add ajax functionality
  $("#node-poll-article input#edit-vote").click(function(e){
    e.preventDefault();

    // create the set of data to be sent on form submission 
	  var data="choice=" + $('input[name=choice]:checked').val(); 
	  data += "&op=Submit+and+see+results"; 
	  data += "&form_build_id=" +  $('input[name="form_build_id"]').val();
	  data += "&form_token=" +  $('input[name="form_token"]').val();
	  data += "&ajax=true&form_id=poll_view_voting";

    var url_poll = $("form#poll-view-voting").attr("action");

    if ($('input[name=choice]:checked').val()){
	    $.ajax({
	    type: "POST",
	    data: data,
	    url: url_poll,
	    beforeSend: function(){
	      $("input#edit-vote").after("<span class='ajax-working'>Working...</span>");
	    },     
	    success: function(html, XMLHttpRequest){ 
 	      $("div#node-poll-article div.content").remove();
	      $("div#node-poll-article").append(html)
	      $("p.poll-feedback-link").append('<a href="javascript:O_LC()">Please leave additional feedback</a>');  
	    }  
		 });
	  }
  });  
});


;
(function($, Drupal) {

Drupal.behaviors.site_index = function(context) {
  var $context = $(context);
  
  if ($context.find('body').hasClass('site-index-processed')) {
    return;
  }
  
  $("li.site-index a").click(function(e) {
    var $overlay = $("<div id='site-map-overlay'></div>")
      .height(document.body.clientHeight)
      .insertBefore("#page");
    
    var $container = $('<div id="site-map-container"><span class="container-close" /><div id="site-map-box" /></div>')
      .appendTo('body');
      
    $("#site-map-box")
      .append("<span class='loader'>Working...</span>")
      .load("/content/site-index?ajax", function() {
        sortMap();
      });
    
    // Place the overlay box in the center of the screen.
    $container.css({
      top: $(window).scrollTop() + 30,
      left: $(window).width() / 2 - 427.5
    });
 
    // Close the overlay if either the grey area or the close icon is clicked.
    $overlay.click(function() {
      $container.remove();
      $overlay.remove();
    });
         
    $("span.container-close").click(function() {
      $container.remove();
      $overlay.remove();
    });
    
    return false;
  });
  
  $context.find('body').addClass('site-index-processed');
};

function sortMap() {
  // Remove loader image.
  $("span.loader").remove();
  
  // Remove opacity.
  $("#site-map-box div.list-box").css({
    "filter": "alpha(opacity=100)",
    "-moz-opacity": "1",
    "opacity": "1"
  });
  
  // Toggle the sorting of the site index window.
  $("a.site-map-ajax").click(function(e) {
    // Add transparency to site index window content.
    $("#site-map-box div.list-box").css({
      "filter": "alpha(opacity=20)",
      "-moz-opacity": "0.2",
      "opacity": "0.2"
    });
    
    // Load correct site index window content.
    $("#site-map-box")
      .append('<span class="loader">Working...</span>')
      .load($(this).attr("href") + '?ajax', function(){
        sortMap();
      });
    
    return false;
  });
}

})(jQuery, Drupal);
;
$(document).ready(function(){
  $("div.views-field-editor-intro div.field-content span.continue").click(
    function() {
      $("div.views-field-editor-intro div.field-content span.part2").addClass('expand');
      $(this).remove();
    }
  );
})

;
;(function($){ // secure $ jQuery alias
/*******************************************************************************************/ 
// jquery.event.drag.js - rev 10
// Copyright (c) 2008, Three Dub Media (http://threedubmedia.com)
// Liscensed under the MIT License (MIT-LICENSE.txt)
// http://www.opensource.org/licenses/mit-license.php
// Created: 2008-06-04 | Updated: 2008-08-05
/*******************************************************************************************/
// Events: drag, dragstart, dragend
/*******************************************************************************************/

// jquery method
$.fn.drag = function( fn1, fn2, fn3 ){
  if ( fn2 ) this.bind('dragstart', fn1 ); // 2+ args
  if ( fn3 ) this.bind('dragend', fn3 ); // 3 args
  return !fn1 ? this.trigger('mousedown',{ which:1 }) // 0 args
    : this.bind('drag', fn2 ? fn2 : fn1 ); // 1+ args
  };

// special event configuration
var drag = $.event.special.drag = {
  distance: 0, // default distance dragged before dragstart
  setup: function( data ){
    data = $.extend({ distance: drag.distance }, data || {});
    $.event.add( this, "mousedown", drag.handler, data );
    },
  teardown: function(){
    $.event.remove( this, "mousedown", drag.handler );
    if ( this == drag.dragging ) drag.dragging = drag.proxy = null; // deactivate element
    selectable( this, true ); // enable text selection
    },
  handler: function( event ){ 
    var returnValue;
    // mousedown has initialized
    if ( event.data.elem ){ 
      // update event properties...
      event.dragTarget = event.data.elem; // source element
      event.dragProxy = drag.proxy || event.dragTarget; // proxy element or source
      event.cursorOffsetX = event.data.x - event.data.left; // mousedown offset
      event.cursorOffsetY = event.data.y - event.data.top; // mousedown offset
      event.offsetX = event.pageX - event.cursorOffsetX; // element offset
      event.offsetY = event.pageY - event.cursorOffsetY; // element offset
      }
    // handle various events
    switch ( event.type ){
      // mousedown, left click
      case !drag.dragging && event.which==1 && 'mousedown': // initialize drag
        $.extend( event.data, $( this ).offset(), { 
          x: event.pageX, y: event.pageY, elem: this, 
          dist2: Math.pow( event.data.distance, 2 ) //  x + y = distance
          }); // store some initial attributes
        $.event.add( document.body, "mousemove mouseup", drag.handler, event.data );
        selectable( this, false ); // disable text selection
        return false; // prevents text selection in safari 
      // mousemove, check distance, start dragging
      case !drag.dragging && 'mousemove': // DRAGSTART >> 
        if ( Math.pow( event.pageX-event.data.x, 2 ) 
          + Math.pow( event.pageY-event.data.y, 2 ) //  x + y = distance
          < event.data.dist2 ) break; // distance tolerance not reached
        drag.dragging = event.dragTarget; // activate element
        event.type = "dragstart"; // hijack event
        returnValue = $.event.handle.call( drag.dragging, event ); // trigger "dragstart", return proxy element
        drag.proxy = $( returnValue )[0] || drag.dragging; // set proxy
        if ( returnValue !== false ) break; // "dragstart" accepted, stop
        selectable( drag.dragging, true ); // enable text selection
        drag.dragging = drag.proxy = null; // deactivate element
      // mousemove, dragging
      case 'mousemove': // DRAG >> 
        if ( drag.dragging ){
          event.type = "drag"; // hijack event
          returnValue = $.event.handle.call( drag.dragging, event ); // trigger "drag"
          if ( $.event.special.drop ){ // manage drop events
            $.event.special.drop.allowed = ( returnValue !== false ); // prevent drop
            $.event.special.drop.handler( event ); // "dropstart", "dropend"
            }
          if ( returnValue !== false ) break; // "drag" not rejected, stop    
          event.type = "mouseup"; // hijack event
          }
      // mouseup, stop dragging
      case 'mouseup': // DRAGEND >> 
        $.event.remove( document.body, "mousemove mouseup", drag.handler ); // remove page events
        if ( drag.dragging ){
          if ( $.event.special.drop ) // manage drop events
            $.event.special.drop.handler( event ); // "drop"
          event.type = "dragend"; // hijack event
          $.event.handle.call( drag.dragging, event ); // trigger "dragend" 
          selectable( drag.dragging, true ); // enable text selection
          drag.dragging = drag.proxy = null; // deactivate element
          event.data = {};
          }
        break;
      } 
    } 
  };
  
// toggles text selection attributes  
function selectable( elem, bool ){ 
  if ( !elem ) return; // maybe element was removed ? 
  elem.unselectable = bool ? "off" : "on"; // IE
  elem.onselectstart = function(){ return bool; }; // IE
  if ( elem.style ) elem.style.MozUserSelect = bool ? "" : "none"; // FF
  };  

/*******************************************************************************************/
})( jQuery ); // confine scope
;
/*
 * jQuery Form Plugin
 * version: 2.28 (10-MAY-2009)
 * @requires jQuery v1.2.2 or later
 *
 * Examples and documentation at: http://malsup.com/jquery/form/
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */
;(function($) {

/*
    Usage Note:
    -----------
    Do not use both ajaxSubmit and ajaxForm on the same form.  These
    functions are intended to be exclusive.  Use ajaxSubmit if you want
    to bind your own submit handler to the form.  For example,

    $(document).ready(function() {
        $('#myForm').bind('submit', function() {
            $(this).ajaxSubmit({
                target: '#output'
            });
            return false; // <-- important!
        });
    });

    Use ajaxForm when you want the plugin to manage all the event binding
    for you.  For example,

    $(document).ready(function() {
        $('#myForm').ajaxForm({
            target: '#output'
        });
    });

    When using ajaxForm, the ajaxSubmit function will be invoked for you
    at the appropriate time.
*/

/**
 * ajaxSubmit() provides a mechanism for immediately submitting
 * an HTML form using AJAX.
 */
$.fn.ajaxSubmit = function(options) {
    // fast fail if nothing selected (http://dev.jquery.com/ticket/2752)
    if (!this.length) {
        log('ajaxSubmit: skipping submit process - no element selected');
        return this;
    }

    if (typeof options == 'function')
        options = { success: options };

    var url = $.trim(this.attr('action'));
    if (url) {
	    // clean url (don't include hash vaue)
	    url = (url.match(/^([^#]+)/)||[])[1];
   	}
   	url = url || window.location.href || ''

    options = $.extend({
        url:  url,
        type: this.attr('method') || 'GET'
    }, options || {});

    // hook for manipulating the form data before it is extracted;
    // convenient for use with rich editors like tinyMCE or FCKEditor
    var veto = {};
    this.trigger('form-pre-serialize', [this, options, veto]);
    if (veto.veto) {
        log('ajaxSubmit: submit vetoed via form-pre-serialize trigger');
        return this;
    }

    // provide opportunity to alter form data before it is serialized
    if (options.beforeSerialize && options.beforeSerialize(this, options) === false) {
        log('ajaxSubmit: submit aborted via beforeSerialize callback');
        return this;
    }

    var a = this.formToArray(options.semantic);
    if (options.data) {
        options.extraData = options.data;
        for (var n in options.data) {
          if(options.data[n] instanceof Array) {
            for (var k in options.data[n])
              a.push( { name: n, value: options.data[n][k] } );
          }
          else
             a.push( { name: n, value: options.data[n] } );
        }
    }

    // give pre-submit callback an opportunity to abort the submit
    if (options.beforeSubmit && options.beforeSubmit(a, this, options) === false) {
        log('ajaxSubmit: submit aborted via beforeSubmit callback');
        return this;
    }

    // fire vetoable 'validate' event
    this.trigger('form-submit-validate', [a, this, options, veto]);
    if (veto.veto) {
        log('ajaxSubmit: submit vetoed via form-submit-validate trigger');
        return this;
    }

    var q = $.param(a);

    if (options.type.toUpperCase() == 'GET') {
        options.url += (options.url.indexOf('?') >= 0 ? '&' : '?') + q;
        options.data = null;  // data is null for 'get'
    }
    else
        options.data = q; // data is the query string for 'post'

    var $form = this, callbacks = [];
    if (options.resetForm) callbacks.push(function() { $form.resetForm(); });
    if (options.clearForm) callbacks.push(function() { $form.clearForm(); });

    // perform a load on the target only if dataType is not provided
    if (!options.dataType && options.target) {
        var oldSuccess = options.success || function(){};
        callbacks.push(function(data) {
            $(options.target).html(data).each(oldSuccess, arguments);
        });
    }
    else if (options.success)
        callbacks.push(options.success);

    options.success = function(data, status) {
        for (var i=0, max=callbacks.length; i < max; i++)
            callbacks[i].apply(options, [data, status, $form]);
    };

    // are there files to upload?
    var files = $('input:file', this).fieldValue();
    var found = false;
    for (var j=0; j < files.length; j++)
        if (files[j])
            found = true;

	var multipart = false;
//	var mp = 'multipart/form-data';
//	multipart = ($form.attr('enctype') == mp || $form.attr('encoding') == mp);

    // options.iframe allows user to force iframe mode
   if (options.iframe || found || multipart) {
       // hack to fix Safari hang (thanks to Tim Molendijk for this)
       // see:  http://groups.google.com/group/jquery-dev/browse_thread/thread/36395b7ab510dd5d
       if (options.closeKeepAlive)
           $.get(options.closeKeepAlive, fileUpload);
       else
           fileUpload();
       }
   else
       $.ajax(options);

    // fire 'notify' event
    this.trigger('form-submit-notify', [this, options]);
    return this;


    // private function for handling file uploads (hat tip to YAHOO!)
    function fileUpload() {
        var form = $form[0];

        if ($(':input[name=submit]', form).length) {
            alert('Error: Form elements must not be named "submit".');
            return;
        }

        var opts = $.extend({}, $.ajaxSettings, options);
		var s = $.extend(true, {}, $.extend(true, {}, $.ajaxSettings), opts);

        var id = 'jqFormIO' + (new Date().getTime());
        var $io = $('<iframe id="' + id + '" name="' + id + '" src="about:blank" />');
        var io = $io[0];

        $io.css({ position: 'absolute', top: '-1000px', left: '-1000px' });

        var xhr = { // mock object
            aborted: 0,
            responseText: null,
            responseXML: null,
            status: 0,
            statusText: 'n/a',
            getAllResponseHeaders: function() {},
            getResponseHeader: function() {},
            setRequestHeader: function() {},
            abort: function() {
                this.aborted = 1;
                $io.attr('src','about:blank'); // abort op in progress
            }
        };

        var g = opts.global;
        // trigger ajax global events so that activity/block indicators work like normal
        if (g && ! $.active++) $.event.trigger("ajaxStart");
        if (g) $.event.trigger("ajaxSend", [xhr, opts]);

		if (s.beforeSend && s.beforeSend(xhr, s) === false) {
			s.global && $.active--;
			return;
        }
        if (xhr.aborted)
            return;

        var cbInvoked = 0;
        var timedOut = 0;

        // add submitting element to data if we know it
        var sub = form.clk;
        if (sub) {
            var n = sub.name;
            if (n && !sub.disabled) {
                options.extraData = options.extraData || {};
                options.extraData[n] = sub.value;
                if (sub.type == "image") {
                    options.extraData[name+'.x'] = form.clk_x;
                    options.extraData[name+'.y'] = form.clk_y;
                }
            }
        }

        // take a breath so that pending repaints get some cpu time before the upload starts
        setTimeout(function() {
            // make sure form attrs are set
            var t = $form.attr('target'), a = $form.attr('action');

			// update form attrs in IE friendly way
			form.setAttribute('target',id);
			if (form.getAttribute('method') != 'POST')
				form.setAttribute('method', 'POST');
			if (form.getAttribute('action') != opts.url)
				form.setAttribute('action', opts.url);

            // ie borks in some cases when setting encoding
            if (! options.skipEncodingOverride) {
                $form.attr({
                    encoding: 'multipart/form-data',
                    enctype:  'multipart/form-data'
                });
            }

            // support timout
            if (opts.timeout)
                setTimeout(function() { timedOut = true; cb(); }, opts.timeout);

            // add "extra" data to form if provided in options
            var extraInputs = [];
            try {
                if (options.extraData)
                    for (var n in options.extraData)
                        extraInputs.push(
                            $('<input type="hidden" name="'+n+'" value="'+options.extraData[n]+'" />')
                                .appendTo(form)[0]);

                // add iframe to doc and submit the form
                $io.appendTo('body');
                io.attachEvent ? io.attachEvent('onload', cb) : io.addEventListener('load', cb, false);
                form.submit();
            }
            finally {
                // reset attrs and remove "extra" input elements
				form.setAttribute('action',a);
                t ? form.setAttribute('target', t) : $form.removeAttr('target');
                $(extraInputs).remove();
            }
        }, 10);

        var nullCheckFlag = 0;

        function cb() {
            if (cbInvoked++) return;

            io.detachEvent ? io.detachEvent('onload', cb) : io.removeEventListener('load', cb, false);

            var ok = true;
            try {
                if (timedOut) throw 'timeout';
                // extract the server response from the iframe
                var data, doc;

                doc = io.contentWindow ? io.contentWindow.document : io.contentDocument ? io.contentDocument : io.document;

                if ((doc.body == null || doc.body.innerHTML == '') && !nullCheckFlag) {
                    // in some browsers (cough, Opera 9.2.x) the iframe DOM is not always traversable when
                    // the onload callback fires, so we give them a 2nd chance
                    nullCheckFlag = 1;
                    cbInvoked--;
                    setTimeout(cb, 100);
                    return;
                }

                xhr.responseText = doc.body ? doc.body.innerHTML : null;
                xhr.responseXML = doc.XMLDocument ? doc.XMLDocument : doc;
                xhr.getResponseHeader = function(header){
                    var headers = {'content-type': opts.dataType};
                    return headers[header];
                };

                if (opts.dataType == 'json' || opts.dataType == 'script') {
                    var ta = doc.getElementsByTagName('textarea')[0];
                    xhr.responseText = ta ? ta.value : xhr.responseText;
                }
                else if (opts.dataType == 'xml' && !xhr.responseXML && xhr.responseText != null) {
                    xhr.responseXML = toXml(xhr.responseText);
                }
                data = $.httpData(xhr, opts.dataType);
            }
            catch(e){
                ok = false;
                $.handleError(opts, xhr, 'error', e);
            }

            // ordering of these callbacks/triggers is odd, but that's how $.ajax does it
            if (ok) {
                opts.success(data, 'success');
                if (g) $.event.trigger("ajaxSuccess", [xhr, opts]);
            }
            if (g) $.event.trigger("ajaxComplete", [xhr, opts]);
            if (g && ! --$.active) $.event.trigger("ajaxStop");
            if (opts.complete) opts.complete(xhr, ok ? 'success' : 'error');

            // clean up
            setTimeout(function() {
                $io.remove();
                xhr.responseXML = null;
            }, 100);
        };

        function toXml(s, doc) {
            if (window.ActiveXObject) {
                doc = new ActiveXObject('Microsoft.XMLDOM');
                doc.async = 'false';
                doc.loadXML(s);
            }
            else
                doc = (new DOMParser()).parseFromString(s, 'text/xml');
            return (doc && doc.documentElement && doc.documentElement.tagName != 'parsererror') ? doc : null;
        };
    };
};

/**
 * ajaxForm() provides a mechanism for fully automating form submission.
 *
 * The advantages of using this method instead of ajaxSubmit() are:
 *
 * 1: This method will include coordinates for <input type="image" /> elements (if the element
 *    is used to submit the form).
 * 2. This method will include the submit element's name/value data (for the element that was
 *    used to submit the form).
 * 3. This method binds the submit() method to the form for you.
 *
 * The options argument for ajaxForm works exactly as it does for ajaxSubmit.  ajaxForm merely
 * passes the options argument along after properly binding events for submit elements and
 * the form itself.
 */
$.fn.ajaxForm = function(options) {
    return this.ajaxFormUnbind().bind('submit.form-plugin',function() {
        $(this).ajaxSubmit(options);
        return false;
    }).each(function() {
        // store options in hash
        $(":submit,input:image", this).bind('click.form-plugin',function(e) {
            var form = this.form;
            form.clk = this;
            if (this.type == 'image') {
                if (e.offsetX != undefined) {
                    form.clk_x = e.offsetX;
                    form.clk_y = e.offsetY;
                } else if (typeof $.fn.offset == 'function') { // try to use dimensions plugin
                    var offset = $(this).offset();
                    form.clk_x = e.pageX - offset.left;
                    form.clk_y = e.pageY - offset.top;
                } else {
                    form.clk_x = e.pageX - this.offsetLeft;
                    form.clk_y = e.pageY - this.offsetTop;
                }
            }
            // clear form vars
            setTimeout(function() { form.clk = form.clk_x = form.clk_y = null; }, 10);
        });
    });
};

// ajaxFormUnbind unbinds the event handlers that were bound by ajaxForm
$.fn.ajaxFormUnbind = function() {
    this.unbind('submit.form-plugin');
    return this.each(function() {
        $(":submit,input:image", this).unbind('click.form-plugin');
    });

};

/**
 * formToArray() gathers form element data into an array of objects that can
 * be passed to any of the following ajax functions: $.get, $.post, or load.
 * Each object in the array has both a 'name' and 'value' property.  An example of
 * an array for a simple login form might be:
 *
 * [ { name: 'username', value: 'jresig' }, { name: 'password', value: 'secret' } ]
 *
 * It is this array that is passed to pre-submit callback functions provided to the
 * ajaxSubmit() and ajaxForm() methods.
 */
$.fn.formToArray = function(semantic) {
    var a = [];
    if (this.length == 0) return a;

    var form = this[0];
    var els = semantic ? form.getElementsByTagName('*') : form.elements;
    if (!els) return a;
    for(var i=0, max=els.length; i < max; i++) {
        var el = els[i];
        var n = el.name;
        if (!n) continue;

        if (semantic && form.clk && el.type == "image") {
            // handle image inputs on the fly when semantic == true
            if(!el.disabled && form.clk == el) {
            	a.push({name: n, value: $(el).val()});
                a.push({name: n+'.x', value: form.clk_x}, {name: n+'.y', value: form.clk_y});
            }
            continue;
        }

        var v = $.fieldValue(el, true);
        if (v && v.constructor == Array) {
            for(var j=0, jmax=v.length; j < jmax; j++)
                a.push({name: n, value: v[j]});
        }
        else if (v !== null && typeof v != 'undefined')
            a.push({name: n, value: v});
    }

    if (!semantic && form.clk) {
        // input type=='image' are not found in elements array! handle it here
        var $input = $(form.clk), input = $input[0], n = input.name;
        if (n && !input.disabled && input.type == 'image') {
        	a.push({name: n, value: $input.val()});
            a.push({name: n+'.x', value: form.clk_x}, {name: n+'.y', value: form.clk_y});
        }
    }
    return a;
};

/**
 * Serializes form data into a 'submittable' string. This method will return a string
 * in the format: name1=value1&amp;name2=value2
 */
$.fn.formSerialize = function(semantic) {
    //hand off to jQuery.param for proper encoding
    return $.param(this.formToArray(semantic));
};

/**
 * Serializes all field elements in the jQuery object into a query string.
 * This method will return a string in the format: name1=value1&amp;name2=value2
 */
$.fn.fieldSerialize = function(successful) {
    var a = [];
    this.each(function() {
        var n = this.name;
        if (!n) return;
        var v = $.fieldValue(this, successful);
        if (v && v.constructor == Array) {
            for (var i=0,max=v.length; i < max; i++)
                a.push({name: n, value: v[i]});
        }
        else if (v !== null && typeof v != 'undefined')
            a.push({name: this.name, value: v});
    });
    //hand off to jQuery.param for proper encoding
    return $.param(a);
};

/**
 * Returns the value(s) of the element in the matched set.  For example, consider the following form:
 *
 *  <form><fieldset>
 *      <input name="A" type="text" />
 *      <input name="A" type="text" />
 *      <input name="B" type="checkbox" value="B1" />
 *      <input name="B" type="checkbox" value="B2"/>
 *      <input name="C" type="radio" value="C1" />
 *      <input name="C" type="radio" value="C2" />
 *  </fieldset></form>
 *
 *  var v = $(':text').fieldValue();
 *  // if no values are entered into the text inputs
 *  v == ['','']
 *  // if values entered into the text inputs are 'foo' and 'bar'
 *  v == ['foo','bar']
 *
 *  var v = $(':checkbox').fieldValue();
 *  // if neither checkbox is checked
 *  v === undefined
 *  // if both checkboxes are checked
 *  v == ['B1', 'B2']
 *
 *  var v = $(':radio').fieldValue();
 *  // if neither radio is checked
 *  v === undefined
 *  // if first radio is checked
 *  v == ['C1']
 *
 * The successful argument controls whether or not the field element must be 'successful'
 * (per http://www.w3.org/TR/html4/interact/forms.html#successful-controls).
 * The default value of the successful argument is true.  If this value is false the value(s)
 * for each element is returned.
 *
 * Note: This method *always* returns an array.  If no valid value can be determined the
 *       array will be empty, otherwise it will contain one or more values.
 */
$.fn.fieldValue = function(successful) {
    for (var val=[], i=0, max=this.length; i < max; i++) {
        var el = this[i];
        var v = $.fieldValue(el, successful);
        if (v === null || typeof v == 'undefined' || (v.constructor == Array && !v.length))
            continue;
        v.constructor == Array ? $.merge(val, v) : val.push(v);
    }
    return val;
};

/**
 * Returns the value of the field element.
 */
$.fieldValue = function(el, successful) {
    var n = el.name, t = el.type, tag = el.tagName.toLowerCase();
    if (typeof successful == 'undefined') successful = true;

    if (successful && (!n || el.disabled || t == 'reset' || t == 'button' ||
        (t == 'checkbox' || t == 'radio') && !el.checked ||
        (t == 'submit' || t == 'image') && el.form && el.form.clk != el ||
        tag == 'select' && el.selectedIndex == -1))
            return null;

    if (tag == 'select') {
        var index = el.selectedIndex;
        if (index < 0) return null;
        var a = [], ops = el.options;
        var one = (t == 'select-one');
        var max = (one ? index+1 : ops.length);
        for(var i=(one ? index : 0); i < max; i++) {
            var op = ops[i];
            if (op.selected) {
				var v = op.value;
				if (!v) // extra pain for IE...
                	v = (op.attributes && op.attributes['value'] && !(op.attributes['value'].specified)) ? op.text : op.value;
                if (one) return v;
                a.push(v);
            }
        }
        return a;
    }
    return el.value;
};

/**
 * Clears the form data.  Takes the following actions on the form's input fields:
 *  - input text fields will have their 'value' property set to the empty string
 *  - select elements will have their 'selectedIndex' property set to -1
 *  - checkbox and radio inputs will have their 'checked' property set to false
 *  - inputs of type submit, button, reset, and hidden will *not* be effected
 *  - button elements will *not* be effected
 */
$.fn.clearForm = function() {
    return this.each(function() {
        $('input,select,textarea', this).clearFields();
    });
};

/**
 * Clears the selected form elements.
 */
$.fn.clearFields = $.fn.clearInputs = function() {
    return this.each(function() {
        var t = this.type, tag = this.tagName.toLowerCase();
        if (t == 'text' || t == 'password' || tag == 'textarea')
            this.value = '';
        else if (t == 'checkbox' || t == 'radio')
            this.checked = false;
        else if (tag == 'select')
            this.selectedIndex = -1;
    });
};

/**
 * Resets the form data.  Causes all form elements to be reset to their original value.
 */
$.fn.resetForm = function() {
    return this.each(function() {
        // guard against an input with the name of 'reset'
        // note that IE reports the reset function as an 'object'
        if (typeof this.reset == 'function' || (typeof this.reset == 'object' && !this.reset.nodeType))
            this.reset();
    });
};

/**
 * Enables or disables any matching elements.
 */
$.fn.enable = function(b) {
    if (b == undefined) b = true;
    return this.each(function() {
        this.disabled = !b;
    });
};

/**
 * Checks/unchecks any matching checkboxes or radio buttons and
 * selects/deselects and matching option elements.
 */
$.fn.selected = function(select) {
    if (select == undefined) select = true;
    return this.each(function() {
        var t = this.type;
        if (t == 'checkbox' || t == 'radio')
            this.checked = select;
        else if (this.tagName.toLowerCase() == 'option') {
            var $sel = $(this).parent('select');
            if (select && $sel[0] && $sel[0].type == 'select-one') {
                // deselect all other options
                $sel.find('option').selected(false);
            }
            this.selected = select;
        }
    });
};

// helper fn for console logging
// set $.fn.ajaxSubmit.debug to true to enable debug logging
function log() {
    if ($.fn.ajaxSubmit.debug && window.console && window.console.log)
        window.console.log('[jquery.form] ' + Array.prototype.join.call(arguments,''));
};

})(jQuery);
;
/* 
 * Auto Expanding Text Area (1.2.2)
 * by Chrys Bader (www.chrysbader.com)
 * chrysb@gmail.com
 *
 * Special thanks to:
 * Jake Chapa - jake@hybridstudio.com
 * John Resig - jeresig@gmail.com
 *
 * Copyright (c) 2008 Chrys Bader (www.chrysbader.com)
 * Licensed under the GPL (GPL-LICENSE.txt) license. 
 *
 *
 * NOTE: This script requires jQuery to work.  Download jQuery at www.jquery.com
 *
 */
 
(function(jQuery) {
		  
	var self = null;
 
	jQuery.fn.autogrow = function(o)
	{	
		return this.each(function() {
			new jQuery.autogrow(this, o);
		});
	};
	

    /**
     * The autogrow object.
     *
     * @constructor
     * @name jQuery.autogrow
     * @param Object e The textarea to create the autogrow for.
     * @param Hash o A set of key/value pairs to set as configuration properties.
     * @cat Plugins/autogrow
     */
	
	jQuery.autogrow = function (e, o)
	{
		this.options		  	= o || {};
		this.dummy			  	= null;
		this.interval	 	  	= null;
		this.line_height	  	= this.options.lineHeight || parseInt(jQuery(e).css('line-height'));
		this.min_height		  	= this.options.minHeight || parseInt(jQuery(e).css('min-height'));
		this.max_height		  	= this.options.maxHeight || parseInt(jQuery(e).css('max-height'));;
		this.textarea		  	= jQuery(e);
		
		if(this.line_height == NaN)
		  this.line_height = 0;
		
		// Only one textarea activated at a time, the one being used
		this.init();
	};
	
	jQuery.autogrow.fn = jQuery.autogrow.prototype = {
    autogrow: '1.2.2'
  };
	
 	jQuery.autogrow.fn.extend = jQuery.autogrow.extend = jQuery.extend;
	
	jQuery.autogrow.fn.extend({
						 
		init: function() {			
			var self = this;			
			this.textarea.css({overflow: 'hidden', display: 'block'});
			this.textarea.bind('focus', function() { self.startExpand() } ).bind('blur', function() { self.stopExpand() });
			this.checkExpand();	
		},
						 
		startExpand: function() {				
		  var self = this;
			this.interval = window.setInterval(function() {self.checkExpand()}, 400);
		},
		
		stopExpand: function() {
			clearInterval(this.interval);	
		},
		
		checkExpand: function() {
			
			if (this.dummy == null)
			{
				this.dummy = jQuery('<div></div>');
				this.dummy.css({
												'font-size'  : this.textarea.css('font-size'),
												'font-family': this.textarea.css('font-family'),
												'width'      : this.textarea.css('width'),
												'padding'    : this.textarea.css('padding'),
												'line-height': this.line_height + 'px',
												'overflow-x' : 'hidden',
												'position'   : 'absolute',
												'top'        : 0,
												'left'		 : -9999
												}).appendTo('body');
			}
			
			// Strip HTML tags
			var html = this.textarea.val().replace(/(<|>)/g, '');
			
			// IE is different, as per usual
			if ($.browser.msie)
			{
				html = html.replace(/\n/g, '<BR>new');
			}
			else
			{
				html = html.replace(/\n/g, '<br>new');
			}
			
			if (this.dummy.html() != html)
			{
				this.dummy.html(html);	
				
				if (this.max_height > 0 && (this.dummy.height() + this.line_height > this.max_height))
				{
					this.textarea.css('overflow-y', 'auto');	
				}
				else
				{
					this.textarea.css('overflow-y', 'hidden');
					if (this.textarea.height() < this.dummy.height() + this.line_height || (this.dummy.height() < this.textarea.height()))
					{	
						this.textarea.animate({height: (this.dummy.height() + this.line_height) + 'px'}, 100);	
					}
				}
			}
		}
						 
	 });
})(jQuery);;
/*
 * jQuery Timer Plugin
 * http://www.evanbot.com/article/jquery-timer-plugin/23
 *
 * @version      1.0
 * @copyright    2009 Evan Byrne (http://www.evanbot.com)
 */ 

jQuery.timer = function(time,func,callback){
	var a = {timer:setTimeout(func,time),callback:null}
	if(typeof(callback) == 'function'){a.callback = callback;}
	return a;
};

jQuery.clearTimer = function(a){
	clearTimeout(a.timer);
	if(typeof(a.callback) == 'function'){a.callback();};
	return this;
};;
/**
 * Cookie plugin
 *
 * Copyright (c) 2006 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */
 
/**
 * Create a cookie with the given name and value and other optional parameters.
 *
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Set the value of a cookie.
 * @example $.cookie('the_cookie', 'the_value', { expires: 7, path: '/', domain: 'jquery.com', secure: true });
 * @desc Create a cookie with all available options.
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Create a session cookie.
 * @example $.cookie('the_cookie', null);
 * @desc Delete a cookie by passing null as value. Keep in mind that you have to use the same path and domain
 *       used when the cookie was set.
 *
 * @param String name The name of the cookie.
 * @param String value The value of the cookie.
 * @param Object options An object literal containing key/value pairs to provide optional cookie attributes.
 * @option Number|Date expires Either an integer specifying the expiration date from now on in days or a Date object.
 *                             If a negative value is specified (e.g. a date in the past), the cookie will be deleted.
 *                             If set to null or omitted, the cookie will be a session cookie and will not be retained
 *                             when the the browser exits.
 * @option String path The value of the path atribute of the cookie (default: path of page that created the cookie).
 * @option String domain The value of the domain attribute of the cookie (default: domain of page that created the cookie).
 * @option Boolean secure If true, the secure attribute of the cookie will be set and the cookie transmission will
 *                        require a secure protocol (like HTTPS).
 * @type undefined
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */
 
/**
 * Get the value of a cookie with the given name.
 *
 * @example $.cookie('the_cookie');
 * @desc Get the value of a cookie.
 *
 * @param String name The name of the cookie.
 * @return The value of the cookie.
 * @type String
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */
jQuery.cookie = function(name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        // CAUTION: Needed to parenthesize options.path and options.domain
        // in the following expressions, otherwise they evaluate to undefined
        // in the packed version for some reason...
        var path = options.path ? '; path=' + (options.path) : '';
        var domain = options.domain ? '; domain=' + (options.domain) : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else { // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};
;

/**
 * jQuery plugin to convert ISO 8601 timestamps to a human readable form.  All timestamps
 * are assumed to be UTC.
 *
 * Usage:
 * <span class="ec_timeago" title="2010-08-06T13:43:46-00:00">anything here (it will be replaced)</span>
 *
 * $(".ec_timeago").ec_timeago({ ... settings ... });
 *
 * Output:
 * <span class="ec_timeago" title="2010-08-06T13:43:46-00:00">3 hours 15 minutes ago</span>
 * 
 * --------------------------------------------------------------------------------
 * | Condition                    | Syntax               | Example                |
 * --------------------------------------------------------------------------------
 * | TIME < 1 hr                  | xx mins ago          | 5 mins ago             |
 * | 1 hr < TIME < 4 hrs          | xx hrs xx mins ago   | 2 hrs 24 mins ago      |    
 * | TIME > 4 hrs                 | MMM DDth, hh:mm      | July 24th, 23:11       |
 * | TIME > this year             | MMM DDth YYYY, hh:mm | July 24th 2009, 23:11  |
 * --------------------------------------------------------------------------------
*/
(function($) {

  var MINUTE = 60;
  var HOUR = 60 * 60;
  var DAY = HOUR * 24;
  var DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
  /**
   * Convert a Date object into a human readable representation.
   */
  var timeago = function(then, settings) {
    var now = new Date(),
        nowUTC = now - (now.getTimezoneOffset() * 60000),
        today = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()),
        yesterday = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - 1),
        sunday = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - now.getUTCDay()), 
        diff = parseInt((now - then) / 1000),
        hours = Math.floor(diff / HOUR),
        minutes = Math.floor((diff - (hours * HOUR)) / MINUTE);
    
    // X mins ago
    if (diff < HOUR)
      return settings.strings.minutesAgo
        .replace("mm", minutes)
        .replace("mins", (minutes == 1 ? "min" : "mins"));
      
    // X hours X mins ago
    else if (diff < (4 * HOUR))
      return settings.strings.hoursAgo
        .replace("hh", hours)
        .replace("mm", minutes)
        .replace("hours", (hours == 1 ? "hour" : "hours"))
        .replace("mins", (minutes == 1 ? "min" : "mins"));
    
    // Month Day, hh:mm
    else if (then.getUTCFullYear() == now.getUTCFullYear())
      return substitute(then, settings.strings.monthsAgo);

    // Month Day Year, hh:mm
    else
      return substitute(then, settings.strings.date);
  };
  
  /**
   * Returns the appropriate numerical suffix for a given number
   */
  function suffix(d) {
    d = String(d);
    return d.substr(-(Math.min(d.length, 2))) > 3 && d.substr(-(Math.min(d.length, 2))) < 21 ? "th" : ["th", "st", "nd", "rd", "th"][Math.min(Number(d) % 10, 4)];
  }
  
  /**
   * Convert a time format string into a time string
   */
  var substitute = function(date, string) {
    string = string.replace("mm", date.getUTCMinutes() > 9 ? date.getUTCMinutes() : "0" + date.getUTCMinutes());
    string = string.replace("hh", date.getUTCHours() > 9 ? date.getUTCHours() : "0" + date.getUTCHours());
    string = string.replace("MMM", MONTHS[date.getUTCMonth()]);
    string = string.replace("ddd", DAYS[date.getUTCDay()]);
    string = string.replace("dd", date.getUTCDate() + suffix(date.getUTCDate()));
    string = string.replace("YYYY", date.getUTCFullYear());
    return string;
  };
  
  // From http://github.com/rmm5t/jquery-timeago/blob/master/jquery.timeago.js
  var parse = function(iso8601) {
    var s = $.trim(iso8601);
    s = s.replace(/\.\d\d\d/,""); // remove milliseconds
    s = s.replace(/-/,"/").replace(/-/,"/");
    s = s.replace(/T/," ").replace(/Z/," UTC");
    s = s.replace(/([\+-]\d\d)\:?(\d\d)/," $1$2"); // -04:00 -> -0400
    return new Date(s);
  };
  
  /**
   * jQuery ec_timeago plugin
   */
  $.fn.ec_timeago = function(settings) {
    var defaults = {
      refresh: 60000,
      prefix: "",
      suffix: "",
      strings: {
        minutesAgo: "mm mins ago",
        hoursAgo:   "hh hours mm mins ago",
        time:       "hh:mm",
        yesterday:  "Yesterday, hh:mm",
        thisWeek:   "ddd, hh:mm",
        monthsAgo:  "MMM dd, hh:mm",
        date:       "MMM dd YYYY, hh:mm"
      }
    };
    
    settings = $.extend(defaults, settings);
    
    this.each(function() {
      var $this = $(this);
      $this.text(settings.prefix + timeago(parse($this.attr("title")), settings) + settings.suffix);
      
      if (settings.refresh) {
        setInterval(function() {
          $this.text(settings.prefix + timeago(parse($this.attr("title")), settings) + settings.suffix);
        }, settings.refresh);
      }
    });
  
    return this;
  };

})(jQuery);
;
﻿/**
* hoverIntent r5 // 2007.03.27 // jQuery 1.1.2+
* <http://cherne.net/brian/resources/jquery.hoverIntent.html>
* 
* @param  f  onMouseOver function || An object with configuration options
* @param  g  onMouseOut function  || Nothing (use configuration options object)
* @author    Brian Cherne <brian@cherne.net>
*/
(function($){$.fn.hoverIntent=function(f,g){var cfg={sensitivity:7,interval:100,timeout:0};cfg=$.extend(cfg,g?{over:f,out:g}:f);var cX,cY,pX,pY;var track=function(ev){cX=ev.pageX;cY=ev.pageY;};var compare=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);if((Math.abs(pX-cX)+Math.abs(pY-cY))<cfg.sensitivity){$(ob).unbind("mousemove",track);ob.hoverIntent_s=1;return cfg.over.apply(ob,[ev]);}else{pX=cX;pY=cY;ob.hoverIntent_t=setTimeout(function(){compare(ev,ob);},cfg.interval);}};var delay=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);ob.hoverIntent_s=0;return cfg.out.apply(ob,[ev]);};var handleHover=function(e){var p=(e.type=="mouseover"?e.fromElement:e.toElement)||e.relatedTarget;while(p&&p!=this){try{p=p.parentNode;}catch(e){p=this;}}if(p==this){return false;}var ev=jQuery.extend({},e);var ob=this;if(ob.hoverIntent_t){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);}if(e.type=="mouseover"){pX=ev.pageX;pY=ev.pageY;$(ob).bind("mousemove",track);if(ob.hoverIntent_s!=1){ob.hoverIntent_t=setTimeout(function(){compare(ev,ob);},cfg.interval);}}else{$(ob).unbind("mousemove",track);if(ob.hoverIntent_s==1){ob.hoverIntent_t=setTimeout(function(){delay(ev,ob);},cfg.timeout);}}};return this.mouseover(handleHover).mouseout(handleHover);};})(jQuery);;
/*
 * Modernizr v1.6
 * http://www.modernizr.com
 *
 * Developed by: 
 * - Faruk Ates  http://farukat.es/
 * - Paul Irish  http://paulirish.com/
 *
 * Copyright (c) 2009-2010
 * Dual-licensed under the BSD or MIT licenses.
 * http://www.modernizr.com/license/
 */
window.Modernizr=function(i,e,u){function s(a,b){return(""+a).indexOf(b)!==-1}function D(a,b){for(var c in a)if(j[a[c]]!==u&&(!b||b(a[c],E)))return true}function n(a,b){var c=a.charAt(0).toUpperCase()+a.substr(1);c=(a+" "+F.join(c+" ")+c).split(" ");return!!D(c,b)}function S(){f.input=function(a){for(var b=0,c=a.length;b<c;b++)L[a[b]]=!!(a[b]in h);return L}("autocomplete autofocus list placeholder max min multiple pattern required step".split(" "));f.inputtypes=function(a){for(var b=0,c,k=a.length;b<
k;b++){h.setAttribute("type",a[b]);if(c=h.type!=="text"){h.value=M;if(/^range$/.test(h.type)&&h.style.WebkitAppearance!==u){l.appendChild(h);c=e.defaultView;c=c.getComputedStyle&&c.getComputedStyle(h,null).WebkitAppearance!=="textfield"&&h.offsetHeight!==0;l.removeChild(h)}else/^(search|tel)$/.test(h.type)||(c=/^(url|email)$/.test(h.type)?h.checkValidity&&h.checkValidity()===false:h.value!=M)}N[a[b]]=!!c}return N}("search tel url email datetime date month week time datetime-local number range color".split(" "))}
var f={},l=e.documentElement,E=e.createElement("modernizr"),j=E.style,h=e.createElement("input"),M=":)",O=Object.prototype.toString,q=" -webkit- -moz- -o- -ms- -khtml- ".split(" "),F="Webkit Moz O ms Khtml".split(" "),v={svg:"http://www.w3.org/2000/svg"},d={},N={},L={},P=[],w,Q=function(a){var b=document.createElement("style"),c=e.createElement("div");b.textContent=a+"{#modernizr{height:3px}}";(e.head||e.getElementsByTagName("head")[0]).appendChild(b);c.id="modernizr";l.appendChild(c);a=c.offsetHeight===
3;b.parentNode.removeChild(b);c.parentNode.removeChild(c);return!!a},o=function(){var a={select:"input",change:"input",submit:"form",reset:"form",error:"img",load:"img",abort:"img"};return function(b,c){c=c||document.createElement(a[b]||"div");b="on"+b;var k=b in c;if(!k){c.setAttribute||(c=document.createElement("div"));if(c.setAttribute&&c.removeAttribute){c.setAttribute(b,"");k=typeof c[b]=="function";if(typeof c[b]!="undefined")c[b]=u;c.removeAttribute(b)}}return k}}(),G={}.hasOwnProperty,R;R=
typeof G!=="undefined"&&typeof G.call!=="undefined"?function(a,b){return G.call(a,b)}:function(a,b){return b in a&&typeof a.constructor.prototype[b]==="undefined"};d.flexbox=function(){var a=e.createElement("div"),b=e.createElement("div");(function(k,g,r,x){g+=":";k.style.cssText=(g+q.join(r+";"+g)).slice(0,-g.length)+(x||"")})(a,"display","box","width:42px;padding:0;");b.style.cssText=q.join("box-flex:1;")+"width:10px;";a.appendChild(b);l.appendChild(a);var c=b.offsetWidth===42;a.removeChild(b);
l.removeChild(a);return c};d.canvas=function(){var a=e.createElement("canvas");return!!(a.getContext&&a.getContext("2d"))};d.canvastext=function(){return!!(f.canvas&&typeof e.createElement("canvas").getContext("2d").fillText=="function")};d.webgl=function(){var a=e.createElement("canvas");try{if(a.getContext("webgl"))return true}catch(b){}try{if(a.getContext("experimental-webgl"))return true}catch(c){}return false};d.touch=function(){return"ontouchstart"in i||Q("@media ("+q.join("touch-enabled),(")+
"modernizr)")};d.geolocation=function(){return!!navigator.geolocation};d.postmessage=function(){return!!i.postMessage};d.websqldatabase=function(){return!!i.openDatabase};d.indexedDB=function(){for(var a=-1,b=F.length;++a<b;){var c=F[a].toLowerCase();if(i[c+"_indexedDB"]||i[c+"IndexedDB"])return true}return false};d.hashchange=function(){return o("hashchange",i)&&(document.documentMode===u||document.documentMode>7)};d.history=function(){return!!(i.history&&history.pushState)};d.draganddrop=function(){return o("drag")&&
o("dragstart")&&o("dragenter")&&o("dragover")&&o("dragleave")&&o("dragend")&&o("drop")};d.websockets=function(){return"WebSocket"in i};d.rgba=function(){j.cssText="background-color:rgba(150,255,150,.5)";return s(j.backgroundColor,"rgba")};d.hsla=function(){j.cssText="background-color:hsla(120,40%,100%,.5)";return s(j.backgroundColor,"rgba")||s(j.backgroundColor,"hsla")};d.multiplebgs=function(){j.cssText="background:url(//:),url(//:),red url(//:)";return/(url\s*\(.*?){3}/.test(j.background)};d.backgroundsize=
function(){return n("backgroundSize")};d.borderimage=function(){return n("borderImage")};d.borderradius=function(){return n("borderRadius","",function(a){return s(a,"orderRadius")})};d.boxshadow=function(){return n("boxShadow")};d.textshadow=function(){return e.createElement("div").style.textShadow===""};d.opacity=function(){var a=q.join("opacity:.5;")+"";j.cssText=a;return s(j.opacity,"0.5")};d.cssanimations=function(){return n("animationName")};d.csscolumns=function(){return n("columnCount")};d.cssgradients=
function(){var a=("background-image:"+q.join("gradient(linear,left top,right bottom,from(#9f9),to(white));background-image:")+q.join("linear-gradient(left top,#9f9, white);background-image:")).slice(0,-17);j.cssText=a;return s(j.backgroundImage,"gradient")};d.cssreflections=function(){return n("boxReflect")};d.csstransforms=function(){return!!D(["transformProperty","WebkitTransform","MozTransform","OTransform","msTransform"])};d.csstransforms3d=function(){var a=!!D(["perspectiveProperty","WebkitPerspective",
"MozPerspective","OPerspective","msPerspective"]);if(a)a=Q("@media ("+q.join("transform-3d),(")+"modernizr)");return a};d.csstransitions=function(){return n("transitionProperty")};d.fontface=function(){var a,b=e.head||e.getElementsByTagName("head")[0]||l,c=e.createElement("style"),k=e.implementation||{hasFeature:function(){return false}};c.type="text/css";b.insertBefore(c,b.firstChild);a=c.sheet||c.styleSheet;b=k.hasFeature("CSS2","")?function(g){if(!(a&&g))return false;var r=false;try{a.insertRule(g,
0);r=!/unknown/i.test(a.cssRules[0].cssText);a.deleteRule(a.cssRules.length-1)}catch(x){}return r}:function(g){if(!(a&&g))return false;a.cssText=g;return a.cssText.length!==0&&!/unknown/i.test(a.cssText)&&a.cssText.replace(/\r+|\n+/g,"").indexOf(g.split(" ")[0])===0};f._fontfaceready=function(g){g(f.fontface)};return b('@font-face { font-family: "font"; src: "font.ttf"; }')};d.video=function(){var a=e.createElement("video"),b=!!a.canPlayType;if(b){b=new Boolean(b);b.ogg=a.canPlayType('video/ogg; codecs="theora"');
b.h264=a.canPlayType('video/mp4; codecs="avc1.42E01E"')||a.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"');b.webm=a.canPlayType('video/webm; codecs="vp8, vorbis"')}return b};d.audio=function(){var a=e.createElement("audio"),b=!!a.canPlayType;if(b){b=new Boolean(b);b.ogg=a.canPlayType('audio/ogg; codecs="vorbis"');b.mp3=a.canPlayType("audio/mpeg;");b.wav=a.canPlayType('audio/wav; codecs="1"');b.m4a=a.canPlayType("audio/x-m4a;")||a.canPlayType("audio/aac;")}return b};d.localstorage=function(){try{return"localStorage"in
i&&i.localStorage!==null}catch(a){return false}};d.sessionstorage=function(){try{return"sessionStorage"in i&&i.sessionStorage!==null}catch(a){return false}};d.webWorkers=function(){return!!i.Worker};d.applicationcache=function(){return!!i.applicationCache};d.svg=function(){return!!e.createElementNS&&!!e.createElementNS(v.svg,"svg").createSVGRect};d.inlinesvg=function(){var a=document.createElement("div");a.innerHTML="<svg/>";return(a.firstChild&&a.firstChild.namespaceURI)==v.svg};d.smil=function(){return!!e.createElementNS&&
/SVG/.test(O.call(e.createElementNS(v.svg,"animate")))};d.svgclippaths=function(){return!!e.createElementNS&&/SVG/.test(O.call(e.createElementNS(v.svg,"clipPath")))};for(var H in d)if(R(d,H)){w=H.toLowerCase();f[w]=d[H]();P.push((f[w]?"":"no-")+w)}f.input||S();f.crosswindowmessaging=f.postmessage;f.historymanagement=f.history;f.addTest=function(a,b){a=a.toLowerCase();if(!f[a]){b=!!b();l.className+=" "+(b?"":"no-")+a;f[a]=b;return f}};j.cssText="";E=h=null;i.attachEvent&&function(){var a=e.createElement("div");
a.innerHTML="<elem></elem>";return a.childNodes.length!==1}()&&function(a,b){function c(p){for(var m=-1;++m<r;)p.createElement(g[m])}function k(p,m){for(var I=p.length,t=-1,y,J=[];++t<I;){y=p[t];m=y.media||m;J.push(k(y.imports,m));J.push(y.cssText)}return J.join("")}var g="abbr|article|aside|audio|canvas|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video".split("|"),r=g.length,x=RegExp("<(/*)(abbr|article|aside|audio|canvas|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video)",
"gi"),T=RegExp("\\b(abbr|article|aside|audio|canvas|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video)\\b(?!.*[;}])","gi"),z=b.createDocumentFragment(),A=b.documentElement,K=A.firstChild,B=b.createElement("style"),C=b.createElement("body");B.media="all";c(b);c(z);a.attachEvent("onbeforeprint",function(){for(var p=-1;++p<r;)for(var m=b.getElementsByTagName(g[p]),I=m.length,t=-1;++t<I;)if(m[t].className.indexOf("iepp_")<0)m[t].className+=" iepp_"+
g[p];K.insertBefore(B,K.firstChild);B.styleSheet.cssText=k(b.styleSheets,"all").replace(T,".iepp_$1");z.appendChild(b.body);A.appendChild(C);C.innerHTML=z.firstChild.innerHTML.replace(x,"<$1bdo")});a.attachEvent("onafterprint",function(){C.innerHTML="";A.removeChild(C);K.removeChild(B);A.appendChild(z.firstChild)})}(this,document);f._enableHTML5=true;f._version="1.6";l.className=l.className.replace(/\bno-js\b/,"")+" js";l.className+=" "+P.join(" ");return f}(this,this.document);;
