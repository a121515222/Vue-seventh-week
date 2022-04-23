<template>
  <div class="modal fade"  tabindex="-1"  aria-hidden="true" ref="guestProductModal" >
    <div class="modal-dialog modal-xl modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header bg-middle">
          <h5 class="modal-title fs-3 fw-bold" >{{product.title}}</h5>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-12 col-sm-6 px-0 px-sm-2">
              <img class="img-fluid guestModalImg px-0 px-sm-2" style="width:100%; object-fit: cover;object-position:center center;" :src="product.imageUrl" :alt="`${ product.title } 照片`">
            </div>
            <div class="col-12 col-sm-6 d-flex flex-column justify-content-between">
              <div class="from-group">
                <div class="d-flex my-2">
                <p class="mb-0">{{product.title}}<span class="badge bg-primary ms-1">{{product.category}}</span></p>
                </div>
                <p>商品描述:{{product.description}}</p>
                <p>商品內容:{{product.content}}</p>
              </div>
              <div class="from-group align-self-end">
                <div v-if="product.origin_price === product.price" class="d-flex gap-2">
                <span>售價:{{product.origin_price}}元</span>
                <span>/{{product.unit}}</span>
                </div>
              <div v-else class="d-flex">
                <span class="text-decoration-line-through text-middle">原價{{product.origin_price}}</span>
                <span class="text-danger">特價{{product.price}}元</span>
                <span>/{{product.unit}}</span>
              </div>
            </div>
            </div>
          </div>
        </div>
        <div class="modal-footer gap-1 gap-sm-3 bg-middle">
          <button type="button" class="btn btn-primary btnHover" @click="qty -= 1" :disabled="qty<2"
          :class="{buttonDisabledCursor : qty <2}">
            <i class="bi bi-dash"></i>
          </button>
          <span style="min-width:20px"> {{qty}}</span>
          <button type="button" class="btn btn-primary btnHover" @click="qty += 1" :disabled="qty === 100"
            :class="{buttonDisabledCursor : qty === 100}">
            <i class="bi bi-plus"></i>
          </button>
          <button type="button" class="btn btn-secondary btnHover" @click="addCart(product.id, product.title)" :disabled="product.id === isLoading  || qty < 1"
          :class="{buttonDisabledCursor : product.id === isLoading || qty < 1}">
            <span v-show="product.id === isLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          加入購物車</button>
          <button type="button" class="d-none-366px btn btn-third btnHover" @click="guestModalClose()">關閉</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BsModal from 'bootstrap/js/dist/modal'
export default {
  data () {
    return {
      bsModal: '',
      product: {},
      qty: 1,
      isLoading: ''
    }
  },
  emits: ['sendId', 'getCart'],
  methods: {
    guestModalOpen (id) {
      this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/product/${id}`).then((res) => {
        this.product = res.data.product
        this.bsModal.show()
      }).catch((err) => { console.dir(err.response.data.message) })
    },
    guestModalClose () {
      this.bsModal.hide()
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
      this.isLoading = id
      this.$http.post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`, sendCart).then((res) => {
        this.$emit('sendId', '')
        this.isLoading = ''
        this.qty = 1
        this.$emitter.emit('push-info', {
          title: `${title}加入購物車結果`,
          style: 'success',
          content: res.data.message
        })
        this.$emitter.emit('getCart')
      }).catch((err) => { console.dir(err.response.data.message) })
    }
  },
  mounted () {
    this.bsModal = new BsModal(this.$refs.guestProductModal)
  }
}
</script>
<style lang="scss">
  .guestModalImg {
    max-height: 30vh;
    @media (min-width:576px) {
      max-height: 40vh;
    }
    @media (min-width:992px) {
      max-height: 50vh;
    }
  }
  .d-none-366px {
    display: none;
    @media (min-width:366px) {
      display: block;
    }
  }
  .btnHover {
    &:hover {
      color: #000;
    }
  }
</style>
