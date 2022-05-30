<template>
  <div class="container">
    <VueLoading :active="isLoadingPage" :z-index="1060"/>
    <div class="row">
      <div class="from-group d-flex justify-content-end">
        <button class="btn btn-primary" type="button"
        @click="isNew = true; openModal()">
          新增文章
        </button>
      </div>
      <div class="col-12">
        <div class="card">
          <div class="card-header bg-primary text-light">
            <h3>文章列表</h3>
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
                  <td>{{showTime(item.create_at | 0)}}</td>
                  <td>{{item.title}}</td>
                  <td>{{item.author}}</td>
                  <td :class="{ 'text-success': item.isPublic, 'text-danger': item.isPublic === false? true: false}">
                    {{articleStatus(item.isPublic)}}
                  </td>
                  <td><span v-for="(i, index) in item.tag" :key="i + index" class="badge bg-primary mx-1">{{i}}</span></td>
                  <td>
                    <button class="btn btn-outline-secondary" type="button"
                    @click="postId = item.id ; isNew =false ; editArticle()">
                      <span v-if="isLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      編輯文章
                    </button>
                </td>
                  <td>
                    <button  class="btn btn-outline-dark" type="button"
                    @click="postId = item.id ; deleteArticle()">
                      <span v-if="isLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      刪除文章
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <PaginationComponent :pagination= "pagination"/>
      </div>
    </div>
  <!-- Modal -->
    <AdminArticleModal ref="adminArticleModal"
    :get-article="tempArticle"
    :is-new="isNew"
    @send-article="sendArticle"
    />
  </div>
</template>

<script>
import PaginationComponent from '@/components/PaginationComponent.vue'
import AdminArticleModal from '@/components/AdminArticleModal.vue'
import { getTime } from '@/methods/ReadTime'
import { mapActions } from 'pinia'
import toastStore from '@/stores/toast'

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
      isLoadingPage: false,
      postId: '',
      bsModal: '',
      isNew: true
    }
  },
  components: {
    AdminArticleModal,
    PaginationComponent
  },
  methods: {
    ...mapActions(toastStore, ['addMessage']),
    deleteArticle () {
      const checked = confirm('確定刪除文章?')
      this.isLoading = true
      if (checked === true) {
        this.$http.delete(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/article/${this.postId}`)
          .then((res) => {
            this.getArticle()
            this.addMessage(
              {
                title: '刪除文章結果',
                style: 'success',
                content: res.data.message
              }
            )
            this.isLoading = false
          })
          .catch((err) => {
            console.dir(err.response.data.message)
            this.addMessage(
              {
                title: '刪除文章結果',
                style: 'danger',
                content: err.response.data.message
              }
            )
            this.isLoading = false
          })
      } else if (checked === false) {
        this.addMessage(
          {
            title: '刪除文章結果',
            style: 'success',
            content: '已取消刪除'
          }
        )
        this.isLoading = false
      }
    },
    editArticle () {
      this.getArticleContent()
      this.openModal()
    },
    sendArticle (Data) {
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
      if (this.isNew === true) {
        this.$http.post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/article`, sendData)
          .then((res) => {
            this.getArticle()
            this.addMessage(
              {
                title: '新增文章/編輯結果',
                style: 'success',
                content: res.data.message
              }
            )
            this.isLoading = false
            this.tempArticle = {
              title: '',
              description: '',
              image: '',
              tag: [],
              create_at: null,
              author: '',
              isPublic: false,
              content: ''
            }
          })
          .catch((err) => {
            this.addMessage(
              {
                title: '新增文章/編輯結果',
                style: 'danger',
                content: err.response.data.message
              }
            )
            this.isLoading = false
          })
      } else if (this.isNew === false) {
        this.isLoading = true
        this.$http.put(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/article/${this.postId}`, sendData)
          .then((res) => {
            this.getArticle()
            this.closeModal()
            this.addMessage(
              {
                title: '新增文章/編輯結果',
                style: 'success',
                content: res.data.message
              }
            )
            this.isLoading = false
          })
          .catch((err) => {
            this.addMessage(
              {
                title: '新增文章/編輯結果',
                style: 'danger',
                content: err.response.data.message
              }
            )
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
    showTime (time) {
      return getTime(time)
    },
    openModal () {
      this.$refs.adminArticleModal.openModal()
    },
    closeModal () {
      this.$refs.adminArticleModal.closeModal()
    },
    getArticleContent () {
      this.isLoading = true
      this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/article/${this.postId}`)
        .then((res) => {
          this.tempArticle = res.data.article
          this.isLoading = false
        })
        .catch((err) => {
          console.dir(err.response.data.message)
          this.addMessage(
            {
              title: '取得文章失敗',
              style: 'danger',
              content: err.response.data.message
            }
          )
          this.isLoading = false
        })
    },
    getArticle (page = 1) {
      this.isLoadingPage = true
      this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/articles?page=${page}`)
        .then((res) => {
          this.articles = res.data.articles
          this.pagination = res.data.pagination
          this.isLoadingPage = false
        })
        .catch((err) => {
          console.dir(err.response.data.message)
          this.addMessage(
            {
              title: '取得文章列表失敗',
              style: 'danger',
              content: err.response.data.message
            }
          )
          this.isLoading = false
        })
    }
  },
  mounted () {
    this.getArticle()
  }
}
</script>
