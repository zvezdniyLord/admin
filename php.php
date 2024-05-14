<?php
use PHPMailer\PHPMailer\PHPMailer;
require 'vendor/autoload.php';
$defaultMail = "4neroq4@gmail.com";
$email_addresses = array(
    'Техническая поддержка' => 'aadavidenkoweb@yandex.ru',
    'Запрос документации' => 'aadavidenkoweb@yandex.ru',
    'Запрос пробной версии' => 'aadavidenkoweb@yandex.ru',
    'Запрос ценового предложения' => 'aadavidenkoweb@yandex.ru',
    'Запрос на обучение' => 'aadavidenkoweb@yandex.ru' 
);
$mail = new PHPMailer(true);
$mail->isHTML(true);
$mail->CharSet = "UTF-8";
$mail->isSMTP();
$mail->SMTPAuth = true;
$mail->Host = "smtp.yandex.ru";
$mail->Port = 587;
$mail->Username = "aadavidenkoweb@yandex.ru";
$mail->Password = "vklwygvjagfggohn";
$mail->setFrom('aadavidenkoweb@yandex.ru', '');
$mail->addAddress($defaultMail);
$body = "<h1>Письмо отправлено с сайта scadaint.ru</h1>";
if(trim(!empty($_POST['company']))) {
    $body.='<p><strong>Компания: </strong>' .$_POST['company'].'</p>';
}
if(trim(!empty(isset($email_addresses[$_POST['select']])))) {
    $defaultMail = $email_addresses[$_POST['select']];
    $body.='<p><strong>Цель запроса: </strong>' .$_POST['select'].'</p>';
}
if(trim(!empty($_POST['name']))) {
    $body.='<p><strong>ФИО: </strong>' .$_POST['name'].'</p>';
}
if(trim(!empty($_POST['email']))) {
    $body.='<p><strong>Email: </strong>' .$_POST['email'].'</p>';
}
if(trim(!empty($_POST['tel']))) {
    $body.='<p><strong>Контактный телефон: </strong>' .$_POST['tel'].'</p>';
}
if(trim(!empty($_POST['message']))) {
    $body.='<p><strong>Сообщение: </strong>' .$_POST['message'].'</p>';
}

$mail->addAddress($defaultMail);
$mail->Body = $body;
if(!$mail->send()) {
    $message = "Error";
} else {
    $message = "Data sends";
}

$response = ['message' => $message];
header('Content-type: application/json');
echo json_encode($response);
?>
