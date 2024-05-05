$(document).ready(function () {
    var conn = new WebSocket('ws://localhost:8080');
    
    // Funktion zum Senden einer Nachricht
    function sendMessage() {
        var message = $("#message").val(); // Text aus dem Textbereich erhalten
        console.log("Message: " + message); 
        var userid = sessionStorage.getItem('userid');
    
        // Senden Sie die Nachricht an Ihren Server
        $.ajax({
            url: '../backend/businesslogic/db/insertMessage.php',
            type: 'POST',
            data: {
                message: message, // Nachricht als 'message' an das Skript senden
            },
            success: function(response) {
                console.log("Message saved successfully: " + response);
            },
            error: function(error) {
                console.log("Error saving message: ", error);
            }
        });
    
        // Senden Sie den Text an Ihren WebSocket-Server
        conn.send(message);
    
        $("#message").val(""); // Eingabefeld leeren, nachdem die Nachricht gesendet wurde
    }

    // Event-Handler für den Klick auf den Senden-Button
    $("#send-button").click(function() {
        sendMessage(); // Nachricht senden, wenn der Button geklickt wird
    });

    // Event-Handler für die WebSocket-Verbindung
    conn.onopen = function(e) {
        console.log("Connection established!"); // Log, wenn die Verbindung hergestellt wurde
    };

    conn.onmessage = function(e) {
        console.log('Server: ' + e.data);
        // Nachrichten des Servers in der Webanwendung anzeigen
        $('#messages').append('<p>' + e.data + '</p>');
    };
});
