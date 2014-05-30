<?php
print("{\"os\":\"" . inOS($_GET["machine"]) . "\"}");

function inOS($machine) {
	error_reporting(E_ERROR);
	if (fsockopen($machine, 22, $errno, $errstr, .01)) { return "Linux"; }
	elseif (fsockopen($machine, 135, $errno, $errstr, .01)) { return "Windows8"; }
	elseif (fsockopen($machine, 3389, $errno, $errstr, .01)) { return "Windows"; }
	elseif (fsockopen($machine, 1022, $errno, $errstr, .01)) { return "Server"; }
	elseif (fsockopen($machine, 554, $errno, $errstr, .01)) { return "Camera"; }
	else { return "Other"; }
	error_reporting(E_WARNING);
}
?>
