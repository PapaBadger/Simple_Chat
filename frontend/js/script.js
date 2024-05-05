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

document.addEventListener('DOMContentLoaded', init);
document.getElementById('usernameInput').addEventListener('input', function() {
    sessionStorage.setItem('username', this.value);
    console.log('Username updated:', this.value);
});

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
        data: { name: username },
        success: function() {
            //debug
            console.log('Name saved successfully' + username);
        },
        error: function(error) {
            console.error('Error saving name:', error);
        }
    });
}
