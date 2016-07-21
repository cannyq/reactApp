/* mongoexport --db test --collection chinese --out chinese.json
   06/30/2016 Insert documents separated by dates.
   07/11/2016 Add user
              Usage: node import <user> <in_file> <out_db>
*/
const USER = process.argv[2] || 'SQ';
const IN_FILE_NAME = process.argv[3] || 'chinese.json';
const OUT_DB = process.argv[4] || 'chi';

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
function CV_del_date(obj) {
	var dateStr = obj.date.$date;
	var date = new Date(dateStr);
	delete obj.date;
	return date;
}

var count = 0;
const url = 'mongodb://localhost:27017/test';

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server.");
	var lineReader = rl.createInterface( {input: fs.createReadStream( IN_FILE_NAME)});
	lineReader.on('line', (line)=> {
		var obj = JSON.parse(line);

		//delete obj._id;
		//Object.assign(obj, {_id: genId(obj.chi)})
		Object.assign(obj, {user: USER, date: CV_del_date(obj)})

		console.log(obj);
		db.collection(OUT_DB).insert( obj, (err,res)=>{
			assert.equal(null, err);
			console.log(res.result); //res.ops[0]
			++count;
		});

	}).on('close', ()=>setTimeout( closeDb, 500, db));

});

