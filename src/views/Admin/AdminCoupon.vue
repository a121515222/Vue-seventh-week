<template>
  <div class="container">
    <VueLoading :active="isLoading" :z-index="1060" />
    <div class="row py-5">
      <h2>優惠券列表</h2>
      <div class="d-flex justify-content-end">
        <!-- Button trigger modal -->
        <button
          class="btn btn-primary"
          type="button"
          @click="
            isNew = true;
            openModal();
          "
        >
          增加優惠券
        </button>
      </div>
      <div class="col-12 py-3">
        <div class="border rounded">
          <table class="table table-hover">
            <tr>
              <th>名稱</th>
              <th>折扣幅度</th>
              <th>使用期限</th>
              <th>優惠碼</th>
              <th>是否啟用</th>
              <th></th>
              <th></th>
            </tr>
            <tr v-for="(item, index) in coupons" :key="item.id + index">
              <td>{{ item.title }}</td>
              <td>{{ item.percent }}</td>
              <td>{{ showTime(item.due_date | 0) }}</td>
              <td>{{ item.code }}</td>
              <td
                :class="{
                  'text-success': item.is_enabled === 1,
                  'text-danger': item.is_enabled === 0,
                }"
              >
                {{ couponStatus(item.is_enabled) }}
              </td>
              <td>
                <button
                  class="btn btn-outline-success"
                  :data-index="index"
                  type="button"
                  @click="
                    postId = item.id;
                    isNew = false;
                    openModal(item);
                  "
                >
                  <span
                    class="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                    v-if="isLoading"
                  ></span>
                  編輯
                </button>
              </td>
              <td>
                <button
                  class="btn btn-outline-danger"
                  type="button"
                  @click="
                    postId = item.id;
                    deleteCoupon(index);
                  "
                >
                  <span
                    class="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                    v-if="isLoading"
                  ></span>
                  刪除
                </button>
              </td>
            </tr>
          </table>
          <p class="px-1">一共有{{ coupons.length }}項優惠券</p>
        </div>
        <PaginationComponent :pagination="page" @send-page="getCoupon" />
      </div>
    </div>
  </div>
  <!-- Modal -->
  <AdminCouponModal
    ref="myCouponModal"
    :send-coupon="sendCoupon"
    :is-new="isNew"
    @send-close-resetCouponData="resetCoupon()"
    @send-coupon-data="adminEditCoupon"
  />
</template>

<script>
import PaginationComponent from "@/components/PaginationComponent.vue";
import AdminCouponModal from "@/components/AdminCouponModal.vue";
import { getTime } from "@/methods/ReadTime";
import { mapActions } from "pinia";
import toastStore from "@/stores/toast";

export default {
  data() {
    return {
      coupons: [],
      isNew: true,
      page: 1,
      postId: "",
      sendCoupon: {
        title: "",
        is_enabled: null,
        percent: null,
        due_date: null,
        code: "",
      },
      isLoading: false,
    };
  },
  components: {
    PaginationComponent,
    AdminCouponModal,
  },
  methods: {
    ...mapActions(toastStore, ["addMessage"]),
    deleteCoupon(index) {
      this.isLoading = true;
      const checked = confirm(`將刪除"${this.coupons[index].title}"'`);
      if (checked) {
        this.$http
          .delete(
            `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon/${this.postId}`
          )
          .then((res) => {
            this.getCoupon();
            this.isLoading = false;
            this.addMessage({
              title: "刪除優惠券結果",
              style: "success",
              content: res.data.message,
            });
          })
          .catch((err) => {
            this.isLoading = false;
            this.addMessage({
              title: "刪除優惠券結果",
              style: "danger",
              content: err.response.data.message,
            });
          });
      }
    },
    couponStatus(info) {
      if (info === 0) {
        return "不啟用";
      } else {
        return "啟用";
      }
    },
    adminEditCoupon(coupon) {
      this.isLoading = true;
      // 轉換時間格式
      coupon.due_date = Math.floor(new Date(coupon.due_date) / 1000);
      const sendData = { data: coupon };
      if (this.isNew === true) {
        this.$http
          .post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon`, sendData)
          .then((res) => {
            this.getCoupon();
            this.isLoading = false;
            this.addMessage({
              title: "新增優惠券結果",
              style: "success",
              content: res.data.message,
            });
            this.closeModal();
          })
          .catch((err) => {
            this.isLoading = false;
            this.addMessage({
              title: "新增優惠券結果",
              style: "success",
              content: err.response.data.message,
            });
          });
      } else {
        this.$http
          .put(
            `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon/${this.postId}`,
            sendData
          )
          .then((res) => {
            alert(res.data.message);
            this.getCoupon();
            this.closeModal();
            this.isLoading = false;
            this.addMessage({
              title: "編輯優惠券結果",
              style: "success",
              content: res.data.message,
            });
          })
          .catch((err) => {
            console.log(err.response.data.message);
            this.isLoading = false;
            this.addMessage({
              title: "新增/編輯優惠券結果",
              style: "danger",
              content: err.response.data.message,
            });
          });
      }
    },
    closeModal() {
      this.$refs.myCouponModal.close();
    },
    openModal(data) {
      this.$refs.myCouponModal.open();
      if (this.isNew === false) {
        Object.keys(data).forEach((item) => {
          Object.keys(this.sendCoupon).forEach((i) => {
            if (item === i) {
              this.sendCoupon[i] = data[item];
            }
          });
        });
        this.postId = data.id;
      } else {
        return;
      }
    },
    resetCoupon() {
      this.sendCoupon.title = "";
      this.sendCoupon.is_enabled = null;
      this.sendCoupon.percent = null;
      this.sendCoupon.due_date = null;
      this.sendCoupon.code = "";
    },
    showTime(time) {
      return getTime(time);
    },
    getCoupon(page = 1) {
      this.isLoading = true;
      this.$http
        .get(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupons?page=${page}`
        )
        .then((res) => {
          this.coupons = res.data.coupons;
          this.page = res.data.pagination;
          this.isLoading = false;
        })
        .catch((err) => {
          console.dir(err.response.data.message);
          this.isLoading = false;
        });
    },
  },
  mounted() {
    this.getCoupon();
  },
};
</script>
