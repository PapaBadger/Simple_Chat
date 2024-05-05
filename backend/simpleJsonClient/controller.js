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

    // Senden Sie den Text an Ihren Server
    $.ajax({
        url: '/path/to/your/server/endpoint', // Ersetzen Sie dies durch Ihren Server-Endpunkt
        type: 'POST',
        data: {
            comment: text
        },
        success: function(response) {
            console.log("Comment saved successfully");
        },
        error: function(error) {
            console.log("Error saving comment: ", error);
        }
    });

    document.getElementById("message").value = ""; 
}

fetch('../backend/businesslogic/db/testConnection.php')
    .then(response => response.text())
    .then(data => console.log(data))
    .catch((error) => {
      console.error('Error:', error);
    });