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
    askUsername();
    insert_username(username);
    document.getElementById('username').innerText = username;
    console.log('Username:', username);
    document.getElementById('send-button').addEventListener('click', replaceEmojis);

    // Add event listener for changing theme
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
