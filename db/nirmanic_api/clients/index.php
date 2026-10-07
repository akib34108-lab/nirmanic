<?php
include '../connection.php';
$result=$db->common_select('clients');
echo json_encode($result);