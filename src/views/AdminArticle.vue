<template>
<div class="container">
  <VueLoading :active="isLoading" :z-index="1060"></VueLoading>
  <div class="row">
    <div class="from-group d-flex justify-content-end">
      <button class="btn btn-primary" @click= "isNew = true; openModal()">
      新增文章</button>
    </div>
    <div class="col-12">
      <div class="card">
        <div class="card-header bg-primary text-light">
          文章列表
        </div>
        <div class="card-body">
          <table class="table">
            <thead>
              <tr>
                <th>發布日期</th>
                <th>文章標題</th>
                <th>作者</th>
                <th>是否公開</th>
                <th>標籤</th>
                <th>編輯與詳細內容</th>
                <th>刪除</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for= "(item) in articles" :key="item.id">
                <td>{{getTime(item.create_at)}}</td>
                <td>{{item.title}}</td>
                <td>{{item.author}}</td>
                <td :class="{ 'text-success': item.isPublic, 'text-danger': item.isPublic === false? true: false}">{{articleStatus(item.isPublic)}}</td>
                <td><span v-for="(i, index) in item.tag" :key="i + index" class="badge bg-primary mx-1">{{i}}</span></td>
                <td>
                <button class="btn btn-outline-secondary" @click= "postId = item.id ; isNew = false ; editArticle(item)">
                <span v-if= "isLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                編輯文章</button>
                </td>
                <td>
                <button class="btn btn-outline-dark" @click= "postId = item.id ; deleteArticle()">
                <span v-if= "isLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                刪除文章</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
    </div>
    <Pagination :pagination= "pagination"></Pagination>
    </div>
  </div>
  <!-- Modal -->
  <ArticleModal ref= "adminArticleModal" :get-article= "tempArticle" :is-new="isNew" @send-article= "sendArticle"></ArticleModal>
</div>
</template>
<script>
import Pagination from '@/components/PaginationComponent.vue'
import ArticleModal from '@/components/AdminArticleModal.vue'
export default {
  data () {
    return {
      articles: [],
      tempArticle: {
        title: '',
        description: '',
        image: '',
        tag: [],
        create_at: null,
        author: '',
        isPublic: false,
        content: ''
      },
      pagination: {},
      isLoading: false,
      postId: '',
      bsModal: '',
      isNew: true
    }
  },
  components: {
    ArticleModal,
    Pagination
  },
  methods: {
    deleteArticle () {
      const checked = confirm('確定刪除文章?')
      this.isLoading = true
      if (checked === true) {
        this.$http.delete(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/article/${this.postId}`)
          .then((res) => {
            alert(res.data.message)
            this.getArticle()
            this.$emitter.emit('push-info', {
              title: '刪除文章結果',
              style: 'success',
              content: res.data.message
            })
            this.isLoading = false
          })
          .catch((err) => {
            console.dir(err.response.data.message)
            alert(err.response.data.message)
            this.$emitter.emit('push-info', {
              title: '刪除文章結果',
              style: 'danger',
              content: err.response.data.message
            })
            this.isLoading = false
          })
      }
    },
    editArticle (data) {
      this.tempArticle = data
      // this.tempArticle.tag = newData.tag.join(' ') 使用join不知道為甚麼會影響 原資料item.tag
      this.openModal()
    },
    sendArticle (Data) {
      console.log(Data.content)
      this.isLoading = true
      const sendData = {
        data: {
          title: Data.title,
          description: Data.description,
          image: Data.image,
          tag: Data.tag,
          create_at: Math.floor(new Date(Data.create_at) / 1000),
          author: Data.author,
          isPublic: Data.isPublic,
          content: Data.content
        }
      }
      console.log('sendData', sendData)
      if (this.isNew === true) {
        this.$http.post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/article`, sendData)
          .then((res) => {
            this.getArticle()
            this.$emitter.emit('push-info', {
              title: '新增文章/編輯結果',
              style: 'success',
              content: res.data.message
            })
            this.isLoading = false
          })
          .catch((err) => {
            this.$emitter.emit('push-info', {
              title: '新增文章/編輯結果',
              style: 'danger',
              content: err.response.data.message
            })
            this.isLoading = false
          })
      } else if (this.isNew === false) {
        this.isLoading = true
        this.$http.put(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/article/${this.postId}`, sendData)
          .then((res) => {
            alert(res.data.message)
            this.getArticle()
            this.closeModal()
            this.$emitter.emit('push-info', {
              title: '新增文章/編輯結果',
              style: 'success',
              content: res.data.message
            })
            this.isLoading = false
          })
          .catch((err) => {
            this.$emitter.emit('push-info', {
              title: '新增文章/編輯結果',
              style: 'danger',
              content: err.response.data.message
            })
            this.isLoading = false
          })
      }
    },
    articleStatus (info) {
      if (info === false) {
        return '不公開'
      } else {
        return '公開'
      }
    },
    getTime (time) {
      const theDate = new Date(time * 1000).toISOString().split('T')
      return theDate[0]
    },
    openModal () {
      this.$refs.adminArticleModal.openModal()
    },
    closeModal () {
      this.$refs.adminArticleModal.closeModal()
    },
    getArticle (page = 1) {
      this.isLoading = true
      this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/articles?page=${page}`)
        .then((res) => {
          this.articles = res.data.articles
          console.log(this.articles)
          this.pagination = res.data.pagination
          this.isLoading = false
        })
        .catch((err) => { console.dir(err.response.data.message) })
    }
  },
  mounted () {
    this.getArticle()
  }
}
</script>
