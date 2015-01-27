/*
 *
 *  Downloads and updates database
 *
 */
 
var loader = {
	cathegories: [],
	lastLevel: 0,
	builder: "",
	load: function() {
		if(localStorage.length == 0){
			localStorage.cathegories = -1;
			localStorage.parts = -1;
		} 
		
		if(dbversion.cathegories != localStorage.cathegories){
			console.log("downloading cathegories");
			$.get("data/cathegories.data",function(c){
				// save
				localStorage.cathegoriesObj = c;
				localStorage.cathegories = dbversion.cathegories;
				loader.loadCathegories(c);
			});
		}else{
			console.log("Loading locally stored cathegories");
			this.loadCathegories(localStorage.cathegoriesObj);
		}
		if(dbversion.parts != localStorage.parts){
			this.loadParts();
		}else{
			db.start();
		}
	},
	loadCathegories: function(c) {
	    c = c.split("\n");
	    for(var x = 0; x < c.length-1; x++){
	    	loader.loadCathegory(c[x]);
	    }
	    for(var x = 0; x < loader.lastLevel*2+1; x++){
	    	loader.builder += "</div>\n";
	    }
	    $("#cathegories").html(loader.builder);
	    $("#cathegories .cathegory:has(.cathegory-content)").addClass("super-cathegory").removeClass("cathegory").each(function(){
	    	$(this).prepend("<div class='cathegory-header'>"+$(this).attr("data").split(" ")[1]+"</div>");
	    });
	    $("#cathegories .cathegory").addClass("cathegory-leaf").removeClass("cathegory").each(function() {
	    	$(this).html($(this).attr("data").split(" ")[1]).attr("data-id",$(this).attr("data").split(":")[0]);
	    });
	    ui.initBars();
	},
	loadParts: function() {
		indexedDB.deleteDatabase("parts");
		db.start(function(){
			$.get("data/parts.data",function(p){
				p = p.split("\n");
				loader.loadPartRec(p);
			});
			localStorage.parts = dbversion.parts;
		});
	},
	loadPartRec: function(lines, id){
		if(id == undefined) id = 0;
		var line = lines[id];
		if(!line.match(/^\#/)){
			var vals = line.split("	");
			var name = vals[3];
			var cathegory = Number(vals[2]);
			var x = Number(vals[0]);
			var y = Number(vals[1]);
			if(name==undefined){
				if(id+1<lines.length)
					this.loadPartRec(lines,id+1);
			}else{
				db.addPart(name, cathegory, x, y, function(){
					if(id+1<lines.length)
						loader.loadPartRec(lines,id+1);
				});
			}
		}else if(id+1<lines.length)
			this.loadPartRec(lines,id+1);
	},
	loadCathegory: function(line){
		if(line.match(/^#/))return;
		if(localStorage.cathegoriesObj == undefined){
			localStorage.cathegoriesObj = Array();
		}
		var levels = line.split("	");
		var level = levels.length - 1;
		if(this.lastLevel > level){
			this.builder += "</div>\n</div>\n</div>\n";
		}else if(this.lastLevel < level){
			this.builder += "\n<div class=\"cathegory-content\">\n"
		}else{
			this.builder += "</div>\n";
		}
		this.builder += '<div class="cathegory" data="'+levels[level]+'">';
		this.lastLevel = level;
		
		var id = levels[level].split(":")[0];
		var name = levels[level].split(" ")[1];
		
		this.cathegories[Number(id)]=name;
	}
};

