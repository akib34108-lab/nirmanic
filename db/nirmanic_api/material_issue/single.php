<?php
include '../connection.php';
$id=$_GET['id'];
$result=$db->common_select('material_issue','*',['id'=>$id]);
echo json_encode($result);