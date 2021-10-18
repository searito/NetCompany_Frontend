import { boot } from 'quasar/wrappers'
import axios from 'axios'
import qs from 'qs'

const axiosInstance = axios.create({
  paramsSerializer: params => {
    return qs.stringify(params, {
      arrayFormat: 'repeat'
    })
  },
  withCredentials: false,
  // baseURL: process.env.api
  baseURL: 'http://127.0.0.1/netcompany/public/api/'
})

class CancelToken{
  constructor (initialValue){
    this.source = axios.CancelToken.source()
  }
  getSource(){
    return this.source
  }
  setSource(){
    this.source = axios.CancelToken.source()
  }
  cancel(){
    this.source.cancel()
  }
}

const cancelSource = new CancelToken()

export default boot(({app}) => {
  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$axiosInstance = axiosInstance
  app.config.globalProperties.$cancelSource = cancelSource
})

export { axiosInstance, cancelSource }
