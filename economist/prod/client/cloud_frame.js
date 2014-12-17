/*!
 * Infomous Cloud Frame
 * http://www.infomous.com/
 *
 * @constructor
 * @param {Object} config
 */
(function(a){var b=function(e){a.esc(e);a.events(this);e.title=e.title||"Explore News Content";e.help=e.help||"hover & click to explore";var m=this,g=a.$,k="infomous-embed-frame",d=j(),c=h(e.title,e.help),f=l();d.append(c);d.append(f);this.add_to_dom=function(o){if(o.jquery===undefined){o=g(o)}o.after(d);c.after(o);d.css("height",this.css_size().frame.height)};this.css_size=function(){var q={height:c.outerHeight(true)},p={height:f.outerHeight(true)};var o=!a.css.is_abs_size(e.height);var s={width:a.css.size(e.width),height:o?e.height:(Math.abs(parseInt(e.height)-(q.height+p.height)))+"px"},r={width:a.css.size(e.width),height:o?e.height:(q.height+p.height+parseInt(s.height))+"px"};return{frame:r,cloud:s}};function j(){var o=g("<div/>",{"class":k});o.css({width:i(e.width)});return o}function n(){var o=g("<div/>",{"class":k+"-cloud-container"});return o}function h(r,o){var p=g("<div/>",{"class":k+"-header "+k+"-elem"}),q=g("<p/>",{"class":k+"-header-title"}),s=g("<p/>",{"class":k+"-header-help "+k+"-header-elem"});q.text(r);s.text(o);p.css({width:i(e.width)});q.css({width:i(e.width-120)});p.append(q);p.append(s);return p}function l(){var q=g("<div/>",{"class":k+"-footer "+k+"-elem"}),t=a.base_path()+"img/frame/",p=r("enlarge",e.nid!==undefined?a.base_root()+"node/"+e.nid:a.base_root(),t+"enlarge.png","left"),s=r("help",a.base_root()+"help/interact",t+"help.png","left"),o=r("visit",a.base_root(),t+"visit_infomous.png","right");q.css({width:i(e.width)});q.append(p);q.append(s);q.append(o);function r(z,v,y,x){var w=k+"-footer-btn",u=g('<div class="'+w+" "+w+"-"+z+" "+w+"-"+x+'"><p><a href="'+v+'" target="_blank" class="btn" style="background-image:url('+y+')"></a></p></div>');u.click(function(){m.dispatch("click",{id:z,url:v})});return u}return q}function i(o){if(o===undefined){return undefined}return parseInt(o)+"px"}};a.define("CloudFrame",b)})(Infomous);