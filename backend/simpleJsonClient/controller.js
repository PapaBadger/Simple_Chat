$(document).ready(function () {
    var conn = new WebSocket('ws://localhost:8080');
    //var conn = new WebSocket('ws://192.168.56.1:8080');

    conn.onopen = function(e) {
        console.log('Connection established!');
    
        // Send a 'newUser' message when the connection is established
        var username = $('#username').val();
        conn.send(JSON.stringify({
            type: 'newUser',
            username: username
        }));
    };
    //$('#username').val('DefaultUsername').change();

    // Funktion zum Senden einer Nachricht
    window.sendMessageToServer=function() {
        var text = $('#message').val();
        var username = $('#username').text();
        
        console.log('Username: ', username); // Add this line
        console.log('Text: ', text); // Add this line

        if (text !== '') {
            var message = {
                type: 'chat',
                username: username,
                text: text
            };
            
            console.log('Message: ', message); // Add this line

            // Send the message to your server with WebSocket
            if (conn.readyState === WebSocket.OPEN) {
                conn.send(JSON.stringify(message));
            } else {
                console.error('WebSocket connection is not open');
            }
    
            // Append the message to the chat window
            var sanitizedUsername = $("<div>").text(username).html();
            var sanitizedText = $("<div>").text(text).html();
            $('#messages').append('<p><strong>' + sanitizedUsername + ':</strong> ' + sanitizedText + '</p>');
    
            $('#message').val(''); // Clear input after sending
        }
    }

    // Call sendMessageToServer when the Send button is clicked
    $('#send-button').click(function() {
        sendMessageToServer();
    });

    // Call sendMessageToServer when the Enter key is pressed in the message input field
    $('#message').keypress(function(e) {
        if (e.which == 13) { // 13 is the ASCII code for the Enter key
            e.preventDefault(); // Prevent the default action (submitting the form)
            sendMessageToServer();
        }
    });

    // Client side code
    $('#username').change(function() {
        var username = $(this).val();
        console.log('Setting username to', username);
        conn.send(JSON.stringify({
            type: 'newUser',
            username: username
        }));
    });
    
    function addUserToList(username) {
        var currentUsername = $('#username').val();
    
        // Add the new user to the user list, but only if their username is not the same as the current user's username
        if (username !== currentUsername && $('#users li:contains(' + username + ')').length === 0) {
            $('#users').append('<li class="list-item">' + username + '</li>');
        }
    }
    
    conn.onmessage = function(e) {
        console.log('Server: ' + e.data);
        try {
            var message = JSON.parse(e.data);
    
            if (message.type === 'userList') {
                message.users.forEach(function(user) {
                    addUserToList(user);
                });
            } else if (message.type === 'chat') {
                var sanitizedUsername = $("<div>").text(message.username).html();
                var sanitizedText = $("<div>").text(message.text).html();
    
                // Retrieve the current username within the function
                var currentUsername = $('#username').text();
                console.log('Received message from', sanitizedUsername, 'current username is', currentUsername);
    
                if (sanitizedUsername !== currentUsername) {
                    $('#output').append('<p><strong>' + sanitizedUsername + ':</strong> ' + sanitizedText + '</p>');
                }
            }
        } catch (error) {
            console.log("Error parsing message: ", error);
        }
    };

  
});
