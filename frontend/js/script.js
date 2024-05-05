//yoinked from memory game assignment and modified
let username = sessionStorage.getItem('username'); // Retrieve username from session storage

function askUsername() {
  while (!username || username.trim() === '') {
      username = prompt('Please enter your username to proceed:'); // Ask the user for their username
      if (!username || username.trim() === '') {
          alert('Please enter your name to proceed.'); // Display error message if username is empty
      }
  }
  sessionStorage.setItem('username', username); // Store the username in session storage
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
  // Implement your logic to handle changing the theme
  console.log("Change theme");
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

// -------------- Emoji Replacment

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


//----Dropdown

// Function to open settings popup
function openSettings() {
    document.getElementById('settings-popup').style.display = 'block';
}

// Function to close settings popup
function closeSettings() {
    document.getElementById('settings-popup').style.display = 'none';
}

// Function to save settings (nickname and chat color)
function saveSettings() {
    var newNickname = document.getElementById('new-nickname').value;
    var chatColor = document.getElementById('chat-color').value;
    
    // Implement logic to save the new nickname and chat color
    // For demonstration, just update the display with the new values
    document.getElementById('username').textContent = newNickname;
    document.getElementById('output').style.color = chatColor;
    
    // Update the username in the database
    insert_username(newNickname);
    
    // Display the name change message in the chatroom
    var message = username + ' changed their name to ' + newNickname;
    document.getElementById('output').innerHTML = message;
    
    // Log the name change message to the console
    console.log(message);
    
    // Close the settings popup
    closeSettings();
}
