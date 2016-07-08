var React = require('react')
var DbActions = require('../actions/DbActions')
var DbStore = require('../stores/DbStore')
var DateSlider = require('./DateSlider.jsx')
var QTableHead = require('./QTableHead.jsx')
var QTableRow = require('./QTableRow.jsx')

module.exports = React.createClass({
	mixins: [DbStore.mixin],
	getInitialState: function() {
		var dateStr = null; //this.props.location.query;
		var loc = this.props.location
		if (loc) { dateStr = loc.query.date	}
		if (!dateStr) {
			dateStr = (new Date()).toLocaleDateString() // mm/dd/yyyy
		}
		return { dateStr: dateStr, list: DbStore.getList(), colNames:['Hide','Hide','Hide']}
	},
	componentDidMount: function() {
		DbActions.getList( this.state.dateStr);
	},
	OnColChange: function(stat) {
		this.setState( {colNames: stat})
		//console.log('OnColChange: '+this.state.colNames)
	},
	storeDidChange: function() {
		this.setState( {list: DbStore.getList()})
	},
	render: function() {
		return (
			<div>
				<DateSlider date={this.state.dateStr}/><br/>
				<table className='Qt'>
				  <QTableHead colNames={this.state.colNames} On_change={this.OnColChange}/>
					<tbody> 
						{this.state.list.map( (item,i) => 
							<QTableRow key={i} doc={item} colNames={this.state.colNames}/>) 
					  } 
					</tbody>
				</table>
			</div>
		);
	}
});
