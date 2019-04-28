<?php

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $valid = true;
    if (sizeof($data) == 5) {
        if (!preg_match("/^[А-ЯЁ][а-яё]+(-[а-яё]+)*$/u", $data['firstName'])) {
            $valid = false;
        }
        if (!preg_match("/^[А-ЯЁ][а-яё]+(-[а-яё]+)*$/u", $data['lastName'])) {
            $valid = false;
        }
        $complaint = $data['complaint'];
        if ($complaint != 'Software' && $complaint != 'Hardware'
            && $complaint != 'Peripheral' && $complaint != 'BIOS') {
            $valid = false;
        }
        $result = $data['conclusion'];
        if ($result != 'noIssues' && $result != 'Warnings'
            && $result != 'criticalIssues') {
            $valid = false;
        }
        if (!preg_match("/^([А-ЯЁа-яё ]+:[А-ЯЁа-яё ,]+[.])*$/u", $data['comment'])) {
            $valid = false;
        }
    } else {
        $valid = false;
    }
    if ($valid) {
        $file = fopen("db.txt", 'a');
        fwrite($file, '[POST]' . "\n");
        foreach ($data as $key => $value) {
            $to_write = $key . ': ' . $value . "\n";
            fwrite($file, $to_write);
        }
        fwrite($file, "\n");
        fclose($file);
    }
    echo json_encode(['result' => 'ok', 'valid' => $valid]);
} else {
    echo "<h1 style='text-align: center'>This page in none of your concern. Go away</h1>>";
}
