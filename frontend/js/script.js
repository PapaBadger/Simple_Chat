//yoinked from memory game assignment and modified
let username = sessionStorage.getItem('username'); // Retrieve username from session storage
let nameColor = sessionStorage.getItem('nameColor'); // Retrieve chat color from session storage


function askUsername() {
    while (!username || username.trim() === '') {
        username = prompt('Please enter your username to proceed:');
        if (!username || username.trim() === '') {
            alert('Please enter your name to proceed.');
        }
    }
    sessionStorage.setItem('username', username);
}

function init() {
    askUsername();
    insert_username(username);
    document.getElementById('username').innerText = username;
    console.log('Username:', username);
    document.getElementById('send-button').addEventListener('click', replaceEmojis);
    document.getElementById("message").addEventListener("keydown", function(event) {
        if (event.key === "Enter" && !event.shiftKey) { // Enter key without Shift
            event.preventDefault(); // Prevent the default action of Enter key
            document.getElementById("send-button").click(); // Trigger the click event of the send button
        }
    });
    // Add event listener for changing theme
    document.getElementById('username').style.color = nameColor; // Set the color of the username
    document.getElementById('theme-selector').addEventListener('change', changeTheme);
}

// Function to change theme
function changeTheme() {
    let selectedTheme = document.getElementById('theme-selector').value;
    // Implement logic to change theme based on selectedTheme
    document.body.style.backgroundColor = selectedTheme;
}

document.addEventListener('DOMContentLoaded', init);

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
    for (let text in emojiMap) {
        let regex = new RegExp(escapeRegExp(text), 'g');
        inputText = inputText.replace(regex, emojiMap[text]);
    }
    document.getElementById('output').innerHTML = inputText;
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
    var newNickname = document.getElementById('new-nickname').value;
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