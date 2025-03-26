<template>
  <div class="container-fluid pt-5 px-0">
    <div class="frame d-flex justify-content-center align-item-center position-relative"
    :class="{ 'frame-short':scrollY > 10 }">
      <ul class="bannerGroup px-0" ref="BannerImages"
      :class="{ 'banner-center' : scrollY > 10 }">
        <li class="d-none-slow" style="background-image:url(https://firebasestorage.googleapis.com/v0/b/imagestorge-b6395.appspot.com/o/vueShop%2FIMG_9359.JPG?alt=media&token=48410a79-62b5-444a-a435-87a0778051fc)"
        :class="{'bannerAnimation' : animationAction % imgLen === 0}"></li>
        <li class="d-none-slow" style="background-image:url(https://firebasestorage.googleapis.com/v0/b/imagestorge-b6395.appspot.com/o/vueShop%2FDuWGTAnc8x7CWX9t-generated_image.jpg?alt=media&token=b14a24a6-c30a-48e8-852b-497e872e0b22)"
        :class="{'bannerAnimation' : animationAction % imgLen === 1}"></li>
        <li class="d-none-slow" style="background-image:url(https://firebasestorage.googleapis.com/v0/b/imagestorge-b6395.appspot.com/o/vueShop%2FRlh3PIsGcf5fOeRc-generated_image.jpg?alt=media&token=5761ace9-2461-49f4-a80b-e62650eaad45)"
        :class="{'bannerAnimation' : animationAction % imgLen === 2}"></li>
        <li class="d-none-slow" style="background-image:url(https://firebasestorage.googleapis.com/v0/b/imagestorge-b6395.appspot.com/o/vueShop%2FZBdgw33tP85J6wX9-generated_image.jpg?alt=media&token=5238df68-d25f-4f3c-a7be-f5ffedcacf33)"
        :class="{'bannerAnimation' : animationAction % imgLen === 3}"></li>
      </ul>
      <div class="from-group d-flex flex-column position-absolute top-50 start-50 translate-middle">
        <h1 class=" text-secondary fw-bold textShadow no-warp">想體驗新鮮的農產品嗎?</h1>
        <div class="align-self-center">
        <RouterLink class="btn btn-secondary text-dark btnStyle"
        to=/products
        tag="button">
          馬上了解
        </RouterLink>
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
        <div class="card flex-md-row flex-md-row-cross cardHover px-sm-0 "
        v-if ="item.title ==='台農1號百香果' || item.title ==='醜豆'">
          <div class="col-12 col-md-6">
            <img style="max-height:200px; min-width:100% ; object-fit: cover"
            :src="item.imageUrl" :alt="item.title">
          </div>
          <div class="col-12 col-md-6 d-flex flex-column justify-content-between">
            <h3 class="fs-2 fw-bold px-2">{{item.title}}</h3>
            <p v-html="item.description" class="lineClamp px-2"></p>
            <div class="d-flex gap-2  px-2"
            v-if="item.origin_price === item.price">
              <span>售價:{{item.origin_price}}元</span>
              <span>/{{item.unit}}</span>
            </div>
            <div v-else class="d-flex gap-2">
              <span class="text-decoration-line-through text-middle">原價{{item.origin_price}}</span>
              <span class="text-danger">特價{{item.price}}元</span>
              <span>/{{item.unit}}</span>
            </div>
            <RouterLink class="btn btn-primary"
            :to="`/product/${item.id}`">
              馬上購買
            </RouterLink>
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
          <RouterLink class="btn btn-secondary text-dark btnStyle"
          to=/articles
          tag="button">
            點我看更多!
          </RouterLink>
        </div>
      </div>
      <div class="from-group d-flex flex-column align-item-center position-absolute bottom-10 start-50 translate-middle">
        <span class="text-secondary textShadow">稍微了解</span>
        <i class="animation-scrollDown bi bi-caret-down fs-1 text-secondary align-self-center"></i>
      </div>
    </div>
  </div>
  <div class="container my-3">
    <div class="row">
      <!-- 文章卡片 -->
      <template v-for="(item, index) in articles" :key ="item + index">
        <div v-if="index < 4" class="col-sm-12 col-md-6 col-lg-3 ">
          <div class="card w-100 h-100 cardHover" >
            <img class="card-img-top" :alt="item.title"
            style="min-height:200px;max-height:200px;min-width:100% ; object-fit: cover"
            :src="item.image">
              <div class="card-body">
                <h3 class="fs-2 fw-bold">{{item.title}}</h3>
                <p class="card-text lineClamp">{{item.description}}</p>
              </div>
              <div class="card-foot border-top-0 px-3 pb-3">
              <RouterLink class="btn btn-primary"
              :to="`/article/${item.id}`">
                詳細資訊
              </RouterLink>
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
          <i class="animation-scrollDown bi bi-caret-down fs-1 text-secondary align-self-center"></i>
        </div>
      </div>
  </div>
  <div class="container my-3">
    <div class="row">
      <template v-for="(item, index) in guestProduct" :key ="item.title+index">
        <div class="card flex-md-row flex-md-row-cross cardHover px-sm-0"
        v-if="item.title === '澳洲茶樹精油-5ml'">
          <div class="col-12 col-md-6">
            <img style="max-height:200px; min-width:100% ; object-fit: cover"
            :src="item.imageUrl" :alt="item.title">
          </div>
            <div class="col-12 col-md-6 d-flex flex-column justify-content-between">
              <h3 class="fs-2 fw-bold px-2">{{item.title}}</h3>
              <p class="lineClamp px-2">{{item.description}}</p>
               <div class="d-flex gap-2 px-2" v-if="item.origin_price === item.price" >
                 <span>售價:{{item.origin_price}}元</span>
                 <span>/{{item.unit}}</span>
               </div>
               <div v-else class="d-flex gap-2">
                <span class="text-decoration-line-through text-middle">原價{{item.origin_price}}</span>
                <span class="text-danger">特價{{item.price}}元</span>
                <span>/{{item.unit}}</span>
              </div>
              <RouterLink class="btn btn-primary"
              :to="`/product/${item.id}`">
                馬上購買
              </RouterLink>
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
@import "../../assets/stylesheet/helper/color";

