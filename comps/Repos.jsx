import React from 'react'
import NavLink from './NavLink.jsx'

export default React.createClass({
	contextTypes: {
		router: React.PropTypes.object
	},
	handleSubmit(event) {
		event.preventDefault()
		const userName = event.target.elements[0].value
		const repo = event.target.elements[1].value
		const path = `/repos/${userName}/${repo}`
		this.context.router.push(path)
	},
  render() {
    return <div>
      <h2>Repos</h2>
      <ul>
        <li><NavLink to="/repos/user1/repo1">user1_repo1</NavLink></li>
        <li><NavLink to="/repos/user2/repo2">user2_repo2</NavLink></li>
        <li>
        	<form onSubmit={this.handleSubmit}>
        		<input type="text" placeholder="userName"/> / {' '}
        		<input type="text" placeholder="repo"/>{' '}
        		<button type="submit">Go</button>
      		</form>
    		</li>
      </ul>
      {/*will render 'Repo.js' when at /repos/:userName/:repoName */}
      {this.props.children}
    </div>
  }
})
