<template>
  <div class="input-group">
    <input  class="form-control w-sm-50 position-relative" ref="searchInput" type="text"
    @focus="inputFocused = true; enterCounter = 0 ;"
    @blur="inputFocused=false"
    v-model.lazy="searchInfo" placeholder="請輸入搜尋關鍵字">
    <AutoComplete
    :inputData="searchInfo"
    :focus="inputFocused"
    @sendAutoCompleteResult="writeSearchInfo"
    @sendInfoBlank="cleanSearch"
    />
    <input class="form-control w-sm-25" type="number"  placeholder="請輸入最低價格" v-model.number="minPrice">
    <input class="form-control w-sm-25" type="number"  placeholder="請輸入最高價格" v-model.number="maxPrice">
  </div>
  <div class="d-flex flex-column flex-sm-row justify-content-sm-end gap-2 py-2 ">
    <button v-if="favorites.length !== 0" type="button" class="btn btn-primary text-secondary text-nowrap" @click="$emit('showMyFavorites')" >顯示我的最愛</button>
    <button type="button" class="btn btn-primary text-secondary text-nowrap" @click="$emit('hight-to-low')" >價格由大至小排列</button>
    <button type="button" class="btn btn-primary text-secondary text-nowrap" @click="$emit('low-to-hight')" >價格由小至大排列</button>
    <button type="button" class="btn btn-primary text-secondary text-nowrap" @click="cleanSearch() ; sendSearchInfo()">清除搜尋</button>
    <button type="button" class="btn btn-primary text-secondary text-nowrap" @click="sendSearchInfo()">搜尋</button>
  </div>
</template>

<script>
import AutoComplete from '@/components/AutoComplete.vue'

export default {
  emits: ['sendSearchInfo', 'searchInfo', 'minPrice', 'maxPrice', 'hight-to-low', 'low-to-hight', 'showMyFavorites'],
  components: {
    AutoComplete
  },
  data () {
    return {
      searchInfo: '',
      minPrice: null,
      maxPrice: null,
      autoCompleteSwitched: false,
      inputFocused: false,
      enterCounter: 0,
      favorites: JSON.parse(localStorage.getItem('myFavoritesItem')) || []
    }
  },
  watch: {
    searchInfo (newValue) {
      if (newValue === '') {
        this.autoCompleteSwitched = false
        this.$emit('sendSearchInfo', this.searchInfo)
      } else if (newValue !== '') {
        this.autoCompleteSwitched = true
      }
    }
  },
  methods: {
    writeSearchInfo (info) {
      this.searchInfo = info
    },
    cleanSearch () {
      this.searchInfo = ''
      this.minPrice = null
      this.maxPrice = null
    },
    sendSearchInfo () {
      this.$emit('sendSearchInfo', this.searchInfo, this.minPrice, this.maxPrice)
    }
  },
  mounted () {
    // enter the search監聽
    window.addEventListener('keydown', (e) => {
      if (e.code === 'Enter' || e.code === 'NumpadEnter') {
        this.enterCounter += 1
        if (this.autoCompleteSwitched === true && this.enterCounter > 2) {
          this.$emit('sendSearchInfo', this.searchInfo, this.minPrice, this.maxPrice)
          this.sendSearch = document.getElementById('searchInput')
          this.enterCounter = 0
          this.autoCompleteSwitched = false
        }
      }
    })
  }
}
</script>
