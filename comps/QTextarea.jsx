var React = require('react')
var DbActions = require('../actions/DbActions')
var DbStore = require('../stores/DbStore')
var _ = require('lodash')

module.exports = React.createClass( {
	mixins: [DbStore.mixin],
	getInitialState: function() {
		return {fldList:[]}
	},
	componentDidMount: function() {
		DbActions.getList( {dateStr: '*'})
	},
	storeDidChange: function() {
		var list = DbStore.getList()
		this.state.fldList = this.transform(list, 'chi')
		this.setState( {fldList: this.state.fldList})
	},
	transform: function(list, field) {
		var len = list.length
		var text=''
		for (var i=0; i<len; ++i) {
			var word_len = list[i][field].length
			console.log(word_len)
			//text += _.padEnd(list[i][field],word_len+((5-word_len)*2),' ')
			text += list[i][field].charCodeAt(0).toString(16) + ' ';
		}
		return text;
	},
	render: function() {
		return (<div>Word List<br/>
			<textarea className='QTextarea' rows='15' cols='60' readOnly
			  value={this.state.fldList} />
		</div>)	  
	}
})