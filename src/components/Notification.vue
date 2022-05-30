<template>
  <div class="toast-container position-fixed top-0 end-0" style="z-index:9999">
    <div class="toast show" style="background-color:rgba(255, 255, 255, 1)" role="alert"
    aria-live="assertive" aria-atomic="true"
    v-for="(item, index) in notification"
    :key="index"
    >
      <div class="toast-header">
        <span
        :class="`bg-${item.style}`"
        class="p-2 rounded me-2 d-inline-block"
        ></span>
        <strong class="me-auto">{{item.title}}</strong>
        <button class="btn-close" type="button" aria-label="Close"
        @click="deleteMessage(index)"></button>
      </div>
      <div class="toast-body">
        {{item.content}}
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import toastStore from '@/stores/toast'

export default {
  data () {
    return {
      bsToast: ''
    }
  },
  computed: {
    ...mapState(toastStore, ['notification'])
  },
  methods: {
    ...mapActions(toastStore, ['addMessage', 'deleteMessage'])
  }
}
</script>
