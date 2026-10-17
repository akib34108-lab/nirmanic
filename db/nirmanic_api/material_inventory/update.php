<?php
include '../connection.php';
$id=$_GET['id'];
 $res=$db->common_update('material_inventory',$_POST,['id'=>$id]);

 echo json_encode($res);
