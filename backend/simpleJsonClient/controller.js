$(document).ready(function () {
    $("#messagebutton").click(function() {
        sendMessage();
    });

    var conn = new WebSocket('ws://localhost:5500');
    conn.onopen = function(e) {
        console.log("Connection established!");
    };


});

function sendMessage() {
    var text = $("#message").val();
    console.log("Message: " + text); 

    // Senden Sie den Text an Ihren Server
    $.ajax({
        url: '../backend/businesslogic/db/insertMessage.php',
        type: 'POST',
        data: {
            comment: text
        },
        success: function(response) {
            console.log("Comment saved successfully:" + text);
        },
        error: function(error) {
            console.log("Error saving comment: ", error);
        }
    });

    $("#message").val(""); 
}
