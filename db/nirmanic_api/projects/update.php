<?php
include 'connection.php';
$user = json_decode( file_get_contents('php://input') );
$id=$_GET['id'];
$sql = "UPDATE users SET name= '$user->name', email ='$user->email',
     mobile ='$user->mobile' WHERE id = $id";

$query=$db->query($sql);
if($query) {
    $response = ['status' => 1, 'message' => 'Record updated successfully.'];
} else {
    $response = ['status' => 0, 'message' => 'Failed to update record.'];
}
echo json_encode($response);
