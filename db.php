<?php

$host = 'localhost';
$username = 'root';
$password = '';
$database = 'storeinminutes';

// Create connection
$conn = mysqli_connect($host, $username, $password, $database);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// Optional: set charset
mysqli_set_charset($conn, 'utf8mb4');
?>