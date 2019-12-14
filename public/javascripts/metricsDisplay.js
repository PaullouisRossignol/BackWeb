$(function() {
    console.log( "ready!" );

	$.ajax({
		url: "/getUserMetrics/5df25e72be50a38010405e40",
        method: "GET",
        dataType: 'json',
        success: function(data) {
			console.log(typeof(data));
			var debts_to_append = '';
			var favors_to_append = '';
         	
			$.each(data, function(i, item) {
				if(item.amount < 0){
					debts_to_append +='<form>'+
						'<input class="item-id" type="hidden"  name="metricId" value="'+item.id+'">'+
						'<div class="row">'+
							'<div class="col-sm-6">'+
								'<div class="form-group">'+
										'<label for="deb_user">Debt to:</label>'+
										'<input type="text" class="form-control debt_user" name="deb_user"'+ 
										'value="'+ 
										item.debt_to +
										'">'+
										'<label for="deb_amount">Debt Amount (in $):</label>'+
										'<input type="number" class="form-control debt_amount" name="deb_amount"'+ 
										'value="'+
										item.amount  +
										'">'+
								'</div>'+
							'</div>'+
							'<div class="col-sm-6">'+
								'<div class="row debt-fav-row">'+
									'<input type="submit" class="btn log-btn updater" value="Change">'+
								'</div>'+
								'<div class="row debt-fav-row">'+
									'<button class="btn log-btn deleter">'+
										'Close Debt'+
									'</button>'+
								'</div>'+
							'</div>'+
						'</div>'+
					'</form>'+
						'<script src="/javascripts/deleteMetric.js"></script>'+
						'<script src="/javascripts/updateMetric.js"></script>';
				}
				else {
					favors_to_append +='<form>'+
						'<input class="item-id" type="hidden" name="metricId" value="'+item.id+'">'+
						'<div class="row">'+
							'<div class="col-sm-6">'+
								'<div class="form-group">'+
										'<label for="favor_user">User having my favor:</label>'+
										'<input type="text" class="form-control debt_user" name="favor_user"'+ 
										'value="'+ 
										item.debt_to +
										'">'+
										'<label for="favor_amount">Favor Amount (in $):</label>'+
										'<input type="number" class="form-control debt_amount" name="favor_amount"'+ 
										'value="'+
										item.amount  +
										'">'+
								'</div>'+
							'</div>'+
							'<div class="col-sm-6">'+
								'<div class="row debt-fav-row">'+
									'<input type="submit" class="btn log-btn updater" value="Change">'+
								'</div>'+
								'<div class="row debt-fav-row">'+
									'<button class="btn log-btn deleter">'+
										'Close Debt'+
									'</button>'+
								'</div>'+
							'</div>'+
						'</div>'+
					'</form>'+
						'<script src="/javascripts/deleteMetric.js"></script>'+
						'<script src="/javascripts/updateMetric.js"></script>';
				}
         	 });
          	$("#debts-container").html(debts_to_append);
          	$("#favors-container").html(favors_to_append);
		},
		error: function(){
			concole.log(data);
		}
	});
});

