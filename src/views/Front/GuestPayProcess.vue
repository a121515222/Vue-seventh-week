<template>
  <div class="container pt-9">
    <div class="shoppingProcess d-flex justify-content-center align-items-center">
      <div class="fromGroup d-flex align-items-center" style="opacity:0.5;">
        <div class="step text-center">1</div>
        <p class="m-0 p-0">寫訂購資料</p>
      </div>
      <i class="bi bi-caret-right"></i>
      <div class="fromGroup d-flex align-items-center">
        <div class="step text-center">2</div>
        <p class="m-0 p-0">確認資料與付款</p>
      </div>
    </div>
  </div>
  <RouterView/>
</template>

<style lang="scss">
@import '../../assets/stylesheet/helper/color';

.step {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border:3px solid $primary;
}
</style>
