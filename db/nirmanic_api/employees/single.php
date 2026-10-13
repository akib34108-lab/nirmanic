<?php
include '../connection.php';
$id=$_GET['id'];
$sql = "SELECT employee.*, designation.designation_name, department.department_name FROM employee LEFT JOIN designation ON employee.designation_id = designation.id LEFT JOIN department ON employee.department_id = department.id;";
$result=$db->common_query($sql,['id'=>$id]);
echo json_encode($result);