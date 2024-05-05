<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    include 'dbConnect.php';

    //Variablen werden gesetzt
    $username = $_POST['username'];

    // SQL statement wird vorbereitet um Daten hinzuzufügen
    $sql = "INSERT INTO user (username) 
            VALUES (?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $username);

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
