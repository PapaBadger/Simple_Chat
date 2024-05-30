//yoinked from memory game assignment and modified
let username = sessionStorage.getItem('username'); // Retrieve username from session storage
let nameColor = sessionStorage.getItem('nameColor'); // Retrieve chat color from session storage
let userid = sessionStorage.getItem('userid');

function askUsername() {
    while (!username || username.trim() === '') {
        username = prompt('Please enter your username to proceed:');
        if (!username || username.trim() === '') {
            alert('Please enter your name to proceed.');
        }
    }
    sessionStorage.setItem('username', username);
    return username;
}

function init() {
    username = askUsername();
    insert_username(username);
    document.getElementById('username').innerText = username;
    console.log('Username:', username);

    document.getElementById('send-button').addEventListener('click', function() {
        replaceEmojis();
        sendMessageToServer();
    });

    document.getElementById("message").addEventListener("keydown", function(event) {
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        replaceEmojis();
        sendMessageToServer();
    }
});

    document.getElementById('username').style.color = nameColor;
    document.getElementById('theme-selector').addEventListener('change', changeTheme);

    // Apply saved theme if available
    let savedTheme = sessionStorage.getItem('theme') || 'dark'; // default to 'dark' if no saved theme
    document.getElementById('theme-finder').value = savedTheme; // Set the dropdown to show the current theme
    changeForPersistedTheme(savedTheme); // Apply the theme
}

document.addEventListener('DOMContentLoaded', init);

// Function to change theme
function changeForPersistedTheme(theme) {
    document.body.classList.remove('light', 'dark', 'red', 'sakura', 'blue'); // Clean all theme classes
    document.body.classList.add(theme); // Set selected theme class
    sessionStorage.setItem('theme', theme); // Optionally save theme to session
}

function changeTheme() {
    let theme = document.getElementById('theme-selector').value;
    changeForPersistedTheme(theme);
}

function insert_username(username) {
    // Your AJAX call to insert username into database
}

// -------------- Emoji Replacement

function replaceEmojis() {
    const emojiMap = {
        ':)': '😊',
        'XD': '😆',
        ':(': '😢',
        ':P': '😜',
        ';)': '😉'
    };

    let inputText = document.getElementById('message').value;
    let username = document.getElementById('username').textContent;

   
    for (let text in emojiMap) {
        let regex = new RegExp(escapeRegExp(text), 'g');
        inputText = inputText.replace(regex, emojiMap[text]);
    }

    document.getElementById('output').innerHTML += '<p>' + username + ': ' + inputText + '</p>';

/////////////////////////////////////////AJAX CALLS FOR DB (START)/////////////////////////////////////////

// AJAX-Aufruf, um den Benutzernamen einzufügen
$.ajax({
    url: '../backend/businesslogic/db/insertUser.php',
    type: 'POST',
    data: {
        username: username
    },
    success: function(response) {
        console.log('User Data:', response); // Anzeigen der Benutzer-ID in der Konsole
        // Fügen Sie hier ggf. weitere Aktionen hinzu
    },
    error: function(xhr, status, error) {
        console.error('Error inserting user:', error);
    }
});
// AJAX-Aufruf, um die Userid zubekommen / zum Debuggen
$.ajax({
    url: '../backend/businesslogic/db/fetchuserid.php',
    type: 'POST',
    data: {
        username: username,
        userid: userid
    },
    success: function(response) {
        console.log('User ID:', response); // Anzeigen der Benutzer-ID in der Konsole
        // Fügen Sie hier ggf. weitere Aktionen hinzu
    },
    error: function(xhr, status, error) {
        console.error('Error inserting user:', error);
    }
});

// AJAX-Aufruf, um die Nachricht einzufügen
$.ajax({
    url: '../backend/businesslogic/db/insertMessage.php',
    type: 'POST',
    data: {
        message: inputText,
        username: username
    },
    success: function(response) {
        console.log('Message sent successfully:', response);
        // Hier können Sie weitere Aktionen ausführen, wenn die Nachricht erfolgreich eingefügt wurde
    },
    error: function(xhr, status, error) {
        console.error('Error sending message:', error);
    }
});

/////////////////////////////////////////AJAX CALLS FOR DB (END)/////////////////////////////////////////


    
    sendMessageToServer();
    document.getElementById('message').value = '';
}

function escapeRegExp(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

// Function to open settings popup
function openSettings() {
    document.getElementById('settings-popup').style.display = 'block';
}

// Function to close settings popup
function closeSettings() {
    document.getElementById('settings-popup').style.display = 'none';
}

// Function to save settings (nickname and username color)
function saveSettings() {
    var newNickname = newNickname;
    var nameColor = document.getElementById('chat-color').value;
    
    // Implement logic to save the new nickname and chat color
    // For demonstration, just update the display with the new values
    document.getElementById('username').textContent = newNickname;
    document.getElementById('username').style.color = nameColor; // Set the color of the username
    
    // Update the username in the database
    insert_username(newNickname);
    // Update the username in session storage
    sessionStorage.setItem('username', newNickname); // Store the username in session storage
    //update username color in session storage
    sessionStorage.setItem('nameColor', nameColor);

    console.log('Name Color:', nameColor);

    // Display the name change message in the chatroom
    var message = username + ' changed their name to ' + newNickname;
    document.getElementById('output').innerHTML = message;
    
    // Log the name change message to the console
    console.log(message);
    
    // Close the settings popup
    closeSettings();
}

// Call sendMessageToServer when the Enter key is pressed in the message input field
$('#message').keypress(function(e) {
    if (e.which == 13) { // 13 is the ASCII code for the Enter key
        e.preventDefault(); // Prevent the default action (submitting the form)
        sendMessageToServer();
    }
});

function sendMessage() {
    var container = document.getElementById('chat-container');
    var input = document.getElementById('message-input');
    var newMessage = document.createElement('div');
    newMessage.className = 'message';
    newMessage.textContent = input.value;
    container.appendChild(newMessage);
    input.value = ''; // Clear input after sending
    container.scrollTop = container.scrollHeight; // Scroll to the latest message
}