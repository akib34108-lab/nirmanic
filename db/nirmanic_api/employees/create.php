
<?php
include '../connection.php';
include '../auth_check.php';

$uploadDir = '../image/employee/';
$image = "";

if (!empty($_FILES['image']['name'])) {
    $name = rand() . '_' . basename($_FILES['image']['name']);
    $targetPath = 'image/employee/' . $name;

    
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    if (move_uploaded_file($_FILES['image']['tmp_name'], $uploadDir . $name)) {
        $_POST['image'] = $targetPath;
    }
}
$res = [];

if (!empty($_POST['employee_name'])) {
    $res = $db->common_insert('employee', $_POST);
}

echo json_encode($res);
