<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $valid = true;
    $message = "Сохранено";
    if (sizeof($data) == 5) {
        if (!preg_match("/^[А-ЯЁ][а-яё]+(-[а-яё]+)*$/u", $data['firstName'])) {
            $valid = false;
            $message = "Имя должно состоять из русских букв и начинаться с заглавной буквы.";
        }
        if (!preg_match("/^[А-ЯЁ][а-яё]+(-[а-яё]+)*$/u", $data['lastName'])) {
            $valid = false;
            $message = "Фамилия должна состоять из русских букв и начинаться с заглавной буквы.";
        }
        $complaint = $data['complaint'];
        if ($complaint != 'Software' && $complaint != 'Hardware'
            && $complaint != 'Peripheral' && $complaint != 'BIOS') {
            $valid = false;
            $message = "Выберите жалобу";
        }
        $result = $data['conclusion'];
        if ($result != 'noIssues' && $result != 'Warnings'
            && $result != 'criticalIssues') {
            $valid = false;
            $message = "Выберите вердикт";
        }
        if (!preg_match("/^([А-ЯЁа-яё ]+:[А-ЯЁа-яё ,]+[.])*$/u", $data['comment'])) {
            $valid = false;
            $message = 'Комментарий должен состоять из русских букв и каждая его часть должна подчиняться формату: "<Заголовок>: <Описание>.". Описание может содержать запятые.';
        }
    } else {
        $message = "Форма заполнена неполностью";
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
    echo json_encode(['result' => 'ok', 'valid' => $valid, 'message' => $message]);
} else {
    echo "<h1 style='text-align: center'>This page in none of your concern. Go away</h1>";
}
