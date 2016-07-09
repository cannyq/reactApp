import React from 'react'
import { render } from 'react-dom'

import { Router, Route, browserHistory } from 'react-router'
import routes from '../comps/routes.jsx'
render(
  <Router routes={routes} history={browserHistory}/>,
  document.getElementById('app')
);
