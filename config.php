<?php
require_once 'vendor/autoload.php';
session_start();

$client = new Google_Client();

$client->setClientId('24204933880-9keat0hc07cvpa9ofl1vsf5mi1b028ul.apps.googleusercontent.com');
$client->setClientSecret('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');
$client->setRedirectUri('http://localhost/storeinminutes/callback.php');
$client->addScope('email');
$client->addScope('profile');
?>


