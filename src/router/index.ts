import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './routes.ts'

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, _, next) => {
  if (to.fullPath != '/') {
    const token = localStorage.getItem('refresh_token')
    if (token) {
      next()
    } else {
      next('/')
    }
  } else {
    next()
  }
})

export default router
