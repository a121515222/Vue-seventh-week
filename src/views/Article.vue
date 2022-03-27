<template>
<div class="container pt-10">
  <VueLoading :active="isLoadingPage" :z-index="1060"></VueLoading>
  <div class="row">
    <div class="col-12 col-lg-6">
      <img :src="article.image">
    </div>
    <div class="col-12 col-lg-6">
      <h2>{{article.title}}</h2>
      <p>作者:{{article.author}}</p>
      <!-- 得不到時間報錯，所以先給一個數值 -->
      <p>發布時間:{{showTime(article.create_at||0)}}</p>
      <p v-html="article.content"></p>
    </div>
  </div>

  <div class="row py-3" v-if="filterProducts.length > 0">
    <h2>推薦產品</h2>
    <template v-for="(item) in filterProducts" :key="item.id">
    <div v-if="item.is_enabled===1||4" class="card col-12 col-sm-6 col-lg-4 col-xl-3 px-0 position-relative cardHover">
        <img :src="item.imageUrl" :alt="item.title" class="img-fluid card-img-top" style="max-height:200px">
        <p v-if="item.is_enabled === 4"  class="position-absolute top-0 end-0 bg-secondary text-primary p-1">促銷中</p>
        <div class="card-body pb-0">
            <h2>{{item.title}}</h2>
            <p>{{item.description}}</p>
        </div>
        <div class="card-footer bg-transparent border-top-0">
          <div v-if="item.origin_price===item.price">
                <span>售價{{item.origin_price}}元</span>
                <span>/{{item.unit}}</span>
            </div>
            <div v-else>
              <span class="text-decoration-line-through text-middle">原價{{item.origin_price}}</span>
              <span class="text-danger">特價{{item.price}}元</span>
              <span>/{{item.unit}}</span>
            </div>
                    <button class="btn btn-outline-warning w-100 mb-1" @click="guestProductDetail(item.id)"
                    :disabled="item.id===isGuestPageLoading" :class="{buttonDisabledCursor : item.id===isGuestPageLoading}">
                    <span v-show="item.id===isGuestPageLoading" class="spinner-border spinner-border-sm"
                    role="status" aria-hidden="true">
                    </span>快速商品資訊</button>
                    <router-link :to= "`/product/${item.id}`" class="btn btn-outline-warning w-100 mb-1"
                    :disabled="item.id===isGuestPageLoading" :class="{buttonDisabledCursor : item.id===isGuestPageLoading}">
                    <span v-show="item.id===isGuestPageLoading" class="spinner-border spinner-border-sm"
                    role="status" aria-hidden="true">
                    </span>商品詳細資訊</router-link>
                    <button class="btn btn-success w-100" @click="guestAddCart(item.id)"
                    :disabled="item.id===isGuestPageLoading" :class="{buttonDisabledCursor : item.id===isGuestPageLoading}">
                    <span v-show="item.id===isGuestPageLoading" class="spinner-border spinner-border-sm"
                    role="status" aria-hidden="true">
                    </span>加到購物車</button>
                </div>
            </div>
            </template>
        </div>
        <!-- Modal -->
        <GuestProductModal ref="guestModal" @send-id="getId"></GuestProductModal>
        <CartCanvass ref="guestCart"></CartCanvass>
</div>
</template>
<script>
import GuestProductModal from '@/components/GuestProductModal.vue'
import CartCanvass from '@/components/CartCanvass.vue'
import { getTime } from '@/assets/util/ReadTime.js'
export default {
  data () {
    return {
      article: [],
      guestProduct: [],
      filterProducts: [],
      isGuestPageLoading: '',
      isLoading: false,
      isLoadingPage: false
    }
  },
  components: {
    GuestProductModal,
    CartCanvass
  },
  methods: {
    getId (id) {
      this.isGuestPageLoading = id
    },
    guestOpenCart () {
      this.$refs.guestCart.cartOpen()
    },
    guestAddCart (id) {
      this.$refs.guestModal.addCart(id)
      this.$refs.guestCart.getCart()
    },
    guestProductDetail (id) {
      this.$refs.guestModal.guestModalOpen(id)
    },
    showTime (time) {
      return getTime(time)
    },
    getArticle () {
      this.isLoadingPage = true
      const { id } = this.$route.params
      this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/article/${id}`).then((res) => {
        this.article = res.data.article
        this.getGuestProduct()
        this.isLoadingPage = false
      })
        .catch((error) => { console.dir(error) })
    },
    getGuestProduct () {
      this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`).then((res) => {
        this.guestProduct = res.data.products
        this.guestShowProduct = this.guestProduct
        this.filterProduct()
      })
        .catch((error) => {
          console.dir(error)
        })
    },
    filterProduct () { // 推薦商品功能
      const keyword = this.article.tag
      keyword.forEach((item) => {
        this.guestProduct.forEach((i) => {
          if (i.category.indexOf(item) !== -1 || i.content.indexOf(item) !== -1 || i.description.indexOf(item) !== -1 ||
          i.title.indexOf(item) !== -1) {
            this.filterProducts.push(i)
            // 去除重複的資料
            // this.filterProducts = [...new Set(this.filterProducts)]
            this.filterProducts = this.filterProducts.filter((item, index) => {
              return this.filterProducts.indexOf(item) === index
            })
          }
        })
      })
    }
  },
  mounted () {
    this.getArticle()
  }
}
</script>
