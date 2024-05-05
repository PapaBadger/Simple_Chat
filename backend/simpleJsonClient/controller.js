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
    $("#message").val(""); 
}
