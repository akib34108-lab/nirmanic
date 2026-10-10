<?php
include '../connection.php';
$data = json_decode(file_get_contents('php://input'),true);
$res = [];
if($data['department_name']){
    $res = $db->common_insert('department', $data);
}
echo json_encode($res);
