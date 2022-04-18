import { ProxyState } from "../AppState.js"
import { displayService } from "../Services/DisplayService.js"
import { saveState } from "../Utils/LocalStorage.js";
import { Pop } from "../Utils/Pop.js"

function _pascalify(user) {
  const pascal = user
    .split(' ')
    .map(w => {
      return w.charAt(0).toUpperCase() + w.slice(1);
    })
    .join(' ');
  return pascal;
}
function _resetUser(){
  if(ProxyState.activeUser){ProxyState.activeUser = ''}
  document.getElementById('username-form').innerHTML = `<label class="visually-hidden" for="username">user</label><input id="username"></input>`
}
function _drawActiveImage(){
  // @ts-ignore
  document.getElementsByTagName('body')[0].style = `background-image: url(${ProxyState.activeImage});`
}
function _drawActiveQuote(){
  document.getElementById('quote-landing').innerText = `"`+ ProxyState.activeQuote.content +`"`
  document.getElementById('author-landing').innerText = ProxyState.activeQuote.author
}
function _drawClock(){
  const time = ProxyState.currentTime
  let timeData = {hour: time.hour, minutes: time.minutes, seconds: time.seconds}
  let standardHours = {}
  for (const key in timeData) {
    let element = timeData[key];
    if(element < 10){
      timeData[key] = `0${element}`
    }
  }
  
  if(time.hour > 12){
    standardHours = {
      hour: time.hour - 12,
      meridian: ' pm'}
  }else{
    standardHours = {
      hour: time.hour,
      meridian: ' am'
    }
  }
  let greeting = 'Good Morning'
  if(ProxyState.currentTime.hour >= 12 && ProxyState.currentTime.hour < 17){
    greeting = 'Good Afternoon'
  }
  else if(ProxyState.currentTime.hour >= 17 && ProxyState.currentTime.hour < 21){
    greeting = 'Good Evening'
  }
  else if(ProxyState.currentTime.hour >= 21 || ProxyState.currentTime.hour < 1){
    greeting = 'Buona Note'
  }
  else if(ProxyState.currentTime.hour >= 1 && ProxyState.currentTime.hour < 4){
    greeting = 'Awake with the witches'
  }
  document.getElementById('day-phase').innerText = greeting
  
  
  document.getElementById('clock').innerHTML = `
    <h1>${ProxyState.currentTime.military ? timeData.hour +':'+ timeData.minutes +':'+ timeData.seconds : time.hour +':'+ timeData.minutes +':'+ timeData.seconds + '<h1 class="ms-auto">'+ standardHours.meridian +'</h1>'}</h1>
    `
}
function _drawUser(){
  if(ProxyState.activeUser !== ''){
    const namePascal = _pascalify(ProxyState.activeUser)
    document.getElementById('username-form').innerText = `, ${namePascal} ${ProxyState.currentTime.hour >= 1 && ProxyState.currentTime.hour < 5 ? '?' : ''}`
    document.getElementById('user-edit').innerHTML =`<i class="mdi mdi-pencil selectable on-hover" onclick="app.displayController.resetUser()"></i>`
  }else{
    document.getElementById('username-form').innerHTML = `<label class="visually-hidden" for="username">user</label><input id="username"></input>`
  }
}
export class DisplayController {
  constructor(){
    ProxyState.on('activeImage', _drawActiveImage)
    ProxyState.on('activeQuote', _drawActiveQuote)
    ProxyState.on('currentTime', _drawClock)
    ProxyState.on('activeUser', _drawUser)
    this.getImage()
    this.getTime()
    this.getQuote()
    this.getUser()
    setInterval(this.getTime, 500)
  }
  getUser() {
    try {
      displayService.getUser()
    } catch (error) {
      console.error(error)
      Pop.toast(error.message, 'error')
    }
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
    const military = ProxyState.currentTime.military ? ProxyState.currentTime.military : false
    ProxyState.currentTime = {year, month, day, hour, minutes, seconds, military}
  }
  changeTime(){
    ProxyState.currentTime.military = !ProxyState.currentTime.military
    ProxyState.currentTime = ProxyState.currentTime
  }
  addUser(){
    try {
      event.preventDefault()
      let formElem = event.target
      const formData = formElem.username.value
      displayService.addUser(formData)
      formElem.reset()
    } catch (error) {
      console.error(error)
      Pop.toast(error.message, 'error')
    }
  }
  resetUser(){
    _resetUser()
  }
}
