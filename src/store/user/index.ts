import { defineStore } from 'pinia'
import { UserState } from './types'

const useUserStore = defineStore('UserStore', {
  state: (): UserState => {
    return {
      username: '',
      curChater: ''
    }
  },
  actions: {
    updateUsername(username: string) {
      this.username = username
    },
    updateCurChater(username: string) {
      this.curChater = username
    }
  }
})
export default useUserStore
