<?php
include '../connection.php';
$sql = "SELECT projects.*, clients.client_name FROM projects LEFT JOIN clients ON projects.client_id = clients.id";
$result = $db->common_query($sql);
echo json_encode($result);