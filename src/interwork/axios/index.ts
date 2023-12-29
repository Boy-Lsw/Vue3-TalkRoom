import axios from 'axios'
import { clearExpiredRequest, refreshToken } from './refreshToken'

export const baseURL = 'http://localhost:3000/'

const checkTimeout = (time: number) => {
  const [timekey] = document.cookie
    .split('; ')
    .map((cookie) => {
      return cookie.split('=')
    })
    .filter((item) => item[0] == 'timekey')
  const seconds = Date.now() - Number(timekey[1])
  return seconds > time * 1000
}

const httpHost = axios.create({
  baseURL,
  timeout: 5000,
  // headers: {
  //   'Content-Type': 'application/x-www-form-urlencoded'
  // }
})

httpHost.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

httpHost.interceptors.request.use(
  (config) => {
    const refresh_token = localStorage.getItem('refresh_token')
    const access_token = localStorage.getItem('access_token')
    if (refresh_token && checkTimeout(10 * 60 * 60 * 24)) {
      localStorage.removeItem('refresh_token')
      window.location.hash = '/'
      ElNotification({
        title: '身份信息失效!',
        message: '请重新登录!',
        type: 'error',
        position: 'top-right',
        duration: 1000
      })
      return Promise.reject(new Error('token失效,请重新登录'))
    }
    if (access_token && config.url != 'auth/refreshToken') {
      config.headers.Authorization = `Bearer ${access_token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

httpHost.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    const { data, config } = error.response
    return new Promise((resolve, reject) => {
      if (data.status == 401 && config.url != 'auth/refreshToken') {
        refreshToken(() => {
          resolve(httpHost(config));
        })
      } else if (data.status == 401 && config.url == 'auth/refreshToken') {
        clearExpiredRequest()
        window.location.hash = '/'
      } else { reject(error.response) }
    })
  }
)

export default httpHost
