<template>
  <div class="input-group">
    <input type="text" class="form-control" v-model.trim="searchInfo" placeholder="請輸入搜尋關鍵字" />
  </div>
  <div class="input-group">
    <input type="number" class="form-control" placeholder="請輸入最低價格" v-model.number="minPrice"  />
    <input type="number" class="form-control" placeholder="請輸入最高價格" v-model.number="maxPrice"  />
  </div>
  <div class="d-flex justify-content-end gap-2 py-2">
    <button class="btn btn-primary text-secondary" type="button" @click="cleanSearch() ; $emit('sendSearchInfo', searchInfo, minPrice, maxPrice)">清除搜尋</button>
    <button class="btn btn-primary text-secondary" type="button" @click="$emit('sendSearchInfo', searchInfo, minPrice, maxPrice)">搜尋</button>
  </div>
</template>
<script>
export default {
  emits: ['sendSearchInfo', 'searchInfo', 'minPrice', 'maxPrice'],
  data () {
    return {
      searchInfo: '',
      minPrice: null,
      maxPrice: null
    }
  },
  methods: {
    cleanSearch () {
      this.searchInfo = ''
      this.minPrice = null
      this.maxPrice = null
    }
  }
}
</script>
