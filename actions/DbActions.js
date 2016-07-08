var DbBiff = require('../db_biff')
var ActNames = require('./ActionNames')
//var React = require('react')

var DbActions = DbBiff.createActions({
 	//contextTypes: { router: React.PropTypes.object },	
 	getList: function(dateStr) {
		//console.log( "Dispatch "+ ActNames.GET_LIST);
		this.dispatch({
			actionType: ActNames.GET_LIST,
			dateStr: dateStr,
		});
		//console.log('dateStr='+dateStr+', timezone='+timezone);
	},
	insert: function(data) {
		this.dispatch({
			actionType: ActNames.INSERT,
			data: data
		});
	},
	update: function(data) {
		this.dispatch({
			actionType: ActNames.UPDATE,
			data: data
		});
	}
});
module.exports = DbActions;
