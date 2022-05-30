import { defineStore } from 'pinia'

export default defineStore('', {
  state: () => {
    return {
      notification: []
    }
  },
  actions: {
    addMessage (message) {
      this.notification.push(message)
      setTimeout(() => {
        this.notification.shift()
      }, 5000)
    },
    deleteMessage (index) {
      this.notification.splice(index, 1)
    }
  }
})
