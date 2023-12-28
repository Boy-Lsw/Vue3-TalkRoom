import { defineStore } from 'pinia'
import { UserState } from './types'

const useUserStore = defineStore('UserStore', {
  state: (): UserState => {
    return {
      username: '',
      avatar: ''
    }
  },
  actions: {
    updateAvatar(avatar: string) {
      this.avatar = avatar
    }
  }
})
export default useUserStore
