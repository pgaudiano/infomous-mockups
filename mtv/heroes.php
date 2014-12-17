<!DOCTYPE html>
<html lang="en">
  <head>
<base href="http://socialvote.mtv.com/"/>
    <title>2013 MTV Movie Awards / Vote for Best Hero</title>
    <meta charset="utf-8">

    <script src="js/vendor/prefixfree.min.js"></script>

    <meta http-equiv="X-UA-Compatible" content="IE=Edge">
    <!--[if lt IE 10]>
    <script src="js/vendor/aight.js"></script>
    <![endif]-->
    <script src="js/vendor/d3.v3.min.js"></script>
    <script src="js/common.js"></script>

    <link rel="stylesheet" type="text/css" href="css/heroes.css">

    <script src="http://www.mtv.com/sitewide/scripts/includes/CODA.js"></script>
  </head>

  <body class="filmstrip-top">
    <div id="wrapper">
      <iframe id="filmstrip" src="http://www0.infomous.com/site/mockups/mtv/filmstrip.php?nid=<?=$_GET['nid']?>" frameborder="0" style="height:605px;"></iframe>
      <div id="header">
        <h1 id="ma-logo"><a href="http://www.mtv.com/ontv/movieawards/2013/best-hero/"><img src="images/ma-logo.png" alt="The Movie Awards"></a></h1>
        <div class="text">
          <!-- <h1>Best Hero</h1> -->
          <h2>Every hashtag counts as one vote, so hit up Twitter or Instagram to
          pick your favorite hero of 2012!</h2>
          <p>Get creative on Instagram&mdash;dress up as your favorite hero, tag a
          selfie, etc. Any photo with the hashtag is a vote, but only the best will
          be displayed here and during the Movie Awards!</p>
        </div>
        <h3 id="axe-logo"><img src="images/axe-logo.png" alt="presented by Axe Apollo"></h3>
      </div>
    </div>

    <script src="js/heroes.js"></script>
    <script type="text/javascript">
      mtvn.btg.Controller.init();
      mtvn.btg.Controller.sendPageCall({
        pageName: '/onair/movieawards/_2013/socialvote' + location.pathname,
        channel: 'onair',
        prop28: 'MovieAwards',
        prop44: 'MovieAwards',
        hier2: 'onair/movieawards/_2013/socialvote' + location.pathname
      });
    </script>
    <script src="//platform.twitter.com/widgets.js"></script>
  </body>
</html>
