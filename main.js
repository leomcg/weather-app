const api = {
  key: 'ca1bfbef5afb91a9e3ce9428b6963923',
  baseurl: 'https://api.openweathermap.org/data/2.5'
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
  if (evt.keyCode === 13) {
    getResults(searchbox.value);
  }
}

function getResults(query) {
  fetch(`${api.baseurl}/weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
      return weather.json();
    }).then(displayResults);
}

function displayResults(apiWeather) {
  console.log(apiWeather)
  let city = document.querySelector('.city');
  city.innerText = `${apiWeather.name}, ${apiWeather.sys.country}`
  
  let now = new Date();
  let date = document.querySelector('.current-date');
  date.innerText = dateBuilder(now);

  let temperature = document.querySelector('.temperature');
  temperature.innerText = `${Math.round(apiWeather.main.temp)}°`;

  let min = document.querySelector('.current-min');
  min.innerText = `${Math.round(apiWeather.main.temp_min)}°`
  
  let max = document.querySelector('.current-max');
  max.innerText = `${Math.round(apiWeather.main.temp_max)}°`

  let chanceOfRain = document.querySelector('.current-chance-of-rain')
  chanceOfRain.innerText = `${apiWeather.main.humidity}%`

  let weather = apiWeather.weather[0].main;

  let currentIcon = document.querySelector('.current-icon');
  currentIcon.innerHTML = `<i class="wi ${getIcon(weather)}"></i>`
}

function dateBuilder (d) {
  const months = 'Janeiro Fevereiro Março Abril Junho Julho Agosto Setembro Outubro Novembro Dezembro'.split(' ');
  const days = 'Domingo Segunda Terça Quarta Quinta Sexta Sábado'.split(' ');

  let dayOfTheWeek = days[d.getDay()];
  let dayOfTheMonth = d.getDate();
  let month = months[d.getMonth() - 1];
  let year = d.getFullYear();

  let dateString = `${dayOfTheWeek}, ${dayOfTheMonth} de ${month} de ${year}`;
  
  return dateString;
}

function getIcon(weather) {
  if (weather === 'Rain') {
    return 'wi wi-rain';
  } else if (weather === 'Clouds') {
    return 'wi-day-cloudy'
  }
}