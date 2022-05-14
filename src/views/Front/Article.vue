<template>
  <div class="container pt-10">
  <VueLoading :active="isLoadingPage" :z-index="1060"/>
  <div class="row my-3">
    <div class="col-12 col-lg-6 px-0" style="min-height:45vh; max-height:45vh;" >
      <img style="width:100%; height:100%; object-fit:cover;"
      :src="article.image"
      :alt="article.title + 'picture'">
    </div>
    <div class="col-12 col-lg-6 mt-3">
      <h2 class="fw-bold fa-2 mb-2">{{article.title}}</h2>
      <p class="fa-4 mb-2">作者:{{article.author}}</p>
      <p class="fa-4 mb-2">發布時間:{{showTime(article.create_at || 0)}}</p>
      <p class="mb-2" v-html="article.content"></p>
    </div>
  </div>
  <div class="row my-3" v-if="filterProducts.length > 0">
    <h2 class="fw-bold fa-2">推薦產品</h2>
    <ProductsShow :guest-show-product="filterProducts"
    :is-guest-page-loading="isGuestPageLoading"
    @send-id="guestProductDetail"
    @add-cart="guestAddCart"
    />
  </div>
  <!-- Modal -->
  <GuestProductModal ref="guestModal" @send-id="getId"/>
  </div>
</template>

<script>
import GuestProductModal from '@/components/GuestProductModal.vue'
import { getTime } from '@/methods/ReadTime.js'
import ProductsShow from '@/components/ProductsShow.vue'

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
    ProductsShow
  },
  methods: {
    getId (id) {
      this.isGuestPageLoading = id
    },
    guestAddCart (id, title) {
      this.$refs.guestModal.addCart(id, title)
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
        this.filterProduct()
      })
        .catch((err) => {
          console.dir(err.response.data.message)
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
