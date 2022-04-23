<template>
  <div class="from-group d-flex flex-row">
    <input type="text" class="form-control" placeholder="請輸入優惠券碼" v-model= "code">
    <button type="button" class="btn btn-primary text-white text-nowrap h-100" @click= "guestSendCoupon"
      :disabled="cartLength === 0 || code === ''" :class="{buttonDisabledCursor :cartLength === 0 || code === ''}">
        <span v-if= "isLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
      送出
    </button>
  </div>
</template>
<script>
export default {
  props: ['cartLength', 'cartLoading'],
  data () {
    return {
      code: '',
      isLoading: false
    }
  },
  watch: {
    cartLoading (newValue) {
      if (newValue === false) {
        this.isLoading = false
      } else if (newValue === true) { this.isLoading = true }
    }
  },
  methods: {
    guestSendCoupon () {
      this.isLoading = true
      if (this.code === '') {
        alert('優惠券不可輸入空白')
        this.isLoading = false
      } else {
        const sendData = { data: { code: this.code } }
        this.$http.post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/coupon`, sendData)
          .then((res) => {
            alert(res.data.message)
            this.isLoading = false
            this.$emit('get-cart')
          }).catch((err) => { console.dir(err.response.data.message) })
      }
    }
  }
}
</script>
