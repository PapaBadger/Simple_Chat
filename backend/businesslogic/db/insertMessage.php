<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    include 'dbConnect.php';

    // Überprüfen, ob der Benutzer angemeldet ist
        // Variablen setzen
        $message = $_POST['message'];
        $userid = $_SESSION['userid']; // Benutzer-ID aus der Session holen

        // SQL-Statement vorbereiten
        $sql = "INSERT INTO messages (message, userid) VALUES (?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("si", $message, $userid);

        // Ausführen der SQL-Abfrage
        if ($stmt->execute()) {
            echo "Message inserted successfully";
        } else {
            echo "Error inserting message: " . $conn->error;
        }

        // Statement und Verbindung schließen
        $stmt->close();
        $conn->close();
}
?>
