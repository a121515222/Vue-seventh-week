<template>
<div class="container pt-10">
  <div class="row">
    <template v-for="(item, index) in articles" :key="item.title+index">
<div class="card col-12 col-sm-6 cardHover ps-0 " >
  <div class="row g-0">
    <div class="col-md-4">
      <img :src="item.image" class="img-fluid w-100 h-100"
      :alt="item.title" style="min-height:220px;max-height:220px;">
    </div>
    <div class="col-md-8 d-flex flex-column  justify-content-center">
      <div class="card-body">
        <h5 class="card-title">{{item.title}}</h5>
        <p class="card-text">{{item.description}}</p>
      </div>
      <div class="card-foot">
          <router-link class="btn btn-primary" :to="`/article/${item.id}`">詳細內容</router-link>
      </div>
    </div>
  </div>
</div>
    </template>
  </div>
</div>
</template>
<script>
export default {
  data () {
    return {
      scrollY: 0,
      articles: []
    }
  },
  methods: {
    scrollWatch () {
      // 取得scrollY數值
      this.scrollY = window.scrollY
    },
    getArticle () {
      this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/articles`)
        .then((res) => {
          this.articles = res.data.articles
        })
        .catch((err) => { console.dir(err.response.data.message) })
    }
  },
  mounted () {
    // 監聽scroll
    window.addEventListener('scroll', this.scrollWatch)
    this.getArticle()
  }
}
</script>
