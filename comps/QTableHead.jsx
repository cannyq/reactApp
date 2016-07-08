var React = require('react')

module.exports = React.createClass( {
	propTypes: {
		On_change: React.PropTypes.func
	},
	getInitialState: function() {
		return {stat: this.props.colNames}
	},
	butClick: function(col) {
		this.state.stat[col] = (this.state.stat[col]=='Hide')?'Show':'Hide'
		this.setState( {stat: this.state.stat})
		if (this.props.On_change) this.props.On_change(this.state.stat);
	},
	render: function() {
		return (<thead><tr>
			<th className='Qth'>Chinese&nbsp;
				<button className='QthBut' onClick={this.butClick.bind(this,0)}>
				{this.state.stat[0]}</button> </th>
			<th className='Qth'>Pinyin&nbsp; 
				<button className='QthBut' onClick={this.butClick.bind(this,1)}>
				{this.state.stat[1]}</button> </th>
			<th className='Qth'>English&nbsp;
				<button className='QthBut' onClick={this.butClick.bind(this,2)}>
				{this.state.stat[2]}</button> </th>
			<th className='Qth'>Update</th>
		</tr></thead>)
	}
})