/*global $*/
$(document).ready(function() {
    $("#postComment").click(function(e) {
        e.preventDefault();
        var myobj = { FirstName: $("#firstName").val(), LastName: $("#lastName").val(), PhoneNumber: $("#phoneNumber").val() };
        var jobj = JSON.stringify(myobj);
        $("#json").text(jobj);

        var url = "comment";
        $.ajax({
            url: url,
            type: "POST",
            data: jobj,
            contentType: "application/json; charset=utf-8",
            success: function(data, textStatus) {
                $("#done").html(textStatus);
            }
        })
    });


    $("#getOneComment").click(function(e) {
        e.preventDefault();
        var URL = "comment?q=" + $("#query").val();
        console.log(URL);
        $.getJSON(URL, function(data) {
            console.log(data);
            var everything = "<div id=\"p1\">";
            for (var comment in data) {
                 com = data[comment];
                everything += " FirstName: " + com.FirstName + ",  LastName: " + com.LastName + ", PhoneNumber: " + com.PhoneNumber;
                everything += "<br></br>"
            }
            everything += "</div>";
            console.log(everything);
            $("#comments").html(everything);
        })
    });
    
    $("#getComments").click(function(e) {
        e.preventDefault();
        
         $.getJSON('comment', function(data) {
            console.log(data);
             var everything = "<div id=\"p1\">";
            for (var comment in data) {
                 com = data[comment];
                everything += " FirstName: " + com.FirstName + ",  LastName: " + com.LastName + ", PhoneNumber: " + com.PhoneNumber;
                everything += "<br></br>"
            }
            everything += "</div>";
            console.log(everything);
            $("#comments").html(everything);
        })
    })
    
    $("#deleteComments").click(function(e) {
        e.preventDefault();
        $.ajax({
            url: url,
            type: "Delete",
            success: function(data, textStatus){
                $("#done").html(textStatus);
            }
        })

    });
    $("#deleteOneComment").click(function(e) {
        e.preventDefault();
        var URL = "comment?q=" + $("#query").val();
        $.ajax({
            url: URL,
            type: "Delete",
            success: function(data, textStatus){
                $("#done").html(textStatus);
            }
        })

    });

});
