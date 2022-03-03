(function($){
	var alertPage = null;
	var alertType = null;
	var callback = null;
	
	$.open = function(type, txt, page){
		txt = new String(txt);
		$.close();
		if(type == "error" || type == "ajax" || type == "alert"){
			var alertTitle = "";
			var alertMsg = "";
			if(type == "error"){
				alertTitle = "처리 실패";
				alertMsg = txt+"에 실패하였습니다.<br>잠시후 다시 시도바랍니다.<br><br>동일 현상이 계속된다면 고객센터로 연락바랍니다.";
			} else if(type == "ajax"){
				alertTitle = "통신 오류 발생";
				alertMsg = "서버와의 통신에 실패하였습니다.<br>잠시후 다시 시도바랍니다.<br>에러 : [<span class='color_b'>"+txt+"</span>]<br><br>동일 현상이 계속된다면 고객센터로 연락바랍니다.";
			} else if(type == "alert"){
				alertTitle = "알림";
				alertMsg = txt.replace(/\n/g, "<br>");
			}
			if(page != undefined && page != null && page != "") alertPage = page;
			else alertPage = null;
			$(".alertTitle").text(alertTitle);
			$(".alertMsg").html(alertMsg);
			$(".alertPopBack").show();
			$(".alertPopup").show();
		} else if(type == "confirm"){
			$(".confirmMsg").html(txt.replace(/\n/g, "<br>"));
			$(".confirmPopBack").show();
			$(".confirmPopup").show();
		} else{
			$(".promptMsg").html(txt.replace(/\n/g, "<br>"));
			$(".promptAnswer").prop("placeholder", txt.replace(/\n/g, " "));
			$(".promptPopBack").show();
			$(".promptPopup").show();
			$("#promptAnswer").focus();
		}
	}
	
	$.close = function(){
		if(alertPage != null) {
			if(alertPage.indexOf("submit") == 0) {
				loading(0);
				$("#"+alertPage.substring(alertPage.indexOf("_")+1)).submit();
			} else goPage(alertPage);
		} else {
			$(".customPopBack").hide();
			$(".customPopup").hide();
			$("#promptAnswer").val("");
			loading(1);
		}
	}
	
	$.alert = function(txt, page){
		this.open("alert", txt, page);
	}
	
	$.ajaxFail = function(txt, page){
		this.open("error", txt, page);
	}
	
	$.ajaxError = function(err){
		this.open("ajax", err, null);
	}
	
	$.confirm = function(txt, callback){
		this.open("confirm", txt, null);
		this.callback = callback;
	}
	
	$.confirmConfirm = function(){
		this.callbackMethod(this.callback+"(true)");
	}
	
	$.cancelConfirm = function(){
		if(this.callback == undefined) return false;
		this.callbackMethod(this.callback+"(false)");
	}
	
	$.prompt = function(txt, callback){
		this.open("prompt", txt, null);
		this.callback = callback;
	}
	
	$.promptConfirm = function(){
		var answer = $.trim($("#promptAnswer").val());
		this.callbackMethod(this.callback+"(\""+answer+"\")");
	}
	
	$.callbackMethod = function(callback){
		eval(callback);
	}
})(jQuery);
