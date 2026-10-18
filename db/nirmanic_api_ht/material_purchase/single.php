<?php
include '../connection.php';
$id=$_GET['id'];
$result=$db->common_select('material_purchase','*',['id'=>$id]);
echo json_encode($result);