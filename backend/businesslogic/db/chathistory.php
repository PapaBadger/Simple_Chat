<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    include 'dbConnect.php';

    // SQL-Abfrage, um alle Messages und die zugehörigen Usernames abzurufen
    $sql = "SELECT messages.message, user.username
            FROM messages
            JOIN user ON messages.userid = user.userid";

    // Abfrage ausführen
    $result = $conn->query($sql);

    // Ergebnisse sammeln
    $messages = array();
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $messages[] = array(
                "username" => $row["username"],
                "message" => $row["message"]
            );
        }
    }

    // Verbindung schließen
    $conn->close();

    // JSON-Antwort senden
    header('Content-Type: application/json');
    echo json_encode($messages);
}
?>
