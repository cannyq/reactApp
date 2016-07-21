// 07/02 Added body-parser to enable req.body
var express = require('express');
var app = express();
var path = require('path');
var compression = require('compression');
var bodyParser = require('body-parser'); // Needed for POST
var urlencodedParser = bodyParser.urlencoded( {extended: false});
var jsonParser = bodyParser.json();
var graphql = require('graphql');
var graphqlHTTP = require('express-graphql');

var gqlDocs={};
var docArr=[];
var wordsType = new graphql.GraphQLObjectType({
  name: 'words',
  fields: ()=>({
    _id: { type: graphql.GraphQLString},
    tra: { type: graphql.GraphQLString},
    chi: { type: graphql.GraphQLString},
    pin: { type: graphql.GraphQLString},
    eng: { type: graphql.GraphQLString},
    rel: { 
      type: new graphql.GraphQLList(wordsType),
      resolve: function (words) {
        console.log('words='+JSON.stringify(words));
        var rels=[];
        if (words) {
          rels = words.rel.map( item=>gqlDocs[item]);
        }
        console.log('rels='+JSON.stringify(rels));
        return rels;
      }
    }
  })
});
var schema = new graphql.GraphQLSchema( {
  query: new graphql.GraphQLObjectType( {
    name: 'Query',
    fields: {
      words: { // ?query={words(id:'6700'){chi,eng}}
        type: wordsType,
        args: { id: {type:graphql.GraphQLString} },
        resolve: function(_,args) { return gqlDocs[args.id]; }
      },
      list: { // ?query={list {chi,eng}}
        type: new graphql.GraphQLList(wordsType),
        resolve: function(source,args) { 
          return docArr;
        }
      },
      user: {
        type: new graphql.GraphQLList(wordsType),
        args: { id: {type:graphql.GraphQLString},
                date: {type:graphql.GraphQLString}},
        resolve: function(_,args) {
          console.log(args);
          return new Promise( function (Resolve, Reject) {
            Db.find( args.id, args.date, function( dayDocArr) {
              console.log('GraphQL found '+ dayDocArr.length + ' records.');
              Resolve(dayDocArr);
            });
          });
        }
      }
    }
  })
});
app.use('/graphql', graphqlHTTP({schema:schema, graphiql:true, pretty: true}));

app.use(bodyParser.json({type:'application/json'}));

app.use(compression()); // Must be first
app.use(express.static( path.join(__dirname, 'public'))); // For static css and html
var Db = require('./db/db');
app.get('/db', function( req, res) {
  console.log('Get: '+req.originalUrl);
  var days = parseInt(req.query.days);
  Db.find( req.query.date, days, function( docs) {
    res.send( docs);
    var arr = docs.map( item=>item.eng);
    console.log( 'Sent: '+arr);
  });
});
app.post('/db', jsonParser, function( req, res) {
  var obj = JSON.stringify(req.body);
  console.log('Post: '+obj);
  Db.insert( req.body, function( result) {
    var jsonStr = JSON.stringify(result);
    res.send( result);
    console.log( result);
  });
});
app.put('/db/:id', jsonParser, function( req, res) {
  console.log('Put: '+req.params.id +', '+JSON.stringify(req.body));
  Db.update( req.params.id, req.body, function( result) {
    var jsonStr = JSON.stringify(result);
    res.send( result);
    console.log( result);
  });
});
app.get('*', function (req, res) {
	console.log( 'Url: '+req.originalUrl)
	res.sendFile(path.join(__dirname, 'public', 'index.html'))
})
Db.findGql({}, function(gqlRes) {
  gqlDocs = gqlRes;
  console.log('Db.findGql read '+ Object.keys(gqlDocs).length + ' records.')
});
Db.find('SQ', null,function(res) {
  docArr = res;
  //console.log( docArr.filter(item=>item.rel!=undefined));
  console.log('Db.find got '+docArr.length+' records.');
});

const PORT = 3000; //8080 // process.env.PORT
app.listen( PORT, function() {
	console.log('Express server at localhost:' + PORT);
});