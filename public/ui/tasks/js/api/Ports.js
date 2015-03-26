

function Ports(){}


//port info cache
var portinfo = {};

/**
 * Load port information of a specific task (use cache if ports information exists)
 * @param url base url (e.g. http://localhost:9292)
 * @param taskname
 * @param callback 
 */
Ports.getPorts = function (url, callback){
	
	var ports = portinfo[url];
	if (typeof ports == 'undefined'){
		
//		console.log("requesting ports of  "+ taskname);
		loadPorts(url,callback);

	}else{
		//console.log("loaded ports of  "+ taskname);
		callback(ports);
	}
};

/**
 * load port information from API
 * @param url base url (e.g. http://localhost:9292)
 * @param taskname
 * @param callback
 * @returns
 */
Ports.loadPorts = function (url, callback){
	//cached version of task information, ports may be already loaded by 
	getTaskInfo(url,function(taskdata){
		portinfo[url] = taskdata.model.ports;
		callback(taskdata.model.ports);
	});

};

/**
 * Load port information of a specific task (use cache if ports information exists)
 * @param url base url (e.g. http://localhost:9292)
 * @param taskname
 * @param callback 
 */
Ports.getPort = function (url, callback){
	
	var port = portinfo[url];
	if (typeof port == 'undefined'){
		
//		console.log("requesting ports of  "+ taskname);
		Ports.loadPort(url,callback);

	}else{
		//console.log("loaded ports of  "+ taskname);
		callback(port);
	}
};

/**
 * load port information from API
 * @param url base url (e.g. http://localhost:9292)
 * @param taskname
 * @param callback
 * @returns
 */
Ports.loadPort = function (url, callback){
		JSON.load(url,function(data){
			portinfo[url] = data.port;
			//console.log(data.task);
			callback(data.port);
		});
};



/**
 * read the data on the port
 * @param url base url (e.g. http://localhost:9292)
 * @param taskname
 * @param portname
 * @param command
 */
Ports.read = function (url,callback){
	var jsonportreader = JSON.getLoader( url );
	jsonportreader.done(function(data){
		callback(data[0]);
	});
	return jsonportreader;
}



