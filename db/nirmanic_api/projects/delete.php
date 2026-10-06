<?php
include 'connection.php';
$id=$_GET['id'];
$sql = "delete FROM users where id=$id";
$query=$db->query($sql);
if($query) {
    $response = ['status' => 1, 'message' => 'Record deleted successfully.'];
} else {
    $response = ['status' => 0, 'message' => 'Failed to delete record.'];
}
echo json_encode($response);