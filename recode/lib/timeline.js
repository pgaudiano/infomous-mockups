function infomous_cloud(opt) {

  // check jquery
  if(!window.jQuery) {
    add_script("//www.infomous.com/misc/jquery.js?y");
  }

  add_script("//www.infomous.com/client/lib/jquery-ui-1.8.16.custom.min.js");
  add_link("//www.infomous.com/client/lib/jquery-ui-1.8.16.custom.css");

  
}

function add_script(src) {
  var script = document.createElement('script');
    script.type = "text/javascript";
    script.src = src;
  document.getElementsByTagName('head')[0].appendChild(script);
}

function add_link(src) {
  var link = document.createElement('link');
    link.type = "text/css";
    link.rel = "stylesheet";
    link.media = "all";
    link.href = "//www.infomous.com/client/lib/jquery-ui-1.8.16.custom.css";
  document.getElementsByTagName('head')[0].appendChild(link);
}