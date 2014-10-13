/*
 *
 *	Datastore součástek
 *
 */

var db = {
	cathegories: Array(),
	start: function(done) {
		var request = indexedDB.open("parts",8);
		request.onupgradeneeded = function(e) {
			ui.showMessage("Aktualizuji databázi...");
			console.log("Updating...");
			
			var db = e.target.result;

			// A versionchange transaction is started automatically.
			e.target.transaction.onerror = db.onerror;

			if(db.objectStoreNames.contains("parts")) {
				db.deleteObjectStore("parts");
			}
			if(db.objectStoreNames.contains("cathegories")) {
				db.deleteObjectStore("cathegories");
			}

			var objectStore = db.createObjectStore("parts",
			  	{keyPath: "timeStamp"}
			);
			objectStore.createIndex("name", "name", { unique: false });
			objectStore.createIndex("cathegory", "cathegory", { unique: false });
			
			objectStore = db.createObjectStore("cathegories",
			  	{keyPath: "timeStamp"}
			);
			objectStore.createIndex("id", "id", {unique: false});
			
			localStorage.parts = -1;
		}
		request.onsuccess = function(e) {
			ui.showMessage("Databáze byla načtena.");
			console.log("Success!");
			db.db = e.target.result;
			db.getAllItems();
			if(done==undefined){}else
			done();
		}
		request.onerror = db.onerror;
	},
	onerror: function(e) {
		ui.showMessage("Aktualizace databáze selhala.", true);
		console.log("Error!");
		console.dir(e);
	},
	addPart: function(name, cathegory, done){
		console.log("adding "+name+"@"+cathegory);
		var dtb = db.db;
		var trans = dtb.transaction(["parts"], "readwrite");
		var store = trans.objectStore("parts");
		var request = store.put({
			"name": name,
			"cathegory": cathegory,
			"timeStamp" : new Date().getTime()
		});

		trans.oncomplete = function(e) {
			console.log("done");
			if(done==undefined){}else
				done();
		};

		request.onerror = function(e) {
			console.log(e.value);
		};
	},
	getAllItems: function() {
		var trans = db.db.transaction(["parts"], "readwrite");
		var store = trans.objectStore("parts");

		// Get everything in the store;
		var keyRange = IDBKeyRange.lowerBound(0);
		var cursorRequest = store.openCursor(keyRange);

		cursorRequest.onsuccess = function(e) {
			var result = e.target.result;
			if(!!result == false)
			  return;

			console.log(result.value);
			result.continue();
		};

		cursorRequest.onerror = db.onerror;
	},
	showItemsInCat: function(cathegory, cb, lastloaded) {
		console.log("showing items in cat "+cathegory);
		var transaction = db.db.transaction('parts','readonly');
		var store = transaction.objectStore('parts');
		var index = store.index('cathegory');
		var request = index.openCursor(IDBKeyRange.only(cathegory));
		request.onsuccess = function(e){
			var cursor = e.target.result;
			if (cursor) {
				console.log(cursor.value);
				cb(cursor.value["name"], cursor.value.cathegory);
				cursor.continue();
			}else{
				lastloaded();
			}
		}
	},
}

