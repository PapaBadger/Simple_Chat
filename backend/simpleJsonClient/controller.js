$(document).ready(function () {
    var conn = new WebSocket('ws://localhost:8080');
    function sendMessage() {
        var text = $("#message").val();
    var username = $("#username").val(); // Replace "#username" with the actual ID of your username input field

    console.log("Message: " + text); 

    // Send the text to your server
    var message = {
        type: 'chat',
        username: username,
        text: text
    };
    
        // Senden Sie den Text an Ihren Server
        $.ajax({
            url: '../backend/businesslogic/db/insertMessage.php',
            type: 'POST',
            data: {
                comment: text
            },
            success: function(response) {
                console.log("Message saved successfully:" + text);
            },
            error: function(error) {
                console.log("Error saving comment: ", error);
            }
        });
    
        // Send the text to your server
        conn.send(JSON.stringify(message));
    
        $("#message").val(""); 
    }

    $(".send-button").click(function() {
        sendMessage();
    });

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


