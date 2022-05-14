<template>
  <div class="container pt-10">
    <VueLoading :active="isLoadingPage" :z-index="1060"/>
    <SearchBar  @sendSearchInfo= "guestShowSearch"
    @hight-to-low="sortHightToLow"
    @low-to-hight="sortLowToHight"
    @show-my-favorites="showMyFavorites"
    />
    <ProductsShow
    :guest-show-product="guestShowProduct"
    :is-guest-page-loading="isGuestPageLoading"
    @send-id="guestProductDetail"
    @add-cart="guestAddCart"/>
    <!-- Modal -->
    <GuestProductModal ref="guestModal" @send-id="getId"/>
  </div>
</template>

<script>
import GuestProductModal from '@/components/GuestProductModal.vue'
import SearchBar from '@/components/SearchBar.vue'
import ProductsShow from '@/components/ProductsShow.vue'

export default {
  data () {
    return {
      isGuestPageLoading: '',
      guestProduct: [],
      guestShowProduct: [],
      isLoading: false,
      isLoadingPage: false
    }
  },
  components: {
    GuestProductModal,
    SearchBar,
    ProductsShow
  },
  methods: {
    showMyFavorites () {
      const myFavorites = JSON.parse(localStorage.getItem('myFavoritesItem'))
      this.guestShowProduct = []
      this.guestProduct.forEach((i) => {
        if (myFavorites.indexOf(i.id) !== -1) {
          this.guestShowProduct.push(i)
        }
      })
    },
    sortHightToLow () {
      this.guestShowProduct.sort((a, b) => {
        if (a.price < a.origin_price) {
          return b.price - a.price
        } else if (a.price === a.origin_price) {
          return b.price - a.origin_price
        }
      })
    },
    sortLowToHight () {
      this.guestShowProduct.sort((a, b) => {
        if (a.price < a.origin_price) {
          return a.price - b.price
        } else if (a.price === a.origin_price) {
          return a.price - b.origin_price
        }
      })
    },
    infoFilter (info) {
      const infoArr = info.split(' ')
      this.guestProduct.forEach((item) => {
        infoArr.forEach((i) => {
          if (item.category.indexOf(i) !== -1 || item.content.indexOf(i) !== -1 || item.description.indexOf(i) !== -1 ||
          item.title.indexOf(i) !== -1) {
            this.guestShowProduct.push(item)
          }
        })
      })
    },
    minFilter (min, max, info) {
      if (min) {
        if (this.guestShowProduct.length === 0 && !info && !max) {
          this.guestShowProduct = this.guestProduct
        }
        this.guestShowProduct = this.guestShowProduct.filter(item => min <= item.price || min <= item.origin_price)
      }
    },
    maxFilter (max, min, info) {
      if (max) {
        if (this.guestShowProduct.length === 0 && !info && !min) {
          this.guestShowProduct = this.guestProduct
        }
        this.guestShowProduct = this.guestShowProduct.filter(item => max >= item.price || max >= item.origin_price)
      }
    },
    guestShowSearch (info, min, max) {
      if (info || min || max) {
        this.guestShowProduct = []
        this.infoFilter(info)
        this.minFilter(min, max, info)
        this.maxFilter(max, min, info)
      } else {
        this.guestShowProduct = this.guestProduct
      }
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
    getGuestProduct () {
      this.isLoadingPage = true
      this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`).then((res) => {
        this.guestProduct = res.data.products
        this.guestShowProduct = this.guestProduct
        this.$emitter.emit('sendProductList', this.guestProduct)
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
  }
}
</script>
