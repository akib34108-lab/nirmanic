<?php
include 'connection.php';
$data = [];
$id=$_GET['id'];
$sql = "SELECT * FROM users where id=$id";
$result=$db->query($sql);
while($row = $result->fetch_assoc()){
	$data= $row;
}
echo json_encode($data);