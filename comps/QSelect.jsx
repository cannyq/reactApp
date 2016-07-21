var React = require('react')
var globals = require('../client/globals')

module.exports = React.createClass( {
	getInitialState: function() {
		return {sel: globals.user}
	},
	On_change: function(event) {
		globals.user = event.target.value
		this.setState( {sel: globals.user})
		console.log(globals.user)
	},
	render: function() {
		return (<select value={this.state.sel} className='QSel' onChange={this.On_change}>
			<option value='SQ'>SQ</option>
			<option value='CQ'>CQ</option>
		</select>)
	}
})
