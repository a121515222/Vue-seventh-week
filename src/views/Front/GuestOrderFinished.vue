<template>
  <div class="container pt-9 d-flex flex-column">
    <GuestPayProcessInspector :current-status='payProcessFinished'/>
    <div class="d-flex flex-column justify-content-center align-items-center" style="height:70vh">
      <h3 class="fs-1 text-primary text-center" style="text-shadow:1px 1px black">已付款完成，感謝您的購買。</h3>
      <RouterLink class="btn btn-primary btnStyle"
      to=/products
      tag="button">
        也許還有喜歡的?點我看看
      </RouterLink>
    </div>
  </div>
</template>

<script>
import GuestPayProcessInspector from '@/components/GuestPayProcessInspector.vue'
export default {
  data () {
    return {
      payProcessFinished: 'payProcessFinished'
    }
  },
  components: {
    GuestPayProcessInspector
  }
}
</script>
