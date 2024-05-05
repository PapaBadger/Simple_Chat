<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    //Variablen werden gesetzt
    $comment = $_POST['comment'];
    $userid = $_POST['userid'];

    // DB connection
    $servername = "localhost";
    $username = "Admin";
    $password = "";
    $database = "simplechat";

    // Create connection
    $conn = new mysqli($servername, $username, $password, $database);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // SQL statement wird vorbereitet um Daten hinzuzufügen
    $sql = "INSERT INTO comments (comment, userid) 
            VALUES (?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("si", $comment, $userid);

    // wird ausgeführt
    if ($stmt->execute()) {
        echo "Comment inserted successfully";

    } else {
        echo "Error inserting appointment: " . $conn->error;
    }

    //Connection geclosed
    $stmt->close();
    $conn->close();
} else {
    echo "Error: Invalid request method";
}
?>
