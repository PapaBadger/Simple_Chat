$(document).ready(function () {
    $("#searchResult").hide();
    $("#btn_Search").click(function (e) {
        var searchterm = $("#seachfield").val();
        if (searchterm) {
            loaddata(searchterm);
        } else {
            alert("Please enter a search term");
        }
    });
});

function loaddata(searchterm) {
    $.ajax({
        type: "GET",
        url: "../serviceHandler.php",
        cache: false,
        data: {method: "queryPersonByName", param: searchterm},
        dataType: "json",
        success: function (response) {
            $("#noOfentries").val(response.length);
            $("#searchResult").show(1000).delay(1000).hide(1000);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error(textStatus, errorThrown);
        }
    });
}