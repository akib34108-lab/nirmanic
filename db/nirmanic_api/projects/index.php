<?php
include '../connection.php';

$sql = 'SELECT * FROM projects';
$result=$db->query($sql);
while($row = $result->fetch_object()){
	$data[]= $row;
}
echo json_encode($data);