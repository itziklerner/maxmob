<?php

#DB connection
$conn_para = mysql_connect("localhost", "paramax", "Maxim123098");
#or die ("Uooos 1!");
#print ("Good 1!");
#mysql_select_db("para", $conn_para);

/*$conn_maxim = mysql_connect("progforce.com", "paramax", "Maxim123098", true)
or die ("Uooos 2!");
print ("Good 2!");
mysql_select_db("maxim", $conn_maxim);*/

$_POST['node_id'] = $_GET['node_id'];
if (isset($_POST['node_id']))

$already_list = mysql_query("SELECT count(*) FROM `para`.`nodes` WHERE display = 1 and parent_id =".$_POST['node_id'].";",$conn_para);

while ($count = mysql_fetch_row($already_list, MYSQL_BOTH))
{
	if  ($count['count(*)'] == 0)
	{

		$criteria = mysql_query("SELECT `criteria` FROM `para`.`nodes` WHERE display = 1 and node_id =".$_POST['node_id'].";",$conn_para);
		while ($crit = mysql_fetch_row($criteria, MYSQL_BOTH))
		{
			preg_match_all("/\?q=(.*?)\&/", $crit['criteria'], $q);

			 $family = mysql_query("SELECT `FAMILY_ID` FROM `maxim`.`FAMILIES` WHERE FAMILY_SHORT_NAME LIKE '%".$q[1][0]."%';",$conn_para);
			 while ($fam = mysql_fetch_row($family, MYSQL_BOTH))
			 {
				 $family_id = $fam['FAMILY_ID'];
				 $product = mysql_query("SELECT `PRODUCT_NUMBER` FROM `maxim`.`PRODUCTS` WHERE FAMILY_ID=".$family_id.";",$conn_para);
				 $str = "";
				 while ($prod = mysql_fetch_row($product, MYSQL_BOTH))
				 {
				 	$str .= " '".$prod['PRODUCT_NUMBER']."',";
				 }
				 $str = rtrim($str,",");
				 $sql = sprintf('SELECT 
										ds.`qv_pk`, 
										ds.`qv_parts_short_text`, 
										ds.`qv_en_title`,
										p.`qv_part_no`
									FROM 
										`part_number`.`qv_datasheets` as ds,
										`part_number`.`qv_parts`as p
									WHERE 
										ds.`qv_pk` = p.`qv_datasheets_fk` AND p.`qv_part_no` IN ( %s )', 
				 					$str);
				 $details = mysql_query($sql,$conn_para);
				 while ($row = mysql_fetch_row($details, MYSQL_BOTH)){
				 	
				 	$tree_one['name'] = $row['qv_parts_short_text'];
					$tree_one['id'] = $row['qv_pk'];
					$tree_one['descr'] = $row['qv_en_title'];
					$node[] = $tree_one;
				 }
				 					//$					
				 //print_r ();
				 /*
				   
				  print $prod['PRODUCT_NUMBER'].'----';
				 	
				 	$sql = sprintf('SELECT 
										ds.`qv_pk`, 
										ds.`qv_parts_short_text`, 
										ds.`qv_en_title` 
									FROM 
										`part_number`.`qv_datasheets` as ds,
										`part_number`.`qv_parts`as p
									WHERE 
										ds.`qv_pk` = p.`qv_datasheets_fk` AND p.`qv_part_no` = "%s"', 
				 					$prod['PRODUCT_NUMBER']);
				 	echo $sql."<br/>";
				 	#print "SELECT `qv_pk`, `qv_parts_short_text`, `qv_en_title` from `part_number`.`qv_datasheets` where `qv_pk` = (SELECT `qv_datasheets_fk` FROM `part_number`.qv_parts` WHERE `qv_part_no` = '".$prod['PRODUCT_NUMBER']."')";
				 	$details = mysql_query($sql,$conn_para);
				 	print_r (mysql_fetch_row($details, MYSQL_BOTH));
				  */
			 }
		}
		{
		}
	}
	else
	{
		#$tree_list = mysql_query("SELECT `node_id`, `en_title` FROM `para`.`nodes` WHERE display = 1 and parent_id =".$_POST['node_id'].";",$conn_para);
		$sql = sprintf('SELECT 
							parent.`node_id` , 
							parent.`en_title` , 
							child.`node_id` AS cnid
						FROM 
							`para`.`nodes` AS parent
							LEFT JOIN `para`.`nodes` child ON child.`parent_id` = parent.`node_id`
						WHERE 
							parent.display =1 AND 
							parent.parent_id = "%s"
						GROUP BY parent.`node_id`', $_POST['node_id']);

		$tree_list = mysql_query($sql,$conn_para);
		
		while ($row = mysql_fetch_array($tree_list, MYSQL_BOTH))
		{
			$tree_one['name'] = $row['en_title'];
			$tree_one['node_id'] = $row['node_id'];
			if ($row['cnid'])
			{
				$tree_one['list'] = false;
			}
			else
			{
				$tree_one['list'] = true;
			}
			$node[] = $tree_one;
			/*$list = mysql_query("SELECT count(*) FROM `para`.`nodes` WHERE display = 1 and parent_id =".$tree_one['node_id'].";",$conn_para);
			while ($count = mysql_fetch_row($list, MYSQL_BOTH))
			{
				if  ($count['count(*)'] > 0)
				{
					$tree_one['list'] = false;
				}
				else
				{
					$tree_one['list'] = true;

				}

				$node[] = $tree_one;
			
				

			}*/
		}
	}}
	$nodes['list'] = $node;
	print json_encode($nodes);

	mysql_close($conn_para);

	?>
