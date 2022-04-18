import { ProxyState } from "../AppState.js"
import { Pop } from "./Pop.js"

export function saveState() {
  let data = {
    activeUser: ProxyState.users.slice(-1)[0]
  }
  console.log(ProxyState.activeUser)
  console.log(ProxyState.users)
  console.log('saved user', data.activeUser)
  window.localStorage.setItem('inspire', JSON.stringify(data))
}


export function loadState() {
  try {
    let data = window.localStorage.getItem('inspire')
    if (data) {
      let obj = JSON.parse(data)
      ProxyState.activeUser = obj.activeUser
    }
  } catch (error) {
      console.error("We couldn't find any save data", "error")
      Pop.toast(error.message, "error")
  }
}