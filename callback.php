<?php
session_start(); // Start the session

require_once 'config.php';
require_once 'db.php';

if (isset($_GET['code'])) {
    $token = $client->fetchAccessTokenWithAuthCode($_GET['code']);
    $client->setAccessToken($token['access_token']);

    $google_oauth = new Google_Service_Oauth2($client);
    $google_account_info = $google_oauth->userinfo->get();

    $_SESSION['name'] = $google_account_info->name;
    $_SESSION['email'] = $google_account_info->email;
    $_SESSION['picture'] = $google_account_info->picture;



    $name = $google_account_info->name;
    $email         = mysqli_real_escape_string($conn, $google_account_info->email);
    $social_login  = 1; // 1 = social login
    $login_type    = 'google';
    $created_at    = date('Y-m-d H:i:s');

    // Check if user already exists
    $checkSql = "SELECT id FROM user WHERE email = '$email'";
    $checkResult = mysqli_query($conn, $checkSql);

    if (mysqli_num_rows($checkResult) == 0) {
        // User doesn't exist, insert
        $sql = "INSERT INTO user (name, email, social_login, login_type, created_at)
                VALUES ('$name','$email', '$social_login', '$login_type', '$created_at')";

        if (mysqli_query($conn, $sql)) {
           // echo " User inserted successfully.";

            $lastInsertedId = mysqli_insert_id($conn);

            $businessType = $_SESSION['businessType']  ?? '';
            $websiteName = $_SESSION['websiteName'] ?? '';
            $websiteDescription = $_SESSION['websiteDescription'] ?? '';
            $websiteType = $_SESSION['websiteType'] ?? '';



             $sql = "INSERT INTO website (user_id, website_name, website_description, website_type, business_type, created_at)
                VALUES ('$lastInsertedId', '$websiteName', '$websiteDescription', '$websiteType', '$businessType', '$created_at')";

                if (mysqli_query($conn, $sql)) {

                    echo " Website inserted successfully.";
                }else{
                     echo " Error: " . mysqli_error($conn); 
                }

        } else {
            echo " Error: " . mysqli_error($conn);
        }
    } else {
        echo "User already exists.";
    }



    header('Location: index.php');
    exit();
}
?>