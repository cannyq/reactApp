var { CV_date_str } = require('./util')
function Globals() {
	//this.lastAccDate = (new Date()).toLocaleDateString();
	this.lastAccDate = CV_date_str( new Date());
	this.days = 1;
	this.user = 'SQ';
}

var globals = new Globals();
console.log( 'user='+ globals.user);
module.exports = globals;