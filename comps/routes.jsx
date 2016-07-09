import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from   './App.jsx'
import Home from  './Home.jsx'
import About from './About.jsx'
import QTextarea from './QTextarea.jsx'
import VocabTable from './VocabTable.jsx'
import QUpdate from './QUpdate.jsx'
import QInsert from './QInsert.jsx'
import Repos from './Repos.jsx'
import Repo from  './Repo.jsx'

module.exports = (
	<Route path="/" component={App}>
	  <IndexRoute component={QTextarea}/>
	  <Route path="/about" component={About} />
	  <Route path="/vocab" component={VocabTable} />
	  <Route path="/update/:id" component={QUpdate} />
	  <Route path="/insert" component={QInsert} />
	  <Route path="/repos" component={Repos} >
	    <Route path="/repos/:userName/:repoName" component={Repo} />
	  </Route>
	</Route>
)
