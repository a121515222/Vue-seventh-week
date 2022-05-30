<template>
  <div class="container pt-10">
    <VueLoading :active="isLoadingPage" :z-index="1060"/>
    <SearchBar  @sendSearchInfo= "guestShowSearch"
    @hight-to-low="sortHightToLow"
    @low-to-hight="sortLowToHight"
    @show-my-favorites="showMyFavorites"
    />
    <ProductsShow
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

import { mapState, mapActions } from 'pinia'
import productStore from '@/stores/products'
import cartStore from '@/stores/cart'

export default {
  data () {
    return {
      isGuestPageLoading: ''
    }
  },
  components: {
    GuestProductModal,
    SearchBar,
    ProductsShow
  },
  computed: {
    ...mapState(productStore, ['guestShowProduct', 'isLoading', 'isLoadingPage'])
  },
  methods: {
    ...mapActions(productStore, ['getGuestProduct', 'showMyFavorites', 'sortHightToLow', 'sortLowToHight', 'guestShowSearch']),
    ...mapActions(cartStore, ['getCart']),
    getId (id) {
      this.isGuestPageLoading = id
    },
    guestAddCart (id, title) {
      this.$refs.guestModal.addCart(id, title)
      this.getCart()
    },
    guestProductDetail (id) {
      this.$refs.guestModal.guestModalOpen(id)
    }
  },
  mounted () {
    this.getGuestProduct()
  }
}
</script>
