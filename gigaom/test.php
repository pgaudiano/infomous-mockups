<style type="text/css">
body
{
margin: 2px;
padding: 0px;
}
</style><?
if(true)
  $url = urldecode($_GET["url"]);
else
  $url = "http://dev3.infomous.com/site/scripts/experiments/extension/generateXml.php?url=".$_GET["url"];

?>
<div id="infomous" class="infomous"></div>
<script type="text/javascript">
    var vars = {
            width: "400",
                    height: "300",
                          setInterfaceType: "widget",
                          feeds: "<?=$url?>"
                                   }
    </script>
<script type="text/javascript" src="http://infomous.com/client/embed.js"></script>

