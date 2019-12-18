 
if(Cookies.get('user'))
{
    $("#scripts").html(
    "<script src='/javascripts/metricsDisplay.js'></script>"+
    "<script src='/javascripts/deleteMetric.js'></script>"+
    "<script src='/javascripts/addWindowDisplay.js'></script>")
    const user = Cookies.getJSON('user')

    $('#email').val(user.user.email)
    $('#password').val(user.user.password)
    if(Cookies.get("modifUser"))
    {
        $("#modifUserBox").html("Your account was updated")
        $("#modifUserBox").animate({ 
            'opacity': '0 '
        },4000)
        Cookies.remove("modifUser")
    }
    if(Cookies.get("modifMetric"))
    {
        $("#modifMetricBox").html("Your metrics were updated")
        $("#modifMetricBox").animate({ 
            'opacity': '0 '
        },4000)
        Cookies.remove("modifMetric")
    }
    displayMetrics()
}
else
{
    if(Cookies.get("modifMetric"))
        Cookies.remove("modifMetric")
    if(Cookies.get("modifUser"))
        Cookies.remove("modifUser")
    document.location.href = '/'
}

$("#changeEmail").click((e) =>{

    e.preventDefault()
    const email = $("#email").val()
    userCookie = Cookies.getJSON("user")
    if (email != "" && email != userCookie.user.email)
    {
        userCookie.user.email = email
        let arr = {user: userCookie}
        UpdateUserAjax(arr)      
    }
})
$("#changePassword").click((e) =>{

    e.preventDefault()
    const password = $("#password").val()
    userCookie = Cookies.getJSON("user")
    if (password != "" && password != userCookie.user.password)
    {
        userCookie.user.password = password
        let arr = {user: userCookie}
        UpdateUserAjax(arr)     
    }
})
$("#deleteUser").click((e) =>{
    e.preventDefault()
    var conf = confirm("Are you sure you want to delete your account ?\n            All your metrics will be deleted");
    if (conf == true) {
    userCookie = Cookies.getJSON("user")
    DeleteUserAjax(userCookie)
    }
})
$('#LogOut').click((e) =>{
    Cookies.remove('user')
    document.location.href = '/'
})
function UpdateUserAjax(arr){
    $.ajax({
        url : '/upUser',
        type : 'POST', 
        data : JSON.stringify(arr),
        dataType : 'json',
        contentType: 'application/json; charset=utf-8',
        async: true,
        success: function(data) {
            console.log("aie")
            Cookies.set('user', JSON.stringify(data))
            Cookies.set("modifUser", true)
            document.location.reload();
        },
        error: function(data){
            console.log("aie")

            $("#errorUserBox").html(data.responseText)
            if(Cookies.get("modifUser"))
                Cookies.remove("modifUser")
            if(data.responseText === "Access token has expired")
            {
                alert("You're session has expired, please reconnect")
                Cookies.remove('user')
                document.location.href = '/'
            }
            
        }
    })
}
function DeleteUserAjax(arr)
{
    $.ajax({
        url : '/delUser',
        type : 'POST', 
        data : JSON.stringify(arr),
        contentType: 'application/json; charset=utf-8',
        async: true,
        success: function() {
            Cookies.remove('user')
            document.location.href = '/'
        },
        error: function(data, error, status){
            $("#errorUserBox").html(data.responseText )
            if(data.responseText === "Access token has expired")
            {
                alert("You're session has expired, please reconnect")
                Cookies.remove('user')
                document.location.href = '/'
            }
            
        }
    })
}