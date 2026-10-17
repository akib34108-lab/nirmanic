<?php
include '../connection.php';
include '../auth_check.php';
$sql = "SELECT material_issue.*, 
projects.name, material_list.material_name, employee.employee_name FROM material_issue LEFT JOIN projects ON material_issue.project_id = projects.id LEFT JOIN material_list ON material_issue.material_id = material_list.id LEFT JOIN employee ON material_issue.issue_to = employee.id";
$result = $db->common_query($sql);
echo json_encode($result);