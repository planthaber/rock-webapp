

/**
 * 
 * @param url
 * @param callback the callbacks data parameter contains an array "task_names"
 */

function load(url,callback){
	//console.log( "loadTasks" );
	var loader = getLoader(url);
	loader.done(function(data){
		callback(data);
	});	
};


/**
 * load formatted data usinf GET
 * @param url
 * @returns Javascript object
 */
function get(url){
	var loader = $.get( url, function() {
		//console.log( "success" );
		})
		.done(function() {
			//console.log( "done" );
		})
		.fail(function(err) {
			alert("error reading: " + url + err);
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
function post(url,data){

	var loader = $.post( url, data, function() {
		//console.log( "success" );
		})
		.done(function() {
		//console.log( "second success" );
		})
		.fail(function(err) {
			alert("error writing: " + url + err);
		})
		.always(function() {
		//console.log( "complete" );
		});
	return loader;
}

