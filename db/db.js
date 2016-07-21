var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
const URL = 'mongodb://localhost:27017/test';
const COLL = 'chi';

function genId(chi) {
	//console.log(chi);
	var len = chi.length;
	var str='';
	for (var i=0; i<len; ++i) {
		str += chi.charCodeAt(i).toString(16);
	}
	return str;
}

function findDocs(db, collection, user, dateStr, callback) {
	let qUser = {user:user};
	let query;
	if (dateStr==undefined) {
		query = qUser;
	} else {
		let date0 = new Date(dateStr); // T=07:00:00.000Z
		let date1 = new Date(dateStr); 
		date1.setDate(date1.getDate()+1);

		// mongodb stores in ISO Date Time which add timezone to current time.
	  var tz = (new Date()).getTimezoneOffset()/60;
		date0.setHours(date0.getHours()+tz);
		date1.setHours(date1.getHours()+tz);

		let qDate0 = {date: {$gt: date0}};
		let qDate1 = {date: {$lt: date1}};
		query = {$and: [qUser, qDate0, qDate1] } 
  }
  console.log('findDocs: q='+JSON.stringify(query));
	var cursor = db.collection( collection).find(query);
	cursor.toArray( function(err,docs) {
		assert.equal(err,null);
		callback(docs);
	});
}
module.exports = {
	find: function(user, dateStr, callback) {
		// user/:id?date='01-01-2016'
		// user/:id/:wordNum
		MongoClient.connect(URL, function(err, db) {
			assert.equal(null, err);
			findDocs(db, COLL, user, dateStr, function(docs) {
				if (callback) callback(docs)
				db.close();
			});
		});
	},
	findGql: function(query, callback) {
		// graphql?query={ user(id:'cq',date:'01/01/2016') {chi,eng} }
		MongoClient.connect(URL, function(err, db) {
			assert.equal(null, err);
			var cursor = db.collection( COLL).find(query);
			var gqlObj={};
			cursor.each( function(err,doc) {
				assert.equal(err,null);
				if (doc==null) {
					callback(gqlObj);
					db.close();
				} else {
					//console.log(doc._id);
					gqlObj[doc._id] = doc;
					//Object.assign( gqlObj, { doc._id: doc});
				}
			});
		});
	},
	insert: function(obj, callback) {
		MongoClient.connect(URL, function(err, db) {
			if (err == null) {
				//console.log( 'Insert: '+JSON.stringify(obj));
				Object.assign( obj, { _id: genId(obj.chi)});
				if (obj.date == undefined) {
			  	Object.assign( obj, {date: new Date()});
			  }
				db.collection( COLL).insert( obj, function(err,res) {
					if (err == null) {
						callback( {error: 'None', insertedIds: res.insertedIds});
					} else if (err.code == 11000) {
						callback( {error: 'Duplicate key'})
					} else {
						callback( {error: err.message})
					}
					db.close();
				});
			} else {
				callback( { error: 'Unable to connect to db!'})
			}
		});
	},
	updateQuery: function(query, obj, callback) {
		MongoClient.connect(URL, function(err, db) {
			if (err == null) {
				var col = db.collection(COLL);
			  if (Object.keys(query).length > 0) {
					col.update( query, {$set: obj}, function(err,res) {
						assert.equal(err,null);
						callback( {error: 'None', result: res.result});
						db.close();
					});
				} else {
					callback( { error: 'Query is {}'});
				}
			} else {
				callback( { error: 'Unable to connect to db!'});
			}
		});
	},
	update: function(id, obj, callback) {
		MongoClient.connect(URL, function(err, db) {
			if (err == null) {
				if (id==obj._id) {
					var col = db.collection(COLL);
					// ObjectId(id) must be a string of 12 bytes or 24 hex characters.
					var query = {_id: id};
					delete obj._id; // Don't need the original
					delete obj.date; // Don't update the original date
					col.update( query, {$set: obj}, function(err,res) {
						assert.equal(err,null);
						callback( {error: 'None', result: res.result});
						db.close();
					});
				} else {
					console.log('error');
					callback( { error: 'id '+id+' != _id '+ obj._id});
				}
			} else {
				console.log( 'error');
				callback( { error: 'Unable to connect to db!'});
			}
		});
	}
}
