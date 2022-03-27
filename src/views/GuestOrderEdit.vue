<template>
<VueLoading :active="isLoadingPage" :z-index="1060"></VueLoading>
  <div class="container pt-9">
    <h2>已購商品清單</h2>
    <div class="table-responsive">
      <table class="table table-hover">
        <thead>
          <tr>
            <th>品名</th>
            <th>數量</th>
            <th>單位</th>
            <th>價格</th>
          </tr>
        </thead>
        <tbody v-for="(item) in products" :key="item.id">
          <tr>
            <td>{{item.product.title}}</td>
            <td>{{item.qty}}</td>
            <td>{{item.product.unit}}</td>
            <td>{{item.total}}</td>
          </tr>
        </tbody>
      </table>
      <div class="d-flex w-100 flex-row-reverse">
        <span>小計:{{total}}元</span>
      </div>
    </div>
    <!-- 已經寫好修改購買人功能但是沒有相應的api所以先註記 -->
    <!-- <div class="d-flex justify-content-between"> -->
    <!-- <h2>訂購者資訊</h2> -->
    <!-- <button type="button" class="btn btn-primary" @click="is_edit=!is_edit">編輯定購者資訊</button> -->
    <!-- </div> -->
    <!-- <InputForm :user-info="user" :is-edit="is_edit" :message-info="message" :order-id="id" @get-order="getOrder"></InputForm> -->
    <h2>訂購者資訊</h2>
    <div class="table-responsive">
      <table class="table table-hover table-striped">
        <tbody>
          <tr>
            <th>姓名</th>
            <td>{{user.name}}</td>
          </tr>
           <tr>
            <th>電話</th>
            <td>{{user.tel}}</td>
          </tr>
           <tr>
            <th>住址</th>
            <td>{{user.address}}</td>
          </tr>
           <tr>
            <th>付款狀態</th>
            <td :class="{'text-success':is_paid, 'text-danger':!is_paid}">{{is_paid? '已付款':'未付款'}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <h2>選擇付款方式</h2>
    <div class="row">
      <div class="col-12 col-lg-8 mx-auto">
        <select v-model="payment" class="form-select">
          <option value="0" selected disabled>請選擇付款方式</option>
          <option value="1" >ATM匯款</option>
          <option value="2" >信用卡</option>
          <option value="3" >貨到付款</option>
        </select>
        <div class="d-flex flex-row-reverse w-100 mt-2">
          <button class="btn btn-primary text-white" @click="pay()"
          :disabled="isLoading || payment === 0" :class="{buttonDisabledCursor : isLoading || payment === 0}">
            <span v-show="isLoading" class="spinner-border spinner-border-sm"
            role="status" aria-hidden="true"></span>
            確認付款</button>
          </div>
      </div>
    </div>
  </div>
  <!-- offcanvas -->
  <Offcanvas ref=cart></Offcanvas>
</template>
<script>
import InputForm from '@/components/InputForm.vue'
import Offcanvas from '@/components/CartCanvass.vue'
export default {

  data () {
    return {
      user: {},
      message: '',
      products: [],
      total: '',
      is_edit: true,
      id: '',
      is_paid: '',
      payment: 0,
      isLoadingPage: false,
      isLoading: false
    }
  },
  components: {
    // eslint-disable-next-line vue/no-unused-components
    InputForm,
    Offcanvas
  },
  methods: {
    pay () {
      this.isLoading = true
      this.$http.post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/pay/${this.id}`)
        .then((res) => {
          this.isLoading = false
          this.$emitter.emit('push-info', {
            title: '付款結果',
            style: 'success',
            content: `${res.data.message}`
          })
          this.getOrder()
        })
        .catch((err) => {
          console.dir(err.response.data.message)
          this.isLoading = false
          this.$emitter.emit('push-info', {
            title: '付款結果',
            style: 'danger',
            content: `${err.response.data.message}`
          })
        })
    },
    getOrder () {
      const { id } = this.$route.params
      this.isLoadingPage = true
      this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order/${id}`)
        .then((res) => {
          this.products = res.data.order.products
          this.total = res.data.order.total
          this.user = res.data.order.user
          this.id = res.data.order.id
          this.is_paid = res.data.order.is_paid
          this.isLoadingPage = false
          // 為了更新navbar的購物車數字
          this.$refs.cart.getCart()
        })
        .catch((err) => {
          console.log(err)
          this.isLoadingPage = false
        })
    }
  },
  mounted () {
    this.getOrder()
  }
}
</script>
