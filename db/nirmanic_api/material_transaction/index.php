
<?php
include '../connection.php';
include '../auth_check.php';

$where = [];
$params = [];

$material_id = $_GET['material_id'] ?? '';
$transaction_type = $_GET['transaction_type'] ?? '';
$from_date = $_GET['from_date'] ?? '';
$to_date = $_GET['to_date'] ?? '';

if ($material_id !== '') {
    $material_id = (int) $material_id;
    $where[] = "mt.material_id = $material_id";
}

if ($transaction_type !== '') {
    $transaction_type = addslashes($transaction_type);
    $where[] = "mt.trasaction_type = '$transaction_type'";
}

if ($from_date !== '') {
    $from_date = addslashes($from_date);
    $where[] = "DATE(mt.transaction_date) >= '$from_date'";
}

if ($to_date !== '') {
    $to_date = addslashes($to_date);
    $where[] = "DATE(mt.transaction_date) <= '$to_date'";
}

$sql = "SELECT
            mt.*,
            ml.material_name
        FROM material_transactions mt
        LEFT JOIN material_list ml
            ON mt.material_id = ml.id";

if (!empty($where)) {
    $sql .= " WHERE " . implode(" AND ", $where);
}

$sql .= " ORDER BY mt.transaction_date DESC, mt.id DESC";

$result = $db->common_query($sql);

echo json_encode($result);
?>
