//yoinked from memory game assignment and modified
let username = sessionStorage.getItem('username'); // Retrieve username from session storage

function askUsername() {
    if (!username) {
        username = prompt('Enter your username:'); // Ask the user for their username
        sessionStorage.setItem('username', username); // Store the username in session storage
    }
}

function init() {
    askUsername(); // Ask the user for their username if not already set
    document.getElementById('username').innerText = username; // Update the username in the HTML document
}

document.addEventListener('DOMContentLoaded', init);
document.getElementById('usernameInput').addEventListener('input', function() {
    sessionStorage.setItem('username', this.value);
    console.log('Username updated:', this.value);
});

//Settings

