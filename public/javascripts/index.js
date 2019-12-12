//jquery login 

$("#Sign-In").click((e) =>{
    console.log("turtle")
    e.preventDefault()
    const email = $("#logEmail").val()
    const password = $("#logPassword").val()
    let arr = {email: email, password: password}
    $.ajax({
        url : '/connectUser',
        type : 'POST', 
        data : JSON.stringify(arr),
        dataType : 'json',
        contentType: 'application/json; charset=utf-8',
        async: true,
        success: function(data, status) {
            console.log(JSON.stringify(data)+ "\n" + status);
            document.location.href = "/user";
        },
        error: function(data, status, error){
            console.log(JSON.stringify(data)+ "\n" + status+"\n"+error);
            $("#errorSignInBox").html(data.responseText)
        }
    });
})