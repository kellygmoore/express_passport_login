$(document).ready(function(){
    console.log("Hey it loads");

    $.ajax({
        type: "GET",
        url: "/user",
        success: function(data){
            console.log(data);


        }
    })
});