<template>
  <div class="row pt-3">
    <template v-if="guestShowProduct.length > 0">
      <template v-for="(item) in guestShowProduct" :key="item.id">
        <div class="col-12 col-sm-6 col-lg-4 col-xl-3 mb-3">
          <a  class="text-black" href="#" style="text-decoration:none;"
          @click.prevent="inspectId(item.id);$router.push(`/product/${item.id}`)">
            <div class="card  px-0 position-relative cardHover"
            v-if="item.is_enabled === 1 || 4">
              <img class="img-fluid card-img-top" style="max-height:200px;min-height:200px;"
              :src="item.imageUrl"
              :alt="item.title">
              <p class="position-absolute top-0 end-0 bg-secondary text-primary p-1"
              v-if="item.is_enabled === 4">
                促銷中
              </p>
              <div class="position-absolute top-33 end-0 bg-third d-flex justify-content-center align-items-center"
              style="border-radius:5px; height:33px; width:33px">
                <a v-if="favorites.indexOf(item.id) === -1" class="text-danger fs-4" title="加入我的最愛" href="#"
                @click.stop.prevent="addFavorites(item.id, item.title)">
                  <i class="bi bi-suit-heart"></i>
                </a>
                <a  class="text-danger fs-4" title="移除我的最愛" href="#"
                v-else-if="favorites.indexOf(item.id) > -1"
                @click.stop.prevent="deleteFavorites(item.id, item.title)">
                  <i class="bi bi-suit-heart-fill"></i>
                </a>
              </div>
              <div class="card-body pb-0 border-top">
                <h3 class="fa-3 fw-bold">{{item.title}}</h3>
                <div v-html="item.description" class="lineClamp"></div>
              </div>
              <div class="card-footer bg-transparent border-top-0 pb-0">
                <div v-if="item.origin_price === item.price">
                  <span>售價{{item.origin_price}}元</span>
                  <span>/{{item.unit}}</span>
                </div>
                <div v-else>
                  <span class="text-decoration-line-through text-middle">原價{{item.origin_price}}</span>
                  <span class="text-danger">特價{{item.price}}元</span>
                  <span>/{{item.unit}}</span>
                </div>
                <button  class="btn btn-outline-secondary text-primary w-100 mb-1" type="button"
                @click.stop.prevent="guestProductDetail(item.id)"
                :disabled="item.id === isGuestPageLoading"
                :class="{buttonDisabledCursor : item.id === isGuestPageLoading}"
                >
                  <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"
                  v-show="item.id === isGuestPageLoading">
                  </span>
                  快速商品資訊
                </button>
                <RouterLink class="btn btn-outline-secondary text-primary w-100 mb-1"
                :to= "`/product/${item.id}`"
                @click="inspectId(item.id);"
                :disabled="item.id === isGuestPageLoading"
                :class="{buttonDisabledCursor : item.id === isGuestPageLoading}">
                  <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"
                  v-show="item.id === isGuestPageLoading">
                  </span>商品詳細資訊
                </RouterLink>
                <button class="btn btn-primary w-100 text-secondary" type="button"
                @click.stop.prevent="guestAddCart(item.id,item.title)"
                :disabled="item.id === isGuestPageLoading"
                :class="{buttonDisabledCursor : item.id === isGuestPageLoading}">
                  <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"
                  v-show="item.id === isGuestPageLoading">
                  </span>
                  加到購物車
                </button>
              </div>
            </div>
          </a>
        </div>
      </template>
    </template>
    <template v-else-if="guestShowProduct.length === 0">
      <h2 class="mx-auto">搜尋不到東西</h2>
    </template>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import productStore from '@/stores/products'
import toastStore from '@/stores/toast'
import cartStore from '@/stores/cart'

export default {
  props: ['isGuestPageLoading'],
  emits: ['sendId', 'addCart', 'inspectId'],
  data () {
    return {
      favorites: JSON.parse(localStorage.getItem('myFavoritesItem')) || []
    }
  },
  computed: {
    ...mapState(productStore, ['guestShowProduct'])
  },
  methods: {
    ...mapActions(toastStore, ['addMessage']),
    ...mapActions(cartStore, ['getCart']),
    inspectId (id) {
      this.$emit('inspectId', id)
    },
    addFavorites (id, title) {
      this.favorites.push(id)
      localStorage.setItem('myFavoritesItem', JSON.stringify(this.favorites))
      this.addMessage(
        {
          title: '加入最愛結果',
          style: 'success',
          content: `${title}已加入最愛`
        }
      )
    },
    deleteFavorites (id, title) {
      const indexRemove = this.favorites.indexOf(id)
      this.favorites.splice(indexRemove, 1)
      localStorage.setItem('myFavoritesItem', JSON.stringify(this.favorites))
      this.addMessage(
        {
          title: '移除最愛結果',
          style: 'success',
          content: `${title}已移除最愛`
        }
      )
    },
    guestProductDetail (id) {
      this.$emit('sendId', id)
    },
    guestAddCart (id, title) {
      this.$emit('addCart', id, title)
      this.getCart()
    }
  }
}
</script>
