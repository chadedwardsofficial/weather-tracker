var currentWeather = $('.displayCurrentWeather')
var displayResults = $('.displayRecentResults')
var userInput = $('#searchInput');
var searchButton = $('#searchButton');
var apiKey = 'eabc2fd5cfcb286e37818aa2754f1eea'
var currentHour = parseInt(dayjs().format("HH"));
var forecastRow = $('#row2');


searchButton.on("click", function(){

  console.log(userInput.val())
  getWeather(userInput.val())
});

function updateTime() {
  var currentTimeElement = document.getElementById("current-time");
  var currentTime = dayjs().format("dddd, MMMM D, YYYY h:mm:ss A");
  currentTimeElement.innerHTML = currentTime;
}

function getWeather (city) {
  var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q='+ city + '&appid=eabc2fd5cfcb286e37818aa2754f1eea&units=imperial';

fetch(requestUrl)
  .then(function (response) {
      console.log (response)
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    getForecast(data);
    var city = $('<h2>');
    city.text(data.name);
    currentWeather.empty();
    currentWeather.append(data.name + ' ('+dayjs.unix(data.dt).format('MM/DD/YYYY')+') <img src="https://openweathermap.org/img/wn/'+data.weather[0].icon+'@2x.png">');
    currentWeather.append('<p>Temperature:'+data.main.temp+'</p>')
    currentWeather.append('<p>Humidity: '+data.main.humidity+'</p>')
    currentWeather.append('<p>Wind: '+data.wind.speed+'</p>')

    displayResults.append(`<button></button>`)
  });
}

  
  function getForecast (data) {
    
    var requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?q='+data.name+'&appid=' + apiKey + '&units=imperial';
    
    fetch(requestUrl)
    .then(function (response) {
        console.log (response)
      return response.json();
    })
    .then(function (data) {
      console.log(data)
      forecastRow.empty();
      for (let i = 2; i < data.list.length; i+=8) {
        console.log(data.list[i])
        forecastRow.append(` <div class="col">
        <div class="card" id="monday">
          <div class="card-body">
            <h5 class="card-title">${dayjs.unix(data.list[i].dt).format('MM/DD/YYYY')}</h5>
            <img src="https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png">
            <ul class="list-group list-group-flush">
              <li class="list-group-item">Humidity: <span class="humidity">${data.list[i].main.humidity}</span></li>
              <li class="list-group-item">Temperature:<span class="temperature">${data.list[i].main.temp}</span></li>
              <li class="list-group-item">Wind Speed: <span class="windspeed">${data.list[i].wind.speed}</span></li></li>
            </ul>
          </div>
        </div>
      </div>`)
      }
    
    }); 
    };

// The openweather forecast API will not correctly display icon of night/day based on the time you view it at//
// API based off of timezone//



