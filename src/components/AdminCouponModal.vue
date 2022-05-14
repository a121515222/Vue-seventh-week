<template>
  <div class="modal fade" id="modalCouponData" tabindex="-1"  aria-hidden="true" ref="theCouponModal">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{isNew?"新增優惠券":"編輯優惠券"}}</h5>
          <button class="btn-close" type="button"
          @click="close()">
          </button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-8 my-3 mx-auto" >
              <div class="from-group my-3">
                  <label class="form-label w-100" for="couponName" >優惠券名稱</label>
                  <input  class="form-control" type="text" id="couponName" placeholder="請輸入優惠券名稱"
                  v-model.trim="couponData.title">
              </div>
              <div class="from-group my-3">
                <label class="form-label w-100" for="couponCode" >折扣碼</label>
                <input class="form-control" type="text" id="couponCode" placeholder="請輸入折扣碼"
                v-model.trim="couponData.code">
              </div>
              <div class="d-flex gap-2">
                <div class="from-group my-3 w-50">
                  <label class="form-label w-100" for="couponPercent">折扣幅度</label>
                  <input class="form-control" type="number" id="couponPercent" placeholder="請輸入折扣幅度,例如80為8折"
                  max=100
                  v-model.number="couponData.percent">
                </div>
                <div class="from-group my-3 w-50">
                  <label class="form-label w-100" for="couponDate">折扣到期日</label>
                  <input class="form-control" type="date" id="couponDate" placeholder="請選擇折扣到期日"
                  v-model="couponData.due_date">
                </div>
              </div>
              <div class="d-flex gap-2">
                <div class="from-group my-3 w-50">
                  <label for="is_enabled" class="form-label w-100">優惠卷啟用</label>
                  <SwitchClick
                  :info="couponData.title"
                  :enabled="couponData.is_enabled"
                  @send-enable="getEnable"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary"
            @click="close()">
              關閉
            </button>
            <button type="button" class="btn btn-primary"
            @click="editCoupon()">
              確定
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BsModal from 'bootstrap/js/dist/modal'
import SwitchClick from './SwitchClick.vue'

export default {
  props: ['sendCoupon', 'isNew'],
  data () {
    return {
      couponData: {},
      bsModal: ''
    }
  },
  components: {
    SwitchClick
  },
  emits: ['send-coupon-data', 'send-close-resetCouponData'],
  methods: {
    getEnable (info) {
      this.couponData.is_enabled = info
    },
    getTime (time) {
      const theDate = new Date(time * 1000).toISOString().split('T')
      return theDate[0]
    },
    open () {
      this.bsModal.show()
    },
    close () {
      this.bsModal.hide()
      // 每次關閉都會重製外層的sendCoupon
      this.$emit('send-close-resetCouponData')
    },
    editCoupon () {
      if (this.couponData.title !== '' && this.couponData.code !== '' && this.couponData.due_date !== '') {
        this.$emit('send-coupon-data', this.couponData)
      } else { alert('還有東西沒寫到') }
    }
  },
  watch: {
    sendCoupon: {
      handler (newValue, oldValue) {
        this.couponData = JSON.parse(JSON.stringify(newValue))
        // 修改日期格式
        this.couponData.due_date = this.getTime(this.couponData.due_date)
      },
      deep: true
    }
  },
  mounted () {
    this.bsModal = new BsModal(this.$refs.theCouponModal)
  }
}
</script>
