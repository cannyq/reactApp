/* 06/30/2016 Insert documents separated by dates.
*/
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var fs = require('fs');
var rl = require('readline');

function closeDb( db) {
	console.log( "Inserted "+count+" documents.");
	db.close();
}
function genId(chi) {
	var len = chi.length;
	var str='';
	for (var i=0; i<len; ++i) {
		str += chi.charCodeAt(i).toString(16);
	}
	return str;
}

var count = 0;
const url = 'mongodb://localhost:27017/test';
var fileName = process.argv[2] || 'chi.json'

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server.");
	var lineReader = rl.createInterface( {input: fs.createReadStream( fileName)});
	lineReader.on('line', (line)=> {
		var obj = JSON.parse(line);

		var dateStr = obj.date.$date;
		var date = new Date(dateStr);
		delete obj.date;

		delete obj._id;
		Object.assign(obj, {_id: genId(obj.chi)})
		Object.assign(obj, {date: date})

		console.log(obj);
		db.collection('chinese').insert( obj, (err,res)=>{
			assert.equal(null, err);
			console.log(res.result); //res.ops[0]
			++count;
		});

	}).on('close', ()=>setTimeout( closeDb, 500, db));

});

