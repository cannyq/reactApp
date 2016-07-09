			// 7/3/2016 Accepts pasting of chinese and pinyin combination from Google Translate
import React from 'react'
import DbStore from '../stores/DbStore'
import DbActions from '../actions/DbActions'
import Notification from 'react-notification-system'

module.exports = React.createClass( {
	mixins: [DbStore.mixin],
	getInitialState: function() {
		return { flashObj: DbStore.getInitFlashObj() }
	},
	onChange: function(event) {
		if (event.target.id == 'chi') {
			// Accepts pasting of chinese and pinyin combination from Google Translate
			// cr & lf combo are converted to space by the browser
			var val = event.target.value;
			var start = (val.charAt(0)==' ')?1:0;
			var pos = val.indexOf(' ', start);
			if (pos < 0) {
				this.state.flashObj.chi = val;
			} else {
				this.state.flashObj.chi = val.substring(start,pos);
				this.state.flashObj.pin = val.substring(pos+1);
			}
		} else {
			this.state.flashObj[ event.target.id] = event.target.value
		}
		this.setState( {flashObj: this.state.flashObj})
	},
	toast: function(msg, title, level) {
		this.refs.noti.addNotification(	
			{ message: msg, title: title, level: level,	position: 'tl', autoDismiss:5 }
		)
	},
	insert: function() {
		var obj = this.state.flashObj;
		var errStr =  DbStore.checkBlank(obj);
		if (errStr!=null) {
			this.toast(errStr, 'Error', 'error')
		} else {
			DbActions.insert( obj);
		}
	},
	storeDidChange: function() {
		var resp = DbStore.getResp()
		if (resp.error=='None') {
			this.toast( "Record inserted", 'Success', 'success')
			this.setState( {flashObj: DbStore.getInitFlashObj()})
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
			<button className='QIBut' onClick={this.insert}>Insert record</button>
			<Notification ref="noti" />

		</div>);
	}
})