<template>
<div class="container-fluid pt-6 px-0">
<div class="frame d-flex justify-content-center align-item-center position-relative" :class="{ 'frame-short':scrollY > 10 }">
    <div class="banner" :class="{ 'banner-center': scrollY > 10}">
    </div>
    <div class="banner2" :class="{ 'banner-center': scrollY > 10}">
    </div>
    <div class="from-group d-flex flex-column position-absolute top-50 start-50 translate-middle">
      <h1 class=" text-secondary no-warp">想體驗新鮮的農產品嗎?</h1>
      <div class="align-self-center">
     <router-link class="btn btn-secondary text-light" to=/products tag="button">馬上想吃到</router-link>
      </div>

    </div>
    <div class="from-group d-flex flex-column align-item-center position-absolute bottom-10 start-50 translate-middle"
        :class="{ 'd-none': scrollY > 10}">
          <span class="text-secondary">了解更多</span>
          <i class="animation-scrollDown bi bi-caret-down fs-1 text-secondary align-self-center" ></i>
        </div>
</div>
<div class="container">
    <div class="row">
        <div class="from-group flex-column flex-md-row-cross">
            <div class="col-12 col-md-6">
                <img src="https://upload.cc/i1/2022/03/16/zU8Os9.jpg" alt="">
            </div>
            <div class="col-12 col-md-6"></div>
        </div>
        <div class="from-group flex-column d-flex flex-md-row-cross ">
            <div class="col-12 col-md-6">
                <img src="https://upload.cc/i1/2022/03/16/zU8Os9.jpg" alt="">
            </div>
            <div class="col-12 col-md-6"></div>
        </div>
        <div class="col-sm-12 col-md-6 col-lg-3">
            <div class="card w-100" >
            <img src="https://upload.cc/i1/2022/03/16/zU8Os9.jpg" class="card-img-top" alt="...">
            <div class="card-body">
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <router-link to="/article">更多...</router-link>
            </div>
             </div>
        </div>
        <div class="col-sm-12 col-md-6 col-lg-3">
            <div class="card w-100" >
            <img src="https://upload.cc/i1/2022/03/16/zU8Os9.jpg" class="card-img-top" alt="...">
            <div class="card-body">
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
             </div>
        </div>
        <div class="col-sm-12 col-md-6 col-lg-3">
            <div class="card w-100" >
            <img src="https://upload.cc/i1/2022/03/16/zU8Os9.jpg" class="card-img-top" alt="...">
            <div class="card-body">
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
             </div>
        </div>
        <div class="col-sm-12 col-md-6 col-lg-3">
            <div class="card w-100" >
            <img src="https://upload.cc/i1/2022/03/16/zU8Os9.jpg" class="card-img-top" alt="...">
            <div class="card-body">
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
             </div>
        </div>
    </div>
</div>
<div class="container-fluid px-0">
<div class="banner3 position-relative">
    <div class="from-group d-flex flex-column align-item-center position-absolute top-50 start-50 translate-middle">
        <h1 class=" text-secondary no-warp">還有更特別的</h1>
        <div class="align-self-center">
          <router-link class="btn btn-secondary text-light" to=/products tag="button">等不及了馬上看!</router-link>
        </div>
     </div>
    <div class="from-group d-flex flex-column align-item-center position-absolute bottom-10 start-50 translate-middle">
          <span class="text-secondary">了解更多</span>
          <i class="animation-scrollDown bi bi-caret-down fs-1 text-secondary align-self-center" ></i>
        </div>
</div>
</div>
</div>
</template>
<style lang="scss">
$animationBannerSecond:16s;
.banner {
  position: absolute;
  top: 0;
  background-image: url(https://upload.cc/i1/2022/03/16/zU8Os9.jpg);
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size:cover;
  transition: all 0.5s;
  animation:bannerCarousel;
  animation-duration: $animationBannerSecond;
  animation-timing-function: ease-in;
  animation-iteration-count: infinite;
}
.banner2 {
  position: absolute;
  top: 0;
  background-image: url(https://upload.cc/i1/2022/03/16/LkU1hR.jpg);
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size:cover;
  transition: all 0.5s;
  animation:bannerCarousel;
  animation-duration: $animationBannerSecond;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-delay: $animationBannerSecond * 0.5;
}
.banner3 {
    height:30vh;
    background-image: url(https://upload.cc/i1/2022/03/16/LkU1hR.jpg);
    background-repeat: no-repeat;
    background-size:cover;
    background-position: center center;
}
.banner-center {
//監測到scrollY的值大於60時 使用這個效果
  position: absolute;
  top: 100px;
  transition: all 0.5s;
  width: 75%;
  height: 60%;
}
.frame {
  min-height: 100vh;
  transition: all 0.5s;
}
.frame-short {
  min-height: 60vh;
  transition: all 0.5s;
}
.animation-scrollDown {
  position: absolute;
  animation: scrollDown;
  animation-duration: 1s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}
@keyframes scrollDown {
  from {
  top: 0
  }
  to {
  top: 12px
  }
}
@keyframes bannerCarousel {
0% {
    opacity: 100%;
}
25% {
    opacity: 50%;
}
40% {
    opacity: 0%;
}
60% {
    opacity: 0%;
}
75% {
    opacity: 50%;
}
100% {
    opacity: 100%;
}
}
</style>
<script>
export default {
  data () {
    return {
      scrollY: 0
    }
  },
  methods: {
    scrollWatch () {
      // 取得scrollY數值
      this.scrollY = window.scrollY
    }
  },
  mounted () {
    // 監聽scroll
    window.addEventListener('scroll', this.scrollWatch)
  }
}
</script>
