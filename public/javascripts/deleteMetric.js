function deleteMetric(button){
	const id = button.id
	const debt_to = $("#"+id).closest('form').children('.row')
	.children('.col-sm-6').children('.form-group').children('.debt_user').val()
	var conf = confirm("Are you sure you want to delete this metric ?\n=> "+debt_to);
    if (conf == true) {
	const userCookies = Cookies.getJSON('user')
	const token = userCookies.token
	let arr = {token: token, id: id}

	$.ajax({
		url:  '/delMetric',
		type: 'POST',
		data: JSON.stringify(arr),
		contentType: 'application/json; charset=utf-8',
        async: true,
        success: function() {
			document.location.reload()
		},
		error: function(data, status, error){
			$("#errorGetMetricsBox").html(data.responseText)
		}
	});
}
	return false
}