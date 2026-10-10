<?php
include '../connection.php';
$data = json_decode(file_get_contents('php://input'),true);
$res = [];
if($data['designation_name']){
    $res = $db->common_insert('designation', $data);
}
echo json_encode($res);
