<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    include 'dbConnect.php';

    //Variablen werden gesetzt
    $username = $_POST['username']; // Hier verwenden wir den POST-Parameter 'username'

    // SQL-Abfrage, um die userid basierend auf dem username abzurufen
    $sql = "SELECT userid FROM user WHERE username = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $username); // Binden des Parameters

    // wird ausgeführt
    if ($stmt->execute()) {
        $result = $stmt->get_result();
        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $userid = $row['userid'];
            $_SESSION['userid'] = $userid;
            // Speichern der userid in der Variable $userid
        } else {
            echo "No user found with username: " . $username;
        }
    } else {
        echo "Error executing query: " . $conn->error;
    }

    // Connection schließen
    $stmt->close();
    $conn->close();

    // Rückgabe der userid (wenn gefunden)
    if(isset($userid)) {
        echo $userid;
    }
} else {
    echo "Error: Invalid request method";
}
?>
