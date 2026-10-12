<?php
include '../connection.php';
include '../auth_check.php';

$id=$_GET['id'];
 $get_res=$db->common_select('employee','*',['id'=>$id]);
 if($get_res['status'] && count($get_res['data'])>0){
     $employee=$get_res['data'][0];
     if(file_exists('../'.$employee->image)){
         unlink('../'.$employee->image);
     }
 }
$res=$db->common_delete('employee',['id'=>$id]);

echo json_encode($res);