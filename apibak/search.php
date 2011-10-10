<?php

#DB connection
$conn = mysql_connect("localhost", "paramax", "Maxim123098")
or die ("Uooos 1!");
//print ("Good 1!");
mysql_select_db("part_number", $conn);

$search_text = $_POST['search_text'];
$node=array();
$nodes=array();

$products = mysql_query("SELECT * FROM `qv_datasheets` WHERE `qv_parts_short_text` LIKE '%".$search_text."%';", $conn);
$res = new stdClass();
$res->list = array();
while ($product = mysql_fetch_array($products, MYSQL_BOTH))
{ 
	$node['product_id'] = $product['qv_pk'];
	$node['product_name'] = $product['qv_parts_short_text'];
	$res->list[] = $node;
}

print json_encode($res);

mysql_close($conn);

?>
