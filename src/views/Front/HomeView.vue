<template>
  <div class="container-fluid pt-7 px-0">
      <div class="frame d-flex justify-content-center align-item-center position-relative" :class="{ 'frame-short':scrollY > 10 }">
        <ul class="bannerGroup px-0" :class="{ 'banner-center' : scrollY > 10 }" ref="BannerImages">
          <li  class="d-none-slow" :class="{'bannerAnimation' : animationAction % imgLen === 0}" style="background-image:url(https://upload.cc/i1/2022/03/26/VEKZkG.jpg)"></li>
          <li  class="d-none-slow" :class="{'bannerAnimation' : animationAction % imgLen === 1}" style="background-image:url(https://upload.cc/i1/2022/03/26/hdM1VB.jpg)"></li>
          <li  class="d-none-slow" :class="{'bannerAnimation' : animationAction % imgLen === 2}" style="background-image:url(https://upload.cc/i1/2022/03/27/bytXzS.jpg)"></li>
          <li  class="bannerSpecial d-none-slow" :class="{'bannerAnimation': animationAction % imgLen === 3}" style="background-image:url(https://upload.cc/i1/2022/03/27/GMxio4.jpg)"></li>
          <li  class="d-none-slow" :class="{'bannerAnimation' : animationAction % imgLen === 4}" style="background-image:url(https://upload.cc/i1/2022/03/27/7urNmk.jpg)"></li>
        </ul>
        <div class="from-group d-flex flex-column position-absolute top-50 start-50 translate-middle">
          <h1 class=" text-secondary fw-bold textShadow no-warp">想體驗新鮮的農產品嗎?</h1>
          <div class="align-self-center">
          <RouterLink class="btn btn-secondary text-dark btnStyle" to=/products tag="button">馬上了解</RouterLink>
          </div>
        </div>
        <div class="from-group d-flex flex-column align-item-center position-absolute bottom-10 start-50 translate-middle"
        :class="{ 'd-none': scrollY > 10}">
          <span class="text-secondary textShadow">了解更多</span>
          <i class="animation-scrollDown bi bi-caret-down fs-1 text-secondary align-self-center" ></i>
        </div>
      </div>
  </div>
  <div class="container my-3">
    <!-- 產品交錯卡片 -->
    <div class="row gap-3">
      <template v-for="(item, index) in guestProduct" :key ="item.title+index">
        <div v-if ="item.title ==='台農1號百香果' || item.title ==='醜豆'" class="card flex-md-row flex-md-row-cross cardHover px-sm-0 ">
          <div class="col-12 col-md-6">
            <img :src="item.imageUrl" :alt="item.title" style="max-height:200px; min-width:100% ; object-fit: cover">
          </div>
          <div class="col-12 col-md-6 d-flex flex-column justify-content-between">
            <h3 class="fs-2 fw-bold px-2">{{item.title}}</h3>
            <p class="lineClamp px-2">{{item.description}}</p>
            <div v-if="item.origin_price === item.price" class="d-flex gap-2  px-2">
              <span>售價:{{item.origin_price}}元</span>
              <span>/{{item.unit}}</span>
            </div>
            <div v-else class="d-flex gap-2">
              <span class="text-decoration-line-through text-middle">原價{{item.origin_price}}</span>
              <span class="text-danger">特價{{item.price}}元</span>
              <span>/{{item.unit}}</span>
            </div>
            <RouterLink :to="`/product/${item.id}` " class="btn btn-primary">馬上購買</RouterLink>
          </div>
        </div>
      </template>
      </div>
  </div>
  <div class="container-fluid px-0 my-3">
    <div class="middleBanner position-relative">
      <div class="from-group d-flex flex-column align-item-center position-absolute top-50 start-50 translate-middle">
        <h2 class="fs-1 text-secondary textShadow no-warp">小知識</h2>
        <div class="align-self-center">
          <RouterLink class="btn btn-secondary text-dark btnStyle" to=/articles tag="button">點我看更多!</RouterLink>
        </div>
      </div>
      <div class="from-group d-flex flex-column align-item-center position-absolute bottom-10 start-50 translate-middle">
        <span class="text-secondary textShadow">稍微了解</span>
        <i class="animation-scrollDown bi bi-caret-down fs-1 text-secondary align-self-center" ></i>
      </div>
    </div>
  </div>
  <div class="container my-3">
    <div class="row">
      <!-- 文章卡片 -->
      <template v-for="(item, index) in articles" :key ="item + index">
        <div v-if="index < 4" class="col-sm-12 col-md-6 col-lg-3 ">
          <div class="card w-100 h-100 cardHover" >
            <img :src="item.image" class="card-img-top" :alt="item.title" style="min-height:200px;max-height:200px;min-width:100% ; object-fit: cover">
              <div class="card-body">
                <h3 class="fs-2 fw-bold">{{item.title}}</h3>
                <p class="card-text lineClamp">{{item.description}}</p>
              </div>
              <div class="card-foot border-top-0 px-3 pb-3">
              <RouterLink :to="`/article/${item.id}`" class="btn btn-primary">詳細資訊</RouterLink>
              </div>
          </div>
        </div>
      </template>
    </div>
  </div>
  <div class="container-fluid px-0 my-3">
      <div class="bottomBanner position-relative">
        <div class="from-group d-flex flex-column align-item-center position-absolute top-50 start-50 translate-middle">
          <h2 class="fs-1 text-secondary textShadow no-warp">還有更特別的</h2>
        </div>
        <div class="from-group d-flex flex-column align-item-center position-absolute bottom-10 start-50 translate-middle">
          <span class="text-secondary textShadow">了解更多</span>
          <i class="animation-scrollDown bi bi-caret-down fs-1 text-secondary align-self-center" ></i>
        </div>
      </div>
  </div>
  <div class="container my-3">
    <div class="row">
      <template v-for="(item, index) in guestProduct" :key ="item.title+index">
        <div v-if ="item.title === '澳洲茶樹精油-5ml'" class="card flex-md-row flex-md-row-cross cardHover px-sm-0">
          <div class="col-12 col-md-6">
            <img :src="item.imageUrl" :alt="item.title" style="max-height:200px; min-width:100% ; object-fit: cover">
          </div>
            <div class="col-12 col-md-6 d-flex flex-column justify-content-between">
              <h3 class="fs-2 fw-bold px-2">{{item.title}}</h3>
              <p class="lineClamp px-2">{{item.description}}</p>
               <div v-if="item.origin_price === item.price" class="d-flex gap-2 px-2">
                 <span>售價:{{item.origin_price}}元</span>
                 <span>/{{item.unit}}</span>
               </div>
               <div v-else class="d-flex gap-2">
                <span class="text-decoration-line-through text-middle">原價{{item.origin_price}}</span>
                <span class="text-danger">特價{{item.price}}元</span>
                <span>/{{item.unit}}</span>
              </div>
              <RouterLink :to="`/product/${item.id}` " class="btn btn-primary">馬上購買</RouterLink>
            </div>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      scrollY: 0,
      guestProduct: [],
      articles: [],
      animationAction: 0,
      imgLen: 0,
      animationDuration: 3000
    }
  },
  methods: {
    runAnimation () {
      setInterval(() => {
        this.animationAction += 1
      }, this.animationDuration)
    },
    scrollWatch () {
      // 取得scrollY數值
      this.scrollY = window.scrollY
    },
    getProduct () {
      this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`).then((res) => {
        this.guestProduct = res.data.products
        this.guestShowProduct = this.guestProduct
      })
        .catch((err) => {
          console.dir(err.response.data.message)
        })
    },
    getArticle () {
      this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/articles`)
        .then((res) => {
          this.articles = res.data.articles
        })
        .catch((err) => { console.dir(err.response.data.message) })
    }
  },
  mounted () {
    // 監聽scroll
    window.addEventListener('scroll', this.scrollWatch)
    this.getArticle()
    this.getProduct()
    this.imgLen = this.$refs.BannerImages.children.length
    this.runAnimation()
  }
}
</script>
<style lang="scss">
@import "~bootstrap/scss/functions";
@import "../../assets/stylesheet/helper/variables";
$animationDuration:6s;
  .btnStyle {
    border: 3px solid #fff;
    &:hover {
      border: 3px solid rgb(255, 0, 0);
      color: #fff !important;
      text-shadow: 1px 1px 0 rgb(0, 0, 0);
    }
  }
  .textShadow {
    text-shadow: 2px 2px 0px rgb(0, 0, 0);
  }
  .btn-primary {
    color: $secondary;
  }
  .btn-secondary {
    color: $primary;
  }
  .d-none-slow{
    transition: all $animationDuration;
    opacity: 0;
  }
  .bannerGroup {
    position: relative;
    width: 100%;
    li {
      list-style: none;
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      background-repeat: no-repeat;
      background-size:cover;
      background-position:center center;
    }
  }
  .bannerAnimation {
    transition: all $animationDuration;
    opacity: 1;
  }
  .bannerSpecial {
    background-position:50% 70% !important;
  }
  .bottomBanner {
    height:30vh;
    background-image: url(https://upload.cc/i1/2022/03/16/LkU1hR.jpg);
    background-repeat: no-repeat;
    background-size:cover;
    background-position: center center;
  }
  .middleBanner {
    height:40vh;
    background-image: url(https://upload.cc/i1/2022/03/21/UztxmA.jpg);
    background-repeat: no-repeat;
    background-size:cover;
    background-position: 50% 70%;
  }
  .banner-center {
  //監測到scrollY的值大於設定值時 使用這個效果
    position: absolute;
    top: 100px;
    transition: all 0.5s;
    width: 80%;
    height: 70%;
  }
  .frame {
    min-height: 94vh;
    transition: all 0.5s;
  }
  .frame-short {
    min-height: 50vh;
    transition: all 0.5s;
  }
  .animation-scrollDown {
    position: absolute;
    animation: scrollDown;
    animation-duration: 1s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    -webkit-animation: scrollDown;
    -webkit-animation-duration: 1s;
    -webkit-animation-timing-function: linear;
    -webkit-animation-iteration-count: infinite;
  }
@keyframes scrollDown {
  from {
  top: 5px;
  }
  to {
  top: 16px;
  }
}
</style>
