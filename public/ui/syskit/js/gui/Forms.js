
/**
 * generates a html form from port information ready to be sent by sendForm()
 * @param taskname
 * @param actioninfo
 * @param id
 * @returns
 */
function generateForm(url,actioninfo,id){
	
	console.log(actioninfo)
	
	var form = document.createElement("form");
	//console.log(portinfo);
	form.setAttribute("action",url);
	form.setAttribute("method","post");
	form.setAttribute("id","form"+id);
	
	var table = document.createElement("table");
	form.appendChild(table);
	
	var headline = document.createElement("tr");
	table.appendChild(headline);
	var inputs = document.createElement("tr");
	table.appendChild(inputs);
	
	actioninfo.required_arguments.forEach(function(elem){
		var th = document.createElement("th");
		headline.appendChild(th);
		th.innerHTML=elem.name + "*";
		
		var td = document.createElement("td");
		
		var input = createInput(elem,true);
		input.setAttribute("required","");
		
		td.appendChild(input);
		
		inputs.appendChild(td);
		
	});
	
	actioninfo.optional_arguments.forEach(function(elem){
		var th = document.createElement("th");
		headline.appendChild(th);
		th.innerHTML=elem.name;
		
		var td = document.createElement("td");
		
		var input = createInput(elem,false);
		
		td.appendChild(input);
		
		inputs.appendChild(td);
	});
	
	return form;
}

function createInput(info,required){
	var input = document.createElement("input");
	input.setAttribute("name",info.name);
	input.setAttribute("type","text");
	input.setAttribute("value",info.default);
	input.setAttribute("title",info.doc);
	return input;
}


/**
 * send a html form as JSON data
 * numbers and values are normally encoded as strings JSON{"input name":"value"}
 * special data- attributes (html5) can be used to modify that behavior
 * <input name="myname" type="number" value="0">
 * results in JSON{"myname":"0"}
 * <input name="myname" type="number" value="0" data-typelibtypeclass="Typelib::NumericType">
 * results in JSON{"myname":0}
 * without quotes, which is parsed as number and not string on the api
 * 
 * the url is taken from the <form>s action attribute
 * 
 * @param id the html id of the <form> element
 * @param sendCallback callback function with two arguments (url,formdata)
 */
function sendForm(id, sendCallback){
	//console.log(id);
	//var form = document.forms[name];
	var form = document.getElementById(id);
	//console.log(form);
	var url = form.action;
	//http://stackoverflow.com/questions/1255948/post-data-in-json-format-with-javascript
	
	var formdata = {};
	for (var index = 0; index < form.length; index++){
		var input = form[index];
		
		formdata[input.name] = parseFloat(input.value);
	}	
	console.log(formdata);
	sendCallback(url,formdata);
}


