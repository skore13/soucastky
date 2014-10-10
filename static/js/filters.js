$( document ).ready(function (){
	$('#soucastky').isotope({
	  itemSelector: '.soucastka',
	  layoutMode: 'fitRows'
	});
	
	ui.filter = function (){
		$('#soucastky').isotope({ filter: function() {
			// Pokud je vybrána kategorie odfiltruj ty, co v ní nejsou (nebo v nich)
			var cathegory = $(this).find('.cathegory').text();
			var ret = true;
			var first = true;
			$("#cathegories").find(".selected").each(function() {
				if(first){
					first = false;
					ret = false;
				}
				if(cathegory==$(this).html())
					ret = true;
			});
			if(ret == false) return false;
			
			// Filtruj podle vyhledávacího pole
			var name = $(this).find('.name').text();
			var filter = $("#filter").val();
			return name.match(new RegExp(filter,"i"));
		} });
	}
	
	$(".cathegory-leaf").click(ui.filter);
	$("#filter").on("input",ui.filter);
	
	$("#filter").focusin(function(){
		$("#filter-div").addClass("focused");
	});
	$("#filter").focusout(function(){
		$("#filter-div").removeClass("focused");
	});
});
