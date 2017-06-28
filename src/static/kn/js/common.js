(function(win){
	//根据银行代码判断银行名称
	function judgeBank(str){
		var bankName;
		switch(str){
			case 'ICBC' :bankName='工商银行';break;
			case 'CCB' : bankName='建设银行';break;
			case 'BOC' : bankName='中国银行';break;
			case 'BCOM' :bankName='交通银行';break;
			case 'CMB' : bankName='招商银行';break;
			case 'ABC' : bankName='农业银行';break;
			case 'CGB' : bankName='广发银行';break;
			case 'PINGAN' :bankName='平安银行';break;
			case 'CEB' : bankName='光大银行';break;
			case 'CMBC' :bankName='民生银行';break;
			case 'CIB' :bankName='兴业银行';break;
			case 'HUAXIA' :bankName='华夏银行';break;
			case 'CNCB' :bankName='中信银行';break;
			case 'PSBC' :bankName='邮储银行';break;
			case 'SPD' : bankName='浦发银行';break;
			case 'ALIPAY' :bankName='支付宝';break;
			case 'BOB' :bankName='北京银行';break;
			case 'NBCB' :bankName='宁波银行';break;
			case 'NJCB' :bankName='南京银行';break;
			case 'BEA' :bankName='东亚银行';break;
			case 'CITIBANK' :bankName='花旗银行';break;
			default :bankName="xx银行";break;
		}
		return bankName;
	}
	window.judgeBank=judgeBank;
})(window);