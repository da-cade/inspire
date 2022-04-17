import { ProxyState } from "../AppState.js"
import { displayService } from "../Services/DisplayService.js"
import { Pop } from "../Utils/Pop.js"

function _drawActiveImage(){
  // @ts-ignore
  document.getElementsByTagName('body')[0].style = `background-image: url(${ProxyState.activeImage});`
}
function _drawActiveQuote(){
  document.getElementById('quote-landing').innerText = `"`+ ProxyState.activeQuote.content +`"`
  document.getElementById('author-landing').innerText = ProxyState.activeQuote.author
}

function _drawClock(){
  document.getElementById('clock').innerText = (ProxyState.currentTime.military ? 
    `${ProxyState.currentTime.hour}:${ProxyState.currentTime.minutes}` : 
    `${ProxyState.currentTime.hour % 12}:${ProxyState.currentTime.minutes} ${ProxyState.currentTime.hour >= 12 ? ' pm' : ' am'}`)
}
export class DisplayController {
  constructor(){
    ProxyState.on('activeImage', _drawActiveImage)
    ProxyState.on('activeQuote', _drawActiveQuote)
    this.getImage()
    this.getTime()
    this.getQuote()
    this.drawClock()
  }
  async getImage(){
    try {
      const imgData = await displayService.getImage()
      ProxyState.activeImage = imgData
    } catch (error) {
      console.error(error)
      Pop.toast(error.message, 'error')
    }
  }
  async getQuote(){
    try {
      const quoteData = await displayService.getQuote()
      ProxyState.activeQuote = quoteData /*should be in service*/
    } catch (error) {
      console.error(error)
      Pop.toast(error.message, 'error')
    }
  }
  getTime(){
    const time = new Date();
    const [year, month, day] = [time.getFullYear(), time.getMonth(), time.getDate()]
    const [hour, minutes, seconds] = [time.getHours(), time.getMinutes(), time.getSeconds()];
    ProxyState.currentTime = {year, month, day, hour, minutes, seconds, military: false}
  }
  drawClock(){
    _drawClock()
  }
  changeTime(){
    ProxyState.currentTime.military = !ProxyState.currentTime.military
    this.drawClock()
  }
}
