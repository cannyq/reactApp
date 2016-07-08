var React = require('react')
var DbActions = require('../actions/DbActions')

module.exports = React.createClass({
	getInitialState: function() {
		return { dateStr: this.props.date}
	},
	incDate: function( numDays) {
		var date = new Date(this.state.dateStr)
		date.setDate( date.getDate()+numDays)
		this.setState( {dateStr: date.toLocaleDateString()}) // Chrome: mm/dd/yy; IE:Weekday, Month day, year
		DbActions.getList(date.toLocaleDateString('fr-CA')) // yyyy-MM-dd
	},
	goBackward: function() { this.incDate(-1) },
	goForward: function() {	this.incDate(1);	},
	render: function() {
		var lt = '<'
		return (
			<div>
				<button className='DSBut DSButL' onClick={this.goBackward}>{lt}</button>
				<input className='DSInp' type='text' size='12' readOnly value={this.state.dateStr}/>
				<button className='DSBut DSButR' onClick={this.goForward}>></button>
			</div>
		);
	}
});
