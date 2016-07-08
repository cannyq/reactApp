/*var React = require('react')
var Route = require('react-router').Route
var IndexRoute = require('react-router').IndexRoute
var App = require('./App.jsx')
var Home = require('./Home.jsx')
var About = require('./About.jsx')
var Repos = require('./Repos.jsx')
var Repo = require( './Repo.jsx')*/
import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from   './App.jsx'
import Home from  './Home.jsx'
import About from './About.jsx'
import QTable from './QTable.jsx'
import QUpdate from './QUpdate.jsx'
import QInsert from './QInsert.jsx'
import Repos from './Repos.jsx'
import Repo from  './Repo.jsx'

module.exports = (
	<Route path="/" component={App}>
	  <IndexRoute component={Home}/>
	  <Route path="/about" component={About} />
	  <Route path="/vocab" component={QTable} />
	  <Route path="/update/:id" component={QUpdate} />
	  <Route path="/insert" component={QInsert} />
	  <Route path="/repos" component={Repos} >
	    <Route path="/repos/:userName/:repoName" component={Repo} />
	  </Route>
	</Route>
)
