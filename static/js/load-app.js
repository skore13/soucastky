/*
 *
 *	Spouští scripty na ready eventu.
 *
 */

$( document ).ready(function (){
	if(Modernizr.websqldatabase) { // Podporujeme websql, můžeme načíst shim
		Modernizr.load({
		  test: Modernizr.indexeddb,
		  nope: 'dependencies/IndexedDBShim.min.js'
		});
	}

	if((Modernizr.websqldatabase || Modernizr.indexeddb) && Modernizr.localstorage){ // Můžeme pokračovat
		$("#main-content, #sidebar").show();
		loader.load();
	} else { // Nepodporovaný prohlížeč
		ui.showMessage("Váš prohlížeč neumí vyžadované vlastnosti. Tato aplikace Vám nebude fungovat.",true);
	}
});
