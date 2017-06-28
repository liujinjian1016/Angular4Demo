;(function(w){
    var oConf = {
        mode: 'dev',
        dev: {
            url1: webRoot+"/bankLogin/login",//登入接口
            url2: webRoot+"/bankLogin/getValidationCode",//获取验证码
            url3: webRoot+"/bankLogin/getResult",//网银登录状态接口
            url4: webRoot+"/bankInfo/getBankState",//银行可用状态接口
        },
        release:{
            url1:"",
            url2:"",
            url3:"",
            url4:"",
        },
        tip1: "请选择数据源",
        tip2: "请至少选择一个错误类型<br/>或输入具体的问题描述",
        tip3: "请填写对问题的描述",
        tip4: "请填写你的联系方式",
        tip5: "请填写你的联系方式，<br/>以便我们更好的为您服务",
        tip6: "正在提交",
        tip7: "提交成功",
        tip8: "提交失败，稍后再试",
        tip9: "请求超时，稍后再试",
        pic: "003.jpg",
        pop_t: 2500
    };
    w.oConf = oConf;
})(window);

window.oConf.mode = "dev";
