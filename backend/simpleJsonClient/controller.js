$(document).ready(function () {
    var conn = new WebSocket('ws://localhost:8080');
    function sendMessage() {
        var text = $("#message").val();
        console.log("Message: " + text); 
    
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
        conn.send(text);
    
        $("#message").val(""); 
    }

    $(".send-button").click(function() {
        sendMessage();
    });

    conn.onopen = function(e) {
        console.log("Connection established!");
    };
    conn.onmessage = function(e) {
        console.log('Server: ' + e.data);
        // Display the message in your web page
        $('#messages').append('<p>' + e.data + '</p>');
    };

    
});


