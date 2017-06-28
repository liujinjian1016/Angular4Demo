/*
*rem 适配方法
*/
(function(win){
	var doc = win.document;
    var docEl = doc.documentElement;
    var tid;
	function resize(){
		var w = docEl.getBoundingClientRect().width,
			W=640;
		if(w>W){
			w=640;
		}
		docEl.style.fontSize=w/W*40+"px";
	}
	resize();
	win.onresize=function(){
		resize();
	};
	win.addEventListener('pageshow', function(e) {
        if (e.persisted) {
            clearTimeout(tid);
            tid = setTimeout(resize, 300);
        }
    }, false);	
})(window);