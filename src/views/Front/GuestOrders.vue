<template>
  <div class="container pt-10">
    <VueLoading :active="isLoadingPage" :z-index="1060"></VueLoading>
    <h2>訂單與付款頁</h2>
    <div class="table-responsive">
      <table class="table table-hover table-striped text-nowrap">
        <thead>
          <tr>
            <th scope="col">訂單編號</th>
            <th scope="col">訂購時間</th>
            <th scope="col">姓名</th>
            <th scope="col">電話</th>
            <th scope="col">是否付款</th>
            <th scope="col">詳細資料與付款</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item) in orders" :key ="item.id">
            <td>{{item.id}}</td>
            <td>{{showTime(item.create_at || 0)}}</td>
            <td>{{item.user.name}}</td>
            <td>{{item.user.tel}}</td>
            <td :class="{'text-success' : item.is_paid, 'text-danger' : !item.is_paid }">{{item.is_paid? '已付款':'未付款'}}</td>
            <td><button  type="button" class="btn btn-primary" @click="goToOrder(item.id)">開啟</button></td>
          </tr>
        </tbody>
      </table>
    </div>
    <PaginationComponent :pagination="pagination"></PaginationComponent>
  </div>
</template>
<script>
import PaginationComponent from '@/components/PaginationComponent.vue'
import { getTime } from '@/methods/ReadTime'
export default {
  data () {
    return {
      orders: [
        {
          user: {
            name: '',
            tel: '',
            address: ''
          }
        }],
      pagination: {},
      isLoadingPage: false
    }
  },
  components: {
    PaginationComponent
  },
  methods: {
    showTime (time) {
      return getTime(time)
    },
    goToOrder (id) {
      this.$router.push(`/guestOrderPay/${id}`)
    },
    getOrder () {
      this.isLoading = true
      this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/orders`)
        .then((res) => {
          this.isLoadingPage = false
          this.orders = res.data.orders
          this.pagination = res.data.pagination
        })
        .catch((err) => {
          this.isLoadingPage = false
          console.log(err.response.data.message)
          this.$emitter.emit('push-info', {
            title: '取得訂單列表結果',
            style: 'danger',
            content: `${err.response.data.message}`
          })
        })
    }
  },
  mounted () {
    this.getOrder()
  }
}
</script>
