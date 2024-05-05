<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    include 'dbConnect.php';

    //Variablen werden gesetzt
    $comment = $_POST['message'];
    //$userid = $_POST['userid'];

    // SQL statement wird vorbereitet um Daten hinzuzufügen
    $sql = "INSERT INTO messages (comment, userid) 
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