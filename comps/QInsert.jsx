// 7/3/2016 Accepts pasting of chinese and pinyin combination from Google Translate
// CJK Unified Ideographs: 4E00-9FFF
import React from 'react'
import DbStore from '../stores/DbStore'
import DbActions from '../actions/DbActions'
import Notification from 'react-notification-system'
import globals from '../client/globals'

module.exports = React.createClass( {
	mixins: [DbStore.mixin],
	getInitialState: function() {
		return { flashObj: DbStore.getInitFlashObj() }
	},
	onChange: function(event) {
		if (event.target.id == 'chi') {
			// Accepts pasting of chinese and pinyin combination from Google Translate
			// cr & lf combo are converted to space by the browser
			let SEP = '\n'
			var val = event.target.value
			var start = (val.charAt(0)==SEP)?1:0
			var pos = val.indexOf(SEP, start)
			if (pos < 0) {
				this.state.flashObj.chi = val
			} else { // Multi-line paste
				var chi = val.substring(start,pos)
				var posTra = chi.indexOf(' Trad. ')
				if (posTra < 0) {
					this.state.flashObj.chi = chi
					this.state.flashObj.tra = ''
				} else {
					this.state.flashObj.chi = chi.substring(0,posTra)
					this.state.flashObj.tra = chi.substring(posTra+7)
				}
				var pin = val.substring(pos+1);
				var pos2 = pin.indexOf(SEP)
				if (pos2 < 0) {
					this.state.flashObj.pin = pin
				} else {
					this.state.flashObj.pin = pin.substring(0, pos2)
					this.state.flashObj.eng = pin.substring(pos2+1)
				}
			}
		} else {
			this.state.flashObj[ event.target.id] = event.target.value
		}
		this.setState( {flashObj: this.state.flashObj})
	},
	toast: function(msg, title, level) {
		this.refs.noti.addNotification(	
			{ message: msg, title: title, level: level,	position: 'tl', autoDismiss:1 }
		)
	},
	insert: function() {
		var obj = this.state.flashObj;
		var errStr =  DbStore.checkBlank(obj);
		if (errStr!=null) {
			this.toast(errStr, 'Error', 'error')
		} else {
			Object.assign( obj, {user: globals.user})
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
			{/*<input type='text' id='chi' value={this.state.flashObj.chi} 
				placeholder='Enter Chinese characters' onChange={this.onChange} 
				className='QIInp'/>*/}
			<textarea id='chi' value={this.state.flashObj.chi} 
				placeholder='Enter Chinese characters' onChange={this.onChange} 
				className='QIInp'/>
			<br/>

			<label className='QILab'>Traditional: </label>
			<input type='text' id='tra' value={this.state.flashObj.tra}
				placeholder='Enter Trad. Chinese' onChange={this.onChange} 
				className='QIInp' />
			<br/>

			<label className='QILab'>Pinyin: </label>
			<input type='text' id='pin' value={this.state.flashObj.pin}
				placeholder='Enter pinyin' onChange={this.onChange} 
				className='QIInp' />
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