
function Ruby(){}

Ruby.unpack = function(rubydata, callback){
	
	
	
	//convert base64 to utf-8
	var data = window.atob(rubydata.data);
	
	//create a buffer of the correct size
	var buffer = new ArrayBuffer(data.length);
	
	//view to fill the ArrayBuffer with uint8
	var inview = Uint8Array(buffer);
	
	//fill the buffer
	for (var i = 0;i<=data.length;i++){
		inview[i] =  data.charCodeAt(i);
	
	}
	
	//return a view according to the given pack code 
	switch (rubydata.pack_code){
	case "C": 
		var view = Uint8Array(buffer);
		callback(view);
		break;
	case "E":
		var view = Float64Array(buffer);
		callback(view);
		break;
	default:
		callback('undefined');
		break;
				
	};	
};
