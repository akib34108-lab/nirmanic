<?php
include '../connection.php';
$data = json_decode( file_get_contents('php://input'), true);
$id=$_GET['id'];
$res=$db->common_update("designation",$data,["id"=>$id]);
echo json_encode($res);
