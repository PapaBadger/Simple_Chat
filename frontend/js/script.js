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
    document.getElementById('username').innerText = username;
    console.log('Username:', username);

    // AJAX CALLS FOR DB (START)
    $.ajax({
        url: '../backend/businesslogic/db/insertUser.php',
        type: 'POST',
        data: {
            username: username
        },
        success: function(response) {
            console.log('User Data:', response); // Anzeigen der Benutzer-ID in der Konsole
        },
        error: function(xhr, status, error) {
            console.error('Error inserting user:', error);
        }
    });
    // AJAX CALLS FOR DB (END)

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
    document.getElementById('theme-selector').value = savedTheme; // Set the dropdown to show the current theme
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

// -------------- Emoji Replacement

function replaceEmojis() {
    const emojiMap = {
        ':)': '😊',
        'XD': '😆',
        ':(': '😢',
        ':P': '😜',
        ';)': '😉',
        ':D': '😄',
        'B)': '😎',
        ':O': '😲',
        ';*': '😘',
        '<3': '❤️',
        ':|': '😐',
        ':/': '😕',
        ':*': '😗',
        'O:)': '😇',
        ':poop:': '💩',
        ':fire:': '🔥',
        ':100:': '💯',
        ':clap:': '👏',
        ':pray:': '🙏',
        ':heart-eyes:': '😍',
        ':handshake:': '🤝',
        ':gay-pride:': '🏳️‍🌈',
        ':thumbs-up': '👍',
        ':thumbs-down': '👎',
        ':nails': '💅',
        ':muscle': '💪'
    };

    let inputText = document.getElementById('message').value;
    let username = document.getElementById('username').textContent;

    for (let text in emojiMap) {
        let regex = new RegExp(escapeRegExp(text), 'g');
        inputText = inputText.replace(regex, emojiMap[text]);
    }

    document.getElementById('output').innerHTML += '<p>' + username + ': ' + inputText + '</p>';

    // AJAX CALLS FOR DB (START)
    $.ajax({
        url: '../backend/businesslogic/db/fetchuserid.php',
        type: 'POST',
        data: {
            username: username,
            userid: userid
        },
        success: function(response) {
            console.log('User ID:', response); // Anzeigen der Benutzer-ID in der Konsole
        },
        error: function(xhr, status, error) {
            console.error('Error inserting user:', error);
        }
    });

    $.ajax({
        url: '../backend/businesslogic/db/insertMessage.php',
        type: 'POST',
        data: {
            message: inputText,
            username: username
        },
        success: function(response) {
            console.log('Message sent successfully:', response);
        },
        error: function(xhr, status, error) {
            console.error('Error sending message:', error);
        }
    });
    // AJAX CALLS FOR DB (END)

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
    // Capture the new nickname and text color values from the form
    var newNickname = document.getElementById('new-nickname').value;
    var newColor = document.getElementById('chat-color').value;
    var selectedTheme = document.getElementById('theme-selector').value;
    
    if (newNickname.trim() !== '' && newNickname !== username) {
        // Update the username in session storage and on the UI
        sessionStorage.setItem('username', newNickname);
        username = newNickname;
        document.getElementById('username').innerText = newNickname;

        // Display the name change message in the chatroom
        document.getElementById('output').innerHTML += `<p>${username} changed their name to ${newNickname}</p>`;
        console.log(`${username} changed their name to ${newNickname}`);

        // AJAX call to update the username in the database
        $.ajax({
            url: '../backend/businesslogic/db/updateUsername.php',
            type: 'POST',
            data: {
                oldUsername: sessionStorage.getItem('username'),
                newUsername: newNickname
            },
            success: function(response) {
                console.log('Username updated:', response);
            },
            error: function(xhr, status, error) {
                console.error('Error updating username:', error);
            }
        });
    }

    if (newNameColor !== nameColor) {
        // Update the username color in session storage and on the UI
        sessionStorage.setItem('nameColor', newNameColor);
        nameColor = newNameColor;
        document.getElementById('username').style.color = newNameColor;

        // Display the color change message in the chatroom
        document.getElementById('output').innerHTML += `<p>${username} changed their name color</p>`;
        console.log(`${username} changed their name color`);
    }

    let theme = document.getElementById('theme-selector').value;
    if (theme !== sessionStorage.getItem('theme')) {
        // Update theme in session storage
        sessionStorage.setItem('theme', theme);
        changeForPersistedTheme(theme);
    }

    // Close the settings popup
    closeSettings();
}

function closeSettings() {
    // Hide the settings popup
    document.getElementById('settings-popup').style.display = 'none';
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
