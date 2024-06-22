$(document).ready(function () {
    var conn = new WebSocket('ws://localhost:8080');
    //var conn = new WebSocket('ws://192.168.56.1:8080');

    conn.onopen = function(e) {
        console.log('Connection established!');
        var username = $('#username').text();
        console.log('Username: ', username); // Add this line
        console.log('Calling chathistory...');
        chathistory();

        // Send a 'newUser' message right after the connection is established
        conn.send(JSON.stringify({
            type: 'newUser',
            username: username
        }));
    };

    // Message sending function
    window.sendMessageToServer=function() {
        var text = $('#message').val();
        var username = $('#username').text();
        
        if (text !== '') {
            var type = 'chat';
            var target = null;
    
            // Check if the message starts with "@username"
            var match = text.match(/^@(\w+)\s(.*)/);
            if (match) {
                type = 'whisper';
                target = match[1]; // The mentioned username
                text = match[2]; // The rest of the message
            }
    
            var message = {
                type: type,
                username: username,
                text: text,
                target: target // The target user for 'whisper' messages
            };
    
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
    
            $('#message').val(''); 
        }
    }

    $('#send-button').click(function() {
        sendMessageToServer();
    });

    $('#message').keypress(function(e) {
        if (e.which == 13) { // 13 is the ASCII code for the Enter key
            e.preventDefault(); // Prevent the default action (submitting the form)
            sendMessageToServer();
        }
    });

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
            console.log('Parsed message: ', message);
    
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
            }else if (message.type === 'whisper') {
                var sanitizedUsername = $("<div>").text(message.username).html();
                var sanitizedText = $("<div>").text(message.text).html();
                var sanitizedTarget = $("<div>").text(message.target).html();
            
                // Retrieve the current username within the function
                var currentUsername = $('#username').text();
                console.log('Received whisper from', sanitizedUsername, 'to', sanitizedTarget, 'current username is', currentUsername);
            
                if (sanitizedTarget === currentUsername) {
                    $('#output').append('<p><strong>' + sanitizedUsername + ' (whisper):</strong> ' + sanitizedText + '</p>');
                }
            }
        } catch (error) {
            console.log("Error parsing message: ", error);
        }
    };  
});

function chathistory() {
    $.ajax({
        url: '../backend/businesslogic/db/chathistory.php',
        type: 'POST',
        dataType: 'json',
        success: function(response) {
            console.log('User Data:', response);
    
            let userList = $('#userList'); 
            userList.empty(); // Vorherige Inhalte löschen
    
            // Iteriere über jedes Objekt in der response
            response.forEach(function(item) {
                $('#output').append('<p><strong>' + item.username + ':</strong> ' + item.message + '</p>');
                console.log("Der Benutzername: ", item.username); 
            });
        },
        error: function(xhr, status, error) {
            console.error('Fehler beim Abrufen der Benutzerdaten:', error);
        }
    });
    
}


