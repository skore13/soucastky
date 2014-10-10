var ui;
$( document ).ready(function (){
	if(Modernizr.websqldatabase) { // Podporujeme websql, můžeme načíst shim
		Modernizr.load({
		  test: Modernizr.indexeddb,
		  nope: 'dependencies/IndexedDBShim.min.js'
		});
	}

	if(Modernizr.websqldatabase || Modernizr.indexeddb){ // Můžeme pokračovat
		var openRequest = indexedDB.open("test",1);
			openRequest.onupgradeneeded = function(e) {
			ui.showMessage("Aktualizuji databázi...");
			console.log("Updating...");
		}
		openRequest.onsuccess = function(e) {
			ui.showMessage("Databáze byla načtena.");
			console.log("Success!");
			db = e.target.result;
		}
		openRequest.onerror = function(e) {
			ui.showMessage("Aktualizace databáze selhala.", true);
			console.log("Error!");
			console.dir(e);
		}
	} else { // Nepodporovaný prohlížeč
		ui.showMessage("Váš prohlížeč neumí vyžadované vlastnosti. Tato aplikace Vám nebude fungovat.",true);
	}
});
