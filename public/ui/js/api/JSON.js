//function JSON(){}

/**
 * extends the JSON api with communications using jQuery getJSON and post
 */


/**
 * 
 * @param url
 * @param callback the callbacks data parameter contains an array "task_names"
 */

JSON.load = function (url,callback){
	//console.log( "loadTasks" );
	var jsonloader = JSON.getLoader(url);
	jsonloader.done(function(data){
		callback(data);
	});	
};


/**
 * load JSON formatted data usinf GET
 * @param url
 * @returns loader object where the done function can be redefined
 */
JSON.getLoader = function (url){
	var jsonloader = $.getJSON( url, function() {
		//console.log( "success" );
		})
		.done(function() {
			//console.log( "done" );
		})
		.fail(function(err) {
		console.log( "error reading: \n" + url);
		alert("error reading: " + url + "\n" +JSON.stringify(err));
		})
		.always(function() {
		//console.log( "complete" );
		});
	return jsonloader;
}

/**
 * Sends an JavaScript object as JSON formatted data using POST
 * @param url
 * @param data
 * @returns
 */
JSON.post = function (url,data){

	var jsonloader = $.post( url, data, function() {
		//console.log( "success" );
		})
		.done(function() {
		//console.log( "second success" );
		})
		.fail(function(err) {
			alert("error writing: \n" + url + "\n" +JSON.stringify(err));
		})
		.always(function() {
		//console.log( "complete" );
		});
	return jsonloader;
}

/**
 * Sends an JavaScript object as JSON formatted data using POST
 * @param url
 * @param data
 * @returns
 */
JSON.postObject = function (url,data){
	var value = {};
	var json = JSON.stringify(data);
	value["value"] = json;
	JSON.post(url,value);
}
