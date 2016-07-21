			// 7/3/2016 Accepts pasting of chinese and pinyin combination from Google Translate
import React from 'react'
import DbStore from '../stores/DbStore'
import DbActions from '../actions/DbActions'
import Notification from 'react-notification-system'

module.exports = React.createClass( {
	mixins: [DbStore.mixin],
 	contextTypes: { router: React.PropTypes.object },	// for .push()

	getInitialState: function() {
		return {flashObj: DbStore.getRec(this.props.params.id)}
	},
	onChange: function(event) {
		this.state.flashObj[ event.target.id] = event.target.value
		this.setState( {flashObj: this.state.flashObj})
	},
	toast: function(msg, title, level) {
		this.refs.noti.addNotification(	
			{ message: msg, title: title, level: level,	position: 'tl', autoDismiss:5 }
		)
	},
	update: function() {
		var obj = this.state.flashObj;
		var errStr =  DbStore.checkBlank(obj);
		if (errStr!=null) {
			this.toast(errStr, 'Error', 'error')
		} else {
			DbActions.update( obj);
		}
	},
	goBack: function() {
		var date = new Date(this.state.flashObj.date)
		var dateStr = date.toLocaleDateString()
		this.context.router.push('/vocab?date='+dateStr)
	},
	storeDidChange: function() {
		var resp = DbStore.getResp()
		if (resp.error=='None') {
			this.toast( "Record updated", 'Success', 'success')
		} else {
			this.toast( resp.error, 'Error', 'error')
		}
	},
	render: function() { 
		return (<div className='QIDiv'>
			<label className='QILab'>Chinese: </label>
			<input type='text' id='chi' value={this.state.flashObj.chi} 
				placeholder='Enter Chinese characters' onChange={this.onChange} 
				className='QIInp'/>
			<br/>

			<label className='QILab'>Traditional: </label>
			<input type='text' id='tra' value={this.state.flashObj.tra}
				placeholder='Enter trad. Chinese' onChange={this.onChange} 
				className='QIInp'/>
			<br/>

			<label className='QILab'>Pinyin: </label>
			<input type='text' id='pin' value={this.state.flashObj.pin}
				placeholder='Enter pinyin' onChange={this.onChange} 
				className='QIInp'/>
			<br/>

			<label className='QILab'>English: </label>
			<input type='text' id='eng' value={this.state.flashObj.eng}
				placeholder='Enter English' onChange={this.onChange} 
				className='QIInp'/>
			<br/>

			<button className='QIBut' onClick={this.update}>Update record</button>
			<button className='QIBut' onClick={this.goBack}>Go back</button>

			<Notification ref="noti" />
		</div>);
	}
})