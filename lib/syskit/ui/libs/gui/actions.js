



function actions(url,id){
	window[id] = new ActionDisplay(url,id);
	
	
	window[id].addActionDisplay();
	
	window[id].loadActions(url);

}


function ActionDisplay(url, id){
	this.id = id;
	this.Frame = {};
	this.url = url;
	this.image;
	this.canvas;
	this.ctx;
	
	var actionDisplay = this;
	
	
	this.addActionDisplay = function (){
		var target = document.getElementById(id);
		//target.innerHTML = document.getElementById('Motion2DControl').innerHTML;
		target.innerHTML = getActionDisplayHTML(this.id);		
	};
	
	this.loadActions = function(url){
		var div = document.getElementById(this.id);
		loadJSON(url,function(data){
			console.log(data);
			for (var key in data){
				if (data.hasOwnProperty(key)){
					console.log(key);		
					var a = document.createElement("a");
					var br = document.createElement("br");
					a.setAttribute("href",url+"/"+key+"/start")
					a.innerHTML=key + "!";
					div.appendChild(a);
					div.appendChild(br);
				}
			};
		});
	};

	
	return this;
}


function getActionDisplayHTML(id){
	var html = '\
<div id='+id+'> \
</div> ';
	return html;
};


