<?php

// jsmol.php
// Bob Hanson hansonr@stolaf.edu 1/11/2013
//
// 10 NOV 2018 -- print($output) should be echo($output) to prevent trailing \r\n
// 27 MAR 2018 -- security upgrade
// 31 MAR 2016 -- https://cactus -> https://cactus
// 09 Nov 2015 -- bug fix for www.pdb --> www.rcsb
// 23 Mar 2015 -- checking for missing :// in queries
// 2 Feb 2014 -- stripped of any exec calls and image options-- this was for JSmol image option - abandoned
// 30 Oct 2013 -- saveFile should not convert " to _
// 30 Sep 2013 -- adjusted error handling to only report E_ERROR not E_WARNING
// 7 Sep 2013 -- adding PHP error handling
//
//////// note to administrators:
//
// from http://us3.php.net/file_get_contents: 
//
// A URL can be used as a filename with this function if the fopen wrappers 
// have been enabled. See fopen() for more details on how to specify the 
// filename. See the Supported Protocols and Wrappers for links to information 
// about what abilities the various wrappers have, notes on their usage, and 
// information on any predefined variables they may provide.
///////
//
// Server-side Jmol delivers:
//   simple relay for cross-domain files
//
//   options:
//
//   call
//         "saveFile"
//             returns posted data in "data=" with mime type "mimetype=" to file name "filename="
//         "getInfoFromDatabase" 
//             returns XML data
//             requires database="=" (RCSB REST service)
//         "getRawDataFromDatabase"
//               "_" 
//                  just use $query
//               (anything else)
//                  use $database.$query
//
//   encoding
//         ""        no encoding (default)
//         "base64"  BASE64-encoded binary files for Chrome synchronous AJAX
//                      prepends ";base64," to encoded output  
//
// simple server tests:
//
// http://foo.wherever/jsmol.php?call=getRawDataFromDatabase&database=_&query=http://chemapps.stolaf.edu/jmol/data/t.pdb.gz
// http://goo.wherever/jsmol.php?call=getRawDataFromDatabase&database=_&query=http://chemapps.stolaf.edu/jmol/data/t.pdb.gz&encoding=base64


$myerror = "";

function handleError($severity, $msg, $filename, $linenum) {
  global $myerror;
  switch($severity) {
  case E_ERROR:
    $myerror = "PHP error:$severity $msg $filename $linenum";
    break;
  }
  return true;
}

set_error_handler("handleError");

function getValueSimple($json, $key, $default) {
 if ($json == "") {
	$val = $_REQUEST[$key];
 } else {
 // just do a crude check for "key"..."value"  -- nothing more than that;
 // only for very simple key/value pairs; mostly because we don't have the JSON
 // module set up for our server.

	list($junk,$info) = explode('"'.$key.'"', $json, 2);
	list($junk,$val) = explode('"', $info, 3);
	if ($val == "") {
		$val = str_replace('"','_',$_REQUEST[$key]);
	}
 }
 if ($val == "") {
   $val = $default;
 }
 return $val;
}

if ($_GET['isform']=="true") {
	$values = "";
} else {
	$values= file_get_contents("php://input");
}
$encoding = getValueSimple($values, "encoding", "");
$call = getValueSimple($values, "call", "getRawDataFromDatabase");
$query = getValueSimple($values, "query", "https://cactus.nci.nih.gov/chemical/structure/ethanol/file?format=sdf&get3d=True");
$database = getValueSimple($values, "database", "_");
$test = getValueSimple($values,"test","");
$imagedata = "";
$contentType = "";
$output = "";
$isBinary = false;
$filename = "";

