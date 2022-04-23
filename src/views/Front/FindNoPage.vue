<template>
  <div class="container-fluid px-0 position-relative">
    <a class="text-white text-nowrap fz-1 position-absolute top-50 start-50 translate-middle" href="#" @click.prevent="goHomePage">
      <h2>迷路了嗎?點我帶你回家</h2>
    </a>
    <img src="https://upload.cc/i1/2022/03/27/GMxio4.jpg" style="max-height:400px; width:100% ;object-fit:cover; object-position:50% 75% ;" alt="dogPicture">
  </div>
  <Wall></Wall>
</template>
<script>
import Wall from '@/components/PictureWall.vue'
export default {
  components: {
    Wall
  },
  methods: {
    goHomePage () {
      this.$router.push('/')
    }
  }
}
</script>
<style lang="scss">
  a {
    text-decoration:none
  }
</style>
