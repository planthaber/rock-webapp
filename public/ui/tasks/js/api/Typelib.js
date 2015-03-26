
function Typelib(){};

//type cache url->type
Typelib.types = {};

/**
 * caching wrapper for readTypeInfo(), in case the type was already requested, 
 * @param url
 * @param callback
 */
Typelib.getTypeInfoOf = function(url, callback){
	var type = Typelib.types[url];
	//console.log(types);
	if (typeof type == 'undefined'){
		//request
		//console.log("requesting type of port "+ url);
		Typelib.loadTypeInfo(url, callback);
	}else{
//		console.log(type);
		callback(type);
	}
}

/**
 * reads type information from url and returns on receive
 * @param url
 * @param callback callback function to call on receive of the information
 */
Typelib.loadTypeInfo = function(url, callback){
	JSON.load(url,function(data){
		Typelib.types[url] = data.port;
		//console.log(data);
		callback(data.port);
	});	
}


/**
 * return a javascript type that can be written to url
 * @param url
 * @param callback
 */
Typelib.getType = function(url, callback){
	Typelib.getTypeInfoOf(url, function(data){
		var type = {};
//		console.log(data);
		if (data.type.class == "Typelib::OpaqueType"){
			callback();
		}else if (data.type.class == "Typelib::NumericType"){
			type[data.name] = nil;
		}else if (data.type.class == "Typelib::CompoundType"){
			for (var index = 0;index < data.type.fields.length;index++){
				//console.log(data.type.fields[index].name);
				type[data.type.fields[index].name] = null;			
			}
		}
//		console.log(type);
		callback(type);
	});
	
}


/**
 * converts information read from a port to a string representation
 * @param portinfopreviously read port information (contains data type, e.g int32_t) 
 * @param type the type itseld, parsed from http://../read  
 * @param seperator a seperator passed to JSON.stringify
 * @returns string representing the data
 */

//var fileReader = new FileReader()


Typelib.getPortContentAsText = function(portinfo, data, seperator, callback){
	
	//some content we don't want to be displayed
	switch (portinfo.type.name){
	case "/RTT/extras/ReadOnlyPointer</base/samples/frame/Frame>":
		data.value.image = "display deactivated";
		break;
	case "/base/samples/Pointcloud":
		data.value.points = "display deactivated";
		data.value.colors = "display deactivated";
		break;

	}
	
//	console.log(data);
	
	if (data.mode=="binary"){
		Typelib.convertBinaryValues(data, function(converted){
			//console.log(portinfo.type.class);
			//convert time values
//			console.log(converted.value);

			Typelib.convertTimeValues(portinfo, converted.value);
			switch (portinfo.type.class){
			
				case "Typelib::NumericType": callback (converted.value); break;
				
				case "Typelib::CompoundType": callback(JSON.stringify(converted.value,null,seperator));break;
							
				default: callback(JSON.stringify(converted,null,seperator));break;
			}
		});
	}else{
		//console.log(portinfo.type.class);
		//convert time values
		Typelib.convertTimeValues(portinfo, data.value);
		switch (portinfo.type.class){
		
			case "Typelib::NumericType": callback (data.value); break;
			
			case "Typelib::CompoundType": callback(JSON.stringify(data.value,null,seperator));break;
						
			default: callback(JSON.stringify(data,null,seperator));break;
		}		
	}
};

Typelib.convertTimeValues = function(portinfo, data){
	if (portinfo.type.name == "/base/Time"){
//		console.log("found time");
		var date = new Date (data.microseconds/1000);
		data['readable'] = date.toLocaleString();
	}else if (portinfo.type.class == "Typelib::CompoundType"){
		portinfo.type.fields.forEach(function(entry){
			Typelib.convertTimeValues(entry, data[entry.name]);
		});
	}
};

//function unpack(rubypack){
//	switch (rubypack.pack_code){
//	case "C": 
//		console.log("got char array");
//		
//		return "0"; 
//		break;
//	case "E": console.log("got double litte endian array");return "0";break;
//	}
//}



Typelib.convertBinaryValues = function(data, callback){
	
	
	var list = [];
	list.push(data);
	

//	var workers = [];
	
	while (list.length){
		elem = list.pop();
		for (var prop in elem){
			if(!(typeof(elem[prop]) === 'undefined')) {
				if(!(typeof(elem[prop].pack_code) === 'undefined')) {
					//console.log(data[prop]);
//					console.log("found binary field" + prop);
//					console.log(elem[prop]);
					//var unpacked = Ruby.unpack(elem[prop]);

//					var promise = 
					Ruby.unpack(elem[prop], function(unpacked){
//						console.log(unpacked);
						elem[prop] = unpacked; 
//						console.log("converted " + prop);
//						console.log(unpacked);
//						console.log(elem[prop]);
					});	
					
//					workers.push(promise);
												
				}else if (typeof elem[prop] === 'object') {
					list.push(elem[prop]);
				}
			}
		}
	}
	
	//http://stackoverflow.com/questions/5627284/pass-in-an-array-of-deferreds-to-when
//	$.when.apply($, workers).done(function(){
//		console.log("done converting");
//		console.log(data);
		callback(data);	
//	});
	
	
};


