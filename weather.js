window.onload =function() {
	getData();
}
function getData() {
	var preCity = document.getElementById('preCity');
	$.ajax({
		type : 'GET',
		dataType : 'jsonp',
		data : {
        	city : "北京",
        	appkey : '56f8e114bb51223d'
        },
        url : "http://api.jisuapi.com/weather/query",
        success : function (data){
        	preCity.innerHTML = "北京";
        	getPreCityInfo(data);
        	setSixDays(data);
        }
	});
}
//获取当前城市信息
function getPreCityInfo(data) {
	console.log(data);
	var date = document.getElementById('date');
	var week = document.getElementById('week');
	var logo = document.getElementById('logo');
	var weather = document.getElementById('weather');
	var temp = document.getElementById('temp');
	var tempLow = document.getElementById('tempLow');
	var tempHigh = document.getElementById('tempHigh');
	
	
   	date.innerHTML = data.result.date;
	week.innerHTML = data.result.week;
	logo.src = data.result.img + ".png";
	weather.innerHTML = data.result.weather;
	temp.innerHTML = data.result.temp + "℃";
	tempLow.innerHTML = data.result.templow + "℃";
	tempHigh.innerHTML = data.result.temphigh + "℃";
	
}
//添加未来六天的天气情况
function setSixDays(data) {
	var future = document.getElementsByClassName('future');
	for(var i = 1 ; i <= 6; i ++) {
		var date = document.createElement('span');
		var week = document.createElement('span');
		var logo = document.createElement('img');
		var temp = document.createElement('span');
		date.innerHTML = data.result.daily[i].date;
		week.innerHTML = data.result.daily[i].week;
		logo.src = data.result.daily[i].day.img + ".png";
		temp.innerHTML = data.result.daily[i].night.templow + "℃ ~ " + data.result.daily[i-1].day.temphigh + "℃";
		future[i-1].appendChild(date);
		future[i-1].appendChild(week);
		future[i-1].appendChild(logo);
		future[i-1].appendChild(temp);
	}
}
//查找某个城市的天气
function findWeather() {
	var inputCity = document.getElementById('inputCity');
	var cityName = inputCity.value;
	var preCity = document.getElementById('preCity');
	console.log(cityName);
	$.ajax({
		type : 'GET',
		dataType : 'jsonp',
		data : {
        	city : cityName,
        	appkey : '56f8e114bb51223d'
        },
        url : "http://api.jisuapi.com/weather/query",
        success : function (data){
        	preCity.innerHTML = cityName;
        	initInfo();
        	getPreCityInfo(data);
        	setSixDays(data);
        }
	});
}
//初始化信息
function initInfo() {
	var future = document.getElementsByClassName('future');
	for(var i = 0 ; i < 6; i++) {
		future[i].innerHTML = "";
	}
}