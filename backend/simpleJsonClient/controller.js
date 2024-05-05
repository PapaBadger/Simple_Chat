$(document).ready(function () {
    var conn = new WebSocket('ws://localhost:8080');
    
    // Funktion zum Senden einer Nachricht
    function sendMessage() {
        var text = $('#message').val(); // Replace 'your-input-field-id' with the actual ID of your input field
        conn.send(JSON.stringify({
            type: 'message',
            text: text,
            username: username
        }));

    console.log("Message: " + message); 
    

    // Send the text to your server
    var message = {
        type: 'chat',
        username: username,
        text: text
    };
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
    
        // Send the text to your server
        conn.send(JSON.stringify(message));
    
        $("#message").val(""); // Eingabefeld leeren, nachdem die Nachricht gesendet wurde
    }

    // Event-Handler für den Klick auf den Senden-Button
    $("#send-button").click(function() {
        sendMessage(); // Nachricht senden, wenn der Button geklickt wird
    });

    // Event-Handler für die WebSocket-Verbindung
    conn.onopen = function(e) {
        console.log("Connection established!", e);
    };


    conn.onmessage = function(e) {
        console.log('Server: ' + e.data);
        try {
            var startIndex = e.data.indexOf('{');
            var jsonString = e.data.slice(startIndex);
            console.log('Extracted JSON string:', jsonString);
            var message = JSON.parse(jsonString);
            if (message.type === 'chat') {
                $('#messages').append('<p><strong>' + message.username + ':</strong> ' + message.text + '</p>');
            } else if (message.type === 'notification') {
                $('#messages').append('<p class="notification">' + message.text + '</p>');
            }
        } catch (error) {
            console.log("Error parsing message: ", error);
        }
    
};

    
});
