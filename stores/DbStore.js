var DbBiff = require('../client/db_biff');
var ActNames = require('../actions/ActionNames');

var DbStore = DbBiff.createStore({
	_list: [],
	_resp: {},
	getList: function() { return this._list },
	getResp: function() { return this._resp },
	getInitFlashObj: function() { return {chi:'',tra:'',pin:'',eng:'',stat:'Need Review'} },
	getRec: function(id) { return this._list.find( x=>x._id==id) },
	checkBlank: function(obj) {
		var err=null;
		if (obj.chi=='') {
			err = 'The Chinese field cannot be blank.';
		} else if (obj.pin=='') {
			err = 'The Pinyin field cannot be blank.';
		} else if (obj.eng=='') {
			err = 'The English field cannot be blank.';
		}
		return err;
  },
}, function(payload) {

	if (payload.actionType === ActNames.GET_LIST) {
		var rest = new XMLHttpRequest();
		window.self = this; // Need to precede self with window for IE
		rest.onreadystatechange = function() {
			if (rest.readyState==4 && rest.status==200) {
				window.self._list = JSON.parse(rest.responseText);
				DbStore.emitChange();
			}
		}
		var dsd = payload.data;
		rest.open('GET', '/db?date='+dsd.dateStr+'&days='+dsd.days);
		rest.send();

	} else if (payload.actionType === ActNames.GRAPHQL) {
		var rest = new XMLHttpRequest();
		window.self = this; // Need to precede self with window for IE
		rest.onreadystatechange = function() {
			if (rest.readyState==4 && rest.status==200) {
				var obj = JSON.parse(rest.responseText);
				//window.self._list = obj.data.list;
				window.self._list = obj.data.user;
				DbStore.emitChange();
			}
		}
		var uri = '/graphql?query='+payload.data;
		rest.open('GET', uri);
		console.log( 'Sent: '+uri);
		rest.send();

	} else if (payload.actionType === ActNames.INSERT) {
		var rest = new XMLHttpRequest();
		window.self = this;
		rest.onreadystatechange = function() {
			if (rest.readyState==4 && rest.status==200) {
				window.self._resp = JSON.parse(rest.responseText);
				DbStore.emitChange();
			}
		}
		rest.open('POST', '/db');
		rest.setRequestHeader("Content-type","application/json");
		var jsonStr = JSON.stringify( payload.data); // Need this
		rest.send( jsonStr );  
		console.log( jsonStr);

	} else if (payload.actionType === ActNames.UPDATE) {
		var rest = new XMLHttpRequest();
		window.self = this;
		rest.onreadystatechange = function() {
			if (rest.readyState==4 && rest.status==200) {
				window.self._resp = JSON.parse(rest.responseText);
				DbStore.emitChange();
			}
		}
		var obj = payload.data;
		rest.open('PUT', '/db/'+obj._id);
		rest.setRequestHeader("Content-type","application/json");
		var jsonStr = JSON.stringify( payload.data); // Need this
		rest.send( jsonStr );  
		console.log( jsonStr);

	} else if (payload.actionType === ActNames.UPDATE_STAT) {
		var rest = new XMLHttpRequest();
		window.self = this;
		rest.onreadystatechange = function() {
			if (rest.readyState==4 && rest.status==200) {
				window.self._resp = JSON.parse(rest.responseText);
				DbStore.emitChange();
			}
		}
		var obj = payload.data;
		rest.open('PUT', '/db/'+obj._id);
		rest.setRequestHeader("Content-type","application/json");
		var jsonStr = JSON.stringify( payload.data); // Need this
		rest.send( jsonStr );  
		console.log( jsonStr);
	}
});
module.exports = DbStore;