/*
 *
 *	Script starající se o zobrazení a chování postraní a horní lišty (kategorie a vyhledávání)
 *  + velikost oblasti pro součástky (podle velikosti postraního panelu)
 *
 */
 
ui.initBars = function (){
	/*************
	 *  Appearance
	 *************/
	$(".cathegory-content").each(function(){
		$(this).prepend("<div style=\"float:left;\"><img src=static/img/bar.png style=\"position:relative; left:-15px; height:"+$(this).height()+"px; width:2.5px\"></div>");
	});
	$(".cathegory-leaf").click(function (){
		$(this).toggleClass("selected");
	});
	function clearSelection() {
	  var sel ;
	  if(document.selection && document.selection.empty){
		document.selection.empty() ;
	  } else if(window.getSelection) {
		sel=window.getSelection();
		if(sel && sel.removeAllRanges)
		  sel.removeAllRanges() ;
	  }
	}
	$('[class^=cathegory]').click(clearSelection);
	
	$('.cathegory-header').click(function (){
		$(this).next(".cathegory-content").slideToggle({
			duration:200,
			step: function(now,fx){
				var superctg = $(this).parent();
				while(superctg.hasClass("super-cathegory")){
					superctg.find("img:first").css("height",0);
					superctg.find("img:first").css("height",superctg.children(".cathegory-content:first").height());
					superctg = superctg.parent().parent();
				}
			},
			done: function () {
				$(this).parent().children(".cathegory-content").find(".cathegory-content").css("display","none");
			}
		});
	});
	
	$( window ).resize(function (){
		if($("#sidebar").css("display")=="none"){
			$("#main-content").width($("body").width());
		}else{
			$("#main-content").width($("body").width()-$("#sidebar").width()-40);
		}
		$('#soucastky').isotope();
		$("#sidebar").height(100);
		$("#sidebar").height($("html").height());
	});
	$( window ).resize();
	
	/*************
	 *  Events
	 *************/
	
	$(".cathegory-leaf").click(function(){
		if($(this).is(".selected")){
			db.showItemsInCat(
				Number($(this).attr("data-id")),
				function(name, cat){ui.addPart(name,cat,true);},
				function(){ui.appendIt();}
			);
		}else{
			db.showItemsInCat(
				Number($(this).attr("data-id")),
				function(name,cat){ui.removePart(name,cat)},
				function(){$("#soucastky").isotope('layout');}
			);
		}
		ui.filter();
	});
	$("#filter").on("input",ui.filter);
	
	$("#filter").focusin(function(){
		$("#filter-div").addClass("focused");
	});
	$("#filter").focusout(function(){
		$("#filter-div").removeClass("focused");
	});
	
	ui.initParts();
};

