import httpHost from '.'

let expiredRequestArr: any[] = []
let timer: any = null
const saveErrorRequest = (expiredRequest: () => any) => {
  expiredRequestArr.push(expiredRequest)
}
const againRequest = () => {
  expiredRequestArr.forEach((request) => {
    request()
  })
  clearExpiredRequest()
}
const updateTokenByRefreshToken = () => {
  const refresh_token = localStorage.getItem('refresh_token')
  httpHost
    .post(
      'auth/refreshToken',
      {
        username: localStorage.getItem('username')
      },
      {
        headers: { Authorization: `Bearer ${refresh_token}` }
      }
    )
    .then((res) => {
      const { access_token } = res.data
      localStorage.setItem('access_token', access_token)
      againRequest()
    })
    .catch((error) => {
      console.log(error)
      window.location.hash = '/'
    })
}
export const clearExpiredRequest = () => {
  expiredRequestArr = []
}
export const refreshToken = (expiredRequest: () => any) => {
  saveErrorRequest(expiredRequest)
  // 保证再发起更新时，已经没有了过期请求要进行存储
  if (timer) clearTimeout(timer)
  timer = setTimeout(() => {
    updateTokenByRefreshToken()
  }, 300)
}
