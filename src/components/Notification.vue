<template>
  <div class="toast-container position-fixed top-0 end-0" style="z-index:9999">
    <div v-for="(item, index) in notification" :key="index" class="toast show" style="background-color:rgba(255, 255, 255, 1)" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header">
          <span
          :class="`bg-${item.style}`"
          class="p-2 rounded me-2 d-inline-block"
        ></span>
          <strong class="me-auto">{{item.title}}</strong>
          <button type="button" class="btn-close"  aria-label="Close" @click="deleteMessage(index)"></button>
        </div>
        <div class="toast-body">
          {{item.content}}
        </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      notification: [],
      bsToast: ''
    }
  },
  methods: {
    deleteMessage (index) {
      this.notification.splice(index, 1)
    },
    autoDelete () {
      setTimeout(() => {
        this.notification.shift()
      }, 7000)
    }
  },
  mounted () {
    this.$emitter.on('push-info', (info) => {
      this.notification.push(info)
      this.autoDelete()
    })
  }
}
</script>
