<?php
include_once('simple_html_dom.php');
$search= $_GET["search"];
#$search = urlencode($search);
$length = $_GET["numResults"];

if(strlen($search) < 1)$search = "none";
if(!$length || $length < 1)$length = 10;
$raw = file_get_contents("http://search.ft.com/search?q=".rawurlencode($search)."&mq=".rawurlencode($search)."&t=all&rpp=".$length."&s=-gadatetimearticle&queryText=");
$html = new simple_html_dom();
$html->load($raw);

header("Content-Type: application/rss+xml;");
    
    
    $rssfeed = '<?xml version="1.0" encoding="ISO-8859-1"?>';
    $rssfeed .= '<rss version="2.0">';
    $rssfeed .= '<channel>';
    $rssfeed .= '<title>FT.com - '.htmlentities($search).'</title>';
    $rssfeed .= '<link>http://www.infomous.com</link>';
    $rssfeed .= '<description>Search results for: '.htmlentities($search).'</description>';
    $rssfeed .= '<language>en-us</language>';
    $rssfeed .= '<copyright>Copyright (C) 2012 infomous.com</copyright>';
    
    foreach($html->find('.result') as $element)
    {
    	//echo $element . '<br>';
		$linkRaw=$element->find("h3 a",0);
		$link = $linkRaw->href;
		$title = $linkRaw->plaintext;
$title = preg_replace('/\s{3,}/',' ', $title);
		$desc=$element->find("div.body p",0)->plaintext;
$desc = preg_replace('/\s{3,}/',' ', $desc);		
$time=$element->find("div div.gadatetimearticle p",0)->plaintext;
		
    	$rssfeed .= '<item>';
    	$rssfeed .= '<title>' . $title . '</title>';
    	$rssfeed .= '<link>' . $link . '</link>';
    	$rssfeed .= '<description>' . $desc . '</description>';
    	
$rssfeed .= '<pubDate>' . $time . '</pubDate>';

//$rssfeed .= '<pubDate>' . date("D, d M Y H:i:s O", strtotime($time)) . '</pubDate>';
    	$rssfeed .= '</item>';
    }
    
    $rssfeed .= '</channel>';
    $rssfeed .= '</rss>';
    
    echo $rssfeed;
