<?php
session_start();
// error_reporting(E_ALL);
// ini_set('display_errors', '1');
require_once 'Zend/Mail/Protocol/Imap.php';
require_once 'Zend/Mail/Storage/Imap.php';
require_once 'Zend/Feed/Writer/Feed.php';

require_once 'Google/Client.php';

$client_id = '769467129103-pbmaeidvr0uvnkef2e5s2qia73hsd9hu.apps.googleusercontent.com';
$client_secret = 'Nrb3yGFfTcw45W-D8kVAjB_D';
$redirect_uri = 'http://www.infomous.com/site/ocean/gmail/oauth2.php';

$client = new Google_Client();
$client->setClientId($client_id);
$client->setClientSecret($client_secret);
$client->setRedirectUri($redirect_uri);
$client->setScopes('https://mail.google.com/ email');

/************************************************
  If we're logging out we just need to clear our
  local access token in this case
 ************************************************/
if (isset($_REQUEST['logout'])) {
  unset($_SESSION['access_token']);
}

/************************************************
  If we have a code back from the OAuth 2.0 flow,
  we need to exchange that with the authenticate()
  function. We store the resultant access token
  bundle in the session, and redirect to ourself.
 ************************************************/
if (isset($_GET['code'])) {
  $client->authenticate($_GET['code']);
  $_SESSION['access_token'] = $client->getAccessToken();
  $redirect = 'http://' . $_SERVER['HTTP_HOST'] . $_SERVER['PHP_SELF'];
  header('Location: ' . filter_var($redirect, FILTER_SANITIZE_URL));
}

/************************************************
  If we have an access token, we can make
  requests, else we generate an authentication URL.
 ************************************************/
if (isset($_SESSION['access_token']) && $_SESSION['access_token']) {
  $client->setAccessToken($_SESSION['access_token']);
} else {
  $authUrl = $client->createAuthUrl();
  header("Location: ".$authUrl);
}

/************************************************
  If we're signed in we can go ahead and retrieve
  the ID token, which is part of the bundle of
  data that is exchange in the authenticate step
  - we only need to do a network call if we have
  to retrieve the Google certificate to verify it,
  and that can be cached.
 ************************************************/
if ($client->getAccessToken()) {
  $_SESSION['access_token'] = $client->getAccessToken();
  // echo $_SESSION['access_token'];
  $token_data = $client->verifyIdToken()->getAttributes();

  // echo var_dump($token_data);
  // echo '<br>';
  // echo var_dump($_SESSION['access_token']);
  // echo '<br>';
  $t = json_decode($_SESSION['access_token']);
  $accessToken = $t->{'access_token'};
  $email = $token_data['payload']['email'];
  // echo $email;
  // echo '<br>';
  // echo $accessToken;
  tryImapLogin($email, $accessToken);
}

?>

<?php
/**
 * Builds an OAuth2 authentication string for the given email address and access
 * token.
 */
function constructAuthString($email, $accessToken) {
  return base64_encode("user=$email\1auth=Bearer $accessToken\1\1");
}

/**
 * Given an open IMAP connection, attempts to authenticate with OAuth2.
 *
 * $imap is an open IMAP connection.
 * $email is a Gmail address.
 * $accessToken is a valid OAuth 2.0 access token for the given email address.
 *
 * Returns true on successful authentication, false otherwise.
 */
function oauth2Authenticate($imap, $email, $accessToken) {
  $authenticateParams = array('XOAUTH2',
      constructAuthString($email, $accessToken));
  $imap->sendRequest('AUTHENTICATE', $authenticateParams);
  while (true) {
    $response = "";
    $is_plus = $imap->readLine($response, '+', true);
    if ($is_plus) {
      error_log("got an extra server challenge: $response");
      // Send empty client response.
      $imap->sendRequest('');
    } else {
      // echo $response.'\n';
      if (preg_match('/^NO /i', $response) ||
          preg_match('/^BAD /i', $response)) {
        error_log("got failure response: $response");
        return false;
      } else if (preg_match("/^OK /i", $response)) {
        return true;
      } else {
        // Some untagged response, such as CAPABILITY
      }
    }
  }
}

/**
 * Given an open and authenticated IMAP connection, displays some basic info
 * about the INBOX folder.
 */
function showInbox($imap) {

  $storage = new Zend_Mail_Storage_Imap($imap);
  /**
  * Create the parent feed
  */
  $feed = new Zend_Feed_Writer_Feed;
  $feed->setTitle('An Email Feed');
  $feed->setLink('http://www.infomous.com');
  $feed->setFeedLink('http://www.infomous.com/site/ocean/gmail', 'atom');
  $feed->setDescription('This is an email feed');
  $feed->setDateModified(time());
  for ($i = $storage->countMessages(); $i >= $storage->countMessages()-100; $i-- ){
    
    // **** gets the subject, strips Re:
    $title = $storage->getMessage($i)->subject;
    $title = preg_replace('/Re:/', '', $title);
    
    // **** gets first 20 words of content as a summary
    $message = $storage->getMessage($i);
    // get the first none multipart part of the message
    $part = $message;
    while ($part->isMultipart()) {
      $part = $message->getPart(1);
    }
    $summary = $part->getContent();
    $summary = implode(' ', array_slice(explode(' ', $summary), 0, 20));

    // **** gets the thread id to construct link
    $message = $imap->requestAndResponse("FETCH $i (X-GM-THRID)");
    $idHex = (int) $message[0][2][1];
    $xGmThrid = base_convert($idHex, 10, 16);
    $link = 'https://mail.google.com/mail/#inbox/'.$xGmThrid;

    $mail = $storage->getMessage($i);
    // $time = utf8_encode(htmlentities());

    // // echo $time;

    // **** creates the feed
    $entry = $feed->createEntry();
    $entry->setTitle($title);
    $entry->setLink($link);
    $entry->setDescription($summary);
    $entry->setDateCreated(strtotime($mail->date));
    $feed->addEntry($entry);
  }
  // echo '</ul>';

  $out = $feed->export('rss');
  header('Content-type: text/xml');
  print $out;
}

/**
 * Tries to login to IMAP and show inbox stats.
 */
function tryImapLogin($email, $accessToken) {
  /**
   * Make the IMAP connection and send the auth request
   */
  $imap = new Zend_Mail_Protocol_Imap('imap.gmail.com', '993', true);
  if (oauth2Authenticate($imap, $email, $accessToken)) {
    // echo '<h1>Successfully authenticated!</h1>';
    showInbox($imap);
  } else {
    echo '<h1>Failed to login</h1>';
  }
}

?>
