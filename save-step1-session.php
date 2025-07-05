<?php
session_start();

// Get raw JSON body
$data = json_decode(file_get_contents('php://input'), true);

// Store in session
if (!empty($data)) {
    $_SESSION['businessType'] = $data['businessType'] ?? '';
    $_SESSION['websiteName'] = $data['websiteName'] ?? '';
    $_SESSION['websiteDescription'] = $data['websiteDescription'] ?? '';
    $_SESSION['websiteType'] = $data['websiteType'] ?? '';
    
    echo 'ok';
} else {
    echo 'fail';
}


?>