<template>
  <VueLoading :active="isLoadingPage" :z-index="1060"/>
  <div class="container pt-10 ">
    <div class="input-group position-relative">
      <input type="text"
      v-model.lazy="keyWord"
      @focus="inputFocused=true"
      @blur="inputFocused = false"
      class="form-control" placeholder="請輸入關鍵字">
      <AutoComplete
      :out-data="articles"
      :inputData="keyWord"
      :focus="inputFocused"
      @sendAutoCompleteResult="search;searchArticle()"
      />
    </div>
  <div class="d-flex flex-column flex-sm-row justify-content-sm-end gap-2 pt-3">
    <button class="btn btn-primary text-secondary" type="button"
    @click="sortNewToOld">
      日期新到舊排序
    </button>
    <button class="btn btn-primary text-secondary" type="button"
    @click="sortOldToNew">
      日期舊到新排序
    </button>
    <button class="btn btn-primary text-secondary" type="button"
    @click="this.keyWord = ''; this.showArticles = this.articles"
    >
      清除搜尋
    </button>
    <button class="btn btn-primary text-secondary" type="button"
    @click="searchArticle">
      搜尋
    </button>
  </div>
  <div class="row px-special mb-3">
    <template v-if="this.showArticles.length > 0">
      <template v-for="(item, index) in showArticles" :key="item.title + index">
        <div class="col-12 col-sm-6 px-0 articleCardGap">
          <div class="card cardHover mt-3 articleCardGapAdjust">
            <div class="row g-0">
              <div class="col-md-4">
                <img class="img-fluid w-100 h-100" style="object-fit:cover; min-height:300px; max-height:300px;"
                :src="item.image"
                :alt="item.title">
              </div>
              <div class="col-md-8 d-flex flex-column justify-content-center">
                <div class="card-body">
                  <h2 class="card-title fs-2 fw-bold">{{item.title}}</h2>
                  <p class="card-text">公布日期:{{showTime(item.create_at)}}</p>
                  <p class="card-text lineClamp">{{item.description}}</p>
                </div>
                <div class="card-foot d-flex justify-content-end">
                  <RouterLink class="btn btn-primary" :to="`/article/${item.id}`">詳細內容</RouterLink>
                </div>
              </div>
            </div>
        </div>
        </div>
      </template>
    </template>
  <template v-else>
    <h2>找不到東西喔</h2>
  </template>
  </div>
  </div>
</template>

<script>
import { getTime } from '@/methods/ReadTime'
import AutoComplete from '@/components/AutoComplete.vue'

export default {
  data () {
    return {
      scrollY: 0,
      articles: [],
      showArticles: [],
      keyWord: '',
      isLoadingPage: false,
      autoCompleteSwitched: false,
      inputFocused: false
    }
  },
  components: {
    AutoComplete
  },
  watch: {
    keyWord (newValue) {
      if (newValue === '') {
        this.showArticles = this.articles
        this.autoCompleteSwitched = false
      } else if (newValue !== '') {
        this.autoCompleteSwitched = true
      }
    }
  },
  methods: {
    sortNewToOld () {
      this.isLoadingPage = true
      this.showArticles.sort((a, b) => { return a.create_at < b.create_at ? 1 : -1 })
      // 也可以寫成 return a.create_at - b.create_at
      this.isLoadingPage = false
    },
    sortOldToNew () {
      this.isLoadingPage = true
      this.showArticles.sort((a, b) => { return a.create_at > b.create_at ? 1 : -1 })
      // 也可以寫成 return b.create_at - a.create_at
      this.isLoadingPage = false
    },
    showTime (time) {
      return getTime(time)
    },
    search (info) {
      this.keyWord = info
      this.autoCompleteSwitched = false
    },
    searchArticle () {
      if (this.keyWord === '') {
        alert('請輸入關鍵字')
      } else {
        this.isLoadingPage = true
        this.showArticles = []
        const keyWordArr = this.keyWord.split(' ')
        this.articles.forEach((item) => {
          keyWordArr.forEach((i) => {
            if (item.title.indexOf(i) !== -1 || item.description.indexOf(i) !== -1 || item.tag.indexOf(i) !== -1) {
              this.showArticles.push(item)
            }
          })
        })
        this.isLoadingPage = false
      }
    },
    scrollWatch () {
      // 取得scrollY數值
      this.scrollY = window.scrollY
    },
    getArticle () {
      this.isLoadingPage = true
      this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/articles`)
        .then((res) => {
          this.articles = res.data.articles
          this.showArticles = this.articles
          this.isLoadingPage = false
        })
        .catch((err) => {
          console.dir(err.response.data.message)
          this.isLoadingPage = false
        })
    }
  },
  mounted () {
    // 監聽scroll
    window.addEventListener('scroll', this.scrollWatch)
    this.getArticle()
    // enter the search監聽
    window.addEventListener('keydown', (e) => {
      if (this.autoCompleteSwitched === true && (e.code === 'Enter' || 'NumpadEnter')) {
        this.searchArticle()
        this.autoCompleteSwitched = false
      }
    })
  }
}
</script>
<style lang="scss">
  .px-special {
    padding-right: 0.7rem !important;
    padding-left: 0.7rem !important;
  }
  .articleCardGap {
    .articleCardGapAdjust{
      margin: 0;
    }
  }
  @media (min-width:576px) {
  .articleCardGap {
    .articleCardGapAdjust{
      margin-right: 0.5rem;
    }
    &:nth-child(2n){
      .articleCardGapAdjust{
       margin-right: 0;
       margin-left: 0.5rem;
    }
    }
  }
  }
</style>
