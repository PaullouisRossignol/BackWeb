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

$(".deleter").click((e)=>{
	e.preventDefault();
	var id = $(this);//.closest("form").find("input[name=metricId]").val();

	console.log(id);

});
