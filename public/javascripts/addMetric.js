$("#add_new").click((e)=>{
	e.preventDefault();
	const userCookies = Cookies.getJSON('user')
	const user_id = userCookies.user.id
	var amount = $("#new_amount").val();
	const debt_to = $("#debt_fav_to").val();
	const token = userCookies.token
	if($('input[name=option_choice]:checked').val()==1){
		amount > 0 ? amount*=-1 : amount*=1;
	}
	else if($('input[name=option_choice]:checked').val()==2){
		amount < 0 ? amount*=-1 : amount*=1;
	}
	
	let arr = {token: token, user_id: user_id, amount: amount, debt_to: debt_to};
	
	$.ajax({
		url: '/addMetric',
		type: 'POST',
		data: JSON.stringify(arr),
		contentType: 'application/json; charset=utf-8',
		async: true,
		success: function(data, status){
			document.location.reload()
		},
		error: function(data, status, error){
			$("#errorMetricsBox").html(data.responseText);
		}

	});

});
 function cancel()
 {
	$('#add-new-container').html("")
 }