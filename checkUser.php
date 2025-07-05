<?php
require_once 'db.php';

// Get posted email
$email = isset($_POST['email']) ? trim($_POST['email']) : '';

if (!empty($email)) {
    // Prepare statement to prevent SQL injection
    $stmt = $conn->prepare("SELECT id FROM user WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    // If any rows found, email exists
    if ($stmt->num_rows > 0) {
        echo "false"; // Email already exists
    } else {
        echo "true"; // Email available
    }

    $stmt->close();
} else {
    echo "false"; // Invalid or missing email
}

$conn->close();
?>
