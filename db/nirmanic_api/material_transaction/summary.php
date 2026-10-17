
<?php
include '../connection.php';
include '../auth_check.php';

$id = isset($_GET['id']) ? (int) $_GET['id'] : 0;

if ($id <= 0) {
    http_response_code(400);
    echo json_encode([
        'status' => false,
        'message' => 'Valid transaction ID is required'
    ]);
    exit;
}

$sql = "SELECT
            mt.*,
            ml.material_name
        FROM material_transactions mt
        LEFT JOIN material_list ml
            ON mt.material_id = ml.id
        WHERE mt.id = $id
        LIMIT 1";

$result = $db->common_query($sql);

echo json_encode($result);
?>
