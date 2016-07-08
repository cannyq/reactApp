var Db = require('./db/db');
Db.getWords(function(docs) {
	//console.log(JSON.stringify(docs));
	console.log(docs);
});
