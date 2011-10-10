<?php

#DB connection
$conn = mysql_connect("localhost", "paramax", "Maxim123098")
        or die("Uooos 1!");
//print ("Good 1!");
mysql_select_db("part_number", $conn);

//$_POST['search_text'] = $_GET['search_text'];
if (isset($_POST['search_text'])) {
    $node = array();
    $nodes = array();

    $products = mysql_query("SELECT DISTINCT `xref_max_pn`,`xref_comp_pn` FROM `xref` WHERE `xref_comp_pn` LIKE '%" . $_POST['search_text'] . "%';", $conn);
    $res = new stdClass();
    $res->list = array();
    while ($prod = mysql_fetch_row($products, MYSQL_BOTH)) {
        $res->list[] = $prod['xref_comp_pn'];
    }
    echo json_encode($res);
}
 mysql_close($conn);
?>
