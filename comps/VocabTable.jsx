var React = require('react')
var DbActions = require('../actions/DbActions')
var DateSlider = require('./DateSlider.jsx')
var QTable = require('./QTable.jsx')
var globals = require('../client/globals.js')

module.exports = React.createClass({
	render: function() {
		var dateStr = globals.lastAccDate;
    var days = globals.days;
		//console.log('vocabTable: numDays='+dateStr+', days='+days)
		return (
			<div>
				<DateSlider dateStr={dateStr} days={days}/>
				<br/><br/>
				<QTable dateStr={dateStr} days={days} />
			</div>
		);
	}
});
