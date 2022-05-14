<template>
  <div class="container pt-9 mb-3">
    <VueLoading :active="isLoadingPage" :z-index="1060"/>
    <GuestPayProcessInspector :current-status='inputInfo' />
    <h2 class="mx-auto" style="width:224px">請填寫顧客資料</h2>
    <InputForm/>
  </div>
</template>

<script>
import InputForm from '@/components/InputForm.vue'
import GuestPayProcessInspector from '@/components/GuestPayProcessInspector.vue'

export default {
  data () {
    return {
      inputInfo: 'inputInfo'
    }
  },
  components: {
    InputForm,
    GuestPayProcessInspector
  }
}
</script>
