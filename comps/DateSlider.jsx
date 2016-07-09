var React = require('react')
var DbActions = require('../actions/DbActions')

module.exports = React.createClass({
	getInitialState: function() {
		return { dateStr: this.props.dateStr, days: this.props.days}
	},
	incDate: function( numDays) {
		var date = new Date(this.state.dateStr)
		date.setDate( date.getDate()+numDays)
		this.state.dateStr = date.toLocaleDateString(); // Chrome: mm/dd/yy; IE:Weekday, Month day, year
		this.setState( {dateStr: this.state.dateStr}) 
		//DbActions.getList(date.toLocaleDateString('fr-CA')) // yyyy-MM-dd
		DbActions.getList( { dateStr:this.state.dateStr, days: this.state.days});
	},
	changeDays: function(event) {
		this.state.days = event.target.value;
		this.setState( {days: this.state.days})
		DbActions.getList( { dateStr:this.state.dateStr, days: this.state.days});
	},
	render: function() {
		var lt = '<'
		return (
			<span>
				<button className='DSBut DSButL' onClick={this.incDate.bind(this, -1)}>{lt}</button>
				<input className='DSInp' type='text' size='12' readOnly 
				        value={this.state.dateStr}/>
				<button className='DSBut DSButR' onClick={this.incDate.bind(this,1)}>></button>
				<label className='DSLab'>Days:</label>
				<input id='days' type='text' value={this.state.days} 
				       size='3' onChange={this.changeDays}/>
			</span>
		);
	}
});