if ($call == "getInfoFromDatabase") {
  // TODO: add PDBe annotation business here
	if ($database == '=') {
		$restQueryUrl = "http://www.rcsb.org/pdb/rest/search";
		$restReportUrl = "http://www.rcsb.org/pdb/rest/customReport";
		$xml = "<orgPdbQuery><queryType>org.pdb.query.simple.AdvancedKeywordQuery</queryType><description>Text Search</description><keywords>$query</keywords></orgPdbQuery>";
		$context = stream_context_create(array('http' => array(
			'method' => 'POST',
			'header' => 'Content-Type: application/x-www-form-urlencoded',
			'content' => $xml))
		);
		$output = file_get_contents($restQueryUrl, false, $context);
		$n = strlen($output)/5;
		if ($n == 0) {
			$output = "ERROR: \"$query\" not found";
		} else {
			if (strlen($query) == 4 && $n != 1) {
				$QQQQ = strtoupper($query);
				if (strpos("123456789", substr($QQQQ, 0, 1)) == 0 && strpos($output, $QQQQ) > 0) {
					$output = "$QQQQ\n".$output.str_replace("$QQQQ\n", "",$output);
				}		  
			}
			if ($n > 50) {
				$output = substr($output, 0, 250);
			}
			$output = str_replace("\n",",",$output);
			//http://www.rcsb.org/pdb/rest/customReport?pdbids=1crn,1d66,1blu,&customReportColumns=structureId,structureTitle
			$output = $restReportUrl."?pdbids=".$output."&customReportColumns=structureId,structureTitle";
			$output = "<result query=\"$query\" count=\"$n\">".file_get_contents($output)."</result>";
		}
	} else {
	  $myerror = "jsmol.php cannot use $call with $database";
	}
	
} else if ($call == "getRawDataFromDatabase") {
	$isBinary = (strpos($query, ".gz") >= 0);
		if ($database != "_")
			$query = $database.$query;
		if (strpos(strtolower($query), 'https://') !== 0 && strpos(strtolower($query), 'http://') !== 0) {
      $output = "invalid url";
    } else if (strpos($query, '?POST?') > 0) {
			list($query,$data) = explode('?POST?', $query, 2);
			$context = stream_context_create(array('http' => array(
				'method' => 'POST',
				'header' => 'Content-Type: application/x-www-form-urlencoded',
				'content' => $data))
			);
			$output = file_get_contents($query, false, $context);
		} else {
  		$output = file_get_contents($query);
      if ($test != "") {
        $output = $query."<br>".$output;
      }
		}
} else if ($call == "saveFile") {
	$imagedata = $_REQUEST["data"];//getValueSimple($values, "data", ""); don't want to convert " to _ here
	$filename = getValueSimple($values, "filename", "");
	$contentType = getValueSimple($values, "mimetype", "application/octet-stream");
	if ($encoding == "base64") {
		$imagedata = base64_decode($imagedata);
		$encoding = "";
	}
} else {
	$myerror = "jsmol.php unrecognized call: $call";
}

ob_start();

 if ($myerror != "") {
   $output = $myerror;
 } else { 
   if ($imagedata != "") {
  	$output = $imagedata;
  	header('Content-Type: '.$contentType);
  	if ($filename != "") {
  	  header('Content-Description: File Transfer');
  		header("Content-Disposition: attachment; filename=\"$filename\"");
      header('Content-Transfer-Encoding: binary');
      header('Expires: 0');
      header('Cache-Control: must-revalidate');
      header('Pragma: public');
  	}
   } else {
  	header('Access-Control-Allow-Origin: *');
  	if ($isBinary) {
  		header('Content-Type: text/plain; charset=x-user-defined');
    } else if (strpos($output, '<html') > 0) {
      header('Content-type: text/html; charset=utf-8');
  	} else {
  		header('Content-Type: application/json');
  	}
   }
   if ($encoding == "base64") {
  	 $output = ";base64,".base64_encode($output);
   }
 } 
 header('Last-Modified: '.date('r'));
 header('Accept-Ranges: bytes');
 header('Content-Length: '.strlen($output));
 echo($output);
ob_end_flush();
?>

