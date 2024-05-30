<?php
$servername = "localhost";
$username = "Admin";
$password = "";
$dbname = "simplechat";

// Check if connection is already established
if (!isset($conn) || !($conn instanceof mysqli)) {
    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
        error_log("Connection failed: " . $conn->connect_error); // Log the error to the server logs
        exit("An error occurred while connecting to the database."); // Output a generic error message
    }

    // Set character set to utf8mb4
    if (!$conn->set_charset("utf8mb4")) {
        error_log("Error loading character set utf8mb4: " . $conn->error);
        exit("An error occurred while setting the character set.");
    }
}
?>
