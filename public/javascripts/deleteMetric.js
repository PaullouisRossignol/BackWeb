/*$(".deleter").click((e) => {
	//console.log("deleter");
	e.preventDefault();
	var id = $("#metricId").val();
	console.log(id);
});

$("form"){
	$(".deleter").click((e)=>{
		e.preventDefault();
		console.log("dsafsd");	
	});
};
*/
/*
$(document).on("button" function (e) {
	e.preventDefault();
	concole.log("zhuzhu");
});*/
/*
$(".deleter").click((e)=>{
	e.preventDefault();
	var id = $(e.target).closest('.form-group').find("#1").val();

	console.log(id);

});*/

$(document).off('click').on('click', '.deleter', function(e){
	e.preventDefault();
	const id = $(this).closest('form').children('.item-id').val();
	//$("body").html('<div>'+id+'</div>');
	//console.log('id suka:');
	console.log(id);
});
