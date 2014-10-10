$( document ).ready(function (){
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
});

