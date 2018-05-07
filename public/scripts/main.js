$(document).ready(function(){
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			getWeather(position.coords.latitude, position.coords.longitude);
    	});
	}
});

function getWeather(lat, lon){
	$.getJSON("https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&APPID=58a993196b7de1334f4cd18e09dd66e9", 
		function(data){
			console.log(data);
			var location = data.name;
			var temp = Math.floor(data.main.temp - 273);
			var forcast = data.weather[0].description;
			var desc = data.weather[0].main;
			var code = data.weather[0].icon;
			setWeather(location, temp+ "°C", forcast);
			console.log(location + " " + temp + " " + forcast);
			setWeatherIcon($("#forcast-icon"), code);
			setBackGround($('body'), desc, code);
			setColors(temp, desc);
		}
	);
}

function setWeatherIcon(icon, code){
	$("#forcast-icon").addClass("wi wi-owm-"+code);
}

function setWeather(location, temp, forcast){
	$("#area").html(location);
	$("#temp").html(temp);
	$("#forcast").html(forcast);
}

function setBackGround(body, weather, time){
		console.log(time[time.length - 1]);
		console.log(weather.toLowerCase());
	if(time[time.length - 1] === "d"){

		switch(weather.toLowerCase()){

			case "clear":
				body.css("background-image", "url(./public/images/day/clearday.jpg)");
				break;
			case "clouds":
				body.css("background-image", "url(./public/images/day/cloudyday.jpg)");
				break;
			case "rain":
				body.css("background-image", "url(./public/images/day/rainyday.jpg)");
				break;
			case "thunderstorm":
				body.css("background-image", "url(./public/images/day/stormyday.jpg)");
				break;
			case "snow":
				body.css("background-image", "url(./public/images/day/snowyday.jpg)");
				break;
			case "mist":
				body.css("background-image", "url(./public/images/day/mistday.jpg)");
				break;

		}
	} else if(time[time.length - 1] === "n") {

		switch(weather.toLowerCase()){
			case "clear":
				body.css("background-image", "url(./public/images/night/clearnight.jpg)");
				break;
			case "clouds":
				body.css("background-image", "url(./public/images/night/cloudynight.jpg)");
				break;
			case "rain":
				body.css("background-image", "url(./public/images/night/rainynight.jpg)");
				break;
			case "thunderstorm":
				body.css("background-image", "url(./public/images/night/stormynight.jpg)");
				break;
			case "snow":
				body.css("background-image", "url(./public/images/night/snowynight.jpg)");
				break;
			case "mist":
				body.css("background-image", "url(./public/images/night/mistynight.jpg)");
				break;

		}
	}	
}

function setColors(temp, desc){
	if(temp <= 20) {
		$("#temp").css("color", "#3366ff");
	} else if(temp > 20 && temp < 26) {
		$("#temp").css("color", "#33cc33");
	} else if(temp > 25 && temp < 36){
		$("#temp").css("color", "#ff6600");
	} else if(temp > 35){
		$("#temp").css("color", "#ff3333");
	}

	switch(desc.toLowerCase()){
		case "clear":
			$("#forcast").css("color", "#00ff99");
			break;
		case "clouds":
			$("#forcast").css("color", "#ffff00");
			break;
		case "rain":
			$("#forcast").css("color", "#3333cc");
			break;
		case "thunderstorm":
			$("#forcast").css("color", "#990099");
			break;
		case "snow":
			$("#forcast").css("color", "#66b3ff");
			break;
		case "mist":
			$("#forcast").css("color", "#ff9999");
			break;
	}
}
