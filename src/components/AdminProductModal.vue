<template>
  <div class="modal fade" id="modalInputData" tabindex="-1"  aria-hidden="true" ref="productModal">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">{{isNew?"新增產品":"編輯產品"}}</h5>
          <button class="btn-close" type="button"
          @click="close()">
          </button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-4 my-3">
              <div class="from-group my-3">
                <label class="form-label w-100" for="productImageUrl">
                圖片上傳
                  <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"
                  v-if="isLoading"
                  >
                  </span>
                </label>
                <input class="form-control" type="file" name="file-to-upload" ref="upLoadFile"
                :disabled="isLoading || inputData.imagesUrl?.length === 5"
                @change="uploadImg"
                :class="{buttonDisabledCursor : isLoading || inputData.imagesUrl?.length === 5}"
                >
              </div>
              <div><img class="img-fluid"
              :src="inputData.imageUrl"
              :alt="inputData.title + 'picture'"
              :title="inputData.title"
              >
              </div>
              <div class="from-group my-3">
                <label class="form-label w-100" for="productImageUrl" >
                  主要產品圖片
                </label>
                <input class="form-control" type="text" id="productImageUrl" placeholder="請輸入主要產品圖片網址"
                v-model.trim.lazy="inputData.imageUrl">
              </div>
              <template v-if="inputData.imageUrl">
                <div class="from-group my-3"
                v-for="(item,index) in inputData.imagesUrl"
                :key="item+1">
                  <p>其他圖片{{index+1}}</p>
                  <img class="img-fluid"
                  :src="item"
                  :alt="inputData.title">
                  <label class="form-label w-100" for="productImageUrl" >其他產品圖片{{index+1}}</label>
                  <input class="form-control" type="text" id="productImageUrl" placeholder="請輸其他產品圖片網址"
                  v-model.trim.lazy="inputData.imagesUrl[index]"
                  >
                </div>
              </template>
              <button class="btn btn-outline-success w-100 d-block my-3"
              v-if="inputData.imageUrl"
              :disabled="inputData.imagesUrl?.length===5"
              :class="{buttonDisabledCursor : inputData.imagesUrl?.length===5}"
              @click="addImg() "
              >
                新增圖片
              </button>
              <button class="btn btn-outline-danger w-100 d-block"
              v-if="inputData.imagesUrl?.length > 1"
              @click="deleteImg()"
              >
                刪除圖片
              </button>
            </div>
            <div class="col-8 my-3" >
              <div class="from-group my-3">
                <label class="form-label w-100" for="productName" >產品名稱</label>
                <input class="form-control" type="text" id="productName" placeholder="請輸入產品名稱"
                v-model.trim="inputData.title"
                >
              </div>
              <div class="from-group my-3">
                <label class="form-label w-100" for="productCategory" >產品分類</label>
                <input class="form-control" type="text" id="productCategory" placeholder="請輸入產品分類"
                v-model.trim="inputData.category"
                >
              </div>
              <div class="from-group my-3">
                <label class="form-label w-100" for="productContent" >產品內容</label>
                  <input class="form-control" type="text" id="productContent" placeholder="請輸入產品內容"
                  v-model.trim="inputData.content"
                  >
              </div>
              <div class="d-flex gap-2">
                <div class="from-group my-3 w-50">
                  <label class="form-label w-100" for="productOrigin_price" >產品原價</label>
                  <input class="form-control" type="number" id="productOrigin_price" placeholder="請輸入產品原價"
                  min=0
                  v-model.number="inputData.origin_price"
                  >
                </div>
                <div class="from-group my-3 w-50">
                  <label class="form-label w-100" for="productPrice" >產品售價</label>
                  <input class="form-control" type="number" id="productPrice" placeholder="請輸入產品售價"
                  min=0
                  v-model.number="inputData.price"
                  >
                </div>
              </div>
              <div class="d-flex gap-2">
                <div class="from-group my-3 w-50">
                  <label for="is_enabled" class=" w-100" style="margin-bottom: 8px;">產品狀態</label>
                  <select class="form-select" name="productStatus" id="is_enabled"
                  v-model.number="inputData.is_enabled"
                  >
                    <option  value="" disabled >請選擇產品狀態</option>
                    <option  value=0>未上架</option>
                    <option  value=1>已上架</option>
                    <option  value=2>缺貨中</option>
                    <option  value=3>補貨中</option>
                    <option  value=4>促銷中</option>
                    <option  value=5>待下架</option>
                  </select>
                </div>
                <div class="from-group my-3 w-50">
                  <label class="form-label w-100" for="productUnit" >產品單位</label>
                  <input class="form-control" type="text" id="productUnit" placeholder="請輸入產品單位"
                  v-model.trim="inputData.unit"
                  >
                </div>
              </div>
              <div class="from-group my-3">
                <label class="form-label w-100" for="productDescription" >產品描述</label>
                <ckeditor
                  :editor="editor"
                  :config="editorConfig"
                  placeholder= "請輸入文章內容"
                  id="productDescription"
                  v-model="inputData.description"
                  >
                </ckeditor>
              </div>
            </div>
          </div>
        </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" type="button"
            @click="close()"
            >
              關閉
            </button>
            <button class="btn btn-primary" type="button"
            @click="editProductList()"
            >
              確定
            </button>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import BsModal from 'bootstrap/js/dist/modal'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { mapActions } from 'pinia'
