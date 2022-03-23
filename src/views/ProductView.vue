<template>
<div class="container pt-6">
  <VueLoading :active="isLoadingPage" :z-index="1060"></VueLoading>
  <div class="row">
    <div class="col-12 col-lg-6">
      <div class="img-fluid" style="max-height:90vh; overflow:hidden;">
        <img :src="product.imageUrl" :alt="`${ product.title } 照片`" style="object-fit:cover;">
      </div>
    </div>
    <div class="col-12 col-lg-6 d-flex flex-column justify-content-between">
      <div class="from-group">
        <h2>{{product.title}}</h2>
        <p>{{product.description}}</p>
      <template v-if="product.origin_price===product.price">
        <div class="d-flex gap-2">
          <span>售價{{product.origin_price}}元</span>
          <span>/{{product.unit}}</span>
        </div>
      </template>
      <template v-else-if="product.origin_price > product.price">
        <div class="d-flex gap-2">
          <span class="text-decoration-line-through text-middle">原價{{product.origin_price}}</span>
          <span class="text-danger">特價{{product.price}}元</span>
          <span>/{{product.unit}}</span>
        </div>
      </template>
      </div>
      <div class="d-flex gap-3 ">
        <button type="button" class="btn btn-primary text-secondary" @click="qty-=1" :disabled="qty<2"
        :class="{buttonDisabledCursor : qty<2}"><i class="bi bi-dash"></i></button>
          <span class="align-self-center px-1" style="min-width:20px"> {{qty}}</span>
          <button type="button" class="btn btn-primary text-secondary" @click="qty+=1" :disabled="qty===100"
            :class="{buttonDisabledCursor : qty===100}"><i class="bi bi-plus"></i></button>
          <button type="button" class="btn btn-primary text-secondary" @click="addCart(product.id, product.title)" :disabled="isLoading || qty<1"
          :class="{buttonDisabledCursor : isLoading || qty<1}">
          <span v-show="isLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          加入購物車</button>
      </div>
    </div>
  </div>
</div>
</template>
<script>
export default {
  data () {
    return {
      product: [],
      qty: 1,
      isLoading: false,
      isLoadingPage: false
    }
  },
  methods: {
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
      this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/product/${id}`).then((res) => {
        this.product = res.data.product
        this.isLoadingPage = false
      })
        .catch((error) => { console.dir(error) })
    }
  },
  mounted () {
    this.getProduct()
  }
}
</script>
