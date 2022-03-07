<template>
    <div class="offcanvas offcanvas-end " data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1"
      aria-labelledby="offcanvasScrollingLabel" ref="rightCart" style="width:700px">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" >購物車</h5>
      <button type="button" class="btn-close text-reset" aria-label="Close" @click="cartClose()"></button>
    </div>
    <div class="offcanvas-body d-flex flex-column">
    <div class="align-self-end"><button type="button" class="btn btn-outline-danger" @click="deleteAllCarts()"
    :disabled="cartLength === 0" :class="{buttonDisabledCursor : cartLength === 0}">刪除所有</button></div>

        <table class="table table-hover table-striped">
        <thead>
        <tr>
            <th scope="col">#</th>
            <th scope="col"></th>
            <th scope="col">商品名稱</th>
            <th scope="col">總價格</th>
            <th scope="col">數量</th>
            <th scope="col">單價</th>
            <th scope="col"></th>
            <th scope="col"></th>
        </tr>
        </thead>
        <tbody>
            <tr v-for="(item,index) in cartData.carts" :key="item.product.title+index">
                <th scope="row">{{index+1}}</th>
                <td><img :src="item.product.imageUrl" alt="" style="width:50px; height:30px"></td>
                <td>{{item.product.title}}</td>
                <td style="text-align:center">{{item.final_total}}</td>
                <td v-if="!isChangeNum || item.id !== cartId" style="text-align:center;"> {{item.qty}}</td>
                <td v-if="isChangeNum && item.id === cartId"><input type="number" min="1" max="100" v-model="changeNum" class="form-control" style="width:65px"></td>
                <td style="text-align:center;"> {{item.product.origin_price>item.product.price?  item.product.origin_price:item.product.price}}</td>
                <td><button type="button" class="btn btn-outline-primary" @click="changeCartNum(item.qty,item.id,item.product_id)">
                <span v-show="item.id===isCartLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                {{isChangeNum && item.id === cartId?  '確定修改':'修改數量' }}</button></td>
                <td><button type="button" class="btn btn-outline-dark" @click="deleteCart(item.id)">刪除</button></td>
            </tr>
        </tbody>
    </table>
    <div class="align-self-end d-flex gap-5 px-3">
    <p class="text-center fw-bold">小計</p>
    <p class="text-center">{{cartData.final_total}}元</p>
    </div>
    <div class="align-self-end px-3"> <button type="button" class="btn btn-danger" @click="toInputPage()"
    :disabled="cartLength === 0" :class="{buttonDisabledCursor : cartLength === 0}">確認</button> </div>
    </div>
  </div>
</template>
<script>
import BsOffcanvas from 'bootstrap/js/dist/offcanvas'
export default {
  data () {
    return {
      bsOffcanvas: '',
      cartData: {},
      isChangeNum: false,
      changeNum: 1,
      cartId: '',
      isCartLoading: '',
      cartLength: 0
    }
  },
  emits: ['send-cartnum'],
  methods: {
    toInputPage () {
      if (this.isChangeNum === true) {
        alert('請完成購物車數量修改')
      } else { this.$router.push('/sendInfo') }
    },
    deleteAllCarts () {
      if (confirm('確定將會刪除所有購物車內容?') === true) {
        this.$http.delete(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/carts`).then((res) => {
          this.getCart()
        }).catch((error) => { console.dir(error) })
      } else {
        alert('已取消刪除')
      }
    },
    deleteCart (id) {
      this.$http.delete(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${id}`).then((res) => {
        this.getCart()
      }).catch((error) => { console.dir(error) })
    },
    changeCartNum (num, id, productId) {
      if (this.isChangeNum === false) {
        this.isChangeNum = !this.isChangeNum
        this.changeNum = num
        this.cartId = id
      } else if (this.isChangeNum === true) {
        this.isCartLoading = id
        const sendCart = {
          data: {
            product_id: '',
            qty: 1
          }
        }
        sendCart.data.product_id = productId
        sendCart.data.qty = this.changeNum
        this.$http.put(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${id}`, sendCart).then((res) => {
          this.isChangeNum = false
          this.isCartLoading = ''
          this.getCart()
        }).catch((error) => { console.dir(error.response) })
      }
    },
    getCart () {
      this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`).then((res) => {
        this.cartData = res.data.data
        this.cartLength = res.data.data.carts.length
        this.$emit('send-cartnum', this.cartLength)
      })
        .catch((error) => { console.dir(error) })
    },
    cartOpen () {
      this.getCart()
      this.bsOffcanvas.show()
    },
    cartClose () {
      this.bsOffcanvas.hide()
    }
  },
  watch: {
    changeNum (nweValue, oldValue) {
      if (nweValue <= 0) {
        alert('輸入數量不可小於1')
        this.changeNum = oldValue
      }
    }
  },
  mounted () {
    this.bsOffcanvas = new BsOffcanvas(this.$refs.rightCart)
  }
}
</script>
