// 07/02 Added body-parser to enable req.body
var express = require('express')
var app = express()
var path = require('path')
var compression = require('compression')
var bodyParser = require('body-parser') // Needed for POST
//require('node-jsx').install();

var urlencodedParser = bodyParser.urlencoded( {extended: false})
var jsonParser = bodyParser.json()
app.use(bodyParser.json({type:'application/json'}))

app.use(compression()) // Must be first
app.use(express.static( path.join(__dirname, 'public'))) // For static css and html
var Db = require('./db/db')
app.get('/db', function( req, res) {
  console.log('Get: '+req.originalUrl);
  var timezone = (new Date()).getTimezoneOffset()/60;
  Db.find( req.query.date, timezone, function( docs) {
    res.send( docs);
    var arr = docs.map( item=>item.eng);
    console.log( 'Sent: '+arr);
  })
})
app.post('/db', jsonParser, function( req, res) {
  console.log('Post: '+JSON.stringify(req.body));
  Object.assign( req.body, {date: new Date()});
  Db.insert( req.body, function( result) {
    var jsonStr = JSON.stringify(result);
    res.send( result);
    console.log( result);
  })
})
/*
app.put('/db', jsonParser, function( req, res) { // ?chi=123
  console.log('Put: '+ JSON.stringify(req.query) +', '+JSON.stringify(req.body));
  Db.updateQuery( req.query, req.body, function( result) {
    var jsonStr = JSON.stringify(result);
    res.send( result);
    console.log( result);
  })
}) */
app.put('/db/:id', jsonParser, function( req, res) {
  console.log('Put: '+req.params.id +', '+JSON.stringify(req.body));
  Db.update( req.params.id, req.body, function( result) {
    var jsonStr = JSON.stringify(result);
    res.send( result);
    console.log( result);
  })
})
app.get('*', function (req, res) {
	console.log( req.originalUrl)
	res.sendFile(path.join(__dirname, 'public', 'index.html'))
})
const PORT = 3000; //8080 // process.env.PORT
app.listen( PORT, function() {
	console.log('Express server at localhost:' + PORT);
})