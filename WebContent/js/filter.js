app.filter("timeString", function () {
	return function (date) {
		if (date)
			return moment(date).format('LL');
		return "";
	}
});