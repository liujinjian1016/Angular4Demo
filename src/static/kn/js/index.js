(function(win){
	var userId=$("#userId").val();
	var params = {"userId":userId};
	$.ajax({
		url:oConf[oConf.mode].url4,
		dataType:'json',
		type:'GET',
		data:params,
		success:function(data){
			if(data.status == '1'){
				data = data.data;
				jointBankEntry(data);
			}else{
				alert(data.message);
			}
		}
	});
	//拼接银行入口的字符串;
	function jointBankEntry(data){
		var bankArr=data.AvailableBankList,
			length=bankArr.length,
			i=0,
			str='',
			bankState,
			isDisplayEntry=false,
			j;
		for(;i<length;i++){
			bankState=bankArr[i].bankState;
			isDisplayEntry=false;
			for(j=0;j<bankState.length;j++){//判断银行接口是否可用
				if(bankState[j].isDisplayEntry==='true'){
					isDisplayEntry=true;
					break;
				}
			}
			//暂不支持支付宝
			if(bankArr[i].bankCode!=='ALIPAY'){
				str+='<li class="bankEntry-li '+(isDisplayEntry?'':'disable') +
					'"><a href="'+(isDisplayEntry?(bankArr[i].bankCode+'?userId='+userId+'"'):"javascript:;")+
					'"><span class="bankIcon '+bankArr[i].bankCode+
					'"></span><span class="bankName">'+judgeBank(bankArr[i].bankCode)+
					'</span><span class="entryIcon"></span></a></li>';
			}
		}
		$(".bankEntry").append(str);
	}
	//不可用银行入口点击提示该入口不可用
	$(".bankEntry").delegate("li.disable","click",function(){
		alert("该银行入口暂时不可用！");
	});
})(window);