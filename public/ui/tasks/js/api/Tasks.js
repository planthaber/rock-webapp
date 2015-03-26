
function Tasks(){};


Tasks.taskinfo = {};

Tasks.getInfo = function(url, callback){

	var task = Tasks.taskinfo[url];
	if (typeof task === 'undefined'){	
//		console.log("requesting task info of  "+ url);
		Tasks.loadInfo(url, callback)

	}else{
//		console.log(task);
		callback(task);
	}
};

Tasks.loadInfo  = function(url, callback){

	JSON.load(url,function(data){
		Tasks.taskinfo[url] = data.task;
		//console.log(data.task);
		callback(data.task);
	});
};
