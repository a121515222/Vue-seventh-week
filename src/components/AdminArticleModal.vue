<template>
<div class="modal fade" ref="articleModal" id="articleModal" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog modal-xl">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" >{{isNew === true? '新增文章':'編輯文章'}}</h5>
        <button type="button" class="btn-close"  aria-label="Close"  @click= "closeModal()"></button>
      </div>
      <div class="modal-body">
        <div class="row row-cols-2">
        <div class="from-group py-2">
          <label for="articleTitle" class="form-label">文章標題</label>
          <input type="text" id="articleTitle" placeholder="請輸入文章標題" v-model= "article.title" class="form-control">
        </div>
        <div class="from-group py-2">
          <label for="articleDescription" class="form-label">文章描述</label>
          <input type="text" id="articleDescription" placeholder="請輸入文章描述"  v-model= "article.description" class="form-control">
        </div>
        <div class="from-group py-2">
          <label for="articleAuthor" class="form-label">文章作者</label>
          <input type="text" id="articleAuthor" placeholder="請輸入作者" v-model= "article.author" class="form-control">
        </div>
        <div class="from-group py-2">
          <label for="articleDate" class="form-label">文章日期</label>
          <input type="date" id="articleDate" placeholder="請選擇文章日期" v-model= "article.create_at" class="form-control">
        </div>
        <div class="from-group py-2">
          <label for="articleImg" class="form-label">文章圖片</label>
          <input type="text" id="articleImg" placeholder="請輸入圖片網址" v-model= "article.image" class="form-control">
        </div>
        <div class="from-group py-2 d-flex gap-3">
          <label for="articleIsenable" class="form-label">文章發布</label>
          <Switch id="articleIsenable" :info= "article.id" :enabled= "article.isPublic === true? 1:0" @send-enable= "getActive"></Switch>
        </div>
        <div class="from-group py-2">
          <img :src= "article.image" :alt="article.title" class="img-fluid">
        </div>
        </div>
        <div class="row pt-2">
          <div class="from-group d-flex gap-2">
            <label class="form-label">文章標籤</label>
            <div  v-for="(item, index) in article.tag" :key="index" class="input-group w-15">
              <input type="text" v-model= "article.tag[index]" class="form-control">
              <button class="input-group-text" @click="deleteTag(index)" :disabled= "isLoading === true" :class="{'buttonDisabledCursor': isLoading === true}">
                <span v-if= "isLoading === true" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                刪除</button>
            </div>
            <input v-if="article.tag?.length < 5" type="text" class="input-group w-10" placeholder="請輸入標籤" v-model="tempTag">
            <button v-if="article.tag?.length < 5" class="btn btn-outline-primary" type="button" @click="addTag">增加標籤</button>
          </div>
        </div>
        <div class="row pt-2">
          <div class="from-group">
            <label for="articleContent" class="form-label">文章內容</label>
            <ckeditor
            :editor="editor"
            :config="editorConfig"
            placeholder= "請輸入文章內容"
            id="articleContent"  v-model="article.content">
            </ckeditor>
            </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" @click="closeModal()">關閉</button>
        <button type="button" class="btn btn-primary" @click="editArticle">確定</button>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import BsModal from 'bootstrap/js/dist/modal'
import Switch from '@/components/SwitchClick.vue'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
export default {
  props: ['getArticle', 'isNew'],
  data () {
    return {
      bsModal: '',
      isLoading: false,
      article: {
        tag: [],
        isPublic: false
      },
      editor: ClassicEditor,
      editorConfig: {
        toolbar: ['heading', 'bold', 'italic', '|', 'link']
      },
      tempTag: ''
    }
  },
  components: {
    Switch
  },
  watch: {
    getArticle: {
      handler (nweValue) {
        this.article = JSON.parse(JSON.stringify(nweValue))
        this.article.create_at = this.getTime(this.article.create_at)
      },
      deep: true
    }
  },
  methods: {
    addTag () {
      if (this.article.tag === '') {
        this.article.tag = []
        this.article.tag.push(this.tempTag)
      } else {
        this.article.tag.push(this.tempTag)
      }
      this.tempTag = ''
    },
    deleteTag (index) {
      this.article.tag.splice(index, 1)
    },
    getTime (time) {
      const theDate = new Date(time * 1000).toISOString().split('T')
      return theDate[0]
    },
    editArticle () {
      this.$emit('sendArticle', this.article)
    },
    getActive (data) {
      if (data === 1) {
        this.article.isPublic = true
      } else if (data === 0) {
        this.article.isPublic = false
      }
    },
    openModal () {
      this.bsModal.show()
    },
    closeModal () {
      this.article = {
        title: '',
        description: '',
        image: '',
        tag: '',
        create_at: null,
        author: '',
        isPublic: false,
        content: ''
      }
      this.bsModal.hide()
    }
  },
  mounted () {
    this.bsModal = new BsModal(this.$refs.articleModal)
  }
}
</script>
<style>
.ck-editor__editable_inline {
  min-height: 200px;
}
</style>
