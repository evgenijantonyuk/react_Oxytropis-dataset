<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

// Обработка предварительного CORS-запроса браузера
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["message" => "Метод не поддерживается"]);
    exit;
}

$json = file_get_contents('php://input');
$data = json_decode($json, true);

// Очистка данных и защита от инъекции заголовков
$name = str_replace(["\r", "\n"], '', strip_tags(trim($data['name'] ?? '')));
$email = filter_var(trim($data['email'] ?? ''), FILTER_VALIDATE_EMAIL);
$phone = strip_tags(trim($data['phone'] ?? ''));
$message = strip_tags(trim($data['message'] ?? ''));

if (!$name || !$email || !$message) {
    http_response_code(400);
    echo json_encode(["message" => "Заполните обязательные поля корректно"]);
    exit;
}

$to = "evgenijantonyuk@gmail.com";
$rawSubject = "Новое сообщение с формы контактов от $name";
$subject = '=?UTF-8?B?' . base64_encode($rawSubject) . '?=';

$email_content = "Имя: $name\n";
$email_content .= "Email: $email\n";
$email_content .= "Телефон: $phone\n\n";
$email_content .= "Сообщение:\n$message\n";

// Укажите существующий ящик на вашем домене
$fromEmail = "noreply@ваш-реальный-домен.ru";

$headers = "From: $fromEmail\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

if (mail($to, $subject, $email_content, $headers, "-f$fromEmail")) {
    http_response_code(200);
    echo json_encode(["message" => "Письмо успешно отправлено"]);
} else {
    http_response_code(500);
    echo json_encode(["message" => "Ошибка сервера при отправке письма"]);
}
