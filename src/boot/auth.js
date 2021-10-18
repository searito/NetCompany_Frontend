import { boot } from 'quasar/wrappers'
import { Cookies } from 'quasar'
import { axiosInstance } from 'boot/axios'

export default boot(async ({router, store}) => {
  axiosInstance.interceptors.response.use((response) => {
    return response
  }, (error) => {
    if (!error.respose){}
    return Promise.reject(error)
  })

  router.beforeEach((to, from, next) => {
    // const record = to.matched.find(record => record.meta['auth'])
    if (!Cookies.get('authToken')){
      router.push('/')
    } else {
      next()
    }
  })
})
