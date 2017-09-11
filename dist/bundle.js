$(function(){var o=function(o,t){return{API_BASE:"http://localhost:3000/api/",setAuthHeader:function(t){window.localStorage.setItem("sessionToken",t),o.ajaxSetup({headers:{Authorization:t}})}}}(jQuery);$(".nav-tabs a[data-toggle=tab]").on("click",function(o){if($(this).hasClass("disabled")&&!t)return o.preventDefault(),!1}),$(document).on("keypress",function(o){13===o.which&&($("#signup-modal").is(":visible")&&$("#signup").trigger("click"),$("#login-modal").is(":visible")&&$("#login").trigger("click"))}),$('a[data-toggle="tab"]').on("shown.bs.tab",function(t){var e=$(t.target).attr("href");"#log"===e&&o.log.setDefinitions(),"#update-log"===e&&o.log.setDefinitions(),"#history"===e&&o.log.setHistory()});var t=window.localStorage.getItem("sessionToken");t&&o.setAuthHeader(t),window.WorkoutLog=o}),$(function(){$.extend(WorkoutLog,{definition:{userDefinitions:[],create:function(){var o={definition:{desc:$("#def-description").val(),type:$("#def-logtype").val()}};$.ajax({type:"POST",url:WorkoutLog.API_BASE+"definition",data:JSON.stringify(o),contentType:"application/json"}).done(function(o){WorkoutLog.definition.userDefinitions.push(o.definition),console.log(o.definition),$("#def-description").val(""),$("#def-logtype").val(""),$("a[href='#log']").tab("show")})},fetchAll:function(){$.ajax({type:"GET",url:WorkoutLog.API_BASE+"definition",headers:{authorization:window.localStorage.getItem("sessionToken")}}).done(function(o){WorkoutLog.definition.userDefinitions=o}).fail(function(o){console.log(o)})}}}),$("#def-save").on("click",WorkoutLog.definition.create),window.localStorage.getItem("sessionToken")&&WorkoutLog.definition.fetchAll()}),$(function(){$.extend(WorkoutLog,{log:{workouts:[],setDefinitions:function(){for(var o,t=WorkoutLog.definition.userDefinitions,e=t.length,i=0;i<e;i++)o+="<option value='"+t[i].id+"'>"+t[i].description+"</option>";$("#log-definition").children().remove(),$("#log-definition").append(o),$("#update-definition").children().remove(),$("#update-definition").append(o)},setHistory:function(){for(var o=WorkoutLog.log.workouts,t=o.length,e="",i=0;i<t;i++)e+="<li class='list-group-item'>"+o[i].def+" - "+o[i].result+" <div class='pull-right'><button id='"+o[i].id+"' class='update'><strong>U</strong></button><button id='"+o[i].id+"' class='remove'><strong>X</strong></button></div></li>";$("#history-list").children().remove(),$("#history-list").append(e)},create:function(){var o={log:{description:$("#log-description").val(),result:$("#log-result").val(),def:$("#log-definition option:selected").text()}};$.ajax({type:"POST",url:WorkoutLog.API_BASE+"log",data:JSON.stringify(o),contentType:"application/json"}).done(function(o){WorkoutLog.log.workouts.push(o),$("#log-description").val(""),$("#log-result").val(""),$("a[href='#history']").tab("show")})},getWorkout:function(){var o={id:$(this).attr("id")};console.log("thisLog"),logID=o.id;var t={log:o};$.ajax({type:"GET",url:WorkoutLog.API_BASE+"log/"+logID,data:JSON.stringify(t),contentType:"application/json"}).done(function(o){$("a[href='#update-log']").tab("show"),$("#update-result").val(o.result),$("#update-description").val(o.description),$("#update-id").val(o.id)})},updateWorkout:function(){$("#update").text("Update");for(var o={id:$("#update-id").val(),desc:$("#update-description").val(),result:$("#update-result").val(),def:$("#update-definition option:selected").text()},t=0;t<WorkoutLog.log.workouts.length;t++)WorkoutLog.log.workouts[t].id==o.id&&WorkoutLog.log.workouts.splice(t,1);WorkoutLog.log.workouts.push(o);var e={log:o};$.ajax({type:"PUT",url:WorkoutLog.API_BASE+"log",data:JSON.stringify(e),contentType:"application/json"}).done(function(o){console.log(o),$("#update-description").val(""),$("#update-result").val(""),$('a[href="#history"]').tab("show")})},delete:function(){var o={id:$(this).attr("id")},t={log:o},e=$.ajax({type:"DELETE",url:WorkoutLog.API_BASE+"log",data:JSON.stringify(t),contentType:"application/json"});$(this).closest("li").remove();for(var i=0;i<WorkoutLog.log.workouts.length;i++)WorkoutLog.log.workouts[i].id==o.id&&WorkoutLog.log.workouts.splice(i,1);e.fail(function(){console.log("nope, you dind't delete it.")})},fetchAll:function(){$.ajax({type:"GET",url:WorkoutLog.API_BASE+"log",headers:{authorization:window.localStorage.getItem("sessionToken")}}).done(function(o){WorkoutLog.log.workouts=o}).fail(function(o){console.log(o)})}}}),$("#log-save").on("click",WorkoutLog.log.create),$("#history-list").on("click",".remove",WorkoutLog.log.delete),$("#log-update").on("click",WorkoutLog.log.updateWorkout),$("#history-list").on("click",".update",WorkoutLog.log.getWorkout),window.localStorage.getItem("sessionToken")&&WorkoutLog.log.fetchAll()}),$(function(){$.extend(WorkoutLog,{signup:function(){var o={user:{username:$("#su_username").val(),password:$("#su_password").val(),firstName:$("#su_firstname").val(),lastName:$("#su_lastname").val(),age:$("#su_age").val(),gender:$("#su_gender").val()}};$.ajax({type:"POST",url:WorkoutLog.API_BASE+"user",data:JSON.stringify(o),contentType:"application/json"}).done(function(o){o.sessionToken&&(WorkoutLog.setAuthHeader(o.sessionToken),WorkoutLog.definition.fetchAll(),WorkoutLog.log.fetchAll(),console.log("You made it!"),console.log(o.sessionToken)),$("#signup-modal").modal("hide"),$(".disabled").removeClass("disabled"),$("#loginout").text("Logout"),$("#su_username").val(""),$("#su_password").val(""),$("#su_firstname").val(""),$("#su_lastname").val(""),$("#su_age").val(""),$("#su_gender").val(""),$("a[href='#define']").tab("show")}).fail(function(){$("#su_error").text("There was an issue with sign up").show()})},login:function(){var o={user:{username:$("#li_username").val(),password:$("#li_password").val()}};$.ajax({type:"POST",url:WorkoutLog.API_BASE+"login",data:JSON.stringify(o),contentType:"application/json"}).done(function(o){o.sessionToken&&(WorkoutLog.setAuthHeader(o.sessionToken),WorkoutLog.definition.fetchAll(),WorkoutLog.log.fetchAll(),console.log(o.sessionToken)),$("#login-modal").modal("hide"),$(".disabled").removeClass("disabled"),$("#loginout").text("Logout"),$("#li_username").val(""),$("#li_password").val(""),$("a[href='#define']").tab("show")}).fail(function(){$("#li_error").text("There was an issue with sign up").show()})},loginout:function(){window.localStorage.getItem("sessionToken")&&(window.localStorage.removeItem("sessionToken"),$("#loginout").text("Login")),window.location.reload(!0)}}),$("#login").on("click",WorkoutLog.login),$("#signup").on("click",WorkoutLog.signup),$("#loginout").on("click",WorkoutLog.loginout),window.localStorage.getItem("sessionToken")&&$("#loginout").text("Login")});