import toastStore from '@/stores/toast'

export default {
  props: ['inputProduct', 'isNew'],
  data () {
    return {
      inputData: {
        imagesUrl: []
      },
      bsModal: '',
      isLoading: false,
      editor: ClassicEditor,
      editorConfig: {
        toolbar: ['heading', 'bold', 'italic', '|', 'link']
      }
    }
  },
  emits: ['send-input-data', 'send-close-resetInput'],
  methods: {
    ...mapActions(toastStore, ['addMessage']),
    uploadImg () {
      this.isLoading = true
      const uploadFile = this.$refs.upLoadFile.files[0]
      const formData = new FormData()
      formData.append('file-to-upload', uploadFile)
      this.$http.post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/upload`, formData)
        .then((res) => {
          if (this.inputData.imageUrl === undefined || '') {
            this.inputData.imageUrl = res.data.imageUrl
          } else if (this.inputData.imageUrl !== '' && this.inputData.imagesUrl.length < 6) {
            if (this.inputData.imagesUrl.length < 6) {
              this.inputData.imagesUrl.push(res.data.imageUrl)
            }
          }
          this.isLoading = false
          this.addMessage(
            {
              title: '上傳圖片結果',
              style: 'success',
              content: '上傳成功'
            }
          )
          this.$refs.upLoadFile.value = ''
        })
        .catch((err) => {
          this.isLoading = false
          console.dir(err)
          if (this.inputData.imagesUrl.length === 5) {
            this.addMessage(
              {
                title: '上傳圖片結果',
                style: 'danger',
                content: '上傳失敗，已達最大上傳圖片數'
              }
            )
          } else {
            this.addMessage(
              {
                title: '上傳圖片結果',
                style: 'danger',
                content: '上傳失敗'
              }
            )
          }
        })
    },
    open () {
      this.bsModal.show()
    },
    close () {
      this.bsModal.hide()
      // 每次關閉都會重製外層的inputProductout
      this.$emit('send-close-resetInput')
    },
    editProductList () {
      this.$emit('send-input-data', this.inputData)
    },
    addImg () {
      this.inputData.imagesUrl.push('')
    },
    deleteImg () {
      this.inputData.imagesUrl.pop()
    }
  },
  watch: {
    inputProduct: {
      handler (newValue, oldValue) {
        this.inputData = JSON.parse(JSON.stringify(newValue))
      },
      deep: true
    }
  },
  mounted () {
    this.bsModal = new BsModal(this.$refs.productModal)
  }
}
</script>
