<template>
  <div class="row">
   <Form  class="d-flex flex-column col-12 col-lg-8 mx-auto" ref="form"
   v-slot="{errors}"
   @submit="onSubmit">
    <div class="my-3 position-relative">
      <label class="form-label" for="name">姓名</label>
      <Field
        id="name"
        name="姓名"
        type="text"
        class="form-control"
        :class="{'is-invalid': errors['姓名'], buttonDisabledCursor :isEdit}"
        placeholder="請輸入 姓名"
        rules="required"
        v-model="user.name"
        :disabled="isEdit || false"
      >
      </Field>
      <ErrorMessage name="姓名" class="invalid-feedback" style="position:absolute; left:14px ;bottom:-20px"></ErrorMessage>
    </div>
    <div class="my-3 position-relative">
      <label class="form-label" for="tel">電話</label>
      <Field
        id="tel"
        name="電話"
        type="text"
        class="form-control"
        :class="{'is-invalid': errors['電話'], buttonDisabledCursor :isEdit}"
        placeholder="請輸入電話例如0912123123"
        :rules="phoneCheck"
        v-model="user.tel"
        :disabled="isEdit || false"
      >
      </Field>
      <ErrorMessage name="電話" class="invalid-feedback" style="position:absolute; left:14px ;bottom:-20px"></ErrorMessage>
    </div>
    <div class="my-3 position-relative">
      <label class="form-label" for="email">信箱</label>
      <Field
        id="email"
        name="信箱"
        type="email"
        class="form-control"
        :class="{'is-invalid': errors['信箱'], buttonDisabledCursor :isEdit}"
        placeholder="信箱" rules="email|required"
        v-model="user.email"
        :disabled="isEdit || false"
      >
      </Field>
      <ErrorMessage name="信箱" class="invalid-feedback" style="position:absolute; left:14px ;bottom:-20px"></ErrorMessage>
    </div>
    <div class="my-3 position-relative">
      <label class="form-label" for="address">地址</label>
      <Field
        id="address"
        name="地址"
        type="text"
        class="form-control"
        :class="{'is-invalid': errors['地址'], buttonDisabledCursor :isEdit}"
        placeholder="請輸入地址" rules="required"
        v-model="user.address"
        :disabled="isEdit || false"
      >
      </Field>
      <ErrorMessage name="地址" class="invalid-feedback" style="position:absolute; left:14px ;bottom:-20px"></ErrorMessage>
    </div>
    <div class="my-3 position-relative">
      <label class="form-label" for="message">留言</label>
      <textarea class="form-control" id="message" style="height:100px"
      v-model="message"
      :class="{buttonDisabledCursor :isEdit}"
      :disabled="isEdit"></textarea>
    </div>
    <button class="btn btn-primary text-white align-self-end" type="submit"
    :disabled="Object.keys(errors).length > 0 || userDataWatch || isLoading || isEdit"
    :class="{buttonDisabledCursor : Object.keys(errors).length > 0 || userDataWatch}"
    >
      送出表單
    </button>
   </Form>
  </div>
</template>

<script>
import { mapActions } from 'pinia'
import toastStore from '@/stores/toast'
// 匯入 vee-validate 主套件
import { defineRule, Form, Field, ErrorMessage, configure } from 'vee-validate'
// 匯入 vee-validate rule
import { required, email } from '@vee-validate/rules'
// 匯入 vee-validate 在地化
import { localize, setLocale } from '@vee-validate/i18n'
// 匯入繁體中文語系檔案
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'

defineRule('required', required)
defineRule('email', email)

configure({ // 用來做一些設定
  generateMessage: localize({ zh_TW: zhTW }), // 啟用 locale
  validateOnInput: true // 調整為：輸入文字時，就立即進行驗證
})
// 設定預設語系
setLocale('zh_TW')

export default {
  props: ['userInfo', 'isEdit', 'messageInfo', 'orderId'],
  data () {
    return {
      user: {
        name: '',
        tel: '',
        email: '',
        address: ''
      },
      message: '',
      isLoading: false
    }
  },
  components: {
    Form,
    Field,
    ErrorMessage
  },
  watch: {
    userInfo: {
      handler (nweValue) {
        this.user = JSON.parse(JSON.stringify(nweValue))
      },
      deep: true
    },
    messageInf (nweValue) {
      this.message = nweValue
    }
  },
  computed: {
    userDataWatch () {
      let result = ''
      const arr = Object.values(this.user).filter(i => i === '')
      if (arr.length === 0) {
        result = false
      } else { result = true }
      return result
    }
  },
  methods: {
    ...mapActions(toastStore, ['addMessage']),
    phoneCheck (value) {
      const phoneNumber = /^(09)[0-9]{8}$/
      return phoneNumber.test(value) ? true : '需要正確的電話號碼'
    },
    onSubmit () {
      const sendData = {
        data: {
          user: {
            name: '',
            tel: '',
            email: '',
            address: ''
          },
          message: '',
          orderid: ''
        }
      }
      sendData.data.user.name = this.user.name
      sendData.data.user.tel = this.user.tel
      sendData.data.user.email = this.user.email
      sendData.data.user.address = this.user.address
      sendData.message = this.message
      this.isLoading = true
      if (this.isEdit === undefined) {
        this.$http.post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order`, sendData)
          .then((res) => {
            this.isLoading = false
            this.addMessage(
              {
                title: '訂單送出結果',
                style: 'success',
                content: `${res.data.message}`
              }
            )
            this.orderid = res.data.orderId
            this.$router.push(`/guestOrderPay/${this.orderid}`)
          }).catch((err) => {
            this.isLoading = false
            this.addMessage(
              {
                title: '訂單送出結果',
                style: 'danger',
                content: `${err.response.data.message}`
              }
            )
          })
        this.$refs.form.resetForm()
        this.message = ''
      }
    }
  }
}
</script>
