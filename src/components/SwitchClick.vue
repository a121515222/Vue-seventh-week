<template>
  <div class="switch">
    <input class="switch-checkbox"  type="checkbox" name="switch-checkbox"
    :id="info || 'tempID'"
    :checked="active === 1? true:false"
    @click="activeChange(); $emit('send-enable', active)"
    >
    <label class="switch-label" :for="info || 'tempID'">
      <span class="switch-txt" turnOn="是" turnOff="否"></span>
      <span class="switch-Round-btn"></span>
    </label>
  </div>
</template>

<script>
export default {
  props: ['info', 'enabled'],
  data () {
    return {
      active: 0
    }
  },
  methods: {
    activeChange () {
      if (this.active === 0) {
        this.active = 1
      } else if (this.active === 1) {
        this.active = 0
      }
    }
  },
  watch: {
    enabled (newValue) {
      this.active = newValue
    }
  },
  mounted () {
    // 當開啟新增優惠券時this.enabled為undefined所以加上||0
    this.active = this.enabled || 0
  }
}
</script>
<style lang="scss">
@import "~bootstrap/scss/functions";
@import "../assets/stylesheet/helper/variables";
  .line-through{
    text-decoration: line-through;
  }
  .switch { /*==設定開關鈕的長寬==*/
    position: relative;
    width: 65px;
    height: 25px;
    line-height: 25px;
  }
  .switch-checkbox {
   position: absolute;
   display: none;
  }
  .switch-label {
    display: block;
    overflow: hidden;
    cursor: pointer;
    border-radius: 20px;
  }
  .switch-txt {
    display: block;
    width: 200%;
    margin-left: -100%;
    transition: margin 0.3s ease-in 0s;
  }
  .switch-txt::before,
  .switch-txt::after {
    display: block;
    float: right;
    width: 50%;
    font-size: 13px;
    color: #fff;
    font-weight: bold;
    box-sizing: border-box;
  }
  /*==開關鈕底色(開啟時)==*/
  .switch-txt::after {
    content: attr(turnOn);
    padding-left: 10px;
    background: $primary;
    color: #fff;
  }
  /*開關鈕底色(關閉時)*/
  .switch-txt::before {
    content: attr(turnOff);
    padding-right: 10px;
    background: #eee;
    color: #ccc;
    text-align: right;
  }
  /*==開關鈕的顏色與大小==*/
  .switch-Round-btn {
    position: absolute;
    display: block;
    width: 22px;
    height: 22px;
    margin: 2px;
    background: #fff;
    top: 0;
    bottom: 0;
    right: 35px;
    border-radius: 13px;
    transition: all 0.3s ease-in 0s;
  }
  .switch-checkbox:checked + .switch-label .switch-txt {
    margin-left: 0;
  }
  .switch-checkbox:checked + .switch-label .switch-Round-btn{
    right: 0;
  }
</style>
