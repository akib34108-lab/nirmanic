<?php
include '../connection.php';
include '../auth_check.php';
$result=$db->common_select('employee');
echo json_encode($result);