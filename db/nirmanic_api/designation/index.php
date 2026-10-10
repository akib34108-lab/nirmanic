<?php
include '../connection.php';
$result=$db->common_select('designation');
echo json_encode($result);