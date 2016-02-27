<?php
	
	error_reporting(E_ALL & ~E_NOTICE); //error reporting for development
	//error_reporting(0); //disable error reporting for production
	
	
	class SignatureIdentifier {
		
		public $ga_signatures = array( '.google-analytics.com/ga.js', 'ga.async = true;' );
		public $dyn_signatures = array( 'dynect.net', 'dns.dyn.com' );
		
		private $_url;
		private $_hostname;
		
		public function __construct($input) {
			
			if (empty($input)) {
				throw new Exception('No URL provided to run the Signature Identifier against.');
			}
			
			//Set url and hostname variables
			$this->_url = $this->returnValidUrl($input);
			$this->_hostname = $this->returnValidHostname($this->_url);
		}
		
		
		//Determine if site uses Google Analytics by checking the page contents for use of all strings contained within the $ga_signatures array
		public function siteUsesGA() {
			$page_content = @file_get_contents($this->_url);
			
			if ($page_content === false) {
				throw new Exception('Unable to retrieve site\'s content.');
			}
	
			$ga_found = 0;
			
			foreach ($this->ga_signatures as $key => $value) {
				if (strpos($page_content, $value) !== false) {
					$ga_found++;
				}
			}
			
			if ($ga_found == count($this->ga_signatures)) {
				return true;
			}
			
			return false;
		}
		
		
		//Determine if site uses DynDNS by checking if any of the NS records have one of the strings contained within the $dyn_signatures array
		public function siteUsesDyn() {
			$ns_records_array = @dns_get_record($this->_hostname, DNS_NS);
			
			if ($ns_records_array === false) {
				throw new Exception('Unable to retrieve site\'s DNS records.');
			}
	
			$dyn_found = false;
			
			for ($i=0; $i < count($ns_records_array); $i++) { 
				for ($k=0; $k < count($this->dyn_signatures); $k++) { 
					if (strpos($ns_records_array[$i]['target'], $this->dyn_signatures[$k])) {
						$dyn_found = true;
					}
				}
			}
			
			if ($dyn_found) {
				return true;
			}
			
			return false;
		}
		
		
		//Print the results
		public function printResults() {
			$ga_used = $this->siteUsesGA();
			$dyn_used = $this->siteUsesDyn();
			
			echo "Using GA: ".($ga_used ? "yes" : "no")."\n";
			echo "Using Dyn: ".($dyn_used ? "yes" : "no")."\n";
		}
		
		
		//Return a valid URL from the input
		private function returnValidUrl($input) {
			if (strpos($input, "http://") !== 0 && strpos($input, "https://") !== 0) {
		        $url = "http://" . $input;
		    } else {
		    	$url = $input;
		    }
			
			return $url;
		}
		
		
		//Return a valid hostname from the URL
		private function returnValidHostname($url) {
			$parsed_url = parse_url($url);
			
			return $parsed_url['host'];
		}
	}
	
	
	
	try {
		$si = new SignatureIdentifier($argv[1]);
		$si->printResults();
	
	} catch (Exception $e) {
		echo $e->getMessage()."\n";
	}

?>
