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
												'<label for="debt_fav_to">reminder:</label>'+
												'<input type="text" class="form-control" id="debt_fav_to"'+ 
												'placeholder="key word to remind your due">'+
												'<label for="new_amount">Amount (in $):</label>'+
												'<input type="number" class="form-control" id="new_amount"'+ 
												'value="1" >'+
												'<p>Chose one:</p>'+
												'<input type="radio" name="option_choice" value="1">Debt</input>'+
												'<br>'+
												'<input type="radio" name="option_choice" value="2">Favor</input>'+
										'</div>'+
									'</div>'+
									'<div class="col-sm-6">'+
										'<div class="row debt-fav-row">'+
											'<input type="submit" onclick="cancel()" class="btn log-btn" value="Cancel" >'+
										'</div>'+
									'</div>'+
								'</div>'+
								'<div class="errorBox" id="errorMetricsBox"></div>'+	
							'</form>'+
							'<button type="button" id="add_new"  class="btn log-btn">'+
									'Submit'+
							'</button>'+
						'</div>'+
						'<script src="/javascripts/addMetric.js"></script>';
	$('#add-new-container').html(window_to_append);

});
