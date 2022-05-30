<template>
  <Form class="from-group" ref="couponForm"
   v-slot="{errors}">
    <div class="position-relative d-flex flex-row">
      <Field
      id="code"
      name="優惠碼"
      type="text"
      class="form-control"
      :class="{'is-invalid': errors['優惠碼'], buttonDisabledCursor : Object.keys(errors).length > 0 }"
      placeholder="請輸入優惠碼"
      :rules="couponCheck"
      v-model.lazy.trim="code"
      :disabled="false"
      >
      </Field>
      <ErrorMessage name="優惠碼" class="invalid-feedback" style="position:absolute; left:14px ;bottom:-20px"></ErrorMessage>
      <button class="btn btn-primary text-white text-nowrap h-100" type="button"
      @click= "guestSendCoupon"
      :disabled="cartLength === 0 || code === '' || Object.keys(errors).length > 0 || isSend"
      :class="{buttonDisabledCursor :cartLength === 0 || code === '' || Object.keys(errors).length > 0}">
      <span v-if= "isLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
      送出
    </button>
    </div>
  </Form>
</template>

<script>
// 匯入 vee-validate 主套件
import { Form, Field, ErrorMessage, configure } from 'vee-validate'
// 匯入 vee-validate 在地化
import { localize, setLocale } from '@vee-validate/i18n'
// 匯入繁體中文語系檔案
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'

configure({ // 用來做一些設定
  generateMessage: localize({ zh_TW: zhTW }), // 啟用 locale
  validateOnInput: true // 調整為：輸入文字時，就立即進行驗證
})
// 設定預設語系
setLocale('zh_TW')
export default {
  props: ['cartLength', 'cartLoading'],
  data () {
    return {
      code: '',
      isLoading: false,
      isSend: false,
      coupon: [],
      presentCoupon: [
        {
          coupon: 'GodCoupon',
          date: '2023/05/03'
        },
        {
          coupon: 'SuperCoupon',
          date: '2022/04/04'
        },
        {
          coupon: 'testCode',
          date: '2022/06/08'
        }
      ]
    }
  },
  watch: {
    cartLoading (newValue) {
      if (newValue === false) {
        this.isLoading = false
      } else if (newValue === true) { this.isLoading = true }
    }
  },
  components: {
    Form,
    Field,
    ErrorMessage
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
            this.isSend = true
          }).catch((err) => {
            console.dir(err.response.data.message)
            this.isLoading = false
          })
      }
    },
    couponCheck (value) {
      const currentDate = new Date().getTime()
      let result = true
      const currentCoupon = []
      this.presentCoupon.forEach((i) => {
        currentCoupon.push(i.coupon)
      })
      if (currentCoupon.indexOf(value) !== -1) {
        const index = currentCoupon.indexOf(value)
        if (Date.parse(this.presentCoupon[index].date) - currentDate >= 0) {
          result = true
        } else { result = '優惠碼過期' }
      } else {
        result = '優惠碼錯誤'
      }
      return result
    }
  }
}
</script>
