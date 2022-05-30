<template>
  <div class="container my-2">
    <div class="shoppingProcess d-flex justify-content-center align-items-center">
      <div class="fromGroup d-flex align-items-center">
        <div class="step text-center">1</div>
        <p class="m-0 p-0">寫訂購資料</p>
      </div>
      <i class="bi bi-caret-right"></i>
      <div class="fromGroup d-flex align-items-center opacity-low" :class="{'opacity-1' : ['confirmAndPay', 'payProcessFinished'].includes(currentStatus)}">
        <div class="step text-center">2</div>
        <p class="m-0 p-0">確認資料與付款</p>
      </div>
      <i class="bi bi-caret-right"></i>
      <div class="fromGroup d-flex align-items-center opacity-low" :class="{'opacity-1' : ('payProcessFinished' === currentStatus) || payment}">
        <div class="step text-center">3</div>
        <p class="m-0 p-0">付款完成</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['currentStatus', 'payment'],
  mounted () {
  }
}
</script>

<style lang="scss">
@import '../assets/stylesheet/helper/color';

.step {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border:3px solid $primary;
}
.opacity-low {
  opacity: 0.3;
}
.opacity-1 {
  opacity: 1;
}
</style>
