import { defineStore } from 'pinia'
import { UserState } from './types'

const useUserStore = defineStore('UserStore', {
  state: (): UserState => {
    return {
      username: ''
    }
  },
  actions: {
    updateUsername(username: string) {
      this.username = username
    }
  }
})
export default useUserStore
