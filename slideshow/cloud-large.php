<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>The London2012 Interactive News Navigator</title>
<style type="text/css">
  <!--
  html, body, #infomous{
    margin: 0 0 0 0;
    padding: 0;
    width: 1700px;
    height: 1080px;
  }
  -->
</style>
</head>
<body>
<div id="infomous" class="infomous"></div>
<script type="text/javascript">
    var vars = {
      width: "1700",
      height: "1080",
      nid: <?php print $_REQUEST['nid']?>,
      caption: "false",
      maxWords: 40,
      skinMaxFont: 80,
      skinMinFont: 32,
      setShowTitle: true,
      setDemoMode: true,
      demoShowLists: true,
      demoFocusWords: true,
      zoom: 1,
    }
</script>
<script type="text/javascript" src="http://www.infomous.com/client/embed.js"></script>
</body>
</html>
