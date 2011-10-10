<?php

#DB connection
$conn_para = mysql_connect("localhost", "paramax", "Maxim123098");

$nid = $_GET['node_id'];

if ($nid)
    $already_list = mysql_query("SELECT count(*) as count FROM `para`.`nodes` WHERE display = 1 AND tree_id = 1 AND parent_id =" . $nid . ";", $conn_para);
else 
    die();
$count = mysql_fetch_row($already_list, MYSQL_BOTH);
if ($count['count'] == 0) {
    $sql = sprintf("SELECT 
                        ds.qv_parts_short_text,
                        ds.qv_en_title,
                        ds.qv_pk
                    FROM 
                        `para`.`node_parts` as np
                        LEFT JOIN `part_number`.`qv_datasheets` as ds ON np.qv_id = ds.qv_pk
                    WHERE 
                        np.node_id = %s 
                    ORDER BY part_number ASC;", $nid);
    $rows = mysql_query($sql, $conn_para);
    while ($row = mysql_fetch_row($rows, MYSQL_BOTH)) {
        $tree_one = array();
        $tree_one['name'] = $row['qv_parts_short_text'];
        $tree_one['id'] = $row['qv_pk'];
        $tree_one['descr'] = $row['qv_en_title'];
        $node[] = $tree_one;
    }
} else {
    $sql = sprintf('SELECT 
                        parent.`node_id` , 
                        parent.`en_title` , 
                        child.`node_id` AS cnid
                    FROM 
                        `para`.`nodes` AS parent
                        LEFT JOIN `para`.`nodes` child ON child.`parent_id` = parent.`node_id` AND child.tree_id = 1 AND child.display = 1
                    WHERE 
                        parent.tree_id = 1 AND
                        parent.display =1 AND 
                        parent.parent_id = "%s"
                    GROUP BY parent.`node_id`
                    ORDER BY parent.sort_key ASC', $nid);

    $tree_list = mysql_query($sql, $conn_para);

    while ($row = mysql_fetch_array($tree_list, MYSQL_BOTH)) {
        $tree_one['name'] = $row['en_title'];
        $tree_one['node_id'] = $row['node_id'];
        if ($row['cnid']) {
            $tree_one['list'] = false;
        } else {
            $tree_one['list'] = true;
        }
        $node[] = $tree_one;
    }
}

$nodes['list'] = $node;
print json_encode($nodes);

mysql_close($conn_para);
?>
