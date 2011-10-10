<?php

#DB connection
$conn = mysql_connect("localhost", "paramax", "Maxim123098")
or die ("Uooos 1!");
//print ("Good 1!");
mysql_select_db("part_number", $conn);

$qv_pk = $_GET['qv_pk'];

$qv_datasheets_fk = $qv_pk;
//echo '<br>Parts--->> '.$qv_datasheets_fk;
$data = mysql_query("SELECT * FROM `qv_datasheets` WHERE `qv_pk`='".$qv_datasheets_fk."';", $conn);
while ($datas = mysql_fetch_array($data, MYSQL_BOTH))
{
	//echo '<br>Data--->> '.$datas['qv_parts_short_text'];
	//echo '<br>';
	$result['product_id'] = $datas['qv_pk'];
	$result['product_name'] = nl2br($datas['qv_parts_short_text']);
	$result['short_description'] = nl2br($datas['qv_en_title']);
	$result['description'] = nl2br($datas['qv_en_description']);
	$result['features'] = $datas['qv_en_features'];
	$result['diagram'] = $datas['qv_diagram'];
	$result['pdf'] = $datas['qv_en_pdf_name'];
	$apps=array();	
// application/users
	$app_id = mysql_query("SELECT * FROM `qv_datasheet_applications` WHERE `qv_datasheets_fk`='".$qv_datasheets_fk."';", $conn);
	while ($app_ids = mysql_fetch_array($app_id, MYSQL_BOTH))
	{	
//			echo '<br>Apps--->> '.$app_ids['qv_applications_fk'];
		$app_names = mysql_query("SELECT `qv_en_application_name` FROM `qv_applications` WHERE `qv_applications_pk`='".$app_ids['qv_applications_fk']."';", $conn);
		while ($app_name = mysql_fetch_array($app_names, MYSQL_BOTH))
		{
			//echo '<br>App_name--->> '.$app_name['qv_en_application_name'];
			$apps[] = $app_name['qv_en_application_name'];
		}
	}
	$result['app'] = $apps;	

	//$result[''] = $datas[''];

	print json_encode($result);
}

mysql_close($conn);

?>
