//yoinked from memory game assignment and modified
let username = sessionStorage.getItem('username'); // Retrieve username from session storage

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
    askUsername(); // Ask the user for their username if not already set
    insert_username(username); // Insert the username into the database
    document.getElementById('username').innerText = username; // Update the username in the HTML document
    console.log('Username:', username); // Log the username to the console
    // Add event listener for the send button
    document.getElementById('send-button').addEventListener('click',replaceEmojis); 
}

// Function to show settings dropdown
function showSettings() {
  // Implement your logic to handle showing the settings dropdown
  console.log("Show settings dropdown");
}

// Function to change theme
function changeTheme() {
    let selectedTheme = document.getElementById('theme-selector').value;
    // Implement logic to change theme based on selectedTheme
    document.body.style.backgroundColor = selectedTheme;
}

document.addEventListener('DOMContentLoaded', init);

// Function to show settings dropdown
function showSettings() {
  // Implement your logic to handle showing the settings dropdown
  console.log("Show settings dropdown");
}

// Function to change theme
function changeTheme() {
  // Implement your logic to handle changing the theme
  console.log("Change theme");
}

function insert_username(username){
    $.ajax({
        url: '../backend/businesslogic/db/insertUser.php',
        method: 'POST',
        data: { username: username },
        success: function() {
            //debug
            console.log('Name saved successfully' + username);
        },
        error: function(error) {
            console.error('Error saving name:', error);
        }
    });
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
    let newNickname = document.getElementById('new-nickname').value;
    let chatColor = document.getElementById('chat-color').value;

    document.getElementById('username').textContent = newNickname;
    document.getElementById('output').style.color = chatColor;

    insert_username(newNickname);

    let message = username + ' changed their name to ' + newNickname;
    document.getElementById('output').innerHTML = message;

    console.log(message);

    closeSettings();
}
