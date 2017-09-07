$(function(){
	var WorkoutLog = (function($, undefined){
		var API_BASE = "https://equally-yoked-api.herokuapp.com/api/";
		var userDefinitions = []

		var setAuthHeader = function(sessionToken){
			window.localStorage.setItem("sessionToken", sessionToken);
			//Set the authorization header
			//This can be done on individual calls
			//Here, we showcase ajaxSetup as a global tool
			$.ajaxSetup({
				"headers": {
					"Authorization": sessionToken
				}
			});
		};

		//public
		return {
			API_BASE: API_BASE,
			setAuthHeader: setAuthHeader
		};

	})(jQuery);

	//Ensure .disabled aren't clickable
	$(".nav-tabs a[data-toggle=tab]").on("click", function(e){
		if ($(this).hasClass("disabled") && !token){
			e.preventDefault();
			return false;
		}
	});

	//bind enter key
	$(document).on("keypress", function(e){
		if (e.which === 13){
			if ($("#signup-modal").is(":visible")){
				$("#signup").trigger("click");
			} 
			if ($("#login-modal").is(":visible")){
				$("#login").trigger("click");
			}
		}
	});

	//bootstrap tab => binding to a bootstrap event
	$('a[data-toggle="tab"]').on('shown.bs.tab', function(e){
		var target = $(e.target).attr("href"); //activated tab
		if (target === "#log"){
			WorkoutLog.log.setDefinitions();
		}
		if (target === "#update-log"){
			WorkoutLog.log.setDefinitions();
		}
		if (target === "#history"){
			WorkoutLog.log.setHistory();
		}
	}); 

	//setHeader if we
	var token = window.localStorage.getItem("sessionToken");
	if (token){
		WorkoutLog.setAuthHeader(token);
	}

	//expose this to the other workoutlog modules
	window.WorkoutLog = WorkoutLog;
});




// $(document).ready(function(){
// 	$('#testAPI').on('click', function(){
// 		console.log('working!!!');
// 	});

// 	var test = $.ajax({
// 		type: 'GET',
// 		url: 'http://localhost:3000/api/test'
// 	})
// 	.done(function(data){
// 		console.log(data);
// 	})
// 	.fail(function(){
// 		console.log('Oh no!');
// 	});
// });