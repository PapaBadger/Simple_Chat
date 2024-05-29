$(document).ready(function () {
    var conn = new WebSocket('ws://localhost:8080');
    //var conn = new WebSocket('ws://192.168.56.1:8080');
    
    // Funktion zum Senden einer Nachricht
    function sendMessage() {
        var text = $('#message').val();
        var username = $('#username').text();
    
        if (text !== '') {
            var message = {
                type: 'chat',
                username: username,
                text: text
            };
    
            // Send the message to your server with AJAX
            $.ajax({
                url: '../backend/businesslogic/db/insertMessage.php',
                type: 'POST',
                data: {
                   // message: message, // Send the message as 'message' to the script
                },
                // ...
            });
    
            // Send the message to your server with WebSocket
            conn.send(JSON.stringify(message));
    
            // Append the message to the chat window
            var sanitizedUsername = $("<div>").text(username).html();
            var sanitizedText = $("<div>").text(text).html();
            $('#messages').append('<p><strong>' + sanitizedUsername + ':</strong> ' + sanitizedText + '</p>');
    
            $('#message').val(''); // Clear input after sending
        }
    }
    
    conn.onmessage = function(e) {
        console.log('Server: ' + e.data);
        try {
            var message = JSON.parse(e.data);
            var currentUsername = $('#username').text();
    
            // Only append the message if it's not from the current user
            if (message.username !== currentUsername) {
                if (message.type === 'chat') {
                    var sanitizedUsername = $("<div>").text(message.username).html();
                    var sanitizedText = $("<div>").text(message.text).html();
                    $('#messages').append('<p><strong>' + sanitizedUsername + ':</strong> ' + sanitizedText + '</p>');
                } else if (message.type === 'notification') {
                    var sanitizedText = $("<div>").text(message.text).html();
                    $('#messages').append('<p class="notification">' + sanitizedText + '</p>');
                }
            }
        } catch (error) {
            console.log("Error parsing message: ", error);
        }
    };

    
});
