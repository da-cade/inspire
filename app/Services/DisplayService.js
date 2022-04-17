import { sandboxApi } from "./AxiosService.js";

class DisplayService {
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