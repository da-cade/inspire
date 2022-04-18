import { ProxyState } from "../AppState.js";
import { loadState, saveState } from "../Utils/LocalStorage.js";
import { sandboxApi } from "./AxiosService.js";

class DisplayService {
  getUser() {
    loadState()
  }
  addUser(formData) {
    ProxyState.activeUser = formData.toLowerCase()
    ProxyState.users = [ProxyState.activeUser, ...ProxyState.users]
    saveState()
  }
  async getQuote() {
    const res = await sandboxApi.get('quotes')
    return res.data
  }
  async getImage() {
    const res = await sandboxApi.get('images')
    const image = res.data.largeImgUrl
    return image
  }

}

export const displayService = new DisplayService();