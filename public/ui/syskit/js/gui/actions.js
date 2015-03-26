



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

	
	this.startcallback = function (data){
		console.log(data)
	}
	
	this.startAction = function(actionnname){
		loadJSON(this.url+"/"+actionnname+"!/start",this.startcallback);
	}
	
	this.addActionDisplay = function (){
		var target = document.getElementById(id);
		//target.innerHTML = document.getElementById('Motion2DControl').innerHTML;
		target.innerHTML = getActionDisplayHTML(this.id);		
	};
	
	this.loadActions = function(url){
		var div = document.getElementById(this.id);
		var actions = this;
		JSON.load(this.url,function(data){
			//console.log(data);
			for (var actionname in data){
				if (data.hasOwnProperty(actionname)){		
					var a = document.createElement("a");
					var br = document.createElement("br");
					a.setAttribute("class","clickable");
					a.setAttribute("onclick","window['"+actions.id+"'].startAction('"+actionname+"')");
					a.innerHTML=actionname + "!";
					div.appendChild(a);

					var form = generateForm(actions.url+"/"+actionname+"!/start",data[actionname],actions.id+actionname);
					div.appendChild(form);
					
					var submit = document.createElement("input");
					submit.setAttribute("type","button");
					submit.setAttribute("value","submit");
					submit.setAttribute("onclick","sendForm(\"form"+actions.id+actionname+"\",JSON.postObject)")
					div.appendChild(submit); 
					
					
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


