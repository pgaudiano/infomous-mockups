$curl = curl_init($url);
curl_setopt($curl,CURLOPT_USERAGENT,'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.7; rv:8.0.1) Gecko/20100101 Firefox/8.0.1');
curl_setopt($curl,CURLOPT_RETURNTRANSFER,true);
$page = curl_exec($curl);
curl_close($curl);
