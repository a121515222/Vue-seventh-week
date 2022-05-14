<template>
  <div class="container pt-9">
    <VueLoading :active="isLoadingPage" :z-index="1060"/>
    訂購結束
    <GuestPayProcessInspector :current-status='payProcessFinished'/>
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
