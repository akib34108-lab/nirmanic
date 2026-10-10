<?php
include '../connection.php';
$result=$db->common_select('department');
echo json_encode($result);