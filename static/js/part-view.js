/*
 *
 *	Script starající se o zobrazení a chování oblasti se součástkami
 *
 */

ui.initParts = function (){
	$('#soucastky').isotope({
	  itemSelector: '.soucastka',
	  layoutMode: 'fitRows'
	});
};

ui.filter = function (){
	$('#soucastky').isotope({ filter: function() {
		// Filtruj podle vyhledávacího pole
		var name = $(this).find('.name').text();
		var filter = $("#filter").val();
		return name.match(new RegExp(filter,"i"));
	} });
}
ui.toBeAppended = "";
ui.addPart = function(name, cathegory, wait) {
	ui.toBeAppended+='<div class="soucastka" id="soucastka-'+name.replace(" ","-")+'"> \
				<div class="name">'+name+'</div> \
				<div class="cathegory">'+loader.cathegories[Number(cathegory)]+'</div> \
			  </div>';
	if(wait){
	}else{
		appendIt();
	}
};
ui.appendIt = function() {
	var item = $(ui.toBeAppended);
	$("#soucastky").append(item).isotope( 'appended', item );
	ui.toBeAppended = "";
}
ui.removePart = function(name, cathegory) {
	$("#soucastky").isotope("remove",$("#soucastka-"+name.replace(" ","-")));
}
