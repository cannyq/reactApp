var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/test';

function findDocs(db, collection, dateStr, tz, callback) {
	var date0 = new Date(dateStr); 
	var date1 = new Date(dateStr);
	date1.setDate(date1.getDate()+1);
	date0.setHours(date0.getHours()+tz);
	date1.setHours(date1.getHours()+tz);
	var query = {$and: [{date: {$gt: date0}}, {date: {$lt:date1}}] } 
	var cursor = db.collection( collection).find(query);
	cursor.toArray( function(err,docs) {
		assert.equal(err,null);
		callback(docs)
	});
}
module.exports = {
	find: function(dateStr, tz, callback, offset, limit) {
		MongoClient.connect(url, function(err, db) {
			assert.equal(null, err);
			findDocs(db, 'chi', dateStr, tz, function(docs) {
				if (callback) callback(docs)
				db.close();
			});
		});
	},
	insert: function(obj, callback) {
		MongoClient.connect(url, function(err, db) {
			if (err == null) {
				db.collection( 'chi').insert( obj, function(err,res) {
					// {acknowledged: true, insertedId: ObjectId('###...')}
					assert.equal(err,null);
					callback( {error: 'None', insertedIds: res.insertedIds});
					db.close();
				});
			} else {
				callback( { error: 'Unable to connect to db!'})
			}
		});
	},
	updateQuery: function(query, obj, callback) {
		MongoClient.connect(url, function(err, db) {
			if (err == null) {
				var col = db.collection('chi');
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
		MongoClient.connect(url, function(err, db) {
			if (err == null) {
				if (id==obj._id) {
					var col = db.collection('chi');
					var query = {_id: ObjectId(id)}; // id must be a string of 12 bytes or 24 hex characters.
					delete obj._id;
					delete obj.date;
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
