const Home = () => import('@/views/Home.vue')
const Chat = () => import('@/views/Chat.vue')

const routes = [
  { path: '/', component: Home },
  { path: '/chat', component: Chat }
]

export default routes
