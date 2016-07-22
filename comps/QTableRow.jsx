var React = require('react')
var DbActions = require('../actions/DbActions')

module.exports = React.createClass( {
 	contextTypes: { router: React.PropTypes.object },	// for .push()
 	getInitialState: function() {
 		//console.log(this.props.doc)
 		return {doc: this.props.doc}
 	},
	show: function( col, field) {	return this.props.colNames[col]=='Hide'?field:' '	},
	updateClick: function() {
		// QUpdate can pick up _id with this.props.params.id
		this.context.router.push('/update/'+this.props.doc._id) 
	},
	getTogStat: function(stat) {
		return (stat=='Need Review')?'Got It':'Need Review'
	},
	getCss: function(stat) {
		return (stat=='Need Review')?' needRev':''
	},
	componentWillReceiveProps: function(nextProps) {
 		//console.log( nextProps.doc)
 		this.setState( {doc:nextProps.doc})
	},
  statusClick: function() {
  	this.state.doc.stat = this.getTogStat(this.state.doc.stat)
  	DbActions.updateStat(this.state.doc)
  	this.setState( {doc: this.state.doc})
  },
	render: function() {
		var dispStat = this.getTogStat(this.state.doc.stat)
		var statCss = this.getCss(this.state.doc.stat)
		return (<tr className='Qtr'>
			<td className={'chi'+statCss}>{this.show(0, this.props.doc.chi)} </td>
			<td className={'tra'+statCss}>{this.show(1, this.props.doc.tra)} </td>
			<td className={'pin'+statCss}>{this.show(2, this.props.doc.pin)} </td>
			<td className={'eng'+statCss}>{this.show(3, this.props.doc.eng)} </td>
			<td className={statCss}><button className='QtrBut' onClick={this.updateClick}>Update</button> </td>
			<td className={statCss}><button className='QtrBut' onClick={this.statusClick}>{dispStat}</button> </td>
		</tr>)
	}
})