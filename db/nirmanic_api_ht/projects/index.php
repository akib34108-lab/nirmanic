<?php
include '../connection.php';
include '../auth_check.php';
$sql = "SELECT projects.*, clients.client_name, employee.employee_name FROM projects LEFT JOIN clients ON projects.client_id = clients.id LEFT JOIN employee ON projects.employee_id = employee.id";
$result = $db->common_query($sql);
echo json_encode($result);