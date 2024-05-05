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
        error_log("Connection failed: " . $conn->connect_error);
        exit("An error occurred while connecting to the database.");
    }

    // Set character set to utf8mb4
    if (!$conn->set_charset("utf8mb4")) {
        error_log("Error loading character set utf8mb4: " . $conn->error);
        exit("An error occurred while setting the character set.");
    }
}

// Use this function to run SQL queries
function query($sql, $types = "", $params = []) {
    global $conn;
    $stmt = $conn->prepare($sql);
    if ($types && $params) {
        $stmt->bind_param($types, ...$params);
    }
    $stmt->execute();
    return $stmt->get_result();
}