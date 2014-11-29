var greeting;
var hrs = currentTime.getHours()



if (hrs >=3 && hrs < 12){
	greeting = 'Good Morning';
	}
	else	if (hrs >= 12 && hrs < 18 ){
	greeting = 'Good Afternoon';
	}else if (hrs >= 18 || hrs < 3){
	greeting = 'Good Evening';
	}
	else if(hrs  == 0)
	{
		greeting = 'Good Day';
	}
	
		document.write(greeting + "<hr id='ln1'>")
		
