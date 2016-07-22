var DbBiff = require('../client/db_biff')
var ActNames = require('./ActionNames')
var globals = require('../client/globals.js')

var DbActions = DbBiff.createActions({
 	//contextTypes: { router: React.PropTypes.object },	
 	graphQL: function(query) {
		this.dispatch({
			actionType: ActNames.GRAPHQL,
			data: query
		});
 	},
 	getList: function(data) {
		// Save the last access day so QTable will continue to display 
		//data of the date when the user navigate to somewhere else.
		console.log(JSON.stringify(globals))
		if (data.dateStr != '*') {
			globals.lastAccDate = data.dateStr;
			globals.days = data.days;
		}
		this.dispatch({
			actionType: ActNames.GET_LIST,
			data: data
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
	},
	updateStat: function(data) {
		this.dispatch({
			actionType: ActNames.UPDATE_STAT,
			data: data
		});
	}
});
module.exports = DbActions;
