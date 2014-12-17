<?
$maxWords = 6;
if($_GET['nid']==34962)$maxWords = 50;
?>
<!DOCTYPE html>
<html lang="en">
  <head>
<base href="http://socialvote.mtv.com/"/>
    <title>2013 MTV Movie Awards / Heroes on Instagram</title>
    <meta charset="utf-8">

    <script src="js/vendor/prefixfree.min.js"></script>
    <meta http-equiv="X-UA-Compatible" content="IE=Edge">
    <!--[if lt IE 10]>
    <script src="js/vendor/aight.js"></script>
    <![endif]-->
    <script src="js/vendor/d3.v3.min.js"></script>
    <script src="js/common.js"></script>

    <link rel="stylesheet" type="text/css" href="css/filmstrip.css">
  </head>
  <body style="background: none;">
<div id="infomousMovie" style="border-style:none;width:790px;margin-left:auto;margin-right:auto">
<script type="text/javascript" async data-infomous-id="nid<?=$_GET['nid']?>"  src="http://www.infomous.com/client2?width=790&height=500&setFrame=false&maxWords=<?=$maxWords?>&wmode=transparent&setControlBar=true&setShowTitle=0&setDemoMode=1&demoKillOnHover=1&demoFocusWords=1&demoShowLists=1&skinSourcesWidth=300&skinLine1Size=14&skinLine2Size=11&campaign=PoweredByInfomous&ngramsSource=http://www.infomous.com/site/ngrams/mtvawards13.txt""></script>
</div>
    <script>
      var loader = mtv.loader(),
          instagramPointerUrl = "instagramPhotos-latest.json",
          photos,
          meta,
          numberFormat = d3.format(",");

      loader.load(instagramPointerUrl, showPhotos);

      function showPhotos(error, payload) {
        var photos = payload.data.all.sort(function(a, b) {
          return d3.descending(a.likes, b.likes);
        }).slice(0, 14);

        var div = d3.select("#photos")
          .selectAll(".photo")
            .data(photos)
            .enter()
            .append("div")
              .attr("class", function(d, i) {
                return ["photo", (i > 4) ? "small" : "big"].join(" ");
              });
        div.append("img")
          .attr("src", function(d) { return d.url; });
      }

    </script>
  </body>
</html>
