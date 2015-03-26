
function WebSockets(){}

WebSockets.websockets = {};

WebSockets.WebSock = function(url, recvcallback){
	
	this.url = url; 
	var ws = new WebSocket(url);
	
	var msock = this;
	ws.onmessage = function(event) { 
		msock.onmessage(event);
	};
	ws.onclose = function(event) {
		msock.onclose(event);
	};
	ws.onopen = function() {
		msock.onopen();
	};

	this.send = function(message) {
		ws.send(message);
	};

	this.sendJSON = function(message) {
		console.log("sendjson");
		console.log(message);
		ws.send(JSON.stringify(message));
		console.log("sendjson done");
	};
	
	this.close = function(){
		ws.close();
	}
	
	this.onopen = function(){
		console.log("connected...");
	}
	
	this.onclose = function(event){
		console.log("Closed - code: " + event.code + ", reason: " + event.reason + ", wasClean: " + event.wasClean);
		WebSockets.delete(this.url);
	}
	
	this.onmessage = function(event){
		//console.log(evt.data);
		if (!(typeof recvcallback === 'undefined')){
			recvcallback(JSON.parse(event.data));
		};	
	}
	
};


WebSockets.delete = function(readurl){
	var websock = WebSockets.get(readurl);
	if (!(typeof websock === 'undefined')){
		websock.close();
		delete WebSockets.websockets[readurl];
	}
}


WebSockets.create = function (url, callback){
	WebSockets.delete(url);
	WebSockets.websockets[url] = new WebSockets.WebSock(url,callback);
	return WebSockets.websockets[url]
};

WebSockets.get = function (url){
	return WebSockets.websockets[url];
}

WebSockets.sendJSON = function (url,data){
	var ws = WebSockets.get(url);
	if (typeof ws === 'undefined'){
		console.log("generating ws: " + url);
		ws = WebSockets.create(url);
		var mdata = data;
		//wait for connection before sending
		ws.onopen = function(){
			ws.sendJSON(mdata);
			//set function back
			ws.onopen = function(){};
		};
		return;
	}
	ws.sendJSON(data);
}
