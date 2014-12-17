<?
class ShutterstockAPI {
  protected $ch;
  protected $username;
  protected $key;

  public function __construct($username, $key) {
    $this->username = $username;
    $this->key = $key;
  }

  protected function getCurl($url) {
    if (is_null($this->ch)) {
      $ch = curl_init();
      curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
      curl_setopt($ch, CURLOPT_USERPWD, $this->username . ':' . $this->key);
      curl_setopt($ch, CURLOPT_HEADER, 0);
      curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
      $this->ch = $ch;
    }

    curl_setopt($this->ch, CURLOPT_URL, $url);

    return $this->ch;
  }

  public function search($search_terms, $type='images') {
    $search_terms_for_url = preg_replace('/ /', '+', $search_terms);
    $url = 'http://api.shutterstock.com/' . $type . '/search.json?searchterm=' . $search_terms_for_url;
    $username = $this->username;
    $key = $this->key;
    $ch = $this->getCurl($url);
    $json = curl_exec($ch);
    return json_decode($json);
  }
}
?>
