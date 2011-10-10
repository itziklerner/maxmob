<?php

#DB connection
$conn = mysql_connect("localhost", "paramax", "Maxim123098")
        or die("Uooos 1!");
//print ("Good 1!");
mysql_select_db("part_number", $conn);

$_POST['xref_comp_pn'] = $_GET['cross'];
if (isset($_POST['xref_comp_pn'])) {
    $node = array();
    $products = mysql_query("SELECT `xref_max_pn` FROM `xref` WHERE `xref_comp_pn` = '" . $_POST['xref_comp_pn'] . "';", $conn);
    $str = "";
    $res = new stdClass();
    $res->list = array();
    while ($prod = mysql_fetch_row($products, MYSQL_BOTH)) {
        $str .= " '" . $prod['xref_max_pn'] . "',";
    }
    $str = rtrim($str, ",");

    $sql = sprintf('SELECT 
                        ds.`qv_pk`, 
                        ds.`qv_parts_short_text`, 
                        ds.`qv_en_title`, 
                        p.`qv_part_no`
                    FROM 
                        `part_number`.`qv_datasheets` AS ds,
                        `part_number`.`qv_parts` AS p
                    WHERE 
                        ds.`qv_pk` = p.`qv_datasheets_fk`
                        AND p.`qv_part_no`
                        IN ( %s )', $str);
    $details = mysql_query($sql, $conn);
    while ($row = mysql_fetch_row($details, MYSQL_BOTH)) {
        $tree_one['name'] = $row['qv_parts_short_text'];
        $tree_one['id'] = $row['qv_pk'];
        $tree_one['descr'] = $row['qv_en_title'];
        $res->list[] = $tree_one;
    }
    echo json_encode($res);
}
mysql_close($conn);
?>
