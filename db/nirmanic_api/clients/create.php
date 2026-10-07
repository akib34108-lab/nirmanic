<?php
include '../connection.php';

$data = json_decode(file_get_contents('php://input'),true);
$res = [];
if($data['name']){
    $res = $db->common_insert('clients', $data);
}
echo json_encode($res);