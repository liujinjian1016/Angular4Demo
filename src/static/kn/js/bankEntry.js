(function(win){
	var sessionId="";//sessionId 第一次请求时为空字符串，请求失败再次请求也为空
	//表单提交项全部重置，短信验证码，动态码，验证码全部隐藏
	function setFormItem(text,entry,loginNameType){
		$("input[name='entry']").attr('value',entry);
		$("input[name='loginNameType']").attr('value',loginNameType);
		$("#loginName").val('').attr("placeholder",text);
		$("#password").val('');
		$("#auch-code").val('').parent(".form-item").addClass("hide");
		$("#dynamic-password").val('').parent(".form-item").addClass("hide");
		$("#phone-code").val('').parent(".form-item").addClass("hide");
		sessionId='';
	}
	//切换登录导航项
	$(".nav-span").on("click",function(){
		var $this=$(this),
			text=$this.attr('data-text')||$this.text(),
			subNav,entry,loginNameType;
		if($this.hasClass("select")){
			return ;
		}
		subNav=$this.attr("data-subNav");
		entry=$this.attr("data-entry");
		loginNameType=$this.attr("data-loginNameType");
		$(".subNav").addClass("hide");
		if(subNav){
			text=$(".subNav[data-subNav='"+subNav+"']").find(".subNav-span").text();
			$(".subNav[data-subNav='"+subNav+"']").removeClass("hide");
		}
		$this.addClass("select").siblings(".nav-span").removeClass("select");
		setFormItem(text,entry,loginNameType);
	});
	//子导航点击事件
	$(".subNav").on("click",function(e){
		e.stopPropagation();
		$(".subNav-ul").toggleClass("show");
	});
	$(".subNav-ul>li").on("click",function(e){
		var $this=$(this),
			text=$this.text(),
			entry,loginNameType;
		e.stopPropagation();
		$(".subNav-span").text(text);
		entry=$this.attr("data-entry");
		loginNameType=$this.attr("data-loginNameType");
		$this.parent("ul").removeClass("show");
		setFormItem(text,entry,loginNameType);
	});
	$("body").on("click",function(e){
		$(".subNav-ul").removeClass("show");
	});
	//提交表单
	$(".submit-btn").on("click",function(){
		var user=$("#loginName").val(),
			psw=$("#password").val(),
			entry=$("input[name='entry']").val(),
			loginNameType=$("input[name='loginNameType']").val(),
			bankCode=$("input[name='bankCode']").val(),
			verifyTypeArr=$(".form-item[data-verifyType]"),
			verifyType="",
			verifyCode="";
		for(var i=0;i<verifyTypeArr.length;i++){
			verifyType+=verifyTypeArr.eq(i).hasClass("hide")?"":verifyTypeArr.eq(i).attr("data-verifyType")+",";
			verifyCode+=verifyTypeArr.eq(i).hasClass("hide")?"":verifyTypeArr.eq(i).find("input").val()+",";
		}
		verifyType=verifyType.slice(0,-1);
		verifyCode=verifyCode.slice(0,-1);
		//配置表单需要的参数
		entryBank({
			productName:'iphone-jiufu',
			productVersion:'5.3.0',
			logon:JSON.stringify({
				loginName:user,
				password:psw,
				verifyType:verifyType,
				verifyCode:verifyCode,
				bankCode:bankCode,
				idCardNo:'362329199004016135',
				udid:'123',
				houseName:'张XX',
				phone:'13528804672',
				cooperationCode:'11111'
			}),
			loginNameType:loginNameType,
			protocolVersion:'3.0',
			entry:entry,
			sessionId:sessionId,
			iv:''
		});
	});
	//登入请求
	function entryBank(parms){
		$.ajax({
			url:oConf[oConf.mode].url1,
			data:parms,
			type:'POST',
			dataType:'json',
			timeout:60000,
			success:function(data){
				if(sessionId!==data.sessionId){
					sessionId=data.sessionId;
				}
				if(parseInt(data.resultCode)===0){
					alert("登入成功");
					location.href="index.html";
				}else if(parseInt(data.resultCode)===8){
					entryBankStatus();
				}
				if(data.resultSuccess==='false'){
					alert(data.resultCodeDescription);
					sessionId="";
					console.log("登入失败！");
				}
				
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				alert(XMLHttpRequest.readyState + XMLHttpRequest.status + XMLHttpRequest.responseText);  
			},
			complete:function(){
				console.log("登入接口请求完成");
			}
		});
	}
	//网银登录状态接口
	function entryBankStatus(){
		$.ajax({
			url:oConf[oConf.mode].url3,
			data:{sessionId:sessionId},
			type:'POST',
			dataType:'json',
			timeout:60000,
			success:function(data){
				if(data.resultSuccess==='true'){
					if(data.resultCode==='0'){
						alert("登入成功");
						location.href="index.html";
					}else if(data.resultCode==='9'&&data.verifyType!==""){
						var verifyTypeArr=data.verifyType.split(",");
						for(var i=0;i<verifyTypeArr.length;i++){
							if(parseInt(verifyTypeArr[i])===0){
								$("#auch-code").parents(".form-item").removeClass("hide");
								getCodeImage($("input[name='bankCode']").val(),$("input[name='entry']").val(),sessionId);
							}
							if(parseInt(verifyTypeArr[i])===1){
								$("#dynamic-password").parents(".form-item").removeClass("hide");
							}
							if(parseInt(verifyTypeArr[i])===2){
								$("#phone-code").parents(".form-item").removeClass("hide");
							}
						}
					}else if(data.resultCode==='8'){
						setTimeout(function(){
							entryBankStatus();
						},1000);
						
					}
				}else{
					alert(data.resultCodeDescription);
					sessionId="";
					console.log("网银登录状态接口请求失败");
				}
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				alert(XMLHttpRequest.readyState + XMLHttpRequest.status + XMLHttpRequest.responseText);
			},
			complete:function(){
				console.log("网银登录状态接口请求完成");
			}
		});
	}
	//获取验证码
	function getCodeImage(bankCode,entry,sessionId){
		$.ajax({
			url:oConf[oConf.mode].url2,
			data:{
				bankCode:bankCode,
				entry:entry,
				sessionId:sessionId
			},
			type:'POST',
			dataType:'json',
			success:function(data){
				if(parseInt(data.resultCode)===0){
					$("#auch-code-img").attr("src","data:image/png;base64,"+ data.validationCodeImage);
				}
			}
		});
	}
})(window);