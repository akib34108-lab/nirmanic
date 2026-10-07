<?php
include '../connection.php';
$result=$db->common_select('projects');
echo json_encode($result);