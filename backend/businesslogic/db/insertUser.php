<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    include 'dbConnect.php';

    //Variablen werden gesetzt
    $username = $_POST['username'];

    // SQL statement wird vorbereitet um zu überprüfen, ob der Benutzername bereits vorhanden ist
    $check_sql = "SELECT * FROM user WHERE username = ?";
    $check_stmt = $conn->prepare($check_sql);
    $check_stmt->bind_param("s", $username);
    $check_stmt->execute();
    $check_result = $check_stmt->get_result();

    if ($check_result->num_rows == 0) {
        // Benutzername ist noch nicht vorhanden, füge den neuen Benutzer hinzu

        // SQL statement wird vorbereitet um Daten hinzuzufügen
        $sql = "INSERT INTO user (username) 
                VALUES (?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $username);

        // wird ausgeführt
        if ($stmt->execute()) {
            echo "Benutzer erfolgreich erstellt";
            echo "Benutzername: ", $username;

        } else {
            echo "Fehler beim Einfügen des Benutzers: " . $conn->error;
        }

        // Verbindung schließen
        $stmt->close();
    } else {
        // Benutzername bereits vorhanden
        echo $username;
    }

    // Verbindung schließen
    $check_stmt->close();
    $conn->close();
} else {
    echo "Fehler: Ungültige Anforderungsmethode";
}
?>
