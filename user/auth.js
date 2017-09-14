$(function(){
	// var userInfo = $('#su_firstname').val();
	// console.log(userInfo)
	$.extend(WorkoutLog, {
		//signup method
		signup: function(){
			//username and password variables
			var username = $('#su_username').val();
			var password = $('#su_password').val();
			
			var firstName = $('#su_firstname').val();
			var lastName = $('#su_lastname').val();
			var age = $('#su_age').val();
			var gender; 
			if ($('#su_genderMale').is(':checked')){
				gender = $('#su_genderMale').val()
			} else {
				gender = $('#su_genderFemale').val()
			}; 
			//user object
			// console.log(gender)
			var user = {
				user: {
					username: username,
					password: password,
					firstName: firstName,
					lastName: lastName,
					age: age,
					gender: gender
				}
			};
			//signup post
			var signup = $.ajax({
				type: "POST", 
				url: WorkoutLog.API_BASE + "user",
				data: JSON.stringify(user),
				contentType: "application/json"
			});
			//signup done/fail
			signup
				.done(function(data){
					if (data.sessionToken){
						WorkoutLog.setAuthHeader(data.sessionToken);
						// WorkoutLog.definition.fetchAll();
						WorkoutLog.log.fetchAll();

						// console.log("You made it!");
						// console.log(data.sessionToken);
					}

					$('#signup-modal').modal('hide');
					$('.invisible').removeClass('invisible');
					$('#home').addClass('invisible');
					$('#loginout').text('Logout');
					$(WorkoutLog.fillProfile(data.user));
					$('#body').css("background", "#212121");

					$("#su_username").val("");
					$("#su_password").val("");
					$("#su_firstname").val("");
					$("#su_lastname").val("");
					$("#su_age").val("");
					$("#su_gender").val("");

					//routing
$("a[href='#log']").tab('show');
				})
				.fail(function(){
					$('#su_error').text("There was an issue with sign up").show();
				});
		},
		//login method
		login: function(){
			//login variables
			var username = $("#li_username").val();
			var password = $("#li_password").val();
			var user = {
				user: {
					username: username,
					password: password
				}
			};
			//login POST
			var login = $.ajax({
				type: "POST", 
				url: WorkoutLog.API_BASE + "login",
				data: JSON.stringify(user),
				contentType: "application/json"
			});
			//login done/fail
			login
				.done(function(data){
					if (data.sessionToken){
						WorkoutLog.setAuthHeader(data.sessionToken);
						// WorkoutLog.definition.fetchAll();
						WorkoutLog.log.fetchAll();
						
						// console.log(data.sessionToken);
					}
					$("#login-modal").modal("hide");
					$('.invisible').removeClass('invisible');
					$('#home').addClass('invisible');
					$("#loginout").text("Logout");
					$(WorkoutLog.fillProfile(data.user));
					// $('#body').css("background", "#212121");

					
					$("#li_username").val("");
					$("#li_password").val("");
$("a[href='#log']").tab("show");
				})
				.fail(function(){
					$("#li_error").text("There was an issue with sign up").show();
				});
		},
		//loginout method
		loginout: function(){
			if (window.localStorage.getItem("sessionToken")){
				window.localStorage.removeItem("sessionToken");
				$("#loginout").text("Login");
				window.location.reload(true);
			}
		},
		//Navbar fill in
		fillProfile: function(data){
			var navUser = data;
			var newNav = "<li id='welcome' class='pull-right'>Welcome " + navUser.firstName + "!</li>";
			$('#navbarMaster').append(newNav);
		}
	});
	//bind events
	$("#login").on("click", WorkoutLog.login);
	$('#signup').on('click', WorkoutLog.signup);
	$("#loginout").on("click", WorkoutLog.loginout);

	var idleInterval = setInterval(timerIncrement, 5000);

	$(this).mousemove(function(e){
		idleTime = 0;
	});
	$(this).keypress(function(e){
		idleTime = 0;
	});

	function timerIncrement(){
		idleTime += 1;
		if (idleTime > 3000 && window.localStorage.getItem('sessionToken')){ //20 minutes
			alert("You have been logged out.  Please log back in to continue.");
			WorkoutLog.loginout();
			console.log('time inc work auth');
		}
	}

	if (window.localStorage.getItem("sessionToken")){
		$("#loginout").text("Login");
	}
});