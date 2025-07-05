<?php
session_start(); // Start the session

require_once 'config.php';
require_once 'db.php';


if ($_SERVER['REQUEST_METHOD'] == 'POST') {

	$businessType = $_POST['businessType'];
	$websiteName = $_POST['websiteName'];
	$websiteDescription = $_POST['websiteDescription'];
	$name = $_POST['name'];
	$phoneNumber = $_POST['phoneNumber'];
	$email = $_POST['email'];
	$password = $_POST['password'];
	$websiteType = $_POST['websiteType'];



    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);	
	$email         = mysqli_real_escape_string($conn, $email);
    //$social_login  = 1; // 1 = social login
    //$login_type    = 'google';
    $created_at    = date('Y-m-d H:i:s');

      
        // User insert
        $sql = "INSERT INTO user (name, email, password, phone, created_at)
                VALUES ('$name', '$email', '$hashedPassword', '$phoneNumber', '$created_at')";

        if (mysqli_query($conn, $sql)) {
            $lastInsertedId = mysqli_insert_id($conn);

             $sql = "INSERT INTO website (user_id, website_name, website_description, website_type, business_type, created_at)
                VALUES ('$lastInsertedId', '$websiteName', '$websiteDescription', '$websiteType', '$businessType', '$created_at')";

                if (mysqli_query($conn, $sql)) {

                	$_SESSION['name']  = $name;
    				$_SESSION['email'] = $email;
                	echo " Website inserted successfully.";
                }else{
                	 echo " Error: " . mysqli_error($conn);	
                }



        } else {
            echo " Error: " . mysqli_error($conn);
        }
    



    header('Location: index.php');
    exit();



    /*echo "<h3>Form Fields and Values:</h3>";
    foreach ($_POST as $field => $value) {
        echo htmlspecialchars($field) . ' : ' . htmlspecialchars($value) . '<br>';*/
    
}
?>
