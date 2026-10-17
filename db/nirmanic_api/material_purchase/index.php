<?php
include '../connection.php';
include '../auth_check.php';
$sql = "SELECT material_purchase.*, supplier.supplier_name, projects.name, material_list.material_name FROM material_purchase LEFT JOIN projects ON material_purchase.project_id = projects.id LEFT JOIN material_list ON material_purchase.material_id = material_list.id LEFT JOIN supplier ON material_purchase.supplier_id = supplier.id";
$result = $db->common_query($sql);
echo json_encode($result);