var React = require('react')
var DbActions = require('../actions/DbActions')

module.exports = React.createClass( {
 	contextTypes: { router: React.PropTypes.object },	// for .push()

	show: function( col, field) {	return this.props.colNames[col]=='Hide'?field:' '	},
	updateClick: function() {
		// QUpdate can pick up _id with this.props.params.id
		this.context.router.push('/update/'+this.props.doc._id) 
	},
	render: function() {
		return (<tr className='Qtr'>
			<td className={'chi'}>{this.show(0, this.props.doc.chi)} </td>
			<td className={'pin'}>{this.show(1, this.props.doc.pin)} </td>
			<td className={'eng'}>{this.show(2, this.props.doc.eng)} </td>
			<td><button className='QtrBut' onClick={this.updateClick}>Update</button> </td>
		</tr>)
	}
})