<template>
  <div class="container pt-10">
    <VueLoading :active="isLoadingPage" :z-index="1060"></VueLoading>
    <div class="row card flex-md-row mx-0">
      <div class=" col-12 col-lg-6 ps-0">
        <template v-if="images.length > 2">
          <div class="img-fluid" style="height:360px; overflow:hidden;">
            <img :src="images[pictureIndex]" :alt="`${product.title} picture`" style="object-fit:cover; width:100%; height:100%;">
          </div>
        </template>
        <template v-else-if="images.length <= 2">
          <div class="img-fluid" style="height:360px; overflow:hidden;">
          <img :src="product.imageUrl" :alt="`${product.title} picture`" style="object-fit:cover; width:100%; height:100%;">
        </div>
        </template>
      </div>
      <div class="col-12 col-lg-6 d-flex flex-column justify-content-between pe-0 mt-3">
        <div class="from-group pe-2">
          <h2 class="fw-bold fs-2">{{product.title}}</h2>
          <div class="fs-4" v-html="product.description"></div>
        </div>
        <div class="from-group">
          <template v-if="product.origin_price === product.price">
            <div class="d-flex justify-content-end gap-2 pe-2">
              <span>售價{{product.origin_price}}元</span>
              <span>/{{product.unit}}</span>
            </div>
          </template>
          <template v-else-if="product.origin_price > product.price">
            <div class="d-flex justify-content-end gap-2 pe-2">
              <span class="text-decoration-line-through text-middle">原價{{product.origin_price}}</span>
              <span class="text-danger">特價{{product.price}}元</span>
              <span>/{{product.unit}}</span>
            </div>
          </template>
          <div class="d-flex justify-content-end gap-3 ">
            <button type="button" class="btn btn-primary text-secondary text-nowrap" @click="qty -= 1" :disabled="qty < 2"
            :class="{buttonDisabledCursor : qty < 2}">
              <i class="bi bi-dash"></i>
            </button>
            <span class="align-self-center px-1" style="min-width:20px"> {{qty}}</span>
            <button type="button" class="btn btn-primary text-secondary text-nowrap" @click="qty += 1" :disabled="qty === 100"
            :class="{buttonDisabledCursor : qty === 100}">
              <i class="bi bi-plus"></i>
            </button>
            <button type="button" class="btn btn-primary text-secondary text-nowrap" @click="addCart(product.id, product.title)" :disabled="isLoading || qty < 1"
            :class="{buttonDisabledCursor : isLoading || qty < 1}">
              <span v-show="isLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              加入購物車
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12 py-3" v-if="images.length > 2" >
        <h3 class="fa-2 fw-bold">產品圖片</h3>
        <div class="d-flex flex-row gap-3 customScrollBar" style="overflow-x:scroll">
          <div class="pictureSize" v-for="(i, index) in images" :key="i + index">
            <a href="#" @click.prevent="changePicture(index)">
               <img :src="i" :alt="product.title + 'picture' + index" style="height:100%; width:100%; object-fit: cover">
            </a>
         </div>
        </div>
      </div>
      <div class="col-12 my-3" v-if="filterProducts.length > 0">
        <h3 class="fw-bold fa-2">推薦產品</h3>
        <ProductsShow :guest-show-product="filterProducts" :is-guest-page-loading="isLoadingPage"
        @send-id="guestProductDetail" @inspect-id="inspectRouteId"  @add-cart="guestAddCart"></ProductsShow>
      </div>
    </div>
  </div>
  <!-- Modal -->
  <GuestProductModal ref="guestModal" @send-id="getId"></GuestProductModal>
</template>
<script>
import ProductsShow from '@/components/ProductsShow.vue'
import GuestProductModal from '@/components/GuestProductModal.vue'
export default {
  data () {
    return {
      product: [],
      filterProducts: [],
      guestProduct: [],
      qty: 1,
      isLoading: false,
      isLoadingPage: false,
      images: [],
      pictureIndex: 0,
      keyWord: [],
      pathId: ''
    }
  },
  components: {
    ProductsShow,
    GuestProductModal
  },
  watch: {
    pathId (newValue, oldValue) {
      if (newValue !== oldValue) {
        this.getProduct()
      }
    }
  },
  methods: {
    inspectRouteId (id) {
      this.pathId = id
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
      const keyword = this.keyWord
      this.filterProducts = []
      keyword.forEach((item) => {
        this.guestProduct.forEach((i) => {
          if (i.category.indexOf(item) !== -1 || i.content.indexOf(item) !== -1 || i.description.indexOf(item) !== -1 ||
          i.title.indexOf(item) !== -1) {
            this.filterProducts.push(i)
            // 去除重複的資料
            this.filterProducts = [...new Set(this.filterProducts)]
          }
        })
      })
    },
    getId (id) {
      this.isGuestPageLoading = id
    },
    guestAddCart (id, title) {
      this.$refs.guestModal.addCart(id, title)
    },
    guestProductDetail (id) {
      this.$refs.guestModal.guestModalOpen(id)
    },
    changePicture (index) {
      this.pictureIndex = index
    },
    addCart (id, title) {
      const sendCart = {
        data: {
          product_id: '',
          qty: 1
        }
      }
      sendCart.data.product_id = id
      sendCart.data.qty = this.qty
      this.$emit('sendId', id)
      this.isLoading = true
      this.$http.post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`, sendCart).then((res) => {
        this.$emit('sendId', '')
        this.isLoading = false
        this.qty = 1
        this.$emitter.emit('push-info', {
          title: `${title}加入購物車結果`,
          style: 'success',
          content: res.data.message
        })
      }).catch((error) => { console.dir(error.response) })
    },
    getProduct () {
      this.isLoadingPage = true
      const { id } = this.$route.params
      this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/product/${id}`)
        .then((res) => {
          this.product = res.data.product
          this.isLoadingPage = false
          this.pathId = this.product.id
          this.images = [this.product.imageUrl, ...this.product.imagesUrl]
          this.keyWord = [this.product.title, this.product.category]
          // 修改標題,如果沒有標題就用route中index.js內建標題
          document.title = this.product.title || this.$route.meta.title
          this.getGuestProduct()
        })
        .catch((err) => { console.dir(err.response.data.message) })
    }
  },
  mounted () {
    this.getProduct()
  }
}
</script>
<style lang="scss">
  .pictureSize {
    height: 280px;
    min-width: 300px;
  }
  @media (min-width:992px) {
    .pictureSize {
    height: 30vh;
    min-width: 33%;
   }
  }
</style>
