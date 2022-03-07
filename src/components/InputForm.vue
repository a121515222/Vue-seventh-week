<template>
<div class="row">
<Form ref="form" v-slot="{ errors }" @submit="onSubmit" class="d-flex flex-column col-8 mx-auto">
    <div class="my-3 position-relative">
    <label class="form-label" for="name">姓名</label>
    <Field
        id="name"
        name="姓名"
        type="text"
        class="form-control"
        :class="{ 'is-invalid': errors['姓名'] }"
        placeholder="請輸入 姓名" rules="required"
        v-model="user.name"
    >
    </Field>
<error-message name="姓名" class="invalid-feedback" style="position:absolute; left:14px ;bottom:-20px"></error-message>
    </div>

    <div class="my-3 position-relative">
    <label class="form-label" for="tel">電話</label>
    <Field
        id="tel"
        name="電話"
        type="text"
        class="form-control"
        :class="{ 'is-invalid': errors['電話'] }"
        placeholder="請輸入電話"
        :rules="phoneCheck"
        v-model="user.tel"
    >
    </Field>
<error-message name="電話" class="invalid-feedback" style="position:absolute; left:14px ;bottom:-20px"></error-message>
    </div>

    <div class="my-3 position-relative">
    <label class="form-label" for="email">信箱</label>
    <Field
        id="email"
        name="信箱"
        type="email"
        class="form-control"
        :class="{ 'is-invalid': errors['信箱'] }"
        placeholder="信箱" rules="email|required"
        v-model="user.email"
    >
    </Field>
<error-message name="信箱" class="invalid-feedback" style="position:absolute; left:14px ;bottom:-20px"></error-message>
    </div>

    <div class="my-3 position-relative">
    <label class="form-label" for="address">地址</label>
    <Field
        id="address"
        name="地址"
        type="text"
        class="form-control"
        :class="{ 'is-invalid': errors['地址'] }"
        placeholder="請輸入 地址" rules="required"
        v-model="user.address"
    >
    </Field>
<error-message name="地址" class="invalid-feedback" style="position:absolute; left:14px ;bottom:-20px"></error-message>
    </div>

    <div class="my-3 position-relative">
    <label class="form-label" for="message">留言</label>
    <textarea class="form-control" id="message" style="height:100px" v-model="message"></textarea>
    </div>
    <button class="btn btn-primary align-self-end" type="submit"
    :disabled="Object.keys(errors).length > 0 || userDataWatch" :class="{buttonDisabledCursor : Object.keys(errors).length > 0 || userDataWatch}">送出表單</button>
</Form>
</div>
</template>
<script>
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
  data () {
    return {
      user: {
        name: '',
        tel: '',
        email: '',
        address: ''
      },
      message: ''
    }
  },
  components: {
    Form,
    Field,
    ErrorMessage
  },
  computed: {
    userDataWatch () {
      // eslint-disable-next-line prefer-const
      let result = false
      Object.keys(this.user).forEach((item) => {
        if (this.user[item].indexOf('') !== -1) {
          result = true
        }
      })
      return result
    }
  },
  methods: {
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
      this.$http.post(`${process.env.API_API}/api/${process.env.API_PATH}/order`, sendData)
        .then((res) => {
          // 清除購物車內容
          this.$http.delete(`${process.env.API_API}/api/${process.env.API_PATH}/carts`).then((res) => {
          }).catch((error) => { console.dir(error) })
          this.orderid = res.data.orderId
          alert(res.data.message)
          console.log(res.data)
        }).catch((error) => { console.dir(error) })
      this.$refs.form.resetForm()
      this.message = ''
    }
  }
}
</script>