$animationDuration:6s;
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
    background-image: url(https://storage.googleapis.com/vue-course-api.appspot.com/chun-chia/1652260363517.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=E%2FkEzKyp%2BtIyg6DGjzDAXAlAwrImtalmqjoH8DvwudNk49puvmRmAdtQTS1SL%2FvHhARiw%2FuhiHG0ICkOlHpft6NRk0hgKaHEVi1TyApl62rGJPXDJpOHwZRkiVPzoIqO8R2SY7YIusJBsyZmf8cI7Hr4S5BXBGupValaxIz2p%2FtZv4jj3a2DUZMuyPK8yHZF00V7UxooszeX6OiBQhFMxnIYjvgXHkQuV6OHJq3%2BUjdXW0ubLIq7TI%2FuXzd3bOieFLiTwu8QyI8%2BLeQjXIdywEqkUycavR2zWaNZwlxHiJArhQHvmfuO%2Fot5P%2BnQJeX5uz09m%2FuL1JDZz2KFk56IBQ%3D%3D);
    background-repeat: no-repeat;
    background-size:cover;
    background-position: center center;
  }
  .middleBanner {
    height:40vh;
    background-image: url(https://storage.googleapis.com/vue-course-api.appspot.com/chun-chia/1652260099287.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=ZRPB2H%2BL4eMyzETsJo6S9hxSXmiZMwWFS7r9OW5dJ%2BaAFtE59RzAr50pO1rVS3PvUeKaPH4U6sUHlXOzHAJxpBYOgg3rHfmMuyjlg4qUwD%2FS1GhVzxGxfu%2BRmhFRnJFSMjgyvI7Zcx0g3zpvxvgSDWGxO3uSuSYUqOHUKdnvRzvE%2FbYF0iJN82lxr9UG9vcl9O0TNIlLf%2F%2FCFxAqsKTDvNUmumsoH3cVaI8XutbqO%2FMqqN0txbvbKZqT0t%2Bm1c%2FOM78S5O5Ggbksc3k8POKqWBvV7N%2F8MwhD57KgKBGjTw8qtrAxmgvduEaFO%2B8M3CqIEIK0Jw83Md1LHUIwi9I5wA%3D%3D);
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
