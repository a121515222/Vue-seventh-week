<template>ueLoading
  <div id="nav">
    <RouterView/>
  </div>
  <Notify></Notify>
</template>
<script>
import Notify from '@/components/Notification.vue'
export default {
  components: {
    Notify
  }
}
</script>
<style lang="scss">
@import "./assets/stylesheet/all";
</style>
