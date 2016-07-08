/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';

	var express = __webpack_require__(1);
	var path = __webpack_require__(2);
	var compression = __webpack_require__(3);
	var app = express();
	var React = __webpack_require__(4);
	//require('babel-core/register')({	presets: ['es2015', 'react']})
	//require('node-jsx').install();

	/*var renderToString = require ('react-dom/server').renderToString;
	var match = require('react-router').match;
	var RouterContext = require('react-router').RouterContext;
	var routes = require('./comps/routes.jsx') */

	app.use(compression()); // Must be first
	app.use(express.static(path.join(__dirname, 'public'))); // For static css and html

	app.get('*', function (req, res) {
	  /*match( { routes: routes, location: req.url }, (err, redirect, props) => {
	  	//const appHtml = renderToString(<RouterContext {...props}/>)
	  	//const appHtml = renderToString( React.createElement(RoutingContext, props));
	  	res.send( renderPage(appHtml))
	  }) */
	  console.log(req.originalUrl);
	  res.sendFile(path.join(__dirname, 'public', 'index.html'));
	});
	function renderPage(appHtml) {
	  return '\n    <!doctype html public="storage">\n    <html>\n    <meta charset=utf-8/>\n    <title>My First React Router App</title>\n    <link rel=stylesheet href=/index.css>\n    <div id=app>' + appHtml + '</div>\n    <script src="/bundle.js"></script>\n   ';
	}
	var PORT = 8080; // process.env.PORT
	app.listen(PORT, function () {
	  console.log('Express server at localhost:' + PORT);
	});
	/* WEBPACK VAR INJECTION */}.call(exports, ""))

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("compression");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("react");

/***/ }
/******/ ]);