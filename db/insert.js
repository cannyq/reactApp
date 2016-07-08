/* 06/30/2016 Insert documents separated by dates.
*/
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var fs = require('fs');
var rl = require('readline');

function CV_str_date( strDate) { // mm/dd
	var month_day = strDate.split('/');
	var month = parseInt(month_day[0]);
	var day = parseInt(month_day[1]);
	var date = new Date();
	var year = date.getYear()+1900;
	date = new Date( year, month-1, day, 12);
	return date;
}
function buildDoc(line, date) {
	var doc=null;
	var re = new RegExp('\\d+/\\d+');   // /\d+/\d+/;
	var arr = line.split(';');
	if (arr.length==1 && arr[0].search(re)>=0) {
		lastDate = CV_str_date(arr[0]);
		console.log( 'found date: '+arr[0]+', '+ lastDate);
	} else if (arr.length==3) {
		if (arr[0].length <= 4) {
			doc = { chi: arr[0].trim(), pin: arr[1].trim(), 
				      eng:arr[2].trim(), date: lastDate};
			++count;
		}
	}
	return doc;
}
function closeDb( db) {
	console.log( "Inserted "+count+" documents.");
	db.close();
}

var lastDate;
var count = 0;
const url = 'mongodb://localhost:27017/test';
var fileName = process.argv[2] || 'chinese.txt';

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server.");
	var lineReader = rl.createInterface( {input: fs.createReadStream( fileName)});
	lineReader.on('line', (line)=> {
		var date = new Date();
		date.setDate( date.getDate()-1);
		var doc = buildDoc(line, date);
		if (doc) {
			console.log(doc);
			db.collection('chi').insert( doc, (err,res)=>{
				assert.equal(null, err);
				console.log(res.result); //res.ops[0]
			});
		}
	}).on('close', ()=>setTimeout( closeDb, 500, db));

});

