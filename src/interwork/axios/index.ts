import axios from 'axios'

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
  timeout: 5000
})

httpHost.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded'

const access_token = localStorage.getItem('access_token')
const refresh_token = localStorage.getItem('refresh_token')

httpHost.interceptors.request.use(
  (request) => {
    if (refresh_token) {
      if (checkTimeout(10 * 60 * 60 * 24)) {
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
      if (access_token) {
        request.headers.Authorization = `Bearer ${access_token}`
      }
    }
    return request
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
    // localStorage.removeItem('token')
    console.log(error)
    // window.location.href = '/'
  }
)

export default httpHost
