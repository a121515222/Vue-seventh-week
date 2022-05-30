<template>
  <div class="container">
    <VueLoading :active="isLoading" :z-index="1060"/>
    <div class="row py-5">
      <h2>訂單管理</h2>
      <div class="col-12 py-3">
        <div class="accordion" id="orderManger">
          <div class="accordion-item"
          v-for="(item, index) in orders"
          :key="item.id + index">
            <h2 class="accordion-header" :id="`list${item.id}`">
              <button class="accordion-button" type="button"
              @click="postId = item.id"
              :class="{collapsed: index !== 0}"
              data-bs-toggle="collapse"
              aria-expanded="true"
              :data-bs-target="`#collapse${item.id}`"
              :aria-controls="`collapse${item.id}`"
              >
                {{`訂單編號${item.id}`}}
              </button>
            </h2>
            <div class="accordion-collapse collapse"
            :id="`collapse${item.id}`"
            :class="{show: index === 0}"
            data-bs-parent="#orderManger"
            :aria-labelledby="`list${item.id}`">
              <div class="accordion-body">
                <div class="card">
                  <div class="card-header bg-primary text-light">訂單內容</div>
                  <div class="card-body">
                    <div class="row">
                      <div class="col-5">
                        <h5>客戶資料</h5>
                        <table class="table table-hover table-striped">
                          <thead>
                            <tr>
                              <th style="width:100px">姓名</th>
                              <td >{{item.user.name}}</td>
                            </tr>
                            <tr>
                              <th>住址</th>
                              <td>{{item.user.address}}</td>
                            </tr>
                            <tr>
                              <th>電話</th>
                              <td>{{item.user.tel}}</td>
                            </tr>
                            <tr>
                              <th>E-mail</th>
                              <td>{{item.user.email}}</td>
                            </tr>
                          </thead>
                        </table>
                      </div>
                        <div class="col-7">
                          <div class="d-flex justify-content-between">
                            <h5>訂單細節</h5>
                            <button class="btn btn-outline-secondary py-0"
                            :disabled="isLoading === true"
                            :class="{'buttonDisabledCursor': isLoading === true}"
                            @click="postId = item.id; deleteOrder()">
                              <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"
                              v-show="isLoading === true"></span>
                              刪除訂單
                            </button>
                          </div>
                          <table class="table table-hover table-striped">
                            <thead>
                              <tr>
                                <th style="width:100px">訂單編號</th>
                                <td >{{item.id}}</td>
                                <th>修改付款狀態</th>
                              </tr>
                              <tr>
                                <th>下單時間</th>
                                <td>{{showTime(item.create_at | 0)}}</td>
                                <td></td>
                              </tr>
                              <tr>
                                <th>付款時間</th>
                                <td>{{showTime(item.paid_date | 0)}}</td>
                                <td></td>
                              </tr>
                              <tr>
                                <th>付款狀態</th>
                                <td :class="{'text-success': item.is_paid === true, 'text-danger': item.is_paid === false}">
                                  {{item.is_paid === true? '已付款':'未付款'}}
                                </td>
                                <td><SwitchClick
                                    @click="postId = item.id"
                                    :info="item.id"
                                    :enabled="switchStatus(item.is_paid)"
                                    @send-enable="changeIsPaid"/>
                                </td>
                              </tr>
                              <tr>
                                <th>總金額</th>
                                <td>{{item.total}}</td>
                                <td></td>
                              </tr>
                            </thead>
                          </table>
                        </div>
                        <div class="col-12">
                          <h5>產品清單</h5>
                          <OrderList :data= "item"/>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PaginationComponent :pagination="pagination" @send-page="page=getOrder($event)"/>
    </div>
  </div>
</template>

<script>
import PaginationComponent from '@/components/PaginationComponent.vue'
import SwitchClick from '@/components/SwitchClick.vue'
import OrderList from '@/components/OrderList.vue'
import { getTime } from '@/methods/ReadTime'
import { mapActions } from 'pinia'
import toastStore from '@/stores/toast'

export default {
  data () {
    return {
      orders: [],
      pagination: {},
      postId: '',
      isLoading: false,
      page: null
    }
  },
  components: {
    PaginationComponent,
    SwitchClick,
    OrderList
  },
  methods: {
    ...mapActions(toastStore, ['addMessage']),
    deleteOrder () {
      this.isLoading = true
      const checked = confirm('確定要刪除本訂單?')
      if (checked === true) {
        this.$http.delete(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/order/${this.postId}`)
          .then((res) => {
            this.getOrder()
            this.isLoading = false
            this.addMessage(
              {
                title: '刪除訂單結果',
                style: 'success',
                content: res.data.message
              }
            )
          }).catch((err) => {
            console.dir(err.response.data.message)
            this.isLoading = false
            this.addMessage(
              {
                title: '刪除訂單結果',
                style: 'danger',
                content: err.response.data.message
              }
            )
          })
      }
    },
    changeIsPaid (info) {
      const sendData = { data: { is_paid: this.switchStatus(info) } }
      this.$http.put(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/order/${this.postId}`, sendData)
        .then(() => {
          this.getOrder()
        }).catch((err) => { console.dir(err.response.data.message) })
    },
    switchStatus (data) {
      let result = ''
      switch (data) {
        case true: result = 1
          break
        case false: result = 0
          break
        case 1: result = true
          break
        case 0: result = false
          break
      }
      return result
    },
    getOrder (page = 1) {
      this.isLoading = true
      this.$http
        .get(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/orders?page=${page}`
        )
        .then((res) => {
          this.orders = res.data.orders
          this.pagination = res.data.pagination
          this.isLoading = false
        })
        .catch((err) => {
          console.dir(err.response.data.message)
          this.isLoading = false
        })
    },
    showTime (time) {
      return getTime(time)
    }
  },
  mounted () {
    this.getOrder()
  }
}
</script>
