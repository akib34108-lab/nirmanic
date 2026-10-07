<?php
include '../connection.php';
$id=$_GET['id'];
$res=$db->common_delete('clients',['id'=>$id]);
echo json_encode($res);