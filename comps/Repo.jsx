import React from 'react'

export default React.createClass({
  render() { 
  	console.log('Repo')
  	return (
  	  <div>Repo <br/>
  		{this.props.params.userName} - {this.props.params.repoName}
      </div>
  )}
})