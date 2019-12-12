if(Cookies.get('user'))
{
    const user = Cookies.getJSON('user')
    console.log(user)

    $('#email').val(user.user.email)
    $('#password').val(user.user.password)
    console.log(Cookies.get("modifUser"))
    if(Cookies.get("modifUser"))
    {
        $("#modifUserBox").html("Your account was updated")
        $("#modifUserBox").fadeIn( 1000 ).delay(2000).fadeOut( 1000 );
        Cookies.remove("modifUser")
    }
}
else
{
    if(Cookies.get("modifUser"))
        Cookies.remove("modifUser")
    document.location.href('/')
}

$("#changeEmail").click((e) =>{

    e.preventDefault()
    const email = $("#email").val()
    userCookie = Cookies.getJSON("user")
    if (email != "" && email != userCookie.user.email)
    {
        let arr = {id: userCookie.user.id, email: email, password: userCookie.user.password }
        $.ajax({
            url : '/upUser',
            type : 'POST', 
            data : JSON.stringify(arr),
            dataType : 'json',
            contentType: 'application/json; charset=utf-8',
            async: true,
            success: function(data) {
                Cookies.set('user', JSON.stringify(data))
                Cookies.set("modifUser", true)
                document.location.reload();
            },
            error: function(data){
                $("#errorUserBox").html(data.responseText)
                if(Cookies.get("modifUser"))
                    Cookies.remove("modifUser")
            }
        })
        
            
    }

})
$("#changePassword").click((e) =>{

    e.preventDefault()
    const password = $("#password").val()
    userCookie = Cookies.getJSON("user")
    if (password != "" && password != userCookie.user.password)
    {
        let arr = {id: userCookie.user.id, email: userCookie.user.email, password: password }
        $.ajax({
            url : '/upUser',
            type : 'POST', 
            data : JSON.stringify(arr),
            dataType : 'json',
            contentType: 'application/json; charset=utf-8',
            async: true,
            success: function(data) {
                Cookies.set('user', JSON.stringify(data))
                Cookies.set("modifUser", true)
                document.location.reload();
            },
            error: function(data){
                $("#errorUserBox").html(data.responseText)
                if(Cookies.get("modifUser"))
                    Cookies.remove("modifUser")
            }
        })
        
            
    }

})