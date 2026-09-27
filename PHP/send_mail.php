<?php
// Разрешаем запросы (на случай если фронтенд и бэкенд на разных портах разработки)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Получаем JSON-данные из тела запроса React
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    // Извлекаем поля
    $name = strip_tags(trim($data['name'] ?? ''));
    $email = filter_var(trim($data['email'] ?? ''), FILTER_VALIDATE_EMAIL);
    $phone = strip_tags(trim($data['phone'] ?? ''));
    $message = strip_tags(trim($data['message'] ?? ''));

    // Укажите почту, КУДА должно прийти письмо
    $to = "evgenijantonyuk@gmail.com";
    $subject = "Новое сообщение с формы контактов от $name";

    // Формируем текст письма
    $email_content = "Имя: $name\n";
    $email_content .= "Email: $email\n";
    $email_content .= "Телефон: $phone\n\n";
    $email_content .= "Сообщение:\n$message\n";

    // Заголовки письма
    $headers = "From: webmaster@yourdomain.com\r\n"; // Замените на доменную почту вашего хостинга
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    // Отправка
    if ($email && mail($to, $subject, $email_content, $headers)) {
        http_response_code(200);
        echo json_encode(["message" => "Письмо успешно отправлено"]);
    } else {
        http_response_code(500);
        echo json_encode(["message" => "Ошибка при отправке почты через mail()"]);
    }
} else {
    http_response_code(403);
    echo json_encode(["message" => "Метод не поддерживается"]);
}
?>
