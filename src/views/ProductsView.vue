<template>
<div class="container pt-7">
  <VueLoading :active="isLoading" :z-index="1060"></VueLoading>
     <a href="#" style=" position: fixed; bottom: 20px; right: 20px; z-index: 9; font-size: 50px" @click.prevent="guestOpenCart()">
            <i class="bi bi-cart3 position-relative">
                <span v-if="cartNum>0" class="position-absolute start-100 translate-middle badge rounded-pill bg-danger px-2"
                    style="font-size:6px; top:10px ;">
                    {{cartNum}}
                </span>
            </i></a>
            <SearchBar  @sendSearchInfo= "guestShowSearch"></SearchBar>
        <div class="row py-3">
          <template v-if="guestShowProduct.length > 0">
            <div class="card col-3 px-0" v-for="(item) in guestShowProduct" :key="item.id">
                <img :src="item.imageUrl" alt="" class="img-fluid h-50 card-img-top">
                <div class="card-body pb-0">
                    <h2>{{item.title}}</h2>
                    <p>{{item.description}}</p>
                    <div v-if="item.origin_price===item.price">
                        售價{{item.origin_price}}
                    </div>
                    <div v-else><span class="d-block">
                            原價{{item.origin_price}}，特價{{item.price}}</span>
                    </div>
                </div>
                <div class="card-footer bg-transparent border-top-0">
                    <button class="btn btn-outline-warning w-100 mb-1" @click="guestProductDetail(item.id)"
                    :disabled="item.id===isGuestPageLoading" :class="{buttonDisabledCursor : item.id===isGuestPageLoading}">
                    <span v-show="item.id===isGuestPageLoading" class="spinner-border spinner-border-sm"
                    role="status" aria-hidden="true">
                    </span>商品詳細資訊(modal)</button>
                    <router-link :to= "`/product/${item.id}`" class="btn btn-outline-warning w-100 mb-1"
                    :disabled="item.id===isGuestPageLoading" :class="{buttonDisabledCursor : item.id===isGuestPageLoading}">
                    <span v-show="item.id===isGuestPageLoading" class="spinner-border spinner-border-sm"
                    role="status" aria-hidden="true">
                    </span>商品詳細資訊(router-link2)</router-link>
                    <button class="btn btn-success w-100" @click="guestAddCart(item.id)"
                    :disabled="item.id===isGuestPageLoading" :class="{buttonDisabledCursor : item.id===isGuestPageLoading}">
                    <span v-show="item.id===isGuestPageLoading" class="spinner-border spinner-border-sm"
                    role="status" aria-hidden="true">
                    </span>加到購物車</button>
                </div>
            </div>
          </template>
          <template v-else-if="guestShowProduct.length === 0">
            <h2 class="mx-auto">搜尋不到東西</h2>
          </template>

        </div>
        <!-- Modal -->
        <GuestProductModal ref="guestModal" @send-id="getId"></GuestProductModal>
        <CartCanvass ref="guestCart" @send-cartnum="guestGetCartItmeNum"></CartCanvass>
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
      isLoading: false
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
      console.log('infoResult', this.guestShowProduct)
    },
    minFilter (min) {
      if (min) {
        if (this.guestShowProduct.length === 0) {
          this.guestShowProduct = this.guestProduct
        }
        this.guestShowProduct = this.guestShowProduct.filter(item => min <= item.price || min <= item.origin_price)
        console.log('minResult', this.guestShowProduct)
      }
    },
    maxFilter (max) {
      if (max) {
        if (this.guestShowProduct.length === 0) {
          this.guestShowProduct = this.guestProduct
        }
        console.log('maxMiddleResult', this.guestShowProduct)
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
    guestGetCartItmeNum (num) {
      this.$refs.guestCart.getCart()
      this.cartNum = num
    },
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
    getGuestProduct () {
      this.isLoading = true
      this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`).then((res) => {
        this.guestProduct = res.data.products
        this.guestShowProduct = this.guestProduct
        this.isLoading = false
      })
        .catch((error) => {
          console.dir(error)
          this.isLoading = false
        })
    }
  },
  mounted () {
    this.getGuestProduct()
    this.guestGetCartItmeNum()
  }
}
</script>
