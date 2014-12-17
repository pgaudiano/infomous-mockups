<?php
require_once('simple_html_dom.php');

class RSS extends XMLWriter {
	public $id = 0;
	private $name = "";

	/**
	 * function: default construction, use to create an channel
	 * @param $title: channel's title
	 * @param $link: channel's link
	 * @param $description: channel's description  
	 * @param $num: random number, attached to the file's name to avoid duplicate
	 */
	function __construct($title, $link, $description, $num) {
		$this->openMemory();
		$this->startDocument('1.0','UTF-8');
		$this->setIndent(4);   
		// declare it as an rss document
		$this->startElement("rss");
   	 		$this->writeAttribute('version', '2.0');
    		$this->writeAttribute('xmlns:atom', 'http://www.w3.org/2005/Atom');
    		$this->writeAttribute('xmlns:media', 'http://search.yahoo.com/mrss/');
    	
    	$this->startElement("channel");
    	$title = str_replace(" ", "_", $title);
    	global $name;
    	$name = $title.'~'.$num.'.xml'; // add random number to avoid duplicate
    	// validator's requirement
    		$this->startElement('atom:link');
    		    $this->writeAttribute('href', $link."/".$name);
				$this->writeAttribute('rel', 'self');
				$this->writeAttribute('type', 'application/rss+xml');
			$this->endElement();
			// channel's information
			$title = "Search for: ".$title;
    		$this->writeElement('title', $title);
    		$this->writeElement('link', $link);
    		$this->writeElement('description', $description);
    		// $this->writeElement('pubDate', date("D, d M Y H:i:s e"));
	}

	/**
	 * function: add an item to this file
	 * @param $title: item's title
	 * @param $link: item's link
	 * @param $description: item's description
	 * @param $thumbnail: item's thumbnail
	 */
	function addItem($title, $link, $description, $thumbnail) {
		// avoid null item
		if (strlen(trim($title)) == 0) {
			return;
		}
		$this->startElement("item");
			// adding attributes to the item
			$this->writeElement('title', $title);
			$this->writeElement('link', $link);
			$this->writeElement('description', $description);
			if ($thumbnail != null) {
				// make unique guid if there are same item titles
				global $id;
				$id = $id + 1;
				// $this->writeElement('guid', $link."#".$id);
				$this->writeElement('guid', $link);
				$this->startElement('media:thumbnail');
					$this->writeAttribute('url', $thumbnail);
				$this->endElement();
			}
		$this->endElement();
	}

	function getOutput() {
		$this->endElement(); // end channel
		$this->endElement(); // end rss
		$this->endDocument(); // end document
		return $this->outputMemory();
	}

	function output() {
    	header('Content-Type: text/xml');
        global $name;
        // write to the file "xml/[title~num].xml"
        
  //       $handle = fopen("xml/".$name, "w+");
		// $file = $this->getOutput();
		// if ($handle) {
		// 	fwrite($handle, $file);
		// 	fclose($handle);
		// }
		// $this->flush();
		
		$file = "xml/".$name;
		// Open the file to get existing content
		$current = file_get_contents($file);
		// Append content to the file
		$current .= $this->getOutput();
		// Write the contents back to the file
		file_put_contents($file, $current);
		$this->flush();
    }
}
?>
