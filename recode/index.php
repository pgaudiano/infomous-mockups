<script type="text/javascript" src="lib/shadowbox.js"></script>
<link type="text/css" rel="stylesheet" href="lib/shadowbox.css"/>
<?PHP
/* This script takes the URL of an article published on recode.net and
   embeds an Infomous cloud made dynamically with related content.

   The basic function is as follows:
   1. If invoked with no url parameter, the script generates an html form. Otherwise:
   2. Create a list of RSS feeds by extracting some relevant information from the page
   3. 
*/

error_reporting(E_ALL);
ini_set('display_errors', '1');
require_once("simple_html_dom.php");

// Miscellaneous variables
$debug = (isset($_POST["debug"])) ? 1 : 0;
$label_feeds = (isset($_POST["labels"])) ? 1 : 0;
$client_name = 'Re/code';
$client_logo = 'http://www.infomous.com/site/mockups/recode/recode-logo.jpg';
$client_link = 'http://www.recode.net';
$inputfile = 'http://recode.net/2014/09/04/white-house-names-googles-megan-smith-as-u-s-cto/';

$highlighted = '';

// Check some parameters passed in

// First, see if the script was invoked with an article URL
if (isset($_POST["url"])) {

   $inputfile = $_POST["url"];
  $page = file_get_html($inputfile); // Parse the input file into a DOM object

  // Initialize to no feeds
  $feeds = '';

  // Look for tags in the input document. Note that the search string is unique to the client site.
  if (isset($_POST['tags']) && $_POST['tags']=='on'){
    // get tags
    foreach ($page->find('div[class=entry-meta] a[rel^=tag]') as $category) {
      $label = '';
      $link = $category->{"attr"}["href"]."feed";
      // If specified, label the feeds
      if ($label_feeds) {
      $label = '?inflbl='.str_replace(' ','+',strtolower($category->plaintext)); // Add an inflbl to each feed.
      $highlighted .= strtolower($category->plaintext).","; // Highlight the label
      }
      $feeds .= $link.$label."|";
    }
  }

  // Look for categories in the input document. Also unique to the specific client
  if (isset($_POST['category']) && $_POST['category']=='on'){
    // get categories
    foreach ($page->find('div[class=entry-meta] a[rel^=category]') as $category) {
      $label = '';
      $link = $category->{"attr"}["href"]."feed";
      // If specified, label the feeds
      if ($label_feeds) {
      $label = '?inflbl='.strtolower($category->plaintext); // Add an inflbl to each feed.
      $highlighted .= strtolower($category->plaintext).","; // Highlight the label
      }
      $feeds .= $link.$label."|";
    }
  }

  // if ($debug) echo $feeds;

  // Insert a base href to be safe
  $page = str_replace(
      '<head>',
      '<head>
      <base href="http://www.recode.net">
      ',
      $page);
  
// Define a string that will be injected into the document
$insertion = '
<!-- BEGIN Infomous insertion --> 
<script>
  Shadowbox.init({
    handleOversize: "resize"
  });
  var myFeed = "'.$feeds.'"; // Feeds constructed above.
  var cloud;
  var myInfomousCloud = {  // Parameters that alter the look & feel of the cloud.
    api: "true",
    nid: "ReCodeDemo",
    width: "620",
    height: "400",
    setFrame: "False",
    setControls: "False",
    highlighted: "'.$highlighted.'",
    colBackground: "0xeeeeee",
  }
  // This is the main Infomous API function
  function infomous_ready(I) {
    cloud = I.clouds.get();  // Create the cloud object
    
    cloud.set_var(\'feeds\',myFeed);   // Set the feeds
  
    cloud.make_request();   // Update the cloud
  }
</script>

<!-- The header information -->
<div style="font-family:futura-pt,helvetica,arial,sans-serif;font-weight: bold;margin:10px 0 10px 0;">
Explore related stories from Re/Code
</div>
<!-- This is the actual embed code for the cloud -->
<script type="text/javascript" async data-infomous-id="myInfomousCloud" src="http://www.infomous.com/client2/"></script>
[<a rel="shadowbox;width=700;height=370" href="http://infomous.com/site/mockups/recode/help.php" style="color:blue;">What is this?</a>]

'.
(($debug)?'<br>This cloud uses the following feeds:<br>'.str_replace('|','<br>',$feeds):'')
.'

<!-- End Infomous insertion -->

'; // End of insertion definition

/* Now define the search string is where the insertion will be made. This is set by
   looking into the original source. If the page source changes, this will break. */
$search_string = '<!-- .entry-meta -->';

// Check to see if something has changed on the original page - there will be a mismatch.
if (!strpos($page,$search_string)) {
$page = '<h1>Error!</h1>
<div style="width:800px">
We can\'t find the place on the page where to insert the Infomous Visual Explorer. Chances are, something changed in the html of the original source file:<br> (<a href="'.$inputfile.'">'.$inputfile.'</a>).
<p>
Instead, we will only show the Infomous spotlighter that would have been embedded into that page:
</div>
'.$insertion;

} else {

// We found the place to inject the cloud - now insert the necessary code.
  $page = preg_replace(
'+'.$search_string.'+s', 
$search_string.$insertion, $page);
}

// Now print out the dynamically created page
  echo $page;

}
/* If we get to the 'else' statement below it means the script was called with no
   parameters, so we just show the input form. */
else {
echo '
<html>
<head>
<link type="text/css" rel="stylesheet" href="lib/bootstrap.min.css"/>
</head>
<body>
<div style="width:700px;font-family:helvetica,sans-serif,arial;padding:20px;">

    <table style="width:96%;  margin-left: 2%; margin-right: 2%">
      <tr>
        <td align=left>
          <a href="http://www.infomous.com"><img src="http://www.infomous.com/site/logos/logo_on_white.jpg" height="50"></a>
        </td>
        <td align=right>
	<a href="'.$client_link.'"><img src="'.$client_logo.'" height="50"></a>
        </td>
      </tr>
    </table>

<h3 style="text-align:center;">The '.$client_name.' <em>Visual Explorer</em> by Infomous</h3>

<p>
This demo illustrates the use of an Infomous Visual Explorer to give readers access to related content after reading an article on '.$client_name.'.

<p>
Copy and paste the URL of any article from '.$client_name.' in the form below (or use the default provided), then click the Submit button. You will then see a page that shows the original article. Scroll to the bottom of the article to see an Infomous Visual Explorer created dynamically from related content.

<p>
Use the checkboxes below to select the type of content to be included in the visual navigator.

<form action="index.php" method="post">
'.$client_name.' article URL: <input type="text" style="width:600px;" name="url" value="'.$inputfile.'"><br>
<input type="checkbox" name="category" checked> Include Category Feeds<br>
<input type="checkbox" name="tags" checked> Include Tag Feeds<br>
<input type="checkbox" name="labels" checked> Show Feed Labels<br>
<input type="checkbox" name="debug"> Include Debug Information<br>
<input type="Submit">
</form>

</body>
</html>
';
}
?>

