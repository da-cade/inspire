import { ProxyState } from "../AppState.js"
import { weatherService } from "../Services/WeatherService.js"
import { Pop } from "../Utils/Pop.js"

function _drawWeather(){
  const weather = ProxyState.activeWeather.weather[0]
  document.getElementById('weather-main').innerText = weather.main
  document.getElementById('weather-description').innerText = weather.description
  document.getElementById('weather-icon').innerHTML = `<img src="http://openweathermap.org/img/wn/${weather.icon}@2x.png" class="weather-icon" alt="">`
  //temps
  const temps = ProxyState.activeWeather.main
  document.getElementById('temperature').innerText = temps.displayTemp + (temps.displayTemp < 200 ? '°' : 'K')
}

export class WeatherController {
  constructor(){
    ProxyState.on('activeWeather', _drawWeather)
    this.getWeatherData()
    setInterval(_drawWeather, 1800000)
  }
  async getWeatherData(){
    try {
      await weatherService.getWeatherData()
    } catch (error) {
      console.error(error)
      Pop.toast(error.message, 'error')
    }
  }
  setDisplayTemp(format){
    try {
      weatherService.setDisplayTemp(format)
    } catch (error) {
      console.error(error)
      Pop.toast(error.message, 'error')
    }
  }
}