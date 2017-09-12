$(function(){
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
						WorkoutLog.definition.fetchAll();
						WorkoutLog.log.fetchAll();

						// console.log("You made it!");
						// console.log(data.sessionToken);
					}

					$('#signup-modal').modal('hide');
					$('.disabled').removeClass('disabled');
					$('#loginout').text('Logout');
					WorkoutLog.fillProfile(user.data);

					$("#su_username").val("");
					$("#su_password").val("");
					$("#su_firstname").val("");
					$("#su_lastname").val("");
					$("#su_age").val("");
					$("#su_gender").val("");

					//routing
					$("a[href='#define']").tab('show');
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
						WorkoutLog.definition.fetchAll();
						WorkoutLog.log.fetchAll();
						
						// console.log(data.sessionToken);
					}
					$("#login-modal").modal("hide");
					$(".disabled").removeClass("disabled");
					$("#loginout").text("Logout");
					$(WorkoutLog.fillProfile(user));

					
					$("#li_username").val("");
					$("#li_password").val("");
					$("a[href='#define']").tab("show");
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
		fillProfile: function(user){
			var navUser = user;
			console.log(navUser)
			// var newNav = "<li><a href='#'>Welcome " + navUser.firstName + "!</a></li>";
			// $('#navbarMaster').append(newNav);
		}
	});
	//bind events
	$("#login").on("click", WorkoutLog.login);
	$('#signup').on('click', WorkoutLog.signup);
	$("#loginout").on("click", WorkoutLog.loginout);

	if (window.localStorage.getItem("sessionToken")){
		$("#loginout").text("Login");
	}
});