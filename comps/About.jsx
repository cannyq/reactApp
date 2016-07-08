import React from 'react'
import Notification from 'react-notification-system'
var DbActions = require('../actions/DbActions')
import QInsert from './QInsert.jsx'

export default React.createClass({
  _addNoti() {
    DbActions.getList()
    this.noti_ref.addNotification( {
      title: "Amber Alert",
      message: "Check out this license plate",
      level: 'info',
      position: 'tc', 
      action: { label: 'Awesome!', callback: function() { console.log('Clicked'); }},
      autoDismiss: 3  /* 0 to stay */
    }) 
  },
  componentDidMount() {
  	this.noti_ref = this.refs.noti;
  	//this._addNoti();
  },
  render() {
    return <div>About<br/>
        <Notification ref="noti" />
        <button onClick={this._addNoti}>Toast</button>
        {/*<QInsert />*/}
    </div>
  }
})