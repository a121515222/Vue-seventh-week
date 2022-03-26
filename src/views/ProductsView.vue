<template>
<div class="container pt-10">
  <VueLoading :active="isLoadingPage" :z-index="1060"></VueLoading>
     <a href="#" style=" position: fixed; bottom: 20px; right: 20px; z-index: 9; font-size: 50px" @click.prevent="guestOpenCart()">
            <i class="bi bi-cart3 position-relative text-third ">
                <span v-if="cartNum>0" class="position-absolute start-100 translate-middle badge rounded-pill bg-danger px-2"
                    style="font-size:6px; top:10px ;">
                    {{cartNum}}
                </span>
            </i></a>
            <SearchBar  @sendSearchInfo= "guestShowSearch"></SearchBar>
        <div class="row py-3">
          <template v-if="guestShowProduct.length > 0">
            <template v-for="(item) in guestShowProduct" :key="item.id">
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
                    <button class="btn btn-outline-secondary text-primary w-100 mb-1" @click="guestProductDetail(item.id)"
                    :disabled="item.id===isGuestPageLoading" :class="{buttonDisabledCursor : item.id===isGuestPageLoading}">
                    <span v-show="item.id===isGuestPageLoading" class="spinner-border spinner-border-sm"
                    role="status" aria-hidden="true">
                    </span>快速商品資訊</button>
                    <router-link :to= "`/product/${item.id}`" class="btn btn-outline-secondary text-primary w-100 mb-1"
                    :disabled="item.id===isGuestPageLoading" :class="{buttonDisabledCursor : item.id===isGuestPageLoading}">
                    <span v-show="item.id===isGuestPageLoading" class="spinner-border spinner-border-sm"
                    role="status" aria-hidden="true">
                    </span>商品詳細資訊</router-link>
                    <button class="btn btn-primary w-100 text-secondary" @click="guestAddCart(item.id, item.title)"
                    :disabled="item.id===isGuestPageLoading" :class="{buttonDisabledCursor : item.id===isGuestPageLoading}">
                    <span v-show="item.id===isGuestPageLoading" class="spinner-border spinner-border-sm"
                    role="status" aria-hidden="true">
                    </span>加到購物車</button>
                </div>
            </div>
            </template>
          </template>
          <template v-else-if="guestShowProduct.length === 0">
            <h2 class="mx-auto">搜尋不到東西</h2>
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
import SearchBar from '@/components/SearchBar.vue'
export default {
  data () {
    return {
      cartNum: 0,
      isGuestPageLoading: '',
      guestProduct: [],
      guestShowProduct: [],
      isLoading: false,
      isLoadingPage: false
    }
  },
  components: {
    GuestProductModal,
    CartCanvass,
    SearchBar
  },
  methods: {
    infoFilter (info) {
      this.guestProduct.forEach((item) => {
        if (item.category.indexOf(info) !== -1 || item.content.indexOf(info) !== -1 || item.description.indexOf(info) !== -1 ||
          item.title.indexOf(info) !== -1) {
          this.guestShowProduct.push(item)
        }
      })
    },
    minFilter (min) {
      if (min) {
        if (this.guestShowProduct.length === 0) {
          this.guestShowProduct = this.guestProduct
        }
        this.guestShowProduct = this.guestShowProduct.filter(item => min <= item.price || min <= item.origin_price)
      }
    },
    maxFilter (max) {
      if (max) {
        if (this.guestShowProduct.length === 0) {
          this.guestShowProduct = this.guestProduct
        }
        this.guestShowProduct = this.guestShowProduct.filter(item => item.price <= max || item.origin_price <= max)
      }
    },
    guestShowSearch (info, min, max) {
      if (info || min || max) {
        this.guestShowProduct = []
        this.infoFilter(info)
        this.minFilter(min)
        this.maxFilter(max)
      } else {
        this.guestShowProduct = this.guestProduct
      }
    },
    getId (id) {
      this.isGuestPageLoading = id
    },
    guestOpenCart () {
      this.$refs.guestCart.cartOpen()
    },
    getCart () {
      this.$refs.guestCart.getCart()
    },
    guestAddCart (id, title) {
      this.$refs.guestModal.addCart(id, title)
      this.$refs.guestCart.getCart()
      this.getCart()
    },
    guestProductDetail (id) {
      this.$refs.guestModal.guestModalOpen(id)
    },
    getGuestProduct () {
      this.isLoadingPage = true
      this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`).then((res) => {
        this.guestProduct = res.data.products
        this.guestShowProduct = this.guestProduct
        this.isLoadingPage = false
      })
        .catch((error) => {
          console.dir(error)
          this.isLoadingPage = false
        })
    }
  },
  mounted () {
    this.getGuestProduct()
    this.$emitter.on('push-cart-num', (num) => { this.cartNum = num })
    this.getCart()
  }
}
</script>
