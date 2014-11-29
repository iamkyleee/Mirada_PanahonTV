<!--
	var currentTime = new Date()
	var hours = currentTime.getHours()
	var minutes = currentTime.getMinutes()
		var ampm = hours >= 12 ? 'PM' : 'AM';
	if (minutes < 10)

	minutes = "0" + minutes

	var suffix = "AM";
	
	
	
	
	if (hours == 0) {
	hours = 12;
	}
	
	if (hours >12)
	{
	hours = hours -12;
	}
	

	document.write( "<table><td>" +hours + ":" + minutes + "</td><td><div id='ampm'>" + ampm + "</td><tr><td></td></tr></table>" )
	
	

	
//-->
