import React from 'react'
import { Router, Route, IndexRoute, IndexLink, browserHistory } from 'react-router'
import { render } from 'react-dom'
import NavLink from './NavLink.jsx'

var App = React.createClass({
  render() {
    return (
      <div>
        <ul id="menu">        
          <li><IndexLink to="/" activeClassName="active">Home</IndexLink></li>
          {/*<li><NavLink to="/about">About</NavLink></li>
          <li><NavLink to="/repos">Repos</NavLink></li> */}
          <li><NavLink to="/vocab">Vocabulary</NavLink></li>
          <li><NavLink to="/insert">Insert</NavLink></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
})
module.exports = App
