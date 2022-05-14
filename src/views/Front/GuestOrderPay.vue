<template>
  <div class="container pt-9">
    <VueLoading :active="isLoadingPage" :z-index="1060"/>
    <div class="row justify-content-center">
      <div class="col-12 col-lg-8">
        <GuestPayProcessInspector :current-status='confirmAndPay' :payment='is_paid' />
        <h2 class="mb-3  border-bottom border-2">已購商品清單</h2>
        <div class="table-responsive">
          <table class="table table-hover ">
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
        <h2 class="mb-3  border-bottom border-2">訂購者資訊</h2>
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
      </div>
    </div>
    <template v-if="!is_paid">
      <div class="row justify-content-center">
        <div class="col-12 col-lg-8">
          <h2 class="mb-3  border-bottom border-2">選擇付款方式</h2>
          <div class="d-flex">
            <select v-model="payment" class="form-select">
            <option value="0" selected disabled>請選擇付款方式</option>
            <option value="1" >ATM匯款</option>
            <option value="2" >信用卡</option>
            <option value="3" >貨到付款</option>
            </select>
            <button class="btn btn-primary text-white text-nowrap" type="button"
            @click="pay()"
            :disabled="isLoading || payment === 0"
            :class="{buttonDisabledCursor : isLoading || payment === 0}"
            >
              <span v-show="isLoading" class="spinner-border spinner-border-sm"
              role="status" aria-hidden="true"></span>
              確認付款
            </button>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import GuestPayProcessInspector from '@/components/GuestPayProcessInspector.vue'
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
      isLoading: false,
      confirmAndPay: 'confirmAndPay'
    }
  },
  components: {
    GuestPayProcessInspector
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
          alert('已完成付款')
          this.$router.push('/guestOrderFinished')
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
        })
        .catch((err) => {
          console.log(err.response.data.message)
          this.isLoadingPage = false
        })
    }
  },
  mounted () {
    this.getOrder()
  }
}
</script>
