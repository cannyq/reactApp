function CV_date_str(date) {
	var year = date.getYear()+1900;
	var month = date.getMonth() + 1;
	month = ('0'+month).slice(-2);
	var day = ('0'+date.getDate()).slice(-2);
	return year +'-'+ month +'-'+ day;  //+ 'T' + date.getHours();
}
function incDateStr(dateStr, inc=1) {
	var date = new Date(dateStr);
  var tz = date.getTimezoneOffset()/60;
  date.setHours( date.getHours()+tz);
	date.setDate(date.getDate()+inc);
	return CV_date_str(date)
}
module.exports.CV_date_str = CV_date_str;
module.exports.incDateStr = incDateStr;
