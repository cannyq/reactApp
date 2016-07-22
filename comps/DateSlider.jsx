var React = require('react')
var DbActions = require('../actions/DbActions')
var { CV_date_str, incDateStr } = require('../client/util')
var globals = require('../client/globals')

module.exports = React.createClass({
	getInitialState: function() {
		console.log( this.props.dateStr);
		return { dateStr: this.props.dateStr, days: this.props.days||1}
	},
	incDate: function( numDays) {
		var newDateStr = incDateStr(this.state.dateStr,numDays);
		this.setState( {dateStr: newDateStr}) 
		var query = '{user(id:"'+ globals.user+'",date:"' +newDateStr 
		          + '"){_id,tra,chi,pin,eng,stat} }'
		DbActions.graphQL( query);
	},
	/*changeDays: function(event) {
		this.state.days = event.target.value;
		this.setState( {days: this.state.days})
		//DbActions.getList( { dateStr:this.state.dateStr, days: this.state.days});
		var query = '{user(id:"SQ",date:"' +this.state.dateStr + '"){_id,chi,pin,eng} }'
		DbActions.graphQL( query);
	},*/
	render: function() {
		var lt = '<'
		return (
			<span>
				<button className='DSBut DSButL' onClick={this.incDate.bind(this, -1)}>{lt}</button>
				<input className='DSInp' type='text' size='12' readOnly 
				        value={this.state.dateStr}/>
				<button className='DSBut DSButR' onClick={this.incDate.bind(this,1)}>></button>
				{/*<label className='DSLab'>Days:</label>
				    <input id='days' type='text' value={this.state.days} 
				       size='3' onChange={this.changeDays}/>*/}
			</span>
		);
	}
});
