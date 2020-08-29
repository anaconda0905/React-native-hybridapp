<?php

$registration_ids = array();

$token = isset($_POST['token']) ? $_POST['token'] : '';
array_push($registration_ids, $token);
$title = "Relationship Status";
$body = "Could I have a relationship with you?";
$notification = array('title' => $title, 'body' => $body);
$arrayToSend = array('registration_ids' => $registration_ids, 'notification' => $notification);
$json = json_encode($arrayToSend);

$headers = array();
$headers[] = 'Content-Type: application/json';
$headers[] = 'Authorization: key= AAAAQnpIWUg:APA91bG9HIO5I1ecPUxUrVOc6HdwGr2Pwk3FEHy_XyRx6uhjh-xSvKTdjUHweUju2tAQzZ2c-v-0QBPbzOGSZOlYHv2or31w8EsLBwwa0hyr5u7L8Cqm-i-TjpC16ybxOgjdYpWTvGEe';

$ch = curl_init("https://fcm.googleapis.com/fcm/send");
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
curl_setopt($ch, CURLOPT_POSTFIELDS, $json);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_exec($ch);
curl_close($ch);

?>