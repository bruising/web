$(function(){

	$.ajaxSetup(
		{
			async: false
		});

	var tab = 'account_number';
	// var codenumber;
	// 选项卡切换
	$(".account_number").click(function () {
		$('.tel-warn').addClass('hide');
		tab = $(this).attr('class').split(' ')[0];
		checkBtn();
        $(this).addClass("on");
        $(".message").removeClass("on");
        $(".form2").addClass("hide");
        $(".form1").removeClass("hide");
    });
	// 选项卡切换
	$(".message").click(function () {
		$('.tel-warn').addClass('hide');
		tab = $(this).attr('class').split(' ')[0];
		checkBtn();
		$(this).addClass("on");
        $(".account_number").removeClass("on");
		$(".form2").removeClass("hide");
		$(".form1").addClass("hide");
		
    });

	$('#num').keyup(function(event) {
		$('.tel-warn').addClass('hide');
		checkBtn();
	});

	$('#pass').keyup(function(event) {
		$('.tel-warn').addClass('hide');
		checkBtn();
	});

	$('#veri').keyup(function(event) {
		$('.tel-warn').addClass('hide');
		checkBtn();
	});

	$('#num2').keyup(function(event) {
		$('.tel-warn').addClass('hide');
		checkBtn();
	});

	$('#veri-code').keyup(function(event) {
		$('.code-warn').addClass('hide');
		checkBtn();
	});

	// 按钮是否可点击
	function checkBtn()
	{
		$(".log-btn").off('click');
		if (tab == 'account_number') {
			var inp = $.trim($('#num').val());
			var pass = $.trim($('#pass').val());
			if (inp != '' && pass != '') {
				if (!$('.code').hasClass('hide')) {
					code = $.trim($('#veri').val());
					if (code == '') {
						$(".log-btn").addClass("off");
					} else {
						$(".log-btn").removeClass("off");
						sendBtn();
					}
				} else {
					$(".log-btn").removeClass("off");
						sendBtn();
				}
			} else {
				$(".log-btn").addClass("off");
			}
		} else {
			var phone = $.trim($('#num2').val());
			var code2 = $.trim($('#veri-code').val());
			if (phone != '' && code2 != '') {
				$('.tel-warn').addClass('hide');
				$('.code-warn').addClass('hide');
				$(".log-btn").removeClass("off");
				sendBtn();
			} else {
				$(".log-btn").addClass("off");
			}
		}
	}

	function checkAccount(username){
		if (username == '') {
			$('.num-err').removeClass('hide').find("em").text('请输入账户');
			return false;
		} else {
			$('.num-err').addClass('hide');
			return true;
		}
	}

	function checkPass(pass){
		if (pass == '') {
			$('.pass-err').removeClass('hide').text('请输入密码');
			return false;
		} else {
			$('.pass-err').addClass('hide');
			return true;
		}
	}

	function checkPhone(phone){
		var status = true;
		if (phone == '') {
			$('.num2-err').removeClass('hide').find("em").text('请输入手机号');
			return false;
		}
		var param = /^1[34578]\d{9}$/;
		if (!param.test(phone)) {
			// globalTip({'msg':'手机号不合法，请重新输入','setTime':3});
			$('.num2-err').removeClass('hide');
			$('.num2-err').text('手机号不合法，请重新输入');
			return false;
		}
		return true;
	}


	// 登录点击事件
	function sendBtn(){
		
		if (tab == 'account_number') {
			$(".log-btn").click(function(){
				// var type = 'phone';
				var inp = $.trim($('#num').val());
				var pass = $.trim($('#pass').val());
				if (checkAccount(inp) && checkPass(pass)) {
					$.post(getRootPath() + "/frontLogin",{
						'userPhone':inp,
						'userPassword':pass
					},function(data){
						if (data.code == 0) {
							sessionStorage.setItem("user",JSON.stringify(data.data));
							sessionStorage.setItem("token",data.token);
							$(location).attr('href','../index.html');
						} else if(data.code == 4){
							$(".log-btn").off('click').addClass("off");
							$('.pass-err').removeClass('hide').find('em').text(data.msg);
							$('.pass-err').find('i').attr('class', 'icon-warn').css("color","#d9585b");
							return false;
						}
					},'json');
				} else {
					return false;
				}
			});
		} else {
			$(".log-btn").click(function(){
				// var type = 'phone';
				var phone = $.trim($('#num2').val());
				var pcode = $.trim($('#veri-code').val());
				if (checkPhone(phone)&&pcode!='') {
					$.post(getRootPath() + "/frontPhoneLogin",{
						phone:phone,
						code:pcode
					},function(data){
						if (data.code == 2001) {
							//globalTip({'msg':'登录成功!','setTime':3,'jump':true,'URL':'http://www.ui.cn'});
							sessionStorage.setItem("user",JSON.stringify(data.map.data));
							sessionStorage.setItem("token",data.map.token);
							$(location).attr('href', '../index.html');
						} else if(data.code == 2004) {
							$(".log-btn").off('click').addClass("off");
							$('.num2-err').removeClass('hide').text("failed");
							return false;
						}
					},'json');
				} else {
					$(".log-btn").off('click').addClass("off");
					// $('.tel-warn').removeClass('hide').text('登录失败');
					return false;
				}
			});
		}
	}

	function getRootPath() {
	    return JSON.parse(sessionStorage.getItem('url'));
	}
	
	// 登录的回车事件
	$(window).keydown(function(event) {
    	if (event.keyCode == 13) {
    		$('.log-btn').trigger('click');
    	}
    });


	$(".form-data").delegate(".send","click",function () {
		var phone = $.trim($('#num2').val());
		if (checkPhone(phone)) {
			$.post(getRootPath() + "/message",{
				phone:phone
			},function(data){
				if (data.code == 0) {
					$('.num2-err').removeClass('hide').text(data.msg);
				} else {
					$('.num2-err').removeClass('hide').text(data.msg);
					// codenumber = JSON.parse(data.data).verCode;
					// console.log(codenumber);
				}
			},'json');
	       	var oTime = $(".form-data .time"),
			oSend = $(".form-data .send"),
			num = parseInt(oTime.text()),
			oEm = $(".form-data .time em");
		    $(this).hide();
		    oTime.removeClass("hide");
		    var timer = setInterval(function () {
		   	var num2 = num-=1;
	            oEm.text(num2);
	            if(num2==0){
	                clearInterval(timer);
	                oSend.text("重新发送验证码");
				    oSend.show();
	                oEm.text("120");
	                oTime.addClass("hide");
	            }
	        },1000);
		}
    });



});