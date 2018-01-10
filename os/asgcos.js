var os = {};

window.ASGCOS = os;

//ASGCOS版本号
os.version = '0.0.1';
os.date = '2017-01-19';

//作者
os.author = {
	name: '傲世孤尘',
	blog: 'http://blog.aoshiguchen.com',
	qq: '1052045476'
};

//系统风格
os.system = 'win10';
os.getSystem = function(){
	switch(os.system){
		case 'win10': return os.Win10;
	}
};

//获取系统路径
os.getSystemPath = function(){
	return '/os/' + os.system + '/';
};

//获取系统资源文件的绝对路径
os.getAbsolutePathBySystemResource = function(path){
	return os.getSystemPath() + path;
}

os.apbsr = os.getAbsolutePathBySystemResource;

//动态加载JS文件
os.loadScript = function(url,callback){
	var el = document.createElement("script");
	el.type = "text/javascript";

	if(typeof(callback) != "undefined"){
		if (el.readyState) {
			el.onreadystatechange = function () {
				if (el.readyState == "loaded" || el.readyState == "complete") {
					el.onreadystatechange = null;
					callback();
				}
			};
		} else {
			el.onload = function () {
				callback();
			};
		}
	}

	el.src = url;
	document.head.appendChild(el);
};

//动态加载css样式
os.loadStyle = function(url,callback){
	var el = document.createElement("link");
	el.rel = 'stylesheet';

	if(typeof(callback) != "undefined"){
		if (el.readyState) {
			script.onreadystatechange = function () {
				if (el.readyState == "loaded" || el.readyState == "complete") {
					el.onreadystatechange = null;
					callback();
				}
			};
		} else {
			el.onload = function () {
				callback();
			};
		}
	}

	el.href = url;
	document.head.appendChild(el);
};

os.setTile = function(title){
	var el = document.createElement("title");
	el.text = title;
	document.head.appendChild(el);
};

os.setIcon = function(icon){
	var el = document.createElement("link");
	el.rel = 'Shortcut Icon';
	el.type = 'image/con';
	el.href = icon;
	document.head.appendChild(el);
}

os.onReady = {};
os.onReady.win10 = function(){
	//设置标题
	os.setTile('ASGC桌面');
	//设置图标
	os.setIcon('os/win10/img/icon/favicon.ico');
	//设置壁纸
    Win10.setBgUrl({
        main:'os/win10/img/wallpapers/main.jpg',
        mobile:'os/win10/img/wallpapers/mobile.jpg',
    });

    Win10.setAnimated([
        'animated flip',
        'animated bounceIn',
    ], 0.01);

    layer.open({
        type: 2,
        title: 'QQ群推荐',
        area: ['300px', '200px'],
        shade:0,
        offset: 'rt',
        content: './qq_group_recommend.html'
    });

    var content = $('#win10-shortcuts');
    var h=parseInt($("#win10 #win10-shortcuts")[0].offsetHeight/100);
    var x=0,y=0;

    shortcuts.forEach(function(item){
        var shortcut = $('<div class="shortcut animated flipInX"></div>');

        shortcut.css({
            left:x*82+10,
            top:y*100+10,
        });

        y++;
        if(y>=h){ 
            y=0; 
            x++;
        }

        if(item.mode == 'inside'){
            shortcut.attr('onclick','Win10.openUrl("' + item.url + '","<img class=\'icon\' src=\'' + item.icon + '\' />' + item.title + '")');
        }else{
            shortcut.attr('onclick','window.open("' + item.url + '")');
        }

        shortcut.append('<img class="icon" src="' + item.icon + '"/>');
        shortcut.append('<div class="title">' + item.name + '</div>');

        content.append(shortcut);
    });
};


//初始化
os.init = function(){

	if('win10' == os.system){
		os.loadStyle('os/win10/css/animate.css');
		os.loadStyle('lib/font-awesome-4.7.0/css/font-awesome.min.css');
		os.loadStyle('os/win10/css/default.css');

		os.loadScript('os/win10/js/desktop.js');
		os.loadScript('os/win10/js/win10.js',function(){
			os.Win10 = Win10;

			Win10.init();

		    os.onReady.win10();
		});
	}
	
};

os.init();