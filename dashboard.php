<?php
require_once 'config.php';

if (isset($_SESSION['email'])) {
    echo "<h3>Welcome, {$_SESSION['name']}</h3>";
    echo "<p>Email: {$_SESSION['email']}</p>";
    echo "<img src='{$_SESSION['picture']}' width='100'><br><br>";
    echo "<a href='logout.php'>Logout</a>";
    exit();
}

$login_url = $client->createAuthUrl();
//echo $login_url; exit; 
?>
<!DOCTYPE html>
<html>
<head>
    <title>Google Login</title>
</head>
<body>
    <h2>Login with Google</h2>
    <a href="<?= htmlspecialchars($login_url) ?>">
        <img src="https://developers.google.com/identity/images/btn_google_signin_dark_normal_web.png" />
    </a>
</body>
</html>