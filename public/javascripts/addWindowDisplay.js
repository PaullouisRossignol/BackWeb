$(".adder").click((e) => {
	e.preventDefault();
	var window_to_append = '';

	window_to_append += 
						'<h1>Add new Debt or Favor</h1>'+
						'<div>'+
							'<form>'+
								'<div class="row">'+
									'<div class="col-sm-6">'+
										'<div class="form-group">'+
												'<label for="debt_fav_to">Debt or Favor to:</label>'+
												'<input type="text" class="form-control" id="debt_fav_to"'+ 
												'value="Bublik Ponchikov">'+
												'<label for="new_amount">Amount (in $):</label>'+
												'<input type="number" class="form-control" id="new_amount"'+ 
												'value="1">'+
												'<p>Chose one:</p>'+
												'<input type="radio" name="option_choice" value="1">Debt</input>'+
												'<br>'+
												'<input type="radio" name="option_choice" value="2">Favor</input>'+
										'</div>'+
									'</div>'+
									'<div class="col-sm-6">'+
										'<div class="row debt-fav-row">'+
											'<input type="submit" class="btn log-btn" value="Submit" id="add_new">'+
										'</div>'+
									'</div>'+
								'</div>'+
							'</form>'+
							'<script src="/javascripts/addMetric.js"></script>'
						'</div>';
	$('#add-new-container').html(window_to_append);

});
