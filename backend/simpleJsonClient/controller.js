$(document).ready(function () {
    $(".send-button").click(function() {
        submitComment();
    });
});

function checkForEnter(event) {
    if (event.keyCode === 13) { 
      event.preventDefault(); 
      submitComment(); 
    }
}

function submitComment() {
    var text = document.getElementById("message").value;
    console.log("Comment: " + text); 
    document.getElementById("message").value = ""; 
}

fetch('../backend/businesslogic/db/testConnection.php')
    .then(response => response.text())
    .then(data => console.log(data))
    .catch((error) => {
      console.error('Error:', error);
    });