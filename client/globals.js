function Globals() {
	this.lastAccDate = (new Date()).toLocaleDateString();
	this.days = 1;
}

var globals = new Globals();
module.exports = globals;