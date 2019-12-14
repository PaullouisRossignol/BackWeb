$(document).off('click').on('click', '.updater', function(e){
	//e.preventDefault();
	const id = $(this).closest('form').children('.item-id').val();
	const user_id = '5df25e72be50a38010405e40';
	const debt_to = $(this).closest('form').children('.row')
	.children('.col-sm-6').children('.form-group').children('.debt_user').val();
	const amount = $(this).closest('form').children('.row')
	.children('.col-sm-6').children('.form-group').children('.debt_amount').val();	

	//$("body").html('<div>'+id+'</div>');
	//console.log('id suka:');
	//console.log(id, user_id, debt_to, amount );
	
	let arr = {id: id, user_id: user_id, debt_to: debt_to, amount: amount};


	$.ajax({
		url: '/upMetric',
		type: 'POST',
		data: JSON.stringify(arr),
		dataType: 'json',
		contentType: 'application/json; charset=utf-8',
        async: true,
        success: function(data, status) {
			console.log("done");
			console.log(JSON.stringify(data)+ "\n" + status);
		},
		error: function(data, status, error){
			console.log("error");
		}
	});
});
