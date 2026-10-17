
<?php
include '../connection.php';
include '../auth_check.php';
$res = [
    "status" => false,
    "data" => [],
    "message" => ""
];
if (isset($_POST['issue_id']) && isset($_POST['items'])) {
    $issue_id = $_POST['issue_id'];
    $items = json_decode($_POST['items'], true);
    if (is_array($items) && count($items) > 0) {
        $insertedItems = [];
        foreach ($items as $item) {
            $data = [
                'issue_id'    => $issue_id,
                'material_id' => $item['material_id'],
                'unit_id'     => $item['unit_id'],
                'quantity'    => $item['quantity']
            ];
            $result = $db->common_insert(
                'material_issue_item',
                $data
            );
            if (!$result['status']) {
                $res['message'] = $result['message'];
                echo json_encode($res);
                exit;
            }
            $insertedItems[] = $result['data'];
        }
        $res['status'] = true;
        $res['data'] = $insertedItems;
        $res['message'] = 'Material issue items inserted successfully';
    } else {
        $res['message'] = 'No material items provided';
    }
} else {
    $res['message'] = 'Issue ID and items are required';
}
echo json_encode($res);
