

function updateMetric(button){
	const id = button.name
	const buttonId = button.id
	const debt_to = $("#"+buttonId).closest('form').children('.row')
	.children('.col-sm-6').children('.form-group').children('.debt_user').val()
	const amount = $("#"+buttonId).closest('form').children('.row')
	.children('.col-sm-6').children('.form-group').children('.debt_amount').val();

	if(debt_to !== "" && amount !== "")
	{
		const userCookies = Cookies.getJSON('user')
		const user_id = userCookies.user.id
		const token = userCookies.token
		let arr = {token: token, id: id, user_id: user_id, debt_to: debt_to, amount: amount};

		$.ajax({
			url: '/upMetric',
			type: 'POST',
			data: JSON.stringify(arr),
			contentType: 'application/json; charset=utf-8',
			async: true,
			success: function(data, status) {
				Cookies.set("modifMetric", true)
				document.location.reload()
			},
			error: function(data, status, error){
				$("#errorGetMetricsBox").html(data.responseText)
				if(Cookies.get("modifMetric"))
					Cookies.remove("modifMetric")
			}
		});
	}
}