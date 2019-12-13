$("#add_new").click((e)=>{
	//e.preventDefault();
	const user_id = "5df25e72be50a38010405e40";
	var amount = $("#new_amount").val();
	const debt_to = $("#debt_fav_to").val();
	
	if($('input[name=option_choice]:checked').val()==1){
		amount > 0 ? amount*=-1 : amount*=1;
		console.log("debt checked");
	}
	else if($('input[name=option_choice]:checked').val()==2){
		amount < 0 ? amount*=-1 : amount*=1;
		console.log("favor checked");
	}
	
	let arr = {user_id: user_id, amount: amount, debt_to: debt_to};
	
	$.ajax({
		url: '/addMetric',
		type: 'POST',
		data: JSON.stringify(arr),
		dataType: 'json',
		contentType: 'application/json; charset=utf-8',
		async: true,
		success: function(data, status){
			console.log(JSON.stringify(data)+ "\n" + status);
			document.location.href = "/user"
		},
		error: function(data, statsu, error){
			console.log(JSON.stringify(data)+ "\n" + status+ "\n" + error);
		}

	});

});
