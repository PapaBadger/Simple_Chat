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
    console.log("Message: " + text); 
    document.getElementById("message").value = ""; 
}


var conn = new WebSocket('ws://localhost:5500');
conn.onopen = function(e) {
    console.log("Connection established!");
};

conn.onmessage = function(e) {
    console.log(e.data);
};