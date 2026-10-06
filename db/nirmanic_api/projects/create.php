<?php
include 'connection.php';
$user = json_decode(file_get_contents('php://input'));

if($user->name){
    $sql = "INSERT INTO users SET name= '$user->name', email ='$user->email',
                mobile ='$user->mobile'";
    $query=$db->query($sql);
    if($query) {
        $data = ['status' => 1, 'message' => "Record successfully created"];
    } else {
        $data = ['status' => 0, 'message' => "Failed to create record."];
    }
}
echo json_encode($data);
