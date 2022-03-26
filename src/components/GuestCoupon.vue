<template>
    <div class="from-group d-flex flex-column">
      <input type="text" class="form-control" placeholder="請輸入優惠券碼" v-model= "code">
    <div class="align-self-end">
      <button class="btn btn-primary text-white mt-1" type="button" @click= "guestSendCoupon"
      :disabled="cartLength===0" :class="{buttonDisabledCursor :cartLength===0}">
        <span v-if= "isLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        送出
      </button>
    </div>
    </div>
</template>
<script>
export default {
  props: ['cartLength'],
  data () {
    return {
      code: '',
      isLoading: false
    }
  },
  methods: {
    guestSendCoupon () {
      this.isLoading = true
      if (this.code === '') {
        alert('優惠券不可輸入空白')
      } else {
        const sendData = { data: { code: this.code } }
        this.$http.post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/coupon`, sendData)
          .then((res) => {
            alert(res.data.message)
            this.isLoading = false
            this.$emit('get-cart')
          }).catch((err) => { console.dir(err.data.message) })
      }
    }
  }
}
</script>
