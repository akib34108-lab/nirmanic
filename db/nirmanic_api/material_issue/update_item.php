
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

    if (!is_array($items)) {
        $res['message'] = 'Invalid items data';
        echo json_encode($res);
        exit;
    }

    // Get existing items for this issue
    $existingResult = $db->common_select(
        'material_issue_item',
        '*',
        ['issue_id' => $issue_id]
    );

    $existingItems = $existingResult['data'] ?? [];
    $submittedIds = [];
    $savedItems = [];
    $success = true;

    // Update existing items and insert new items
    foreach ($items as $item) {

        if (
            empty($item['material_id']) ||
            empty($item['unit_id']) ||
            !isset($item['quantity']) ||
            !is_numeric($item['quantity']) ||
            (float)$item['quantity'] <= 0
        ) {
            $success = false;
            $res['message'] = 'Invalid material, unit or quantity';
            break;
        }

        $data = [
            'issue_id'    => $issue_id,
            'material_id' => $item['material_id'],
            'unit_id'     => $item['unit_id'],
            'quantity'    => $item['quantity']
        ];

        if (!empty($item['id'])) {

            // Update existing item belonging to this issue
            $item_id = $item['id'];

            $result = $db->common_update(
                'material_issue_item',
                $data,
                [
                    'id' => $item_id,
                    'issue_id' => $issue_id
                ]
            );

            if (!$result['status']) {
                $success = false;
                $res['message'] = $result['message'];
                break;
            }

            $submittedIds[] = (string)$item_id;
            $savedItems[] = $item_id;

        } else {

            // Insert new item
            $result = $db->common_insert(
                'material_issue_item',
                $data
            );

            if (!$result['status']) {
                $success = false;
                $res['message'] = $result['message'];
                break;
            }

            $newId = $result['data'];

            $submittedIds[] = (string)$newId;
            $savedItems[] = $newId;
        }
    }

    // Delete items removed from the form
    if ($success) {

        foreach ($existingItems as $existingItem) {

            // common_select returns stdClass objects
            $existingId = (string)$existingItem->id;

            if (!in_array($existingId, $submittedIds, true)) {

                $deleteResult = $db->common_delete(
                    'material_issue_item',
                    [
                        'id' => $existingItem->id,
                        'issue_id' => $issue_id
                    ]
                );

                if (!$deleteResult['status']) {
                    $success = false;
                    $res['message'] = $deleteResult['message'];
                    break;
                }
            }
        }
    }

    if ($success) {
        $res['status'] = true;
        $res['data'] = $savedItems;
        $res['message'] = 'Material issue items updated successfully';
    }

} else {
    $res['message'] = 'Issue ID and items are required';
}

echo json_encode($res);
?>
