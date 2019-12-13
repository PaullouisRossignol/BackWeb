function displayMetrics() {
	id = Cookies.getJSON('user').user.id
	const url = "/getUserMetrics/"+id
	$.ajax({
		url: url,
        method: "GET",
        dataType: 'json',
        success: function(data) {
			var debts_to_append = '';
			var favors_to_append = '';
         	
			$.each(data, function(i, item) {
				if(item.amount < 0){
					debts_to_append +='<form>'+
						'<div class="row">'+
							'<div class="col-sm-6">'+
								'<div class="form-group">'+
										'<label for="deb_user">reminder:</label>'+
										'<input type="text" class="form-control" id="debt_user"'+ 
										'value="'+ 
										item.debt_to +
										'">'+
										'<label for="debt_amount"> Amount in $:</label>'+
										'<input type="number" class="form-control" id="debt_amount"'+ 
										'value="'+
										item.amount  +
										'">'+
								'</div>'+
							'</div>'+
							'<div class="col-sm-6">'+
								'<div class="row debt-fav-row">'+
									'<input type="submit" class="btn log-btn" value="Change">'+
								'</div>'+
								'<div class="row debt-fav-row">'+
									'<button class="btn log-btn">'+
										'Close Debt'+
									'</button>'+
								'</div>'+
							'</div>'+
						'</div>'+
					'</form>';
				}
				else {
					favors_to_append +='<form>'+
						'<div class="row">'+
							'<div class="col-sm-6">'+
								'<div class="form-group">'+
										'<label for="favor_user">reminder:</label>'+
										'<input type="text" class="form-control" id="favor_user"'+ 
										'value="'+ 
										item.debt_to +
										'">'+
										'<label for="favor_amount"> Amount in $:</label>'+
										'<input type="number" class="form-control" id="favor_amount"'+ 
										'value="'+
										item.amount  +
										'">'+
								'</div>'+
							'</div>'+
							'<div class="col-sm-6">'+
								'<div class="row debt-fav-row">'+
									'<input type="submit" class="btn log-btn" value="Change">'+
								'</div>'+
								'<div class="row debt-fav-row">'+
									'<button class="btn log-btn">'+
										'Close Debt'+
									'</button>'+
								'</div>'+
							'</div>'+
						'</div>'+
					'</form>';
				}
         	 });
          	$("#debts-container").html(debts_to_append);
          	$("#favors-container").html(favors_to_append);
		},
		error: function(){
			concole.log("Error: "+data);
		}
	});
}

