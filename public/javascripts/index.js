//jquery login 
$("#Sign-In").click((e) =>{
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
            Cookies.set('user', JSON.stringify(data))
            document.location.href = "/user";
        },
        error: function(data, status, error){
            $("#errorSignInBox").html(data.responseText)
        }
    });
})
$("#register").click((e) =>{
    e.preventDefault()
    const email = $("#registerEmail").val()
    const password = $("#registerPassword").val()
    const checkPassword = $("#registerCheckPassword").val()
    if(password != checkPassword)
    {
        $("#errorRegisterBox").html("Passwords must be identical")
    }
    else
    {
        let arr = {email: email, password: password}
        $.ajax({
            url : '/addUser',
            type : 'POST', 
            data : JSON.stringify(arr),
            dataType : 'json',
            contentType: 'application/json; charset=utf-8',
            async: true,
            success: function(data) {
                Cookies.set('user', JSON.stringify(data))
                document.location.href = "/user";
            },
            error: function(data){
                $("#errorRegisterBox").html(data.responseText)
            }
        });
    }
    
})