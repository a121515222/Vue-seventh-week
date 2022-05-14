<template>
  <div class="container-fluid pt-7 px-0">
    <div class="frame d-flex justify-content-center align-item-center position-relative"
    :class="{ 'frame-short':scrollY > 10 }">
      <ul class="bannerGroup px-0" ref="BannerImages"
      :class="{ 'banner-center' : scrollY > 10 }">
        <li class="d-none-slow" style="background-image:url(https://storage.googleapis.com/vue-course-api.appspot.com/chun-chia/1652259953185.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=SiEnRDMhsYt%2Bv98iDemtQRTjL5WG1Y0AuxwgZTiJM9FU9q5WTzkpjB0xkghzcPVGEEaLChFR6uAe2TI59nQJhoBoKcK3kW64YleYC9ITfDZdMHe9M833Kzd7t0lAS5UCR0h8tUNbQnmoWh9JbfnjM3Pf%2BYvc14e912vBgKGL6oesX6rjTfk79S%2FiX2aVszTSf3D3mEWZZ%2BXtyPwghbBFjl7n2BoEtzXFIk%2B%2B49mcbgbHWw%2FMpoeTNfSFKYK4qVoVSoXrC15wVoB3FReLzSLHupyGPMzcPi0qKb51HyBoLmFznvTxymoOUHBP%2FawPbQ9o7%2BkdHsDioaGbJwIGt29gnA%3D%3D)"
        :class="{'bannerAnimation' : animationAction % imgLen === 0}"></li>
        <li class="d-none-slow" style="background-image:url(https://storage.googleapis.com/vue-course-api.appspot.com/chun-chia/1652260045306.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=YG9ZpKhC%2F9WFYAlqCTDJ1sijGMTONgAeEG2DFkI6Z%2FssrMX968TP075wxK8G3%2FBmRp9IkMJrVNDqkRVjY5zjar1wGhlCHUtDqKX%2FAnYAEJEyZjg9N8BcyoztpPgw5RP90kzY8eqrtrA3uKHR0kVX3yNoauNbXQX1OJ67Mtc9hG2fj%2FiXhP%2BIxkiCxbQ9f5OeCJaxLzkwnyNJxmcNvTfM23XfN3YL8nTih61uvwrBZtAK%2Bknuh%2F1%2BlyE5VrXKmB%2BiIAAxe6dcoqcPzwOppiPonf7VYB8PNNeLRxITXkHHtz4Q3IczUeusPo1LPXx3Rz0blmpSSqQOJEX17FeH7D7aiw%3D%3D)"
        :class="{'bannerAnimation' : animationAction % imgLen === 1}"></li>
        <li class="d-none-slow" style="background-image:url(https://storage.googleapis.com/vue-course-api.appspot.com/chun-chia/1652260363517.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=E%2FkEzKyp%2BtIyg6DGjzDAXAlAwrImtalmqjoH8DvwudNk49puvmRmAdtQTS1SL%2FvHhARiw%2FuhiHG0ICkOlHpft6NRk0hgKaHEVi1TyApl62rGJPXDJpOHwZRkiVPzoIqO8R2SY7YIusJBsyZmf8cI7Hr4S5BXBGupValaxIz2p%2FtZv4jj3a2DUZMuyPK8yHZF00V7UxooszeX6OiBQhFMxnIYjvgXHkQuV6OHJq3%2BUjdXW0ubLIq7TI%2FuXzd3bOieFLiTwu8QyI8%2BLeQjXIdywEqkUycavR2zWaNZwlxHiJArhQHvmfuO%2Fot5P%2BnQJeX5uz09m%2FuL1JDZz2KFk56IBQ%3D%3D)"
        :class="{'bannerAnimation' : animationAction % imgLen === 2}"></li>
        <li class="bannerSpecial d-none-slow" style="background-image:url(https://storage.googleapis.com/vue-course-api.appspot.com/chun-chia/1652260099287.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=ZRPB2H%2BL4eMyzETsJo6S9hxSXmiZMwWFS7r9OW5dJ%2BaAFtE59RzAr50pO1rVS3PvUeKaPH4U6sUHlXOzHAJxpBYOgg3rHfmMuyjlg4qUwD%2FS1GhVzxGxfu%2BRmhFRnJFSMjgyvI7Zcx0g3zpvxvgSDWGxO3uSuSYUqOHUKdnvRzvE%2FbYF0iJN82lxr9UG9vcl9O0TNIlLf%2F%2FCFxAqsKTDvNUmumsoH3cVaI8XutbqO%2FMqqN0txbvbKZqT0t%2Bm1c%2FOM78S5O5Ggbksc3k8POKqWBvV7N%2F8MwhD57KgKBGjTw8qtrAxmgvduEaFO%2B8M3CqIEIK0Jw83Md1LHUIwi9I5wA%3D%3D)"
        :class="{'bannerAnimation': animationAction % imgLen === 3}"></li>
        <li class="d-none-slow" style="background-image:url(https://storage.googleapis.com/vue-course-api.appspot.com/chun-chia/1652260184963.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=juhYb%2FKhH1KWiij7g9tU4voNPdpyDTZtNIv49R0W8554DsSBmkqci3Bd0iOp250NMR1sMgGB9coee80SJ0CeoP%2FaKesb5SotKZRVvl1W56ym6G3W1mCYMU4WORjT5Zqeny0%2Bao0hOZXCXQg4S5T6oJh6XksRjeOg8ilCL0FePTOhhjoejsTmRCKycmaUSoS7VismMPvDu8B6c7apgFESWGM59dKlu60M%2Bome3hvsJsUwpvXnShhKQ6h4oj56jpirqMxczxE5joTagHYbNZYeMxcG%2Bzl64vMu%2Fz%2F4%2FnI0XgLmXOG%2FdjWNGZ0fzsoRK3UPMA6lydQAJifWw3afW4FoSg%3D%3D)"
        :class="{'bannerAnimation' : animationAction % imgLen === 4}"></li>
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
