/* http://keith-wood.name/svg.html
SVG for jQuery v1.0.0.
Written by Keith Wood (kbwood@iprimus.com.au) August 2007.
Under the Creative Commons Licence http://creativecommons.org/licenses/by/3.0/
Share or Remix it but please Attribute the author. */
var svgManager=null; (function(f){function k(){this._nextId=0;this._svgs=[];this._settings=[];this._extensions=[];this.regional=[];this.regional[""]={notSupportedText:"",errorLoadingText:"Error loading"};this.region=this.regional[""]}function l(a,b){this._svg=a;this._container=b;for(var c=0;c<svgManager._extensions.length;c++){var d=svgManager._extensions[c];this[d[0]]=new d[1](this)}}function m(){this._path=""}function n(){this._parts=[]}function j(a){return a.constructor&&a.constructor.toString().match(/\Array\(\)/)} f.extend(k.prototype,{svgNS:"http://www.w3.org/2000/svg",xlinkNS:"http://www.w3.org/1999/xlink",_rootClass:l,_connectSVG:function(a,b,c,d){var e=this._nextId++,h="<"+(f.browser.msie?"embed":"object")+' width="'+a.clientWidth+'" height="'+a.clientHeight+'" type="image/svg+xml" '+(f.browser.msie?"src":"data")+'="blank'+(f.browser.msie?e:"")+".svg"+(f.browser.msie?"":"?"+e)+'"'+(f.browser.msie?"/>":'><p class="svg_error">'+this.region.notSupportedText+"</p></object>");f(a).append(h);a._svgId=e;this._settings[e]= [a,b,c,d];return e},_registerSVG:function(a,b){var c=this._settings[a],b=this._svgs[a]=new this._rootClass(b,c[0]);b.clear();c[1]&&b.load(c[1]);c[3]&&svgs.configure(c[3]);if(c[2])c[2](c[0])},getSVGFor:function(a){a=typeof a=="string"?f(a)[0]:a.jquery?a[0]:a;return this._svgs[a._svgId]},addExtension:function(a,b){this._extensions[this._extensions.length]=[a,b]}});f.extend(l.prototype,{_width:function(){return this._container.clientWidth},_height:function(){return this._container.clientHeight},configure:function(a, b){if(b)for(var c=this._svg.attributes.length-1;c>=0;c--){var d=this._svg.attributes.item(c);d.nodeName=="onload"||d.nodeName=="version"||d.nodeName.substring(0,5)=="xmlns"||this._svg.attributes.removeNamedItem(d.nodeName)}for(var e in a)this._svg.setAttribute(e,a[e]);return this},getElementById:function(a){return this._svg.getElementById(a)},title:function(a,b,c){a=this._makeNode(a,"title",c||{});a.appendChild(this._svg.ownerDocument.createTextNode(b));return a},describe:function(a,b,c){a=this._makeNode(a, "desc",c||{});a.appendChild(this._svg.ownerDocument.createTextNode(b));return a},defs:function(a,b,c){typeof b!="string"&&(c=b,b=null);return this._makeNode(a,"defs",f.extend(b?{id:b}:{},c||{}))},symbol:function(a,b,c,d,e,h,g){return this._makeNode(a,"symbol",f.extend({id:b,viewBox:c+" "+d+" "+e+" "+h},g||{}))},marker:function(a,b,c,d,e,h,g,i){typeof g=="object"&&(i=g,g=null);return this._makeNode(a,"marker",f.extend({id:b,refX:c,refY:d,markerWidth:e,markerHeight:h,orient:g||"auto"},i||{}))},style:function(a, b,c){a=this._makeNode(a,"style",f.extend({type:"text/css"},c||{}));a.appendChild(this._svg.ownerDocument.createTextNode(this._escapeXML(b)));return a},script:function(a,b,c,d){typeof c=="object"&&(d=c,c=null);a=this._makeNode(a,"script",f.extend({type:c||"text/javascript"},d||{}));a.appendChild(this._svg.ownerDocument.createTextNode(this._escapeXML(b)));return a},linearGradient:function(a,b,c,d,e,h,g,i){typeof d=="object"&&(i=d,d=null);b=f.extend({id:b},d!=null?{x1:d,y1:e,x2:h,y2:g}:{});return this._gradient(a, "linearGradient",f.extend(b,i||{}),c)},radialGradient:function(a,b,c,d,e,h,g,i,j){typeof d=="object"&&(j=d,d=null);b=f.extend({id:b},d!=null?{cx:d,cy:e,r:h,fx:g,fy:i}:{});return this._gradient(a,"radialGradient",f.extend(b,j||{}),c)},_gradient:function(a,b,c,d){a=this._makeNode(a,b,c);for(b=0;b<d.length;b++)c=d[b],this._makeNode(a,"stop",f.extend({offset:c[0],stop_color:c[1]},c[2]!=null?{stop_opacity:c[2]}:{}));return a},pattern:function(a,b,c,d,e,h,g,i,j,o,k){typeof g=="object"&&(k=g,g=null);b=f.extend({id:b, x:c,y:d,width:e,height:h},g!=null?{viewBox:g+" "+i+" "+j+" "+o}:{});return this._makeNode(a,"pattern",f.extend(b,k||{}))},mask:function(a,b,c,d,e,h,g){return this._makeNode(a,"mask",f.extend({id:b,x:c,y:d,width:e,height:h},g||{}))},createPath:function(){return new m},createText:function(){return new n},svg:function(a,b,c,d,e,h,g,i,j,k){typeof h=="object"&&(k=h,h=null);b=f.extend({x:b,y:c,width:d,height:e},h!=null?{viewBox:h+" "+g+" "+i+" "+j}:{});return this._makeNode(a,"svg",f.extend(b,k||{}))}, group:function(a,b,c){typeof b=="object"&&(c=b,b=null);return this._makeNode(a,"g",f.extend({id:b},c||{}))},use:function(a,b,c,d,e,h,g){typeof b=="string"&&(h=b,g=c,b=c=d=e=null);a=this._makeNode(a,"use",f.extend({x:b,y:c,width:d,height:e},g||{}));a.setAttributeNS(svgManager.xlinkNS,"href",h);return a},link:function(a,b,c){a=this._makeNode(a,"a",c);a.setAttributeNS(svgManager.xlinkNS,"href",b);return a},image:function(a,b,c,d,e,h,g){a=this._makeNode(a,"image",f.extend({x:b,y:c,width:d,height:e},g|| {}));a.setAttributeNS(svgManager.xlinkNS,"href",h);return a},path:function(a,b,c){return this._makeNode(a,"path",f.extend({d:b.path?b.path():b},c||{}))},rect:function(a,b,c,d,e,h){return this._makeNode(a,"rect",f.extend({x:b,y:c,width:d,height:e},h||{}))},roundrect:function(a,b,c,d,e,h,g,i){return this._makeNode(a,"rect",f.extend({x:b,y:c,width:d,height:e,rx:h,ry:g},i||{}))},circle:function(a,b,c,d,e){return this._makeNode(a,"circle",f.extend({cx:b,cy:c,r:d},e||{}))},ellipse:function(a,b,c,d,e,h){return this._makeNode(a, "ellipse",f.extend({cx:b,cy:c,rx:d,ry:e},h||{}))},line:function(a,b,c,d,e,h){return this._makeNode(a,"line",f.extend({x1:b,y1:c,x2:d,y2:e},h||{}))},polyline:function(a,b,c){return this._poly(a,"polyline",b,c)},polygon:function(a,b,c){return this._poly(a,"polygon",b,c)},_poly:function(a,b,c,d){for(var e="",h=0;h<c.length;h++)e+=c[h].join()+" ";return this._makeNode(a,b,f.extend({points:e},d||{}))},text:function(a,b,c,d,e){typeof b=="string"&&arguments.length<4&&(d=b,e=c,b=c=null);return this._text(a, "text",d,f.extend({x:b&&j(b)?b.join(" "):b,y:c&&j(c)?c.join(" "):c},e||{}))},textpath:function(a,b,c,d){a=this._text(a,"textPath",c,d||{});a.setAttributeNS(svgManager.xlinkNS,"href",b);return a},_text:function(a,b,c,d){a=this._makeNode(a,b,d);if(typeof c=="string")a.appendChild(a.ownerDocument.createTextNode(c));else for(b=0;b<c._parts.length;b++)if(d=c._parts[b],d[0]=="tspan"){var e=this._makeNode(a,d[0],d[2]);e.appendChild(a.ownerDocument.createTextNode(d[1]));a.appendChild(e)}else if(d[0]=="tref")e= this._makeNode(a,d[0],d[2]),e.setAttributeNS(svgManager.xlinkNS,"href",d[1]),a.appendChild(e);else if(d[0]=="textpath"){var h=d[2].href;d[2].href=null;e=this._makeNode(a,d[0],d[2]);e.setAttributeNS(svgManager.xlinkNS,"href",h);e.appendChild(a.ownerDocument.createTextNode(d[1]));a.appendChild(e)}else a.appendChild(a.ownerDocument.createTextNode(d[1]));return a},other:function(a,b,c){return this._makeNode(a,other,c||{})},_makeNode:function(a,b,c){var a=a||this._svg,d=this._svg.ownerDocument.createElementNS(svgManager.svgNS, b);for(b in c){var e=c[b];e!=null&&e!=null&&(typeof e!="string"||e!="")&&d.setAttribute(this._fromJSName(b),e)}a.appendChild(d);return d},_fromJSName:function(a){return a.replace(/^_/,"").replace(/_/g,"-")},add:function(a,b){var c=this,a=a||this._svg,b=b.jquery?b:f(b);b.each(function(){var b=c._cloneAsSVG(this);b&&a.appendChild(b)})},_cloneAsSVG:function(a){var b=null;if(a.nodeType==1){for(var b=this._svg.ownerDocument.createElementNS(a.namespaceURI||svgManager.svgNS,this._checkName(a.nodeName)), c=0;c<a.attributes.length;c++){var d=a.attributes.item(c);d.nodeName!="xmlns"&&b.setAttribute(this._checkName(d.nodeName),d.nodeValue)}for(c=0;c<a.childNodes.length;c++)(d=this._cloneAsSVG(a.childNodes[c]))&&b.appendChild(d)}else a.nodeType==3?f.trim(a.nodeValue)&&(b=this._svg.ownerDocument.createTextNode(a.nodeValue)):a.nodeType==4&&f.trim(a.nodeValue)&&(b=this._svg.ownerDocument.createCDATASection(a.nodeValue));return b},_checkName:function(a){a=a.substring(0,1)>="A"&&a.substring(0,1)<="Z"?a.toLowerCase(): a;return a.substring(0,4)=="svg:"?a.substring(4):a},load:function(a,b){b||this.clear(!0);var c=this,d=f.ajax({url:a,dataType:"xml",success:function(a){if(f.browser.msie&&(a.loadXML(d.responseText),a.parseError.errorCode!=0)){c.text(null,10,20,svgManager.region.errorLoadingText+": "+a.parseError.reason);return}for(var b={},g=0;g<a.documentElement.attributes.length;g++){var i=a.documentElement.attributes.item(g);if(!(i.nodeName=="version"||i.nodeName.substring(0,5)=="xmlns"))b[i.nodeName]=i.nodeValue}c.configure(b, !0);a=a.documentElement.childNodes;for(g=0;g<a.length;g++)c.add(null,a[g])},error:function(a,b,d){c.text(null,10,20,svgManager.region.errorLoadingText+": "+b+(d?" "+d.message:""))}})},remove:function(a){a.parentNode.removeChild(a)},clear:function(a){for(a&&this.configure({},!0);this._svg.firstChild;)this._svg.removeChild(this._svg.firstChild)},toSVG:function(){return this._toSVG(this._svg)},_toSVG:function(a){var b="";if(!a)return b;if(a.nodeType==3)b=a.nodeValue;else if(a.nodeType==4)b="<![CDATA["+ a.nodeValue+"]]\>";else{b="<"+a.nodeName;if(a.attributes)for(var c=0;c<a.attributes.length;c++){var d=a.attributes.item(c);f.trim(d.nodeValue)==""||d.nodeValue.match(/^\[object/)||d.nodeValue.match(/^function/)||(b+=" "+(d.namespaceURI==svgManager.xlinkNS?"xlink:":"")+d.nodeName+'="'+d.nodeValue+'"')}if(a.firstChild){b+=">";for(c=a.firstChild;c;)b+=this._toSVG(c),c=c.nextSibling;b+="</"+a.nodeName+">"}else b+="/>"}return b},_escapeXML:function(a){a=a.replace(/&/g,"&amp;");a=a.replace(/</g,"&lt;"); return a=a.replace(/>/g,"&gt;")}});f.extend(m.prototype,{reset:function(){this._path="";return this},moveTo:function(a,b,c){c=j(a)?b:c;return this._coords(c?"m":"M",a,b)},lineTo:function(a,b,c){c=j(a)?b:c;return this._coords(c?"l":"L",a,b)},horizTo:function(a,b){this._path+=(b?"h":"H")+a;return this},vertTo:function(a,b){this._path+=(b?"v":"V")+a;return this},curveCTo:function(a,b,c,d,e,f,g){g=j(a)?b:g;return this._coords(g?"c":"C",a,b,c,d,e,f)},smoothCTo:function(a,b,c,d,e){e=j(a)?b:e;return this._coords(e? "s":"S",a,b,c,d)},curveQTo:function(a,b,c,d,e){e=j(a)?b:e;return this._coords(e?"q":"Q",a,b,c,d)},smoothQTo:function(a,b,c){c=j(a)?b:c;return this._coords(c?"t":"T",a,b)},_coords:function(a,b,c,d,e,f,g){if(j(b))for(c=0;c<b.length;c++)d=b[c],this._path+=(c==0?a:" ")+d[0]+","+d[1]+(d.length<4?"":" "+d[2]+","+d[3]+(d.length<6?"":" "+d[4]+","+d[5]));else this._path+=a+b+","+c+(d==null?"":" "+d+","+e+(f==null?"":" "+f+","+g));return this},arcTo:function(a,b,c,d,e,f,g,i){i=j(a)?b:i;this._path+=i?"a":"A"; if(j(a))for(b=0;b<a.length;b++)c=a[b],this._path+=(b==0?"":" ")+c[0]+","+c[1]+" "+c[2]+" "+(c[3]?"1":"0")+","+(c[4]?"1":"0")+" "+c[5]+","+c[6];else this._path+=a+","+b+" "+c+" "+(d?"1":"0")+","+(e?"1":"0")+" "+f+","+g;return this},close:function(){this._path+="z";return this},path:function(){return this._path}});f.extend(n.prototype,{reset:function(){this._parts=[];return this},string:function(a){this._parts[this._parts.length]=["text",a];return this},span:function(a,b){this._parts[this._parts.length]= ["tspan",a,b];return this},ref:function(a,b){this._parts[this._parts.length]=["tref",a,b];return this},path:function(a,b,c){this._parts[this._parts.length]=["textpath",b,f.extend({href:a},c||{})];return this}});f.fn.svg=function(a,b,c){typeof a=="function"&&(c=b,b=a,a=null);a&&typeof a=="object"&&(c=a,a=b=null);b&&typeof b=="object"&&(c=b,b=null);return this.each(function(){svgManager._connectSVG(this,a,b,c)})};svgManager=new k})(jQuery);

/* JQuery DrawingLibrary */
var supportsvg=detectSVG(); jQuery.browser.msie&&(window.CanvasRenderingContext2D||function(){function c(b){var a=b.srcElement;switch(b.propertyName){case "width":a.style.width=a.attributes.width.nodeValue+"px";a.getContext().clearRect();break;case "height":a.style.height=a.attributes.height.nodeValue+"px",a.getContext().clearRect()}}function d(a){a=a.srcElement;if(a.firstChild)a.firstChild.style.width=a.clientWidth+"px",a.firstChild.style.height=a.clientHeight+"px"}function g(){return[[1,0,0],[0,1,0],[0,0,1]]}function a(a, b){for(var d=g(),c=0;c<3;c++)for(var e=0;e<3;e++){for(var f=0,h=0;h<3;h++)f+=a[c][h]*b[h][e];d[c][e]=f}return d}function h(a,b){b.fillStyle=a.fillStyle;b.lineCap=a.lineCap;b.lineJoin=a.lineJoin;b.lineWidth=a.lineWidth;b.miterLimit=a.miterLimit;b.shadowBlur=a.shadowBlur;b.shadowColor=a.shadowColor;b.shadowOffsetX=a.shadowOffsetX;b.shadowOffsetY=a.shadowOffsetY;b.strokeStyle=a.strokeStyle;b.arcScaleX_=a.arcScaleX_;b.arcScaleY_=a.arcScaleY_}function b(a){var b,d=1,a=String(a);if(a.substring(0,3)=="rgb"){b= a.indexOf("(",3);var c=a.indexOf(")",b+1),c=a.substring(b+1,c).split(",");b="#";for(var e=0;e<3;e++)b+=r[Number(c[e])];c.length==4&&a.substr(3,1)=="a"&&(d=c[3])}else b=a;return[b,d]}function e(a){switch(a){case "butt":return"flat";case "round":return"round";default:return"square"}}function k(a){this.m_=g();this.mStack_=[];this.aStack_=[];this.currentPath_=[];this.fillStyle=this.strokeStyle="#000";this.lineWidth=1;this.lineJoin="miter";this.lineCap="butt";this.miterLimit=p*1;this.globalAlpha=1;this.canvas= a;var b=a.ownerDocument.createElement("div");b.style.width=a.clientWidth+"px";b.style.height=a.clientHeight+"px";b.style.overflow="hidden";b.style.position="absolute";a.appendChild(b);this.element_=b;this.arcScaleY_=this.arcScaleX_=1}function f(a){this.type_=a;this.radius2_=this.radius1_=0;this.colors_=[];this.focus_={x:0,y:0}}function m(){}var i=Math,l=i.round,j=i.sin,n=i.cos,p=10,q=p/2,i={init:function(a){var b=a||document;if(/MSIE/.test(navigator.userAgent)&&!window.opera){var c=this;b.attachEvent("onreadystatechange", function(){c.init_(b)})}},init_:function(a){if(a.readyState=="complete"){a.namespaces.g_vml_||a.namespaces.add("g_vml_","urn:schemas-microsoft-com:vml");a.createStyleSheet().cssText="canvas{display:inline-block;overflow:hidden;text-align:left;width:300px;height:150px}g_vml_\\:*{behavior:url(#default#VML)}";for(var b=$(".canvas").get(),a=0;a<b.length;a++){var c=document.createElement("canvas");c.style.width=$(b[a]).css("width");c.style.height=$(b[a]).css("height");b[a].appendChild(c)}b=$(".canvas").find("canvas").get(); for(a=0;a<b.length;a++)b[a].getContext||this.initElement(b[a])}},fixElement_:function(a){var b=a.outerHTML,c=a.ownerDocument.createElement(b);if(b.slice(-2)!="/>"){for(var b="/"+a.tagName,d;(d=a.nextSibling)&&d.tagName!=b;)d.removeNode();d&&d.removeNode()}a.parentNode.replaceChild(c,a);return c},initElement:function(a){a=this.fixElement_(a);a.getContext=function(){if(this.context_)return this.context_;return this.context_=new k(this)};a.attachEvent("onpropertychange",c);a.attachEvent("onresize",d); var b=a.attributes;b.width&&b.width.specified?a.style.width=b.width.nodeValue+"px":a.width=a.clientWidth;b.height&&b.height.specified?a.style.height=b.height.nodeValue+"px":a.height=a.clientHeight;return a}};i.init();for(var r=[],o=0;o<16;o++)for(var t=0;t<16;t++)r[o*16+t]=o.toString(16)+t.toString(16);o=k.prototype;o.clearRect=function(){this.element_.innerHTML="";this.currentPath_=[]};o.beginPath=function(){this.currentPath_=[]};o.moveTo=function(a,b){this.currentPath_.push({type:"moveTo",x:a,y:b}); this.currentX_=a;this.currentY_=b};o.lineTo=function(a,b){this.currentPath_.push({type:"lineTo",x:a,y:b});this.currentX_=a;this.currentY_=b};o.bezierCurveTo=function(a,b,c,d,e,g){this.currentPath_.push({type:"bezierCurveTo",cp1x:a,cp1y:b,cp2x:c,cp2y:d,x:e,y:g});this.currentX_=e;this.currentY_=g};o.quadraticCurveTo=function(a,b,c,d){a=this.currentX_+2/3*(a-this.currentX_);b=this.currentY_+2/3*(b-this.currentY_);this.bezierCurveTo(a,b,a+(c-this.currentX_)/3,b+(d-this.currentY_)/3,c,d)};o.arc=function(a, b,c,d,e,g){c*=p;var f=g?"at":"wa",h=a+n(d)*c-q,d=b+j(d)*c-q,l=a+n(e)*c-q,e=b+j(e)*c-q;h==l&&!g&&(h+=0.125);this.currentPath_.push({type:f,x:a,y:b,radius:c,xStart:h,yStart:d,xEnd:l,yEnd:e})};o.rect=function(a,b,c,d){this.moveTo(a,b);this.lineTo(a+c,b);this.lineTo(a+c,b+d);this.lineTo(a,b+d);this.closePath()};o.strokeRect=function(a,b,c,d){this.beginPath();this.moveTo(a,b);this.lineTo(a+c,b);this.lineTo(a+c,b+d);this.lineTo(a,b+d);this.closePath();this.stroke()};o.fillRect=function(a,b,c,d){this.beginPath(); this.moveTo(a,b);this.lineTo(a+c,b);this.lineTo(a+c,b+d);this.lineTo(a,b+d);this.closePath();this.fill()};o.createLinearGradient=function(){return new f("gradient")};o.createRadialGradient=function(a,b,c,d,e,g){d=new f("gradientradial");d.radius1_=c;d.radius2_=g;d.focus_.x=a;d.focus_.y=b;return d};o.drawImage=function(a){var b,c,d,e,g,f,h,i;d=a.runtimeStyle.width;e=a.runtimeStyle.height;a.runtimeStyle.width="auto";a.runtimeStyle.height="auto";var k=a.width,j=a.height;a.runtimeStyle.width=d;a.runtimeStyle.height= e;if(arguments.length==3)b=arguments[1],c=arguments[2],g=f=0,h=d=k,i=e=j;else if(arguments.length==5)b=arguments[1],c=arguments[2],d=arguments[3],e=arguments[4],g=f=0,h=k,i=j;else if(arguments.length==9)g=arguments[1],f=arguments[2],h=arguments[3],i=arguments[4],b=arguments[5],c=arguments[6],d=arguments[7],e=arguments[8];else throw"Invalid number of arguments";var m=this.getCoords_(b,c),n=[];n.push(" <g_vml_:group",' coordsize="',p*10,",",p*10,'"',' coordorigin="0,0"',' style="width:',10,";height:", 10,";position:absolute;");if(this.m_[0][0]!=1||this.m_[0][1]){var o=[];o.push("M11='",this.m_[0][0],"',","M12='",this.m_[1][0],"',","M21='",this.m_[0][1],"',","M22='",this.m_[1][1],"',","Dx='",l(m.x/p),"',","Dy='",l(m.y/p),"'");var q=this.getCoords_(b+d,c),r=this.getCoords_(b,c+e);b=this.getCoords_(b+d,c+e);m.x=Math.max(m.x,q.x,r.x,b.x);m.y=Math.max(m.y,q.y,r.y,b.y);n.push("padding:0 ",l(m.x/p),"px ",l(m.y/p),"px 0;filter:progid:DXImageTransform.Microsoft.Matrix(",o.join(""),", sizingmethod='clip');")}else n.push("top:", l(m.y/p),"px;left:",l(m.x/p),"px;");n.push(' ">','<g_vml_:image src="',a.src,'"',' style="width:',p*d,";"," height:",p*e,';"',' cropleft="',g/k,'"',' croptop="',f/j,'"',' cropright="',(k-g-h)/k,'"',' cropbottom="',(j-f-i)/j,'"'," />","</g_vml_:group>");this.element_.insertAdjacentHTML("BeforeEnd",n.join(""))};o.stroke=function(a){var d=[],c=b(a?this.fillStyle:this.strokeStyle),g=c[0],c=c[1]*this.globalAlpha;d.push("<g_vml_:shape",' fillcolor="',g,'"',' filled="',Boolean(a),'"',' style="position:absolute;width:', 10,";height:",10,';"',' coordorigin="0 0" coordsize="',p*10," ",p*10,'"',' stroked="',!a,'"',' strokeweight="',this.lineWidth,'"',' strokecolor="',g,'"',' path="');for(var f={x:null,y:null},h={x:null,y:null},k=0;k<this.currentPath_.length;k++){var i=this.currentPath_[k];if(i.type=="moveTo"){d.push(" m ");var j=this.getCoords_(i.x,i.y);d.push(l(j.x),",",l(j.y))}else if(i.type=="lineTo")d.push(" l "),j=this.getCoords_(i.x,i.y),d.push(l(j.x),",",l(j.y));else if(i.type=="close")d.push(" x ");else if(i.type== "bezierCurveTo"){d.push(" c ");var j=this.getCoords_(i.x,i.y),m=this.getCoords_(i.cp1x,i.cp1y),i=this.getCoords_(i.cp2x,i.cp2y);d.push(l(m.x),",",l(m.y),",",l(i.x),",",l(i.y),",",l(j.x),",",l(j.y))}else if(i.type=="at"||i.type=="wa"){d.push(" ",i.type," ");var j=this.getCoords_(i.x,i.y),m=this.getCoords_(i.xStart,i.yStart),n=this.getCoords_(i.xEnd,i.yEnd);d.push(l(j.x-this.arcScaleX_*i.radius),",",l(j.y-this.arcScaleY_*i.radius)," ",l(j.x+this.arcScaleX_*i.radius),",",l(j.y+this.arcScaleY_*i.radius), " ",l(m.x),",",l(m.y)," ",l(n.x),",",l(n.y))}if(j){if(f.x==null||j.x<f.x)f.x=j.x;if(h.x==null||j.x>h.x)h.x=j.x;if(f.y==null||j.y<f.y)f.y=j.y;if(h.y==null||j.y>h.y)h.y=j.y}}d.push(' ">');if(typeof this.fillStyle=="object"){a={x:"50%",y:"50%"};k=h.x-f.x;f=h.y-f.y;g=k>f?k:f;a.x=l(this.fillStyle.focus_.x/k*100+50)+"%";a.y=l(this.fillStyle.focus_.y/f*100+50)+"%";f=[];this.fillStyle.type_=="gradientradial"?(h=this.fillStyle.radius1_/g*100,g=this.fillStyle.radius2_/g*100-h):(h=0,g=100);j={offset:null,color:null}; i={offset:null,color:null};this.fillStyle.colors_.sort(function(a,b){return a.offset-b.offset});for(k=0;k<this.fillStyle.colors_.length;k++){m=this.fillStyle.colors_[k];f.push(m.offset*g+h,"% ",m.color,",");if(m.offset>j.offset||j.offset==null)j.offset=m.offset,j.color=m.color;if(m.offset<i.offset||i.offset==null)i.offset=m.offset,i.color=m.color}f.pop();d.push("<g_vml_:fill",' color="',i.color,'"',' color2="',j.color,'"',' type="',this.fillStyle.type_,'"',' focusposition="',a.x,", ",a.y,'"',' colors="', f.join(""),'"',' opacity="',c,'" />')}else a?d.push('<g_vml_:fill color="',g,'" opacity="',c,'" />'):d.push("<g_vml_:stroke",' opacity="',c,'"',' joinstyle="',this.lineJoin,'"',' miterlimit="',this.miterLimit,'"',' endcap="',e(this.lineCap),'"',' weight="',this.lineWidth,'px"',' color="',g,'" />');d.push("</g_vml_:shape>");this.element_.insertAdjacentHTML("beforeEnd",d.join(""));this.currentPath_=[]};o.fill=function(){this.stroke(!0)};o.closePath=function(){this.currentPath_.push({type:"close"})}; o.getCoords_=function(a,b){return{x:p*(a*this.m_[0][0]+b*this.m_[1][0]+this.m_[2][0])-q,y:p*(a*this.m_[0][1]+b*this.m_[1][1]+this.m_[2][1])-q}};o.save=function(){var b={};h(this,b);this.aStack_.push(b);this.mStack_.push(this.m_);this.m_=a(g(),this.m_)};o.restore=function(){h(this.aStack_.pop(),this);this.m_=this.mStack_.pop()};o.translate=function(b,d){this.m_=a([[1,0,0],[0,1,0],[b,d,1]],this.m_)};o.rotate=function(b){var d=n(b),b=j(b);this.m_=a([[d,b,0],[-b,d,0],[0,0,1]],this.m_)};o.scale=function(b, d){this.arcScaleX_*=b;this.arcScaleY_*=d;this.m_=a([[b,0,0],[0,d,0],[0,0,1]],this.m_)};o.clip=function(){};o.arcTo=function(){};o.createPattern=function(){return new m};f.prototype.addColorStop=function(a,d){d=b(d);this.colors_.push({offset:1-a,color:d})};G_vmlCanvasManager=i;CanvasRenderingContext2D=k;CanvasGradient=f;CanvasPattern=m}()); (function(c){c.fn._mkDiv=function(d,g,a,h,b){c(this).append('<div style="position:absolute;left:'+d+"px;top:"+g+"px;width:"+a+"px;height:"+h+"px;margin: 0 0 0 0; padding: 0 0 0 0;clip:rect(0,"+a+"px,"+h+"px,0);opacity:"+b.opacity+";background-color: "+b.color+";background-image: url("+b.backgroundImage+");background-position: "+-(d-b.xorigin)+"px "+-(g-b.yorigin)+'px;"></div>')};c.fn._mkLin=function(d,g,a,h,b){if(d>a)var e=a,k=h,a=d,h=g,d=e,g=k;var e=a-d,k=Math.abs(h-g),f=g,m=g>h?-1:1;if(e>=k){for(var i= k<<1,l=i-(e<<1),j=i-e,g=d;e>0;)--e,++d,j>0?(c(this)._mkDiv(g,f,d-g,1,b),f+=m,j+=l,g=d):j+=i;c(this)._mkDiv(g,f,a-g+1,1,b)}else if(i=e<<1,l=i-(k<<1),j=i-k,e=f,h<=g){for(;k>0;)--k,j>0?(c(this)._mkDiv(d++,f,1,e-f+1,b),f+=m,j+=l,e=f):(f+=m,j+=i);c(this)._mkDiv(a,h,1,e-h+1,b)}else{for(;k>0;)--k,f+=m,j>0?(c(this)._mkDiv(d++,e,1,f-e,b),j+=l,e=f):j+=i;c(this)._mkDiv(a,e,1,h-e+1,b)}return c(this)};c.fn._mkLin2D=function(d,g,a,h,b){if(d>a)var e=a,k=h,a=d,h=g,d=e,g=k;var e=a-d,k=Math.abs(h-g),f=g,m=g>h?-1:1, i=b.stroke;if(e>=k){if(e>0&&i-3>0)var l=(i*e*Math.sqrt(1+k*k/(e*e))-e-(i>>1)*k)/e,l=(!(i-4)?Math.ceil(l):Math.round(l))+1;else l=i;for(var i=Math.ceil(i/2),j=k<<1,n=j-(e<<1),p=j-e,g=d;e>0;)--e,++d,p>0?(c(this)._mkDiv(g,f,d-g+i,l,b),f+=m,p+=n,g=d):p+=j;c(this)._mkDiv(g,f,a-g+i+1,l,b)}else if(i-3>0?(l=(i*k*Math.sqrt(1+e*e/(k*k))-(i>>1)*e-k)/k,l=(!(i-4)?Math.ceil(l):Math.round(l))+1):l=i,i=Math.round(i/2),j=e<<1,n=j-(k<<1),p=j-k,e=f,h<=g){for(++i;k>0;)--k,p>0?(c(this)._mkDiv(d++,f,l,e-f+i,b),f+=m,p+= n,e=f):(f+=m,p+=j);c(this)._mkDiv(a,h,l,e-h+i,b)}else{for(;k>0;)--k,f+=m,p>0?(c(this)._mkDiv(d++,e,l,f-e+i,b),p+=n,e=f):p+=j;c(this)._mkDiv(a,e,l,h-e+i+1,b)}return c(this)};c.fn._mkLinDott=function(d,g,a,h,b){if(d>a)var e=a,k=h,a=d,h=g,d=e,g=k;a-=d;e=Math.abs(h-g);k=g;g=g>h?-1:1;h=!0;if(a>=e)for(var f=e<<1,m=f-(a<<1),i=f-a;a>0;)--a,h&&c(this)._mkDiv(d,k,1,1,b),h=!h,i>0?(k+=g,i+=m):i+=f,++d;else{f=a<<1;m=f-(e<<1);for(i=f-e;e>0;)--e,h&&c(this)._mkDiv(d,k,1,1,b),h=!h,k+=g,i>0?(++d,i+=m):i+=f}h&&c(this)._mkDiv(d, k,1,1,b);return c(this)};c.fn._mkOv=function(d,g,a,h,b){var e=++a>>1,k=++h>>1;a&=1;h&=1;d+=e;g+=k;for(var f=0,m=k,i=0,l=k,j=e*e<<1,n=j<<1,p=k*k<<1,q=p<<1,r=(j>>1)*(1-(k<<1))+p,k=(p>>1)-j*((k<<1)-1),o,t;m>0;)r<0?(r+=p*((f<<1)+3),k+=q*++f):k<0?(r+=p*((f<<1)+3)-n*(m-1),k+=q*++f-j*((m--<<1)-3),o=f-i,t=l-m,o&2&&t&2?(c(this)._mkOvQds(d,g,f-2,m+2,1,1,a,h,b),c(this)._mkOvQds(d,g,f-1,m+1,1,1,a,h,b)):c(this)._mkOvQds(d,g,f-1,l,o,t,a,h,b),i=f,l=m):(k-=j*((m<<1)-3),r-=n*--m);o=e-i+1;t=(l<<1)+h;m=g-l;c(this)._mkDiv(d- e,m,o,t,b);c(this)._mkDiv(d+i+a-1,m,o,t,b);return c(this)};c.fn._mkOv2D=function(d,g,a,h,b){var e=b.stroke;a+=e+1;h+=e+1;var k=a>>1,f=h>>1,m=a&1,i=h&1;d+=k;g+=f;var l=0,j=f,n=k*k<<1,p=n<<1,q=f*f<<1,r=q<<1,o=(n>>1)*(1-(f<<1))+q,t=(q>>1)-n*((f<<1)-1);if(e-4<0&&(!(e-2)||a-51>0&&h-51>0)){for(var s=0;j>0;)o<0?(o+=q*((l<<1)+3),t+=r*++l):t<0?(o+=q*((l<<1)+3)-p*(j-1),t+=r*++l-n*((j--<<1)-3),a=l-s,h=f-j,a-1?(a=a+1+(e&1),h=e):h-1?(a=e,h+=1+(e&1)):a=h=e,c(this)._mkOvQds(d,g,l-1,f,a,h,m,i,b),s=l,f=j):(t-=n*((j<< 1)-3),o-=p*--j);c(this)._mkDiv(d-k,g-f,e,(f<<1)+i,b);c(this)._mkDiv(d+k+m-e,g-f,e,(f<<1)+i,b)}else{var a=a-(e<<1)>>1,s=h-(e<<1)>>1,x=0,u=s,v=a*a<<1,A=v<<1,w=s*s<<1,z=w<<1,y=(v>>1)*(1-(s<<1))+w,B=(w>>1)-v*((s<<1)-1),e=[],h=[],a=[];e[0]=0;h[0]=f;for(a[0]=s-1;j>0;)o<0?(e[e.length]=l,h[h.length]=j,o+=q*((l<<1)+3),t+=r*++l):t<0?(e[e.length]=l,o+=q*((l<<1)+3)-p*(j-1),t+=r*++l-n*((j--<<1)-3),h[h.length]=j):(t-=n*((j<<1)-3),o-=p*--j),u>0&&(y<0?(y+=w*((x<<1)+3),B+=z*++x,a[a.length]=u-1):B<0?(y+=w*((x<<1)+ 3)-A*(u-1),B+=z*++x-v*((u--<<1)-3),a[a.length]=u-1):(B-=v*((u<<1)-3),y-=A*--u,a[a.length-1]--));s=-m;j=a[0];n=e.length;for(p=0;p<n;p++)if(typeof a[p]!="undefined"){if(a[p]<j||h[p]<f)l=e[p],c(this)._mkOvQds(d,g,l,f,l-s,f-j,m,i,b),s=l,f=h[p],j=a[p]}else l=e[p],c(this)._mkDiv(d-l,g-f,1,(f<<1)+i,b),c(this)._mkDiv(d+s+m,g-f,1,(f<<1)+i,b),s=l,f=h[p];c(this)._mkDiv(d-k,g-f,1,(f<<1)+i,b);c(this)._mkDiv(d+s+m,g-f,1,(f<<1)+i,b)}return c(this)};c.fn._mkOvDott=function(d,g,a,h,b){var e=++a>>1,k=++h>>1;a&=1;h&= 1;var f=h^1;d+=e;g+=k;for(var m=0,i=k,e=e*e<<1,l=e<<1,j=k*k<<1,n=j<<1,p=(e>>1)*(1-(k<<1))+j,k=(j>>1)-e*((k<<1)-1),q=!0;i>0;)p<0?(p+=j*((m<<1)+3),k+=n*++m):k<0?(p+=j*((m<<1)+3)-l*(i-1),k+=n*++m-e*((i--<<1)-3)):(k-=e*((i<<1)-3),p-=l*--i),q&&i>=f&&c(this)._mkOvQds(d,g,m,i,1,1,a,h,b),q=!q;return c(this)};c.fn._mkRect=function(d,g,a,h,b){var e=b.stroke;c(this)._mkDiv(d,g,a,e,b);c(this)._mkDiv(d+a,g,e,h,b);c(this)._mkDiv(d,g+h,a+e,e,b);c(this)._mkDiv(d,g+e,e,h-e,b);return c(this)};c.fn._mkRectDott=function(d, g,a,h,b){c(this).drawLine(d,g,d+a,g,b);c(this).drawLine(d+a,g,d+a,g+h,b);c(this).drawLine(d,g+h,d+a,g+h,b);c(this).drawLine(d,g,d,g+h,b);return c(this)};c.fn.drawLine=function(d,g,a,h,b){b=jQuery.extend({stroke:1,color:"black",opacity:1,backgroundImage:"none"},b);b.xorigin=d;b.yorigin=g;if(supportsvg.support&&!jQuery.browser.msie){var e="id"+parseInt(Math.random()*1E6);c(this).append("<div id ='"+e+"' style='position: absolute;top: 0; left: 0;'></div>");c("#"+e).css("width",c(this).css("width")).css("height", c(this).css("height")).svg(function(){var c=svgManager.getSVGFor("#"+e),f=c.group(null,{stroke:b.color,stroke_width:b.stroke});c.line(f,d,g,a,h)})}else{c(this).find("canvas").get(0)||c(this).append("<canvas width='"+c(this).css("width")+"' height='"+c(this).css("height")+"' style='position: absolute; top: 0; left: 0;'></canvas>");var k=c(this).find("canvas").get(0);try{var f=k.getContext("2d");f.globalAlpha=b.opacity;f.lineWidth=b.stroke=="dotted"?0.5:b.stroke=="dotted"?0.5:b.stroke;f.beginPath(); f.strokeStyle=b.color;f.moveTo(d,g);f.lineTo(a,h);f.closePath();f.stroke()}catch(m){b.stroke=="dotted"?c(this)._mkLinDott(d,g,a,h,b):b.stroke-1>0?c(this)._mkLin2D(d,g,a,h,b):c(this)._mkLin(d,g,a,h,b)}}return c(this)};c.fn.drawRect=function(d,g,a,h,b){b=jQuery.extend({stroke:1,color:"black",opacity:1,backgroundImage:"none"},b);b.xorigin=d;b.yorigin=g;if(supportsvg.support&&!jQuery.browser.msie){var e="id"+parseInt(Math.random()*1E6);c(this).append("<div id ='"+e+"' style='position: absolute;top: 0; left: 0;'></div>"); c("#"+e).css("width",c(this).css("width")).css("height",c(this).css("height")).svg(function(){var c=svgManager.getSVGFor("#"+e);c.group(null,{stroke:b.color,stroke_width:b.stroke});c.rect(null,d,g,a,h,{fill:"none",stroke:b.color,stroke_width:b.stroke})})}else{c(this).find("canvas").get(0)||c(this).append("<canvas width='"+c(this).css("width")+"' height='"+c(this).css("height")+"' style='position: absolute; top: 0; left: 0;'></canvas>");var k=c(this).find("canvas").get(0);try{var f=k.getContext("2d"); f.globalAlpha=b.opacity;f.lineWidth=b.stroke=="dotted"?0.5:b.stroke;f.strokeStyle=b.color;f.strokeRect(d,g,a,h);f.closePath();f.stroke()}catch(m){b.stroke=="dotted"?c(this)._mkRectDott(d,g,a,h,b):c(this)._mkRect(d,g,a,h,b)}}return c(this)};c.fn.drawPolyline=function(d,g,a){a=jQuery.extend({stroke:1,color:"black",opacity:1,backgroundImage:"none"},a);a.xorigin=d[0];a.yorigin=g[0];for(var h=d.length-1;h;)--h,c(this).drawLine(d[h],g[h],d[h+1],g[h+1],a);return c(this)};c.fn.fillRect=function(d,g,a,h,b){b= jQuery.extend({stroke:1,color:"black",opacity:1,backgroundImage:"none"},b);b.xorigin=d;b.yorigin=g;if(supportsvg.support&&!jQuery.browser.msie){var e="id"+parseInt(Math.random()*1E6);c(this).append("<div id ='"+e+"' style='position: absolute;top: 0; left: 0;'></div>");c("#"+e).css("width",c(this).css("width")).css("height",c(this).css("height")).svg(function(){var c=svgManager.getSVGFor("#"+e);c.group(null,{stroke:b.color,stroke_width:b.stroke});c.rect(null,d,g,a,h,{fill:b.color})})}else{c(this).find("canvas").get(0)|| c(this).append("<canvas width='"+c(this).css("width")+"' height='"+c(this).css("height")+"' style='position: absolute; top: 0; left: 0;'></canvas>");var k=c(this).find("canvas").get(0);try{var f=k.getContext("2d");f.globalAlpha=b.opacity;f.lineWidth=b.stroke=="dotted"?0.5:b.stroke;if(b.backgroundImage!="none"){var m=new Image;m.src=b.backgroundImage;if(!jQuery.browser.msie)m.onload=function(){var b=f.createPattern(m,"repeat");f.fillStyle=b;f.fillRect(d,g,a,h)}}else f.fillStyle=b.color,f.fillRect(d, g,a,h)}catch(i){c(this)._mkDiv(d,g,a,h,b)}}return c(this)};c.fn.drawPolygon=function(d,g,a){a=jQuery.extend({stroke:1,color:"black",opacity:1,backgroundImage:"none"},a);a.xorigin=d[0];a.yorigin=g[0];c(this).drawPolyline(d,g,a);c(this).drawLine(d[d.length-1],g[d.length-1],d[0],g[0],a);return c(this)};c.fn.drawEllipse=function(d,g,a,h,b){b=jQuery.extend({stroke:1,color:"black",opacity:1,backgroundImage:"none"},b);b.xorigin=d;b.yorigin=g;c(this).find("canvas").get(0)||c(this).append("<canvas width='"+ c(this).css("width")+"' height='"+c(this).css("height")+"' style='position: absolute; top: 0; left: 0;'></canvas>");var e=c(this).find("canvas").get(0);if(supportsvg.support&&!jQuery.browser.msie){var k="id"+parseInt(Math.random()*1E6);c(this).append("<div id ='"+k+"' style='position: absolute;top: 0; left: 0;'></div>");c("#"+k).css("width",c(this).css("width")).css("height",c(this).css("height")).svg(function(){var c=svgManager.getSVGFor("#"+k);c.group(null,{stroke:b.color,stroke_width:b.stroke}); c.ellipse(null,d+a/2,g+h/2,a/2,h/2,{fill:"none",stroke:b.color,stroke_width:b.stroke})})}else try{var f=e.getContext("2d");a+=d;h+=g;f.globalAlpha=b.opacity;f.lineWidth=b.stroke=="dotted"?0.5:b.stroke;var m=4*((Math.sqrt(2)-1)/3),e=(a-d)/2,i=(h-g)/2,l=d+e,j=g+i;f.beginPath();f.strokeStyle=b.color;f.moveTo(l,j-i);f.bezierCurveTo(l+m*e,j-i,l+e,j-m*i,l+e,j);f.bezierCurveTo(l+e,j+m*i,l+m*e,j+i,l,j+i);f.bezierCurveTo(l-m*e,j+i,l-e,j+m*i,l-e,j);f.bezierCurveTo(l-e,j-m*i,l-m*e,j-i,l,j-i);f.closePath();f.stokeStyle= b.color;f.stroke()}catch(n){b.stroke=="dotted"?c(this)._mkOvDott(d,g,a,h,b):b.stroke-1>0?c(this)._mkOv2D(d,g,a,h,b):c(this)._mkOv(d,g,a,h,b)}return c(this)};c.fn.fillEllipse=function(d,g,a,h,b){b=jQuery.extend({stroke:1,color:"black",opacity:1,backgroundImage:"none"},b);b.xorigin=d;b.yorigin=g;if(supportsvg.support&&!jQuery.browser.msie){var e="id"+parseInt(Math.random()*1E6);c(this).append("<div id ='"+e+"' style='position: absolute;top: 0; left: 0;'></div>");c("#"+e).css("width",c(this).css("width")).css("height", c(this).css("height")).svg(function(){var c=svgManager.getSVGFor("#"+e);c.group(null,{stroke:b.color,stroke_width:b.stroke});c.ellipse(null,d+a/2,g+h/2,a/2,h/2,{fill:b.color})})}else{c(this).find("canvas").get(0)||c(this).append("<canvas width='"+c(this).css("width")+"' height='"+c(this).css("height")+"' style='position: absolute; top: 0; left: 0;'></canvas>");var k=c(this).find("canvas").get(0);try{var f=k.getContext("2d");a+=d;h+=g;f.globalAlpha=b.opacity;f.lineWidth=b.stroke=="dotted"?0.5:b.stroke; if(b.backgroundImage!="none"){var m=new Image;m.src=b.backgroundImage;c(m).ready(function(){var c=f.createPattern(m,"repeat");f.moveTo(d,g);var e=4*((Math.sqrt(2)-1)/3),i=(a-d)/2,k=(h-g)/2,j=d+i,l=g+k;f.beginPath();f.fillStyle=c;f.globalAlpha=b.opacity;f.lineWidth=b.stroke=="dotted"?0.5:b.stroke;f.moveTo(j,l-k);f.bezierCurveTo(j+e*i,l-k,j+i,l-e*k,j+i,l);f.bezierCurveTo(j+i,l+e*k,j+e*i,l+k,j,l+k);f.bezierCurveTo(j-e*i,l+k,j-i,l+e*k,j-i,l);f.bezierCurveTo(j-i,l-e*k,j-e*i,l-k,j,l-k);f.closePath();f.fill()})}else{f.fillStyle= b.color;f.globalAlpha=b.opacity;f.lineWidth=b.stroke=="dotted"?0.5:b.stroke;f.fillStyle=b.color;f.beginPath();f.moveTo(d,g);var i=4*((Math.sqrt(2)-1)/3),l=(a-d)/2,j=(h-g)/2,k=d+l,n=g+j;f.beginPath();f.moveTo(k,n-j);f.bezierCurveTo(k+i*l,n-j,k+l,n-i*j,k+l,n);f.bezierCurveTo(k+l,n+i*j,k+i*l,n+j,k,n+j);f.bezierCurveTo(k-i*l,n+j,k-l,n+i*j,k-l,n);f.bezierCurveTo(k-l,n-i*j,k-i*l,n-j,k,n-j);f.closePath();f.fill()}}catch(p){var i=a>>1,q=h>>1,l=a&1,j=h&1,k=d+i,n=g+q,r=0,o=q,t=q,s=i*i<<1,x=s<<1,u=q*q<<1,v= u<<1,A=(s>>1)*(1-(q<<1))+u,q=(u>>1)-s*((q<<1)-1),w,z,y;if(a)for(;o>0;)A<0?(A+=u*((r<<1)+3),q+=v*++r):q<0?(A+=u*((r<<1)+3)-x*(o-1),w=k-r,z=(r<<1)+l,q+=v*++r-s*((o--<<1)-3),y=t-o,c(this)._mkDiv(w,n-t,z,y,b),c(this)._mkDiv(w,n+o+j,z,y,b),t=o):(q-=s*((o<<1)-3),A-=x*--o);c(this)._mkDiv(k-i,n-t,a,(t<<1)+j,b)}}return c(this)};c.fn.fillArc=function(d,g,a,h,b,e){e=jQuery.extend({stroke:1,color:"black",opacity:1,backgroundImage:"none"},e);e.xorigin=d;e.yorigin=g;if(supportsvg.support&&!jQuery.browser.msie){var k= "id"+parseInt(Math.random()*1E6);c(this).append("<div id ='"+k+"' style='position: absolute;top: 0; left: 0;'></div>");c("#"+k).css("width",c(this).css("width")).css("height",c(this).css("height")).svg(function(){var c=svgManager.getSVGFor("#"+k);c.group(null,{stroke:e.color,stroke_width:e.stroke});var f=d+a/2,i=g+a/2,j=a/2,l=Math.PI+(h+90)%360*Math.PI/180,m=Math.PI+(b+90)%360*Math.PI/180,n=0;m-l>Math.PI&&(n=1);c.path(null,"M "+f+","+i+" L "+(f+j*Math.sin(l))+","+(i-j*Math.cos(l))+" A "+j+","+j+" 0 "+ n+" 1 "+(f+j*Math.sin(m))+","+(i-j*Math.cos(m))+" Z",{fill:e.color,stroke_linejoin:"round",background_fill:"none"})})}else{c(this).find("canvas").get(0)||c(this).append("<canvas width='"+c(this).css("width")+"' height='"+c(this).css("height")+"' style='position: absolute; top: 0; left: 0;'></canvas>");var f=c(this).find("canvas").get(0);try{var m=f.getContext("2d");m.globalAlpha=e.opacity;m.lineWidth=e.stroke=="dotted"?0.5:e.stroke;var i;if(e.backgroundImage!="none"){if(i=new Image,i.src=e.backgroundImage, !jQuery.browser.msie)i.onload=function(){var c=m.createPattern(i,"repeat");m.fillStyle=c;m.beginPath();m.moveTo(d+a/2,g+a/2);m.arc(d+a/2,g+a/2,a/2,2*Math.PI-h*Math.PI/180,2*Math.PI-b*Math.PI/180,!0);m.lineTo(d+a/2,g+a/2);m.closePath();m.fill()}}else m.fillStyle=e.color,m.beginPath(),m.moveTo(d+a/2,g+a/2),m.arc(d+a/2,g+a/2,a/2,2*Math.PI-h*Math.PI/180,2*Math.PI-b*Math.PI/180,!0),m.lineTo(d+a/2,g+a/2),m.closePath(),m.fill()}catch(l){var j=a>>1,n=a>>1,p=a&1|(a&1)<<16,q=d+j,r=g+n,o=0,f=n,t=o,s=f,x=j*j<< 1,u=x<<1,v=n*n<<1,A=v<<1,w=(x>>1)*(1-(n<<1))+v,z=(v>>1)-x*((n<<1)-1),y,B=1<<(Math.floor((h%=360)/180)<<3)|2<<(Math.floor((b%=360)/180)<<3)|(h>=b)<<16,C=Array(n+1),D=Array(n+1);h*=Math.PI/180;b*=Math.PI/180;t=q+Math.round(j*Math.cos(h));y=r+Math.round(-n*Math.sin(h));c(this)._mkLinVirt(C,q,r,t,y,e);j=q+Math.round(j*Math.cos(b));n=r+Math.round(-n*Math.sin(b));for(c(this)._mkLinVirt(D,q,r,j,n,e);f>0;)if(w<0)w+=v*((o<<1)+3),z+=A*++o;else if(z<0)w+=v*((o<<1)+3)-u*(f-1),t=o,z+=A*++o-x*((f--<<1)-3),c(this)._mkArcDiv(t, f,s,q,r,p,C,D,B,e),s=f;else if(z-=x*((f<<1)-3),w-=u*--f,f&&(C[f]!=C[f-1]||D[f]!=D[f-1]))c(this)._mkArcDiv(o,f,s,q,r,p,C,D,B,e),t=o,s=f}c(this)._mkArcDiv(o,0,s,q,r,p,C,D,B,e);p>>16&&(B>>16?(s=y<=r||n>r?q-o:q,c(this)._mkDiv(s,r,o+q-s+(p&65535),1,e)):B&1&&n>r&&c(this)._mkDiv(q-o,r,o,1,e))}return c(this)};c.fn.fillPolygon=function(d,g,a){a=jQuery.extend({stroke:1,color:"black",opacity:1,backgroundImage:"none"},a);a.xorigin=d[0];a.yorigin=g[0];if(supportsvg.support&&!jQuery.browser.msie){var h="id"+parseInt(Math.random()* 1E6);c(this).append("<div id ='"+h+"' style='position: absolute;top: 0; left: 0;'></div>");c("#"+h).css("width",c(this).css("width")).css("height",c(this).css("height")).svg(function(){var b=svgManager.getSVGFor("#"+h);b.group(null,{stroke:a.color,stroke_width:a.stroke});for(var c=[],e=0;e<d.length;e++)c[e]=[],c[e][0]=d[e],c[e][1]=g[e];b.polygon(null,c,{fill:a.color})})}else{c(this).find("canvas").get(0)||c(this).append("<canvas width='"+c(this).css("width")+"' height='"+c(this).css("height")+"' style='position: absolute; top: 0; left: 0;'></canvas>"); var b=c(this).find("canvas").get(0);try{var e=b.getContext("2d"),k=d.length;e.globalAlpha=a.opacity;e.lineWidth=a.stroke=="dotted"?0.5:a.stroke;e.beginPath();var f,m;if(a.backgroundImage!="none"){if(f=new Image,f.src=a.backgroundImage,!jQuery.browser.msie)f.onload=function(){m=e.createPattern(f,"repeat");e.fillStyle=m;e.moveTo(d[0],g[0]);for(var a=1;a<k;a++)e.lineTo(d[a],g[a]);e.lineTo(d[0],g[0]);e.closePath();e.fill()}}else{e.fillStyle=a.color;e.moveTo(d[0],g[0]);for(b=1;b<k;b++)e.lineTo(d[b],g[b]); e.lineTo(d[0],g[0]);e.closePath();e.fill()}}catch(i){var l,j,n,p,q,r,o,t,k=d.length;if(!k)return;l=g[0];j=g[0];for(b=1;b<k;b++)g[b]<l&&(l=g[b]),g[b]>j&&(j=g[b]);for(;l<=j;l++){for(var s=[],b=t=0;b<k;b++){b?(n=b-1,o=b):(n=k-1,o=0);p=g[n];r=g[o];if(p<r)n=d[n],q=d[o];else if(p>r)r=g[n],p=g[o],q=d[n],n=d[o];else continue;l>=p&&l<r?s[t++]=Math.round((l-p)*(q-n)/(r-p)+n):l==j&&l>p&&l<=r&&(s[t++]=Math.round((l-p)*(q-n)/(r-p)+n))}s.sort(function(a,b){return a-b});for(b=0;b<t;b+=2)c(this)._mkDiv(s[b],l,s[b+ 1]-s[b]+1,1,a)}}}return c(this)};c.fn._mkOvQds=function(d,g,a,h,b,e,k,f,m){var i=d-a,d=d+a+k-b,a=g-h,g=g+h+f-e;d>i+b?(c(this)._mkDiv(d,a,b,e,m),c(this)._mkDiv(d,g,b,e,m)):b=d-i+b;c(this)._mkDiv(i,a,b,e,m);c(this)._mkDiv(i,g,b,e,m);return c(this)};c.fn._mkArcDiv=function(d,g,a,h,b,e,k,f,m,i){var l=h+d+(e&65535);a-=g;var j,n;a||(a=1);d=h-d;m&16711680?(h=b-g-a,m&255?(m&2&&(j=Math.max(d,f[g]),n=l-j,n>0&&c(this)._mkDiv(j,h,n,a,i)),m&1&&(n=Math.min(l,k[g]),n-=d,n>0&&c(this)._mkDiv(d,h,n,a,i))):c(this)._mkDiv(d, h,l-d,a,i),h=b+g+(e>>16),m&65280?(m&256&&(j=Math.max(d,k[g]),n=l-j,n>0&&c(this)._mkDiv(j,h,n,a,i)),m&512&&(n=Math.min(l,f[g]),n-=d,n>0&&c(this)._mkDiv(d,h,n,a,i))):c(this)._mkDiv(d,h,l-d,a,i)):(m&255&&(j=m&2?Math.max(d,f[g]):d,n=m&1?Math.min(l,k[g]):l,n-=j,n>0&&c(this)._mkDiv(j,b-g-a,n,a,i)),m&65280&&(j=m&256?Math.max(d,k[g]):d,n=m&512?Math.min(l,f[g]):l,n-=j,n>0&&c(this)._mkDiv(j,b+g+(e>>16),n,a,i)));return c(this)};c.fn._mkLinVirt=function(c,g,a,h,b){var e=Math.abs(h-g),k=Math.abs(b-a),f=g,m=a, g=g>h?-1:1,b=a>b?-1:1,a=0;if(e>=k)for(var i=k<<1,l=i-(e<<1),h=i-e;e>0;)--e,h>0?(c[a++]=f,m+=b,h+=l):h+=i,f+=g;else{i=e<<1;l=i-(k<<1);for(h=i-k;k>0;)--k,m+=b,c[a++]=f,h>0?(f+=g,h+=l):h+=i}e=c.length;for(a=e-a;a;)c[e-a--]=f}})(jQuery); function detectSVG(){var c={support:null,plugin:null,builtin:null},d=null;if(navigator&&navigator.mimeTypes&&navigator.mimeTypes.length)for(var g in{"image/svg+xml":null,"image/svg":null,"image/svg-xml":null}){if(navigator.mimeTypes[g]&&(d=navigator.mimeTypes[g].enabledPlugin)&&d)c={plugin:(d=d.name.toLowerCase())&&d.indexOf("adobe")>=0?"Adobe":d.indexOf("renesis")>=0?"Renesis":"Unknown"}}else if((d=document.createElement("object"))&&d&&typeof d.setAttribute("type","image/svg+xml"))typeof d.USE_SVGZ== "string"?c={plugin:"Adobe",IID:"Adobe.SVGCtl",pluginVersion:d.window&&d.window._window_impl?d.window.evalScript?6:3:2}:d.window&&d.window.getSVGViewerVersion().indexOf("enesis")>0&&(c={plugin:"Renesis",IID:"RenesisX.RenesisCtrl.1"});c.IID=c.plugin=="Adobe"?"Adobe.SVGCtl":c.plugin=="Renesis"?"renesisX.RenesisCtrl.1":null;g=document&&document.implementation&&document.implementation.hasFeature("org.w3c.dom.svg","1.0");var a=window.Components&&window.Components.interfaces&&!!Components.interfaces.nsIDOMGetSVGDocument; c.builtin=g?window.opera?"Opera":a?"Gecko":"Safari":window.opera&&window.opera.version?"Opera":a?"Gecko":null;c.builtinVersion=c.builtin&&window.opera?parseFloat(window.opera.version()):a?typeof Iterator=="function"?Array.reduce?3:2:1.5:null;window.opera&&c.builtinVersion>=9&&(d=document.createElement("object"))&&d&&typeof d.setAttribute("type","image/svg+xml")&&document.appendChild(d)?(c.support=d.offsetWidth?"Plugin":"Builtin",document.removeChild(d)):c.support=c.plugin&&!g?"Plugin":c.builtin&& g?"Builtin":null;return c};


/*!
 * Infomous Cloud JS
 * http://www.infomous.com/
 *
 * @class CloudJS
 * @param {Object} config
 */

Infomous.define('CloudJS', (function(I) {

var CloudJS = function(vars) {

	if (!(this instanceof CloudJS))
		return new CloudJS(vars);

    //vars = I.extend(vars); //make a copy
	I.events(this);

	var base_root = I.base_root(),
	    base_path = I.base_path(),
	    jqxhr = null,
	    ga = null,
	    toolbar = null,
        //renderer = null,
	    $ = I.$,
	    self = this;

    this.get_var = function(key) {
        return vars[key];
    }

    this.set_var = function(key, value) {
        vars[key] = value;
    }

    this.set_vars = function(hash) {
        var k;
        for (k in hash)
            vars[k] = hash[k];
    }

	this.id = function() { return 'js'; }

	var defaults = {
		'setLinksTarget' : '_blank',
		'loadAtStart': true,
		'fontScale' : 1,
		'zoom' : 1,
		'maxWords' : 40,
		//Colors
		'colBackground' : '0xFAFAFA',
		//Words
		'colWord' : '0x1E450C',
		'colWordHover' : '0x103800',
		'colWordFade' : '0x436632',
		'colWordHighlighted' : '0xFF0000',
		'colWordHoverLinked' : '0x1E450C',
		'colHoverBox' : '0xEEEEEE',
		'colHoverBorder' : '0x999999',
		'colFocusBox' : '0xEEEEEE',
		'colFocusBorder' : '0xFF0000',
		//Links
		'colLink' : '0xCCCCCC',
		'colLinkHover' : '0xFF9999',
		//Blobs
		'colBlob' : '0xFAFAFA',
		'colBlobBorder' : '0x999999',
		'colBlobHover' : ' 0xCDD0D2',
		//Interaction Modes
		'setInteractionMode': 'click',
		//Sources lists
		'colSourcesFill' : '0xEEEEEE',
		'colSourcesBorder' : '0x999999',
		'colSourcesLine1' : '0x000000',
		'colSourcesLine2' : '0x666666',
		'colSourcesTextHover' : '0x0000CC',
		'skinSourcesWidth': 200,
		'skinSourcesOpacity': 0.9,
        'skinSourcesMargin': 10,
		//Ads
		'colAdsBackground' : '0xDDDDDD',
		'colAdsBorder' : '0xCCCCCC',
		'colAdsLine1' : '0x000000',
		'colAdsSponsored' : '0x666666',
		'adsPosition': 'top',
		//Branding
		'brandLogoDestination' : 'http://infomous.com/',
		'brandLogoSource': base_path+'img/infomous_icon_24x24.png',
		//Tracking
		'trackOmniture' : false,
		'trackGoogle' : true,
		'trackGAAccount' : 'UA-18489566-1'
	};

	for (var d in defaults) 
		if (vars[d] === undefined) 
			vars[d] = defaults[d];

	I.esc(vars);

	// init dom stuff...
	
	var $target = $('#' + vars.target),
	    $cloud = $('<div class="infomous-cloud"/>');

    //renderer = new Canvas2dRenderer( vars.width, vars.height );

	//TODO delegate dom insertion to the code that uses the cloud.. 
	//make and keep the elem internally
	//add a getter like:
	//this.$el = function() { return $cloud; };
	
	$target.append( $cloud );
	//$target.after('<div style="clear:both"/>');

	$target.css({
		'width': (vars.width.toString().indexOf('%') == -1 ? 
				vars.width+'px' : vars.width),
		'height': (vars.height.toString().indexOf('%') == -1 ? 
				vars.height+'px' : vars.height),
		'position':'relative'
	});
	
	$target.css({
		'width': $target.width(), 
		'height': $target.height()
	});

	$cloud.css({
		'width': $target.width(), 
		'height': $target.height()
	});

	if (vars.width.toString().indexOf('%') != -1 
            || vars.height.toString().indexOf('%') == -1) {
		$('.infomous-container').css({
			'width': '100%', 
			'height': '100%'
		});
		vars.width = $target.width();
		vars.height = $target.height();
	}

	$preloader = $('<img/>', {
		'src': base_path + 'img/preloader.gif'
	});

	$preloader.css({
		'position': 'relative',
		'top': Math.round(vars.height/2 - 32) + 'px',
		'left': Math.round(vars.width/2 - 32) + 'px',
		'z-index': '1001'
	});

	// begin...

	load_config( function(data) {

		parse_config(data.config);
		apply_css(vars);
		
		load_ga();
		self.track_event('jload', 'jviewer');

		add_toolbar( function() {
			if ( typeof infomous_load === 'function' )
				infomous_load('js');

			if ( isTrue(vars.loadAtStart) ) 
				self.make_request();
		});
	});

	function load_config(callback) {

		var configURL = 'config.txt';

		if (vars.nid !== undefined) 
			configURL = base_root+'cloud/config/'+
				vars.nid+'/'+vars.setInterfaceType;
		if (vars.setConfigURL !== undefined) 
			configURL = base_path + vars.setConfigURL;

		$.ajax({
			url: base_path+'jsonizer.php?url='+
				encodeURIComponent(configURL)+'&callback=?',
			dataType: 'json',
			success: callback 
		});
	}

	function parse_config(config) {

		var conf_vars = _parse( decodeURIComponent(config) );

		//make local config obj, this code is a clone 
		//of Params.as in flash client
		//where Params is analog to the new vars obj 
		//and flashvars to the existing vars obj
		var Params = {}, p;
		if ( vars.preview !== undefined 
				&& isTrue(vars.preview) 
				&& base_root.indexOf('infomous.com') != -1 ) 
        {
			//This is a preview cloud at one of our sites: 
			//flashvars override config
			for (p in conf_vars) 
				Params[p] = conf_vars[p];
			for (p in vars) 
				Params[p] = vars[p];
		} 
        else {
			//The usual case: config overrides flashvars
			for (p in vars) 
				Params[p] = vars[p];
			for (p in conf_vars) 
				Params[p] = conf_vars[p];
		}
		for (p in Params) 
			vars[p] = Params[p];

		function _parse(config) {
			var out = {};
			var lines = config.split("\n");
			for (var l in lines) {
				var line = lines[l];
				if (line.length <3 
					|| line.indexOf("//") == 0 
					|| line.indexOf("#") == 0)
					continue;
				var cut = line.indexOf("=");
				if (cut == -1) 
					continue;
				var key = trim(line.substring(0, cut));
				var val = trim(line.substring(cut+1));
				if (key.length > 0 && val.length > 0) 
					out[key] = val;
			}
			return out;
		}
	}

	function apply_css(vars) {

		//see flash->com.ui.util.Defaults.as
		var skins = {
			blue: {
				/** Colors **/
				colBackground: '0xFFFFFF',
				// Words
				colWord: '0x062D40',
				colWordHover: '0xFFFFFF',
				colWordFade: '0x8EAFBF',
				colWordHighlighted: '0xFF0000',
				colWordHoverLinked: '0x00405E',
				colHoverBox: '0x00405E',
				colFocusBox: '0xFFFFFF',
				colFocusBorder: '0xFF0000',
				// Links
				colLink: '0xCCCCCC',
				colLinkHover: '0x75C4EB',
				// Blobs
				colBlob: '0xF5F8FA',
				colBlobBorder: '0x8EAFBF',
				colBlobHover:  '0xC1DCE8',
				// Sources lists
				colSourcesFill: '0xFFFFFF',
				colSourcesBorder: '0x00405E',
				colSourcesLine1: '0x006299',
				colSourcesLine2: '0x666666',
				colSourcesTextHover: '0x0000CC',
				// Ads
				colAdsLine1: '0x006299',
				adsPosition: 'bottom',
				/** Other skin variables **/
				skinScrollWidth: 12,
				skinSourcesShadow: 0,		
				skinSourcesWidth: 240
			}
		}

		var skin = skins[vars.skin];
		if (skin !== undefined)
			for (var key in skin) 
				vars[key] = skin[key];

		var css = "#"+vars.target+" {"+
				"background-color:"+hex(vars.colBackground)+
				"}\n";
		css += ".infomous .infomous-cloud .body {"+
				"color: "+ hex(vars.colWord)+
				"}\n";
		css += ".infomous .infomous-cloud .fade {"+
				"color: "+ hex(vars.colWordFade)+
				"}\n";
		css += ".infomous .infomous-cloud .focused {"+
				"background-color:"+
				hex(vars.colFocusBox)+";"+
				"border-color:"+
				hex(vars.colFocusBorder)+
				"}\n";
		css += ".infomous .infomous-cloud .highlighted {"+
				"color:"+hex(vars.colWordHighlighted)+
				"}\n"; 

		// menu

		// sources
		var src = I.hex2rgb(vars.colSourcesFill);
		src.a = vars.skinSourcesOpacity;
		css += ".infomous .infomous-cloud .sources {"+
				"background-color: rgba("+src.r+
							","+src.g+
							","+src.b+
							","+src.a+");"+
				"border-color: "+
					hex(vars.colSourcesBorder)+";"+
				"}\n";	

		css += ".infomous .infomous-cloud"+
			" .menu-sources-list .menu-source-item .line1 {"+
				"color: "+hex(vars.colSourcesLine1)+" !important;"+
				"font-size :"+vars.skinLine1Size+"px;"+
				"}\n";
		css += ".infomous .infomous-cloud"+
			" .menu-sources-list .menu-source-item .line1:hover {"+
				"color: "+hex(vars.colSourcesTextHover)+" !important;"+
				"}\n";
		css += ".infomous .infomous-cloud"+
		       " .menu-sources-list .menu-source-item .line2 {"+
				"color: "+hex(vars.colSourcesLine2)+" !important;"+
				"font-size: "+vars.skinLine2Size+"px;"+
				"}\n";

		// footer

		css += '.infomous .infomous-cloud .sources .menu-footer {'+
				'background-color: '+hex(vars.colSourcesBorder)+';'+
				'border-color: '+hex(vars.colSourcesBorder)+';'+
				'}\n';
		// header

		css += '.infomous .infomous-cloud .sources .menu-header {'+
				'background-color: '+hex(vars.colSourcesBorder)+';'+
				'border-color: '+hex(vars.colSourcesBorder)+';'+
				'}\n';

		// ads	
		css += ".infomous .infomous-cloud .menu-ad {"+
				"background-color:"+hex(vars.colAdsBackground)+";"+
				"border-color:"+hex(vars.colAdsBorder)+
				"}\n";
		css += ".infomous .infomous-cloud .menu-ad .menu-ad-txt .line1 {"+
				"color: "+hex(vars.colAdsLine1)+" !important;"
				"}\n";

		$("\n<style type='text/css'>\n"+ css +"</style>\n").appendTo("head");
	}

	function add_toolbar(callback) {

		if (vars.setInterfaceType !== 'viewer') {
			if (typeof callback === 'function')
				callback();
			return;
		}

		I.require('CloudToolbar', function() {

			toolbar = new CloudToolbar({
				width: vars.width,
				controls: vars.setControls
			});

			toolbar.add_to_dom( $target );

			setup_autohide(toolbar);

			if (typeof callback === 'function')
				callback();
		});

		function setup_autohide(toolbar) {

			if ( ! I.bool(vars.setHideControlBar) )
				return;

			var ythres = $cloud.height() - toolbar.$el().height(),
			    ylocal, ontool, oncloud,
			    hidetimeout = 500,
			    speed = 300,
			    hidden = false,
			    timeout = null;

			$cloud.unbind('mousemove');
			toolbar.$el().unbind('mousemove');

			$cloud.mousemove( autohide );
			toolbar.$el().mousemove( autohide );

			$cloud.mousemove( function() {
				oncloud = true;
			});
			toolbar.$el().mousemove( function() {
				oncloud = false;
			});

			function autohide(e) { 

				ylocal = $cloud.offset().top;
				ontool = e.pageY-ylocal > ythres; 

				if ( !ontool && !hidden && oncloud ) {
					hidden = true;	
					clear_timeout();
					timeout = setTimeout( function() {
						clear_timeout();
						hide_toolbar();	
					}, hidetimeout);	
				}
				else if (ontool && hidden) {
					hidden = false;
					if ( clear_timeout() )
						return;
					show_toolbar();	
				}
				else if (!oncloud) {
					hidden = false;
					clear_timeout();
				}
			}

			function show_toolbar() {
				toolbar.$el().show('slide', {
					direction: 'down'
				}, speed);
			}

			function hide_toolbar() {
				toolbar.close_all_menues();
				toolbar.$el().hide('slide', {
					direction: 'down'
				}, speed);
			}

			function clear_timeout() {
				if (timeout == null)
					return false;
				clearTimeout( timeout );
				timeout = null;
				return true;
			}
		}
	}

	// toolbar / proxy comm helper
	this.plug_toolbar = function(proxy) {

		if (toolbar === null)
			return;

		toolbar.on(['hidden','focused','dict','groups', 
				'maxWords','zoom','fontScale'], 
				function(e) {
					proxy.set_var(
						e.key, e.value, 
						e.b_make_request);
				});

		proxy.on(['hidden','focused','dict','groups', 
				'maxWords','zoom','fontScale'], 
				function(e) {
					toolbar['update_'+e.key](
						e.value);
				});
	}

	this.kill_current_request = function() {
		if (jqxhr === null) 
			return;
		jqxhr.abort();	
		jqxhr = null;
		$preloader.remove();
	}

	this.make_request = function() {

		self.kill_current_request();

		$cloud.append($preloader);

		var req = base_path + 'proxy.php?positions=json&callback=?';
		req += '&url='+encodeURIComponent(vars.feeds);

		var reqVars = ['type', 'width', 'height', 'maxWords', 'linkageThreshold', 'popularWordCutoff', 'textOption', 'maxResults', 'minChars', 'dict', 'focused', 'hidden', 'blocked', 'ngrams', 'hiddenSource', 'ngramsSource', 'fromDaysBack', 'toDaysBack', 'campaign', 'zoom', 'fontScale', 'groups'];

		for (var v in vars) {
			if (I.indexof(reqVars, v) != -1 
				&& vars[v] !== undefined
				&& vars[v] !== '') {
				req += '&'+v+'='+
					encodeURIComponent(vars[v]);
			}
			if (v.indexOf('query:') == 0) {
				req += '&'+v.substring(6)+'='+
					encodeURIComponent(vars[v]);
			}
		}

		jqxhr = $.ajax({
			url: req,
			dataType: 'json',
		      	success: function(data) {
				self.render(data);
			}	
			//jsonpCallback: 'proxyCallback'
		});	
	}

    var words, links, sources, requests, ads; 
    var pos, groups;
    var $curr_menu;

	this.render = function(data) {

        $cloud.empty();

        $curr_menu = null;

        if (data === undefined)
            return;

        var net = data.network;

        if (net.words === "") {
            self.add_cloud_feedback('No results found');
            return;
        }

        words = net.words.word;
        links = net.links.link;
        sources = net.sources.source;
        requests = net.requests.rssInputRequest;
        ads = net.ads !== undefined ? net.ads.ad : undefined; 

        pos = {};
        groups = {};

        // nodes (set pos,groups data)
        var i = words.length,
            nodes = [];
        while (i--) 
            nodes[i] = add_node( i );

        // nodes hack to make jquery.height() work properly on node.menu
        i = words.length;
        while (i--) {
            nodes[i].add_menu();
            nodes[i].remove_menu();
        }
        //

        $cloud.unbind('click');
        $cloud.click( function() {
            if ( !!$curr_menu )
                $curr_menu.mouseleave();	
            else
                self.dispatch('unfocus_all');
        });	

        // draw (needs pos,groups data)
        render_canvas();

        add_brand();	
    }

    function is_focused(word) {
        if (typeof vars.focused !== 'string')
            return false;
        var arr = vars.focused.split(',');
        for (var i = 0; i < arr.length; i++)
            if (arr[i] === word)
                return true;
        return false;
    }

    function is_highlighted(word) {
        if (typeof vars.highlighted !== 'string')
            return false;
        var arr = vars.highlighted.split(',');
        for (var i = 0; i < arr.length; i++)
            if (arr[i] === word)
                return true;
        return false;
    }

    function add_node( i ) {

        var word, wpos,
            $body, $word, 
            $hide, $menu,
            imode = null;

        // data...

        word = words[i];	

        //convert string to number here
        word.x = Math.round(word.x);
        word.y = Math.round(word.y);

        if ( ! word.hasOwnProperty('id') 
                || ! word.hasOwnProperty('text') ) 
            return;

        groups[word.group] = groups[word.group] === undefined ? 
            [word.id] : groups[word.group].concat(word.id);	 

        // body...

        $body = $('<div/>', {
            'class': 'body',
            'id': 'body_' + i
        });

        $body.css({
            'padding': '3px 10px',
            'font-size': word.size + 'px',
            'z-index': i + 1
        });

        if ( is_focused(word.text) ) 
            $body.addClass('focused');

        if ( is_highlighted(word.text) ) 
            $body.addClass('highlighted');	

        // word...

        var html_text = trim(word.text),
            br = parseInt(word.br);
        if ( br > 0 ) 
            html_text = html_text.substring(0, br) 
                + '<br/>' 
                + html_text.substring(br + 1);
        html_text = html_text.replace(/\s/g, '&nbsp;');

        $word = $('<span/>', {
            'html': html_text,
            'class': 'word',
            'id': 'word_' + i
        });	

        $word.mouseover( function(e){
            self.track_event('jmouseover', word.text); 
        });

        // hide...

        $hide = $('<div/>', {'class': 'hide'});

        $hide.css({
            'margin': (Math.round(word.size/2)-3)+'px 0 0 5px',
            'display': 'none'
        });
        
        $hide.click( function(e) {	

            $(this).parent().hide();
            var hword = $(this).siblings('.word').text();
            
            //when a word is hidden 
            //it is unfocused as well
            self.dispatch( ['hide','unfocus'], {
                word: hword
            });

            self.track_event('jhide', hword);

            e.stopPropagation();
        });

        // dom...

        $body.append( $word );
        $body.append( $hide );
        $cloud.append( $body );

        wpos = pos[word.id] = {
            x: word.x,
            y: word.y,
            //TODO body w,h needs the elem to be
            //into the dom to get its size
            //replace this with a variable to let
            //delegate dom insertion
            w: $body.width(),
            h: $body.height(),
            ow: $body.outerWidth(),
            oh: $body.outerHeight()
        };

        $body.css({
            'left': (word.x - wpos.ow/2) + 'px',
            'top': (word.y - wpos.oh/2) + 'px'
        });	

        // imode init...
        // see also $cloud.click for background

        imode = get_imode( vars.setInteractionMode, wpos );

        $menu = make_menu( word, ads, sources, imode );	

        $word.click( function(e) {

            // deprecated ?
            // unfocus if the clicked word is in focus
            //if ( is_focused(word.text) ) {
                //self.dispatch('unfocus', {
                    //word: word.text
                //});
                //e.stopPropagation();
            //} 
            // focus on the clicked word 
            // if the sources list is displayed
            //else 
            if ( $menu.is_open() ) {
                self.dispatch('focus', {
                    word: word.text
                });
                self.track_event( 'jfocus', vars.focused );
                e.stopPropagation();
            }
        });

        imode.init();

        return {
            add_menu: function() {
                add_menu();
            },
            remove_menu: function() {
                remove_menu();
            }
        }

        // node private functions...

        function get_imode(type, wpos) {

            var imodes = {};

            var cmargin = { 
                x: vars.skinSourcesMargin,
                y: vars.skinSourcesMargin
            };

            // + hover mode for touch devices
            // menu has fixed height and variable x

            imodes.hover = imodes.hover_click = {

                init: function() {	

                    $body.unbind('click');
                    $body.click( function(e) {
                        add_menu();
                        //prevent $cloud.click
                        e.stopPropagation();
                    });

                    $menu.unbind('mouseleave');
                    $menu.mouseleave( remove_menu );
                },

                add_menu: function() {

                    if ( !!$curr_menu )
                        $curr_menu.mouseleave();
                    
                    this.init();

                    $cloud.append( $menu );
                    $menu.show();

                    var layout = this.get_menu_layout();

                    $menu.css({
                        'position': 'absolute',
                        'left': layout.x,
                        'width': layout.w,
                        'top': layout.y
                    });	

                    //if menu height goes out of the cloud
                    //we shrink it to fit
                    if ( layout.h_dif > 0 ) {
                        $menu.height( layout.h );
                        // adjust source list height on ads height
                        var ads_h = $menu.ads().outerHeight(true) + 10;
                        $menu.srcs().height( layout.h - ads_h );
                    }
                },

                get_menu_layout: function() {

                    var wx = wpos.x,
                        wy = wpos.y,
                        wh = wpos.oh;
                        cw = vars.width,
                        ch = vars.height,

                        // ** we assume $menu is on dom to get its height
                        
                        //srcs_h = $menu.srcs().outerHeight(true),
                        //ads_h = $menu.ads().outerHeight(true),
                        //menu_h = srcs_h + ads_h,
                        menu_h = $menu.outerHeight(true),
                        header_h = $menu.header().outerHeight(true),
                        footer_h = $menu.footer().outerHeight(true),
                        total_h = menu_h + header_h + footer_h;

                    return {
                        x: get_x(),
                        y: get_y(),
                        w: get_w(),
                        h: get_h(),
                        h_dif: get_h_dif()
                    };

                    function get_x() {
                        
                        var _x = wx,
                            cr = cw - cmargin.x,
                            cl = cmargin.x,
                            mr = wx + get_w(),
                            ml = wx;

                        if (mr > cr)
                            return _x - (mr-cr);
                        else if (ml < cl)
                            return cl;
                        else 
                            return _x;
                    }

                    function get_w() {
                        return vars.skinSourcesWidth;
                    }

                    function get_y() {

                        var _h = total_h - get_h_dif();

                        var cb = ch - cmargin.y,
                            ct = cmargin.y,
                            mb = (wy + wh/2) + _h/2,
                            mt = (wy - wh/2) - _h/2;

                        if (mb > cb) //out of bottom
                            return cb - (_h - header_h);
                        else if (mt < ct) //out of top
                            return ct + header_h;
                        else //in place 
                            return wy - get_h()/2;
                    }

                    function get_h() {
                        return menu_h - get_h_dif();
                    }

                    function get_h_dif() {
                        var _ch = ch - cmargin.y * 2,
                            dif = total_h - _ch;
                        return dif > 0 ? dif : 0;
                    }
                }
            };	
            //end of hover, hover_click imode

            // + click mode

            imodes.click = {

                init: function() {	

                    $body.unbind('click');
                    $body.click( function(e) {
                        add_menu();
                        //prevent $cloud.click
                        e.stopPropagation();
                    });

                    $menu.unbind('mouseleave');
                    $menu.mouseleave( remove_menu );
                },

                add_menu: function() {

                    if ( !!$curr_menu )
                        $curr_menu.mouseleave();
                    
                    this.init();

                    $cloud.append( $menu );
                    $menu.show();

                    var layout = this.get_menu_layout();

                    $menu.css({
                        'position': 'absolute',
                        'left': layout.x,
                        'top': layout.y,
                        'width': layout.w
                    });	

                    //if menu height goes out of the cloud
                    //we shrink it to fit
                    if ( layout.h_dif > 0 ) {
                        $menu.height( layout.h );
                        // adjust source list height on ads height
                        var ads_h = $menu.ads().outerHeight(true) + 10;
                        $menu.srcs().height( layout.h - ads_h );
                    }

                    // adjust source list height on ads height
                    //var hads = $menu.ads().height() + 10;
                    //$menu.srcs().css( 'height', layout.h - hads );

                    $hide.show();
                },

                get_menu_layout: function() {
                    
                    var wx = wpos.x,
                        wy = wpos.y,
                        wh = wpos.oh,
                        cw = vars.width,
                        ch = vars.height,

                        // ** we assume $menu is on dom to get its height
                        menu_h = $menu.outerHeight(true),
                        //
                        upper = wy < ch/2,
                        // calc h dif first...
                        h_dif = get_h_dif();

                    return {
                        x: get_x(),
                        y: get_y(),
                        w: get_w(),
                        h: get_h(),
                        h_dif: h_dif
                    };
                    
                    function get_x() {	
                        return wx < cw/2 ? wx : wx - get_w();
                    }	

                    function get_w() {
                        return vars.skinSourcesWidth;
                    }

                    function get_y() {	
                        if (upper) 
                            return (wy + wh/2);
                        else
                            return (wy - wh/2) - get_h();
                    }

                    function get_h() {
                        return menu_h - h_dif; 
                    }

                    function get_h_dif() {
                        
                        var dif;

                        if (upper) {
                            var cb = ch - cmargin.y,
                                mb = (wy + wh/2) + menu_h;
                            dif = mb - cb;
                        }
                        else {
                            var ct = cmargin.y,
                                mt = (wy - wh/2) - menu_h;
                            dif = ct - mt; 
                        }
                        return dif > 0 ? dif : 0;
                    }
                }
            };
            // end of click imode

            // + hover mode for desktop browsers
            // it opens the sources list on mouseenter 
            // after 1sec
            // the list has fixed height and variable x
            //imodes.hover = imodes.hover_click = (function() {
                //var t = null,
                    //d = 1000;
                //function clear_t() {
                    //if (t === null) return;
                    //clearTimeout(t);
                    //t = null;
                //}
                //function _add_menu() {
                    //clear_t();
                    //t = setTimeout( add_menu, d );
                //}
                //function _remove_menu() {
                    //clear_t();	
                    //remove_menu();
                //}
                //return {
                    //init: function() {	
                        //$body.unbind('mouseenter');
                        //$body.mouseenter( _add_menu );
                        ////clear t if mouse passes 
                        ////along the node
                        //$body.unbind('mouseleave');
                        //$body.mouseleave( clear_t );
                        //$menu.unbind('mouseleave');
                        //$menu.mouseleave( _remove_menu );
                    //},
                    //add_menu: function() { #todo },
                    //get_menu_layout: function() { #todo },
            //})();
            // + click mode with jquery tooltip...
            //imodes.click = {
                //init: function() {
                    //$body.click( add_menu );
                    //$body.tooltip({
                        //position: 'bottom right',
                        //relative: false,
                        //offset:[ 0, -wpos.ow ],
                        ////effect: 'fade', delay:100,
                        //events: {def: 'click, mouseleave'},
                        //onBeforeShow: function(e) {
                            ////prevent $word.click
                            //e.stopPropagation();
                        //},
                        //onBeforeHide: function(e) {
                            //remove_menu();
                        //}
                    //}).dynamic();
                //},
                //add_menu: function() { $body.after( $menu ); }
            //}; 

            return imodes[type];
        }

        function add_menu() {

            imode.add_menu();

            $curr_menu = $menu;

            activate_blob_colors();

            self.track_event('jsources_view', word.text);
        }

        function remove_menu() {

            $hide.hide();

            deactivate_blob_colors();

            $menu.detach();

            if ($curr_menu === $menu)
                $curr_menu = null;
        }

        function activate_blob_colors() {

            var _group = groups[ word.group ];
            var hover_col = hex(vars.colWordHover);
            var hover_linked_col = hex(vars.colWordHoverLinked);

            set_group_color(_group, hover_linked_col);
            set_word_color($word, hover_col);

            render_group_blob( _group, {
                blob: hex(vars.colBlobHover),
                border: hex(vars.colBlobBorder)
            });
            render_group_links( _group, links, hex(vars.colLinkHover) );
        }

        function deactivate_blob_colors() {

            var _group = groups[ word.group ];
            var stdcol = hex(vars.colWord);

            set_group_color(_group, stdcol);
            set_word_color($word, stdcol);

            render_group_blob( _group, {
                blob: hex(vars.colBlob),
                border: hex(vars.colBlobBorder)
            });
            render_group_links( _group, links, hex(vars.colLink) );
        }	

        function set_group_color(group, color) {
            if (group === undefined) 
                return;
            var i, $link, len = group.length;
            for (i = 0; i < len; i++) {
                $link = get_$word( group[i] );
                set_word_color( $link, color );
            }
        }

        function set_word_color($w, color) {
            $w.css('color', color);
        }

        function get_$word(id) {
            //TODO improve performance here
            return $('#word_'+id);
        }
    }
    //end of add_node				

    //TODO remove imode ref
    function make_menu(word, ads, sources, imode) {

        var $header = make_menu_header(),
            $ads = make_menu_ads(),
            $srcs = make_menu_sources(),
            $footer = make_menu_footer();

        // menu views by interaction mode + ads position

        var menu_elems = {};

        menu_elems.hover = menu_elems.hover_click = 
        {
            bottom: [ $header, $srcs, $ads, $footer ],
            top: [ $header, $ads, $srcs, $footer ]
        };

        menu_elems.click = 
        {
            bottom: [ $srcs, $ads ],
            top: [ $ads, $srcs ]
        };

        //

        var $el = $('<div/>', {
            'class': 'sources', 
            'id': 'sources_'+word.id 
        });	

        var elems = menu_elems[vars.setInteractionMode][vars.adsPosition]; 

        for (var i = 0; i < elems.length; i++)
            $el.append( elems[i] );		

        //TODO test these clicks...

        $el.find('.menu-source-item a').click(function() {
            self.track_event('jsource_follow', 
                $(this).attr('href') );
        });
        $el.find('.menu-ad a').click(function() {
            self.track_event('jad_follow', 
                $(this).attr('href') );
        });

        $el.is_open = function() {
            return $el.parent().length > 0 && //is on dom
                $el.css('display') !== 'none'; //is visible
        }

        //getters
        $el.ads = function() { return $ads; }
        $el.srcs = function() { return $srcs; }
        $el.header = function() { return $header; }
        $el.footer = function() { return $footer; }

        return $el;

        function make_menu_header() {

            var $el = $('<div/>', {
                'class': 'menu-elem menu-header'
            });

            var $txt = $('<span/>', {
                'class': 'm-header-elem m-header-txt'
            });

            var $arrow = $('<img/>', {
                'class': 'm-header-elem m-header-arrow',
                'src': I.base_path()+'img/rightpointing_triangle_10x10_white.png'
            });

            $txt.text( word.text );

            $el.append( $arrow );
            $el.append( $txt );

            $el.css( word.x < vars.width/2 ? 'left' : 'right', '-1px' );

            return $el;
        }

        function make_menu_footer() {

            var state = is_focused(word.text) ?
                'focused' : 'unfocused';

            var $el = $('<div/>', {
                'class': 'menu-elem menu-footer'
            });

            var focus_cfg = {
                unfocused: {
                    text: 'DRILL DOWN',
                    click: function() {
                        self.dispatch( 'focus', {
                            word: word.text
                        });
                    }
                },
                focused: {
                    text: 'GO BACK UP',
                    click: function() {
                        self.dispatch( 'unfocus', {
                            word: word.text
                        });
                    }
                }
            };

            var $focus_bt = $('<span/>', {
                'class': 'm-footer-bt bt-focus'
            });
            var $hide_bt = $('<span/>', {
                'class': 'm-footer-bt bt-hide'
            });

            var $rayita = $('<div class="rayita"></div>');
            
            $focus_bt.text( focus_cfg[state].text );
            $focus_bt.unbind('click');
            $focus_bt.click( focus_cfg[state].click );

            $hide_bt.text('HIDE WORD');
            $hide_bt.unbind('click');
            $hide_bt.click( function() {
                console.log(word.text, 'hide word click');
                self.dispatch( 'hide', {
                    word: word.text
                });
            });

            var loc = vars.skinSourcesWidth * 0.1;

            $focus_bt.css( 'left', loc+'px' );
            $hide_bt.css( 'right', loc+'px' );
            $rayita.css( 'left', (vars.skinSourcesWidth / 2)+'px' );
            $rayita.css( 'color', hex(vars.colSourcesLine1) );

            $el.append( $focus_bt );
            $el.append( $rayita );
            $el.append( $hide_bt );

            return $el;
        }

        function make_menu_ads() {

            if ( I.is_empty(word.ads) ) 
                return $('');

            var _ads = '',
                trg = vars.setLinksTarget,
                wads = word.ads.split(','),
                ad,
                idx,
                i = wads.length;

            while (i--) {
                idx = parseInt( wads[i] );
                if ( isNaN( idx ) )
                    continue;
                ad = ads[ idx ];
                if ( ad === undefined )
                    continue;

                _ads += '<div class="menu-elem menu-ad" >';

                if (ad.img) {
                    _ads += '<div class="menu-ad-img" '+
                                '<img src="'+ad.img+'">'+
                            '</div>';	
                }

                _ads += '<div class="menu-ad-txt">'+
                    '<a class="line1" href="'+ad.url+'"'+
                        ' target="'+trg+'">'+ad.line1+'</a>'+
                        //'<br/>'+
                    '<span class="line2">'+ad.line2+'</span>'+
                    '</div>'+

                    //TODO
                    '<div style="clear:both">'+'</div>'+
                    
                '</div>';
            }
            
            var $ads = $(_ads);

            return $ads;
        }

        function make_menu_sources() {

            if ( I.is_empty(word.sources) ) 
                return $('');

            var $el = $('<div/>', { 
                'class': 'menu-elem menu-sources-list'
            });
            var _srcs = '', 
                trg = vars.setLinksTarget,
                wsrcs = word.sources.split(','),
                src,
                idx,
                i = wsrcs.length;

            while (i--) {
                idx = parseInt( wsrcs[i] );
                if ( isNaN( idx ) )
                    continue;
                src = sources[ idx ];
                if ( src === undefined )
                    continue;

                _srcs += '<div '+
                    'class="menu-source-item">'+
                '<a class="line1" '+
                    'href="'+ src.url +'" '+
                    'target="'+ trg +'">'+ 
                        src.title +
                    '</a>'+
                //'<br/>'+
                '<span class="line2">'+ 
                    src.caption +'</span>'+
                '</div>';
            }

            $el.append(_srcs);	

            return $el;
        }
    }

    // render stuff 

    function render_canvas() {

        //$cloud.append( renderer.el() );
        //$('canvas').remove(); //already emptied by $cloud.empty()
        
        render_all_blobs( groups, {
            blob: hex(vars.colBlob),
            border: hex(vars.colBlobBorder)
        });
        
        render_all_links( links, hex(vars.colLink) );
    }

    // links

    function render_all_links( links, color ) {
        var i, len = links.length;
        for (i = 0; i < len; i++) 
            render_link( links[i], color );	
    }

    function render_group_links( group, links, color) {
        if (group === undefined || links === undefined)
            return;
        var i, j, wid, link,
            glen = group.length,
            llen = links.length;
        for (i = 0; i < glen; i++) {
            wid = group[i];
            for (j = 0; j < llen; j++) {
                link = links[j];
                if ( wid !== link.from )
                    continue;
                render_link( link, color);
            }	
        }
    }

    function render_link( link, color ) {

        if ( link.from === undefined )
            return;
        var from = pos[link.from],
            to = pos[link.to];

        //#draw 
        $cloud.drawLine(from.x, from.y, to.x, to.y, { color: color });
        //renderer.line(from.x, from.y, to.x, to.y, color);
    }	

    // blobs

    function render_all_blobs( groups, color ) {
        if ( !isTrue(vars.groups) )
            return;
        var g;
        for (g in groups) 
            render_group_blob( groups[g], color );
    }

    function render_group_blob( group, color ) {

        var wid, gpos, gw, 
            w1, w2, 
            _x, _y;

        for (w1 in group) {
            wid = group[w1];
            if (pos[wid] === undefined)
                continue;
            gpos = pos[wid];
            gw = Math.round(gpos.w * 1.5);
            _x = gpos.x-gw/2;
            _y = gpos.y-gw/2;

            //#draw
            $cloud.fillEllipse(_x, _y, gw, gw, { color: color.border });
            //renderer.ellipse(_x, _y, gw, gw, color.border);
        }

        for (w2 in group) {
            wid = group[w2];
            if (pos[wid] === undefined)
                continue;
            gpos = pos[wid];
            gw = Math.round(gpos.w * 1.5)-4;
            _x = gpos.x-gw/2;
            _y = gpos.y-gw/2;

            //#draw
            $cloud.fillEllipse(_x, _y, gw, gw, { color: color.blob });
            //renderer.ellipse(_x, _y, gw, gw, color.blob);
        }
    }

    //

    function add_brand() {

        var logoid = 'infomous-logo';
        if ( ! isTrue(vars.brandShowLogo) 
            || $('#'+logoid).length > 0 )
            return;

        var href = vars.brandLogoDestination;
        var img = vars.brandLogoSource;
        var $brand = $('<a/>', {
            'text': ' ',
            'href': href,
            'id': logoid,
            'target': '_blank',
            'style': 'background-image: url('+img+');'
        });
        $cloud.append($brand);
    }

	this.remove_cloud_feedback = function() {
		$cloud.find('.cloud-feedback').remove();
	}

	this.add_cloud_feedback = function(msg) {
		self.remove_cloud_feedback();
		var z = parseInt($cloud.css('z-index'))+1;
		var feedback = $('<div/>', {
			'class': 'cloud-feedback ctrls-dialog',
		    'style': 
			'width:'+($cloud.width()-2)+'px;'+ 
			//'height:30px;'+
			//'border: 1px solid #777;'+
			//'background-color: rgb(255,255,255);'+
			//'text-align: center;'+
			'z-index: ' + z 
		});
		feedback.append('<p>'+msg+'</p>');
		$cloud.empty();
		$cloud.append(feedback); 
		//feedback.position({ of: $trg });
	}

	this.track_event = function(action, label) {

		if (vars.trackGoogle) 
			ga.track_event(action, label);
		
		if (vars.trackOmniture) {
			var url = document.URL;
			var omEvent = 'infomous/' + action + '/' + label;
			var omUrl = url + '/' + omEvent;
			if (omEvent.indexOf('?') == -1) 
				omEvent += '?p1=infomous';
			else omEvent += '&p1=infomous';
			var omObject = {"href" : omUrl};
			if (typeof s !== 'undefined') 
				s.tl(omObject, 'o', omEvent);
		}
	}	

	function load_ga(){
		if ( ! I.bool(vars.trackGoogle) ) 
			return;
		ga = new GAtracker('infomousTracker', vars.trackGAAccount);
	}

	function hex(c) {
		return escape(c).replace('0x', '#');
	}

	function trim(s) {
		return s.replace( /^["\'\s]+|["\'\s]+$/g, '' );
	}

	function isTrue(val) {
		return val != false && val != "false" && val != 0 && val != "0";
	}
};

//var Canvas2dRenderer = function(w, h) {

    //I.log('Canvas2dRenderer', w, h);

    //w = parseInt(w);
    //h = parseInt(h);
    
    //var canvas = document.createElement('canvas');
    ////var canvas=I.$('<canvas width="'+w+'" height="'+h+'" id="icanvas">')[0];
    //canvas.style.width = w+'px';
    //canvas.style.height = h+'px';
    //canvas.width = w;
    //canvas.height = h;

    //var ctx = canvas.getContext('2d');

    //var def = {
        //lineWidth: 1,
        //strokeStyle: 'black',
        //fillStyle: 'red',
        //lineCap: 'butt', //'round' 'square'
        //lineJoin: 'round' //'miter' 'bevel'
    //};

    //for (var k in def)
        //ctx[k] = def[k];

    //this.el = function() {
        //return canvas;
    //}

    //this.line = function(x1, y1, x2, y2, color) {

        ////I.log('Canvas2dRenderer line', x1, y1, x2, y2, color);

        ////ctx.save();
        //ctx.beginPath();

        //ctx.moveTo(x1, y1);
        //ctx.lineTo(x2, y2);
        
        ////ctx.restore();
        //ctx.strokeStyle = color;        
        
        //ctx.stroke();
        ////ctx.closePath();

        ////ctx.strokeStyle = def.strokeStyle;
    //}

    //this.ellipse = function(x, y, w, h, color) {

        //return;

        //I.log('Canvas2dRenderer ellipse', x, y, w, h, color);

        //ctx.save();
        //ctx.beginPath();
        
        //ctx.translate(x-w, y-h);
        //ctx.scale(w, h);
        //ctx.arc(1, 1, 1, 0, 2 * Math.PI, false);
        
        //ctx.restore();

        //ctx.fillStyle = color;

        //ctx.fill();
        //ctx.stroke();

        ////ctx.fillStyle = def.fillStyle;
    //}
//}

return CloudJS;

})(Infomous) );

