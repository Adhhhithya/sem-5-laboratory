document.getElementById('searchForm').addEventListener('submit',function(event){
    event.preventDefault();
})

var cityInput = document.querySelector('input[name="city"]');
var cityName = cityInput.value;
if(cityName !==''){
    var xhr = new XMLHttpRequest();
    xhr.open('GET','https://api.openweathermap.org/data/2.5/weather?q='+encodeURIComponent(cityName)+'&appid=6d548e9d58b6f97ecf4c25872b547423',true);
    xhr.onreadystatechange = function(){
        if(xhr.readyState ===4){
            if(xhr.status===200){
                var weatherData = JSON.parse(xhr.responseText);
                var weatherInfo = document.getElementById('weatherInfo');
                weatherInfo.innerHTML=`
                <h2>${weatherData.name}</h2>
                <p>Temperature:${convertKelvinToCelsius(weatherData.main.temp)}°C</p>
                <p>Humidity:${weatherData.main.humidity}%</p>
                <p>Description:${weatherData.weather[0].description}</p>
                `;
            }else{
                var weatherInfo = document.getElementById('weatherInfo');
                weatherInfo.innerHTML=`Unable to fetch weather information .Please try again later.`;

            }
        }
    };
    xhr.send();
}
function convertKelvinToCelsius(kelvin){
    return Math.round(kelvin -273.15);
}