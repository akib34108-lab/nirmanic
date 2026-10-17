<?php
include '../connection.php';
include '../auth_check.php';
$sql = "SELECT material_list.*, 
material_category.category_name, material_unit.unit_name, material_inventory.current_stock FROM material_list LEFT JOIN material_category ON material_list.category_id = material_category.id LEFT JOIN material_unit ON material_list.unit_id = material_unit.id LEFT JOIN material_inventory ON material_list.current_stock = material_inventory.material_id";
$result = $db->common_query($sql);
echo json_encode($result);