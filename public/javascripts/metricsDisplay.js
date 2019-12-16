
function displayMetrics() {
	userCookies = Cookies.getJSON('user')
	const url = "/getUserMetrics"
	const arr = {user: userCookies}
	var debts = 10;
	var favors = 100;
	var difference = 0;


	$.ajax({
		url: url,
		method: "POST",
		data: arr,
        dataType: 'json',
        success: function(data) {
			var debts_to_append = '';
			var favors_to_append = '';
			$.each(data, function(i, item) {
				if(item.amount < 0){
					debts+= Number(item.amount);
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
								'<button type="button" onclick="updateMetric(this)" id ='+item.id+' class="btn log-btn">'+
									'Change'+
								'</button>'+
								'</div>'+
								'<div class="row debt-fav-row">'+
									'<button type="button" onclick="deleteMetric(this)" id ='+item.id+' class="btn log-btn">'+
										'Close Debt'+
									'</button>'+
								'</div>'+
							'</div>'+
						'</div>'+
					'</form>'+
						'<script src="/javascripts/updateMetric.js"></script>';
				}
				else {
					favors+= Number(item.amount);	
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
									'<button type="button" onclick="updateMetric(this)" id ='+item.id+' class="btn log-btn">'+
										'Change'+
									'</button>'+
								'</div>'+
								'<div class="row debt-fav-row">'+
								'	<button type="button" onclick="deleteMetric(this)" id ='+item.id+' class="btn log-btn deleter">'+
										'Close Debt'+
									'</button>'+
								'</div>'+
							'</div>'+
						'</div>'+
					'</form>'+
						'<script src="/javascripts/updateMetric.js"></script>';
				}
			  });
			//Displaying metrics			
          	$("#debts-container").html(debts_to_append);
          	$("#favors-container").html(favors_to_append);
			//Displaying Statistics


			difference = favors + debts;
			debts*=-1;
			
			var dataset = [debts, favors];

			var svgWidth = 330, svgHeight = 300, barPadding = 5;
			var barWidth = (svgWidth / dataset.length);


			var svg = d3.select('svg')
				.attr("width", svgWidth)
				.attr("height", svgHeight)
				.style("background", "white")
				.style("padding", "5");
				
			var barChart = svg.selectAll("rect")
				.data(dataset)
				.enter()
				.append("rect")
				.attr("y", function(d) {
					 return d>svgHeight? svgHeight-280: svgHeight - d; 
				})
				.attr("height", function(d) { 
					return d>svgHeight? svgHeight-20: d; 
				})
				.attr("width", barWidth - barPadding)
				.attr("transform", function (d, i) {
					var translate = [barWidth * i, 0]; 
					return "translate("+ translate +")";
				});

			var text = svg.selectAll("text")
				.data(dataset)
				.enter()
				.append("text")
				.text(function(d) {
					return d;
				})
				.attr("y", function(d, i) {
					return d>svgHeight? svgHeight -282: svgHeight - d - 2;
				})
				.attr("x", function(d, i) {
					return barWidth * i + 60;
				})
				.attr("fill", "#A64C38");

			var final_result = '';

			if(difference<0){
				final_result+= '<h4>You own '+ (difference*-1) + ' in total</h4>';
			}
			else {
				final_result+= '<h4>You lend '+ difference + ' in total</h4>';
			}
			$("#final_result").html(final_result);
		},
		error: function(data){
			console.log(data)
			$("#errorGetMetricsBox").html(data.responseText);
		}
	});
}

