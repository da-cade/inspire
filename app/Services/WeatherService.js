import { ProxyState } from "../AppState.js";
import { sandboxApi } from "./AxiosService.js";

class WeatherService {
  setDisplayTemp(format) {
    let weatherObj = ProxyState.activeWeather.main
    console.log(weatherObj)
    if(format === 'F'){
      weatherObj.displayTemp = weatherObj.fh
    }
    if(format === 'C'){
      weatherObj.displayTemp = weatherObj.cl
    }
    if(format === 'K'){
      weatherObj.displayTemp = weatherObj.temp
    }
    ProxyState.activeWeather = ProxyState.activeWeather
    return
  }
  
  calculateWeather(res){
    let newRes = res.data
    let temps = res.data.main
    temps.fh = Math.floor((((temps.temp-273.15) * 9) / 5) + 32)
    temps.cl = Math.floor(temps.temp - 273.15)
    temps.displayTemp = temps.fh
    return newRes
  }
  async getWeatherData() {
    const res = await sandboxApi.get('weather')
    const updatedData = this.calculateWeather(res)
    ProxyState.activeWeather = updatedData
  }
  async getIcon(){
    // TODO
  }
}

export const weatherService = new WeatherService();