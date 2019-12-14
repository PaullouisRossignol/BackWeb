$(document).off('click').on('click', '.deleter', function(e){
	//e.preventDefault();
	const id = $(this).closest('form').children('.item-id').val();
	//$("body").html('<div>'+id+'</div>');
	//console.log('id suka:');
	console.log(id);
	let arr = {id: id}

	$.ajax({
		url:  '/delMetric',
		type: 'POST',
		data: JSON.stringify(arr),
		dataType: 'json',
		contentType: 'application/json; charset=utf-8',
        async: true,
        success: function() {
			console.log("done");
		},
		error: function(data, status, error){
			console.log("error");
		}
	});
});
